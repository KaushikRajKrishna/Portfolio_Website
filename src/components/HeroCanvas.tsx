import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Stars, Float } from "@react-three/drei";
import * as THREE from "three";

function FloatingOrb({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        transparent
        opacity={0.75}
      />
    </mesh>
  );
}

function MainSphere({ rotation }: { rotation: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = rotation + state.clock.elapsedTime * 0.1;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color="#00F5FF"
          emissive="#003344"
          emissiveIntensity={0.4}
          distort={0.35}
          speed={2.5}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

/** Single orbital particle ring — axis and speed configurable */
function ParticleRing({
  count = 220,
  radius = 3,
  spread = 0.5,
  color = "#00F5FF",
  rotX = 0,
  rotZ = 0,
  speed = 0.05,
}: {
  count?: number;
  radius?: number;
  spread?: number;
  color?: string;
  rotX?: number;
  rotZ?: number;
  speed?: number;
}) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const r = radius + Math.sin(i * 0.4) * (spread * 0.6);
      arr[i * 3] = Math.cos(theta) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 2] = Math.sin(theta) * r;
    }
    return arr;
  }, [count, radius, spread]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * speed;
      ref.current.rotation.x = rotX;
      ref.current.rotation.z = rotZ;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.045} transparent opacity={0.65} />
    </points>
  );
}

/** Dense nebula cloud — hundreds of random particles surrounding the scene */
function NebulaCloud() {
  const count = 700;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color("#00F5FF");
    const purple = new THREE.Color("#8A2BE2");
    const white = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const r = 4.5 + Math.random() * 3.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      pos[i * 3 + 2] = r * Math.cos(phi);

      const t = Math.random();
      const c =
        t < 0.45
          ? cyan.clone()
          : t < 0.8
          ? purple.clone()
          : white.clone().multiplyScalar(0.7);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.018;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.12;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

/** Wireframe tech grid — gives depth and sci-fi ground plane */
function TechGrid() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      // subtle breathing
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.06 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });
  return (
    <mesh ref={ref} position={[0, -2.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[26, 26, 24, 24]} />
      <meshBasicMaterial
        color="#00F5FF"
        wireframe
        transparent
        opacity={0.07}
      />
    </mesh>
  );
}

/** Vertical accent lines shooting up from the grid */
function DataBeams() {
  const beams = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const r = 3.5 + Math.random() * 2;
      return {
        x: Math.cos(angle) * r,
        z: Math.sin(angle) * r,
        delay: i * 0.4,
        height: 1.5 + Math.random() * 2,
        color: i % 2 === 0 ? "#00F5FF" : "#8A2BE2",
      };
    });
  }, []);

  return (
    <>
      {beams.map((b, i) => (
        <DataBeam key={i} {...b} />
      ))}
    </>
  );
}

function DataBeam({
  x,
  z,
  height,
  color,
  delay,
}: {
  x: number;
  z: number;
  height: number;
  color: string;
  delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.elapsedTime + delay) % 3;
      ref.current.scale.y = Math.max(0, Math.sin((t / 3) * Math.PI));
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.4 * Math.max(0, Math.sin((t / 3) * Math.PI));
    }
  });
  return (
    <mesh ref={ref} position={[x, -2.8 + height / 2, z]}>
      <cylinderGeometry args={[0.01, 0.01, height, 4]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
}

export default function HeroCanvas({
  scrollRotation = 0,
}: {
  scrollRotation?: number;
}) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} style={{ background: "transparent" }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00F5FF" />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#8A2BE2" />
      <pointLight position={[0, 0, 8]} intensity={0.6} color="#ffffff" />
      <pointLight position={[0, 3, -2]} intensity={0.5} color="#8A2BE2" />

      {/* Star background */}
      <Stars radius={80} depth={50} count={6000} factor={3} saturation={0} fade speed={1} />

      {/* Nebula particle cloud */}
      <NebulaCloud />

      {/* 3 orbital rings at different axes — creates a cage/sphere effect */}
      <ParticleRing color="#00F5FF" radius={3} speed={0.05} />
      <ParticleRing color="#8A2BE2" radius={3.4} rotX={Math.PI / 2} speed={0.03} count={180} />
      <ParticleRing color="#00F5FF" radius={2.9} rotZ={Math.PI / 4} speed={0.07} count={160} spread={0.4} />

      {/* Tech grid floor */}
      <TechGrid />

      {/* Data beams rising from grid */}
      <DataBeams />

      {/* Floating orbs — more positions, more variety */}
      <FloatingOrb position={[-3, 1, -1]} color="#00F5FF" scale={0.8} />
      <FloatingOrb position={[3, -1, -1]} color="#8A2BE2" scale={0.6} />
      <FloatingOrb position={[2, 2, -2]} color="#00F5FF" scale={0.4} />
      <FloatingOrb position={[-2, -2, -1]} color="#8A2BE2" scale={0.5} />
      <FloatingOrb position={[4, 0, -3]} color="#8A2BE2" scale={0.35} />
      <FloatingOrb position={[-4, -1, -2]} color="#00F5FF" scale={0.45} />
      <FloatingOrb position={[0, 3, -3]} color="#8A2BE2" scale={0.3} />
      <FloatingOrb position={[-1, -3, -1]} color="#00F5FF" scale={0.38} />

      {/* Main hero sphere */}
      <MainSphere rotation={scrollRotation} />
    </Canvas>
  );
}
