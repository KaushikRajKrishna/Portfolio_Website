import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ExternalLink, Award } from "lucide-react";

const certs = [
  {
    title: "Microsoft Azure AI Essentials",
    issuer: "Microsoft",
    date: "2024",
    color: "#00F5FF",
    badge: "AI",
    description: "Foundational knowledge of AI and ML services on Microsoft Azure, including Cognitive Services, Azure ML, and responsible AI principles.",
    skills: ["Azure Cognitive Services", "Azure ML Studio", "Responsible AI", "Cloud Computing"],
  },
  {
    title: "MERN Stack Development",
    issuer: "C-DAC",
    date: "2025",
    color: "#8A2BE2",
    badge: "MERN",
    description: "Comprehensive full-stack web development program covering MongoDB, Express.js, React, and Node.js with hands-on project implementation.",
    skills: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs"],
  },
  {
    title: "PCAP – Python Certified",
    issuer: "Python Institute",
    date: "2024",
    color: "#00F5FF",
    badge: "Py",
    description: "Professional certification validating proficiency in Python programming, OOP concepts, modules, and advanced programming techniques.",
    skills: ["Python OOP", "Data Structures", "File I/O", "Exception Handling"],
  },
  {
    title: "Machine Learning Program",
    issuer: "Infosys Springboard",
    date: "2024",
    color: "#8A2BE2",
    badge: "ML",
    description: "Extensive program covering supervised and unsupervised learning, neural networks, feature engineering, and ML model deployment.",
    skills: ["scikit-learn", "Neural Networks", "Feature Engineering", "Model Deployment"],
  },
  {
    title: "Artificial Intelligence and Machine Learning Course",
    issuer: "NIELIT Ropar",
    date: "2024",
    color: "#FF6B35",
    badge: "AI/ML",
    description: "Four-month intensive program by the National Institute of Electronics & Information Technology covering Python for Data Science, statistical analysis, and hands-on ML concepts with real-world implementation.",
    skills: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "Flask", "Machine Learning", "Statistical Analysis"],
  },
];

export default function Certifications() {
  const [selected, setSelected] = useState<typeof certs[0] | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-24 pb-16 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-mono tracking-widest mb-3">CREDENTIALS</p>
          <h1 className="text-5xl md:text-6xl font-black gradient-text mb-4">Certifications</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Industry-recognized certifications validating expertise in AI, cloud, and full-stack development.
          </p>
        </motion.div>

        {/* Featured cert carousel */}
        <div className="mb-12">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="glass rounded-3xl p-8 md:p-12 cursor-pointer"
                style={{ borderColor: `${certs[activeIndex].color}40`, boxShadow: `0 0 40px ${certs[activeIndex].color}15` }}
                onClick={() => setSelected(certs[activeIndex])}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div
                    className="w-24 h-24 shrink-0 rounded-2xl flex items-center justify-center text-2xl font-black animate-pulse-neon"
                    style={{ background: `${certs[activeIndex].color}15`, border: `2px solid ${certs[activeIndex].color}40`, color: certs[activeIndex].color }}
                  >
                    {certs[activeIndex].badge}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <Award size={16} style={{ color: certs[activeIndex].color }} />
                      <span className="text-xs font-mono tracking-widest" style={{ color: certs[activeIndex].color }}>CERTIFIED</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black mb-2">{certs[activeIndex].title}</h2>
                    <p className="font-semibold mb-1" style={{ color: certs[activeIndex].color }}>{certs[activeIndex].issuer}</p>
                    <p className="text-muted-foreground text-sm mb-4">{certs[activeIndex].date}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{certs[activeIndex].description}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel nav */}
          <div className="flex justify-center gap-3 mt-6">
            {certs.map((cert, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-8 bg-primary" : "bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* All certs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => { setSelected(cert); }}
              className="glass rounded-2xl p-5 cursor-pointer group"
              style={{ borderColor: `${cert.color}20` }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-sm font-bold"
                  style={{ background: `${cert.color}15`, color: cert.color }}
                >
                  {cert.badge}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm truncate">{cert.title}</h3>
                  <p className="text-xs font-medium" style={{ color: cert.color }}>{cert.issuer} · {cert.date}</p>
                </div>
                <ExternalLink size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" style={{ color: cert.color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              className="relative z-10 glass rounded-3xl p-8 max-w-lg w-full"
              style={{ borderColor: `${selected.color}40` }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 glass p-2 rounded-xl">
                <X size={16} />
              </button>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black mb-4 animate-pulse-neon"
                style={{ background: `${selected.color}15`, color: selected.color, border: `2px solid ${selected.color}40` }}
              >
                {selected.badge}
              </div>
              <h2 className="text-xl font-black mb-1">{selected.title}</h2>
              <p className="font-semibold text-sm mb-1" style={{ color: selected.color }}>{selected.issuer}</p>
              <p className="text-muted-foreground text-xs mb-4 font-mono">{selected.date}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{selected.description}</p>
              <div className="flex flex-wrap gap-2">
                {selected.skills.map((skill) => (
                  <span key={skill} className="text-xs px-2 py-1 rounded-md" style={{ background: `${selected.color}10`, color: selected.color, border: `1px solid ${selected.color}20` }}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
