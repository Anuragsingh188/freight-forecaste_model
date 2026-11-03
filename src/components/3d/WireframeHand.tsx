import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WireframeHandProps {
  color?: string;
}

export const WireframeHand: React.FC<WireframeHandProps> = ({ color = '#e8805a' }) => {
  const handGroup = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (!handGroup.current) return;
    const t = clock.getElapsedTime();
    // Gentle floating breathing animation matching reference 1
    handGroup.current.position.y = Math.sin(t * 0.8) * 0.12;
    handGroup.current.rotation.z = Math.sin(t * 0.5) * 0.05 - 0.45;
    handGroup.current.rotation.y = Math.cos(t * 0.6) * 0.08 + 0.2;
  });

  return (
    <group ref={handGroup} position={[-0.8, 0.4, 0]} rotation={[0.2, 0.3, -0.45]} scale={1.2}>
      
      {/* Wrist / Forearm */}
      <mesh position={[-1.6, 1.8, 0]} rotation={[0, 0, -0.6]}>
        <cylinderGeometry args={[0.55, 0.7, 2.2, 16, 8, true]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.65} />
      </mesh>

      {/* Palm Main Block */}
      <mesh position={[-0.3, 0.4, 0]}>
        <boxGeometry args={[1.3, 1.2, 0.35, 6, 6, 4]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.8} />
      </mesh>

      {/* Thumb (Base & Tip) */}
      <group position={[-0.8, 0.1, 0.2]} rotation={[0.4, 0.3, 0.6]}>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.16, 0.2, 0.6, 8, 4]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.75} />
        </mesh>
        <mesh position={[0, -0.7, 0.1]} rotation={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.16, 0.5, 8, 3]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.75} />
        </mesh>
      </group>

      {/* Index Finger */}
      <group position={[0.45, 0.8, 0]} rotation={[0, 0, -0.2]}>
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.14, 0.16, 0.7, 8, 4]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.85} />
        </mesh>
        <mesh position={[0.08, 0.9, -0.1]} rotation={[0.4, 0, -0.15]}>
          <cylinderGeometry args={[0.11, 0.14, 0.6, 8, 3]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.85} />
        </mesh>
        <mesh position={[0.16, 1.3, -0.25]} rotation={[0.6, 0, -0.2]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#ffffff" wireframe={false} />
        </mesh>
      </group>

      {/* Middle Finger */}
      <group position={[0.15, 0.9, 0]} rotation={[0, 0, -0.1]}>
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.14, 0.16, 0.8, 8, 4]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.8} />
        </mesh>
        <mesh position={[0.05, 1.0, -0.1]} rotation={[0.35, 0, -0.05]}>
          <cylinderGeometry args={[0.11, 0.14, 0.65, 8, 3]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Ring Finger */}
      <group position={[-0.15, 0.85, 0]} rotation={[0, 0, 0]}>
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.13, 0.15, 0.7, 8, 4]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.75} />
        </mesh>
        <mesh position={[0.02, 0.9, -0.1]} rotation={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.13, 0.55, 8, 3]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.75} />
        </mesh>
      </group>

      {/* Pinky Finger */}
      <group position={[-0.45, 0.7, 0]} rotation={[0, 0, 0.1]}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.11, 0.13, 0.55, 8, 3]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.7} />
        </mesh>
        <mesh position={[-0.02, 0.7, -0.08]} rotation={[0.25, 0, 0.05]}>
          <cylinderGeometry args={[0.08, 0.11, 0.45, 8, 3]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Digital Pulse Beacon between fingertip and space */}
      <mesh position={[0.62, 1.7, -0.3]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.62, 1.7, -0.3]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshBasicMaterial color="#e8805a" transparent opacity={0.4} wireframe />
      </mesh>

    </group>
  );
};
