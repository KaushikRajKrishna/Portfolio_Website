import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import kaushikImg from "@/assets/kaushik.png";

gsap.registerPlugin(ScrollTrigger);

const SKILL_REVEALS = [
  { angle: 90,  skills: ["MERN Stack"],               color: "#00F5FF", icon: "⬡" },
  { angle: 180, skills: ["Next.js", "Redux"],          color: "#8A2BE2", icon: "◈" },
  { angle: 240, skills: ["Flask", "AI/ML"],            color: "#00F5FF", icon: "⬢" },
  { angle: 300, skills: ["JWT", "Secure APIs"],        color: "#8A2BE2", icon: "◆" },
  { angle: 360, skills: ["Deployment", "Monitoring"],  color: "#00F5FF", icon: "⬡" },
];

const PARTICLE_COUNT = 28;

/* Orbit data */
const INNER_TECHS = ["React", "Node.js", "Python", "MongoDB", "TypeScript"];
const OUTER_TECHS = ["Next.js", "Flask", "Docker", "Redux", "JWT", "GraphQL"];

/* Neural net layer definitions */
const NN_LAYERS = [
  { x: 22,  nodes: [28, 76, 124] },
  { x: 105, nodes: [14, 52, 90, 128] },
  { x: 188, nodes: [42, 88, 134] },
];

/* ─────────────────────────── helpers ─────────────────────────── */

function BackgroundParticles() {
  const particles = useRef(
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 2.5,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 4,
      color: Math.random() > 0.5 ? "#00F5FF" : "#8A2BE2",
    }))
  ).current;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.4, 1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── Animated circuit-board lines across the background ── */
function CircuitLines({ accentColor }: { accentColor: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      preserveAspectRatio="none"
      style={{ opacity: 0.18 }}
    >
      <line x1="0" y1="22%" x2="100%" y2="22%" stroke={accentColor} strokeWidth="0.8" strokeDasharray="6 14" />
      <line x1="0" y1="78%" x2="100%" y2="78%" stroke="#8A2BE2" strokeWidth="0.8" strokeDasharray="6 14" />
      <line x1="18%" y1="0" x2="18%" y2="100%" stroke={accentColor} strokeWidth="0.8" strokeDasharray="6 14" />
      <line x1="82%" y1="0" x2="82%" y2="100%" stroke="#8A2BE2" strokeWidth="0.8" strokeDasharray="6 14" />
      <polyline points="0,0 8%,0 8%,12%" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.6" />
      <polyline points="100%,0 92%,0 92%,12%" fill="none" stroke="#8A2BE2" strokeWidth="1" opacity="0.6" />
      <polyline points="0,100% 8%,100% 8%,88%" fill="none" stroke="#8A2BE2" strokeWidth="1" opacity="0.6" />
      <polyline points="100%,100% 92%,100% 92%,88%" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.6" />
      <circle cx="18%" cy="22%" r="3" fill={accentColor} opacity="0.8" />
      <circle cx="82%" cy="22%" r="3" fill="#8A2BE2" opacity="0.8" />
      <circle cx="18%" cy="78%" r="3" fill="#8A2BE2" opacity="0.8" />
      <circle cx="82%" cy="78%" r="3" fill={accentColor} opacity="0.8" />
      <circle cx="8%" cy="12%" r="2" fill={accentColor} opacity="0.9" />
      <circle cx="92%" cy="12%" r="2" fill="#8A2BE2" opacity="0.9" />
      <circle cx="8%" cy="88%" r="2" fill="#8A2BE2" opacity="0.9" />
      <circle cx="92%" cy="88%" r="2" fill={accentColor} opacity="0.9" />
    </svg>
  );
}

/* ── Traveling signal pulses along circuit lines ── */
function SignalPulses({ accentColor }: { accentColor: string }) {
  const pulses = [
    { axis: "h", y: "22%", color: accentColor, duration: 3.5, delay: 0 },
    { axis: "h", y: "78%", color: "#8A2BE2", duration: 4.2, delay: 1.2 },
    { axis: "v", x: "18%", color: accentColor, duration: 3, delay: 0.6 },
    { axis: "v", x: "82%", color: "#8A2BE2", duration: 3.8, delay: 2 },
  ];
  return (
    <>
      {pulses.map((p, i) =>
        p.axis === "h" ? (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{
              top: p.y, left: 0, width: 6, height: 6, borderRadius: "50%",
              background: p.color, boxShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}`,
              translateY: "-50%",
            }}
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: p.x, top: 0, width: 6, height: 6, borderRadius: "50%",
              background: p.color, boxShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}`,
              translateX: "-50%",
            }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          />
        )
      )}
    </>
  );
}

