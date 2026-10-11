"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CategoryShapeType } from "@/config/company";

interface ShapeMeshProps {
  shapeType: CategoryShapeType;
  isHovered: boolean;
}

function ProceduralIndustrialMesh({ shapeType, isHovered }: ShapeMeshProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const speed = isHovered ? 1.15 : 0.45;
    groupRef.current.rotation.y += delta * speed;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      isHovered ? 0.48 : 0.32,
      0.08
    );
  });

  // Helical tube geometry for Hoses
  const hoseGeometry = useMemo(() => {
    if (shapeType !== "hose") return null;
    const points: THREE.Vector3[] = [];
    const turns = 2.6;
    const radius = 0.85;
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * Math.PI * 2 * turns;
      const height = (t - 0.5) * 1.1;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        )
      );
    }
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 64, 0.17, 16, false);
  }, [shapeType]);

  const navyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0B1F3A",
        metalness: 0.55,
        roughness: 0.35,
      }),
    []
  );

  const steelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#8A99AD",
        metalness: 0.7,
        roughness: 0.28,
      }),
    []
  );

  const amberMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#F5A524",
        metalness: 0.35,
        roughness: 0.3,
      }),
    []
  );

  return (
    <group ref={groupRef} rotation={[0.32, 0.4, 0]}>
      {shapeType === "hose" && hoseGeometry && (
        <group>
          <mesh geometry={hoseGeometry} material={navyMaterial} />
          <mesh position={[0.85, 0.55, 0]} rotation={[Math.PI / 2, 0, 0]} material={amberMaterial}>
            <cylinderGeometry args={[0.22, 0.22, 0.22, 16]} />
          </mesh>
          <mesh position={[0.85, -0.55, 0]} rotation={[Math.PI / 2, 0, 0]} material={steelMaterial}>
            <cylinderGeometry args={[0.21, 0.21, 0.2, 16]} />
          </mesh>
        </group>
      )}

      {shapeType === "fastener" && (
        <group>
          {/* Hex Bolt Head */}
          <mesh position={[0, 0.68, 0]} material={navyMaterial}>
            <cylinderGeometry args={[0.68, 0.68, 0.38, 6]} />
          </mesh>
          {/* Bolt Shaft */}
          <mesh position={[0, -0.15, 0]} material={steelMaterial}>
            <cylinderGeometry args={[0.32, 0.32, 1.35, 20]} />
          </mesh>
          {/* Thread Rings */}
          {[-0.1, -0.32, -0.54, -0.72].map((yPos, idx) => (
            <mesh
              key={idx}
              position={[0, yPos, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              material={navyMaterial}
            >
              <torusGeometry args={[0.33, 0.04, 10, 24]} />
            </mesh>
          ))}
          {/* Hex Nut */}
          <mesh position={[0, 0.12, 0]} material={amberMaterial}>
            <cylinderGeometry args={[0.56, 0.56, 0.28, 6]} />
          </mesh>
        </group>
      )}

      {shapeType === "seal" && (
        <group>
          {/* Main Outer O-Ring Torus */}
          <mesh material={navyMaterial}>
            <torusGeometry args={[0.88, 0.24, 24, 48]} />
          </mesh>
          {/* Secondary Inner Seal Ring */}
          <mesh rotation={[0.45, 0.2, 0]} material={amberMaterial}>
            <torusGeometry args={[0.48, 0.12, 18, 36]} />
          </mesh>
        </group>
      )}

      {shapeType === "abrasive" && (
        <group rotation={[Math.PI / 3, 0, 0]}>
          {/* Main Grinding Disc */}
          <mesh material={navyMaterial}>
            <cylinderGeometry args={[1.05, 1.05, 0.16, 32]} />
          </mesh>
          {/* Depressed Center Ring */}
          <mesh position={[0, 0.09, 0]} material={steelMaterial}>
            <cylinderGeometry args={[0.58, 0.65, 0.08, 28]} />
          </mesh>
          {/* Center Bore Arbor Ring */}
          <mesh
            position={[0, 0.14, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            material={amberMaterial}
          >
            <torusGeometry args={[0.28, 0.07, 12, 24]} />
          </mesh>
        </group>
      )}

      {shapeType === "lifting" && (
        <group>
          {/* Shackle Bow */}
          <mesh position={[0, 0.15, 0]} material={navyMaterial}>
            <torusGeometry args={[0.72, 0.18, 20, 40, Math.PI * 1.35]} />
          </mesh>
          {/* Shackle Pin */}
          <mesh
            position={[0, -0.45, 0]}
            rotation={[0, 0, Math.PI / 2]}
            material={amberMaterial}
          >
            <cylinderGeometry args={[0.16, 0.16, 1.65, 20]} />
          </mesh>
          {/* Pin Collar */}
          <mesh
            position={[0.75, -0.45, 0]}
            rotation={[0, 0, Math.PI / 2]}
            material={steelMaterial}
          >
            <cylinderGeometry args={[0.28, 0.28, 0.22, 16]} />
          </mesh>
        </group>
      )}

      {shapeType === "metal" && (
        <group>
          {/* Structural I-Beam Web */}
          <mesh material={steelMaterial}>
            <boxGeometry args={[0.22, 1.1, 1.35]} />
          </mesh>
          {/* Top Flange */}
          <mesh position={[0, 0.58, 0]} material={navyMaterial}>
            <boxGeometry args={[1.15, 0.2, 1.35]} />
          </mesh>
          {/* Bottom Flange */}
          <mesh position={[0, -0.58, 0]} material={navyMaterial}>
            <boxGeometry args={[1.15, 0.2, 1.35]} />
          </mesh>
          {/* Accent Trim */}
          <mesh position={[0, 0.7, 0]} material={amberMaterial}>
            <boxGeometry args={[0.45, 0.05, 1.37]} />
          </mesh>
        </group>
      )}

      {shapeType === "general" && (
        <group>
          {/* Precision Industrial Hex Block */}
          <mesh material={navyMaterial}>
            <cylinderGeometry args={[0.82, 0.82, 0.55, 6]} />
          </mesh>
          {/* Inner Machined Sleeve */}
          <mesh material={steelMaterial}>
            <cylinderGeometry args={[0.48, 0.48, 0.85, 24]} />
          </mesh>
          {/* Accent Collar */}
          <mesh
            position={[0, 0.32, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            material={amberMaterial}
          >
            <torusGeometry args={[0.5, 0.08, 14, 28]} />
          </mesh>
        </group>
      )}
    </group>
  );
}

interface Category3DSceneProps {
  shapeType: CategoryShapeType;
  isHovered: boolean;
}

export default function Category3DScene({
  shapeType,
  isHovered,
}: Category3DSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.1], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        touchAction: "pan-x pan-y",
      }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} />
      <directionalLight position={[-3, -3, 2]} intensity={0.6} />
      <ProceduralIndustrialMesh shapeType={shapeType} isHovered={isHovered} />
    </Canvas>
  );
}
