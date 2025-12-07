"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import CanvasLoader from "./Loader";

// Computer Component (Center)
const Computer = () => {
  const computerRef = useRef();

  useFrame((state) => {
    if (computerRef.current) {
      computerRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={computerRef} position={[0, 0, 0]}>
      {/* Monitor Screen */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 1.5, 0.2]} />
        <meshStandardMaterial color="#1e293b" emissive="#0ea5e9" emissiveIntensity={0.3} />
      </mesh>
      {/* Monitor Stand */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      {/* Keyboard */}
      <mesh position={[0, 0.1, 0.8]} rotation={[-Math.PI / 12, 0, 0]} castShadow>
        <boxGeometry args={[1.8, 0.1, 0.6]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
      {/* Screen Glow */}
      <mesh position={[0, 1.2, -0.1]}>
        <planeGeometry args={[2, 1.5]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
};

// Person Figure Component
const Person = ({ position, scale, color, label, rotationSpeed = 1 }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01 * rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[0.6, 0.8, 0.4]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Left Arm */}
      <mesh position={[-0.5, 0.8, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Right Arm */}
      <mesh position={[0.5, 0.8, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Left Leg */}
      <mesh position={[-0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Right Leg */}
      <mesh position={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Label - Simple Text Representation */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[0.8, 0.2, 0.05]} />
        <meshStandardMaterial color="#334155" transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

// Orbiting Person Component
const OrbitingPerson = ({ radius, angleOffset = 0, speed = 0.5, ...personProps }) => {
  const orbitRef = useRef();

  useFrame((state) => {
    if (orbitRef.current) {
      const angle = state.clock.elapsedTime * speed + angleOffset;
      orbitRef.current.position.x = Math.cos(angle) * radius;
      orbitRef.current.position.z = Math.sin(angle) * radius;
    }
  });

  return (
    <group ref={orbitRef}>
      <Person {...personProps} position={[0, 0, 0]} />
    </group>
  );
};

// Main Scene Component
const AcademicScene3D = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#0ea5e9" />
      <pointLight position={[0, 0, 5]} intensity={0.3} color="#8b5cf6" />

      {/* Computer in Center */}
      <Computer />

      {/* Child Figure - Smaller, orbiting closer */}
      <OrbitingPerson
        radius={3}
        angleOffset={0}
        speed={0.3}
        scale={[0.6, 0.6, 0.6]}
        color="#f59e0b"
        label="Child"
        rotationSpeed={0.5}
      />

      {/* Teenager Figure - Medium size, orbiting at medium distance */}
      <OrbitingPerson
        radius={4}
        angleOffset={Math.PI * 0.66}
        speed={0.4}
        scale={[0.8, 0.8, 0.8]}
        color="#10b981"
        label="Teenager"
        rotationSpeed={0.7}
      />

      {/* Working Person - Full size, orbiting farther */}
      <OrbitingPerson
        radius={5}
        angleOffset={Math.PI * 1.33}
        speed={0.5}
        scale={[1, 1, 1]}
        color="#3b82f6"
        label="Professional"
        rotationSpeed={1}
      />

      {/* Orbit Path Rings (Visual guide) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[2.8, 3.2, 64]} />
        <meshBasicMaterial color="#475569" opacity={0.2} transparent side={2} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[3.8, 4.2, 64]} />
        <meshBasicMaterial color="#475569" opacity={0.15} transparent side={2} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[4.8, 5.2, 64]} />
        <meshBasicMaterial color="#475569" opacity={0.15} transparent side={2} />
      </mesh>
    </>
  );
};

const AcademicCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
      camera={{
        fov: 50,
        near: 0.1,
        far: 100,
        position: [8, 5, 8],
      }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enableZoom={true}
          enablePan={false}
          minDistance={6}
          maxDistance={15}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
        <AcademicScene3D />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default AcademicCanvas;

