import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
      }
    };

    let raf: number;
    const animateTrail = () => {
      trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.12;
      trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.12;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPos.current.x - 20}px, ${trailPos.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(animateTrail);
    };
    animateTrail();

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-primary z-[9999] pointer-events-none mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-primary/40 z-[9998] pointer-events-none"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
