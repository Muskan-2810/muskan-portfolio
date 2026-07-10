"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, ContactShadows} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { lerp } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Robot "head" core — a faceted icosahedron core standing in for a face,     */
/* built from primitives only (no external GLTF dependency) so the scene     */
/* loads instantly and stays lightweight.                                     */
/* -------------------------------------------------------------------------- */
function RobotCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const visorRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.25;
    if (visorRef.current) {
      const t = state.clock.elapsedTime;
      const mat = visorRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.4 + Math.sin(t * 2.2) * 0.4;
    }
  });

  return (
    <group>
      {/* Head shell */}
      <mesh ref={coreRef} castShadow receiveShadow>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color="#0D0F12"
          metalness={0.9}
          roughness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.15}
        />
      </mesh>

      {/* Glowing visor band */}
      <mesh ref={visorRef} position={[0, 0, 0]}>
        <torusGeometry args={[0.62, 0.05, 16, 64]} />
        <meshStandardMaterial
          color="#3E8EFF"
          emissive="#3E8EFF"
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>

      {/* Neck / body hint */}
      <mesh position={[0, -1.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.75, 1.1, 8]} />
        <meshPhysicalMaterial color="#0D0F12" metalness={0.85} roughness={0.3} />
      </mesh>
    </group>
  );
}

/** Concentric holographic energy rings that slowly counter-rotate around the core. */
function EnergyRings() {
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringA.current) ringA.current.rotation.z += delta * 0.15;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.12;
    if (ringC.current) ringC.current.rotation.x += delta * 0.1;
  });

  return (
    <group>
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.9, 0.012, 8, 128]} />
        <meshBasicMaterial color="#3E8EFF" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2, 0.4, 0]}>
        <torusGeometry args={[2.3, 0.008, 8, 128]} />
        <meshBasicMaterial color="#8B7CFF" transparent opacity={0.35} />
      </mesh>
      <mesh ref={ringC} rotation={[0.3, 0, Math.PI / 3]}>
        <torusGeometry args={[2.7, 0.006, 8, 128]} />
        <meshBasicMaterial color="#274DFF" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

/** Digital particle swarm that drifts and gently reacts to pointer position. */
function DigitalParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 260;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.2 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.05;
    // Subtle pointer-driven parallax tilt on the whole particle field.
    const { pointer } = state;
    pointsRef.current.rotation.x = lerp(
      pointsRef.current.rotation.x,
      pointer.y * 0.15,
      0.03
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#9fc4ff"
        size={0.03}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/** Two thin vertical light-beam planes for a "scanning" holographic accent. */
function LightBeams() {
  return (
    <group>
      {[-1.6, 1.6].map((x, i) => (
        <mesh key={i} position={[x, 0, -0.5]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.05, 5]} />
          <meshBasicMaterial
            color="#3E8EFF"
            transparent
            opacity={0.18}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Whole rig floats, rotates slightly, and leans toward the cursor. */
function SceneRig() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const { pointer } = state;
    groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, pointer.x * 0.4, 0.04);
    groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, -pointer.y * 0.2, 0.04);
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
        <RobotCore />
        <EnergyRings />
        <LightBeams />
      </Float>
      <DigitalParticles />
    </group>
  );
}

/** Cinematic three-point lighting rig with a dominant blue rim light. */
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.25} color="#8B7CFF" />
      <directionalLight
        position={[3, 4, 5]}
        intensity={1.1}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Blue rim light from behind to separate the robot from the background */}
      <pointLight position={[-4, 1, -4]} intensity={6} color="#3E8EFF" distance={12} />
      <pointLight position={[2, -2, 3]} intensity={1.2} color="#8B7CFF" distance={8} />
    </>
  );
}



export default function AIRobotScene() {
  return (
    <div className="relative h-[420px] w-full md:h-[560px] lg:h-[640px]" aria-hidden="true">
      <Canvas shadows dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          
          <Lighting />
          <SceneRig />
          <ContactShadows
            position={[0, -2.6, 0]}
            opacity={0.5}
            scale={8}
            blur={2.5}
            far={4}
            color="#000000"
          />
          <Environment preset="city" />
          <EffectComposer>
            <Bloom
              intensity={0.9}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.2} darkness={0.7} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
