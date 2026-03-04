"use client";
import { useState, useEffect, useRef } from "react";

const USER = { name: "Sarah", avatar: "SC" };

const STATS = [
  { label: "Profile Views", value: "342", change: "+18%", period: "vs last 30d" },
  { label: "Publication Views", value: "4,817", change: "+34%", period: "vs last 30d" },
  { label: "New Followers", value: "67", change: "+12%", period: "this month" },
  { label: "Client Inquiries", value: "8", change: "+3", period: "this week" },
];

const INQUIRIES = [
  { name: "Tyler Ross", time: "2h ago", message: "Interested in your remote coaching. I'm an intermediate powerlifter (405/275/475) looking to peak for a meet in June. Your undulating block article really resonated.", status: "new" },
  { name: "Maria Santos", time: "1d ago", message: "I coach a D3 women's volleyball team and I'd love to discuss your offseason GPP template. Could we set up a call?", status: "new" },
  { name: "Ben Crawford", time: "3d ago", message: "Following up on our conversation — I've attached my last 12 weeks of training logs. Ready to start whenever you are.", status: "replied" },
];

const FEED = [
  { author: "Marcus Webb", avatar: "MW", avatarColor: "#7A9E7E", type: "Performance Data", title: "Bar Velocity Trends Across a Peaking Block: 14 Athletes", time: "45m ago", excerpt: "New data set from our last meet prep cycle. The relationship between mean velocity and RPE diverged significantly in weeks 3-4 for most lifters.", reactions: 43, comments: 12 },
  { author: "Iron Mind Gym", avatar: "IM", avatarColor: "#BF8B6B", type: "Pedagogy", title: "Rethinking the Group Warm-Up: Why We Scrapped Our Template", time: "2h ago", excerpt: "After 6 months of individualized warm-up protocols in a group setting, here's what changed — and what we learned about coaching efficiency vs. athlete autonomy.", reactions: 87, comments: 31 },
  { author: "Dr. James Liu", avatar: "JL", avatarColor: "#6B8EBF", type: "Case Study", title: "Return-to-Sport After Patellar Tendinopathy: A 9-Month Timeline", time: "4h ago", excerpt: "Full rehab-to-performance case study on a collegiate basketball player. Includes load management data, isometric testing progression, and the decision framework for return.", reactions: 64, comments: 19 },
  { author: "Rina Takahashi", avatar: "RT", avatarColor: "#8B7EB8", type: "Theory", title: "Why 'Progressive Overload' Is an Incomplete Model", time: "6h ago", excerpt: "We treat progressive overload like a universal law but it's really a heuristic. Here's a more nuanced framework that accounts for readiness, fatigue debt, and individual response curves.", reactions: 156, comments: 48 },
];

const NOTIFICATIONS = [
  { icon: "▲", color: "#C5A572", text: "Your post \"The Undulating Block\" reached 300 reactions", time: "1h ago" },
  { icon: "◬", color: "#7A9E7E", text: "Coach Rivera commented on \"Velocity Loss Thresholds\"", time: "3h ago" },
  { icon: "★", color: "#C5A572", text: "You were mentioned in Marcus Webb's new publication", time: "5h ago" },
  { icon: "◆", color: "#6B8EBF", text: "New peer review request from Dr. Anika Patel", time: "8h ago" },
  { icon: "●", color: "#8B7EB8", text: "Rina Takahashi started following you", time: "12h ago" },
];

const DRAFTS = [
  { title: "Eccentric Overload for Tendon Health: Protocol Comparison", progress: 72, lastEdited: "Yesterday" },
  { title: "Programming for the Masters Athlete: What Changes After 40", progress: 35, lastEdited: "3 days ago" },
];

const TOP_POSTS = [
  { title: "The Undulating Block: 16-Week Hybrid", views: "2,341", saves: 214 },
  { title: "Why Linear Periodization Fails Intermediates", views: "1,890", saves: 178 },
  { title: "Minimum Effective Volume Is Context-Dependent", views: "1,204", saves: 143 },
];

