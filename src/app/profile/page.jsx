"use client";
import { useState, useEffect, useRef } from "react";

const PROFILE = {
  name: "Dr. Sarah Chen",
  title: "Strength & Conditioning Coach",
  location: "Portland, OR",
  avatar: "SC",
  color: "#C5A572",
  tagline: "Evidence-based programming for intermediate to advanced athletes. Specializing in periodization, power development, and long-term athlete management.",
  credentials: [
    "PhD Exercise Science — University of Oregon",
    "CSCS, NSCA — Since 2016",
    "USAW Level 2 — Sport Performance Coach",
  ],
  stats: {
    posts: 47,
    followers: 1240,
    following: 312,
    saves: 2890,
  },
  specialties: ["Periodization", "Power Development", "Athlete Monitoring", "Barbell Sports", "Evidence-Based Practice"],
  accepting: true,
  clientTypes: ["Competitive Powerlifters", "Collegiate Athletes", "Advanced Recreational Lifters"],
  rateRange: "$150–250 / month (remote)",
};

const PINNED = {
  type: "Training Plan",
  title: "The Undulating Block: A 16-Week Strength-Power Hybrid for Intermediate Lifters",
  excerpt: "This is the framework I've refined over 4 years and ~60 athletes. It combines daily undulating periodization within a block structure, using velocity thresholds to autoregulate intensity. I'm publishing the full template, progression logic, and deload criteria — along with aggregated results from athletes who've run it.",
  reactions: 341,
  comments: 89,
  saves: 214,
  date: "Jan 12, 2026",
};

const PUBLICATIONS = [
  {
    type: "Case Study",
    title: "Why Linear Periodization Fails Intermediate Athletes: A 3-Year Retrospective",
    excerpt: "Analyzed training logs from 34 athletes who transitioned from linear to undulating models. The performance delta was significant, but not for the reasons most coaches assume.",
    reactions: 203,
    comments: 67,
    date: "Dec 8, 2025",
    tags: ["Periodization", "Data"],
  },
  {
    type: "Performance Data",
    title: "Velocity Loss Thresholds and Next-Day Readiness: 6 Months of Data",
    excerpt: "Tracked bar velocity, RPE, and next-session performance across 6 athletes for 26 weeks. The sweet spot for velocity loss cutoffs was tighter than the literature suggests.",
    reactions: 178,
    comments: 54,
    date: "Nov 19, 2025",
    tags: ["VBT", "Monitoring"],
  },
  {
    type: "Pedagogy",
    title: "Coaching the Jerk: External Cues That Actually Transfer",
    excerpt: "Spent 3 months systematically testing different cue strategies for the split jerk with 12 weightlifters. Video analysis and athlete feedback included.",
    reactions: 145,
    comments: 41,
    date: "Oct 3, 2025",
    tags: ["Coaching", "Weightlifting"],
  },
  {
    type: "Theory",
    title: "Minimum Effective Volume Is Context-Dependent: Stop Treating It as Fixed",
    excerpt: "A framework for adjusting volume landmarks based on training age, stress load, sleep quality, and phase goals. Includes a decision tree I use with every athlete.",
    reactions: 267,
    comments: 93,
    date: "Sep 15, 2025",
    tags: ["Volume", "Programming"],
  },
  {
    type: "Training Plan",
    title: "Offseason Template for Team Sport Athletes (Field Sports)",
    excerpt: "General physical preparation block for soccer, rugby, and lacrosse athletes. 3-day structure with positional modifications and conditioning integration.",
    reactions: 119,
    comments: 28,
    date: "Aug 22, 2025",
    tags: ["Team Sport", "GPP"],
  },
];

const REVIEWS = [
  {
    name: "Jake M.",
    relationship: "Remote Client — 14 months",
    text: "Sarah's programming is the first I've followed where I actually understand why I'm doing what I'm doing. The autoregulation piece changed everything for me. Hit a 540 deadlift after stalling at 495 for a year.",
    metric: "Deadlift: 495 → 540 lb",
  },
  {
    name: "Coach Rivera",
    relationship: "Peer — Colleague at NSCA Conference",
    text: "Her undulating block article fundamentally changed how I program for my college athletes. The velocity threshold data alone was worth more than most continuing ed courses I've taken.",
    metric: null,
  },
  {
    name: "Alyssa T.",
    relationship: "Remote Client — 8 months",
    text: "I came from a cookie-cutter online coaching setup. Sarah actually adjusts things week to week based on my velocity data and how I'm recovering. First coach I've had who treats programming like a science, not a template.",
    metric: "Squat: 225 → 275 lb",
  },
];

