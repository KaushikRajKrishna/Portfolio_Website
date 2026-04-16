import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Send, Mail, Phone, Linkedin, Github, CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";

const socials = [
  { icon: Mail, label: "Email", value: "kaushikrajkrishna@gmail.com", href: "mailto:kaushikrajkrishna@gmail.com", color: "#00F5FF" },
  { icon: Phone, label: "Phone", value: "+91 9102743179", href: "tel:+919102743179", color: "#8A2BE2" },
  { icon: Linkedin, label: "LinkedIn", value: "Kaushik Raj Krishna", href: "https://www.linkedin.com/in/kaushik-raj-krishna-373771232/", color: "#00F5FF" },
  { icon: Github, label: "GitHub", value: "Krishna1boy", href: "https://github.com/Krishna1boy", color: "#8A2BE2" },
];

function FloatingInput({ label, id, type = "text", value, onChange, multiline = false }: {
  label: string; id: string; type?: string; value: string;
  onChange: (v: string) => void; multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${
          active
            ? "top-2 text-xs font-mono tracking-widest text-primary"
            : "top-1/2 -translate-y-1/2 text-muted-foreground text-sm"
        } ${multiline && !active ? "top-4 translate-y-0" : ""}`}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full glass rounded-xl px-4 pt-7 pb-3 text-sm bg-transparent outline-none resize-none transition-all duration-300 ${
            focused ? "neon-border shadow-neon" : "border-border"
          }`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full glass rounded-xl px-4 pt-6 pb-2 text-sm bg-transparent outline-none transition-all duration-300 ${
            focused ? "neon-border shadow-neon" : "border-border"
          }`}
        />
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSent(true);
    confetti({
      particleCount: 180,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#00F5FF", "#8A2BE2", "#ffffff"],
    });
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

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
          <p className="text-primary text-sm font-mono tracking-widest mb-3">GET IN TOUCH</p>
          <h1 className="text-5xl md:text-6xl font-black gradient-text mb-4">Contact</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a project in mind? Let's build something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl p-8 neon-border relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 relative z-10"
                  >
                    <CheckCircle size={64} className="text-primary mb-4 animate-pulse-neon" />
                    <h3 className="text-2xl font-bold gradient-text mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground text-center">Thanks for reaching out! I'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-5 relative z-10"
                  >
                    <h2 className="text-xl font-bold mb-6">Send a Message</h2>
                    <FloatingInput
                      label="Your Name"
                      id="name"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                    />
                    <FloatingInput
                      label="Email Address"
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                    />
                    <FloatingInput
                      label="Your Message"
                      id="message"
                      value={form.message}
                      onChange={(v) => setForm({ ...form, message: v })}
                      multiline
                    />
                    <motion.button
                      type="submit"
                      disabled={loading || !form.name || !form.email || !form.message}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl font-semibold text-primary-foreground flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: "linear-gradient(135deg, #00F5FF, #8A2BE2)" }}
                    >
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="glass rounded-3xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-2">Let's Connect</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I'm always open to discussing new projects, internship opportunities, or ways to contribute to the developer community.
              </p>
            </div>

            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 glass rounded-2xl p-4 group"
                style={{ borderColor: `${s.color}20` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
                >
                  <s.icon size={18} style={{ color: s.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground tracking-widest uppercase">{s.label}</p>
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{s.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
