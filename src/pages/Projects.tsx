import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, X, Globe, Brain, Shield, Server, Users, Gamepad2, GraduationCap, Heart, Target, LayoutDashboard, BookOpen } from "lucide-react";

const projects = [
  {
    title: "AIIMS Patna – Student Management System",
    desc: "System to manage attendance, marks, and exam schedules for AIIMS Patna.",
    longDesc:
      "Developed a comprehensive student management system handling attendance tracking, marks management, and exam scheduling. Built with a modern full-stack architecture for reliability and scalability in an academic environment.",
    stack: ["MongoDB", "Next.js", "Express.js", "Node.js"],
    color: "#00F5FF",
    category: "Full Stack",
    icon: GraduationCap,
    github: "",
    live: "https://sms.aiimspatna.edu.in",
    gradient: "from-cyan-500/20 to-blue-600/20",
  },
  {
    title: "Games Management System",
    desc: "Real-time athlete registration and score tracking with WebSocket instant updates.",
    longDesc:
      "Developed a real-time athlete registration and score tracking system. Implemented WebSockets for instant updates across all connected clients, enabling live score tracking during sporting events.",
    stack: ["React", "Node.js", "WebSockets", "MongoDB", "Express.js"],
    color: "#8A2BE2",
    category: "Real-Time",
    icon: Gamepad2,
    github: "",
    live: "http://dasbssagms.shyenterprises.shop/",
    gradient: "from-purple-500/20 to-pink-600/20",
  },
  {
    title: "Eklavya Schools Platform",
    desc: "AI-based attendance and performance tracking with AWS Rekognition integration.",
    longDesc:
      "Built an AI-based attendance and performance tracking system for Eklavya schools. Integrated AWS Rekognition for facial recognition-based attendance and S3 for scalable storage of student data and media.",
    stack: ["React", "Node.js", "AWS Rekognition", "AWS S3", "MongoDB"],
    color: "#00F5FF",
    category: "AI / Cloud",
    icon: Brain,
    github: "",
    live: "https://eklavya.biharsports.org/",
    gradient: "from-emerald-500/20 to-cyan-600/20",
  },
  {
    title: "AI-Based Mental Health Platform",
    desc: "MERN + NLP platform with sentiment analysis, mood tracking, and notifications.",
    longDesc:
      "Built a comprehensive mental health platform using MERN stack, NLP, LLM, and SOA architecture. Implemented sentiment analysis for user inputs, mood tracking dashboards, and an intelligent notification system for mental health support.",
    stack: ["MongoDB", "Express.js", "React", "Node.js", "NLP", "LLM", "SOA"],
    color: "#FF6B9D",
    category: "AI / ML",
    icon: Heart,
    github: "https://github.com/KaushikRajKrishna/aither-cognition",
    live: "",
    gradient: "from-pink-500/20 to-rose-600/20",
  },
  {
    title: "Talent Identification System",
    desc: "Player performance tracking and analytics for talent identification.",
    longDesc:
      "Developed a system for player performance tracking and analytics, enabling coaches and scouts to identify talent through data-driven insights and performance metrics visualization.",
    stack: ["React", "Node.js", "MongoDB", "Express.js", "Analytics"],
    color: "#FFD700",
    category: "Analytics",
    icon: Target,
    github: "",
    live: "https://talentidentification.shyenterprises.shop",
    gradient: "from-yellow-500/20 to-amber-600/20",
  },
  {
    title: "All-in-One Management Portal",
    desc: "Role-based MERN application with authentication, dashboards, and CRUD APIs.",
    longDesc:
      "Built a role-based MERN application with multi-level authentication, interactive dashboards, and comprehensive CRUD APIs. Deployed on Vercel with monitoring and analytics integration.",
    stack: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "Redux", "Vercel"],
    color: "#00F5FF",
    category: "MERN Stack",
    icon: LayoutDashboard,
    github: "https://github.com/Krishna1boy/One-Platform",
    live: "",
    gradient: "from-cyan-500/20 to-indigo-600/20",
  },
  {
    title: "University Admission Portal & Payment Gateway",
    desc: "Multi-step admission system with JWT auth and integrated payment gateway.",
    longDesc:
      "Developed a multi-step admission system with JWT authentication. Integrated payment gateway APIs and real-time features using a modern full-stack architecture for a seamless enrollment experience.",
    stack: ["React", "Node.js", "MongoDB", "Express.js", "JWT", "Stripe API"],
    color: "#8A2BE2",
    category: "Full Stack",
    icon: BookOpen,
    github: "https://github.com/Krishna1boy/University-Admission-Portal-and-Payment-Gateway",
    live: "",
    gradient: "from-violet-500/20 to-purple-600/20",
  },
];

