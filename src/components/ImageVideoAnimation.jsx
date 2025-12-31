"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "./Loader";
import { motion, AnimatePresence } from "framer-motion";

// Animated image display component
const AnimatedImage = ({ imagePath, isActive, index }) => {
  const meshRef = useRef();
  const texture = useTexture(imagePath);

  useFrame((state) => {
    if (meshRef.current && isActive) {
      // Gentle floating animation when active
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      scale={isActive ? [1, 1, 1] : [0.8, 0.8, 0.8]}
      visible={isActive}>
      <planeGeometry args={[4, 4]} />
      <meshStandardMaterial
        map={texture}
        side={THREE.DoubleSide}
        roughness={0.1}
        metalness={0.2}
        transparent
        opacity={isActive ? 1 : 0}
      />
    </mesh>
  );
};

// Video-like animation scene
const VideoAnimationScene = ({ currentIndex, images }) => {
  return (
    <group>
      {images.map((image, index) => (
        <Suspense key={index} fallback={null}>
          <AnimatedImage
            imagePath={image}
            isActive={index === currentIndex}
            index={index}
          />
        </Suspense>
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />
    </group>
  );
};

// Main component with video-like controls
const ImageVideoAnimation = () => {
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(3); // seconds per image

  // Auto-play animation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [isPlaying, speed, images.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-full">
      {/* 3D Canvas */}
      <Canvas
        shadows
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 50,
          near: 0.1,
          far: 200,
          position: [0, 0, 6],
        }}>
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            minDistance={4}
            maxDistance={10}
            autoRotate={false}
          />
          <VideoAnimationScene currentIndex={currentIndex} images={images} />
          <Preload all />
        </Suspense>
      </Canvas>

      {/* Video-like controls overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-black/70 backdrop-blur-sm rounded-lg px-6 py-4 flex items-center gap-4">
          {/* Previous button */}
          <button
            onClick={handlePrevious}
            className="text-white hover:text-gray-300 transition-colors p-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Play/Pause button */}
          <button
            onClick={handlePlayPause}
            className="text-white hover:text-gray-300 transition-colors p-2">
            {isPlaying ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="text-white hover:text-gray-300 transition-colors p-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* Progress indicator */}
          <div className="flex gap-1 mx-4">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white w-8"
                    : index < currentIndex
                    ? "bg-gray-400"
                    : "bg-gray-600"
                }`}
              />
            ))}
          </div>

          {/* Speed control */}
          <div className="flex items-center gap-2 text-white text-sm">
            <span>Speed:</span>
            <input
              type="range"
              min="1"
              max="5"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-20"
            />
            <span>{speed}s</span>
          </div>
        </div>
      </div>

      {/* Image counter */}
      <div className="absolute top-4 right-4 z-10 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImageVideoAnimation;

