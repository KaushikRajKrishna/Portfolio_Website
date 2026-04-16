import { useLayoutEffect, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Brain, Rocket, Server } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Code2,
    title: "Full Stack Dev",
    desc: "MERN, Next.js, Redux — building scalable, production-grade web applications end to end.",
    accent: "hsl(var(--primary))",
    accentHex: "#00F5FF",
    num: "01",
    tags: ["React", "Next.js", "Node.js", "Redux", "TypeScript"],
    code: "const app = new MERNStack()",
  },
  {
    icon: Brain,
    title: "AI / ML Engineer",
    desc: "NLP, sentiment analysis, computer vision with TensorFlow, PyTorch & AWS Rekognition.",
    accent: "hsl(var(--secondary))",
    accentHex: "#8A2BE2",
    num: "02",
    tags: ["Python", "TensorFlow", "scikit-learn", "PyTorch", "NLP"],
    code: "model.fit(X_train, y_train)",
  },
  {
    icon: Server,
    title: "Backend & APIs",
    desc: "RESTful services, WebSockets, JWT auth, microservices deployed on AWS & Vercel.",
    accent: "hsl(var(--primary))",
    accentHex: "#00F5FF",
    num: "03",
    tags: ["Express.js", "JWT", "REST", "WebSocket", "AWS"],
    code: "app.use('/api', router)",
  },
  {
    icon: Rocket,
    title: "Ship & Scale",
    desc: "CI/CD pipelines, Docker, monitoring, and performance-first engineering culture.",
    accent: "hsl(var(--secondary))",
    accentHex: "#8A2BE2",
    num: "04",
    tags: ["Docker", "CI/CD", "Vercel", "Datadog", "Git"],
    code: "docker build -t prod .",
  },
];

const stats = [
  { val: "7", suffix: "+", label: "Production Projects" },
  { val: "3", suffix: "+", label: "AI/ML Systems" },
  { val: "2", suffix: "+", label: "Internships" },
  { val: "4", suffix: "+", label: "Certifications" },
];

/* ── Floating particles for intro slide ── */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: 5 + Math.random() * 90,
  y: 10 + Math.random() * 80,
  size: 1.5 + Math.random() * 2.5,
  duration: 4 + Math.random() * 7,
  delay: Math.random() * 5,
  color: Math.random() > 0.5 ? "#00F5FF" : "#8A2BE2",
}));

function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
          animate={{
            y: [0, -28, 0],
            opacity: [0.15, 0.7, 0.15],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── Animated stat counter ── */
function StatCounter({
  val,
  suffix,
  label,
}: {
  val: string;
  suffix: string;
  label: string;
}) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const target = parseInt(val, 10);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const increment = Math.max(1, Math.ceil(target / 35));
          const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            setDisplayed(current);
            if (current >= target) clearInterval(timer);
          }, 45);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <span className="gradient-text block text-3xl font-black md:text-4xl tabular-nums">
        {displayed}
        {suffix}
      </span>
      <span className="text-xs font-mono uppercase tracking-[0.28em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

/* ── Corner bracket decorations on cards ── */
function CardBrackets({ color }: { color: string }) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 18,
    height: 18,
    borderColor: color,
    borderStyle: "solid",
    opacity: 0.65,
    transition: "opacity 0.3s",
  };
  return (
    <>
      <div style={{ ...base, top: 10, left: 10, borderWidth: "2px 0 0 2px", borderRadius: "3px 0 0 0" }} />
      <div style={{ ...base, top: 10, right: 10, borderWidth: "2px 2px 0 0", borderRadius: "0 3px 0 0" }} />
      <div style={{ ...base, bottom: 10, left: 10, borderWidth: "0 0 2px 2px", borderRadius: "0 0 0 3px" }} />
      <div style={{ ...base, bottom: 10, right: 10, borderWidth: "0 2px 2px 0", borderRadius: "0 0 3px 0" }} />
    </>
  );
}

