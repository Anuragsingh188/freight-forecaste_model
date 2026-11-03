import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MAJOR_LANES } from '../../services/mockApi';
import { latLngToVector3 } from './Globe';

interface VehicleTokensProps {
  radius?: number;
}

export const VehicleTokens: React.FC<VehicleTokensProps> = ({ radius = 3.2 }) => {
  // Precompute curves for vehicles
  const vehiclePaths = useMemo(() => {
    return MAJOR_LANES.map((lane, idx) => {
      const vStart = latLngToVector3(lane.origin.lat, lane.origin.lng, radius);
      const vEnd = latLngToVector3(lane.destination.lat, lane.destination.lng, radius);
      const dist = vStart.distanceTo(vEnd);
      const arcHeight = Math.min(1.4, Math.max(0.35, dist * 0.28));

      const vMid = new THREE.Vector3()
        .addVectors(vStart, vEnd)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(radius + arcHeight);

      const curve = new THREE.QuadraticBezierCurve3(vStart, vMid, vEnd);
      const speed = lane.mode === 'AIR' ? 0.08 : 0.035;
      const initialT = (idx * 0.23) % 1;

      return {
        lane,
        curve,
        speed,
        initialT,
        type: lane.mode,
      };
    });
  }, [radius]);

  const groupRefs = useRef<THREE.Group[]>([]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    vehiclePaths.forEach((vp, i) => {
      const group = groupRefs.current[i];
      if (!group) return;

      const t = (vp.initialT + elapsed * vp.speed) % 1;
      const pos = vp.curve.getPoint(t);
      const tangent = vp.curve.getTangent(t).normalize();

      group.position.copy(pos);

      // Orient forward along tangent
      const lookTarget = pos.clone().add(tangent);
      group.lookAt(lookTarget);
    });
  });

  return (
    <group>
      {vehiclePaths.map((vp, i) => (
        <group
          key={vp.lane.id}
          ref={(el) => {
            if (el) groupRefs.current[i] = el;
          }}
        >
          {vp.type === 'AIR' ? (
            // Mini 3D Airplane token
            <group scale={0.06}>
              {/* Fuselage */}
              <mesh>
                <cylinderGeometry args={[0.3, 0.4, 2.2, 8]} />
                <meshBasicMaterial color="#60a5fa" />
              </mesh>
              {/* Wings */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[3.2, 0.08, 0.6]} />
                <meshBasicMaterial color="#93c5fd" />
              </mesh>
              {/* Tail fin */}
              <mesh position={[0, 0.5, -0.8]}>
                <boxGeometry args={[0.08, 0.8, 0.5]} />
                <meshBasicMaterial color="#3b82f6" />
              </mesh>
              {/* Glow beacon */}
              <mesh position={[0, 0.8, -0.8]}>
                <sphereGeometry args={[0.15, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </group>
          ) : vp.type === 'ROAD' ? (
            // Mini 3D Freight Hauler token
            <group scale={0.05}>
              <mesh position={[0, 0.2, 0]}>
                <boxGeometry args={[0.5, 0.5, 1.4]} />
                <meshBasicMaterial color="#10b981" />
              </mesh>
              <mesh position={[0, 0.15, 0.8]}>
                <boxGeometry args={[0.48, 0.45, 0.5]} />
                <meshBasicMaterial color="#059669" />
              </mesh>
            </group>
          ) : (
            // Mini 3D Container Vessel token
            <group scale={0.055}>
              {/* Ship Hull */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.55, 0.35, 2.0]} />
                <meshBasicMaterial color="#334155" />
              </mesh>
              {/* Stacked Containers */}
              <mesh position={[0, 0.28, -0.1]}>
                <boxGeometry args={[0.45, 0.3, 1.2]} />
                <meshBasicMaterial color="#e8805a" />
              </mesh>
              {/* Bridge Tower */}
              <mesh position={[0, 0.45, -0.8]}>
                <boxGeometry args={[0.35, 0.45, 0.3]} />
                <meshBasicMaterial color="#f8fafc" />
              </mesh>
              {/* Mast beacon light */}
              <mesh position={[0, 0.75, -0.8]}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshBasicMaterial color="#f59e0b" />
              </mesh>
            </group>
          )}
        </group>
      ))}
    </group>
  );
};
