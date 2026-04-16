import { motion } from "framer-motion";
import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";

const skillCategories = [
  {
    title: "Frontend",
    color: "#00F5FF",
    skills: [
      { name: "React", level: 92 },
      { name: "Next.js", level: 88 },
      { name: "Redux", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "TypeScript", level: 82 },
    ],
  },
  {
    title: "Backend",
    color: "#8A2BE2",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 87 },
      { name: "Flask", level: 80 },
      { name: "REST APIs", level: 92 },
      { name: "JWT Auth", level: 85 },
    ],
  },
  {
    title: "Database",
    color: "#00F5FF",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "MySQL", level: 80 },
    ],
  },
  {
    title: "AI/ML",
    color: "#8A2BE2",
    skills: [
      { name: "Python", level: 88 },
      { name: "scikit-learn", level: 78 },
      { name: "TensorFlow", level: 70 },
      { name: "Pandas", level: 85 },
    ],
  },
  {
    title: "DevOps & Tools",
    color: "#00F5FF",
    skills: [
      { name: "Git/GitHub", level: 92 },
      { name: "CI/CD", level: 78 },
      { name: "Vercel", level: 88 },
      { name: "Datadog", level: 72 },
      { name: "Site24x7", level: 72 },
    ],
  },
];

// Flatten all skills for the 3D cloud
const allSkills = [
  "React", "Next.js", "Node.js", "Python", "MongoDB", "Express",
  "Redux", "Tailwind", "Flask", "MySQL", "JWT", "CI/CD",
  "TypeScript", "Git", "Vercel", "scikit-learn", "REST API", "MERN",
];

function SkillCloud() {
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    return allSkills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / allSkills.length);
      const theta = Math.sqrt(allSkills.length * Math.PI) * phi;
      return {
        x: 3 * Math.sin(phi) * Math.cos(theta),
        y: 3 * Math.sin(phi) * Math.sin(theta),
        z: 3 * Math.cos(phi),
      };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {allSkills.map((skill, i) => (
        <Float key={skill} speed={1 + i * 0.05} floatIntensity={0.3}>
          <Text
            position={[positions[i].x, positions[i].y, positions[i].z]}
            fontSize={0.22}
            color={i % 2 === 0 ? "#00F5FF" : "#8A2BE2"}
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.85}
          >
            {skill}
          </Text>
        </Float>
      ))}
    </group>
  );
}

export default function Skills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-24 pb-16 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm font-mono tracking-widest mb-3">EXPERTISE</p>
          <h1 className="text-5xl md:text-6xl font-black gradient-text mb-4">Skills</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A diverse tech stack spanning frontend, backend, databases, AI/ML, and DevOps.
          </p>
        </motion.div>

        {/* 3D Skill Cloud */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="h-64 md:h-80 w-full mb-16 glass rounded-3xl overflow-hidden neon-border"
        >
          <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#00F5FF" />
            <pointLight position={[-5, -5, 5]} intensity={0.8} color="#8A2BE2" />
            <Suspense fallback={null}>
              <SkillCloud />
            </Suspense>
          </Canvas>
        </motion.div>

        {/* Skill categories with progress bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="glass rounded-2xl p-6"
              style={{ borderColor: `${cat.color}20` }}
            >
              <h3 className="font-bold text-lg mb-4" style={{ color: cat.color }}>{cat.title}</h3>
              <div className="space-y-3">
                {cat.skills.map((skill, j) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground/80">{skill.name}</span>
                      <span className="text-muted-foreground font-mono text-xs">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.6 + i * 0.1 + j * 0.05, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}80)` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
