"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function ArchitecturalShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation for the entire group
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      // Interactive mouse follow for slight parallax
      const targetX = (state.pointer.x * Math.PI) / 10;
      const targetY = (state.pointer.y * Math.PI) / 10;
      
      groupRef.current.rotation.x += 0.02 * (targetY - groupRef.current.rotation.x);
      groupRef.current.rotation.z += 0.02 * (targetX - groupRef.current.rotation.z);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Abstract Piece */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[2.5, 0]} />
          <meshStandardMaterial 
            color="#c5a880" 
            wireframe 
            emissive="#c5a880"
            emissiveIntensity={0.3}
            transparent
            opacity={0.3}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial 
            color="#111111" 
            metalness={0.8} 
            roughness={0.2} 
          />
        </mesh>
      </Float>

      {/* Floating Debris/Blocks */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Float key={i} speed={1 + Math.random() * 2} rotationIntensity={1.5} floatIntensity={2}>
          <mesh 
            position={[
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10 - 2
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
            <boxGeometry args={[Math.random() * 0.8 + 0.2, Math.random() * 0.8 + 0.2, Math.random() * 0.8 + 0.2]} />
            <meshStandardMaterial 
              color={Math.random() > 0.5 ? "#c5a880" : "#1a1a1a"} 
              wireframe={Math.random() > 0.7}
              metalness={0.5}
              roughness={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function Hero3DScene() {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 2, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true, antialias: false }} dpr={[1, 1.5]}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#c5a880" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
        
        {/* Atmospheric Dust/Particles */}
        <Sparkles count={50} scale={15} size={3} speed={0.2} opacity={0.3} color="#c5a880" />
        
        {/* Main 3D Composition */}
        <ArchitecturalShapes />
        
        {/* Environment Map for reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
