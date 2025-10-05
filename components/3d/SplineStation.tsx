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
      // Station is fully assembled from the start
      const scale = 2.0; // Full scale
      groupRef.current.scale.set(scale, scale, scale);
      
      // Ensure full opacity
      groupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((mat) => {
                if (mat instanceof THREE.MeshStandardMaterial) {
                  mat.transparent = false;
                  mat.opacity = 1;
                }
              });
            } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
              mesh.material.transparent = false;
              mesh.material.opacity = 1;
            }
          }
        }
      });
      
      // Rotate based on scroll progress
      groupRef.current.rotation.y = progress * Math.PI * 2;
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