/* ── Rotating orbital ring around the icon ── */
function OrbitRing({ color }: { color: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 64 64"
      fill="none"
      style={{ animation: "spin-slow 6s linear infinite" }}
    >
      <circle
        cx="32"
        cy="32"
        r="28"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="5 9"
        opacity="0.5"
      />
      <circle cx="60" cy="32" r="2.5" fill={color} opacity="0.9" />
    </svg>
  );
}

/* ── Counter-rotating inner orbit ── */
function OrbitRingInner({ color }: { color: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 64 64"
      fill="none"
      style={{ animation: "spin-slow 4s linear infinite reverse" }}
    >
      <circle
        cx="32"
        cy="32"
        r="20"
        stroke={color}
        strokeWidth="0.8"
        strokeDasharray="2 12"
        opacity="0.3"
      />
      <circle cx="32" cy="12" r="2" fill={color} opacity="0.7" />
    </svg>
  );
}

/* ── Hex data stream on card background ── */
function DataStream({ color }: { color: string }) {
  const chars = "0F A3 7B C1 9E 2D 4A 8C 5F E0 B7 31 6D 0A F9 22 7F C4 1B 90 DE 83 5C A1";
  return (
    <div
      className="absolute bottom-0 right-0 w-28 text-right overflow-hidden"
      style={{ height: "60%", maskImage: "linear-gradient(to top, transparent 0%, black 60%)", WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 60%)" }}
    >
      <div
        className="font-mono text-[9px] leading-5 whitespace-pre-wrap break-all select-none"
        style={{
          color: `${color}`,
          opacity: 0.12,
          animation: "data-scroll 8s linear infinite",
        }}
      >
        {chars.repeat(8)}
      </div>
    </div>
  );
}

/* ── Scroll progress dots ── */
function ProgressDots({
  total,
  active,
}: {
  total: number;
  active: number;
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            width: i === active ? 24 : 6,
            opacity: i === active ? 1 : 0.3,
          }}
          transition={{ duration: 0.3 }}
          className="h-1.5 rounded-full"
          style={{
            background:
              i === active
                ? "linear-gradient(90deg, #00F5FF, #8A2BE2)"
                : "rgba(255,255,255,0.3)",
          }}
        />
      ))}
    </div>
  );
}

