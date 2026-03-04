"use client";
import { useState, useEffect, useRef } from "react";

const PROFILES = [
  {
    name: "Dr. Sarah Chen",
    title: "Strength & Conditioning Coach",
    location: "Portland, OR",
    specialty: "Periodization & Power Development",
    avatar: "SC",
    color: "#C5A572",
    posts: 47,
    followers: 1240,
    excerpt: "Why Linear Periodization Fails Intermediate Athletes: A 3-Year Case Study",
    tags: ["Periodization", "Power", "Evidence-Based"],
  },
  {
    name: "Marcus Webb",
    title: "Sports Performance Specialist",
    location: "Austin, TX",
    specialty: "Velocity-Based Training",
    avatar: "MW",
    color: "#7A9E7E",
    posts: 63,
    followers: 2180,
    excerpt: "Autoregulation vs. Fixed Programming: Real Data from 200+ Athletes",
    tags: ["VBT", "Autoregulation", "Data-Driven"],
  },
  {
    name: "Rina Takahashi",
    title: "Clinical Exercise Physiologist",
    location: "Los Angeles, CA",
    specialty: "Rehab & Return-to-Sport",
    avatar: "RT",
    color: "#8B7EB8",
    posts: 31,
    followers: 890,
    excerpt: "ACL Rehab Timelines Are Too Conservative: Here's What the Data Shows",
    tags: ["Rehabilitation", "Research", "ACL"],
  },
];

const FEED_ITEMS = [
  {
    author: "Coach Dan Moretti",
    time: "2h ago",
    type: "Training Plan",
    title: "12-Week Hypertrophy Block for Natural Athletes",
    body: "Sharing my updated hypertrophy mesocycle. Key change from last year: shifted to a higher frequency / lower volume-per-session model after reviewing the Schoenfeld 2024 meta-analysis. RPE-based progression with deload triggers built in.",
    reactions: 84,
    comments: 23,
    saves: 41,
  },
  {
    author: "Dr. Anika Patel",
    time: "5h ago",
    type: "Performance Data",
    title: "Sleep Restriction & Force Production: N=1 Experiment",
    body: "Tracked my own force plate data across 4 weeks of deliberately varied sleep (5h, 6h, 7h, 8h blocks). The drop-off at 6h was more dramatic than I expected. Full dataset and protocol attached.",
    reactions: 127,
    comments: 56,
    saves: 93,
  },
  {
    author: "Iron Mind Gym",
    time: "8h ago",
    type: "Pedagogy",
    title: "Teaching the Hip Hinge: A Constraints-Led Approach",
    body: "We stopped cueing 'push your hips back' six months ago. Switched entirely to external focus cues and task constraints. Video comparisons of client movement quality before/after the coaching shift.",
    reactions: 201,
    comments: 67,
    saves: 112,
  },
];

function NavBar({ scrolled }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 clamp(20px, 4vw, 60px)",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(12,12,12,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(197,165,114,0.12)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 28,
            height: 28,
            border: "2px solid #C5A572",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            fontWeight: 700,
            color: "#C5A572",
            letterSpacing: 1,
          }}
        >
          HL
        </div>
        <span
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 18,
            color: "#F5F0E8",
            letterSpacing: 0.5,
          }}
        >
          Heavy Ledger
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {["Platform", "Community", "About"].map((item) => (
          <a
            key={item}
            href="#"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: "rgba(245,240,232,0.55)",
              textDecoration: "none",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#C5A572")}
            onMouseLeave={(e) => (e.target.style.color = "rgba(245,240,232,0.55)")}
          >
            {item}
          </a>
        ))}
        <button
          onClick={() => document.getElementById("waitlist-cta")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            background: "#C5A572",
            color: "#0C0C0C",
            border: "none",
            padding: "8px 20px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Join Waitlist
        </button>
      </div>
    </nav>
  );
}

