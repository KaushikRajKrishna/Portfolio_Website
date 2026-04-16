import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 600);
          return 100;
        }
        return p + Math.random() * 12 + 3;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-[200] animated-gradient-bg flex flex-col items-center justify-center"
      >
        {/* Animated logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-8"
        >
          <div className="w-24 h-24 rounded-2xl glass neon-border flex items-center justify-center animate-pulse-neon">
            <span className="gradient-text font-black text-3xl">KRK</span>
          </div>
          <div className="absolute inset-0 rounded-2xl animate-spin-slow border border-primary/20" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-sm tracking-widest mb-8 uppercase"
        >
          Initializing Portfolio...
        </motion.p>

        {/* Progress bar */}
        <div className="w-64 h-[2px] bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        <p className="mt-2 text-primary text-xs font-mono">{Math.min(Math.round(progress), 100)}%</p>
      </motion.div>
    </AnimatePresence>
  );
}
