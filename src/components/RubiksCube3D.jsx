"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "./Loader";

// Materials for cube faces
const CubeMaterials = ({ images }) => {
  const textures = images.map(img => useTexture(img));
  
  return (
    <>
      {textures.map((texture, index) => (
        <meshStandardMaterial
          key={index}
          attach={`material-${index}`}
          map={texture}
          roughness={0.2}
          metalness={0.1}
        />
      ))}
    </>
  );
};

// Single Rubik's cube with images on each face
const RubiksCube = ({ images, onImageClick, isVisible }) => {
  const cubeRef = useRef();
  
  // Use first 6 images for the 6 faces
  const faceImages = images.slice(0, 6);

  // Auto-rotate 360 degrees continuously
  useFrame(() => {
    if (cubeRef.current && isVisible) {
      cubeRef.current.rotation.y += 0.01; // Continuous rotation
      cubeRef.current.rotation.x += 0.005; // Slight tilt rotation
    }
  });

  if (!isVisible) return null;

  return (
    <Suspense fallback={
      <mesh ref={cubeRef} castShadow receiveShadow>
        <boxGeometry args={[4, 4, 4]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    }>
      <mesh 
        ref={cubeRef} 
        castShadow 
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          // Determine which face was clicked
          // Each face has 2 triangles, so divide by 2
          const faceIndex = Math.floor(e.faceIndex / 2);
          if (faceIndex >= 0 && faceIndex < 6 && onImageClick) {
            onImageClick(faceImages[faceIndex], faceIndex);
          }
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (isVisible) {
            document.body.style.cursor = "pointer";
          }
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}>
        <boxGeometry args={[4, 4, 4]} />
        <CubeMaterials images={faceImages} />
      </mesh>
    </Suspense>
  );
};

// Image viewer at cube size
const ImageViewer = ({ imagePath, isOpen, onClose }) => {
  const meshRef = useRef();
  const texture = useTexture(imagePath);

  if (!isOpen) return null;

  return (
    <group position={[0, 0, 0]}>
      {/* Image at same size as cube (4x4) - click to close */}
      <mesh 
        ref={meshRef} 
        onClick={onClose}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial
          map={texture}
          side={THREE.DoubleSide}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
};

// Main scene
const RubiksCubeScene = ({ images, onImageClick, isCubeVisible, isFullScreen, fullScreenImage, onCloseFullScreen }) => {
  return (
    <group>
      {/* Cube - only visible when not in full screen */}
      <RubiksCube 
        images={images} 
        onImageClick={onImageClick}
        isVisible={isCubeVisible}
      />

      {/* Image viewer at cube size */}
      {isFullScreen && fullScreenImage && (
        <Suspense fallback={null}>
          <ImageViewer
            imagePath={fullScreenImage}
            isOpen={isFullScreen}
            onClose={onCloseFullScreen}
          />
        </Suspense>
      )}

      {/* Enhanced lighting */}
      <ambientLight intensity={1} />
      <directionalLight position={[5, 8, 5]} intensity={2} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={1.5} />
      <pointLight position={[0, 5, 0]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, -5, 0]} intensity={1} color="#ffffff" />
    </group>
  );
};

const RubiksCube3D = () => {
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

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [isCubeVisible, setIsCubeVisible] = useState(true);

  const handleImageClick = (imagePath, index) => {
    setFullScreenImage(imagePath);
    setIsFullScreen(true);
    setIsCubeVisible(false);
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
    setFullScreenImage(null);
    setIsCubeVisible(true);
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
            maxDistance={20}
            autoRotate={!isFullScreen}
            autoRotateSpeed={2}
            enableDamping
            dampingFactor={0.05}
          />
          <RubiksCubeScene 
            images={images}
            onImageClick={handleImageClick}
            isCubeVisible={isCubeVisible}
            isFullScreen={isFullScreen}
            fullScreenImage={fullScreenImage}
            onCloseFullScreen={handleCloseFullScreen}
          />
          <Preload all />
        </Suspense>
      </Canvas>

    </div>
  );
};

export default RubiksCube3D;
