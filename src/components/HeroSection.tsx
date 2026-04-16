import { useEffect, useRef, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import HeroCanvas from "@/components/HeroCanvas";

gsap.registerPlugin(ScrollTrigger);

const skillBreakpoints = [
  { pct: 0, rotation: 0, skill: "MERN Stack", color: "#00F5FF" },
  { pct: 20, rotation: 30, skill: "Next.js", color: "#8A2BE2" },
  { pct: 40, rotation: 60, skill: "Redux", color: "#00F5FF" },
  { pct: 60, rotation: 120, skill: "Flask & AI/ML", color: "#8A2BE2" },
  { pct: 80, rotation: 200, skill: "JWT & Secure APIs", color: "#00F5FF" },
  { pct: 100, rotation: 360, skill: "Deployment & Monitoring", color: "#8A2BE2" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollRotation, setScrollRotation] = useState(0);
  const [activeSkill, setActiveSkill] = useState(skillBreakpoints[0]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const pct = v * 100;
      // Interpolate rotation
      const rotation = (pct / 100) * (Math.PI * 2);
      setScrollRotation(rotation);

      // Find current skill
      let current = skillBreakpoints[0];
      for (const bp of skillBreakpoints) {
        if (pct >= bp.pct) current = bp;
      }
      setActiveSkill(current);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative" style={{ height: "100vh" }}>
      {/* Sticky canvas + content */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <HeroCanvas scrollRotation={scrollRotation} />
        </div>

        {/* Animated grid overlay */}
        <div className="absolute inset-0 z-[1] pointer-events-none hero-grid-overlay" />

        {/* Scanline sweep */}
        <div className="absolute inset-0 z-[1] pointer-events-none hero-scanline" />

        {/* Gradient overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/40 via-transparent to-background/40 pointer-events-none" />

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
          {/* Top-left hex bracket */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 0.35, x: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute top-16 left-8 md:left-16"
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <path d="M20 4 L4 40 L20 76" stroke="#00F5FF" strokeWidth="1.5" strokeOpacity="0.6" />
              <path d="M60 4 L76 40 L60 76" stroke="#8A2BE2" strokeWidth="1.5" strokeOpacity="0.6" />
            </svg>
          </motion.div>

          {/* Top-right circuit dots */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 0.4, x: 0 }}
            transition={{ delay: 1.7, duration: 1 }}
            className="absolute top-20 right-8 md:right-16"
          >
            <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
              <circle cx="10" cy="10" r="2.5" fill="#00F5FF" fillOpacity="0.7" />
              <circle cx="40" cy="10" r="2.5" fill="#8A2BE2" fillOpacity="0.7" />
              <circle cx="70" cy="10" r="2.5" fill="#00F5FF" fillOpacity="0.7" />
              <line x1="12.5" y1="10" x2="37.5" y2="10" stroke="#00F5FF" strokeOpacity="0.3" strokeWidth="1" />
              <line x1="42.5" y1="10" x2="67.5" y2="10" stroke="#8A2BE2" strokeOpacity="0.3" strokeWidth="1" />
              <line x1="40" y1="12.5" x2="40" y2="50" stroke="#8A2BE2" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="40" cy="50" r="2" fill="#8A2BE2" fillOpacity="0.5" />
            </svg>
          </motion.div>

          {/* Bottom-left corner accent */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.3, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-20 left-8 md:left-16"
          >
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M0 20 L0 0 L20 0" stroke="#00F5FF" strokeWidth="1.5" strokeOpacity="0.7" />
              <path d="M40 60 L60 60 L60 40" stroke="#8A2BE2" strokeWidth="1.5" strokeOpacity="0.7" />
            </svg>
          </motion.div>

          {/* Right side vertical data line */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 0.25, scaleY: 1 }}
            transition={{ delay: 2.2, duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/4 right-6 md:right-12 origin-top"
            style={{ height: "50vh" }}
          >
            <div
              className="w-px h-full"
              style={{ background: "linear-gradient(to bottom, #00F5FF, #8A2BE2, transparent)" }}
            />
            <motion.div
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
              style={{ boxShadow: "0 0 8px #00F5FF" }}
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          {/* Name and title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center mb-8"
          >
            <p className="text-primary text-sm font-mono tracking-[0.3em] mb-4 uppercase">
              Full Stack Developer & AI/ML Engineer
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-4">
              <span className="gradient-text glitch-text" data-text="Kaushik">Kaushik</span>
              <br />
              <span className="text-foreground/90">Raj Krishna</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Building intelligent, scalable systems at the intersection of{" "}
              <span className="text-primary font-medium">Full Stack</span> &{" "}
              <span className="text-secondary font-medium">Artificial Intelligence</span>
            </p>
          </motion.div>

          {/* Skill indicator */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkill.skill}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl px-6 py-3 mb-8"
              style={{ borderColor: `${activeSkill.color}40`, boxShadow: `0 0 30px ${activeSkill.color}20` }}
            >
              <p className="text-xs text-muted-foreground tracking-widest mb-1">CURRENT FOCUS</p>
              <p className="font-bold text-lg" style={{ color: activeSkill.color }}>
                {activeSkill.skill}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 justify-center mb-10"
          >
            <Link
              to="/projects"
              className="px-8 py-3 rounded-xl font-semibold text-primary-foreground relative overflow-hidden group"
              style={{ background: "linear-gradient(135deg, #00F5FF, #8A2BE2)" }}
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 rounded-xl font-semibold glass neon-border text-primary hover:shadow-neon transition-all duration-300"
            >
              Get In Touch
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex gap-4"
          >
            {[
              { icon: Github, href: "https://github.com/kaushikrajkrishna", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/kaushikrajkrishna", label: "LinkedIn" },
              { icon: Mail, href: "mailto:kaushikrajkrishna@example.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass neon-border w-11 h-11 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-neon transition-all duration-300"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <p className="text-muted-foreground text-xs tracking-widest">SCROLL TO EXPLORE</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} className="text-primary" />
          </motion.div>
        </motion.div>

        {/* Skill floating pills */}
        <div className="absolute inset-0 pointer-events-none z-[5]">
          {skillBreakpoints.map((bp, i) => (
            <motion.div
              key={bp.skill}
              initial={{ opacity: 0 }}
              animate={{ opacity: activeSkill.skill === bp.skill ? 1 : 0.15 }}
              transition={{ duration: 0.5 }}
              className="absolute glass rounded-full px-3 py-1 text-xs font-mono"
              style={{
                left: `${10 + (i % 3) * 30}%`,
                top: `${15 + Math.floor(i / 3) * 50}%`,
                color: bp.color,
                borderColor: `${bp.color}30`,
                boxShadow: activeSkill.skill === bp.skill ? `0 0 20px ${bp.color}40` : "none",
              }}
            >
              {bp.skill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
