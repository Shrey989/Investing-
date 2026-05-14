export async function GET() {
  try {
    const symbols = [
      "HDFCBANK.NS",
      "SIEMENS.NS",
      "POWERGRID.NS",
      "TATAMOTORS.NS",
      "INFY.NS",
    ];

    const results = await Promise.all(
      symbols.map(async (symbol) => {
        const response = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`,
          {
            headers: {
              "User-Agent":
                "Mozilla/5.0",
            },
            cache: "no-store",
          }
        );

        const data = await response.json();

        const result = data.chart.result[0];

        return {
          symbol,
          price: result.meta.regularMarketPrice,
          change: result.meta.regularMarketPrice
            - result.meta.previousClose,
        };
      })
    );

    return Response.json(results);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to fetch market data",
      },
      {
        status: 500,
      }
    );
  }
}