const typeColors = {
  "Training Plan": "#C5A572",
  "Case Study": "#7A9E7E",
  "Performance Data": "#6B8EBF",
  Pedagogy: "#8B7EB8",
  Theory: "#BF8B6B",
};

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function NavBar({ scrolled }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 clamp(20px, 4vw, 60px)", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(12,12,12,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(197,165,114,0.12)" : "1px solid transparent",
      transition: "all 0.4s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 28, height: 28, border: "2px solid #C5A572",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 700, color: "#C5A572", letterSpacing: 1,
        }}>HL</div>
        <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18, color: "#F5F0E8", letterSpacing: 0.5 }}>Heavy Ledger</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <button style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: 1, textTransform: "uppercase",
          background: "transparent", color: "rgba(245,240,232,0.5)", border: "1px solid rgba(245,240,232,0.12)",
          padding: "7px 16px", cursor: "pointer",
        }}>◁ Back</button>
        <button style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: 1, textTransform: "uppercase",
          background: "#C5A572", color: "#0C0C0C", border: "none", padding: "8px 18px", cursor: "pointer", fontWeight: 600,
        }}>Follow</button>
      </div>
    </nav>
  );
}

function ProfileHeader({ visible }) {
  return (
    <section style={{
      padding: "100px clamp(20px, 6vw, 100px) 0",
      display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "start",
    }}>
      {/* Avatar block */}
      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.7s ease 0.2s",
      }}>
        <div style={{
          width: 140, height: 140,
          background: "rgba(197,165,114,0.08)", border: "1px solid rgba(197,165,114,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 36, fontWeight: 700, color: "#C5A572", letterSpacing: 2,
        }}>SC</div>
        {PROFILE.accepting && (
          <div style={{
            marginTop: 12, padding: "6px 0", textAlign: "center",
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase",
            color: "#7A9E7E", border: "1px solid rgba(122,158,126,0.25)", background: "rgba(122,158,126,0.05)",
          }}>● Accepting Clients</div>
        )}
      </div>

      {/* Info block */}
      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.7s ease 0.35s",
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase",
          color: "rgba(245,240,232,0.3)", marginBottom: 10,
        }}>{PROFILE.title} · {PROFILE.location}</div>

        <h1 style={{
          fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(36px, 5vw, 56px)",
          fontWeight: 400, color: "#F5F0E8", lineHeight: 1.1, margin: "0 0 20px",
        }}>{PROFILE.name}</h1>

        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16, lineHeight: 1.7,
          color: "rgba(245,240,232,0.5)", maxWidth: 580, margin: "0 0 28px",
        }}>{PROFILE.tagline}</p>

        {/* Credentials */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 28 }}>
          {PROFILE.credentials.map((c, i) => (
            <div key={i} style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "rgba(245,240,232,0.35)",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ color: "rgba(197,165,114,0.3)" }}>—</span> {c}
            </div>
          ))}
        </div>

        {/* Specialties */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
          {PROFILE.specialties.map(s => (
            <span key={s} style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 0.5,
              color: "#C5A572", border: "1px solid rgba(197,165,114,0.2)",
              background: "rgba(197,165,114,0.05)", padding: "5px 12px",
            }}>{s}</span>
          ))}
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: 36,
          padding: "20px 0", borderTop: "1px solid rgba(245,240,232,0.06)",
        }}>
          {[
            [PROFILE.stats.posts, "Publications"],
            [PROFILE.stats.followers.toLocaleString(), "Followers"],
            [PROFILE.stats.following, "Following"],
            [PROFILE.stats.saves.toLocaleString(), "Total Saves"],
          ].map(([val, label]) => (
            <div key={label}>
              <div style={{
                fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#F5F0E8",
              }}>{val}</div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: 1.5,
                textTransform: "uppercase", color: "rgba(245,240,232,0.25)", marginTop: 2,
              }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PinnedPost({ visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? "rgba(197,165,114,0.25)" : "rgba(197,165,114,0.1)"}`,
        background: hovered ? "rgba(197,165,114,0.03)" : "rgba(197,165,114,0.015)",
        padding: 36, position: "relative", cursor: "pointer", transition: "all 0.4s ease",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: "0.2s",
      }}
    >
      <div style={{
        position: "absolute", top: 16, right: 20,
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: 1.5,
        textTransform: "uppercase", color: "rgba(197,165,114,0.35)",
      }}>⊡ Pinned</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase",
          color: typeColors[PINNED.type], background: `${typeColors[PINNED.type]}12`,
          padding: "4px 10px", border: `1px solid ${typeColors[PINNED.type]}25`,
        }}>{PINNED.type}</span>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "rgba(245,240,232,0.2)",
        }}>{PINNED.date}</span>
      </div>
      <h2 style={{
        fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, fontWeight: 400,
        color: "#F5F0E8", lineHeight: 1.3, margin: "0 0 14px", maxWidth: 700,
      }}>{PINNED.title}</h2>
      <p style={{
        fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14, lineHeight: 1.7,
        color: "rgba(245,240,232,0.4)", maxWidth: 680,
      }}>{PINNED.excerpt}</p>
      <div style={{
        display: "flex", gap: 24, marginTop: 20,
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "rgba(245,240,232,0.25)",
      }}>
        <span>▲ {PINNED.reactions}</span>
        <span>◬ {PINNED.comments} comments</span>
        <span>⊞ {PINNED.saves} saves</span>
      </div>
    </div>
  );
}

function PublicationRow({ pub, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        padding: "28px 0", borderBottom: "1px solid rgba(245,240,232,0.05)",
        cursor: "pointer", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-15px)",
        transition: `all 0.5s ease ${0.1 + index * 0.08}s`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase",
            color: typeColors[pub.type], background: `${typeColors[pub.type]}12`,
            padding: "3px 9px", border: `1px solid ${typeColors[pub.type]}20`,
          }}>{pub.type}</span>
          <div style={{ display: "flex", gap: 6 }}>
            {pub.tags.map(t => (
              <span key={t} style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "rgba(245,240,232,0.2)",
                border: "1px solid rgba(245,240,232,0.06)", padding: "2px 7px",
              }}>{t}</span>
            ))}
          </div>
        </div>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "rgba(245,240,232,0.18)",
        }}>{pub.date}</span>
      </div>
      <h3 style={{
        fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 20, fontWeight: 400,
        color: hovered ? "#C5A572" : "#F5F0E8", margin: "0 0 8px", transition: "color 0.3s", lineHeight: 1.35,
      }}>{pub.title}</h3>
      <p style={{
        fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, lineHeight: 1.6,
        color: "rgba(245,240,232,0.35)", margin: 0,
      }}>{pub.excerpt}</p>
      <div style={{
        display: "flex", gap: 20, marginTop: 12,
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "rgba(245,240,232,0.2)",
      }}>
        <span>▲ {pub.reactions}</span>
        <span>◬ {pub.comments}</span>
      </div>
    </div>
  );
}

function ReviewCard({ review, index, visible }) {
  return (
    <div style={{
      border: "1px solid rgba(245,240,232,0.06)", padding: 28,
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `all 0.5s ease ${0.15 + index * 0.12}s`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{
            fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 16, color: "#F5F0E8",
          }}>{review.name}</div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "rgba(245,240,232,0.25)", marginTop: 3,
          }}>{review.relationship}</div>
        </div>
        {review.metric && (
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 1,
            color: "#7A9E7E", border: "1px solid rgba(122,158,126,0.2)",
            background: "rgba(122,158,126,0.05)", padding: "5px 10px",
          }}>{review.metric}</div>
        )}
      </div>
      <p style={{
        fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14, lineHeight: 1.65,
        color: "rgba(245,240,232,0.45)", margin: 0, fontStyle: "italic",
      }}>"{review.text}"</p>
    </div>
  );
}

function SectionLabel({ label }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16, margin: "0 0 36px",
    }}>
      <div style={{ height: 1, width: 32, background: "rgba(197,165,114,0.3)" }} />
      <span style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 2.5,
        textTransform: "uppercase", color: "rgba(197,165,114,0.45)",
      }}>{label}</span>
    </div>
  );
}

function ClientInfoSidebar({ visible }) {
  return (
    <div style={{
      position: "sticky", top: 88,
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.7s ease 0.4s",
    }}>
      {/* Inquiry box */}
      <div style={{
        border: "1px solid rgba(197,165,114,0.15)", background: "rgba(197,165,114,0.02)", padding: 28, marginBottom: 20,
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 2,
          textTransform: "uppercase", color: "#C5A572", marginBottom: 16,
        }}>Work With Sarah</div>
        <div style={{
          fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "rgba(245,240,232,0.4)",
          lineHeight: 1.6, marginBottom: 16,
        }}>
          Currently accepting remote coaching clients. Programming includes velocity-based autoregulation, weekly check-ins, and full data tracking.
        </div>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#F5F0E8", marginBottom: 20,
        }}>{PROFILE.rateRange}</div>
        <button style={{
          width: "100%", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: 1.5,
          textTransform: "uppercase", background: "#C5A572", color: "#0C0C0C",
          border: "none", padding: "12px 0", cursor: "pointer", fontWeight: 600,
        }}>Send Inquiry</button>
      </div>

      {/* Works with */}
      <div style={{
        border: "1px solid rgba(245,240,232,0.06)", padding: 28, marginBottom: 20,
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 2,
          textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: 16,
        }}>Works With</div>
        {PROFILE.clientTypes.map((ct, i) => (
          <div key={i} style={{
            fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "rgba(245,240,232,0.45)",
            padding: "8px 0", borderBottom: i < PROFILE.clientTypes.length - 1 ? "1px solid rgba(245,240,232,0.04)" : "none",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ color: "rgba(197,165,114,0.25)", fontSize: 10 }}>◆</span> {ct}
          </div>
        ))}
      </div>

      {/* Activity chart mockup */}
      <div style={{
        border: "1px solid rgba(245,240,232,0.06)", padding: 28,
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 2,
          textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: 20,
        }}>Publishing Activity</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 60 }}>
          {[3,5,2,7,4,6,8,3,5,9,6,4,7,5,3,6,8,4,2,5,7,9,6,3].map((h, i) => (
            <div key={i} style={{
              flex: 1, height: `${h * 6}px`, background: `rgba(197,165,114,${0.08 + h * 0.04})`,
              transition: "height 0.3s ease",
            }} />
          ))}
        </div>
        <div style={{
          display: "flex", justifyContent: "space-between", marginTop: 8,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "rgba(245,240,232,0.15)",
        }}>
          <span>6 mo ago</span>
          <span>Now</span>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [scrolled, setScrolled] = useState(false);
  const [headerVis, setHeaderVis] = useState(false);
  const [pinnedRef, pinnedVis] = useInView();
  const [pubsRef, pubsVis] = useInView();
  const [reviewsRef, reviewsVis] = useInView();
  const [sidebarRef, sidebarVis] = useInView();

  useEffect(() => {
    setTimeout(() => setHeaderVis(true), 150);
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: "#0C0C0C", minHeight: "100vh", color: "#F5F0E8", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;1,400&family=Instrument+Serif:ital@0;1&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: rgba(197,165,114,0.3); color: #F5F0E8; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0C0C0C; }
        ::-webkit-scrollbar-thumb { background: rgba(197,165,114,0.15); }
      `}</style>

      {/* Subtle background */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse at 15% 20%, rgba(197,165,114,0.03) 0%, transparent 50%)",
      }} />

      <NavBar scrolled={scrolled} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
        <ProfileHeader visible={headerVis} />

        {/* Main content grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 320px", gap: 48,
          padding: "60px clamp(20px, 6vw, 100px) 100px",
        }}>
          {/* Left: publications */}
          <div>
            {/* Pinned */}
            <div ref={pinnedRef}>
              <SectionLabel label="Pinned" />
              <PinnedPost visible={pinnedVis} />
            </div>

            {/* All publications */}
            <div ref={pubsRef} style={{ marginTop: 60 }}>
              <SectionLabel label="Publications" />
              <div style={{
                display: "flex", gap: 14, marginBottom: 24,
                opacity: pubsVis ? 1 : 0, transition: "opacity 0.5s ease",
              }}>
                {["All", "Training Plans", "Case Studies", "Performance Data", "Pedagogy", "Theory"].map((tab, i) => (
                  <span key={tab} style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 0.8, textTransform: "uppercase",
                    color: i === 0 ? "#C5A572" : "rgba(245,240,232,0.25)",
                    borderBottom: i === 0 ? "1px solid #C5A572" : "1px solid transparent",
                    paddingBottom: 5, cursor: "pointer", transition: "color 0.3s",
                  }}>{tab}</span>
                ))}
              </div>
              {PUBLICATIONS.map((pub, i) => (
                <PublicationRow key={i} pub={pub} index={i} visible={pubsVis} />
              ))}
              <div style={{
                textAlign: "center", padding: "28px 0",
                opacity: pubsVis ? 1 : 0, transition: "opacity 0.5s ease 0.6s",
              }}>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: 1, textTransform: "uppercase",
                  color: "rgba(245,240,232,0.25)", cursor: "pointer", borderBottom: "1px solid rgba(245,240,232,0.1)",
                  paddingBottom: 4,
                }}>Load More Publications</span>
              </div>
            </div>

            {/* Reviews */}
            <div ref={reviewsRef} style={{ marginTop: 40 }}>
              <SectionLabel label="Reviews & Endorsements" />
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {REVIEWS.map((r, i) => (
                  <ReviewCard key={i} review={r} index={i} visible={reviewsVis} />
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div ref={sidebarRef}>
            <ClientInfoSidebar visible={sidebarVis} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(197,165,114,0.08)",
        padding: "40px clamp(20px, 6vw, 100px)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 1, color: "rgba(245,240,232,0.2)",
        }}>© 2026 HEAVYLEDGER.COM</div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Twitter", "Instagram", "LinkedIn"].map(s => (
            <a key={s} href="#" style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 1,
              color: "rgba(245,240,232,0.2)", textDecoration: "none", textTransform: "uppercase",
            }}>{s}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
