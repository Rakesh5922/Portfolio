import React, { useState, useEffect, useRef } from "react";
import avatarImg from "./assets/avatar.jpg";
import PortfolioApp from './PortfolioApp';
function App() {
  return <PortfolioApp />;
}
export default App;

import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Zap,
  TrendingUp,
  Database,
  Award,
  Code2,
  BarChart3,
  Menu,
  X,
  Send,
  ChevronRight,
  Sparkles,
  Layers,
  GitBranch,
  GraduationCap,
} from "lucide-react";

const AVATAR_SRC = avatarImg;

/* ---------------------------------------------------------------
   Data
--------------------------------------------------------------- */

const ROLE_STRINGS = ["Junior Data Scientist", "Data Analyst"];

const STATS = [
  { label: "Faster Retrieval", value: "1000x", sub: "FAISS ANN search", icon: Zap },
  { label: "Revenue Analyzed", value: "$20.3M", sub: "98.67K orders", icon: TrendingUp },
  { label: "Dataset Compressed", value: "98%", sub: "1.5GB \u2192 22MB", icon: Database },
  { label: "Movies Indexed", value: "26K", sub: "dual-engine recs", icon: Layers },
];

const SKILL_GROUPS = [
  {
    key: "ds",
    label: "Data Science & ML",
    icon: Code2,
    items: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Regression",
      "Random Forest",
      "Classification",
      "Clustering",
      "EDA",
      "FAISS",
      "SVD",
      "FastAPI",
      "LangChain",
      "Groq (Llama 3.1)",
    ],
  },
  {
    key: "tools",
    label: "Languages & Tools",
    icon: GitBranch,
    items: [
      "Python",
      "SQL",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Git",
      "GitHub",
      "VS Code",
      "Jupyter Notebook",
      "Streamlit Cloud",
    ],
  },
  {
    key: "viz",
    label: "Visualization & Analytics",
    icon: BarChart3,
    items: [
      "Power BI",
      "DAX",
      "Power Query",
      "Tableau (Basic)",
      "Matplotlib",
      "Seaborn",
      "MS Excel",
    ],
  },
];

// Flagship project — called out on its own, per the emphasis this project
// gets elsewhere (it's the deepest, most technically involved build).
const FLAGSHIP = {
  title: "CineMatch",
  subtitle: "Dual-Engine Movie Recommendation System",
  description:
    "A recommender built in two phases: cosine similarity first, then FAISS + SVD to scale to 26K movies. Swapping brute-force search for FAISS ANN cut retrieval time 1000x; dtype optimization and smart filtering shrank the dataset 98%, from 1.5GB to 22MB. Deployed live with genre filters and poster loading.",
  metrics: ["1000x faster search", "98% smaller dataset", "26K movies indexed"],
  tech: ["Python", "Streamlit", "FAISS", "Scikit-learn", "TMDB API"],
  live: "https://movie-recommender-nngwuk6maziystb4wgrkny.streamlit.app",
  repo: "https://github.com/Rakesh5922/movie-recommender",
};

const PROJECTS = [
  {
    title: "AI Travel Planner",
    subtitle: "Agentic itinerary generation",
    description:
      "Generates budget-aware, personalized itineraries from destination, duration, group size, and preferences. LangChain orchestrates Groq's Llama 3.1 behind a FastAPI backend, with an interactive Streamlit front end.",
    metrics: [],
    tech: ["Python", "Streamlit", "FastAPI", "LangChain", "Groq", "Llama 3.1"],
    live: "https://agenticaitravelplaner-fpwjmhfvzhefsuv398a2nx.streamlit.app",
    repo: "https://github.com/Rakesh5922/Agentic_AI_Travel_Planer",
    accent: "emerald",
  },
  {
    title: "E-Commerce Data Analysis",
    subtitle: "Star-schema BI dashboard",
    description:
      "Multi-table e-commerce data modeled on a star schema. End-to-end EDA surfaced spending cycles and payment preferences, including a heavy tilt toward credit-card checkout.",
    metrics: ["$20.3M revenue analyzed", "98.67K orders", "76.76% by card"],
    tech: ["Python", "SQL", "Power BI", "DAX", "Power Query", "Pandas", "Seaborn"],
    live: "https://github.com/Rakesh5922/E-Commerce_Data_Analysis/blob/main/dashboard/dashboard_preview.png",
    liveLabel: "Dashboard Preview",
    repo: "https://github.com/Rakesh5922/E-Commerce_Data_Analysis",
    accent: "cyan",
  },
  {
    title: "SportsMatrix",
    subtitle: "Cricket information web app",
    description:
      "A responsive multi-page platform for real-time cricket stats, with dynamic ICC trophy filtering across ODI, T20, and U-19 formats, and tab-based match score updates.",
    metrics: [],
    tech: ["HTML5", "CSS3", "JavaScript"],
    live: null,
    repo: null,
    comingSoon: true,
    accent: "emerald",
  },
];