function HeroSection({ visible }) {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px clamp(20px, 8vw, 120px) 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(197,165,114,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(122,158,126,0.04) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />
      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(197,165,114,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(197,165,114,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#C5A572",
            marginBottom: 28,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.2s",
          }}
        >
          The Professional Network for Fitness
        </div>

        <h1
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "clamp(48px, 7vw, 96px)",
            fontWeight: 400,
            color: "#F5F0E8",
            lineHeight: 1.05,
            margin: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.4s",
          }}
        >
          Where training
          <br />
          <span style={{ color: "#C5A572" }}>methodology</span>
          <br />
          meets community.
        </h1>

        <p
          style={{
            fontFamily: "'IBM Plex Sans', Helvetica, sans-serif",
            fontSize: 18,
            lineHeight: 1.7,
            color: "rgba(245,240,232,0.55)",
            maxWidth: 540,
            marginTop: 36,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.6s",
          }}
        >
          A platform built for personal trainers, coaches, gyms, and sport
          scientists to publish real work — training plans, performance data,
          coaching philosophy — and connect with peers and clients who value
          substance.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 48,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.8s",
          }}
        >
          <button
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              background: "#C5A572",
              color: "#0C0C0C",
              border: "none",
              padding: "14px 36px",
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#D4B882")}
            onMouseLeave={(e) => (e.target.style.background = "#C5A572")}
          >
            Request Early Access
          </button>
          <button
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              background: "transparent",
              color: "rgba(245,240,232,0.55)",
              border: "1px solid rgba(245,240,232,0.15)",
              padding: "14px 36px",
              cursor: "pointer",
              fontWeight: 500,
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(197,165,114,0.4)";
              e.target.style.color = "#C5A572";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(245,240,232,0.15)";
              e.target.style.color = "rgba(245,240,232,0.55)";
            }}
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: "1px solid rgba(197,165,114,0.12)",
          padding: "24px clamp(20px, 8vw, 120px)",
          display: "flex",
          gap: "clamp(30px, 6vw, 80px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease 1s",
        }}
      >
        {[
          ["Not another", "social feed"],
          ["Training plans", "not selfies"],
          ["Evidence over", "influence"],
          ["Peer review", "not likes"],
        ].map(([top, bottom], i) => (
          <div key={i}>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "rgba(245,240,232,0.3)",
              }}
            >
              {top}
            </div>
            <div
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 16,
                color: "#C5A572",
                marginTop: 2,
              }}
            >
              {bottom}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProfileCard({ profile, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(197,165,114,0.04)" : "rgba(245,240,232,0.02)",
        border: `1px solid ${hovered ? "rgba(197,165,114,0.2)" : "rgba(245,240,232,0.06)"}`,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        transition: "all 0.4s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${0.2 + index * 0.15}s`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 48,
            height: 48,
            background: `${profile.color}18`,
            border: `1px solid ${profile.color}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 14,
            fontWeight: 600,
            color: profile.color,
          }}
        >
          {profile.avatar}
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 18,
              color: "#F5F0E8",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 12,
              color: "rgba(245,240,232,0.4)",
              marginTop: 2,
            }}
          >
            {profile.title} · {profile.location}
          </div>
        </div>
      </div>

      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: profile.color,
        }}
      >
        {profile.specialty}
      </div>

      <div
        style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 16,
          color: "rgba(245,240,232,0.7)",
          lineHeight: 1.5,
          fontStyle: "italic",
          padding: "16px 0",
          borderTop: "1px solid rgba(245,240,232,0.06)",
          borderBottom: "1px solid rgba(245,240,232,0.06)",
        }}
      >
        Latest: "{profile.excerpt}"
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {profile.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10,
              letterSpacing: 0.5,
              color: "rgba(245,240,232,0.35)",
              border: "1px solid rgba(245,240,232,0.08)",
              padding: "4px 10px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "auto",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          color: "rgba(245,240,232,0.3)",
        }}
      >
        <span>{profile.posts} posts</span>
        <span>{profile.followers.toLocaleString()} followers</span>
      </div>
    </div>
  );
}

function FeedItem({ item, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const typeColors = {
    "Training Plan": "#C5A572",
    "Performance Data": "#7A9E7E",
    Pedagogy: "#8B7EB8",
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "28px 0",
        borderBottom: "1px solid rgba(245,240,232,0.06)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: `all 0.6s ease ${0.3 + index * 0.15}s`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 9,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: typeColors[item.type] || "#C5A572",
              background: `${typeColors[item.type] || "#C5A572"}12`,
              padding: "4px 10px",
              border: `1px solid ${typeColors[item.type] || "#C5A572"}25`,
            }}
          >
            {item.type}
          </span>
          <span
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 13,
              color: "rgba(245,240,232,0.5)",
            }}
          >
            {item.author}
          </span>
        </div>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10,
            color: "rgba(245,240,232,0.25)",
          }}
        >
          {item.time}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 22,
          fontWeight: 400,
          color: hovered ? "#C5A572" : "#F5F0E8",
          margin: "0 0 10px 0",
          transition: "color 0.3s",
          cursor: "pointer",
        }}
      >
        {item.title}
      </h3>

      <p
        style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 14,
          lineHeight: 1.65,
          color: "rgba(245,240,232,0.45)",
          margin: 0,
        }}
      >
        {item.body}
      </p>

      <div
        style={{
          display: "flex",
          gap: 24,
          marginTop: 16,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          color: "rgba(245,240,232,0.25)",
        }}
      >
        <span>▲ {item.reactions}</span>
        <span>◬ {item.comments} comments</span>
        <span>⊞ {item.saves} saves</span>
      </div>
    </div>
  );
}

function SectionDivider({ label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        margin: "20px 0 50px",
      }}
    >
      <div style={{ flex: 1, height: 1, background: "rgba(197,165,114,0.12)" }} />
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "rgba(197,165,114,0.4)",
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(197,165,114,0.12)" }} />
    </div>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

export default function HeavyLedger() {
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [profilesRef, profilesVisible] = useInView();
  const [feedRef, feedVisible] = useInView();
  const [featuresRef, featuresVisible] = useInView();
  const [ctaRef, ctaVisible] = useInView();
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState("idle");

  const handleWaitlistSubmit = async () => {
    if (!waitlistEmail || !waitlistEmail.includes("@")) return;
    setWaitlistStatus("sending");
    try {
      await fetch("https://script.google.com/macros/s/AKfycbzbXGV3w9L9JZ27qIg5MnG68_KqBSdKJN6FGcGhm5AIoIrxVdHuVHuYYHzcq7ihwmHN9w/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: waitlistEmail }),
      });
      setWaitlistStatus("sent");
      setWaitlistEmail("");
    } catch (e) {
      setWaitlistStatus("idle");
    }
  };

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        background: "#0C0C0C",
        minHeight: "100vh",
        color: "#F5F0E8",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: rgba(197,165,114,0.3); color: #F5F0E8; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0C0C0C; }
        ::-webkit-scrollbar-thumb { background: rgba(197,165,114,0.2); }
      `}</style>

      <NavBar scrolled={scrolled} />
      <HeroSection visible={heroVisible} />

      {/* Profiles Section */}
      <section
        ref={profilesRef}
        style={{ padding: "100px clamp(20px, 8vw, 120px)" }}
      >
        <SectionDivider label="Featured Professionals" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {PROFILES.map((p, i) => (
            <ProfileCard key={i} profile={p} index={i} visible={profilesVisible} />
          ))}
        </div>
      </section>

      {/* Feed Preview */}
      <section
        ref={feedRef}
        style={{ padding: "60px clamp(20px, 8vw, 120px) 100px" }}
      >
        <SectionDivider label="Community Feed" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: 60,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                gap: 16,
                marginBottom: 32,
                opacity: feedVisible ? 1 : 0,
                transition: "opacity 0.6s ease 0.2s",
              }}
            >
              {["All", "Training Plans", "Performance Data", "Pedagogy", "Case Studies"].map(
                (tab, i) => (
                  <span
                    key={tab}
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 10,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      color: i === 0 ? "#C5A572" : "rgba(245,240,232,0.3)",
                      borderBottom: i === 0 ? "1px solid #C5A572" : "1px solid transparent",
                      paddingBottom: 6,
                      cursor: "pointer",
                    }}
                  >
                    {tab}
                  </span>
                )
              )}
            </div>
            {FEED_ITEMS.map((item, i) => (
              <FeedItem key={i} item={item} index={i} visible={feedVisible} />
            ))}
          </div>

          {/* Sidebar */}
          <div
            style={{
              opacity: feedVisible ? 1 : 0,
              transform: feedVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.5s",
            }}
          >
            <div
              style={{
                border: "1px solid rgba(245,240,232,0.06)",
                padding: 28,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 10,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "rgba(245,240,232,0.3)",
                  marginBottom: 20,
                }}
              >
                Trending Topics
              </div>
              {[
                "Velocity-Based Training",
                "Sleep & Recovery Metrics",
                "Constraints-Led Coaching",
                "RPE vs. Percentage-Based",
                "Minimum Effective Volume",
              ].map((topic, i) => (
                <div
                  key={topic}
                  style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: 13,
                    color: "rgba(245,240,232,0.5)",
                    padding: "10px 0",
                    borderBottom:
                      i < 4 ? "1px solid rgba(245,240,232,0.04)" : "none",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ color: "rgba(197,165,114,0.4)", marginRight: 8 }}>
                    0{i + 1}
                  </span>
                  {topic}
                </div>
              ))}
            </div>

            <div
              style={{
                border: "1px solid rgba(122,158,126,0.15)",
                background: "rgba(122,158,126,0.03)",
                padding: 28,
              }}
            >
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 10,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#7A9E7E",
                  marginBottom: 14,
                }}
              >
                Open for Clients
              </div>
              <div
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: 13,
                  color: "rgba(245,240,232,0.45)",
                  lineHeight: 1.6,
                }}
              >
                23 coaches in your area are currently accepting new clients.
                Browse profiles based on specialty, methodology, and real
                results.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        ref={featuresRef}
        style={{
          padding: "100px clamp(20px, 8vw, 120px)",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(197,165,114,0.02) 50%, transparent 100%)",
        }}
      >
        <SectionDivider label="Built Different" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 40,
            marginTop: 20,
          }}
        >
          {[
            {
              num: "01",
              title: "Professional Profiles",
              desc: "Showcase your credentials, methodology, certifications, and body of work. Not a highlight reel — a professional portfolio.",
            },
            {
              num: "02",
              title: "Publish Real Work",
              desc: "Training plans, case studies, performance data, coaching philosophy. Long-form content that demonstrates expertise.",
            },
            {
              num: "03",
              title: "Peer Feedback",
              desc: "Get constructive critique from fellow professionals. Structured commentary, not drive-by comments.",
            },
            {
              num: "04",
              title: "Client Discovery",
              desc: "Potential clients find you through your published work and methodology — not follower count.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                opacity: featuresVisible ? 1 : 0,
                transform: featuresVisible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s ease ${0.2 + i * 0.1}s`,
              }}
            >
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 32,
                  fontWeight: 700,
                  color: "rgba(197,165,114,0.12)",
                  marginBottom: 16,
                }}
              >
                {feature.num}
              </div>
              <h3
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 22,
                  fontWeight: 400,
                  color: "#F5F0E8",
                  marginBottom: 12,
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: "rgba(245,240,232,0.4)",
                }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        id="waitlist-cta"
        ref={ctaRef}
        style={{
          padding: "120px clamp(20px, 8vw, 120px)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.2s",
          }}
        >
          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 400,
              color: "#F5F0E8",
              lineHeight: 1.15,
              marginBottom: 24,
            }}
          >
            Your work deserves
            <br />
            <span style={{ color: "#C5A572", fontStyle: "italic" }}>
              a better platform.
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 16,
              color: "rgba(245,240,232,0.4)",
              maxWidth: 460,
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Heavy Ledger is launching soon. Join the waitlist to be among the
            first professionals on the platform.
          </p>
          <div
            style={{
              display: "inline-flex",
              border: "1px solid rgba(197,165,114,0.25)",
              overflow: "hidden",
            }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 13,
                padding: "14px 20px",
                background: "rgba(245,240,232,0.03)",
                border: "none",
                color: "#F5F0E8",
                width: 280,
                outline: "none",
              }}
            />
            <button
              onClick={handleWaitlistSubmit}
              disabled={waitlistStatus === "sending"}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                background: waitlistStatus === "sent" ? "#4CAF50" : "#C5A572",
                color: "#0C0C0C",
                border: "none",
                padding: "14px 28px",
                cursor: waitlistStatus === "sending" ? "wait" : "pointer",
                fontWeight: 600,
              }}
            >
              {waitlistStatus === "sending" ? "Sending..." : waitlistStatus === "sent" ? "You're In" : "Join Waitlist"}
            </button>
          </div>
          {waitlistStatus === "sent" && (
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "#4CAF50", marginTop: 16 }}>
              Welcome aboard. We'll be in touch.
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(197,165,114,0.08)",
          padding: "40px clamp(20px, 8vw, 120px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10,
            letterSpacing: 1,
            color: "rgba(245,240,232,0.2)",
          }}
        >
          © 2026 HEAVYLEDGER.COM — ALL RIGHTS RESERVED
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "X", url: "https://x.com/heavy_ledger" },
            { label: "Instagram", url: "https://instagram.com/heavy_ledger" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                letterSpacing: 1,
                color: "rgba(245,240,232,0.2)",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
