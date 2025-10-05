'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import SpaceStationModel from './SpaceStationModel';
import DroneModel from './DroneModel';
import { Suspense, useRef, useState, useEffect } from 'react';

interface ScrollAssemblySceneProps {
  scrollProgress: number;
}

export default function ScrollAssemblyScene({ scrollProgress }: ScrollAssemblySceneProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if device is mobile/tablet
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Disable rotation below 1024px (tablet/mobile)
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Define repair drones positions - reduced for mobile performance
  const allRepairDrones = [
    { 
      start: [12, 5, 5] as [number, number, number], 
      target: [2, 2, 2] as [number, number, number],
      appearProgress: 0.1 
    },
    { 
      start: [5, 8, -2] as [number, number, number], 
      target: [-2, 3, 1] as [number, number, number],
      appearProgress: 0.15 
    },
    { 
      start: [10, -1, 6] as [number, number, number], 
      target: [3, -2, 2] as [number, number, number],
      appearProgress: 0.2 
    },
    { 
      start: [-12, -5, -6] as [number, number, number], 
      target: [-2, -2, -2] as [number, number, number],
      appearProgress: 0.25 
    },
    { 
      start: [-6, -8, 3] as [number, number, number], 
      target: [1, -3, -1] as [number, number, number],
      appearProgress: 0.3 
    },
    { 
      start: [8, 3, -4] as [number, number, number], 
      target: [2, 1, -2] as [number, number, number],
      appearProgress: 0.35 
    },
    { 
      start: [-8, 4, 5] as [number, number, number], 
      target: [-1, 2, 2] as [number, number, number],
      appearProgress: 0.4 
    },
    { 
      start: [6, -6, -5] as [number, number, number], 
      target: [2, -2, -1] as [number, number, number],
      appearProgress: 0.45 
    },
    { 
      start: [-10, 6, -3] as [number, number, number], 
      target: [-2, 2, -1] as [number, number, number],
      appearProgress: 0.5 
    },
    { 
      start: [7, -7, 4] as [number, number, number], 
      target: [1, -2, 1] as [number, number, number],
      appearProgress: 0.55 
    },
    { 
      start: [-5, -5, -7] as [number, number, number], 
      target: [-1, -1, -2] as [number, number, number],
      appearProgress: 0.6 
    },
    { 
      start: [9, 7, 3] as [number, number, number], 
      target: [2, 2, 1] as [number, number, number],
      appearProgress: 0.65 
    },
  ];

  // Use fewer drones on mobile for better performance (4 instead of 12)
  const repairDrones = isMobile ? allRepairDrones.slice(0, 4) : allRepairDrones;

  // Get section information based on scroll progress
  const getSectionInfo = () => {
    if (scrollProgress < 0.15) {
      return { title: "Starlab Space Station", description: "The future of orbital research and development" };
    } else if (scrollProgress < 0.35) {
      return { title: "Deploying Drone Fleet", description: "Autonomous repair systems launching" };
    } else if (scrollProgress < 0.55) {
      return { title: "Swarm Coordination", description: `${repairDrones.length} drones working in perfect harmony` };
    } else if (scrollProgress < 0.75) {
      return { title: "Active Maintenance", description: "Precision repairs across the station" };
    } else {
      return { title: "Starlab Station", description: "Fully operational with autonomous fleet" };
    }
  };

  const sectionInfo = getSectionInfo();

  return (
    <div 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-screen bg-gradient-to-b from-black via-gray-900 to-black"
      style={{ pointerEvents: isMobile ? 'none' : 'auto' }}
    >
      <Canvas
        camera={{ position: [12, 8, 12], fov: 50 }}
        gl={{ 
          antialias: !isMobile, 
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: 3, // ACESFilmicToneMapping
          toneMappingExposure: 1.2
        }}
        shadows={!isMobile}
        dpr={isMobile ? [1, 1] : [1, 2]} // Lower DPR on mobile for better performance
      >
        <Suspense fallback={null}>
          {/* Enhanced Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1.5} 
            color="#ffffff"
            castShadow={!isMobile}
            shadow-mapSize-width={isMobile ? 512 : 2048}
            shadow-mapSize-height={isMobile ? 512 : 2048}
          />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4a90e2" />
          <pointLight position={[0, 0, 10]} intensity={0.8} color="#ffffff" />
          {!isMobile && (
            <spotLight
              position={[15, 15, 15]}
              angle={0.3}
              penumbra={1}
              intensity={0.5}
              castShadow
              color="#ffffff"
            />
          )}

          {/* Space background with improved stars */}
          <Stars 
            radius={150} 
            depth={80} 
            count={isMobile ? 2000 : 8000} 
            factor={5} 
            saturation={0} 
            fade 
            speed={0.3}
          />

          {/* Fog for depth */}
          <fog attach="fog" args={['#000000', 30, 100]} />

          {/* Space Station GLTF Model */}
          <SpaceStationModel progress={scrollProgress} />

          {/* Repair Drones - GLTF models navigating around the station */}
          {repairDrones.map((drone, index) => (
            <DroneModel
              key={index}
              startPosition={drone.start}
              targetPosition={drone.target}
              appearProgress={drone.appearProgress}
              currentProgress={scrollProgress}
            />
          ))}

          {/* Camera Controls - disabled rotation on mobile for scrolling */}
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={!isMobile}
            autoRotate={!isMobile && scrollProgress > 0.55}
            autoRotateSpeed={0.8}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            enableDamping
            dampingFactor={0.05}
          />

          {/* Post-processing effects - disabled on mobile for performance */}
          {!isMobile && (
            <EffectComposer>
              <Bloom 
                intensity={0.5}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
              <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={[0.0005, 0.0005]}
              />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>

      {/* Progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Section Title Overlay */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <h1 
          className="text-6xl font-bold text-white mb-4 transition-all duration-500"
          style={{ 
            opacity: scrollProgress < 0.92 ? 1 : 0,
            transform: `scale(${1 + scrollProgress * 0.2})`
          }}
        >
          {sectionInfo.title}
        </h1>
        <p 
          className="text-xl text-gray-300 transition-all duration-500"
          style={{ opacity: scrollProgress < 0.92 ? 0.8 : 0 }}
        >
          {sectionInfo.description}
        </p>
      </div>

      {/* Completion message */}
      {scrollProgress >= 0.92 && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center animate-fade-in">
            <h1 className="text-7xl font-bold text-white mb-6">
              Starlab Station
            </h1>
            <p className="text-2xl text-blue-400 mb-4">
              The Future of Space Exploration
            </p>
            <div className="flex gap-8 justify-center text-sm text-gray-400 mt-8">
              <div>
                <p className="text-3xl font-bold text-white">{Math.round(scrollProgress * 100)}%</p>
                <p>Complete</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{repairDrones.length}</p>
                <p>Repair Drones</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">∞</p>
                <p>Possibilities</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll instruction */}
      {scrollProgress < 0.1 && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 text-center animate-bounce">
          <p className="text-white text-sm mb-2">Scroll to explore</p>
          <svg 
            className="w-6 h-6 mx-auto text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      )}
    </div>
  );
}
