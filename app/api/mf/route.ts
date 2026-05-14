function calculateReturn(current: number, previous: number) {
  return (((current - previous) / previous) * 100).toFixed(2);
}

export async function GET() {
  try {
    const funds = [
      {
        name: "Parag Parikh Flexi Cap",
        code: "122639",
      },
      {
        name: "Motilal Oswal Nasdaq 100",
        code: "120503",
      },
      {
        name: "Quant Small Cap",
        code: "125354",
      },
      {
        name: "Nippon India Small Cap",
        code: "118989",
      },
      {
        name: "HDFC Flexi Cap",
        code: "118550",
      },
      {
        name: "ICICI Prudential Technology",
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

        const latest = parseFloat(navs[0].nav);

        const week = parseFloat(navs[7]?.nav || navs[0].nav);

        const month = parseFloat(navs[30]?.nav || navs[0].nav);

        const threeMonth = parseFloat(navs[90]?.nav || navs[0].nav);

        return {
          name: fund.name,
          nav: latest.toFixed(2),
          date: navs[0].date,

          oneWeek: calculateReturn(latest, week),

          oneMonth: calculateReturn(latest, month),

          threeMonth: calculateReturn(latest, threeMonth),
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
