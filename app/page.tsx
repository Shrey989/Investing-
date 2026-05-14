"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [mfData, setMfData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchMFs() {
      try {
        const res = await fetch("/api/mf");
        const data = await res.json();
        setMfData(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMFs();
  }, []);

  const stocks = [
    {
      name: "HDFC Bank",
      value: "₹1,550",
      daily: "+0.8%",
      weekly: "+2.3%",
      theme: "Quality Financials",
      positive: true,
    },
    {
      name: "Siemens India",
      value: "₹7,200",
      daily: "+1.1%",
      weekly: "+3.7%",
      theme: "Electrification Backbone",
      positive: true,
    },
    {
      name: "Power Grid",
      value: "₹315",
      daily: "+0.5%",
      weekly: "+1.9%",
      theme: "AI Infra Transmission",
      positive: true,
    },
    {
      name: "Waaree Energies",
      value: "₹2,980",
      daily: "-1.2%",
      weekly: "+4.8%",
      theme: "Energy Transition",
      positive: false,
    },
    {
      name: "Anant Raj",
      value: "₹310",
      daily: "-0.7%",
      weekly: "+2.2%",
      theme: "Data Centers",
      positive: false,
    },
    {
      name: "Cummins India",
      value: "₹3,650",
      daily: "+0.9%",
      weekly: "+3.1%",
      theme: "AI Infra Backup Power",
      positive: true,
    },
  ];

  const dislocation = [
    {
      name: "SBI",
      value: "₹845",
      daily: "-1.1%",
      weekly: "-3.8%",
      reason: "NIM disappointment",
    },
    {
      name: "Tata Motors",
      value: "₹970",
      daily: "-2.3%",
      weekly: "-5.4%",
      reason: "Margin reset fears",
    },
    {
      name: "Infosys",
      value: "₹1,420",
      daily: "-1.4%",
      weekly: "-4.2%",
      reason: "IT slowdown concerns",
    },
  ];

  const cardStyle: React.CSSProperties = {
    background: "linear-gradient(180deg,#3a3d42 0%, #33363b 100%)",
    borderRadius: "28px",
    padding: "20px",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 10px 35px rgba(0,0,0,0.22)",
  };

  return (
    <main
      style={{
        background: "#2b2d31",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Inter, sans-serif",
        color: "#f4efe8",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              fontSize: "48px",
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: "-0.06em",
            }}
          >
            Investment
            <br />
            Dashboard
          </div>

          <div
            style={{
              marginTop: "18px",
              color: "#a8a29a",
              fontSize: "15px",
            }}
          >
            AI infra • value rotation • dislocation watch
          </div>
        </div>

        <SectionTitle title="Market Commentary" />

        <div style={{ ...cardStyle, lineHeight: 1.7 }}>
          Indian markets remain resilient despite elevated global uncertainty.
          Domestic liquidity continues supporting dips while leadership stays
          concentrated around infrastructure, power, financials and AI-adjacent
          industrial themes.
          <br />
          <br />
          FIIs remain cautious while DIIs continue absorbing volatility.
          Crude oil and US bond yields remain key macro risks.
        </div>

        <SectionTitle title="Core Watchlist" />

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {stocks.map((stock) => (
            <WatchCard
              key={stock.name}
              item={stock}
              label="CMP"
              cardStyle={cardStyle}
            />
          ))}
        </div>

        <SectionTitle title="Mutual Funds" />

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {mfData.map((fund) => (
            <div key={fund.name} style={cardStyle}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: 600,
                    }}
                  >
                    {fund.name}
                  </div>

                  <div
                    style={{
                      marginTop: "6px",
                      color: "#9f9991",
                      fontSize: "14px",
                    }}
                  >
                    Updated {fund.date}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      color: "#8f8981",
                      fontSize: "12px",
                      textAlign: "right",
                      marginBottom: "4px",
                    }}
                  >
                    NAV
                  </div>

                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: 600,
                    }}
                  >
                    ₹{fund.nav}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <SectionTitle title="Dislocation Watch" />

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {dislocation.map((stock) => (
            <div key={stock.name} style={cardStyle}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: 600,
                    }}
                  >
                    {stock.name}
                  </div>

                  <div
                    style={{
                      marginTop: "6px",
                      color: "#9f9991",
                      fontSize: "14px",
                    }}
                  >
                    {stock.reason}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 600,
                  }}
                >
                  {stock.value}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "18px",
                }}
              >
                <Pill text={`Day ${stock.daily}`} negative />
                <Pill text={`Week ${stock.weekly}`} negative />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function SectionTitle({ title }: any) {
  return (
    <div
      style={{
        marginTop: "34px",
        marginBottom: "12px",
        fontSize: "12px",
        letterSpacing: "0.18em",
        color: "#8d8780",
        textTransform: "uppercase",
      }}
    >
      {title}
    </div>
  );
}

function Pill({ text, negative = false }: any) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        padding: "10px 14px",
        borderRadius: "999px",
        color: negative ? "#ff8d8d" : "#8fd6a3",
        fontSize: "14px",
      }}
    >
      {text}
    </div>
  );
}

function WatchCard({ item, label, cardStyle }: any) {
  return (
    <div style={cardStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 600,
            }}
          >
            {item.name}
          </div>

          <div
            style={{
              marginTop: "6px",
              color: "#9f9991",
              fontSize: "14px",
            }}
          >
            {item.theme}
          </div>
        </div>

        <div>
          <div
            style={{
              color: "#8f8981",
              fontSize: "12px",
              textAlign: "right",
              marginBottom: "4px",
            }}
          >
            {label}
          </div>

          <div
            style={{
              fontSize: "28px",
              fontWeight: 600,
              letterSpacing: "-0.04em",
            }}
          >
            {item.value}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "18px",
        }}
      >
        <Pill text={`Day ${item.daily}`} negative={!item.positive} />

        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: "10px 14px",
            borderRadius: "999px",
            color: "#d7d0c7",
            fontSize: "14px",
          }}
        >
          Week {item.weekly}
        </div>
      </div>
    </div>
  );
}
