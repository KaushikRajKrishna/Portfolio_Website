import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

const badges = ["JavaScript", "TypeScript", "Python", "React", "Node.js", "MERN", "AI/ML", "Next.js", "Redux"];

const stats = [
  { value: "100+", label: "Articles Written" },
  { value: "3+", label: "Major Projects" },
  { value: "2+", label: "Internships" },
  { value: "4+", label: "Certifications" },
];

const education = [
  {
    year: "2021–2025",
    title: "B.E. Computer Science & Engineering",
    institution: "University",
    detail: "Specialized in Full Stack Development & AI/ML applications",
  },
  {
    year: "2024",
    title: "AI/ML Training",
    institution: "NIELIT",
    detail: "Comprehensive machine learning and deep learning program",
  },
  {
    year: "2025",
    title: "MERN Stack Training",
    institution: "C-DAC",
    detail: "Advanced full stack web development with React & Node.js",
  },
];

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-24 pb-16 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-mono tracking-widest mb-3">WHO I AM</p>
          <h1 className="text-5xl md:text-6xl font-black gradient-text mb-4">About Me</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A passionate Full Stack Developer and AI/ML Engineer from India, building intelligent systems and scalable web applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TiltCard className="glass rounded-3xl p-8 neon-border text-center h-full">
              <div className="w-28 h-28 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 neon-border flex items-center justify-center animate-pulse-neon">
                <span className="gradient-text font-black text-3xl">KRK</span>
              </div>
              <h2 className="font-bold text-xl mb-1">Kaushik Raj Krishna</h2>
              <p className="text-primary text-sm font-mono mb-4">Full Stack & AI/ML Engineer</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Passionate about building at the intersection of modern web development and artificial intelligence. Love contributing to the developer community through articles and open source.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <span className="glass px-3 py-1 rounded-full text-xs text-primary">India 🇮🇳</span>
                <span className="glass px-3 py-1 rounded-full text-xs text-secondary">Open to Work</span>
              </div>
            </TiltCard>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass rounded-2xl p-6 text-center neon-border"
                >
                  <p className="text-3xl font-black gradient-text mb-1">{stat.value}</p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Skill badges */}
            <div className="glass rounded-2xl p-6">
              <p className="text-xs text-muted-foreground tracking-widest mb-4 uppercase">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, i) => (
                  <motion.span
                    key={badge}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium glass animate-float"
                    style={{
                      color: i % 2 === 0 ? "#00F5FF" : "#8A2BE2",
                      borderColor: i % 2 === 0 ? "#00F5FF30" : "#8A2BE230",
                      animationDelay: `${i * 0.3}s`,
                    }}
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Education Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-primary text-sm font-mono tracking-widest mb-3 text-center">EDUCATION</p>
          <h2 className="text-3xl font-black text-center mb-10">Academic Journey</h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary opacity-30" />
            {education.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative flex ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 mb-8 pl-12 md:pl-0`}
              >
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 glass neon-border rounded-full flex items-center justify-center z-10 top-0">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                </div>
                <div className={`flex-1 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="glass rounded-2xl p-6">
                    <span className="text-primary text-xs font-mono tracking-widest">{item.year}</span>
                    <h3 className="font-bold text-lg mt-1">{item.title}</h3>
                    <p className="text-secondary text-sm font-medium">{item.institution}</p>
                    <p className="text-muted-foreground text-sm mt-2">{item.detail}</p>
                  </div>
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
