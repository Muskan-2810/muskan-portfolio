"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/* Custom point-sprite star material — glow falloff done per-particle in the  */
/* fragment shader instead of relying on a bitmap sprite, so it stays crisp   */
/* at any DPR.                                                                 */
/* -------------------------------------------------------------------------- */
const StarMaterial = shaderMaterial(
  { uTime: 0, uSize: 2.0, uColor: new THREE.Color("#9fc4ff") },
  /* vertex */ `
    uniform float uTime;
    uniform float uSize;
    attribute float aScale;
    attribute float aTwinkleOffset;
    varying float vTwinkle;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      float twinkle = 0.6 + 0.4 * sin(uTime * 1.5 + aTwinkleOffset * 6.28318);
      vTwinkle = twinkle;
      gl_PointSize = uSize * aScale * twinkle * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  /* fragment */ `
    uniform vec3 uColor;
    varying float vTwinkle;

    void main() {
      vec2 uv = gl_PointCoord.xy - 0.5;
      float dist = length(uv);
      float alpha = smoothstep(0.5, 0.0, dist);
      gl_FragColor = vec4(uColor, alpha * vTwinkle);
    }
  `
);

extend({ StarMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    starMaterial: any;
  }
}

/** A single layer of stars at a given radius/count/color — used to build depth via parallax. */
function StarLayer({
  count,
  radius,
  size,
  color,
  speed,
}: {
  count: number;
  radius: number;
  size: number;
  color: string;
  speed: number;
}) {
  const materialRef = useRef<any>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, scales, twinkleOffsets] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const twinkleOffsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute in a flattened sphere shell to suggest a galactic disc.
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = radius * (0.6 + Math.random() * 0.4);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4;
      positions[i * 3 + 2] = r * Math.cos(phi);

      scales[i] = Math.random() * 1.5 + 0.3;
      twinkleOffsets[i] = Math.random();
    }
    return [positions, scales, twinkleOffsets];
  }, [count, radius]);

  useFrame((state, delta) => {
    if (materialRef.current) materialRef.current.uTime += delta;
    if (pointsRef.current) pointsRef.current.rotation.y += delta * speed;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aTwinkleOffset" args={[twinkleOffsets, 1]} />
      </bufferGeometry>
      {/* @ts-expect-error custom shader material registered via extend() */}
      <starMaterial
        ref={materialRef}
        uColor={new THREE.Color(color)}
        uSize={size}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Soft nebula fog planes — large, low-opacity gradients drifting slowly behind the stars. */
function NebulaFog() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.z += delta * 0.01;
  });

  const nebulae = [
    { color: "#274DFF", position: [-6, 2, -12], scale: 10 },
    { color: "#8B7CFF", position: [7, -3, -16], scale: 12 },
    { color: "#3E8EFF", position: [0, 4, -20], scale: 14 },
  ] as const;

  return (
    <group ref={group}>
      {nebulae.map((n, i) => (
        <mesh key={i} position={n.position as unknown as [number, number, number]}>
          <planeGeometry args={[n.scale, n.scale]} />
          <meshBasicMaterial
            color={n.color}
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Camera drifts subtly with the pointer for a parallax "looking into deep space" feel. */
function CameraRig() {
  useFrame((state) => {
    const { pointer, camera } = state;
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.02;
    camera.position.y += (pointer.y * 0.4 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/**
 * Full-viewport, fixed, non-interactive galaxy background.
 * Sits behind all page content (z-index handled by parent wrapper).
 */
export default function GalaxyBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#050507"]} />
        <fog attach="fog" args={["#050507", 8, 26]} />
        <CameraRig />
        <NebulaFog />
        <StarLayer count={1800} radius={14} size={1.6} color="#9fc4ff" speed={0.004} />
        <StarLayer count={900} radius={9} size={2.2} color="#c9d6ff" speed={0.008} />
        <StarLayer count={300} radius={5} size={3.0} color="#8B7CFF" speed={0.012} />
      </Canvas>
    </div>
  );
}