// Floating hex grid background
function HexGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <polygon points="24.8,22 37.6,29.2 37.6,43.6 24.8,50.8 12,43.6 12,29.2" fill="none" stroke="hsl(186 100% 50%)" strokeWidth="0.5" />
            <polygon points="24.8,72 37.6,79.2 37.6,93.6 24.8,100.8 12,93.6 12,79.2" fill="none" stroke="hsl(186 100% 50%)" strokeWidth="0.5" />
            <polygon points="0,47 12.8,54.2 12.8,68.6 0,75.8 -12.8,68.6 -12.8,54.2" fill="none" stroke="hsl(270 76% 53%)" strokeWidth="0.5" />
            <polygon points="49.6,47 62.4,54.2 62.4,68.6 49.6,75.8 36.8,68.6 36.8,54.2" fill="none" stroke="hsl(270 76% 53%)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
}

function ProjectCard({ project, index, onClick }: { project: typeof projects[0]; index: number; onClick: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);
  const ref = useRef<HTMLDivElement>(null);
  const Icon = project.icon;

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const hasGithub = project.github && project.github !== "#";
  const hasLive = project.live && project.live !== "#";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer group"
      onClick={onClick}
    >
      <div
        className="relative rounded-2xl p-[1px] h-full overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.color}30, transparent 50%, ${project.color}15)`,
        }}
      >
        {/* Inner card */}
        <div
          className={`rounded-2xl p-6 h-full relative overflow-hidden bg-gradient-to-br ${project.gradient}`}
          style={{ background: `linear-gradient(135deg, rgba(10,10,15,0.95), rgba(10,10,15,0.8))` }}
        >
          {/* Scan line effect on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${project.color}08 50%, transparent 100%)`,
              animation: "scanDown 2s ease-in-out infinite",
            }}
          />

          {/* Corner brackets */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l pointer-events-none opacity-30 group-hover:opacity-70 transition-opacity" style={{ borderColor: project.color }} />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r pointer-events-none opacity-30 group-hover:opacity-70 transition-opacity" style={{ borderColor: project.color }} />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l pointer-events-none opacity-30 group-hover:opacity-70 transition-opacity" style={{ borderColor: project.color }} />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r pointer-events-none opacity-30 group-hover:opacity-70 transition-opacity" style={{ borderColor: project.color }} />

          {/* Glow orb */}
          <div
            className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
            style={{ background: project.color }}
          />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="p-1.5 rounded-lg"
                  style={{ background: `${project.color}15`, border: `1px solid ${project.color}25` }}
                >
                  <Icon size={14} style={{ color: project.color }} />
                </div>
                <span
                  className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{ background: `${project.color}10`, color: project.color, border: `1px solid ${project.color}20` }}
                >
                  {project.category}
                </span>
              </div>
              <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {hasGithub && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:scale-110 transition-all" style={{ background: `${project.color}15` }} onClick={(e) => e.stopPropagation()}>
                    <Github size={13} style={{ color: project.color }} />
                  </a>
                )}
                {hasLive && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:scale-110 transition-all" style={{ background: `${project.color}15` }} onClick={(e) => e.stopPropagation()}>
                    <Globe size={13} style={{ color: project.color }} />
                  </a>
                )}
              </div>
            </div>

            {/* Title with glow */}
            <h3
              className="text-lg font-bold mb-2 leading-tight"
              style={{ color: project.color, textShadow: `0 0 20px ${project.color}30` }}
            >
              {project.title}
            </h3>
            <p className="text-muted-foreground text-xs mb-4 leading-relaxed line-clamp-2">{project.desc}</p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono px-2 py-0.5 rounded"
                  style={{ background: `${project.color}08`, color: `${project.color}aa`, border: `1px solid ${project.color}15` }}
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > 4 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded text-muted-foreground" style={{ background: "rgba(255,255,255,0.04)" }}>
                  +{project.stack.length - 4}
                </span>
              )}
            </div>

            {/* Status bar */}
            <div className="mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: `${project.color}10` }}>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: hasLive ? "#22c55e" : project.color }} />
                <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
                  {hasLive ? "Live" : "Source Available"}
                </span>
              </div>
              <span className="text-[9px] font-mono" style={{ color: `${project.color}60` }}>
                [ VIEW → ]
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  const Icon = project.icon;
  const hasGithub = project.github && project.github !== "#";
  const hasLive = project.live && project.live !== "#";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/85 backdrop-blur-2xl" />
      <motion.div
        initial={{ scale: 0.85, y: 40, rotateX: 5 }}
        animate={{ scale: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.85, y: 40, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative z-10 rounded-3xl p-8 max-w-2xl w-full overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(10,10,15,0.97), rgba(10,10,15,0.92))",
          border: `1px solid ${project.color}30`,
          boxShadow: `0 0 60px ${project.color}15, 0 0 120px ${project.color}08`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl hover:scale-110 transition-all"
          style={{ background: `${project.color}10`, border: `1px solid ${project.color}20` }}
        >
          <X size={16} style={{ color: project.color }} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl" style={{ background: `${project.color}15`, border: `1px solid ${project.color}25` }}>
            <Icon size={20} style={{ color: project.color }} />
          </div>
          <span className="text-xs font-mono px-2 py-1 rounded-md uppercase tracking-wider" style={{ background: `${project.color}10`, color: project.color }}>
            {project.category}
          </span>
        </div>

        <h2 className="text-2xl font-black mb-3" style={{ color: project.color, textShadow: `0 0 30px ${project.color}30` }}>
          {project.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{project.longDesc}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="text-xs font-mono px-3 py-1 rounded-lg"
              style={{ background: `${project.color}10`, color: project.color, border: `1px solid ${project.color}20` }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        <div className="flex gap-3">
          {hasGithub && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105" style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}25` }}>
              <Github size={15} /> Source Code
            </a>
          )}
          {hasLive && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black transition-all hover:scale-105" style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)` }}>
              <Globe size={15} /> Live Site
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16 px-6 relative"
    >
      <HexGrid />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <motion.p
            className="text-xs font-mono tracking-[0.3em] mb-3"
            style={{ color: "#00F5FF" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {"// PORTFOLIO.PROJECTS"}
          </motion.p>
          <h1 className="text-5xl md:text-6xl font-black gradient-text mb-4">Projects</h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Production-grade systems, AI platforms, and full-stack applications built for real-world impact.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-2 mb-10 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="text-[11px] font-mono px-4 py-1.5 rounded-lg transition-all duration-300 uppercase tracking-wider"
              style={{
                background: filter === cat ? "#00F5FF15" : "rgba(255,255,255,0.03)",
                color: filter === cat ? "#00F5FF" : "rgba(255,255,255,0.4)",
                border: `1px solid ${filter === cat ? "#00F5FF30" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="h-[1px] flex-1" style={{ background: "linear-gradient(90deg, #00F5FF20, transparent)" }} />
          <span className="text-[10px] font-mono text-muted-foreground tracking-wider">
            {filtered.length} PROJECT{filtered.length !== 1 ? "S" : ""} LOADED
          </span>
          <div className="h-[1px] flex-1" style={{ background: "linear-gradient(270deg, #8A2BE220, transparent)" }} />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} onClick={() => setSelected(project)} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      {/* CSS for scan animation */}
      <style>{`
        @keyframes scanDown {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
      `}</style>
    </motion.div>
  );
}
