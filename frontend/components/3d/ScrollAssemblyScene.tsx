'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import SplineStation from './SplineStation';
import ScrollRepairDrone from './ScrollRepairDrone';
import SmallSatellite from './SmallSatellite';
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

  // Define 2 satellites that need repair around the station
  const satellites = [
    { position: [8, 3, 2] as [number, number, number], color: '#4ecdc4', scale: 1.2 },
    { position: [-8, -2, -3] as [number, number, number], color: '#ff6b6b', scale: 1.1 },
  ];

  // Define repair drones - multiple drones navigate to each satellite for repairs
  const repairDrones = [
    // Drones repairing Satellite 1 (cyan)
    { 
      start: [12, 5, 5], 
      target: satellites[0].position,
      color: satellites[0].color,
      speed: 0.08, 
      appearProgress: 0.1 
    },
    { 
      start: [5, 8, -2], 
      target: satellites[0].position,
      color: satellites[0].color,
      speed: 0.09, 
      appearProgress: 0.2 
    },
    { 
      start: [10, -1, 6], 
      target: satellites[0].position,
      color: satellites[0].color,
      speed: 0.07, 
      appearProgress: 0.3 
    },
    { 
      start: [6, 6, -4], 
      target: satellites[0].position,
      color: satellites[0].color,
      speed: 0.085, 
      appearProgress: 0.4 
    },
    // Drones repairing Satellite 2 (red)
    { 
      start: [-12, -5, -6], 
      target: satellites[1].position,
      color: satellites[1].color,
      speed: 0.075, 
      appearProgress: 0.5 
    },
    { 
      start: [-6, -8, 3], 
      target: satellites[1].position,
      color: satellites[1].color,
      speed: 0.095, 
      appearProgress: 0.6 
    },
    { 
      start: [-10, 2, -7], 
      target: satellites[1].position,
      color: satellites[1].color,
      speed: 0.08, 
      appearProgress: 0.7 
    },
    { 
      start: [-5, -6, 5], 
      target: satellites[1].position,
      color: satellites[1].color, 
      speed: 0.09, 
      appearProgress: 0.8 
    },
  ];  // Get section information based on scroll progress
  const getSectionInfo = () => {
    if (scrollProgress < 0.1) {
      return { title: "The Core", description: "Every great station starts with a strong foundation" };
    } else if (scrollProgress < 0.2) {
      return { title: "Command Module", description: "State-of-the-art control systems coming online" };
    } else if (scrollProgress < 0.3) {
      return { title: "Research Labs", description: "Cutting-edge scientific facilities" };
    } else if (scrollProgress < 0.4) {
      return { title: "Power Systems", description: "Advanced solar arrays generating clean energy" };
    } else if (scrollProgress < 0.52) {
      return { title: "Communications", description: "Staying connected across the cosmos" };
    } else if (scrollProgress < 0.9) {
      return { title: "Station Complete", description: "Deploying maintenance drone fleet" };
    } else {
      return { title: "Starlab Station", description: "Fully operational - Autonomous repair systems active" };
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
          antialias: true, 
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: 3, // ACESFilmicToneMapping
          toneMappingExposure: 1.2
        }}
        shadows
        dpr={[1, 2]} // Use device pixel ratio for sharper rendering
      >
        <Suspense fallback={null}>
          {/* Enhanced Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1.5} 
            color="#ffffff"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4a90e2" />
          <pointLight position={[0, 0, 10]} intensity={0.8} color="#ffffff" />
          <spotLight
            position={[15, 15, 15]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            castShadow
            color="#ffffff"
          />

          {/* Space background with improved stars */}
          <Stars 
            radius={150} 
            depth={80} 
            count={8000} 
            factor={5} 
            saturation={0} 
            fade 
            speed={0.3}
          />

          {/* Fog for depth */}
          <fog attach="fog" args={['#000000', 30, 100]} />

          {/* Spline Space Station Model with scroll progress */}
          <SplineStation progress={scrollProgress} />

          {/* Small Satellites around the station */}
          {satellites.map((satellite, index) => (
            <SmallSatellite
              key={index}
              position={satellite.position}
              color={satellite.color}
              scale={satellite.scale}
            />
          ))}

          {/* Repair Drones - appear progressively and navigate to satellites */}
          {repairDrones.map((drone, index) => (
            <ScrollRepairDrone
              key={index}
              startPosition={drone.start as [number, number, number]}
              targetPosition={drone.target as [number, number, number]}
              color={drone.color}
              speed={drone.speed}
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

          {/* Post-processing effects */}
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
                <p>Assembly Complete</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">7</p>
                <p>Modules</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">9</p>
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
          <p className="text-white text-sm mb-2">Scroll to repair</p>
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