const typeColors = {
  "Training Plan": "#C5A572",
  "Case Study": "#7A9E7E",
  "Performance Data": "#6B8EBF",
  Pedagogy: "#8B7EB8",
  Theory: "#BF8B6B",
};

function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "home", icon: "⊞", label: "Home" },
    { id: "feed", icon: "◧", label: "Feed" },
    { id: "publish", icon: "✎", label: "Publish" },
    { id: "clients", icon: "◇", label: "Clients" },
    { id: "analytics", icon: "◫", label: "Analytics" },
    { id: "messages", icon: "◬", label: "Messages" },
    { id: "settings", icon: "⊡", label: "Settings" },
  ];

  return (
    <aside style={{
      width: 220, position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 50,
      background: "rgba(8,8,8,0.95)", borderRight: "1px solid rgba(245,240,232,0.05)",
      display: "flex", flexDirection: "column", padding: "0 0 20px",
    }}>
      {/* Logo */}
      <div style={{
        padding: "20px 22px", display: "flex", alignItems: "center", gap: 10,
        borderBottom: "1px solid rgba(245,240,232,0.04)", marginBottom: 8,
      }}>
        <div style={{
          width: 24, height: 24, border: "2px solid #C5A572",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, fontWeight: 700, color: "#C5A572", letterSpacing: 1,
        }}>HL</div>
        <span style={{
          fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 16, color: "#F5F0E8",
        }}>Heavy Ledger</span>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: "8px 10px" }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 12,
              padding: "10px 14px", marginBottom: 2, border: "none", cursor: "pointer",
              background: activeTab === tab.id ? "rgba(197,165,114,0.08)" : "transparent",
              borderLeft: activeTab === tab.id ? "2px solid #C5A572" : "2px solid transparent",
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: 0.5,
              color: activeTab === tab.id ? "#C5A572" : "rgba(245,240,232,0.35)",
              transition: "all 0.2s ease", textAlign: "left",
            }}
          >
            <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>{tab.icon}</span>
            {tab.label}
            {tab.id === "clients" && (
              <span style={{
                marginLeft: "auto", background: "rgba(122,158,126,0.15)", color: "#7A9E7E",
                fontSize: 9, padding: "2px 6px", fontWeight: 600,
              }}>2</span>
            )}
            {tab.id === "messages" && (
              <span style={{
                marginLeft: "auto", background: "rgba(197,165,114,0.15)", color: "#C5A572",
                fontSize: 9, padding: "2px 6px", fontWeight: 600,
              }}>4</span>
            )}
          </button>
        ))}
      </nav>

      {/* New post button */}
      <div style={{ padding: "0 14px", marginBottom: 16 }}>
        <button style={{
          width: "100%", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: 1.5,
          textTransform: "uppercase", background: "#C5A572", color: "#0C0C0C",
          border: "none", padding: "11px 0", cursor: "pointer", fontWeight: 600,
        }}>+ New Publication</button>
      </div>

      {/* User */}
      <div style={{
        padding: "14px 18px", borderTop: "1px solid rgba(245,240,232,0.04)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 32, height: 32, background: "rgba(197,165,114,0.1)", border: "1px solid rgba(197,165,114,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 600, color: "#C5A572",
        }}>{USER.avatar}</div>
        <div>
          <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "#F5F0E8" }}>Dr. Sarah Chen</div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "rgba(245,240,232,0.25)",
          }}>View Profile</div>
        </div>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <header style={{
      position: "fixed", top: 0, left: 220, right: 0, height: 56, zIndex: 40,
      background: "rgba(12,12,12,0.9)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(245,240,232,0.05)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{
          fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18, color: "#F5F0E8",
        }}>Dashboard</span>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "rgba(245,240,232,0.2)",
          letterSpacing: 0.5,
        }}>Monday, March 2</span>
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "rgba(245,240,232,0.04)", border: "1px solid rgba(245,240,232,0.06)",
        padding: "7px 14px", width: 280,
      }}>
        <span style={{ color: "rgba(245,240,232,0.2)", fontSize: 13 }}>⌕</span>
        <input placeholder="Search publications, people, topics..." style={{
          background: "transparent", border: "none", outline: "none",
          fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: "#F5F0E8", width: "100%",
        }} />
      </div>
    </header>
  );
}

