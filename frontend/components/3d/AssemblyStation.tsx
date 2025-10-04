'use client';

import { useRef } from 'react';
import * as THREE from 'three';

interface AssemblyStationProps {
  progress: number; // 0 to 1
}

export default function AssemblyStation({ progress }: AssemblyStationProps) {
  const stationRef = useRef<THREE.Group>(null);

  // Helper function to calculate part visibility and position based on progress
  const getPartAnimation = (startProgress: number, endProgress: number, startPos: [number, number, number], endPos: [number, number, number]) => {
    const partProgress = Math.max(0, Math.min(1, (progress - startProgress) / (endProgress - startProgress)));
    const eased = partProgress < 0.5 
      ? 2 * partProgress * partProgress 
      : 1 - Math.pow(-2 * partProgress + 2, 2) / 2; // Ease in-out
    
    return {
      position: [
        startPos[0] + (endPos[0] - startPos[0]) * eased,
        startPos[1] + (endPos[1] - startPos[1]) * eased,
        startPos[2] + (endPos[2] - startPos[2]) * eased,
      ] as [number, number, number],
      opacity: eased,
      scale: 0.5 + eased * 0.5,
    };
  };

  // Central Hub - appears first (0% - 15%)
  const hub = getPartAnimation(0, 0.15, [0, -10, 0], [0, 0, 0]);
  
  // Connection rings (10% - 20%)
  const rings = getPartAnimation(0.1, 0.2, [0, 0, 0], [0, 0, 0]);
  
  // Top Lab Module (15% - 30%)
  const topLab = getPartAnimation(0.15, 0.3, [0, 15, 0], [0, 4, 0]);
  
  // Bottom Lab Module (20% - 35%)
  const bottomLab = getPartAnimation(0.2, 0.35, [0, -15, 0], [0, -4, 0]);
  
  // Left Side Module (30% - 45%)
  const leftModule = getPartAnimation(0.3, 0.45, [-15, 0, 0], [-4, 0, 0]);
  
  // Right Side Module (35% - 50%)
  const rightModule = getPartAnimation(0.35, 0.5, [15, 0, 0], [4, 0, 0]);
  
  // Left Solar Panel (50% - 65%)
  const leftSolar = getPartAnimation(0.5, 0.65, [-20, 0, 0], [-6, 0, 0]);
  
  // Right Solar Panel (55% - 70%)
  const rightSolar = getPartAnimation(0.55, 0.7, [20, 0, 0], [6, 0, 0]);
  
  // Communication Dish (70% - 85%)
  const commDish = getPartAnimation(0.7, 0.85, [0, 0, 15], [0, 0, 3]);
  
  // Docking Port (80% - 95%)
  const dockingPort = getPartAnimation(0.8, 0.95, [0, 0, -15], [0, 0, -3]);
  
  // Connecting trusses (25% - 40%)
  const trusses = getPartAnimation(0.25, 0.4, [0, 0, 0], [0, 0, 0]);

  // Final rotation animation (90% - 100%)
  const finalRotation = Math.max(0, (progress - 0.9) / 0.1);

  return (
    <group ref={stationRef} rotation={[0, finalRotation * Math.PI * 2, 0]}>
      {/* Central Hub */}
      <group position={hub.position} scale={hub.scale}>
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial 
            color="#c0c0c0" 
            metalness={0.8} 
            roughness={0.2}
            transparent
            opacity={hub.opacity}
          />
        </mesh>
      </group>

      {/* Connection rings around the hub */}
      {rings.opacity > 0 && (
        <group position={hub.position} scale={rings.scale}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.8, 0.1, 16, 32]} />
            <meshStandardMaterial color="#808080" metalness={0.9} roughness={0.1} transparent opacity={rings.opacity} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[1.8, 0.1, 16, 32]} />
            <meshStandardMaterial color="#808080" metalness={0.9} roughness={0.1} transparent opacity={rings.opacity} />
          </mesh>
        </group>
      )}

      {/* Laboratory Module 1 - Top */}
      {topLab.opacity > 0 && (
        <group position={topLab.position} scale={topLab.scale}>
          <mesh>
            <cylinderGeometry args={[0.8, 0.8, 3, 16]} />
            <meshStandardMaterial color="#e0e0e0" metalness={0.7} roughness={0.3} transparent opacity={topLab.opacity} />
          </mesh>
          <mesh position={[0, 0.5, 0.85]}>
            <boxGeometry args={[0.4, 0.3, 0.05]} />
            <meshStandardMaterial color="#4a90e2" emissive="#4a90e2" emissiveIntensity={0.5 * topLab.opacity} transparent opacity={topLab.opacity} />
          </mesh>
          <mesh position={[0, -0.5, 0.85]}>
            <boxGeometry args={[0.4, 0.3, 0.05]} />
            <meshStandardMaterial color="#4a90e2" emissive="#4a90e2" emissiveIntensity={0.5 * topLab.opacity} transparent opacity={topLab.opacity} />
          </mesh>
        </group>
      )}

      {/* Laboratory Module 2 - Bottom */}
      {bottomLab.opacity > 0 && (
        <group position={bottomLab.position} scale={bottomLab.scale}>
          <mesh>
            <cylinderGeometry args={[0.8, 0.8, 3, 16]} />
            <meshStandardMaterial color="#e0e0e0" metalness={0.7} roughness={0.3} transparent opacity={bottomLab.opacity} />
          </mesh>
          <mesh position={[0, 0.5, 0.85]}>
            <boxGeometry args={[0.4, 0.3, 0.05]} />
            <meshStandardMaterial color="#4a90e2" emissive="#4a90e2" emissiveIntensity={0.5 * bottomLab.opacity} transparent opacity={bottomLab.opacity} />
          </mesh>
        </group>
      )}

      {/* Side Module - Left */}
      {leftModule.opacity > 0 && (
        <group position={leftModule.position} rotation={[0, 0, Math.PI / 2]} scale={leftModule.scale}>
          <mesh>
            <cylinderGeometry args={[0.7, 0.7, 2.5, 16]} />
            <meshStandardMaterial color="#d0d0d0" metalness={0.7} roughness={0.3} transparent opacity={leftModule.opacity} />
          </mesh>
          <mesh position={[0, 1.8, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
            <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.3 * leftModule.opacity} transparent opacity={leftModule.opacity} />
          </mesh>
        </group>
      )}

      {/* Side Module - Right */}
      {rightModule.opacity > 0 && (
        <group position={rightModule.position} rotation={[0, 0, Math.PI / 2]} scale={rightModule.scale}>
          <mesh>
            <cylinderGeometry args={[0.7, 0.7, 2.5, 16]} />
            <meshStandardMaterial color="#d0d0d0" metalness={0.7} roughness={0.3} transparent opacity={rightModule.opacity} />
          </mesh>
          <mesh position={[0, 1.8, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
            <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.3 * rightModule.opacity} transparent opacity={rightModule.opacity} />
          </mesh>
        </group>
      )}

      {/* Solar Panels - Left Side */}
      {leftSolar.opacity > 0 && (
        <group position={leftSolar.position} scale={leftSolar.scale}>
          <mesh>
            <boxGeometry args={[0.1, 4, 3]} />
            <meshStandardMaterial 
              color="#1a1a4a" 
              emissive="#4169e1" 
              emissiveIntensity={0.2 * leftSolar.opacity}
              metalness={0.9}
              transparent
              opacity={leftSolar.opacity}
            />
          </mesh>
        </group>
      )}

      {/* Solar Panels - Right Side */}
      {rightSolar.opacity > 0 && (
        <group position={rightSolar.position} scale={rightSolar.scale}>
          <mesh>
            <boxGeometry args={[0.1, 4, 3]} />
            <meshStandardMaterial 
              color="#1a1a4a" 
              emissive="#4169e1" 
              emissiveIntensity={0.2 * rightSolar.opacity}
              metalness={0.9}
              transparent
              opacity={rightSolar.opacity}
            />
          </mesh>
        </group>
      )}

      {/* Connecting Arms/Trusses */}
      {trusses.opacity > 0 && (
        <>
          <mesh position={[0, 2, 0]} scale={trusses.scale}>
            <cylinderGeometry args={[0.15, 0.15, 0.5, 8]} />
            <meshStandardMaterial color="#606060" metalness={0.9} transparent opacity={trusses.opacity} />
          </mesh>
          <mesh position={[0, -2, 0]} scale={trusses.scale}>
            <cylinderGeometry args={[0.15, 0.15, 0.5, 8]} />
            <meshStandardMaterial color="#606060" metalness={0.9} transparent opacity={trusses.opacity} />
          </mesh>
          <mesh position={[-2, 0, 0]} rotation={[0, 0, Math.PI / 2]} scale={trusses.scale}>
            <cylinderGeometry args={[0.15, 0.15, 0.5, 8]} />
            <meshStandardMaterial color="#606060" metalness={0.9} transparent opacity={trusses.opacity} />
          </mesh>
          <mesh position={[2, 0, 0]} rotation={[0, 0, Math.PI / 2]} scale={trusses.scale}>
            <cylinderGeometry args={[0.15, 0.15, 0.5, 8]} />
            <meshStandardMaterial color="#606060" metalness={0.9} transparent opacity={trusses.opacity} />
          </mesh>
        </>
      )}

      {/* Communication Dish */}
      {commDish.opacity > 0 && (
        <group position={commDish.position} scale={commDish.scale}>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <cylinderGeometry args={[1, 0.5, 0.3, 32]} />
            <meshStandardMaterial color="#d0d0d0" metalness={0.8} roughness={0.2} transparent opacity={commDish.opacity} />
          </mesh>
          <mesh position={[0, 0, 0.3]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.5 * commDish.opacity} transparent opacity={commDish.opacity} />
          </mesh>
        </group>
      )}

      {/* Docking Port */}
      {dockingPort.opacity > 0 && (
        <group position={dockingPort.position} scale={dockingPort.scale}>
          <mesh>
            <cylinderGeometry args={[0.6, 0.4, 1, 8]} />
            <meshStandardMaterial color="#a0a0a0" metalness={0.7} roughness={0.3} transparent opacity={dockingPort.opacity} />
          </mesh>
          <mesh position={[0, 0.7, 0]}>
            <torusGeometry args={[0.5, 0.1, 8, 16]} />
            <meshStandardMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={0.3 * dockingPort.opacity} transparent opacity={dockingPort.opacity} />
          </mesh>
        </group>
      )}

      {/* Progressive lighting */}
      {hub.opacity > 0.5 && <pointLight position={[0, 0, 0]} intensity={0.5 * hub.opacity} color="#ffffff" />}
      {topLab.opacity > 0.5 && <pointLight position={topLab.position} intensity={0.3 * topLab.opacity} color="#4a90e2" distance={3} />}
      {bottomLab.opacity > 0.5 && <pointLight position={bottomLab.position} intensity={0.3 * bottomLab.opacity} color="#4a90e2" distance={3} />}
    </group>
  );
}
