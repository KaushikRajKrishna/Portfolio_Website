import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowUpRight, Code2, Heart } from "lucide-react";

const NAV_LINKS = [
  { href: "/",              label: "Home" },
  { href: "/about",         label: "About" },
  { href: "/experience",    label: "Experience" },
  { href: "/projects",      label: "Projects" },
  { href: "/skills",        label: "Skills" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact",       label: "Contact" },
];

const SOCIAL_LINKS = [
  { icon: Github,   href: "https://github.com/kaushikrajkrishna",       label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/kaushikrajkrishna",   label: "LinkedIn" },
  { icon: Mail,     href: "mailto:kaushikrajkrishna@example.com",        label: "Email" },
];

const TECH_TAGS = ["React", "Next.js", "Node.js", "Python", "MongoDB", "Flask", "TypeScript", "AI/ML", "Docker"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-0 overflow-hidden">
      {/* Top gradient separator */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, #00F5FF40, #8A2BE280, #00F5FF40, transparent)" }}
      />

      {/* Faint grid overlay */}
      <div className="absolute inset-0 hero-grid-overlay opacity-20 pointer-events-none" />

      {/* Glow blobs */}
      <div
        className="absolute -top-20 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)", filter: "blur(40px)" }}
      />
      <div
        className="absolute -top-20 right-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(138,43,226,0.06) 0%, transparent 70%)", filter: "blur(40px)" }}
      />

      <div
        className="relative px-6 pt-16 pb-8"
        style={{ background: "rgba(8,8,14,0.92)", backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-6xl mx-auto">

          {/* ── Main grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">

            {/* Brand column */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(138,43,226,0.15))",
                    border: "1px solid rgba(0,245,255,0.3)",
                    boxShadow: "0 0 16px rgba(0,245,255,0.2)",
                  }}
                >
                  <Code2 size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-black text-sm gradient-text leading-none">Kaushik</p>
                  <p className="text-[10px] font-mono text-muted-foreground tracking-widest mt-0.5">RAJ KRISHNA</p>
                </div>
              </Link>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
                Full Stack Developer & AI/ML Engineer building intelligent, scalable systems at the intersection of
                <span className="text-primary"> code</span> and
                <span className="text-secondary"> intelligence</span>.
              </p>

              {/* Social icons */}
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3, scale: 1.08 }}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-200"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,245,255,0.4)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 12px rgba(0,245,255,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Navigation column */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p
                className="text-[10px] font-mono uppercase tracking-[0.35em] mb-5"
                style={{ color: "rgba(0,245,255,0.7)" }}
              >
                Navigation
              </p>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      <span
                        className="w-0 group-hover:w-3 h-px transition-all duration-200"
                        style={{ background: "#00F5FF" }}
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tech stack column */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p
                className="text-[10px] font-mono uppercase tracking-[0.35em] mb-5"
                style={{ color: "rgba(138,43,226,0.8)" }}
              >
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {TECH_TAGS.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.04 }}
                    className="px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold"
                    style={{
                      background: i % 2 === 0 ? "rgba(0,245,255,0.07)" : "rgba(138,43,226,0.07)",
                      border: `1px solid ${i % 2 === 0 ? "rgba(0,245,255,0.25)" : "rgba(138,43,226,0.25)"}`,
                      color: i % 2 === 0 ? "#00F5FF" : "#8A2BE2",
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* CTA */}
              <motion.div whileHover={{ x: 3 }} className="inline-block">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary group"
                >
                  <span
                    className="px-4 py-2 rounded-lg transition-all duration-200 group-hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]"
                    style={{
                      background: "rgba(0,245,255,0.08)",
                      border: "1px solid rgba(0,245,255,0.3)",
                    }}
                  >
                    Let's work together
                  </span>
                  <ArrowUpRight size={15} />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Divider ── */}
          <div
            className="h-px mb-6"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
          />

          {/* ── Bottom bar ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground/60 font-mono">
              © {year} Kaushik Raj Krishna. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/40 font-mono flex items-center gap-1.5">
              Built with
              <Heart size={11} className="text-primary/60" fill="currentColor" />
              using React, Framer Motion & Three.js
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
