"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "./Loader";

// Individual photo card component
const PhotoCard = ({ imagePath, position, rotation, index, isActive, onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Load texture from image
  const texture = useTexture(imagePath);
  
  // Animate the photo card
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = 
        position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index * 0.3) * 0.1;
      
      // Rotate to face center when active
      if (isActive) {
        meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      }
      
      // Scale on hover or when active
      if (hovered || isActive) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Photo frame */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow>
        <planeGeometry args={[2.5, 2.5]} />
        <meshStandardMaterial
          map={texture}
          side={THREE.DoubleSide}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>
      
      {/* Frame border */}
      <mesh position={[0, 0, 0.01]} castShadow>
        <ringGeometry args={[1.25, 1.3, 32]} />
        <meshStandardMaterial 
          color={isActive || hovered ? "#ffffff" : "#2a2a2a"} 
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
      
      {/* Glow effect when active or hovered */}
      {(hovered || isActive) && (
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[2.7, 2.7]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};

// 3D Spiral Photo Gallery
const SpiralPhotoGallery = ({ images, activeIndex, onImageClick }) => {
  const groupRef = useRef();
  
  // Create spiral arrangement
  const radius = 5;
  const heightStep = 0.8;
  const angleStep = (Math.PI * 2) / images.length;
  
  const positions = images.map((_, index) => {
    const angle = index * angleStep;
    const height = (index - images.length / 2) * heightStep;
    return [
      Math.cos(angle) * radius,
      height,
      Math.sin(angle) * radius,
    ];
  });

  const rotations = images.map((_, index) => {
    const angle = index * angleStep;
    return [
      Math.sin(index * 0.2) * 0.1,
      angle + Math.PI / 2,
      Math.cos(index * 0.2) * 0.1,
    ];
  });

  // Auto-rotate the entire gallery
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003; // Slow rotation
    }
  });

  return (
    <group ref={groupRef}>
      {images.map((image, index) => (
        <Suspense key={index} fallback={null}>
          <PhotoCard
            imagePath={image}
            position={positions[index]}
            rotation={rotations[index]}
            index={index}
            isActive={activeIndex === index}
            onClick={() => onImageClick(index)}
          />
        </Suspense>
      ))}
    </group>
  );
};

// Curved wall photo display (like the left panel)
const CurvedWallGallery = ({ images, activeIndex, onImageClick }) => {
  const groupRef = useRef();
  
  // Create curved wall arrangement
  const wallRadius = 8;
  const wallHeight = 3;
  const cols = 4;
  const rows = 2;
  
  const positions = images.map((_, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const angle = (col / (cols - 1) - 0.5) * Math.PI * 0.6; // Curved angle
    const x = Math.sin(angle) * wallRadius;
    const z = Math.cos(angle) * wallRadius - wallRadius;
    const y = (row - 0.5) * wallHeight;
    
    return [x, y, z];
  });

  const rotations = images.map((_, index) => {
    const col = index % cols;
    const angle = (col / (cols - 1) - 0.5) * Math.PI * 0.6;
    return [0, angle, 0];
  });

  return (
    <group ref={groupRef}>
      {images.map((image, index) => (
        <Suspense key={index} fallback={null}>
          <PhotoCard
            imagePath={image}
            position={positions[index]}
            rotation={rotations[index]}
            index={index}
            isActive={activeIndex === index}
            onClick={() => onImageClick(index)}
          />
        </Suspense>
      ))}
    </group>
  );
};

// Full screen image viewer
const FullScreenViewer = ({ imagePath, isOpen, onClose }) => {
  const meshRef = useRef();
  const texture = useTexture(imagePath);

  if (!isOpen) return null;

  return (
    <group position={[0, 0, 5]}>
      {/* Backdrop */}
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.9} />
      </mesh>

      {/* Full image */}
      <mesh ref={meshRef} onClick={onClose}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial
          map={texture}
          side={THREE.DoubleSide}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};

// Main gallery scene
const PhotoGalleryScene = ({ 
  images, 
  activeIndex, 
  onImageClick, 
  viewMode, 
  isFullScreen, 
  fullScreenImage, 
  onCloseFullScreen 
}) => {
  return (
    <group>
      {/* Choose view mode */}
      {viewMode === "spiral" ? (
        <SpiralPhotoGallery
          images={images}
          activeIndex={activeIndex}
          onImageClick={onImageClick}
        />
      ) : (
        <CurvedWallGallery
          images={images}
          activeIndex={activeIndex}
          onImageClick={onImageClick}
        />
      )}

      {/* Full screen viewer */}
      {isFullScreen && fullScreenImage && (
        <FullScreenViewer
          imagePath={fullScreenImage}
          isOpen={isFullScreen}
          onClose={onCloseFullScreen}
        />
      )}

      {/* Enhanced lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={1} />
      <pointLight position={[0, 5, 0]} intensity={1.2} color="#ffffff" />
      <pointLight position={[0, -5, 0]} intensity={0.8} color="#4a90e2" />
    </group>
  );
};

const PhotoGallery3D = () => {
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

  const [activeIndex, setActiveIndex] = useState(null);
  const [viewMode, setViewMode] = useState("spiral"); // "spiral" or "wall"
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState(null);

  const handleImageClick = (index) => {
    setActiveIndex(index);
    setFullScreenImage(images[index]);
    setIsFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
    setFullScreenImage(null);
    setActiveIndex(null);
  };

  return (
    <div className="relative w-full h-full">
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
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={6}
            maxDistance={25}
            autoRotate={false}
            enableDamping
            dampingFactor={0.05}
          />
          <PhotoGalleryScene
            images={images}
            activeIndex={activeIndex}
            onImageClick={handleImageClick}
            viewMode={viewMode}
            isFullScreen={isFullScreen}
            fullScreenImage={fullScreenImage}
            onCloseFullScreen={handleCloseFullScreen}
          />
          <Preload all />
        </Suspense>
      </Canvas>

      {/* View mode toggle */}
      {!isFullScreen && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 flex gap-2">
            <button
              onClick={() => setViewMode("spiral")}
              className={`px-4 py-2 rounded transition-colors ${
                viewMode === "spiral"
                  ? "bg-white text-black"
                  : "bg-transparent text-white hover:bg-white/20"
              }`}>
              Spiral View
            </button>
            <button
              onClick={() => setViewMode("wall")}
              className={`px-4 py-2 rounded transition-colors ${
                viewMode === "wall"
                  ? "bg-white text-black"
                  : "bg-transparent text-white hover:bg-white/20"
              }`}>
              Wall View
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!isFullScreen && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/70 backdrop-blur-sm rounded-lg px-6 py-3 text-white text-sm">
          Click on any photo to view full screen • Drag to rotate • Scroll to zoom
        </div>
      )}

      {/* Close button for full screen */}
      {isFullScreen && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={handleCloseFullScreen}
            className="bg-black/70 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/90 transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery3D;

