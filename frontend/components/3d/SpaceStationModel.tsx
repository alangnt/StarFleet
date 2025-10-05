'use client';

import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpaceStationModelProps {
  progress: number;
}

export default function SpaceStationModel({ progress }: SpaceStationModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the space station GLTF model
  const { scene } = useGLTF('/space-station.gltf');

  useFrame(() => {
    if (groupRef.current) {
      // Gentle rotation based on scroll progress
      groupRef.current.rotation.y = progress * Math.PI * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive 
        object={scene} 
        scale={2}
        position={[0, 0, 0]}
      />
    </group>
  );
}

// Preload the model
useGLTF.preload('/space-station.gltf');
