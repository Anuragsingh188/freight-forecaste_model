import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MAJOR_LANES } from '../../services/mockApi';
import { latLngToVector3 } from './Globe';

interface ShippingLanesProps {
  radius?: number;
  highlightedLaneId?: string;
  activeSection?: number;
}

export const ShippingLanes: React.FC<ShippingLanesProps> = ({
  radius = 3.2,
  highlightedLaneId,
}) => {
  const lanesGroupRef = useRef<THREE.Group>(null!);

  // Build curved 3D Bézier arcs for all major trade lanes
  const laneObjects = useMemo(() => {
    return MAJOR_LANES.map((lane) => {
      const vStart = latLngToVector3(lane.origin.lat, lane.origin.lng, radius);
      const vEnd = latLngToVector3(lane.destination.lat, lane.destination.lng, radius);

      // Distance on chord
      const distance = vStart.distanceTo(vEnd);
      const arcHeight = Math.min(1.4, Math.max(0.35, distance * 0.28));

      // Midpoint projected outward along normal
      const vMid = new THREE.Vector3()
        .addVectors(vStart, vEnd)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(radius + arcHeight);

      const curve = new THREE.QuadraticBezierCurve3(vStart, vMid, vEnd);
      const points = curve.getPoints(48);

      // Color mapping
      let colorHex = 0xe8805a; // warm copper
      if (lane.mode === 'AIR') colorHex = 0x60a5fa; // electric blue
      else if (lane.demandIndex > 85) colorHex = 0xf97316; // glowing flame orange
      else if (lane.demandIndex < 70) colorHex = 0x1fb573; // stable green

      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      // Faint base line
      const baseMat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.35,
      });
      const baseLine = new THREE.Line(geometry, baseMat);

      // Pulsing dashed line
      const dashedMat = new THREE.LineDashedMaterial({
        color: colorHex,
        dashSize: 0.25,
        gapSize: 0.2,
        transparent: true,
        opacity: 0.85,
      });
      const dashedLine = new THREE.Line(geometry.clone(), dashedMat);
      dashedLine.computeLineDistances();

      return {
        lane,
        baseLine,
        dashedLine,
        dashedMat,
      };
    });
  }, [radius]);

  useFrame((_, delta) => {
    laneObjects.forEach(({ lane, dashedMat, dashedLine }) => {
      const isSelected = highlightedLaneId === lane.id;
      // In Three.js LineDashedMaterial: scale or custom dash animation
      dashedMat.dashSize = 0.25 + Math.sin(Date.now() * 0.003) * 0.05;
      dashedMat.opacity = isSelected ? 1.0 : 0.8;
      dashedLine.computeLineDistances();
    });
  });

  return (
    <group ref={lanesGroupRef}>
      {laneObjects.map(({ lane, baseLine, dashedLine }) => (
        <group key={lane.id}>
          <primitive object={baseLine} />
          <primitive object={dashedLine} />
        </group>
      ))}
    </group>
  );
};
