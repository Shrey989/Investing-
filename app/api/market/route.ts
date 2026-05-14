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
      const res = await fetch(
        `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      const quote = data.quoteResponse.result[0];

      return {
        symbol,
        price: quote.regularMarketPrice,
        change: quote.regularMarketChangePercent,
      };
    });

    const results = await Promise.all(requests);

    return Response.json(results);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch market data" },
      { status: 500 }
    );
  }
}
