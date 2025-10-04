'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SpaceStation() {
  const stationRef = useRef<THREE.Group>(null);

  // Slow rotation for the entire station
  useFrame(() => {
    if (stationRef.current) {
      stationRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={stationRef}>
      {/* Central Hub - Main spherical module */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          color="#c0c0c0" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>

      {/* Connection rings around the hub */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.1, 16, 32]} />
        <meshStandardMaterial color="#808080" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.8, 0.1, 16, 32]} />
        <meshStandardMaterial color="#808080" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Laboratory Module 1 - Top */}
      <group position={[0, 4, 0]}>
        <mesh>
          <cylinderGeometry args={[0.8, 0.8, 3, 16]} />
          <meshStandardMaterial color="#e0e0e0" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Windows */}
        <mesh position={[0, 0.5, 0.85]}>
          <boxGeometry args={[0.4, 0.3, 0.05]} />
          <meshStandardMaterial color="#4a90e2" emissive="#4a90e2" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, -0.5, 0.85]}>
          <boxGeometry args={[0.4, 0.3, 0.05]} />
          <meshStandardMaterial color="#4a90e2" emissive="#4a90e2" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Laboratory Module 2 - Bottom */}
      <group position={[0, -4, 0]}>
        <mesh>
          <cylinderGeometry args={[0.8, 0.8, 3, 16]} />
          <meshStandardMaterial color="#e0e0e0" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Windows */}
        <mesh position={[0, 0.5, 0.85]}>
          <boxGeometry args={[0.4, 0.3, 0.05]} />
          <meshStandardMaterial color="#4a90e2" emissive="#4a90e2" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Side Module - Left */}
      <group position={[-4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh>
          <cylinderGeometry args={[0.7, 0.7, 2.5, 16]} />
          <meshStandardMaterial color="#d0d0d0" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Antenna */}
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
          <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Side Module - Right */}
      <group position={[4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh>
          <cylinderGeometry args={[0.7, 0.7, 2.5, 16]} />
          <meshStandardMaterial color="#d0d0d0" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Antenna */}
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
          <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Solar Panels - Left Side */}
      <group position={[-6, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.1, 4, 3]} />
          <meshStandardMaterial 
            color="#1a1a4a" 
            emissive="#4169e1" 
            emissiveIntensity={0.2}
            metalness={0.9}
          />
        </mesh>
        {/* Panel grid lines */}
        {[-1.5, -0.5, 0.5, 1.5].map((y, i) => (
          <mesh key={`left-h-${i}`} position={[0.06, y, 0]}>
            <boxGeometry args={[0.02, 0.05, 3]} />
            <meshStandardMaterial color="#000080" />
          </mesh>
        ))}
      </group>

      {/* Solar Panels - Right Side */}
      <group position={[6, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.1, 4, 3]} />
          <meshStandardMaterial 
            color="#1a1a4a" 
            emissive="#4169e1" 
            emissiveIntensity={0.2}
            metalness={0.9}
          />
        </mesh>
        {/* Panel grid lines */}
        {[-1.5, -0.5, 0.5, 1.5].map((y, i) => (
          <mesh key={`right-h-${i}`} position={[0.06, y, 0]}>
            <boxGeometry args={[0.02, 0.05, 3]} />
            <meshStandardMaterial color="#000080" />
          </mesh>
        ))}
      </group>

      {/* Connecting Arms/Trusses */}
      {/* Top to Hub */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.5, 8]} />
        <meshStandardMaterial color="#606060" metalness={0.9} />
      </mesh>
      {/* Bottom to Hub */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.5, 8]} />
        <meshStandardMaterial color="#606060" metalness={0.9} />
      </mesh>
      {/* Left to Hub */}
      <mesh position={[-2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.5, 8]} />
        <meshStandardMaterial color="#606060" metalness={0.9} />
      </mesh>
      {/* Right to Hub */}
      <mesh position={[2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.5, 8]} />
        <meshStandardMaterial color="#606060" metalness={0.9} />
      </mesh>

      {/* Communication Dish */}
      <group position={[0, 0, 3]}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <cylinderGeometry args={[1, 0.5, 0.3, 32]} />
          <meshStandardMaterial color="#d0d0d0" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.3]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Docking Port */}
      <group position={[0, 0, -3]}>
        <mesh>
          <cylinderGeometry args={[0.6, 0.4, 1, 8]} />
          <meshStandardMaterial color="#a0a0a0" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.7, 0]}>
          <torusGeometry args={[0.5, 0.1, 8, 16]} />
          <meshStandardMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Detail lights around the station */}
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#4a90e2" distance={3} />
      <pointLight position={[0, -5, 0]} intensity={0.3} color="#4a90e2" distance={3} />
      <pointLight position={[5, 0, 0]} intensity={0.3} color="#ff6b6b" distance={3} />
      <pointLight position={[-5, 0, 0]} intensity={0.3} color="#ff6b6b" distance={3} />
    </group>
  );
}
