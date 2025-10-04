'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ScrollRepairDroneProps {
  startPosition: [number, number, number];
  targetPosition: [number, number, number];
  color?: string;
  speed?: number;
  appearProgress: number; // When the drone should appear (0-1)
  currentProgress: number; // Current scroll progress (0-1)
}

export default function ScrollRepairDrone({ 
  startPosition, 
  targetPosition, 
  color = '#ff6b6b',
  speed = 0.5,
  appearProgress,
  currentProgress
}: ScrollRepairDroneProps) {
  const droneRef = useRef<THREE.Group>(null);
  const propeller1Ref = useRef<THREE.Mesh>(null);
  const propeller2Ref = useRef<THREE.Mesh>(null);
  const propeller3Ref = useRef<THREE.Mesh>(null);
  const propeller4Ref = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Calculate if drone should be visible and its opacity
  const visibility = useMemo(() => {
    const fadeInRange = 0.05; // 5% of scroll for fade in
    if (currentProgress < appearProgress) return 0;
    if (currentProgress < appearProgress + fadeInRange) {
      return (currentProgress - appearProgress) / fadeInRange;
    }
    return 1;
  }, [currentProgress, appearProgress]);

  // Create path curve from start to target
  const curve = useMemo(() => {
    const midPoint1 = new THREE.Vector3(
      (startPosition[0] + targetPosition[0]) / 2 + Math.random() * 3 - 1.5,
      (startPosition[1] + targetPosition[1]) / 2 + Math.random() * 3 - 1.5,
      (startPosition[2] + targetPosition[2]) / 2 + Math.random() * 3 - 1.5
    );
    const midPoint2 = new THREE.Vector3(
      (startPosition[0] + targetPosition[0]) / 2 + Math.random() * 3 - 1.5,
      (startPosition[1] + targetPosition[1]) / 2 + Math.random() * 3 - 1.5,
      (startPosition[2] + targetPosition[2]) / 2 + Math.random() * 3 - 1.5
    );
    
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(...startPosition),
      midPoint1,
      midPoint2,
      new THREE.Vector3(...targetPosition),
    ]);
  }, [startPosition, targetPosition]);

  useFrame((state) => {
    if (!droneRef.current || visibility === 0) return;

    // Use clock time directly instead of accumulating delta - this makes movement consistent
    const elapsedTime = state.clock.elapsedTime * speed * 0.05;
    
    // Move along the curve (loop back and forth) - much slower oscillation
    const t = (Math.sin(elapsedTime * 0.1) + 1) / 4;
    const position = curve.getPointAt(t);
    droneRef.current.position.copy(position);

    // Look at the direction of movement
    const tangent = curve.getTangentAt(t);
    const lookAtPoint = position.clone().add(tangent);
    droneRef.current.lookAt(lookAtPoint);

    // Rotate propellers
    const propellerSpeed = 0.5;
    if (propeller1Ref.current) propeller1Ref.current.rotation.y += propellerSpeed;
    if (propeller2Ref.current) propeller2Ref.current.rotation.y += propellerSpeed;
    if (propeller3Ref.current) propeller3Ref.current.rotation.y += propellerSpeed;
    if (propeller4Ref.current) propeller4Ref.current.rotation.y += propellerSpeed;

    // Pulse the light
    if (lightRef.current) {
      lightRef.current.intensity = (0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3) * visibility;
    }

    // Slight bobbing motion
    droneRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.01;
  });

  if (visibility === 0) return null;

  return (
    <group ref={droneRef} scale={visibility}>
      {/* Main body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.2, 0.3]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.9} 
          roughness={0.15}
          emissive={color}
          emissiveIntensity={0.3 * visibility}
          transparent
          opacity={visibility}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Camera/Eye in front */}
      <mesh position={[0, 0, 0.18]} castShadow>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial 
          color="#4a90e2" 
          emissive="#4a90e2" 
          emissiveIntensity={1.2 * visibility}
          metalness={0.95}
          roughness={0.05}
          transparent
          opacity={visibility}
        />
      </mesh>

      {/* Propeller arms */}
      <mesh position={[-0.2, 0, 0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#404040" metalness={0.9} transparent opacity={visibility} />
      </mesh>
      <mesh position={[0.2, 0, 0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#404040" metalness={0.9} transparent opacity={visibility} />
      </mesh>
      <mesh position={[-0.2, 0, -0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#404040" metalness={0.9} transparent opacity={visibility} />
      </mesh>
      <mesh position={[0.2, 0, -0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#404040" metalness={0.9} transparent opacity={visibility} />
      </mesh>

      {/* Propellers */}
      <mesh ref={propeller1Ref} position={[-0.2, 0.15, 0.2]}>
        <boxGeometry args={[0.25, 0.02, 0.05]} />
        <meshStandardMaterial color="#202020" metalness={0.7} transparent opacity={visibility} />
      </mesh>
      <mesh ref={propeller2Ref} position={[0.2, 0.15, 0.2]}>
        <boxGeometry args={[0.25, 0.02, 0.05]} />
        <meshStandardMaterial color="#202020" metalness={0.7} transparent opacity={visibility} />
      </mesh>
      <mesh ref={propeller3Ref} position={[-0.2, 0.15, -0.2]}>
        <boxGeometry args={[0.25, 0.02, 0.05]} />
        <meshStandardMaterial color="#202020" metalness={0.7} transparent opacity={visibility} />
      </mesh>
      <mesh ref={propeller4Ref} position={[0.2, 0.15, -0.2]}>
        <boxGeometry args={[0.25, 0.02, 0.05]} />
        <meshStandardMaterial color="#202020" metalness={0.7} transparent opacity={visibility} />
      </mesh>

      {/* Tool/Repair arm */}
      <group position={[0, -0.15, 0]}>
        <mesh>
          <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
          <meshStandardMaterial color="#606060" metalness={0.8} transparent opacity={visibility} />
        </mesh>
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial 
            color="#ffcc00" 
            emissive="#ffcc00" 
            emissiveIntensity={0.3 * visibility}
            metalness={0.7}
            transparent
            opacity={visibility}
          />
        </mesh>
      </group>

      {/* Antenna */}
      <mesh position={[0, 0.15, -0.1]}>
        <cylinderGeometry args={[0.01, 0.01, 0.15, 6]} />
        <meshStandardMaterial color="#808080" metalness={0.8} transparent opacity={visibility} />
      </mesh>
      <mesh position={[0, 0.23, -0.1]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial 
          color="#00ff00" 
          emissive="#00ff00" 
          emissiveIntensity={0.5 * visibility}
          transparent
          opacity={visibility}
        />
      </mesh>

      {/* Drone light */}
      <pointLight 
        ref={lightRef}
        position={[0, 0, 0.2]} 
        intensity={0.5 * visibility} 
        color={color}
        distance={2}
      />
    </group>
  );
}
