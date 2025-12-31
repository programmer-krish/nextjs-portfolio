"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "./Loader";

// Individual image card component
const ImageCard = ({ imagePath, position, rotation, index }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Load texture from image
  const texture = useTexture(imagePath);
  
  // Animate the image card
  useFrame((state) => {
    if (meshRef.current && position && Array.isArray(position) && position.length >= 3) {
      // Gentle floating animation with different speeds per card
      meshRef.current.position.y = 
        position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index * 0.5) * 0.2;
      
      // Subtle rotation animation
      meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.1;
      
      // Scale on hover
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.15);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.15);
      }
    }
  });

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
        <planeGeometry args={[2.8, 2.8]} />
        <meshStandardMaterial
          map={texture}
          side={THREE.DoubleSide}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
      
      {/* Frame around the image */}
      <mesh position={[0, 0, 0.02]} castShadow>
        <ringGeometry args={[1.4, 1.45, 64]} />
        <meshStandardMaterial 
          color={hovered ? "#ffffff" : "#2a2a2a"} 
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>
      
      {/* Subtle glow effect on hover */}
      {hovered && (
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};

// Gallery group that arranges images in 3D space
const GalleryGroup = () => {
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

  // Arrange images in a 3D circular/spherical formation
  const radius = 4;
  const positions = images.map((_, index) => {
    const angle = (index / images.length) * Math.PI * 2;
    const height = Math.sin(index * 0.8) * 1.5;
    return [
      Math.cos(angle) * radius,
      height,
      Math.sin(angle) * radius,
    ];
  });

  const rotations = images.map((_, index) => {
    const angle = (index / images.length) * Math.PI * 2;
    return [
      Math.sin(index * 0.5) * 0.2,
      angle + Math.PI / 2,
      Math.cos(index * 0.5) * 0.1,
    ];
  });

  return (
    <group>
      {images.map((image, index) => (
        <Suspense key={index} fallback={null}>
          <ImageCard
            imagePath={image}
            position={positions[index]}
            rotation={rotations[index]}
            index={index}
          />
        </Suspense>
      ))}

      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={1} />
      <pointLight position={[0, 5, 0]} intensity={0.8} color="#ffffff" />
      <pointLight position={[0, -5, 0]} intensity={0.5} color="#4a90e2" />
    </group>
  );
};

const ImageGalleryCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 60,
        near: 0.1,
        far: 200,
        position: [0, 0, 12],
      }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={1}
          enableZoom={true}
          enablePan={true}
          minDistance={8}
          maxDistance={25}
          enableDamping
          dampingFactor={0.05}
        />
        <GalleryGroup />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default ImageGalleryCanvas;

