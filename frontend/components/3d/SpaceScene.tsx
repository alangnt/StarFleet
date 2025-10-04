'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import SpaceStation from './SpaceStation';
import RepairDrone from './RepairDrone';
import { Suspense } from 'react';

export default function SpaceScene() {
  // Define repair points around the station
  const repairPoints = [
    { start: [8, 3, 2], target: [0, 4.5, 0], color: '#ff6b6b', speed: 0.4, delay: 0 },      // Red drone - top module
    { start: [-8, 2, -3], target: [0, -4.5, 0], color: '#4ecdc4', speed: 0.5, delay: 0.5 }, // Cyan drone - bottom module
    { start: [3, -8, 4], target: [-4, 0, 0], color: '#ffe66d', speed: 0.45, delay: 1 },     // Yellow drone - left module
    { start: [-4, 8, -2], target: [4, 0, 0], color: '#95e1d3', speed: 0.4, delay: 1.5 },    // Green drone - right module
    { start: [5, 5, -8], target: [-6, 0, 0], color: '#ff6b9d', speed: 0.5, delay: 2 },      // Pink drone - left solar panel
    { start: [-5, -5, 8], target: [6, 0, 0], color: '#c7ceea', speed: 0.45, delay: 2.5 },   // Purple drone - right solar panel
  ];

  return (
    <div className="w-full h-screen bg-black">
      <Canvas
        camera={{ position: [15, 10, 15], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#4a90e2" />
          <pointLight position={[0, 0, 0]} intensity={0.5} color="#ffffff" />

          {/* Space background */}
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={0.5}
          />

          {/* Space Station */}
          <SpaceStation />

          {/* Repair Drones */}
          {repairPoints.map((point, index) => (
            <RepairDrone
              key={index}
              startPosition={point.start as [number, number, number]}
              targetPosition={point.target as [number, number, number]}
              color={point.color}
              speed={point.speed}
              delay={point.delay}
            />
          ))}

          {/* Camera Controls */}
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={8}
            maxDistance={40}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 p-6 text-white">
        <h1 className="text-4xl font-bold mb-2">Starlab Space Station</h1>
        <p className="text-lg opacity-80">Autonomous Repair Operations</p>
        <div className="mt-4 space-y-1 text-sm opacity-70">
          <p>🤖 {repairPoints.length} Repair Drones Active</p>
          <p>🔧 Maintenance Mode: Automated</p>
          <p>🌟 Status: Operational</p>
        </div>
      </div>

      {/* Controls Info */}
      <div className="absolute bottom-0 right-0 p-6 text-white text-sm opacity-70">
        <p>🖱️ Left Click + Drag: Rotate</p>
        <p>🖱️ Right Click + Drag: Pan</p>
        <p>🖱️ Scroll: Zoom</p>
      </div>
    </div>
  );
}
