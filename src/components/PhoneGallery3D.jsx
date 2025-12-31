"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "./Loader";

// Phone dimensions (Pixel 6a approximate) - shared constant
const PHONE_DEPTH = 0.3;

// Phone model component (Pixel 6a)
const PhoneModel = ({ images, selectedImageIndex, onImageClick }) => {
  const phoneRef = useRef();
  const screenRef = useRef();
  
  // Phone dimensions (Pixel 6a approximate)
  const phoneWidth = 2.5;
  const phoneHeight = 5.5;
  const phoneDepth = PHONE_DEPTH;
  const screenWidth = 2.2;
  const screenHeight = 4.8;
  const bezel = 0.15;

  // Auto-rotate phone 360 degrees
  useFrame((state) => {
    if (phoneRef.current) {
      phoneRef.current.rotation.y += 0.005; // Slow continuous rotation
    }
  });

  return (
    <group ref={phoneRef} position={[0, 0, 0]}>
      {/* Phone body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[phoneWidth, phoneHeight, phoneDepth]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Screen bezel */}
      <mesh position={[0, 0, phoneDepth / 2 + 0.01]} castShadow>
        <boxGeometry args={[screenWidth + bezel * 2, screenHeight + bezel * 2, 0.02]} />
        <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0, phoneDepth / 2 + 0.03]} receiveShadow>
        <planeGeometry args={[screenWidth, screenHeight]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Image grid on screen */}
      <ImageGrid
        images={images}
        selectedImageIndex={selectedImageIndex}
        onImageClick={onImageClick}
        screenWidth={screenWidth}
        screenHeight={screenHeight}
      />
    </group>
  );
};

// Image grid component for phone screen
const ImageGrid = ({ images, selectedImageIndex, onImageClick, screenWidth, screenHeight }) => {
  const gridCols = 2;
  const gridRows = 4;
  const imageSpacing = 0.1;
  const imageWidth = (screenWidth - imageSpacing * (gridCols + 1)) / gridCols;
  const imageHeight = (screenHeight - imageSpacing * (gridRows + 1)) / gridRows;

  return (
    <group position={[0, 0, PHONE_DEPTH / 2 + 0.04]}>
      {images.map((image, index) => {
        const row = Math.floor(index / gridCols);
        const col = index % gridCols;
        const x = (col - (gridCols - 1) / 2) * (imageWidth + imageSpacing);
        const y = ((gridRows - 1) / 2 - row) * (imageHeight + imageSpacing);

        return (
          <ImageThumbnail
            key={index}
            imagePath={image}
            position={[x, y, 0]}
            width={imageWidth}
            height={imageHeight}
            isSelected={selectedImageIndex === index}
            onClick={() => onImageClick(index)}
            index={index}
          />
        );
      })}
    </group>
  );
};

// Individual image thumbnail on phone screen
const ImageThumbnail = ({ imagePath, position, width, height, isSelected, onClick, index }) => {
  const meshRef = useRef();
  const texture = useTexture(imagePath);

  useFrame(() => {
    if (meshRef.current) {
      // Subtle hover animation
      if (isSelected) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <group position={position}>
      {/* Image thumbnail */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          map={texture}
          side={THREE.DoubleSide}
          roughness={0.1}
        />
      </mesh>
      
      {/* Border */}
      <mesh position={[0, 0, 0.001]}>
        <ringGeometry args={[width / 2 - 0.02, width / 2, 32]} />
        <meshStandardMaterial
          color={isSelected ? "#ffffff" : "#333333"}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Full screen image viewer
const FullScreenImage = ({ imagePath, isOpen, onClose }) => {
  const meshRef = useRef();
  const texture = useTexture(imagePath);

  if (!isOpen) return null;

  return (
    <group position={[0, 0, 2]}>
      {/* Backdrop */}
      <mesh position={[0, 0, -0.5]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.8} />
      </mesh>

      {/* Full image */}
      <mesh ref={meshRef} onClick={onClose}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial
          map={texture}
          side={THREE.DoubleSide}
          roughness={0.1}
        />
      </mesh>

      {/* Close indicator */}
      <mesh position={[2.8, 2.8, 0.1]}>
        <planeGeometry args={[0.5, 0.5]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

// Main gallery component
const PhoneGalleryScene = ({ images, selectedImageIndex, onImageClick, isFullScreen, fullScreenImage, onCloseFullScreen }) => {
  return (
    <group>
      {/* Phone model */}
      <PhoneModel
        images={images}
        selectedImageIndex={selectedImageIndex}
        onImageClick={onImageClick}
      />

      {/* Full screen image viewer */}
      {isFullScreen && fullScreenImage && (
        <FullScreenImage
          imagePath={fullScreenImage}
          isOpen={isFullScreen}
          onClose={onCloseFullScreen}
        />
      )}

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={0.8} />
      <pointLight position={[0, 5, 0]} intensity={1} color="#ffffff" />
    </group>
  );
};

const PhoneGalleryCanvas = () => {
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

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setFullScreenImage(images[index]);
    setIsFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
    setFullScreenImage(null);
    setSelectedImageIndex(null);
  };

  return (
    <div className="relative w-full h-full">
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
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            minDistance={6}
            maxDistance={15}
            autoRotate={false}
          />
          <PhoneGalleryScene
            images={images}
            selectedImageIndex={selectedImageIndex}
            onImageClick={handleImageClick}
            isFullScreen={isFullScreen}
            fullScreenImage={fullScreenImage}
            onCloseFullScreen={handleCloseFullScreen}
          />
          <Preload all />
        </Suspense>
      </Canvas>

      {/* Instructions overlay */}
      {!isFullScreen && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/70 backdrop-blur-sm rounded-lg px-6 py-3 text-white text-sm">
          Click on any image to view full screen • Phone rotates automatically
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

export default PhoneGalleryCanvas;

