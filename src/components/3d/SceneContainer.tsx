import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Starfield } from './Starfield';
import { Globe } from './Globe';
import { ShippingLanes } from './ShippingLanes';
import { VehicleTokens } from './VehicleTokens';
import { ExtrudedChart3D } from './ExtrudedChart3D';
import { ContainerDock } from './ContainerDock';
import { WireframeHand } from './WireframeHand';

interface SceneContainerProps {
  mode?: 'LANDING' | 'LOGIN' | 'MINI_GLOBE';
  activeSection?: number; // 0..4 for landing
  highlightedLaneId?: string;
  timeframe?: '7d' | '30d' | '90d';
}

// Camera Director that dynamically interpolates camera position based on scroll section
const CameraRig: React.FC<{
  mode: string;
  activeSection: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}> = ({ mode, activeSection, mouse }) => {
  const { camera } = useThree();

  useFrame((_, delta) => {
    let targetX = mouse.current.x * 0.4;
    let targetY = mouse.current.y * 0.4;
    let targetZ = 8.5;
    let lookTarget = new THREE.Vector3(0, 0, 0);

    if (mode === 'LOGIN') {
      // Shift camera to focus on hand on the left
      targetX = -1.2 + mouse.current.x * 0.2;
      targetY = 0.2 + mouse.current.y * 0.2;
      targetZ = 5.2;
      lookTarget.set(-0.8, 0.4, 0);
    } else if (mode === 'MINI_GLOBE') {
      targetX = mouse.current.x * 0.2;
      targetY = mouse.current.y * 0.2;
      targetZ = 7.0;
    } else {
      // LANDING SECTIONS
      switch (activeSection) {
        case 0: // Hero: broad overview
          targetX = mouse.current.x * 0.8;
          targetY = mouse.current.y * 0.6;
          targetZ = 8.8;
          break;
        case 1: // Demand: closer view of Eurasian corridor
          targetX = -0.5 + mouse.current.x * 0.5;
          targetY = 0.4 + mouse.current.y * 0.4;
          targetZ = 6.8;
          lookTarget.set(-0.2, 0.2, 0);
          break;
        case 2: // Rates: shift slightly left to give room to extruded chart
          targetX = 1.2 + mouse.current.x * 0.4;
          targetY = 0.8 + mouse.current.y * 0.3;
          targetZ = 7.2;
          lookTarget.set(0.5, 0.2, 0);
          break;
        case 3: // Risk: overview of ocean chokepoints
          targetX = -0.8 + mouse.current.x * 0.4;
          targetY = -0.4 + mouse.current.y * 0.3;
          targetZ = 6.5;
          break;
        case 4: // Book: zoom straight to container
          targetX = 0;
          targetY = 0;
          targetZ = 5.6;
          lookTarget.set(0, 0, 0);
          break;
      }
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 3.0);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 3.0);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 3.0);
    camera.lookAt(lookTarget);
  });

  return null;
};

export const SceneContainer: React.FC<SceneContainerProps> = ({
  mode = 'LANDING',
  activeSection = 0,
  highlightedLaneId,
  timeframe = '30d',
}) => {
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]} // Crisp rendering on high-DPI displays while maintaining 60fps
      >
        <color attach="background" args={['#0b0b0d']} />

        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-6, -4, -4]} intensity={0.8} color="#e8805a" />
        <pointLight position={[0, 4, 2]} intensity={1.2} color="#3b82f6" />

        {/* Camera interpolation rig */}
        <CameraRig mode={mode} activeSection={activeSection} mouse={mouse} />

        {/* Ambient starfield */}
        <Starfield mouse={mouse} />

        {/* Page / Mode-specific 3D Elements */}
        {mode === 'LOGIN' ? (
          <WireframeHand />
        ) : mode === 'MINI_GLOBE' ? (
          <>
            <Globe radius={2.2} activeSection={0} />
            <ShippingLanes radius={2.2} />
            <VehicleTokens radius={2.2} />
          </>
        ) : (
          <>
            {/* Landing sections 0, 1, 2, 3 show Globe */}
            {activeSection !== 4 && (
              <>
                <Globe radius={3.2} activeSection={activeSection} />
                <ShippingLanes
                  radius={3.2}
                  highlightedLaneId={highlightedLaneId}
                  activeSection={activeSection}
                />
                <VehicleTokens radius={3.2} />
              </>
            )}

            {/* In Section 2: Show Extruded Terrain alongside */}
            {activeSection === 2 && (
              <group position={[1.8, 0, 1.2]} scale={0.75}>
                <ExtrudedChart3D timeframe={timeframe} />
              </group>
            )}

            {/* In Section 4: Show Docking Container */}
            {activeSection === 4 && (
              <ContainerDock isOpenState={true} />
            )}
          </>
        )}
      </Canvas>
    </div>
  );
};
