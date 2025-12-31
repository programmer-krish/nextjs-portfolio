"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "./Loader";

// Puzzle piece component - each image becomes a puzzle piece
const PuzzlePiece = ({ imagePath, position, rotation, index }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Load texture from image
  const texture = useTexture(imagePath);

  // Animate the puzzle piece
  useFrame((state) => {
    if (
      meshRef.current &&
      position &&
      Array.isArray(position) &&
      position.length >= 3
    ) {
      // Gentle floating animation
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + index) * 0.15;

      // Slight rotation animation
      meshRef.current.rotation.y += 0.003;

      // Scale on hover
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  // Default values if position/rotation are undefined
  const safePosition =
    position && Array.isArray(position) && position.length >= 3
      ? position
      : [0, 0, 0];
  const safeRotation =
    rotation && Array.isArray(rotation) && rotation.length >= 3
      ? rotation
      : [0, 0, 0];

  return (
    <group position={safePosition} rotation={safeRotation}>
      {/* Main image plane */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow>
        <planeGeometry args={[2.5, 2.5]} />
        <meshStandardMaterial
          map={texture}
          side={THREE.DoubleSide}
          roughness={0.2}
          metalness={0.2}
        />
      </mesh>

      {/* Frame/border to make it look like a puzzle piece */}
      <mesh position={[0, 0, 0.01]} castShadow>
        <ringGeometry args={[1.25, 1.3, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
    </group>
  );
};

// Puzzle group that arranges pieces in 3D space
const PuzzleGroup = () => {
  const images = [
    "/home/PXL_20251219_034540952.jpg",
    "/home/PXL_20251221_065402976.MP.jpg",
    "/home/PXL_20251221_084102591.MP.jpg",
    "/home/PXL_20251222_140228724.jpg",
    "/home/PXL_20251223_081001458.jpg",
    "/home/PXL_20251224_112349728.jpg",
    "/home/PXL_20251224_114314029.jpg",
    "/home/PXL_20251224_115621440.MP.jpg",
  ];

  // Arrange puzzle pieces in a 3D formation (circular/spiral pattern)
  const positions = [
    [-3, 1, 0], // Top-left
    [-1.5, 1.5, -1], // Top-center-left
    [1.5, 1.5, -1], // Top-center-right
    [3, 1, 0], // Top-right
    [-3, -1, 0], // Bottom-left
    [-1.5, -1.5, -1], // Bottom-center-left
    [1.5, -1.5, -1], // Bottom-center-right
    [3, -1, 0], // Bottom-right
  ];

  const rotations = [
    [0.1, Math.PI / 6, -0.1], // Top-left
    [-0.1, Math.PI / 8, 0.1], // Top-center-left
    [0.15, -Math.PI / 8, -0.15], // Top-center-right
    [-0.1, -Math.PI / 6, 0.1], // Top-right
    [0.1, -Math.PI / 6, 0.1], // Bottom-left
    [-0.15, -Math.PI / 8, -0.1], // Bottom-center-left
    [0.1, Math.PI / 8, 0.15], // Bottom-center-right
    [-0.1, Math.PI / 6, -0.1], // Bottom-right
  ];

  return (
    <group>
      {images.map((image, index) => (
        <Suspense key={index} fallback={null}>
          <PuzzlePiece
            imagePath={image}
            position={positions[index]}
            rotation={rotations[index]}
            index={index}
          />
        </Suspense>
      ))}

      {/* Add ambient and directional lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={0.8} />
      <pointLight position={[0, 5, 5]} intensity={0.5} color="#ffffff" />
    </group>
  );
};

const PuzzleCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 50,
        near: 0.1,
        far: 200,
        position: [0, 0, 10],
      }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enableZoom={true}
          enablePan={true}
          minDistance={6}
          maxDistance={20}
        />
        <PuzzleGroup />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default PuzzleCanvas;
