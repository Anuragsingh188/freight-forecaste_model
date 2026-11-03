import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ExtrudedChart3DProps {
  timeframe: '7d' | '30d' | '90d';
}

export const ExtrudedChart3D: React.FC<ExtrudedChart3DProps> = ({ timeframe }) => {
  const groupRef = useRef<THREE.Group>(null!);

  const bars = React.useMemo(() => {
    const rows = 4;
    const cols = timeframe === '7d' ? 7 : timeframe === '30d' ? 10 : 12;
    const items = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Height formula simulating freight rate volatility terrain
        const freqX = c * 0.45;
        const freqY = r * 0.8;
        const height = Math.max(
          0.3,
          Math.sin(freqX + freqY) * 0.8 + Math.cos(freqX * 0.7) * 0.6 + 1.2
        );
        items.push({
          x: (c - cols / 2) * 0.4,
          z: (r - rows / 2) * 0.45,
          height,
          rate: Math.round(1800 + height * 850),
          isPeak: height > 2.0,
        });
      }
    }
    return items;
  }, [timeframe]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    // Gentle floating yaw
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* 3D Base grid plate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[6.5, 3.5]} />
        <meshBasicMaterial color="#0e0f14" />
      </mesh>

      {/* Wireframe border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
        <planeGeometry args={[6.5, 3.5]} />
        <meshBasicMaterial color="#e8805a" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Extruded Bars */}
      {bars.map((bar, i) => (
        <group key={i} position={[bar.x, bar.height / 2, bar.z]}>
          <mesh>
            <boxGeometry args={[0.26, bar.height, 0.26]} />
            <meshStandardMaterial
              color={bar.isPeak ? '#f59e0b' : '#e8805a'}
              metalness={0.7}
              roughness={0.25}
              wireframe={false}
              transparent
              opacity={0.88}
            />
          </mesh>
          {/* Wireframe edge cap */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.262, bar.height + 0.002, 0.262]} />
            <meshBasicMaterial
              color={bar.isPeak ? '#ffffff' : '#f08e6c'}
              wireframe
              transparent
              opacity={0.4}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
