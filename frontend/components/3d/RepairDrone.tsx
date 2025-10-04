'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RepairDroneProps {
  startPosition: [number, number, number];
  targetPosition: [number, number, number];
  color?: string;
  speed?: number;
  delay?: number;
}

export default function RepairDrone({ 
  startPosition, 
  targetPosition, 
  color = '#ff6b6b',
  speed = 0.5,
  delay = 0
}: RepairDroneProps) {
  const droneRef = useRef<THREE.Group>(null);
  const propeller1Ref = useRef<THREE.Mesh>(null);
  const propeller2Ref = useRef<THREE.Mesh>(null);
  const propeller3Ref = useRef<THREE.Mesh>(null);
  const propeller4Ref = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);
  const lightRef = useRef<THREE.PointLight>(null);

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

  useFrame((state, delta) => {
    if (!droneRef.current) return;

    timeRef.current += delta * speed;
    
    // Apply delay before movement starts
    const effectiveTime = Math.max(0, timeRef.current - delay);
    
    // Move along the curve (loop back and forth)
    const t = (Math.sin(effectiveTime * 0.3) + 1) / 2; // Oscillate between 0 and 1
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
      lightRef.current.intensity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
    }

    // Slight bobbing motion
    droneRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + delay) * 0.01;
  });

  return (
    <group ref={droneRef}>
      {/* Main body - cube with chamfered edges */}
      <mesh>
        <boxGeometry args={[0.3, 0.2, 0.3]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Camera/Eye in front */}
      <mesh position={[0, 0, 0.18]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial 
          color="#4a90e2" 
          emissive="#4a90e2" 
          emissiveIntensity={0.8}
          metalness={0.9}
        />
      </mesh>

      {/* Propeller arms */}
      {/* Front-left arm */}
      <mesh position={[-0.2, 0, 0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#404040" metalness={0.9} />
      </mesh>
      {/* Front-right arm */}
      <mesh position={[0.2, 0, 0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#404040" metalness={0.9} />
      </mesh>
      {/* Back-left arm */}
      <mesh position={[-0.2, 0, -0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#404040" metalness={0.9} />
      </mesh>
      {/* Back-right arm */}
      <mesh position={[0.2, 0, -0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#404040" metalness={0.9} />
      </mesh>

      {/* Propellers */}
      {/* Front-left propeller */}
      <mesh ref={propeller1Ref} position={[-0.2, 0.15, 0.2]}>
        <boxGeometry args={[0.25, 0.02, 0.05]} />
        <meshStandardMaterial color="#202020" metalness={0.7} />
      </mesh>
      {/* Front-right propeller */}
      <mesh ref={propeller2Ref} position={[0.2, 0.15, 0.2]}>
        <boxGeometry args={[0.25, 0.02, 0.05]} />
        <meshStandardMaterial color="#202020" metalness={0.7} />
      </mesh>
      {/* Back-left propeller */}
      <mesh ref={propeller3Ref} position={[-0.2, 0.15, -0.2]}>
        <boxGeometry args={[0.25, 0.02, 0.05]} />
        <meshStandardMaterial color="#202020" metalness={0.7} />
      </mesh>
      {/* Back-right propeller */}
      <mesh ref={propeller4Ref} position={[0.2, 0.15, -0.2]}>
        <boxGeometry args={[0.25, 0.02, 0.05]} />
        <meshStandardMaterial color="#202020" metalness={0.7} />
      </mesh>

      {/* Tool/Repair arm extending from bottom */}
      <group position={[0, -0.15, 0]}>
        <mesh>
          <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
          <meshStandardMaterial color="#606060" metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial 
            color="#ffcc00" 
            emissive="#ffcc00" 
            emissiveIntensity={0.3}
            metalness={0.7}
          />
        </mesh>
      </group>

      {/* Small antenna */}
      <mesh position={[0, 0.15, -0.1]}>
        <cylinderGeometry args={[0.01, 0.01, 0.15, 6]} />
        <meshStandardMaterial color="#808080" metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.23, -0.1]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial 
          color="#00ff00" 
          emissive="#00ff00" 
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Drone light */}
      <pointLight 
        ref={lightRef}
        position={[0, 0, 0.2]} 
        intensity={0.5} 
        color={color}
        distance={2}
      />
    </group>
  );
}
