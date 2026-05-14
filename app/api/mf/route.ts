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

        return {
          name: fund.name,
          nav: data.data?.[0]?.nav || "N/A",
          date: data.data?.[0]?.date || "N/A",
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
