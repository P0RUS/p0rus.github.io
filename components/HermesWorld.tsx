"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function HermesAtmosphere() {
  return (
    <mesh scale={1.08}>
      <sphereGeometry args={[1.5, 64, 64]} />

      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          varying vec3 vNormal;

          void main() {
            vNormal = normalize(normalMatrix * normal);

            gl_Position =
              projectionMatrix *
              modelViewMatrix *
              vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec3 vNormal;

          void main() {
            float intensity =
              pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);

            vec3 atmosphere =
              vec3(0.72, 0.48, 0.20);

            gl_FragColor =
              vec4(atmosphere, intensity * 0.35);
          }
        `}
      />
    </mesh>
  );
}

function HermesSphere() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.5, 128, 128]} />

      <shaderMaterial
        uniforms={{
          time: { value: 0 },
        }}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vPosition;

          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;

            gl_Position = projectionMatrix *
                          modelViewMatrix *
                          vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;

          varying vec3 vNormal;
          varying vec3 vPosition;

          float hash(vec3 p) {
            p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
            p *= 17.0;
            return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
          }

          float noise(vec3 p) {
            vec3 i = floor(p);
            vec3 f = fract(p);

            f = f * f * (3.0 - 2.0 * f);

            return mix(
              mix(
                mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x),
                f.y
              ),
              mix(
                mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x),
                f.y
              ),
              f.z
            );
          }

          void main() {
            vec3 p = normalize(vPosition);

            float large = noise(p * 2.8);
            float medium = noise(p * 7.0);
            float small = noise(p * 16.0);

            float terrain =
              large * 0.55 +
              medium * 0.30 +
              small * 0.15;

            vec3 dark = vec3(0.18, 0.12, 0.075);
            vec3 mid = vec3(0.48, 0.32, 0.17);
            vec3 light = vec3(0.72, 0.55, 0.32);

            vec3 surface = mix(dark, mid, terrain);
            surface = mix(surface, light, smoothstep(0.65, 0.9, terrain));

            float lighting = dot(vNormal, normalize(vec3(0.4, 0.8, 1.0)));
            lighting = max(lighting, 0.0);

            surface *= 0.45 + lighting * 0.75;

            gl_FragColor = vec4(surface, 1.0);
          }
        `}
      />
    </mesh>
  );
}

export default function HermesWorld() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 3, 4]} intensity={2} />

      <HermesSphere />
      <HermesAtmosphere />
    </Canvas>
  );
}