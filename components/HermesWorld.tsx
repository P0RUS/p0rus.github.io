"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function HermesSphere() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        color="#a77b42"
        roughness={0.8}
        metalness={0.05}
      />
    </mesh>
  );
}

export default function HermesWorld() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 4]} intensity={2} />

      <HermesSphere />
    </Canvas>
  );
}