function StatCard({ stat, index, visible }) {
  const isPositive = stat.change.includes("+");
  return (
    <div style={{
      border: "1px solid rgba(245,240,232,0.06)", padding: "22px 24px",
      background: "rgba(245,240,232,0.015)",
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)",
      transition: `all 0.5s ease ${0.1 + index * 0.08}s`,
    }}>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: 2,
        textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: 10,
      }}>{stat.label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{
          fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 32, color: "#F5F0E8",
        }}>{stat.value}</span>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 600,
          color: isPositive ? "#7A9E7E" : "#BF6B6B",
        }}>{stat.change}</span>
      </div>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "rgba(245,240,232,0.18)", marginTop: 4,
      }}>{stat.period}</div>
    </div>
  );
}

function InquiryCard({ inquiry, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        padding: "18px 20px", cursor: "pointer",
        background: hovered ? "rgba(197,165,114,0.03)" : "transparent",
        borderBottom: "1px solid rgba(245,240,232,0.04)",
        opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-10px)",
        transition: `all 0.4s ease ${0.15 + index * 0.1}s`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 15, color: "#F5F0E8",
          }}>{inquiry.name}</span>
          {inquiry.status === "new" && (
            <span style={{
              width: 6, height: 6, borderRadius: "50%", background: "#7A9E7E", display: "inline-block",
            }} />
          )}
        </div>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "rgba(245,240,232,0.18)",
        }}>{inquiry.time}</span>
      </div>
      <p style={{
        fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12.5, lineHeight: 1.55,
        color: "rgba(245,240,232,0.38)", margin: 0,
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
      }}>{inquiry.message}</p>
    </div>
  );
}

