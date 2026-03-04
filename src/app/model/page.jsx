"use client";
import { useState, useEffect, useMemo } from "react";

const DEFAULTS = {
  // Growth
  monthlyGrowthRate: 15,
  startingUsers: 50,
  months: 60,
  churnRate: 3,

  // Pro Tier
  proPrice: 20,
  proConversion: 15,

  // Verified Credentials
  verifiedPrice: 65,
  verifiedConversion: 8,

  // Gym/Institutional
  gymPrice: 75,
  gymRatio: 5, // 1 gym per X users
  gymConversion: 20,

  // CE Track
  cePrice: 99,
  ceConversionRate: 5,
  ceLaunchMonth: 12,

  // Costs
  hostingBase: 30,
  hostingPerUser: 0.15,
  authPerUser: 0.02,
  storagePerUser: 0.05,
  emailMarketing: 50,
  miscMonthly: 100,
  // Dev/support costs are calculated dynamically based on user count
  devHourlyRate: 100,
};

function SliderInput({ label, value, onChange, min, max, step = 1, unit = "", prefix = "" }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6,
      }}>
        <span style={{
          fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12.5, color: "rgba(245,240,232,0.5)",
        }}>{label}</span>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: "#C5A572", fontWeight: 600,
        }}>{prefix}{typeof value === 'number' && value % 1 !== 0 ? value.toFixed(2) : value}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width: "100%", accentColor: "#C5A572", cursor: "pointer" }}
      />
      <div style={{
        display: "flex", justifyContent: "space-between",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "rgba(245,240,232,0.15)", marginTop: 2,
      }}>
        <span>{prefix}{min}{unit}</span>
        <span>{prefix}{max}{unit}</span>
      </div>
    </div>
  );
}

function MetricCard({ label, value, sub, color = "#C5A572", small = false }) {
  return (
    <div style={{
      padding: small ? "14px 16px" : "18px 22px",
      border: `1px solid ${color}18`,
      background: `${color}06`,
    }}>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: 2,
        textTransform: "uppercase", color: `${color}90`, marginBottom: 8,
      }}>{label}</div>
      <div style={{
        fontFamily: "'Instrument Serif', Georgia, serif", fontSize: small ? 22 : 28, color: "#F5F0E8",
      }}>{value}</div>
      {sub && <div style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "rgba(245,240,232,0.2)", marginTop: 4,
      }}>{sub}</div>}
    </div>
  );
}

function MiniBar({ data, maxVal, color, height = 100 }) {
  const barW = Math.max(2, Math.floor((100 / data.length) * 0.7));
  return (
    <div style={{
      display: "flex", alignItems: "flex-end", gap: 1, height,
      padding: "0 2px",
    }}>
      {data.map((v, i) => (
        <div key={i} style={{
          flex: 1, minWidth: 2,
          height: `${Math.max(1, (v / (maxVal || 1)) * 100)}%`,
          background: `${color}${Math.floor(30 + (i / data.length) * 50).toString(16).padStart(2, '0')}`,
          transition: "height 0.4s ease",
        }} />
      ))}
    </div>
  );
}

