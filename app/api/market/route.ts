import yahooFinance from "yahoo-finance2";

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
        const quote = await yahooFinance.quote(symbol);

        return {
          symbol,
          price: quote.regularMarketPrice,
          change: quote.regularMarketChangePercent,
        };
      })
    );

    return Response.json(results);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch market data" },
      { status: 500 }
    );
  }
}
