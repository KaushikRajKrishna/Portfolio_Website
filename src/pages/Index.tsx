import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/HeroSection";
import SummarySection from "@/components/SummarySection";
import CinematicHeroSection from "@/components/CinematicHeroSection";

gsap.registerPlugin(ScrollTrigger);

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const quickLinks = [
  { href: "/about", label: "About Me", desc: "Education & background", color: "#00F5FF" },
  { href: "/projects", label: "Projects", desc: "Full stack & ML work", color: "#8A2BE2" },
  { href: "/skills", label: "Skills", desc: "Tech stack overview", color: "#00F5FF" },
  { href: "/contact", label: "Contact", desc: "Let's build together", color: "#8A2BE2" },
];

export default function Index() {
  // Refresh ScrollTrigger after Framer Motion's page-entry animation settles (was 0.6s)
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => clearTimeout(id);
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6 }}
    >
      <HeroSection />
      <SummarySection />
      <CinematicHeroSection />

      {/* Quick nav section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary text-sm font-mono tracking-widest mb-3">EXPLORE</p>
            <h2 className="text-4xl md:text-5xl font-black gradient-text">Navigate the Portfolio</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link
                  to={link.href}
                  className="block glass rounded-2xl p-6 hover:shadow-glass transition-all duration-300 group"
                  style={{ borderColor: `${link.color}20` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center"
                    style={{ background: `${link.color}15`, border: `1px solid ${link.color}30` }}
                  >
                    <ArrowRight size={18} style={{ color: link.color }} />
                  </div>
                  <h3 className="font-bold text-lg mb-1" style={{ color: link.color }}>{link.label}</h3>
                  <p className="text-muted-foreground text-sm">{link.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
