import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MAJOR_LANES } from '../../services/mockApi';

interface GlobeProps {
  radius?: number;
  activeSection?: number; // 0: Hero, 1: Demand, 2: Rates, 3: Risk, 4: Book
}

// Convert Lat/Lng to Vector3 on sphere
export const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

export const Globe: React.FC<GlobeProps> = ({ radius = 3.2, activeSection = 0 }) => {
  const globeGroupRef = useRef<THREE.Group>(null!);
  const atmosphereRef = useRef<THREE.Mesh>(null!);

  // Generate continent coordinate clusters (Earth continents wireframe point cloud)
  const continentPoints = useMemo(() => {
    const pts: number[] = [];
    // Key landmass lat/lng bounds for realistic continent shapes
    const landmassRegions = [
      // North America
      { minLat: 25, maxLat: 60, minLng: -125, maxLng: -70, step: 4 },
      // South America
      { minLat: -45, maxLat: 10, minLng: -75, maxLng: -40, step: 4.5 },
      // Europe
      { minLat: 36, maxLat: 65, minLng: -10, maxLng: 35, step: 3.5 },
      // Africa
      { minLat: -32, maxLat: 35, minLng: -15, maxLng: 50, step: 4.5 },
      // Asia & India
      { minLat: 8, maxLat: 65, minLng: 40, maxLng: 140, step: 3.5 },
      // Australia
      { minLat: -38, maxLat: -12, minLng: 115, maxLng: 152, step: 4.5 },
    ];

    landmassRegions.forEach(reg => {
      for (let lat = reg.minLat; lat <= reg.maxLat; lat += reg.step) {
        for (let lng = reg.minLng; lng <= reg.maxLng; lng += reg.step) {
          // Add organic jitter
          const jLat = lat + (Math.random() - 0.5) * (reg.step * 0.4);
          const jLng = lng + (Math.random() - 0.5) * (reg.step * 0.4);
          const v = latLngToVector3(jLat, jLng, radius + 0.02);
          pts.push(v.x, v.y, v.z);
        }
      }
    });

    return new Float32Array(pts);
  }, [radius]);

  // Latitude and Longitude rings
  const latRingObjects = useMemo(() => {
    const objects: THREE.Line[] = [];
    const mat = new THREE.LineBasicMaterial({ color: 0xe8805a, transparent: true, opacity: 0.18 });
    for (let lat = -60; lat <= 60; lat += 20) {
      const ring: THREE.Vector3[] = [];
      for (let lng = 0; lng <= 360; lng += 6) {
        ring.push(latLngToVector3(lat, lng, radius));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(ring);
      objects.push(new THREE.Line(geo, mat));
    }
    return objects;
  }, [radius]);

  // Major Port Markers
  const portMarkers = useMemo(() => {
    const ports = [
      { name: 'Shanghai', lat: 31.2304, lng: 121.4737, color: '#e8805a' },
      { name: 'Rotterdam', lat: 51.9244, lng: 4.4777, color: '#3b82f6' },
      { name: 'Los Angeles', lat: 33.7432, lng: -118.2673, color: '#1fb573' },
      { name: 'Singapore', lat: 1.3521, lng: 103.8198, color: '#e8805a' },
      { name: 'Dubai', lat: 25.0118, lng: 55.0617, color: '#f59e0b' },
      { name: 'Hamburg', lat: 53.5511, lng: 9.9937, color: '#3b82f6' },
    ];
    return ports.map(p => ({
      ...p,
      pos: latLngToVector3(p.lat, p.lng, radius + 0.04)
    }));
  }, [radius]);

  useFrame((_, delta) => {
    if (!globeGroupRef.current) return;
    // Rotate slowly on axis
    // If user is focused on a specific section (e.g. Demand/Rates), rotate to highlight that region
    if (activeSection === 0) {
      globeGroupRef.current.rotation.y += delta * 0.08;
    } else if (activeSection === 1) {
      // Rotate towards Asia - Europe corridor
      globeGroupRef.current.rotation.y = THREE.MathUtils.lerp(globeGroupRef.current.rotation.y, -1.2, 0.04);
    } else if (activeSection === 2) {
      // Focus on Transpacific
      globeGroupRef.current.rotation.y = THREE.MathUtils.lerp(globeGroupRef.current.rotation.y, 0.4, 0.04);
    } else {
      globeGroupRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <group ref={globeGroupRef}>
      {/* Base Dark Sphere (occlusion) */}
      <mesh>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshBasicMaterial color="#0c0d12" />
      </mesh>

      {/* Wireframe Grid Sphere */}
      <mesh>
        <sphereGeometry args={[radius + 0.005, 32, 24]} />
        <meshBasicMaterial
          color="#e8805a"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Continental Point Cloud */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[continentPoints, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#f08e6c"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Latitude Rings */}
      {latRingObjects.map((obj, i) => (
        <primitive key={`lat-${i}`} object={obj} />
      ))}

      {/* Major Hub Port Markers with Pulsing Beacons */}
      {portMarkers.map((port, idx) => (
        <group key={idx} position={port.pos}>
          {/* Core pin */}
          <mesh>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color={port.color} />
          </mesh>
          {/* Pulsing halo */}
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial
              color={port.color}
              wireframe
              transparent
              opacity={0.5}
            />
          </mesh>
        </group>
      ))}

      {/* Outer Atmospheric Fresnel Glow Ring */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[radius * 1.14, 32, 32]} />
        <shaderMaterial
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            void main() {
              float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
              vec3 glowColor = mix(vec3(0.91, 0.50, 0.35), vec3(0.23, 0.51, 0.96), 0.4);
              gl_FragColor = vec4(glowColor, intensity * 0.45);
            }
          `}
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
