'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import AssemblyStation from './AssemblyStation';
import { Suspense, useRef } from 'react';

interface ScrollAssemblySceneProps {
  scrollProgress: number;
}

export default function ScrollAssemblyScene({ scrollProgress }: ScrollAssemblySceneProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Get section information based on scroll progress
  const getSectionInfo = () => {
    if (scrollProgress < 0.15) {
      return { title: "The Core", description: "Every great station starts with a strong foundation" };
    } else if (scrollProgress < 0.3) {
      return { title: "Command Module", description: "State-of-the-art control systems coming online" };
    } else if (scrollProgress < 0.45) {
      return { title: "Research Labs", description: "Cutting-edge scientific facilities" };
    } else if (scrollProgress < 0.6) {
      return { title: "Habitat Modules", description: "Comfortable living quarters for the crew" };
    } else if (scrollProgress < 0.75) {
      return { title: "Power Systems", description: "Advanced solar arrays generating clean energy" };
    } else if (scrollProgress < 0.9) {
      return { title: "Communications", description: "Staying connected across the cosmos" };
    } else {
      return { title: "Starlab Station", description: "Fully operational and ready for humanity's future" };
    }
  };

  const sectionInfo = getSectionInfo();

  return (
    <div ref={canvasRef} className="fixed inset-0 w-full h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Canvas
        camera={{ position: [12, 8, 12], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={0.4} color="#4a90e2" />
          <pointLight position={[0, 0, 10]} intensity={0.6} color="#ffffff" />

          {/* Space background */}
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={0.3}
          />

          {/* Assembly Station with scroll progress */}
          <AssemblyStation progress={scrollProgress} />

          {/* Camera Controls - less aggressive */}
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={scrollProgress > 0.9}
            autoRotateSpeed={1}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
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
            opacity: scrollProgress < 0.95 ? 1 : 0,
            transform: `scale(${1 + scrollProgress * 0.2})`
          }}
        >
          {sectionInfo.title}
        </h1>
        <p 
          className="text-xl text-gray-300 transition-all duration-500"
          style={{ opacity: scrollProgress < 0.95 ? 0.8 : 0 }}
        >
          {sectionInfo.description}
        </p>
      </div>

      {/* Completion message */}
      {scrollProgress >= 0.95 && (
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
