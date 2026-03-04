"use client";
import { useState, useEffect, useRef } from "react";

function useInView() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

const GOLD = "#C5A572";
const BG = "#0C0C0C";
const TEXT = "#F5F0E8";

const roadmapItems = [
  {
    phase: "Now",
    status: "active",
    title: "Foundation",
    items: [
      "Professional profiles with verified credentials",
      "Publishing across four content types: Programs, Case Studies, Field Notes, and Research Feed",
      "Topic tagging across disciplines: training, nutrition, supplementation, recovery, coaching",
      "Gym and facility pages with team rosters and a built-in blog",
    ],
  },
  {
    phase: "Next",
    status: "upcoming",
    title: "Connection",
    items: [
      "Client discovery — find coaches by specialty, credentials, and published work",
      "Direct inquiry system for potential clients",
      "Peer feedback and structured review on published content",
    ],
  },
  {
    phase: "Later",
    status: "future",
    title: "Ecosystem",
    items: [
      "Continuing education integration — peer-reviewed content that counts toward CEUs",
      "Credential verification badges",
      "Competition results integration for strength sports",
    ],
  },
];

export default function AboutPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [problemRef, problemVisible] = useInView();
  const [missionRef, missionVisible] = useInView();
  const [principlesRef, principlesVisible] = useInView();
  const [roadmapRef, roadmapVisible] = useInView();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ background: BG, minHeight: "100vh", color: TEXT, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: rgba(197,165,114,0.3); color: #F5F0E8; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0C0C0C; }
        ::-webkit-scrollbar-thumb { background: rgba(197,165,114,0.2); }
      `}</style>

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 clamp(20px, 8vw, 120px)",
        height: 64,
        background: scrolled ? "rgba(12,12,12,0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(197,165,114,0.08)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "all 0.4s ease",
      }}>
        <a href="/" style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 700,
          letterSpacing: 3, color: GOLD, textDecoration: "none", textTransform: "uppercase",
        }}>
          Heavy Ledger
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {[
            { label: "Platform", href: "/" },
            { label: "About", href: "/about" },
          ].map((item) => (
            <a key={item.label} href={item.href} style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
              color: item.href === "/about" ? GOLD : "rgba(245,240,232,0.55)",
              textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase",
            }}>{item.label}</a>
          ))}
          <a href="/#waitlist-cta" style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: 1.5,
            textTransform: "uppercase", background: GOLD, color: BG,
            border: "none", padding: "8px 20px", cursor: "pointer", fontWeight: 600,
            textDecoration: "none",
          }}>Join Waitlist</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "140px clamp(20px, 8vw, 120px) 80px",
        opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 1s ease",
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: 3,
          textTransform: "uppercase", color: GOLD, marginBottom: 24,
        }}>
          About Heavy Ledger
        </div>
        <h1 style={{
          fontFamily: "'Instrument Serif', serif", fontSize: "clamp(36px, 5vw, 64px)",
          fontWeight: 400, lineHeight: 1.15, maxWidth: 800,
        }}>
          Fitness isn't complicated.
          <br />
          <span style={{ fontStyle: "italic", color: GOLD }}>The industry is.</span>
        </h1>
        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 17, color: "rgba(245,240,232,0.5)",
          maxWidth: 560, marginTop: 24, lineHeight: 1.8,
        }}>
          Heavy Ledger exists to make expert knowledge genuinely accessible — not gated behind 
          jargon, paywalls, or artificial complexity.
        </p>
      </section>

      {/* The Problem */}
      <section ref={problemRef} style={{
        padding: "80px clamp(20px, 8vw, 120px)", borderTop: "1px solid rgba(197,165,114,0.08)",
      }}>
        <div style={{
          opacity: problemVisible ? 1 : 0, transform: problemVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, maxWidth: 1000,
        }}>
          <div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 2,
              textTransform: "uppercase", color: GOLD, marginBottom: 20,
            }}>The Complexity Problem</div>
            <h2 style={{
              fontFamily: "'Instrument Serif', serif", fontSize: 28, fontWeight: 400,
              lineHeight: 1.3, marginBottom: 20,
            }}>
              The industry profits from making simple things feel dangerous and complicated.
            </h2>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 15,
              color: "rgba(245,240,232,0.45)", lineHeight: 1.8,
            }}>
              Squat, hinge, press, pull, eat enough protein, sleep well, be consistent. That's 
              90% of it for 90% of people. But that message doesn't sell programs, certifications, 
              or coaching packages. So the industry wraps straightforward concepts in jargon and 
              fear — scapular dysfunction, metabolic confusion, corrective exercise prerequisites — 
              until a person who just wants to get stronger is too intimidated to start without 
              professional supervision. The best coaches know this. Most of them won't say it out loud.
            </p>
          </div>
          <div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 2,
              textTransform: "uppercase", color: GOLD, marginBottom: 20,
            }}>The Credibility Problem</div>
            <h2 style={{
              fontFamily: "'Instrument Serif', serif", fontSize: 28, fontWeight: 400,
              lineHeight: 1.3, marginBottom: 20,
            }}>
              The most visible professionals aren't necessarily the most qualified.
            </h2>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 15,
              color: "rgba(245,240,232,0.45)", lineHeight: 1.8,
            }}>
              Social media rewards engagement, not expertise. A coach with a decade of 
              evidence-based practice gets buried beneath someone who posts transformation 
              photos and motivational quotes. There's no way to distinguish real credentials 
              from self-appointed authority. And the platforms that do exist for fitness 
              professionals — TrueCoach, Trainerize, Hevy Coach — manage existing clients. 
              They do nothing to help someone demonstrate competence, share knowledge openly, 
              or get discovered by people who don't already know them.
            </p>
          </div>
        </div>
      </section>

      {/* The Mission */}
      <section ref={missionRef} style={{
        padding: "100px clamp(20px, 8vw, 120px)", borderTop: "1px solid rgba(197,165,114,0.08)",
      }}>
        <div style={{
          opacity: missionVisible ? 1 : 0, transform: missionVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease", maxWidth: 700,
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 2,
            textTransform: "uppercase", color: GOLD, marginBottom: 20,
          }}>What Heavy Ledger Is</div>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif", fontSize: 36, fontWeight: 400,
            lineHeight: 1.3, marginBottom: 32,
          }}>
            A place where the best fitness professionals share what they know in a way 
            that <span style={{ fontStyle: "italic", color: GOLD }}>actually helps people.</span>
          </h2>
          <div style={{
            fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 15,
            color: "rgba(245,240,232,0.5)", lineHeight: 1.9,
            display: "flex", flexDirection: "column", gap: 16,
          }}>
            <p>
              Heavy Ledger is a professional network built on a simple conviction: real expertise 
              simplifies rather than complicates. A great coach doesn't make you dependent on their 
              knowledge — they make you competent enough to handle the basics yourself, and then 
              provide genuine value on the part that actually requires specialized help.
            </p>
            <p>
              The platform sits between social media and academic publishing. Coaches publish 
              training programs people can actually follow. Case studies show real outcomes 
              without hiding behind jargon. Experienced professionals share hard-won lessons 
              in plain language. Peer-reviewed research is surfaced with context that makes it 
              usable. Everything is free to read, written to be understood, and designed to 
              lower barriers — not build them.
            </p>
            <p>
              Your credibility on Heavy Ledger comes from how well you make people better — 
              not from how complicated you can make it sound.
            </p>
          </div>
        </div>
      </section>

      {/* Content Taxonomy */}
      <section style={{
        padding: "100px clamp(20px, 8vw, 120px)", borderTop: "1px solid rgba(197,165,114,0.08)",
      }}>
        <div style={{ maxWidth: 1000 }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 2,
            textTransform: "uppercase", color: GOLD, marginBottom: 20,
          }}>What Gets Published</div>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif", fontSize: 32, fontWeight: 400,
            lineHeight: 1.3, marginBottom: 48, maxWidth: 600,
          }}>
            Four formats. <span style={{ fontStyle: "italic", color: GOLD }}>Every discipline.</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
            {[
              {
                icon: "◫",
                type: "Programs",
                desc: "Training plans, templates, periodization models. Complete programming that coaches can publish under their name — not locked inside a client management tool nobody else can see.",
              },
              {
                icon: "◧",
                type: "Case Studies",
                desc: "Client outcomes, performance data, n-of-1 analyses. The real-world evidence that separates experienced coaches from certified ones. Show your work.",
              },
              {
                icon: "◨",
                type: "Field Notes",
                desc: "Reflections, lessons learned, opinion pieces. Twenty-five years of coaching produces insights that don't fit into a data table. This is where experience lives.",
              },
              {
                icon: "◉",
                type: "Research Feed",
                desc: "Published, peer-reviewed papers only — surfaced after full acceptance. No preprints, no blog summaries masquerading as science. The real thing, linked to DOI.",
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: "#111", border: "1px solid #1a1a1a", borderRadius: 8, padding: 28,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 20, color: GOLD }}>{item.icon}</span>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600,
                    letterSpacing: 1, textTransform: "uppercase", color: TEXT,
                  }}>{item.type}</span>
                </div>
                <p style={{
                  fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13,
                  color: "rgba(245,240,232,0.4)", lineHeight: 1.7,
                }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 2,
            textTransform: "uppercase", color: "#555", marginBottom: 16,
          }}>Topics span every discipline</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              "Strength & Conditioning", "Nutrition", "Supplementation", "Recovery & Sleep",
              "Rehabilitation", "Mobility", "Stress Management", "Sport Science",
              "Coaching & Pedagogy", "Business of Fitness", "Youth Development", "Masters / Aging",
            ].map((tag, i) => (
              <span key={i} style={{
                fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12,
                padding: "6px 14px", border: "1px solid #222", borderRadius: 4,
                color: "rgba(245,240,232,0.35)",
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section ref={principlesRef} style={{
        padding: "100px clamp(20px, 8vw, 120px)", borderTop: "1px solid rgba(197,165,114,0.08)",
      }}>
        <div style={{
          opacity: principlesVisible ? 1 : 0, transform: principlesVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 2,
            textTransform: "uppercase", color: GOLD, marginBottom: 40,
          }}>Core Principles</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, maxWidth: 1000 }}>
            {[
              {
                title: "Simplify, don't gatekeep.",
                body: "The measure of every piece of content on this platform is whether it makes the reader more capable or more dependent. A program should be followable. A case study should be understandable. A reflection should illuminate, not intimidate. If your audience needs to hire you just to decode what you wrote, you haven't shared knowledge — you've advertised.",
              },
              {
                title: "Free and open. Always.",
                body: "Every piece of content on Heavy Ledger is accessible to everyone — no paywalls, no gated content, no premium tiers for readers. If a professional publishes their work here, the world can read it. The people who need this information the most are the ones least able to pay for it.",
              },
              {
                title: "Credibility through competence.",
                body: "Credentials are verified, not self-reported. But the real credibility comes from what you publish and how useful it is. Peer review is built into the platform. Your reputation grows from making people better — not from follower counts, engagement metrics, or how many certifications you can list.",
              },
              {
                title: "Substance over reach.",
                body: "There is no algorithm optimizing for engagement. No trending page rewarding controversy. Content is organized by discipline, quality, and relevance. A clearly written training guide with twelve readers matters more than a hot take with twelve thousand likes.",
              },
            ].map((p, i) => (
              <div key={i} style={{
                opacity: principlesVisible ? 1 : 0,
                transform: principlesVisible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s ease ${0.15 * (i + 1)}s`,
              }}>
                <h3 style={{
                  fontFamily: "'Instrument Serif', serif", fontSize: 22, fontWeight: 400,
                  fontStyle: "italic", color: GOLD, marginBottom: 16, lineHeight: 1.3,
                }}>{p.title}</h3>
                <p style={{
                  fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14,
                  color: "rgba(245,240,232,0.4)", lineHeight: 1.8,
                }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section ref={roadmapRef} style={{
        padding: "100px clamp(20px, 8vw, 120px)", borderTop: "1px solid rgba(197,165,114,0.08)",
      }}>
        <div style={{
          opacity: roadmapVisible ? 1 : 0, transform: roadmapVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 2,
            textTransform: "uppercase", color: GOLD, marginBottom: 20,
          }}>Roadmap</div>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif", fontSize: 32, fontWeight: 400,
            lineHeight: 1.3, marginBottom: 48, maxWidth: 600,
          }}>
            Built deliberately. <span style={{ fontStyle: "italic", color: GOLD }}>Community first, scale second.</span>
          </h2>

          <div style={{ display: "flex", gap: 32, maxWidth: 1000 }}>
            {roadmapItems.map((phase, i) => {
              const isActive = phase.status === "active";
              return (
                <div key={i} style={{
                  flex: 1,
                  background: isActive ? "rgba(197,165,114,0.04)" : "#111",
                  border: isActive ? `1px solid ${GOLD}` : "1px solid #1a1a1a",
                  borderRadius: 8, padding: 28,
                  opacity: roadmapVisible ? 1 : 0,
                  transform: roadmapVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease ${0.15 * (i + 1)}s`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: isActive ? "#4CAF50" : phase.status === "upcoming" ? GOLD : "#444",
                      boxShadow: isActive ? "0 0 8px rgba(76,175,80,0.5)" : "none",
                    }} />
                    <span style={{
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
                      letterSpacing: 2, textTransform: "uppercase",
                      color: isActive ? "#4CAF50" : phase.status === "upcoming" ? GOLD : "#555",
                    }}>{phase.phase}</span>
                  </div>
                  <h3 style={{
                    fontFamily: "'Instrument Serif', serif", fontSize: 22, fontWeight: 400,
                    marginBottom: 20, color: isActive ? TEXT : "rgba(245,240,232,0.6)",
                  }}>{phase.title}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {phase.items.map((item, j) => (
                      <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <div style={{
                          width: 4, height: 4, borderRadius: "50%", marginTop: 7, flexShrink: 0,
                          background: isActive ? GOLD : "#333",
                        }} />
                        <span style={{
                          fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13,
                          color: isActive ? "rgba(245,240,232,0.55)" : "rgba(245,240,232,0.3)",
                          lineHeight: 1.6,
                        }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "100px clamp(20px, 8vw, 120px)", textAlign: "center",
        borderTop: "1px solid rgba(197,165,114,0.08)",
      }}>
        <h2 style={{
          fontFamily: "'Instrument Serif', serif", fontSize: 36, fontWeight: 400,
          lineHeight: 1.3, marginBottom: 32,
        }}>
          Your work deserves
          <br />
          <span style={{ fontStyle: "italic", color: GOLD }}>a better platform.</span>
        </h2>
        <a href="/#waitlist-cta" style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: 1.5,
          textTransform: "uppercase", background: GOLD, color: BG, textDecoration: "none",
          padding: "14px 32px", fontWeight: 600, display: "inline-block",
        }}>
          Join the Waitlist
        </a>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(197,165,114,0.08)",
        padding: "40px clamp(20px, 8vw, 120px)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 1,
          color: "rgba(245,240,232,0.2)",
        }}>
          © 2026 HEAVYLEDGER.COM — ALL RIGHTS RESERVED
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "X", url: "https://x.com/heavy_ledger" },
            { label: "Instagram", url: "https://instagram.com/heavy_ledger" },
            { label: "Reddit", url: "https://reddit.com/r/heavyledger" },
          ].map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 1,
              color: "rgba(245,240,232,0.2)", textDecoration: "none", textTransform: "uppercase",
            }}>{s.label}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