function ProjectionTable({ data }) {
  const milestones = Array.from(new Set([0, ...Array.from({length: Math.ceil(data.length / 3)}, (_, i) => Math.min(i * 3 + 2, data.length - 1)), data.length - 1])).filter(i => i < data.length).sort((a, b) => a - b).slice(0, 16);
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{
        width: "100%", borderCollapse: "collapse",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
      }}>
        <thead>
          <tr>
            {["Month", "Users", "Pro Subs", "Revenue", "Costs", "Net"].map(h => (
              <th key={h} style={{
                textAlign: "right", padding: "10px 14px",
                fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase",
                color: "rgba(245,240,232,0.25)", borderBottom: "1px solid rgba(245,240,232,0.08)",
                ...(h === "Month" ? { textAlign: "left" } : {}),
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {milestones.map(i => {
            const d = data[i];
            const netColor = d.net >= 0 ? "#7A9E7E" : "#BF6B6B";
            return (
              <tr key={i} style={{
                borderBottom: "1px solid rgba(245,240,232,0.04)",
              }}>
                <td style={{ padding: "10px 14px", color: "rgba(245,240,232,0.4)" }}>{d.month}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: "rgba(245,240,232,0.5)" }}>{d.totalUsers.toLocaleString()}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: "rgba(245,240,232,0.35)" }}>{d.proSubs.toLocaleString()}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: "#C5A572" }}>${d.revenue.toLocaleString()}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: "rgba(245,240,232,0.35)" }}>${d.costs.toLocaleString()}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: netColor, fontWeight: 600 }}>
                  {d.net >= 0 ? "" : "−"}${Math.abs(d.net).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function FinancialModel() {
  const [params, setParams] = useState(DEFAULTS);
  const set = (key) => (val) => setParams(p => ({ ...p, [key]: val }));

  const projection = useMemo(() => {
    const data = [];
    let users = params.startingUsers;
    let cumRevenue = 0;
    let cumCosts = 0;

    for (let m = 0; m < params.months; m++) {
      // Growth with diminishing returns
      const growthMultiplier = Math.max(0.3, 1 - (m / (params.months * 2)));
      const newUsers = Math.round(users * (params.monthlyGrowthRate / 100) * growthMultiplier);
      const churned = Math.round(users * (params.churnRate / 100));
      users = users + newUsers - churned;

      const proSubs = Math.round(users * (params.proConversion / 100));
      const verifiedUsers = Math.round(users * (params.verifiedConversion / 100));
      const gymCount = Math.round((users / Math.max(1, params.gymRatio)) * (params.gymConversion / 100));
      const ceUsers = m >= params.ceLaunchMonth ? Math.round(users * (params.ceConversionRate / 100)) : 0;

      const proRevenue = proSubs * params.proPrice;
      const verifiedRevenue = Math.round((verifiedUsers * params.verifiedPrice) / 12);
      const gymRevenue = gymCount * params.gymPrice;
      const ceRevenue = Math.round((ceUsers * params.cePrice) / 12);
      const revenue = proRevenue + verifiedRevenue + gymRevenue + ceRevenue;

      // Dynamic dev/support costs based on user count
      let devHoursPerWeek = 0;
      let supportHeadcount = 0;
      let modHoursPerWeek = 0;
      let devLabel = "Solo / DIY";

      if (users < 500) {
        // Phase 1: DIY
        devHoursPerWeek = 0;
        supportHeadcount = 0;
        modHoursPerWeek = 0;
        devLabel = "Solo / DIY";
      } else if (users < 2000) {
        // Phase 2: Part-time contractor
        devHoursPerWeek = 10 + Math.round((users - 500) / 150); // 10-20 hrs/wk
        supportHeadcount = 0;
        modHoursPerWeek = 2 + Math.round((users - 500) / 500) * 2;
        devLabel = "Part-time contractor";
      } else if (users < 5000) {
        // Phase 3: Serious support needed
        devHoursPerWeek = 20 + Math.round((users - 2000) / 300); // 20-30 hrs
        supportHeadcount = 1; // part-time support/community person
        modHoursPerWeek = 8 + Math.round((users - 2000) / 750) * 2;
        devLabel = "Contractor + PT support";
      } else if (users < 10000) {
        // Phase 4: Small team
        devHoursPerWeek = 40; // full-time dev
        supportHeadcount = 1.5; // 1 FT support + PT mod
        modHoursPerWeek = 15 + Math.round((users - 5000) / 1000) * 2;
        devLabel = "FT dev + support team";
      } else {
        // Phase 5: Real company
        const additionalDevs = Math.floor((users - 10000) / 10000);
        devHoursPerWeek = 40 * (2 + additionalDevs); // 2+ FT devs
        supportHeadcount = 2 + Math.floor((users - 10000) / 5000);
        modHoursPerWeek = 20 + Math.round((users - 10000) / 2000) * 2;
        devLabel = `${2 + additionalDevs} devs + ${supportHeadcount} support`;
      }

      const devCost = Math.round((devHoursPerWeek * params.devHourlyRate * 4.33)); // monthly
      const supportCost = Math.round(supportHeadcount * 3500); // ~$42k/yr per support person
      const modCost = Math.round(modHoursPerWeek * 25 * 4.33); // mod at $25/hr
      const peopleCost = devCost + supportCost + modCost;

      const hosting = params.hostingBase + (users * params.hostingPerUser);
      const auth = users * params.authPerUser;
      const storage = users * params.storagePerUser;
      const infraCost = Math.round(hosting + auth + storage);
      const operatingCost = Math.round(params.emailMarketing + params.miscMonthly);
      const costs = infraCost + peopleCost + operatingCost;

      cumRevenue += revenue;
      cumCosts += costs;

      data.push({
        month: m + 1,
        totalUsers: users,
        newUsers,
        churned,
        proSubs,
        verifiedUsers,
        gymCount,
        ceUsers,
        proRevenue,
        verifiedRevenue,
        gymRevenue,
        ceRevenue,
        revenue,
        costs,
        infraCost,
        peopleCost,
        devCost,
        supportCost,
        modCost,
        operatingCost,
        devLabel,
        net: revenue - costs,
        cumRevenue,
        cumCosts,
        cumNet: cumRevenue - cumCosts,
      });
    }
    return data;
  }, [params]);

  const last = projection[projection.length - 1];
  const breakEvenMonth = projection.findIndex(d => d.net > 0) + 1;
  const cumBreakEven = projection.findIndex(d => d.cumNet > 0) + 1;
  const peakBurn = Math.min(...projection.map(d => d.net));

  const revenueData = projection.map(d => d.revenue);
  const costData = projection.map(d => d.costs);
  const netData = projection.map(d => d.net);
  const userGrowth = projection.map(d => d.totalUsers);
  const maxRevenue = Math.max(...revenueData, 1);
  const maxUsers = Math.max(...userGrowth, 1);
  const maxNet = Math.max(...netData.map(Math.abs), 1);

  return (
    <div style={{
      background: "#0C0C0C", minHeight: "100vh", color: "#F5F0E8",
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;1,400&family=Instrument+Serif:ital@0;1&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: rgba(197,165,114,0.3); }
        input[type="range"] { height: 3px; -webkit-appearance: none; background: rgba(245,240,232,0.08); outline: none; border-radius: 0; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; background: #C5A572; cursor: pointer; border: none; border-radius: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #0C0C0C; }
        ::-webkit-scrollbar-thumb { background: rgba(197,165,114,0.12); }
      `}</style>

      {/* Header */}
      <header style={{
        padding: "24px 36px", borderBottom: "1px solid rgba(245,240,232,0.05)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 24, height: 24, border: "2px solid #C5A572",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, fontWeight: 700, color: "#C5A572",
          }}>HL</div>
          <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18, color: "#F5F0E8" }}>Heavy Ledger</span>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: 2,
            textTransform: "uppercase", color: "rgba(197,165,114,0.35)", marginLeft: 8,
          }}>Financial Model</span>
        </div>
        <button onClick={() => setParams(DEFAULTS)} style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 1, textTransform: "uppercase",
          background: "transparent", color: "rgba(245,240,232,0.25)", border: "1px solid rgba(245,240,232,0.08)",
          padding: "6px 14px", cursor: "pointer",
        }}>Reset Defaults</button>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", minHeight: "calc(100vh - 73px)" }}>

        {/* Left: Controls */}
        <div style={{
          borderRight: "1px solid rgba(245,240,232,0.05)",
          padding: "28px 24px", overflowY: "auto", maxHeight: "calc(100vh - 73px)",
        }}>
          {/* Growth */}
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: 2.5,
            textTransform: "uppercase", color: "rgba(197,165,114,0.45)", marginBottom: 18,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{ height: 1, width: 16, background: "rgba(197,165,114,0.3)" }} />
            Growth Assumptions
          </div>
          <SliderInput label="Starting Users" value={params.startingUsers} onChange={set("startingUsers")} min={10} max={2000} step={10} />
          <SliderInput label="Monthly Growth Rate" value={params.monthlyGrowthRate} onChange={set("monthlyGrowthRate")} min={2} max={60} unit="%" />
          <SliderInput label="Monthly Churn" value={params.churnRate} onChange={set("churnRate")} min={0} max={15} step={0.5} unit="%" />
          <SliderInput label="Projection Window" value={params.months} onChange={set("months")} min={6} max={60} unit=" mo" />

          {/* Revenue */}
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: 2.5,
            textTransform: "uppercase", color: "rgba(197,165,114,0.45)", margin: "28px 0 18px",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{ height: 1, width: 16, background: "rgba(197,165,114,0.3)" }} />
            Revenue Streams
          </div>
          <SliderInput label="Pro Tier Price" value={params.proPrice} onChange={set("proPrice")} min={5} max={100} prefix="$" unit="/mo" />
          <SliderInput label="Pro Conversion Rate" value={params.proConversion} onChange={set("proConversion")} min={2} max={40} unit="%" />
          <SliderInput label="Verified Badge Price" value={params.verifiedPrice} onChange={set("verifiedPrice")} min={25} max={200} prefix="$" unit="/yr" />
          <SliderInput label="Verified Conversion" value={params.verifiedConversion} onChange={set("verifiedConversion")} min={1} max={25} unit="%" />
          <SliderInput label="Gym Account Price" value={params.gymPrice} onChange={set("gymPrice")} min={25} max={200} prefix="$" unit="/mo" />
          <SliderInput label="Gym : User Ratio" value={params.gymRatio} onChange={set("gymRatio")} min={2} max={20} unit=" users per gym" />
          <SliderInput label="Gym Conversion Rate" value={params.gymConversion} onChange={set("gymConversion")} min={5} max={50} unit="%" />
          <SliderInput label="CE Track Price" value={params.cePrice} onChange={set("cePrice")} min={49} max={249} prefix="$" unit="/yr" />
          <SliderInput label="CE Conversion Rate" value={params.ceConversionRate} onChange={set("ceConversionRate")} min={1} max={20} unit="%" />
          <SliderInput label="CE Launch Month" value={params.ceLaunchMonth} onChange={set("ceLaunchMonth")} min={1} max={48} unit="" />

          {/* Costs */}
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: 2.5,
            textTransform: "uppercase", color: "rgba(197,165,114,0.45)", margin: "28px 0 18px",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{ height: 1, width: 16, background: "rgba(197,165,114,0.3)" }} />
            Cost Structure
          </div>
          <SliderInput label="Hosting Base" value={params.hostingBase} onChange={set("hostingBase")} min={10} max={500} prefix="$" unit="/mo" />
          <SliderInput label="Hosting Per User" value={params.hostingPerUser} onChange={set("hostingPerUser")} min={0.01} max={1} step={0.01} prefix="$" />
          <SliderInput label="Auth Per User" value={params.authPerUser} onChange={set("authPerUser")} min={0} max={0.2} step={0.01} prefix="$" />
          <SliderInput label="Storage Per User" value={params.storagePerUser} onChange={set("storagePerUser")} min={0} max={0.5} step={0.01} prefix="$" />
          <SliderInput label="Email/Marketing" value={params.emailMarketing} onChange={set("emailMarketing")} min={0} max={2000} prefix="$" unit="/mo" />
          <SliderInput label="Dev/Contractor Rate" value={params.devHourlyRate} onChange={set("devHourlyRate")} min={50} max={200} prefix="$" unit="/hr" />
          <SliderInput label="Misc/Other" value={params.miscMonthly} onChange={set("miscMonthly")} min={0} max={2000} prefix="$" unit="/mo" />
        </div>

        {/* Right: Results */}
        <div style={{ padding: "28px 36px", overflowY: "auto", maxHeight: "calc(100vh - 73px)" }}>

          {/* Headline metrics */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 36,
          }}>
            <MetricCard
              label={`Users at Month ${params.months}`}
              value={last.totalUsers.toLocaleString()}
              sub={`${last.proSubs} pro subscribers`}
            />
            <MetricCard
              label={`Monthly Revenue (Mo ${params.months})`}
              value={`$${last.revenue.toLocaleString()}`}
              sub={`$${last.costs.toLocaleString()} in costs`}
              color="#7A9E7E"
            />
            <MetricCard
              label="Monthly Break-Even"
              value={breakEvenMonth > 0 ? `Month ${breakEvenMonth}` : "Not reached"}
              sub={breakEvenMonth > 0 ? `~${projection[breakEvenMonth - 1]?.totalUsers.toLocaleString()} users` : `Peak burn: $${Math.abs(peakBurn).toLocaleString()}/mo`}
              color={breakEvenMonth > 0 ? "#7A9E7E" : "#BF6B6B"}
            />
            <MetricCard
              label="Cumulative P&L"
              value={`${last.cumNet >= 0 ? "" : "−"}$${Math.abs(last.cumNet).toLocaleString()}`}
              sub={cumBreakEven > 0 ? `Cumulative break-even: Mo ${cumBreakEven}` : "Not yet profitable cumulatively"}
              color={last.cumNet >= 0 ? "#7A9E7E" : "#BF6B6B"}
            />
          </div>

          {/* Charts row */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 36,
          }}>
            {/* User growth chart */}
            <div style={{ border: "1px solid rgba(245,240,232,0.06)", padding: "18px 20px" }}>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: 2,
                textTransform: "uppercase", color: "rgba(245,240,232,0.25)", marginBottom: 14,
              }}>User Growth</div>
              <MiniBar data={userGrowth} maxVal={maxUsers} color="#C5A572" height={80} />
              <div style={{
                display: "flex", justifyContent: "space-between", marginTop: 8,
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "rgba(245,240,232,0.13)",
              }}>
                <span>Mo 1</span>
                <span>Mo {params.months}</span>
              </div>
            </div>

            {/* Revenue chart */}
            <div style={{ border: "1px solid rgba(245,240,232,0.06)", padding: "18px 20px" }}>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: 2,
                textTransform: "uppercase", color: "rgba(245,240,232,0.25)", marginBottom: 14,
              }}>Monthly Revenue</div>
              <MiniBar data={revenueData} maxVal={maxRevenue} color="#7A9E7E" height={80} />
              <div style={{
                display: "flex", justifyContent: "space-between", marginTop: 8,
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "rgba(245,240,232,0.13)",
              }}>
                <span>${revenueData[0]}</span>
                <span>${last.revenue.toLocaleString()}</span>
              </div>
            </div>

            {/* Net P&L chart */}
            <div style={{ border: "1px solid rgba(245,240,232,0.06)", padding: "18px 20px" }}>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: 2,
                textTransform: "uppercase", color: "rgba(245,240,232,0.25)", marginBottom: 14,
              }}>Net Monthly P&L</div>
              <div style={{ display: "flex", alignItems: "center", height: 80, gap: 1 }}>
                {netData.map((v, i) => {
                  const isPos = v >= 0;
                  const pct = Math.abs(v) / maxNet * 50;
                  return (
                    <div key={i} style={{
                      flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
                      height: "100%", position: "relative",
                    }}>
                      <div style={{
                        position: "absolute", top: isPos ? `${50 - pct}%` : "50%",
                        height: `${pct}%`, width: "100%", minHeight: 1,
                        background: isPos
                          ? `rgba(122,158,126,${0.2 + (i / netData.length) * 0.5})`
                          : `rgba(191,107,107,${0.2 + (i / netData.length) * 0.3})`,
                        transition: "all 0.4s ease",
                      }} />
                    </div>
                  );
                })}
              </div>
              <div style={{
                height: 1, background: "rgba(245,240,232,0.08)", marginTop: -40, marginBottom: 39,
                position: "relative", zIndex: 1, pointerEvents: "none",
              }} />
              <div style={{
                display: "flex", justifyContent: "space-between", marginTop: 8,
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "rgba(245,240,232,0.13)",
              }}>
                <span>{netData[0] >= 0 ? "" : "−"}${Math.abs(netData[0])}</span>
                <span>{last.net >= 0 ? "+" : "−"}${Math.abs(last.net).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Revenue breakdown at endpoint */}
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: 2.5,
            textTransform: "uppercase", color: "rgba(197,165,114,0.45)", marginBottom: 18,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{ height: 1, width: 16, background: "rgba(197,165,114,0.3)" }} />
            Revenue Breakdown — Month {params.months}
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 36,
          }}>
            <MetricCard small label="Pro Tier" value={`$${last.proRevenue.toLocaleString()}`} sub={`${last.proSubs} subscribers`} color="#C5A572" />
            <MetricCard small label="Verified Badges" value={`$${last.verifiedRevenue.toLocaleString()}`} sub={`${last.verifiedUsers} verified users`} color="#6B8EBF" />
            <MetricCard small label="Gym Accounts" value={`$${last.gymRevenue.toLocaleString()}`} sub={`${last.gymCount} gym accounts`} color="#BF8B6B" />
            <MetricCard small label="CE Track" value={`$${last.ceRevenue.toLocaleString()}`} sub={last.ceUsers > 0 ? `${last.ceUsers} enrolled` : `Launches month ${params.ceLaunchMonth}`} color="#8B7EB8" />
          </div>

          {/* Revenue bar visualization */}
          <div style={{
            display: "flex", height: 28, marginBottom: 8, overflow: "hidden",
            border: "1px solid rgba(245,240,232,0.06)",
          }}>
            {[
              { val: last.proRevenue, color: "#C5A572", label: "Pro" },
              { val: last.verifiedRevenue, color: "#6B8EBF", label: "Verified" },
              { val: last.gymRevenue, color: "#BF8B6B", label: "Gym" },
              { val: last.ceRevenue, color: "#8B7EB8", label: "CE" },
            ].map((seg, i) => {
              const pct = last.revenue > 0 ? (seg.val / last.revenue) * 100 : 0;
              return pct > 0 ? (
                <div key={i} style={{
                  width: `${pct}%`, background: `${seg.color}30`, borderRight: "1px solid #0C0C0C",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: seg.color,
                  overflow: "hidden", whiteSpace: "nowrap",
                }}>{pct > 12 ? `${seg.label} ${Math.round(pct)}%` : ""}</div>
              ) : null;
            })}
          </div>
          <div style={{
            display: "flex", gap: 16, marginBottom: 36,
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "rgba(245,240,232,0.2)",
          }}>
            {[
              { color: "#C5A572", label: "Pro Tier" },
              { color: "#6B8EBF", label: "Verified" },
              { color: "#BF8B6B", label: "Gym" },
              { color: "#8B7EB8", label: "CE Track" },
            ].map(l => (
              <span key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 8, height: 8, background: `${l.color}50`, display: "inline-block" }} />
                {l.label}
              </span>
            ))}
          </div>

          {/* Projection table */}
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: 2.5,
            textTransform: "uppercase", color: "rgba(197,165,114,0.45)", marginBottom: 18,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{ height: 1, width: 16, background: "rgba(197,165,114,0.3)" }} />
            Monthly Projection
          </div>
          <div style={{ border: "1px solid rgba(245,240,232,0.06)" }}>
            <ProjectionTable data={projection} />
          </div>

          {/* Scenario notes */}
          <div style={{
            marginTop: 36, padding: 24, border: "1px solid rgba(245,240,232,0.06)",
            background: "rgba(245,240,232,0.015)",
          }}>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: 2,
              textTransform: "uppercase", color: "rgba(245,240,232,0.25)", marginBottom: 14,
            }}>Model Assumptions</div>
            <div style={{
              fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12.5, lineHeight: 1.7,
              color: "rgba(245,240,232,0.35)",
            }}>
              Growth uses a diminishing multiplier (early months grow faster). Churn is applied monthly.
              Verified badge and CE track revenues are annualized to monthly. Gym count is derived from the
              user-to-gym ratio × gym conversion rate. All per-user costs scale linearly.
              CE track revenue only begins at the specified launch month. This model does not account for
              one-time development costs, seasonal variation, or marketing spend beyond the monthly email line item.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