const CERTS = [
  { name: "Python 101 for Data Science", issuer: "IBM" },
  { name: "AWS APAC Solutions Architecture \u2014 Virtual Experience", issuer: "Forage" },
];

const NAV_LINKS = [
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

/* ---------------------------------------------------------------
   Node-network background (signature element)
   A quiet stand-in for an embedding space / vector index —
   the same idea CineMatch's FAISS engine operates on.
--------------------------------------------------------------- */
function NodeField() {
  // Biased to the right two-thirds of the hero (behind/around the avatar)
  // so it never sits under the headline, CTAs, or social row on the left.
  const nodes = useRef(
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: 58 + Math.random() * 42,
      y: Math.random() * 100,
      r: 1.2 + Math.random() * 1.6,
      delay: Math.random() * 4,
    }))
  ).current;

  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 20) edges.push({ a: nodes[i], b: nodes[j], dist });
    }
  }

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      style={{
        opacity: 0.45,
        maskImage: "linear-gradient(to right, transparent, transparent 48%, black 62%)",
        WebkitMaskImage: "linear-gradient(to right, transparent, transparent 48%, black 62%)",
      }}
    >
      {edges.map((e, i) => (
        <line
          key={i}
          x1={e.a.x}
          y1={e.a.y}
          x2={e.b.x}
          y2={e.b.y}
          stroke="#06b6d4"
          strokeWidth="0.1"
          style={{ opacity: Math.max(0, 1 - e.dist / 20) * 0.35 }}
        />
      ))}
      {nodes.map((n) => (
        <circle key={n.id} cx={n.x} cy={n.y} r={n.r * 0.3} fill="#10b981">
          <animate
            attributeName="opacity"
            values="0.2;0.8;0.2"
            dur="4s"
            begin={`${n.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------------
   Typewriter role cycler
--------------------------------------------------------------- */
function useTypewriter(strings, typeSpeed = 55, deleteSpeed = 30, hold = 1400) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[idx % strings.length];
    let timeout;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), hold);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % strings.length);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, strings, typeSpeed, deleteSpeed, hold]);

  return text;
}

/* ---------------------------------------------------------------
   Scroll reveal — subtle fade/rise-in, skipped entirely when the
   visitor's system prefers reduced motion.
--------------------------------------------------------------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReduced(prefersReduced);
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible, reduced];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible, reduced] = useReveal();
  const motionClasses = reduced
    ? "opacity-100 translate-y-0"
    : `transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`;
  return (
    <div
      ref={ref}
      className={`${motionClasses} ${className}`}
      style={{ transitionDelay: !reduced && visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------
   Small building blocks
--------------------------------------------------------------- */
function GlowRing({ children }) {
  return (
    <div className="relative">
      <div
        className="absolute -inset-3 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, #06b6d4, #10b981, #06b6d4)",
          filter: "blur(18px)",
          opacity: 0.55,
        }}
      />
      <div className="relative rounded-full border-4 border-slate-800 bg-slate-900 p-1.5">
        {children}
      </div>
    </div>
  );
}

function Badge({ children, tone = "cyan" }) {
  const toneClasses =
    tone === "cyan"
      ? "border-cyan-500 text-cyan-300 bg-slate-900"
      : "border-emerald-500 text-emerald-300 bg-slate-900";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${toneClasses}`}
    >
      {children}
    </span>
  );
}

function SectionEyebrow({ icon: Icon, children, tone = "cyan" }) {
  const color = tone === "cyan" ? "text-cyan-400" : "text-emerald-400";
  return (
    <div className={`mb-3 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] ${color}`}>
      <Icon size={14} strokeWidth={2.5} />
      <span>{children}</span>
    </div>
  );
}

/* ---------------------------------------------------------------
   Main App
--------------------------------------------------------------- */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState(SKILL_GROUPS[0].key);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const roleText = useTypewriter(ROLE_STRINGS);

  const activeGroup = SKILL_GROUPS.find((g) => g.key === activeSkill);

  const handleSend = () => {
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n\u2014\n${form.name}\n${form.email}`
    );
    window.open(`mailto:rakeshvallepu599@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div
      className="min-h-screen w-full bg-slate-950 text-slate-50"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        @keyframes caret-blink { 0%, 45% { opacity: 1; } 50%, 95% { opacity: 0; } 100% { opacity: 1; } }
        .caret { animation: caret-blink 1s step-end infinite; }
        html { scroll-behavior: smooth; }
        a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
          border-radius: 4px;
        }
        @media (prefers-reduced-motion: reduce) {
          .caret { animation: none; opacity: 1; }
          svg animate { animation-play-state: paused; }
          html { scroll-behavior: auto; }
          .animate-fadein { animation: none; }
        }
        @keyframes fade-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        .animate-fadein { animation: fade-in 0.35s ease-out; }
      `}</style>

      {/* ---------------- Nav ---------------- */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950 bg-opacity-90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-lg font-semibold tracking-tight text-slate-50">
            VR<span className="text-cyan-400">.</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-sm text-slate-400 transition-colors hover:text-cyan-300"
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:rakeshvallepu599@gmail.com"
              className="rounded-lg border border-cyan-500 px-4 py-2 font-mono text-sm text-cyan-300 transition-colors hover:bg-cyan-500 hover:text-slate-950"
            >
              Contact Me
            </a>
          </div>
          <button
            className="text-slate-300 md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
        {menuOpen && (
          <div className="flex flex-col gap-1 border-t border-slate-800 px-6 py-4 md:hidden">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="py-2 font-mono text-sm text-slate-300 hover:text-cyan-300"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ---------------- Hero ---------------- */}
      <section id="top" className="relative overflow-hidden border-b border-slate-800">
        <div className="pointer-events-none absolute inset-0">
          <NodeField />
        </div>
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-5 md:py-28">
          <div className="md:col-span-3">
            <SectionEyebrow icon={Sparkles}>Portfolio / Data Science</SectionEyebrow>
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-5xl">
              Vallepu Rakesh
            </h1>
            <div className="mt-3 h-8 font-mono text-lg text-cyan-300 sm:text-xl">
              {roleText}
              <span className="caret text-emerald-400">|</span>
            </div>
            <p className="mt-5 max-w-lg text-slate-400">
              Final-year AI &amp; ML engineer who ships end-to-end data
              products: FAISS-backed recommenders, agentic planning tools,
              and BI dashboards that explain seven-figure revenue swings.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 font-mono text-sm font-medium text-slate-950 transition-transform hover:scale-105"
              >
                Explore Projects <ChevronRight size={16} />
              </a>
              <a
                href="https://github.com/Rakesh5922"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-3 font-mono text-sm font-medium text-slate-200 transition-colors hover:border-emerald-500 hover:text-emerald-300"
              >
                <Github size={16} /> View GitHub
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-3 font-mono text-sm font-medium text-slate-200 transition-colors hover:border-cyan-500 hover:text-cyan-300"
              >
                <Mail size={16} /> Contact Me
              </a>
            </div>
            <div className="mt-8 flex items-center gap-5 text-slate-500">
              <a href="https://linkedin.com/in/vallepu-rakesh" target="_blank" rel="noreferrer" className="transition-colors hover:text-cyan-300">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/Rakesh5922" target="_blank" rel="noreferrer" className="transition-colors hover:text-cyan-300">
                <Github size={20} />
              </a>
              <a href="mailto:rakeshvallepu599@gmail.com" className="transition-colors hover:text-cyan-300">
                <Mail size={20} />
              </a>
              <span className="flex items-center gap-1.5 font-mono text-xs">
                <MapPin size={14} /> Secunderabad, India
              </span>
            </div>
          </div>

          <div className="flex justify-center md:col-span-2">
            <GlowRing>
              <img
                src={AVATAR_SRC}
                alt="Vallepu Rakesh"
                className="h-52 w-52 rounded-full object-cover sm:h-64 sm:w-64"
              />
            </GlowRing>
          </div>
        </div>
      </section>

      {/* ---------------- Stats ribbon ---------------- */}
      <section className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-slate-800 sm:grid-cols-4 sm:divide-y-0">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="flex h-full flex-col gap-1 bg-slate-950 px-5 py-6">
                <s.icon size={18} className={i % 2 === 0 ? "text-cyan-400" : "text-emerald-400"} />
                <div className="font-mono text-2xl font-semibold text-slate-50 sm:text-3xl">{s.value}</div>
                <div className="text-xs text-slate-400">{s.label}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-slate-600">{s.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Education strip ---------------- */}
      <section className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap size={20} className="text-cyan-400" />
            <div>
              <div className="text-sm text-slate-200">
                B.Tech in Computer Science Engineering (AI &amp; ML)
              </div>
              <div className="font-mono text-xs text-slate-500">
                Swami Vivekananda Institute of Technology &middot; 2022&ndash;2026
              </div>
            </div>
          </div>
          <Badge tone="emerald">CGPA 7.5</Badge>
        </div>
      </section>

      {/* ---------------- Skills ---------------- */}
      <section id="skills" className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionEyebrow icon={Code2}>Technical Stack</SectionEyebrow>
          <h2 className="font-display text-2xl font-semibold text-slate-50 sm:text-3xl">
            Skills, grouped by how I use them
          </h2>

          <div className="mt-8 flex flex-wrap gap-2">
            {SKILL_GROUPS.map((g) => {
              const active = g.key === activeSkill;
              return (
                <button
                  key={g.key}
                  onClick={() => setActiveSkill(g.key)}
                  className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-sm transition-colors ${
                    active
                      ? "border-cyan-500 bg-cyan-500 text-slate-950"
                      : "border-slate-700 text-slate-300 hover:border-cyan-500 hover:text-cyan-300"
                  }`}
                >
                  <g.icon size={15} />
                  {g.label}
                </button>
              );
            })}
          </div>

          <div key={activeSkill} className="animate-fadein mt-6 flex flex-wrap gap-2.5">
            {activeGroup.items.map((item, i) => (
              <Badge key={item} tone={i % 2 === 0 ? "cyan" : "emerald"}>
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Projects ---------------- */}
      <section id="projects" className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionEyebrow icon={Layers}>Featured Work</SectionEyebrow>
          <h2 className="font-display text-2xl font-semibold text-slate-50 sm:text-3xl">
            Projects
          </h2>

          {/* Flagship project */}
          <Reveal className="mt-8">
            <div className="relative overflow-hidden rounded-xl border border-cyan-500 bg-slate-900 p-6 sm:p-8">
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full"
                style={{ background: "#06b6d4", filter: "blur(90px)", opacity: 0.15 }}
              />
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-xl">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-300">
                    <Sparkles size={11} /> Flagship project
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-slate-50">
                    {FLAGSHIP.title}
                  </h3>
                  <p className="mt-0.5 font-mono text-xs text-cyan-400">{FLAGSHIP.subtitle}</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{FLAGSHIP.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {FLAGSHIP.metrics.map((m) => (
                      <span
                        key={m}
                        className="rounded-md border border-slate-700 bg-slate-950 px-2.5 py-1 font-mono text-[11px] text-emerald-300"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {FLAGSHIP.tech.map((t) => (
                      <span key={t} className="rounded-md bg-slate-800 px-2 py-1 font-mono text-[11px] text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-shrink-0 gap-3 lg:flex-col">
                  <a
                    href={FLAGSHIP.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2.5 font-mono text-xs font-medium text-slate-950 transition-transform hover:scale-105"
                  >
                    <ExternalLink size={14} /> Live App
                  </a>
                  <a
                    href={FLAGSHIP.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 px-4 py-2.5 font-mono text-xs font-medium text-slate-200 transition-colors hover:border-cyan-500 hover:text-cyan-300"
                  >
                    <Github size={14} /> Repo
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Other projects */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div
                  className={`group relative flex h-full flex-col rounded-xl border bg-slate-900 p-6 transition-colors ${
                    p.accent === "cyan"
                      ? "border-slate-800 hover:border-cyan-500"
                      : "border-slate-800 hover:border-emerald-500"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-base font-semibold text-slate-50">{p.title}</h3>
                      <p className={`mt-0.5 font-mono text-xs ${p.accent === "cyan" ? "text-cyan-400" : "text-emerald-400"}`}>
                        {p.subtitle}
                      </p>
                    </div>
                    {p.comingSoon && (
                      <span className="whitespace-nowrap rounded-full border border-slate-700 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                        Repo pending
                      </span>
                    )}
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{p.description}</p>

                  {p.metrics.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.metrics.map((m) => (
                        <span
                          key={m}
                          className="rounded-md border border-slate-700 bg-slate-950 px-2 py-1 font-mono text-[10px] text-emerald-300"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-slate-800 px-2 py-1 font-mono text-[11px] text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-4 border-t border-slate-800 pt-4">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-cyan-300 hover:text-cyan-200"
                      >
                        <ExternalLink size={13} /> {p.liveLabel || "Live App"}
                      </a>
                    )}
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-slate-300 hover:text-emerald-300"
                      >
                        <Github size={13} /> Repo
                      </a>
                    )}
                    {!p.live && !p.repo && (
                      <span className="font-mono text-xs text-slate-600">Links coming soon</span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Certifications ---------------- */}
      <section id="certifications" className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionEyebrow icon={Award}>Credentials</SectionEyebrow>
          <h2 className="font-display text-2xl font-semibold text-slate-50 sm:text-3xl">
            Certifications
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CERTS.map((c, i) => (
              <Reveal key={c.name} delay={i * 90}>
                <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950 p-5">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-emerald-500 text-emerald-400">
                    <Award size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-100">{c.name}</div>
                    <div className="font-mono text-xs text-slate-500">{c.issuer}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Contact ---------------- */}
      <section id="contact" className="border-b border-slate-800">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2">
          <div>
            <SectionEyebrow icon={Send}>Get In Touch</SectionEyebrow>
            <h2 className="font-display text-2xl font-semibold text-slate-50 sm:text-3xl">
              Let's build something data-driven
            </h2>
            <p className="mt-4 max-w-sm text-sm text-slate-400">
              Open to Junior Data Scientist and Data Analyst roles, internships,
              and collaborations. Reach out directly or send a note.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <a href="mailto:rakeshvallepu599@gmail.com" className="flex items-center gap-3 text-sm text-slate-300 hover:text-cyan-300">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700"><Mail size={16} /></span>
                rakeshvallepu599@gmail.com
              </a>
              <a href="tel:+916302919275" className="flex items-center gap-3 text-sm text-slate-300 hover:text-cyan-300">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700"><Phone size={16} /></span>
                +91 63029 19275
              </a>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700"><MapPin size={16} /></span>
                Secunderabad, India
              </div>
              <a href="https://linkedin.com/in/vallepu-rakesh" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-slate-300 hover:text-cyan-300">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700"><Linkedin size={16} /></span>
                linkedin.com/in/vallepu-rakesh
              </a>
              <a href="https://github.com/Rakesh5922" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-slate-300 hover:text-cyan-300">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700"><Github size={16} /></span>
                github.com/Rakesh5922
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate-500">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 outline-none focus:border-cyan-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate-500">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 outline-none focus:border-cyan-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate-500">Message</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 outline-none focus:border-cyan-500"
                  placeholder="What are you working on?"
                />
              </div>
              <button
                onClick={handleSend}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 font-mono text-sm font-medium text-slate-950 transition-transform hover:scale-[1.02]"
              >
                <Send size={16} /> {sent ? "Opening mail app\u2026" : "Send Message"}
              </button>
              <p className="text-center text-xs text-slate-600">
                Opens your email client with this note pre-filled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-mono text-xs text-slate-600 sm:flex-row">
          <span>&copy; 2026 Vallepu Rakesh. Built with React &amp; Tailwind CSS.</span>
          <span className="flex items-center gap-1.5">
            <Sparkles size={12} className="text-cyan-500" /> Designed for data science roles
          </span>
        </div>
      </footer>
    </div>
  );
}
