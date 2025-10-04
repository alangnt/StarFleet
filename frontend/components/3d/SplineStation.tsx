'use client';

import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface SplineStationProps {
  progress: number; // 0 to 1
}

export default function SplineStation({ progress }: SplineStationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/space-station.gltf');
  
  useEffect(() => {
    if (groupRef.current) {
      // Assembly animation based on scroll progress
      const assemblyProgress = Math.min(progress / 0.55, 1); // Complete assembly by 55%
      
      // Scale up as it assembles (increased from 0.5-1.0 to 1.0-2.0)
      const scale = 1.0 + assemblyProgress * 1.0;
      groupRef.current.scale.set(scale, scale, scale);
      
      // Fade in
      groupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((mat) => {
                if (mat instanceof THREE.MeshStandardMaterial) {
                  mat.transparent = true;
                  mat.opacity = assemblyProgress;
                }
              });
            } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
              mesh.material.transparent = true;
              mesh.material.opacity = assemblyProgress;
            }
          }
        }
      });
      
      // Rotation after assembly complete
      if (progress > 0.55) {
        const rotationProgress = (progress - 0.55) / 0.45;
        groupRef.current.rotation.y = rotationProgress * Math.PI * 2;
      }
    }
  }, [progress, scene]);

  // Enhance materials for better rendering
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.envMapIntensity = 1.5;
                mat.needsUpdate = true;
              }
            });
          } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.envMapIntensity = 1.5;
            mesh.material.needsUpdate = true;
          }
        }
      }
    });
  }, [scene]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

// Preload the model
useGLTF.preload('/space-station.gltf');
