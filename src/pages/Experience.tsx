import { motion } from "framer-motion";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { Briefcase, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Brand Radiator",
    period: "Aug 2025 – Present",
    type: "Full-time",
    color: "#00F5FF",
    skills: ["MERN", "Next.js", "Redux", "REST APIs", "JWT Auth", "CI/CD", "Site24x7", "Datadog"],
    description:
      "Building and maintaining full-stack web applications using the MERN stack and Next.js. Implementing Redux for state management, JWT-based authentication, and CI/CD pipelines with monitoring via Site24x7 and Datadog.",
  },
  {
    role: "MERN Stack Intern",
    company: "C-DAC",
    period: "Mar 2025 – Apr 2025",
    type: "Internship",
    color: "#8A2BE2",
    skills: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs"],
    description:
      "Completed intensive MERN stack training and built full-stack applications as part of a national-level technical program.",
  },
  {
    role: "AI/ML Trainee",
    company: "NIELIT",
    period: "June 2024",
    type: "Training",
    color: "#00F5FF",
    skills: ["Python", "Machine Learning", "Deep Learning", "scikit-learn", "TensorFlow"],
    description:
      "Underwent comprehensive AI/ML training covering supervised/unsupervised learning, neural networks, and real-world project implementation.",
  },
  {
    role: "Freelance Content Writer",
    company: "Self-Employed",
    period: "2022 – Present",
    type: "Freelance",
    color: "#8A2BE2",
    skills: ["Technical Writing", "SEO", "Developer Content", "Blogging"],
    description:
      "Writing 100+ technical articles on web development, AI/ML, and cloud technologies for developer platforms and tech blogs.",
  },
];

export default function Experience() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 20 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

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
          <p className="text-primary text-sm font-mono tracking-widest mb-3">CAREER PATH</p>
          <h1 className="text-5xl md:text-6xl font-black gradient-text mb-4">Experience</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Building real-world expertise through internships, full-time roles, and continuous learning.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary opacity-20" />

          {experiences.map((exp, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`relative flex ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 mb-12 pl-16 md:pl-0 opacity-0`}
            >
              {/* Timeline node */}
              <div
                className="absolute left-3 md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full glass flex items-center justify-center z-10 top-6"
                style={{ border: `2px solid ${exp.color}`, boxShadow: `0 0 15px ${exp.color}40` }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: exp.color }} />
              </div>

              <div className={`flex-1 ${i % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="glass rounded-2xl p-6 relative overflow-hidden group"
                  style={{ borderColor: `${exp.color}20` }}
                >
                  {/* Gradient border on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${exp.color}10, transparent, ${exp.color}10)`,
                    }}
                  />

                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase size={14} style={{ color: exp.color }} />
                        <span
                          className="text-xs font-mono tracking-widest uppercase"
                          style={{ color: exp.color }}
                        >
                          {exp.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <p className="font-semibold" style={{ color: exp.color }}>
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-lg">
                      <Calendar size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-mono">{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 relative z-10">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2 relative z-10">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs rounded-md font-medium"
                        style={{
                          background: `${exp.color}10`,
                          color: exp.color,
                          border: `1px solid ${exp.color}25`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="flex-1 hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
