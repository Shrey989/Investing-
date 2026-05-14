export async function GET() {
  try {
    const symbols = [
      "HDFCBANK.NS",
      "SIEMENS.NS",
      "POWERGRID.NS",
      "TATAMOTORS.NS",
      "INFY.NS",
    ];

    const requests = symbols.map(async (symbol) => {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=demo`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      const stock = data[0];

      return {
        symbol,
        price: stock?.price || null,
        change: stock?.changesPercentage || null,
      };
    });

    const results = await Promise.all(requests);

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
