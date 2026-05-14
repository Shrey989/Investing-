export default function Dashboard() {
  const watchlist = [
    { name: 'HDFC Bank', cmp: '₹1,550', daily: '+0.8%', weekly: '+2.3%', theme: 'Quality Financials', signal: 'Accumulate' },
    { name: 'Siemens India', cmp: '₹7,200', daily: '+1.1%', weekly: '+3.7%', theme: 'Electrification Backbone', signal: 'Strong' },
    { name: 'Power Grid', cmp: '₹315', daily: '+0.5%', weekly: '+1.9%', theme: 'AI Infra Transmission', signal: 'Hold / Add' },
  ];

  return (
    <main style={{
      minHeight:'100vh',
      background:'#2d2f34',
      color:'#ece7df',
      fontFamily:'Inter, sans-serif',
      padding:'40px'
    }}>
      <h1 style={{fontSize:'42px'}}>Investment Dashboard</h1>
      <p style={{color:'#b5aea5'}}>AI infra • value rotation • dislocation watch</p>

      <div style={{
        display:'grid',
        gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',
        gap:'20px',
        marginTop:'30px'
      }}>
        {[
          ['Nifty 50','24,180','+0.62%'],
          ['Sensex','79,420','+0.54%'],
          ['India VIX','15.2','-2.1%'],
          ['Brent Crude','$84','+1.8%']
        ].map((item)=>(
          <div key={item[0]} style={{
            background:'#393c41',
            border:'1px solid #4a4d52',
            borderRadius:'28px',
            padding:'24px'
          }}>
            <div style={{color:'#aaa39b'}}>{item[0]}</div>
            <div style={{fontSize:'34px',marginTop:'12px'}}>{item[1]}</div>
            <div style={{marginTop:'10px',color:'#8dd8a7'}}>{item[2]}</div>
          </div>
        ))}
      </div>

      <div style={{
        background:'#393c41',
        border:'1px solid #4a4d52',
        borderRadius:'30px',
        marginTop:'34px',
        overflow:'hidden'
      }}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead style={{background:'#33363a'}}>
            <tr>
              {['Stock','CMP','Daily','Weekly','Theme','Signal'].map((h)=>(
                <th key={h} style={{
                  textAlign:'left',
                  padding:'20px',
                  color:'#b5aea6'
                }}>{h}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {watchlist.map((s)=>(
              <tr key={s.name} style={{borderTop:'1px solid #4b4e53'}}>
                <td style={{padding:'20px'}}>{s.name}</td>
                <td style={{padding:'20px'}}>{s.cmp}</td>
                <td style={{padding:'20px',color:'#8dd8a7'}}>{s.daily}</td>
                <td style={{padding:'20px',color:'#8dd8a7'}}>{s.weekly}</td>
                <td style={{padding:'20px'}}>{s.theme}</td>
                <td style={{padding:'20px'}}>{s.signal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