/* ── Scanning line overlay on the image ── */
function ScanLines() {
  return (
    <div
      style={{
        position: "absolute", inset: 0, borderRadius: "14px",
        overflow: "hidden", pointerEvents: "none", zIndex: 5,
        background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,245,255,0.015) 3px, rgba(0,245,255,0.015) 4px)",
      }}
    />
  );
}

/* ── Corner bracket decorations ── */
function CornerBrackets({ color }: { color: string }) {
  const s: React.CSSProperties = {
    position: "absolute", width: 18, height: 18,
    borderColor: color, borderStyle: "solid", opacity: 0.7,
  };
  return (
    <>
      <div style={{ ...s, top: 6, left: 6, borderWidth: "2px 0 0 2px", borderRadius: "3px 0 0 0" }} />
      <div style={{ ...s, top: 6, right: 6, borderWidth: "2px 2px 0 0", borderRadius: "0 3px 0 0" }} />
      <div style={{ ...s, bottom: 6, left: 6, borderWidth: "0 0 2px 2px", borderRadius: "0 0 0 3px" }} />
      <div style={{ ...s, bottom: 6, right: 6, borderWidth: "0 2px 2px 0", borderRadius: "0 0 3px 0" }} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LEFT PANEL — Tech Stack Orbit
   Two rings of tech labels orbiting a glowing core
═══════════════════════════════════════════════════════════════ */
function TechOrbitPanel({ activeColor }: { activeColor: string }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let rafId: number;
    let startTime: number | null = null;
    const loop = (ts: number) => {
      if (!startTime) startTime = ts;
      setTick((ts - startTime) * 0.001);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const IR = 55; // inner radius
  const OR = 88; // outer radius

  const innerPositions = INNER_TECHS.map((_, i) => {
    const a = (2 * Math.PI / INNER_TECHS.length) * i + tick * 0.28;
    return { x: Math.cos(a) * IR, y: Math.sin(a) * IR };
  });

  const outerPositions = OUTER_TECHS.map((_, i) => {
    const a = (2 * Math.PI / OUTER_TECHS.length) * i - tick * 0.18;
    return { x: Math.cos(a) * OR, y: Math.sin(a) * OR };
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.4 }}
      className="hidden lg:flex flex-col items-center w-64 xl:w-72"
    >
      <div
        className="rounded-2xl w-full"
        style={{
          background: "rgba(8,8,14,0.78)",
          backdropFilter: "blur(24px)",
          border: `1px solid ${activeColor}28`,
          boxShadow: `0 0 50px ${activeColor}12, inset 0 0 30px rgba(0,0,0,0.3)`,
          transition: "border-color 0.5s, box-shadow 0.5s",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className="px-5 pt-5 pb-3 flex items-center gap-2.5"
          style={{ borderBottom: `1px solid ${activeColor}14` }}
        >
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.3, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: activeColor, boxShadow: `0 0 6px ${activeColor}` }}
          />
          <span
            className="text-[9px] font-mono uppercase tracking-[0.38em]"
            style={{ color: `${activeColor}90` }}
          >
            TECH.ORBIT
          </span>
          <div className="flex-1 h-px" style={{ background: `${activeColor}14` }} />
          <span className="text-[8px] font-mono" style={{ color: `${activeColor}45` }}>v2.4</span>
        </div>

        {/* Orbit visualization */}
        <div
          className="relative mx-auto"
          style={{ height: 272, overflow: "hidden" }}
        >
          {/* Outer dashed ring */}
          <div
            style={{
              position: "absolute", left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              width: OR * 2 + 6, height: OR * 2 + 6,
              borderRadius: "50%",
              border: "1px dashed rgba(138,43,226,0.2)",
            }}
          />
          {/* Inner dashed ring */}
          <div
            style={{
              position: "absolute", left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              width: IR * 2 + 6, height: IR * 2 + 6,
              borderRadius: "50%",
              border: `1px dashed ${activeColor}22`,
            }}
          />

          {/* Center glow core */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              width: 26, height: 26, borderRadius: "50%",
              background: `radial-gradient(circle, #ffffff 0%, ${activeColor} 45%, transparent 100%)`,
              boxShadow: `0 0 18px ${activeColor}, 0 0 36px ${activeColor}80, 0 0 60px ${activeColor}30`,
              transition: "box-shadow 0.4s, background 0.4s",
              zIndex: 3,
            }}
          />

          {/* Inner tech labels */}
          {INNER_TECHS.map((tech, i) => (
            <div
              key={tech}
              style={{
                position: "absolute",
                left: `calc(50% + ${innerPositions[i].x}px)`,
                top: `calc(50% + ${innerPositions[i].y}px)`,
                transform: "translate(-50%, -50%)",
                zIndex: 4,
              }}
            >
              <div
                style={{
                  background: "rgba(0,245,255,0.07)",
                  border: "1px solid rgba(0,245,255,0.42)",
                  borderRadius: 5,
                  padding: "3px 9px",
                  fontSize: 9,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: "#00F5FF",
                  whiteSpace: "nowrap",
                  textShadow: "0 0 8px rgba(0,245,255,0.9)",
                  boxShadow: "0 0 10px rgba(0,245,255,0.18)",
                }}
              >
                {tech}
              </div>
            </div>
          ))}

          {/* Outer tech labels */}
          {OUTER_TECHS.map((tech, i) => (
            <div
              key={tech}
              style={{
                position: "absolute",
                left: `calc(50% + ${outerPositions[i].x}px)`,
                top: `calc(50% + ${outerPositions[i].y}px)`,
                transform: "translate(-50%, -50%)",
                zIndex: 4,
              }}
            >
              <div
                style={{
                  background: "rgba(138,43,226,0.07)",
                  border: "1px solid rgba(138,43,226,0.42)",
                  borderRadius: 5,
                  padding: "3px 9px",
                  fontSize: 9,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: "#8A2BE2",
                  whiteSpace: "nowrap",
                  textShadow: "0 0 8px rgba(138,43,226,0.9)",
                  boxShadow: "0 0 10px rgba(138,43,226,0.18)",
                }}
              >
                {tech}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ borderTop: `1px solid ${activeColor}10` }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-[#00F5FF] opacity-60" />
            <span className="text-[7.5px] font-mono" style={{ color: "rgba(0,245,255,0.45)" }}>CORE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-[#8A2BE2] opacity-60" />
            <span className="text-[7.5px] font-mono" style={{ color: "rgba(138,43,226,0.45)" }}>FRAMEWORKS</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RIGHT PANEL — Neural Network + Frequency Spectrum
═══════════════════════════════════════════════════════════════ */


function NeuralNetPanel({ activeColor }: { activeColor: string }) {
  const W = 210, H = 162;

  const connections = useMemo(() => {
    const result: Array<{
      x1: number; y1: number; x2: number; y2: number;
      startDelay: number; repeatDelay: number; color: string;
    }> = [];
    for (let li = 0; li < NN_LAYERS.length - 1; li++) {
      const from = NN_LAYERS[li];
      const to = NN_LAYERS[li + 1];
      for (const fy of from.nodes) {
        for (const ty of to.nodes) {
          result.push({
            x1: from.x, y1: fy,
            x2: to.x, y2: ty,
            startDelay: Math.random() * 3.5,
            repeatDelay: 1.2 + Math.random() * 2.2,
            color: li === 0 ? "#00F5FF" : "#8A2BE2",
          });
        }
      }
    }
    return result;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.5 }}
      className="hidden lg:flex flex-col gap-3.5 w-64 xl:w-72"
    >
      {/* Neural net card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(8,8,14,0.78)",
          backdropFilter: "blur(24px)",
          border: `1px solid ${activeColor}28`,
          boxShadow: `0 0 50px ${activeColor}12, inset 0 0 30px rgba(0,0,0,0.3)`,
          transition: "border-color 0.5s, box-shadow 0.5s",
        }}
      >
        {/* Header */}
        <div
          className="px-5 pt-5 pb-3 flex items-center gap-2.5"
          style={{ borderBottom: `1px solid ${activeColor}14` }}
        >
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.7, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#8A2BE2", boxShadow: "0 0 6px #8A2BE2" }}
          />
          <span
            className="text-[9px] font-mono uppercase tracking-[0.38em]"
            style={{ color: `${activeColor}90` }}
          >
            NEURAL.GRAPH
          </span>
          <div className="flex-1 h-px" style={{ background: `${activeColor}14` }} />
          <span className="text-[8px] font-mono" style={{ color: "rgba(138,43,226,0.45)" }}>AI/ML</span>
        </div>

        {/* SVG network */}
        <div className="px-5 py-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 138 }}>
            {/* Static connection lines */}
            {connections.map((c, i) => (
              <line
                key={`line-${i}`}
                x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                stroke={c.color} strokeWidth="0.35" opacity="0.12"
              />
            ))}

            {/* Animated signal pulses */}
            {connections.map((c, i) => (
              <motion.circle
                key={`pulse-${i}`}
                r="2"
                fill={c.color}
                animate={{
                  cx: [c.x1, c.x2],
                  cy: [c.y1, c.y2],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.1,
                  delay: c.startDelay,
                  repeat: Infinity,
                  repeatDelay: c.repeatDelay,
                  ease: "easeInOut",
                }}
                style={{ filter: `drop-shadow(0 0 4px ${c.color})` }}
              />
            ))}

            {/* Nodes */}
            {NN_LAYERS.map((layer, li) =>
              layer.nodes.map((ny, ni) => {
                const nodeColor =
                  li === 0 ? "#00F5FF" :
                  li === NN_LAYERS.length - 1 ? "#8A2BE2" :
                  activeColor;
                return (
                  <g key={`node-${li}-${ni}`}>
                    {/* Glow halo */}
                    <motion.circle
                      cx={layer.x} cy={ny} r="9"
                      fill={nodeColor}
                      animate={{ opacity: [0.04, 0.12, 0.04] }}
                      transition={{
                        duration: 2 + ni * 0.35,
                        delay: li * 0.4 + ni * 0.18,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    {/* Node */}
                    <motion.circle
                      cx={layer.x} cy={ny} r="4.5"
                      fill="rgba(4,4,10,0.92)"
                      stroke={nodeColor}
                      strokeWidth="1.4"
                      animate={{ opacity: [0.55, 1, 0.55] }}
                      transition={{
                        duration: 2 + ni * 0.35,
                        delay: li * 0.4 + ni * 0.18,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ filter: `drop-shadow(0 0 5px ${nodeColor})` }}
                    />
                  </g>
                );
              })
            )}
          </svg>

          {/* Layer labels */}
          <div className="flex justify-between mt-1">
            {[
              { label: "INPUT", color: "rgba(0,245,255,0.48)" },
              { label: "HIDDEN", color: `${activeColor}60` },
              { label: "OUTPUT", color: "rgba(138,43,226,0.48)" },
            ].map(({ label, color }) => (
              <span
                key={label}
                className="text-[7px] font-mono uppercase tracking-wider"
                style={{ color }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

    </motion.div>
  );
}

/* ── Techy skill badge ── */
interface SkillBadgeProps { skill: string; color: string; index: number; total: number; }

function SkillBadge({ skill, color, index, total }: SkillBadgeProps) {
  const side = index % 2 === 0 ? -1 : 1;
  const xOffset = side * (170 + index * 14);
  const yOffset = total === 1 ? 0 : -((total - 1) * 22) / 2 + index * 44;
  const [typed, setTyped] = useState("");

  useEffect(() => {
    setTyped("");
    let i = 0;
    const interval = setInterval(() => { i++; setTyped(skill.slice(0, i)); if (i >= skill.length) clearInterval(interval); }, 40);
    return () => clearInterval(interval);
  }, [skill]);

  return (
    <motion.div
      initial={{ opacity: 0, x: side * 40, scale: 0.7 }}
      animate={{ opacity: 1, x: xOffset, y: yOffset, scale: 1 }}
      exit={{ opacity: 0, x: side * 20, scale: 0.6 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "absolute", top: "50%", left: "50%", zIndex: 30, transform: "translate(-50%, -50%)" }}
    >
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
        style={{
          position: "absolute", top: "50%",
          [side === -1 ? "right" : "left"]: "100%",
          width: 28, height: 1,
          background: `linear-gradient(${side === -1 ? "to left" : "to right"}, ${color}00, ${color})`,
          transformOrigin: side === -1 ? "right center" : "left center",
        }}
      />
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
        style={{
          background: "rgba(10,10,15,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          border: `1px solid ${color}60`, borderRadius: "8px", padding: "7px 14px",
          boxShadow: `0 0 20px ${color}30, inset 0 0 12px ${color}08, 0 0 1px ${color}`,
          whiteSpace: "nowrap", position: "relative", overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
          style={{
            position: "absolute", inset: 0, width: "40%",
            background: `linear-gradient(90deg, transparent 0%, ${color}18 50%, transparent 100%)`,
          }}
        />
        <div className="flex items-center gap-2 relative z-10">
          <motion.div
            animate={{ opacity: [1, 0.2, 1], scale: [1, 0.7, 1] }} transition={{ duration: 1, repeat: Infinity }}
            style={{ width: 5, height: 5, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}` }}
          />
          <span className="text-xs font-bold tracking-widest font-mono uppercase" style={{ color, textShadow: `0 0 10px ${color}, 0 0 20px ${color}60` }}>
            {typed}
            <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} style={{ color }}>_</motion.span>
          </span>
        </div>
        <div className="text-xs font-mono mt-0.5" style={{ color: `${color}60`, fontSize: "8px", letterSpacing: "0.15em" }}>
          SYS.SKILL.ACTIVE ▸ {String(index + 1).padStart(2, "0")}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────── main ─────────────────────────── */

export default function CinematicHeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  const [rotationY, setRotationY] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeSkillSet, setActiveSkillSet] = useState<typeof SKILL_REVEALS[0] | null>(null);

  const lastStateAngleRef = useRef(-999);
  const activeSkillRef = useRef<typeof SKILL_REVEALS[0] | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !frameRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const angle = self.progress * 360;
          const cameraZ = 1 + self.progress * 0.05;

          if (frameRef.current) {
            const scaleNorm = Math.sin((angle / 360) * Math.PI);
            const frameScale = cameraZ * (1 + scaleNorm * 0.05);
            frameRef.current.style.transform = `rotateY(${angle}deg) scale(${frameScale})`;
          }

          if (Math.abs(angle - lastStateAngleRef.current) >= 5 || angle < 1) {
            lastStateAngleRef.current = angle;
            setRotationY(angle);
            setScrollPct(self.progress * 100);

            let matched: typeof SKILL_REVEALS[0] | null = null;
            for (const sr of SKILL_REVEALS) {
              if (angle >= sr.angle - 15 && angle < sr.angle + 30) matched = sr;
            }
            if (matched !== activeSkillRef.current) {
              activeSkillRef.current = matched;
              setActiveSkillSet(matched);
            }
          }
        },
      },
    });

    tl.fromTo(sweepRef.current, { x: "-120%", opacity: 0 }, { x: "120%", opacity: 0.35, duration: 1, ease: "power1.inOut" });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => { if (st.trigger === sectionRef.current) st.kill(); });
    };
  }, []);

  const perspective = 1500;
  const shadowX = Math.sin((rotationY * Math.PI) / 180) * 30;
  const shadowOpacity = 0.3 + Math.abs(Math.sin((rotationY * Math.PI) / 180)) * 0.4;
  const depthShadow = `${shadowX}px 20px 60px rgba(0,245,255,${shadowOpacity * 0.4}), ${-shadowX}px 20px 60px rgba(138,43,226,${shadowOpacity * 0.3})`;
  const spotlightIntensity = 0.3 + Math.abs(Math.sin((rotationY * Math.PI) / 180)) * 0.5;
  const activeColor = activeSkillSet?.color ?? "#00F5FF";

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh" }}
      aria-label="Cinematic character reveal"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at 50% 50%, #0D0D1A 0%, #0A0A0F 70%)" }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none hero-grid-overlay opacity-40" />

      <BackgroundParticles />

      {/* Circuit lines */}
      <CircuitLines accentColor={activeColor} />
      <SignalPulses accentColor={activeColor} />

      {/* Spotlight */}
      <div className="absolute inset-0 z-[1] pointer-events-none flex items-center justify-center">
        <div style={{
          width: "600px", height: "700px", borderRadius: "50%",
          background: `radial-gradient(ellipse at center, rgba(0,245,255,${spotlightIntensity * 0.15}) 0%, rgba(138,43,226,${spotlightIntensity * 0.1}) 40%, transparent 70%)`,
          filter: "blur(50px)",
          transition: "background 0.3s",
        }} />
      </div>

      {/* Main content: 3-column layout */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 lg:px-8 gap-6 xl:gap-10">

        {/* Left panel — Tech Orbit */}
        <TechOrbitPanel activeColor={activeColor} />

        {/* Center card */}
        <div className="flex flex-col items-center shrink-0" style={{ position: "relative", zIndex: 50 }}>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xs font-mono tracking-[0.4em] uppercase mb-6"
            style={{ color: "#00F5FF", textShadow: "0 0 12px rgba(0,245,255,0.6)" }}
          >
            scroll to reveal skills
          </motion.p>

          <div style={{ perspective: `${perspective}px`, perspectiveOrigin: "50% 50%" }}>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "relative" }}
            >
              <div ref={frameRef} style={{ transformStyle: "preserve-3d", willChange: "transform", position: "relative" }}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.08)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
                    border: `1px solid ${activeColor}40`, borderRadius: "24px", padding: "12px",
                    boxShadow: depthShadow, backfaceVisibility: "visible", WebkitBackfaceVisibility: "visible",
                    overflow: "hidden", position: "relative", width: "280px", transition: "border-color 0.4s ease",
                  }}
                >
                  <CornerBrackets color={activeColor} />
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: "20px",
                    background: `linear-gradient(135deg, rgba(0,245,255,0.08) 0%, transparent 50%, rgba(138,43,226,0.08) 100%)`,
                    zIndex: 2, pointerEvents: "none",
                  }} />
                  <div ref={sweepRef} style={{
                    position: "absolute", top: 0, left: 0, width: "60px", height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                    transform: "skewX(-15deg)", zIndex: 3, pointerEvents: "none", opacity: 0,
                  }} />
                  <img
                    src={kaushikImg}
                    alt="Kaushik Raj Krishna – Full Stack & AI/ML Engineer"
                    style={{
                      width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "center top",
                      borderRadius: "14px", display: "block", backfaceVisibility: "visible", WebkitBackfaceVisibility: "visible",
                    }}
                    loading="eager"
                  />
                  <ScanLines />
                  <div style={{
                    position: "absolute", bottom: 12, left: 12, right: 12,
                    background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)",
                    borderRadius: "10px", padding: "8px 12px", zIndex: 6, border: `1px solid ${activeColor}20`,
                  }}>
                    <p className="text-xs font-bold tracking-widest font-mono uppercase" style={{ color: "#00F5FF", textShadow: "0 0 8px rgba(0,245,255,0.8)" }}>
                      Kaushik Raj Krishna
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)", fontSize: "10px", fontFamily: "monospace" }}>
                      Full Stack · AI/ML Engineer
                    </p>
                  </div>
                  <div style={{
                    position: "absolute", top: 12, right: 12, zIndex: 7,
                    background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
                    borderRadius: "6px", padding: "3px 8px", border: `1px solid ${activeColor}30`,
                  }}>
                    <span className="text-xs font-mono" style={{ color: activeColor, fontSize: "9px" }}>
                      {Math.round(rotationY)}°
                    </span>
                  </div>
                </div>
              </div>

              {/* Skill badges */}
              <div style={{ position: "absolute", top: 0, left: 0, width: "280px", height: "100%", pointerEvents: "none" }}>
                <AnimatePresence>
                  {activeSkillSet?.skills.map((skill, i) => (
                    <SkillBadge
                      key={`${activeSkillSet.angle}-${skill}`}
                      skill={skill} color={activeSkillSet.color}
                      index={i} total={activeSkillSet.skills.length}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Progress bar below card */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="mt-8 flex flex-col items-center gap-2"
          >
            <div style={{ width: "200px", height: "2px", background: "rgba(255,255,255,0.08)", borderRadius: "1px", overflow: "hidden" }}>
              <motion.div
                style={{
                  height: "100%", background: "linear-gradient(90deg, #00F5FF, #8A2BE2)",
                  borderRadius: "1px", boxShadow: "0 0 8px rgba(0,245,255,0.6)",
                }}
                animate={{ width: `${scrollPct}%` }}
                transition={{ duration: 0.08 }}
              />
            </div>
            <p className="text-xs font-mono tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
              {Math.round(scrollPct)}% explored
            </p>
          </motion.div>
        </div>

        {/* Right panel — Neural Net + Spectrum */}
        <NeuralNetPanel activeColor={activeColor} />
      </div>
    </section>
  );
}