function FeedCard({ item, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        padding: "24px 0", borderBottom: "1px solid rgba(245,240,232,0.04)", cursor: "pointer",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `all 0.5s ease ${0.1 + index * 0.08}s`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 30, height: 30, background: `${item.avatarColor}15`, border: `1px solid ${item.avatarColor}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, fontWeight: 600, color: item.avatarColor,
        }}>{item.avatar}</div>
        <span style={{
          fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "rgba(245,240,232,0.5)",
        }}>{item.author}</span>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: 1, textTransform: "uppercase",
          color: typeColors[item.type], background: `${typeColors[item.type]}10`,
          padding: "3px 8px", border: `1px solid ${typeColors[item.type]}20`,
        }}>{item.type}</span>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "rgba(245,240,232,0.15)", marginLeft: "auto",
        }}>{item.time}</span>
      </div>
      <h3 style={{
        fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 19, fontWeight: 400,
        color: hovered ? "#C5A572" : "#F5F0E8", margin: "0 0 8px", transition: "color 0.3s", lineHeight: 1.3,
      }}>{item.title}</h3>
      <p style={{
        fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, lineHeight: 1.6,
        color: "rgba(245,240,232,0.33)", margin: 0,
      }}>{item.excerpt}</p>
      <div style={{
        display: "flex", gap: 20, marginTop: 14,
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "rgba(245,240,232,0.2)",
      }}>
        <span>▲ {item.reactions}</span>
        <span>◬ {item.comments}</span>
        <span style={{ marginLeft: "auto", color: "rgba(197,165,114,0.3)" }}>⊞ Save</span>
      </div>
    </div>
  );
}

function SectionHead({ label, action }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ height: 1, width: 20, background: "rgba(197,165,114,0.3)" }} />
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 2.5,
          textTransform: "uppercase", color: "rgba(197,165,114,0.45)",
        }}>{label}</span>
      </div>
      {action && (
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 0.5,
          color: "rgba(245,240,232,0.2)", cursor: "pointer", textTransform: "uppercase",
        }}>{action}</span>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [loaded, setLoaded] = useState(false);
  const [statsRef, statsVis] = useInView();
  const [inquiriesRef, inquiriesVis] = useInView();
  const [feedRef, feedVis] = useInView();
  const [rightRef, rightVis] = useInView();

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <div style={{ background: "#0C0C0C", minHeight: "100vh", color: "#F5F0E8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;1,400&family=Instrument+Serif:ital@0;1&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: rgba(197,165,114,0.3); color: #F5F0E8; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0C0C0C; }
        ::-webkit-scrollbar-thumb { background: rgba(197,165,114,0.12); }
      `}</style>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <TopBar />

      {/* Main content area */}
      <main style={{ marginLeft: 220, paddingTop: 56 }}>
        <div style={{ padding: "32px 36px 80px" }}>

          {/* Greeting */}
          <div style={{
            marginBottom: 36,
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.6s ease 0.1s",
          }}>
            <h1 style={{
              fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, fontWeight: 400, color: "#F5F0E8",
              marginBottom: 6,
            }}>Good morning, {USER.name}.</h1>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14, color: "rgba(245,240,232,0.3)",
            }}>Here's what's happening on Heavy Ledger today.</p>
          </div>

          {/* Stats row */}
          <div ref={statsRef} style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40,
          }}>
            {STATS.map((s, i) => <StatCard key={i} stat={s} index={i} visible={statsVis} />)}
          </div>

          {/* Two column layout: Feed + Right sidebar */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 40 }}>

            {/* Left: Inquiries + Feed */}
            <div>
              {/* Client Inquiries */}
              <div ref={inquiriesRef} style={{ marginBottom: 48 }}>
                <SectionHead label="Client Inquiries" action="View All →" />
                <div style={{
                  border: "1px solid rgba(122,158,126,0.12)", background: "rgba(122,158,126,0.015)",
                }}>
                  {INQUIRIES.map((inq, i) => (
                    <InquiryCard key={i} inquiry={inq} index={i} visible={inquiriesVis} />
                  ))}
                </div>
              </div>

              {/* Feed */}
              <div ref={feedRef}>
                <SectionHead label="Your Feed" action="Filter →" />
                <div style={{
                  display: "flex", gap: 12, marginBottom: 20,
                  opacity: feedVis ? 1 : 0, transition: "opacity 0.4s ease",
                }}>
                  {["Following", "Recommended", "Latest"].map((tab, i) => (
                    <span key={tab} style={{
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 0.8, textTransform: "uppercase",
                      color: i === 0 ? "#C5A572" : "rgba(245,240,232,0.2)",
                      borderBottom: i === 0 ? "1px solid #C5A572" : "1px solid transparent",
                      paddingBottom: 5, cursor: "pointer",
                    }}>{tab}</span>
                  ))}
                </div>
                {FEED.map((item, i) => (
                  <FeedCard key={i} item={item} index={i} visible={feedVis} />
                ))}
              </div>
            </div>

            {/* Right sidebar */}
            <div ref={rightRef}>
              <div style={{
                position: "sticky", top: 88,
                opacity: rightVis ? 1 : 0, transform: rightVis ? "translateY(0)" : "translateY(15px)",
                transition: "all 0.6s ease 0.3s",
              }}>

                {/* Drafts */}
                <div style={{
                  border: "1px solid rgba(245,240,232,0.06)", padding: 24, marginBottom: 20,
                }}>
                  <SectionHead label="Drafts" />
                  {DRAFTS.map((draft, i) => (
                    <div key={i} style={{
                      padding: "14px 0",
                      borderBottom: i < DRAFTS.length - 1 ? "1px solid rgba(245,240,232,0.04)" : "none",
                      cursor: "pointer",
                    }}>
                      <div style={{
                        fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 14, color: "#F5F0E8",
                        marginBottom: 8, lineHeight: 1.35,
                      }}>{draft.title}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          flex: 1, height: 3, background: "rgba(245,240,232,0.06)", overflow: "hidden",
                        }}>
                          <div style={{
                            width: `${draft.progress}%`, height: "100%", background: "rgba(197,165,114,0.4)",
                          }} />
                        </div>
                        <span style={{
                          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "rgba(245,240,232,0.2)",
                        }}>{draft.progress}%</span>
                      </div>
                      <div style={{
                        fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "rgba(245,240,232,0.15)",
                        marginTop: 6,
                      }}>Edited {draft.lastEdited}</div>
                    </div>
                  ))}
                </div>

                {/* Top performing posts */}
                <div style={{
                  border: "1px solid rgba(245,240,232,0.06)", padding: 24, marginBottom: 20,
                }}>
                  <SectionHead label="Top Performing" />
                  {TOP_POSTS.map((post, i) => (
                    <div key={i} style={{
                      padding: "12px 0",
                      borderBottom: i < TOP_POSTS.length - 1 ? "1px solid rgba(245,240,232,0.04)" : "none",
                      cursor: "pointer",
                    }}>
                      <div style={{
                        fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "rgba(245,240,232,0.5)",
                        marginBottom: 6, lineHeight: 1.35,
                      }}>{post.title}</div>
                      <div style={{
                        display: "flex", gap: 16,
                        fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "rgba(245,240,232,0.2)",
                      }}>
                        <span>{post.views} views</span>
                        <span>{post.saves} saves</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notifications */}
                <div style={{
                  border: "1px solid rgba(245,240,232,0.06)", padding: 24,
                }}>
                  <SectionHead label="Notifications" action="All →" />
                  {NOTIFICATIONS.map((notif, i) => (
                    <div key={i} style={{
                      padding: "10px 0", display: "flex", gap: 10, alignItems: "flex-start",
                      borderBottom: i < NOTIFICATIONS.length - 1 ? "1px solid rgba(245,240,232,0.03)" : "none",
                    }}>
                      <span style={{
                        fontSize: 11, color: notif.color, marginTop: 2, width: 14, textAlign: "center",
                        flexShrink: 0,
                      }}>{notif.icon}</span>
                      <div>
                        <div style={{
                          fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: "rgba(245,240,232,0.4)",
                          lineHeight: 1.45,
                        }}>{notif.text}</div>
                        <div style={{
                          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "rgba(245,240,232,0.14)",
                          marginTop: 3,
                        }}>{notif.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Peer review request */}
                <div style={{
                  border: "1px solid rgba(107,142,191,0.15)", background: "rgba(107,142,191,0.03)",
                  padding: 24, marginTop: 20,
                }}>
                  <div style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 2,
                    textTransform: "uppercase", color: "#6B8EBF", marginBottom: 12,
                  }}>Peer Review Request</div>
                  <div style={{
                    fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "rgba(245,240,232,0.4)",
                    lineHeight: 1.55, marginBottom: 16,
                  }}>
                    Dr. Anika Patel has requested your review on "HRV-Guided Training Load: Validation Study." Estimated review time: 15 min.
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button style={{
                      flex: 1, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 1,
                      textTransform: "uppercase", background: "rgba(107,142,191,0.12)", color: "#6B8EBF",
                      border: "1px solid rgba(107,142,191,0.2)", padding: "8px 0", cursor: "pointer",
                    }}>Accept</button>
                    <button style={{
                      flex: 1, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 1,
                      textTransform: "uppercase", background: "transparent", color: "rgba(245,240,232,0.25)",
                      border: "1px solid rgba(245,240,232,0.08)", padding: "8px 0", cursor: "pointer",
                    }}>Decline</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
