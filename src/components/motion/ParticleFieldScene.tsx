/* eslint-disable react-compiler/react-compiler */
/* R3F scenes use imperative Three.js patterns (mutating camera.position,
   Math.random in init, ref access in render) that are incompatible with
   the React Compiler lint rules. This file is intentionally excluded.    */
'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ── Particle cloud ─────────────────────────────────────────────────────────────
function Particles({ count = 220 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph  = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      ph[i]          = Math.random() * Math.PI * 2;
    }
    return { positions: pos, phases: ph };
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t   = clock.elapsedTime;
    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const phase = phases[i];
      pos.setY(i, positions[i * 3 + 1] + Math.sin(t * 0.18 + phase) * 0.25);
      pos.setX(i, positions[i * 3]     + Math.cos(t * 0.12 + phase) * 0.15);
    }
    pos.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return geo;
  }, [positions]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#D4AF37"
        size={0.028}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ── Camera parallax ────────────────────────────────────────────────────────────
function CameraRig({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (mouse.current.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ── Exported scene (ssr: false via dynamic import) ────────────────────────────
export function ParticleFieldScene() {
  const mouse = useRef({ x: 0, y: 0 });

  // Initialise from window at mount — avoids accessing ref in render
  const [particleCount, setParticleCount] = useState(220);

  useEffect(() => {
    const isMobile = window.matchMedia('(hover: none)').matches;
    if (isMobile) setParticleCount(0);

    if (!isMobile) {
      function onMouseMove(e: MouseEvent) {
        mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
      }
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', onMouseMove);
    }
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <Particles count={particleCount} />
      <CameraRig mouse={mouse} />
    </Canvas>
  );
}
