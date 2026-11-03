import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ContainerDockProps {
  onEnterBooking?: () => void;
  isOpenState?: boolean;
}

export const ContainerDock: React.FC<ContainerDockProps> = ({ isOpenState = false }) => {
  const containerRef = useRef<THREE.Group>(null!);
  const leftDoorRef = useRef<THREE.Group>(null!);
  const rightDoorRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (!containerRef.current) return;
    // Slow float
    containerRef.current.position.y = Math.sin(Date.now() * 0.0015) * 0.08;

    // Door open/close interpolation
    const targetAngle = isOpenState ? 1.8 : 0.0;
    if (leftDoorRef.current) {
      leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        leftDoorRef.current.rotation.y,
        -targetAngle,
        delta * 3.0
      );
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        rightDoorRef.current.rotation.y,
        targetAngle,
        delta * 3.0
      );
    }
  });

  return (
    <group ref={containerRef} position={[0, 0, 0]} scale={1.3}>
      
      {/* Container Outer Shell */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 2.4, 5.0]} />
        <meshStandardMaterial
          color="#1e1e24"
          metalness={0.8}
          roughness={0.3}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe Accents / Ribs */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.41, 2.41, 5.01]} />
        <meshBasicMaterial color="#e8805a" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Container Branding Decal Plate */}
      <mesh position={[1.21, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[3.2, 0.8]} />
        <meshBasicMaterial color="#e8805a" transparent opacity={0.9} />
      </mesh>

      {/* Internal Hologram Portal Light */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.1, 16, 16]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={isOpenState ? 0.75 : 0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Left Door Hinge Group */}
      <group ref={leftDoorRef} position={[-1.2, 0, 2.5]}>
        <mesh position={[0.6, 0, 0]}>
          <boxGeometry args={[1.2, 2.38, 0.08]} />
          <meshStandardMaterial color="#262630" metalness={0.7} roughness={0.4} />
        </mesh>
        <mesh position={[0.6, 0, 0.045]}>
          <boxGeometry args={[1.2, 2.38, 0.01]} />
          <meshBasicMaterial color="#e8805a" wireframe transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Right Door Hinge Group */}
      <group ref={rightDoorRef} position={[1.2, 0, 2.5]}>
        <mesh position={[-0.6, 0, 0]}>
          <boxGeometry args={[1.2, 2.38, 0.08]} />
          <meshStandardMaterial color="#262630" metalness={0.7} roughness={0.4} />
        </mesh>
        <mesh position={[-0.6, 0, 0.045]}>
          <boxGeometry args={[1.2, 2.38, 0.01]} />
          <meshBasicMaterial color="#e8805a" wireframe transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Corner Castings (ISO standard corners) */}
      {[
        [-1.2, -1.2, -2.5], [1.2, -1.2, -2.5],
        [-1.2, 1.2, -2.5], [1.2, 1.2, -2.5],
        [-1.2, -1.2, 2.5], [1.2, -1.2, 2.5],
        [-1.2, 1.2, 2.5], [1.2, 1.2, 2.5]
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]}>
          <boxGeometry args={[0.22, 0.22, 0.22]} />
          <meshBasicMaterial color="#f8a88a" />
        </mesh>
      ))}

    </group>
  );
};
