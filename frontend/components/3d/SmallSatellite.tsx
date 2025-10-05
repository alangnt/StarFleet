'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SmallSatelliteProps {
  position: [number, number, number];
  color?: string;
  scale?: number;
}

export default function SmallSatellite({ 
  position, 
  color = '#4a90e2',
  scale = 1
}: SmallSatelliteProps) {
  const satelliteRef = useRef<THREE.Group>(null);
  const solarPanelLeft = useRef<THREE.Mesh>(null);
  const solarPanelRight = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!satelliteRef.current) return;
    
    // Slow rotation
    satelliteRef.current.rotation.y += 0.002;
    
    // Solar panels track the "sun" (main light source)
    const time = state.clock.elapsedTime * 0.5;
    if (solarPanelLeft.current) {
      solarPanelLeft.current.rotation.z = Math.sin(time) * 0.1;
    }
    if (solarPanelRight.current) {
      solarPanelRight.current.rotation.z = Math.sin(time) * 0.1;
    }
  });

  return (
    <group ref={satelliteRef} position={position} scale={scale}>
      {/* Main satellite body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.4, 0.4]} />
        <meshStandardMaterial 
          color="#c0c0c0" 
          metalness={0.9} 
          roughness={0.2}
        />
      </mesh>

      {/* Communication dish */}
      <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 4, 0, 0]} castShadow>
        <coneGeometry args={[0.2, 0.15, 16]} />
        <meshStandardMaterial 
          color="#d0d0d0" 
          metalness={0.8} 
          roughness={0.3}
        />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#606060" metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Left solar panel */}
      <mesh ref={solarPanelLeft} position={[-0.5, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.8, 0.02]} />
        <meshStandardMaterial 
          color="#1a237e" 
          metalness={0.3} 
          roughness={0.4}
        />
      </mesh>

      {/* Right solar panel */}
      <mesh ref={solarPanelRight} position={[0.5, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.8, 0.02]} />
        <meshStandardMaterial 
          color="#1a237e" 
          metalness={0.3} 
          roughness={0.4}
        />
      </mesh>

      {/* Solar panel support arms */}
      <mesh position={[-0.3, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshStandardMaterial color="#404040" metalness={0.9} />
      </mesh>
      <mesh position={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshStandardMaterial color="#404040" metalness={0.9} />
      </mesh>

      {/* Status lights */}
      <mesh position={[0.25, 0, 0.21]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial 
          color="#00ff00" 
          emissive="#00ff00" 
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh position={[0.15, 0, 0.21]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#ff0000" 
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Subtle ambient light from satellite */}
      <pointLight 
        position={[0, 0, 0]} 
        intensity={0.3} 
        color={color}
        distance={1.5}
      />
    </group>
  );
}
