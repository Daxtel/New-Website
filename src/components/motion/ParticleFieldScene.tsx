'use client';
import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ── Particle cloud ────────────────────────────────────────────────────────────
function Particles({ count = 220 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Stable random positions + phase offsets for drift
  const { positions, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 12;   // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;    // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;    // z (depth layers)
      ph[i] = Math.random() * Math.PI * 2;            // drift phase offset
    }
    return { positions: pos, phases: ph };
  }, [count]);

  // Drift: each particle follows a slow sine path
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.elapsedTime;
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

// ── Camera parallax on mouse move ─────────────────────────────────────────────
function CameraRig({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (mouse.current.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ── Exported scene component (loaded via dynamic import, no SSR) ──────────────
export function ParticleFieldScene() {
  const mouse = useRef({ x: 0, y: 0 });
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.matchMedia('(hover: none)').matches;
    if (isMobile.current) return;

    function onMouseMove(e: MouseEvent) {
      // Normalise to -1 → 1
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <Particles count={isMobile.current ? 0 : 220} />
      <CameraRig mouse={mouse} />
    </Canvas>
  );
}
