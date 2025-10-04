'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import SplineStation from './SplineStation';
import ScrollRepairDrone from './ScrollRepairDrone';
import { Suspense, useRef } from 'react';

interface ScrollAssemblySceneProps {
  scrollProgress: number;
}

export default function ScrollAssemblyScene({ scrollProgress }: ScrollAssemblySceneProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Define repair drone configurations - appear after station is complete
  const repairDrones = [
    // Drone 1: Patrols central hub
    { 
      start: [5, 3, 5], 
      target: [1, 0.5, 1], 
      color: '#ff6b6b', 
      speed: 0.08, 
      appearProgress: 0.56 
    },
    // Drone 2: Patrols top lab module
    { 
      start: [-4, 8, 3], 
      target: [-1, 4.5, 1], 
      color: '#4ecdc4', 
      speed: 0.09, 
      appearProgress: 0.60 
    },
    // Drone 3: Patrols bottom module
    { 
      start: [6, -6, -2], 
      target: [1, -4.2, -1], 
      color: '#ffe66d', 
      speed: 0.07, 
      appearProgress: 0.64 
    },
    // Drone 4: Inspects left side module
    { 
      start: [-10, 2, 4], 
      target: [-4.5, 0.5, 0], 
      color: '#95e1d3', 
      speed: 0.085, 
      appearProgress: 0.68 
    },
    // Drone 5: Inspects right side module
    { 
      start: [10, -3, -3], 
      target: [4.5, -0.5, 0], 
      color: '#a8e6cf', 
      speed: 0.075, 
      appearProgress: 0.72 
    },
    // Drone 6: Patrols left solar panel
    { 
      start: [-12, 4, 2], 
      target: [-6.5, 2, 0], 
      color: '#ff6b9d', 
      speed: 0.095, 
      appearProgress: 0.76 
    },
    // Drone 7: Patrols right solar panel
    { 
      start: [12, -2, 5], 
      target: [6.5, -1, 0], 
      color: '#c7ceea', 
      speed: 0.08, 
      appearProgress: 0.80 
    },
    // Drone 8: Inspects communication dish
    { 
      start: [3, 6, 10], 
      target: [0.5, 1, 4], 
      color: '#ffd93d', 
      speed: 0.09, 
      appearProgress: 0.84 
    },
    // Drone 9: Checks docking port
    { 
      start: [-4, -4, -10], 
      target: [-0.5, -1, -3.5], 
      color: '#6bcf7f', 
      speed: 0.085, 
      appearProgress: 0.88 
    },
  ];

  // Get section information based on scroll progress
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
    <div ref={canvasRef} className="fixed inset-0 w-full h-screen bg-gradient-to-b from-black via-gray-900 to-black">
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

          {/* Repair Drones - appear progressively */}
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

          {/* Camera Controls - less aggressive */}
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={scrollProgress > 0.55}
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
          <p className="text-white text-sm mb-2">Scroll to build</p>
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
