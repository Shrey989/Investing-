"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [liveData, setLiveData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchMarket() {
      try {
        const res = await fetch("/api/market");
        const data = await res.json();
        setLiveData(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMarket();
  }, []);

  const stocks = [
    {
      name: "HDFC Bank",
      value: liveData[0]?.price
        ? `₹${liveData[0].price}`
        : "Loading...",
      daily: liveData[0]?.change
        ? `${liveData[0].change.toFixed(2)}%`
        : "--",
      weekly: "+2.3%",
      theme: "Quality Financials",
      positive: (liveData[0]?.change || 0) >= 0,
    },
    {
      name: "Siemens India",
      value: liveData[1]?.price
        ? `₹${liveData[1].price}`
        : "Loading...",
      daily: liveData[1]?.change
        ? `${liveData[1].change.toFixed(2)}%`
        : "--",
      weekly: "+3.7%",
      theme: "Electrification Backbone",
      positive: (liveData[1]?.change || 0) >= 0,
    },
  ];

  return (
    <main style={{
      background: "#2b2d31",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "Inter, sans-serif",
      color: "#f4efe8",
    }}>
      <div style={{maxWidth:"520px",margin:"0 auto"}}>
        <h1 style={{
          fontSize:"48px",
          fontWeight:700,
          lineHeight:0.92,
          letterSpacing:"-0.06em"
        }}>
          Investment Dashboard
        </h1>

        <div style={{
          marginTop:"18px",
          color:"#a8a29a",
          fontSize:"15px"
        }}>
          AI infra • value rotation • live market data
        </div>

        <div style={{
          display:"flex",
          flexDirection:"column",
          gap:"14px",
          marginTop:"32px"
        }}>
          {stocks.map((stock)=>(
            <div key={stock.name} style={{
              background:"linear-gradient(180deg,#3a3d42 0%, #33363b 100%)",
              borderRadius:"28px",
              padding:"20px",
              border:"1px solid rgba(255,255,255,0.05)",
              boxShadow:"0 10px 35px rgba(0,0,0,0.22)"
            }}>
              <div style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"flex-start"
              }}>
                <div>
                  <div style={{
                    fontSize:"22px",
                    fontWeight:600
                  }}>
                    {stock.name}
                  </div>

                  <div style={{
                    marginTop:"6px",
                    color:"#9f9991",
                    fontSize:"14px"
                  }}>
                    {stock.theme}
                  </div>
                </div>

                <div style={{
                  fontSize:"28px",
                  fontWeight:600
                }}>
                  {stock.value}
                </div>
              </div>

              <div style={{
                marginTop:"18px",
                color:stock.positive ? "#8fd6a3" : "#ff8d8d"
              }}>
                Day {stock.daily}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