export default function SummarySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(-1); // -1 = intro slide

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".summary-card", track);
      if (!cards.length) return;

      const getScrollAmount = () => Math.max(0, track.scrollWidth - window.innerWidth);

      /* --- initial card state --- */
      gsap.set(cards, {
        opacity: 0.3,
        scale: 0.84,
        rotateY: -22,
        rotateX: 8,
        z: -160,
      });

      /* --- horizontal scroll tween --- */
      const horizontalTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        overwrite: true,
        scrollTrigger: {
          id: "summary-horizontal",
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount() || window.innerWidth}`,
          pin: section,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            // Track which card is "active" for progress dots
            const progress = self.progress;
            const idx = Math.round(progress * highlights.length) - 1;
            setActiveCard(idx);
          },
        },
      });

      /* --- per-card enter/exit animations --- */
      cards.forEach((card, i) => {
        const glow = card.querySelector<HTMLElement>(".card-glow");
        const scan = card.querySelector<HTMLElement>(".card-scan");
        const tags = gsap.utils.toArray<HTMLElement>(".skill-tag", card);
        const titleLine = card.querySelector<HTMLElement>(".card-title-line");

        // Enter
        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalTween,
            start: "left 85%",
            end: "center 48%",
            scrub: true,
          },
        })
          .to(card, { opacity: 1, scale: 1, rotateY: 0, rotateX: 0, z: 0, ease: "power2.out" })
          .to(glow, { opacity: 1, ease: "power1.out" }, 0)
          .to(scan, { opacity: 1, yPercent: 140, ease: "none" }, 0)
          .to(titleLine, { scaleX: 1, ease: "power2.out" }, 0.3);

        // Skill tags stagger in
        if (tags.length) {
          gsap.timeline({
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left 70%",
              end: "center 50%",
              scrub: false,
              toggleActions: "play none none reverse",
            },
          }).fromTo(
            tags,
            { opacity: 0, y: 14, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.5, ease: "back.out(1.5)" }
          );
        }

        // Exit
        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalTween,
            start: "center 45%",
            end: "right 18%",
            scrub: true,
          },
        }).to(card, { opacity: 0.35, scale: 0.9, rotateY: 18, z: -100, ease: "power2.inOut" });
      });
    }, section);

    const refreshId = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => {
      clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-background"
      aria-label="Professional summary"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none hero-grid-overlay opacity-60" />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 h-[52rem] -translate-y-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.18) 0%, hsl(var(--secondary) / 0.14) 42%, transparent 70%)",
        }}
      />

      {/* Horizontal neon line top */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, #00F5FF40, #8A2BE240, transparent)" }}
      />

      <div ref={trackRef} className="flex w-max items-stretch">

        {/* ── Intro slide ── */}
        <div className="relative flex h-screen w-screen shrink-0 items-center justify-center px-6 overflow-hidden">
          <FloatingParticles />

          {/* Decorative vertical lines */}
          <div className="absolute left-12 top-0 bottom-0 w-px pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #00F5FF20, transparent)" }} />
          <div className="absolute right-12 top-0 bottom-0 w-px pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #8A2BE220, transparent)" }} />

          <div className="relative mx-auto max-w-3xl text-center z-10">
            {/* Terminal label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border"
              style={{
                borderColor: "#00F5FF30",
                background: "rgba(0,245,255,0.05)",
                backdropFilter: "blur(10px)",
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-1.5 h-1.5 rounded-full bg-primary"
                style={{ boxShadow: "0 0 6px #00F5FF" }}
              />
              <span
                className="text-xs font-mono uppercase tracking-[0.3em] text-primary"
                style={{ textShadow: "0 0 14px hsl(var(--primary) / 0.5)" }}
              >
                ◈ system.profile.loaded
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="gradient-text mb-6 text-4xl font-black leading-tight md:text-6xl"
            >
              Kaushik Raj Krishna
            </motion.h2>

            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="mx-auto mb-8 h-px w-48 origin-left"
              style={{ background: "linear-gradient(90deg, #00F5FF, #8A2BE2)" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Full Stack Developer &amp; AI/ML Engineer passionate about building intelligent,
              scalable web platforms — from real-time sports analytics to AI-powered
              mental-health systems.
            </motion.p>

            {/* Stats with count-up */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 md:gap-12"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="relative">
                  {/* Glow dot above stat */}
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: "#00F5FF", boxShadow: "0 0 8px #00F5FF" }}
                  />
                  <StatCounter val={stat.val} suffix={stat.suffix} label={stat.label} />
                </div>
              ))}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-12 flex flex-col items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground"
            >
              <span>Scroll to slide through strengths</span>
              <motion.span
                animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="block h-12 w-px"
                style={{ background: "linear-gradient(to bottom, #00F5FF, #8A2BE2, transparent)" }}
              />
            </motion.div>
          </div>
        </div>

        {/* ── Highlight cards ── */}
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="summary-card flex h-screen w-[88vw] shrink-0 items-center justify-center px-4 sm:w-[68vw] md:w-[50vw] md:px-8 lg:w-[38vw]"
              style={{ perspective: "1400px" }}
            >
              <div
                className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border bg-card/80 p-8 shadow-2xl backdrop-blur-2xl md:p-10"
                style={{
                  borderColor: `${item.accentHex}30`,
                  boxShadow: `0 0 60px ${item.accentHex}15, 0 32px 100px hsl(var(--background) / 0.6)`,
                }}
              >
                {/* Corner brackets */}
                <CardBrackets color={item.accentHex} />

                {/* Radial glow */}
                <div
                  className="card-glow pointer-events-none absolute inset-0 opacity-0"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${item.accentHex}28 0%, transparent 65%)`,
                  }}
                />

                {/* Specular highlight */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent opacity-50" />

                {/* Scan sweep */}
                <div
                  className="card-scan pointer-events-none absolute inset-x-0 top-[-32%] h-[36%] opacity-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 0%, ${item.accentHex}10 55%, transparent 100%)`,
                  }}
                />

                {/* Hex data stream */}
                <DataStream color={item.accentHex} />

                {/* Card number */}
                <span
                  className="absolute right-7 top-6 text-6xl font-black font-mono opacity-[0.07] md:text-7xl select-none"
                  style={{ color: item.accentHex }}
                >
                  {item.num}
                </span>

                {/* Icon with orbital rings */}
                <div className="relative mb-7 flex h-16 w-16 items-center justify-center">
                  {/* Orbital rings container */}
                  <div className="absolute inset-0 -m-3 w-[88px] h-[88px]">
                    <OrbitRing color={item.accentHex} />
                    <OrbitRingInner color={item.accentHex} />
                  </div>
                  {/* Icon box */}
                  <div
                    className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border"
                    style={{
                      background: `${item.accentHex}18`,
                      borderColor: `${item.accentHex}35`,
                      boxShadow: `0 0 24px ${item.accentHex}25, inset 0 0 12px ${item.accentHex}10`,
                    }}
                  >
                    <span
                      className="absolute inset-0 rounded-2xl animate-pulse"
                      style={{ boxShadow: `0 0 28px ${item.accentHex}20` }}
                    />
                    <Icon size={28} style={{ color: item.accentHex }} />
                  </div>
                </div>

                {/* Title + animated underline */}
                <div className="mb-3">
                  <h3 className="text-2xl font-black md:text-3xl" style={{ color: item.accentHex }}>
                    {item.title}
                  </h3>
                  <div
                    className="card-title-line mt-2 h-[2px] rounded-full origin-left"
                    style={{
                      background: `linear-gradient(90deg, ${item.accentHex}, transparent)`,
                      transform: "scaleX(0)",
                      width: "60%",
                    }}
                  />
                </div>

                {/* Description */}
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {item.desc}
                </p>

                {/* Skill tags */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="skill-tag inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border"
                      style={{
                        color: item.accentHex,
                        borderColor: `${item.accentHex}35`,
                        background: `${item.accentHex}10`,
                        boxShadow: `0 0 8px ${item.accentHex}15`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Code snippet footer */}
                <div
                  className="rounded-xl px-4 py-3 font-mono text-xs border"
                  style={{
                    background: "rgba(0,0,0,0.35)",
                    borderColor: `${item.accentHex}20`,
                    color: `${item.accentHex}90`,
                  }}
                >
                  <span style={{ color: "#8A2BE2", opacity: 0.7 }}>▸ </span>
                  {item.code}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    style={{ color: item.accentHex }}
                  >
                    _
                  </motion.span>
                </div>

                {/* Footer divider */}
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-px flex-1" style={{ background: `${item.accentHex}20` }} />
                  <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-muted-foreground/60">
                    module.{item.num}
                  </span>
                  <div className="h-px flex-1" style={{ background: `${item.accentHex}20` }} />
                </div>
              </div>
            </article>
          );
        })}

        {/* Trailing spacer */}
        <div className="h-screen w-[28vw] shrink-0" aria-hidden="true" />
      </div>

      {/* Progress dots — bottom-center, fixed within pinned section */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <ProgressDots total={highlights.length} active={activeCard} />
        <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-muted-foreground/50">
          {activeCard < 0 ? "intro" : `${highlights[activeCard]?.num} / 04`}
        </span>
      </div>
    </section>
  );
}
