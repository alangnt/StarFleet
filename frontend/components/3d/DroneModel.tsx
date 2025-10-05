'use client';

import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DroneModelProps {
  startPosition: [number, number, number];
  targetPosition: [number, number, number];
  appearProgress: number;
  currentProgress: number;
}

export default function DroneModel({ 
  startPosition, 
  targetPosition, 
  appearProgress,
  currentProgress
}: DroneModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the drone GLTF model
  const { scene } = useGLTF('/drone.gltf');

  // Calculate visibility
  const visibility = currentProgress >= appearProgress ? 1 : 0;

  // Create path curve from start to target
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(...startPosition),
    new THREE.Vector3(
      (startPosition[0] + targetPosition[0]) / 2,
      (startPosition[1] + targetPosition[1]) / 2 + 2,
      (startPosition[2] + targetPosition[2]) / 2
    ),
    new THREE.Vector3(...targetPosition),
  ]);

  useFrame(() => {
    if (!groupRef.current || visibility === 0) return;

    // Base movement purely on scroll progress
    const progressRange = 0.4;
    const localProgress = Math.max(0, Math.min(1, (currentProgress - appearProgress) / progressRange));
    
    const t = Math.min(0.99, Math.max(0.01, localProgress));
    
    const position = curve.getPointAt(t);
    groupRef.current.position.copy(position);

    // Look at the direction of movement
    const tangent = curve.getTangentAt(t);
    const lookAtPoint = position.clone().add(tangent);
    groupRef.current.lookAt(lookAtPoint);
  });

  if (visibility === 0) return null;

  return (
    <group ref={groupRef} scale={0.3}>
      <primitive object={scene.clone()} />
    </group>
  );
}

// Preload the model
useGLTF.preload('/drone.gltf');
