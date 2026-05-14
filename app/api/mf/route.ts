function calculateReturn(current: number, previous: number) {
  return (((current - previous) / previous) * 100).toFixed(2);
}

function parseDate(dateStr: string) {
  const [day, month, year] = dateStr.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function findClosestNAV(data: any[], targetDays: number) {
  const today = parseDate(data[0].date);

  const targetDate = new Date(today);

  targetDate.setDate(today.getDate() - targetDays);

  let closest = data[0];

  let smallestDiff = Infinity;

  for (const item of data) {
    const itemDate = parseDate(item.date);

    const diff = Math.abs(
      itemDate.getTime() - targetDate.getTime()
    );

    if (diff < smallestDiff) {
      smallestDiff = diff;

      closest = item;
    }
  }

  return parseFloat(closest.nav);
}

export async function GET() {
  try {
    const funds = [
      {
        name: "Parag Parikh Flexi Cap Direct Growth",
        code: "122639",
      },
      {
        name: "Motilal Oswal Nasdaq 100 FoF Direct Growth",
        code: "120503",
      },
      {
        name: "Quant Small Cap Direct Growth",
        code: "125354",
      },
      {
        name: "Nippon India Small Cap Direct Growth",
        code: "118989",
      },
      {
        name: "HDFC Flexi Cap Direct Growth",
        code: "119114",
      },
      {
        name: "ICICI Prudential Technology Direct Growth",
        code: "120586",
      },
    ];

    const results = await Promise.all(
      funds.map(async (fund) => {
        const response = await fetch(
          `https://api.mfapi.in/mf/${fund.code}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        const navs = data.data;

        const latestNAV = parseFloat(navs[0].nav);

        const oneWeekNAV = findClosestNAV(navs, 7);

        const oneMonthNAV = findClosestNAV(navs, 30);

        const threeMonthNAV = findClosestNAV(navs, 90);

        return {
          name: fund.name,

          nav: latestNAV.toFixed(2),

          date: navs[0].date,

          oneWeek: calculateReturn(
            latestNAV,
            oneWeekNAV
          ),

          oneMonth: calculateReturn(
            latestNAV,
            oneMonthNAV
          ),

          threeMonth: calculateReturn(
            latestNAV,
            threeMonthNAV
          ),
        };
      })
    );

    return Response.json(results);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to fetch MF data",
      },
      {
        status: 500,
      }
    );
  }
}
