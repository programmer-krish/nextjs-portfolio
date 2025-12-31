"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useTexture, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "./Loader";

// Wall-mounted image frame component
const WallImage = ({ imagePath, position, rotation, index }) => {
  const frameRef = useRef();
  const [hovered, setHovered] = React.useState(false);

  // Load texture from image
  const texture = useTexture(imagePath);

  useFrame(() => {
    if (frameRef.current && hovered) {
      // Subtle glow animation on hover
      frameRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), 0.1);
    } else if (frameRef.current) {
      frameRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Picture frame border */}
      <mesh
        ref={frameRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow>
        {/* Frame outer edge */}
        <boxGeometry args={[3.2, 3.2, 0.15]} />
        <meshStandardMaterial color="#8b7355" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Frame inner edge (mat) */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[2.9, 2.9, 0.05]} />
        <meshStandardMaterial color="#f5f5dc" roughness={0.5} />
      </mesh>

      {/* Image canvas */}
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[2.7, 2.7]} />
        <meshStandardMaterial
          map={texture}
          side={THREE.DoubleSide}
          roughness={0.1}
        />
      </mesh>

      {/* Glass reflection effect */}
      {hovered && (
        <mesh position={[0, 0, 0.12]}>
          <planeGeometry args={[2.7, 2.7]} />
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

// Room structure component
const Room = () => {
  const roomSize = 20;
  const wallHeight = 8;
  const wallThickness = 0.2;

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[roomSize, roomSize]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.8} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, wallHeight, 0]} receiveShadow>
        <planeGeometry args={[roomSize, roomSize]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.7} />
      </mesh>

      {/* Back wall */}
      <mesh
        position={[0, wallHeight / 2, -roomSize / 2]}
        rotation={[0, 0, 0]}
        receiveShadow>
        <boxGeometry args={[roomSize, wallHeight, wallThickness]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.6} />
      </mesh>

      {/* Left wall */}
      <mesh
        position={[-roomSize / 2, wallHeight / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow>
        <boxGeometry args={[roomSize, wallHeight, wallThickness]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.6} />
      </mesh>

      {/* Right wall */}
      <mesh
        position={[roomSize / 2, wallHeight / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow>
        <boxGeometry args={[roomSize, wallHeight, wallThickness]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.6} />
      </mesh>

      {/* Front wall (with opening for entry) */}
      <group>
        {/* Left part of front wall */}
        <mesh
          position={[-roomSize / 4, wallHeight / 2, roomSize / 2]}
          rotation={[0, 0, 0]}
          receiveShadow>
          <boxGeometry args={[roomSize / 2 - 2, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.6} />
        </mesh>
        {/* Right part of front wall */}
        <mesh
          position={[roomSize / 4, wallHeight / 2, roomSize / 2]}
          rotation={[0, 0, 0]}
          receiveShadow>
          <boxGeometry args={[roomSize / 2 - 2, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
};

// Gallery room with all images
const GalleryRoom = () => {
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

  const roomSize = 20;
  const wallHeight = 8;

  // Position images on walls
  // Back wall: 3 images
  // Left wall: 2 images
  // Right wall: 3 images

  const imagePositions = [
    // Back wall (3 images)
    [-5, wallHeight / 2 - 1, -roomSize / 2 + 0.1], // Left
    [0, wallHeight / 2 - 1, -roomSize / 2 + 0.1], // Center
    [5, wallHeight / 2 - 1, -roomSize / 2 + 0.1], // Right
    // Left wall (2 images)
    [-roomSize / 2 + 0.1, wallHeight / 2 + 2, -3], // Upper
    [-roomSize / 2 + 0.1, wallHeight / 2 - 2, 3], // Lower
    // Right wall (3 images)
    [roomSize / 2 - 0.1, wallHeight / 2 + 2, -4], // Upper left
    [roomSize / 2 - 0.1, wallHeight / 2 - 1, 0], // Center
    [roomSize / 2 - 0.1, wallHeight / 2 - 2, 4], // Lower right
  ];

  const imageRotations = [
    // Back wall
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    // Left wall
    [0, Math.PI / 2, 0],
    [0, Math.PI / 2, 0],
    // Right wall
    [0, -Math.PI / 2, 0],
    [0, -Math.PI / 2, 0],
    [0, -Math.PI / 2, 0],
  ];

  return (
    <group>
      {/* Room structure */}
      <Room />

      {/* Images on walls */}
      {images.map((image, index) => (
        <Suspense key={index} fallback={null}>
          <WallImage
            imagePath={image}
            position={imagePositions[index]}
            rotation={imageRotations[index]}
            index={index}
          />
        </Suspense>
      ))}

      {/* Gallery lighting */}
      <ambientLight intensity={0.4} />
      {/* Main gallery lights from ceiling */}
      <pointLight position={[-5, wallHeight - 1, -5]} intensity={1.5} color="#ffffff" castShadow />
      <pointLight position={[0, wallHeight - 1, -5]} intensity={1.5} color="#ffffff" castShadow />
      <pointLight position={[5, wallHeight - 1, -5]} intensity={1.5} color="#ffffff" castShadow />
      <pointLight position={[-roomSize / 2 + 1, wallHeight - 1, 0]} intensity={1.2} color="#ffffff" castShadow />
      <pointLight position={[roomSize / 2 - 1, wallHeight - 1, 0]} intensity={1.2} color="#ffffff" castShadow />
      {/* Accent lighting */}
      <directionalLight position={[0, wallHeight, 0]} intensity={0.5} />
    </group>
  );
};

const GalleryRoomCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader />}>
        <PerspectiveCamera makeDefault position={[0, 4, 12]} fov={60} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={25}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.2}
          target={[0, 4, 0]}
          enableDamping
          dampingFactor={0.05}
        />
        <GalleryRoom />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default GalleryRoomCanvas;

