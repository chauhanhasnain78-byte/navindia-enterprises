"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { CategoryShapeType } from "@/config/company";

interface ShapeMeshProps {
  shapeType: CategoryShapeType;
  modelPath?: string;
  isHovered: boolean;
}

const gltfCache = new Map<string, THREE.Group | null>();

/**
 * Sets up a real PBR Studio RoomEnvironment on the Three.js scene
 * so metallic surfaces (stainless steel, brass, alloy steel) look like real metal.
 */
function StudioEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();
    const envScene = new RoomEnvironment();
    const envMap = pmremGenerator.fromScene(envScene, 0.04).texture;
    scene.environment = envMap;

    return () => {
      scene.environment = null;
      envMap.dispose();
      pmremGenerator.dispose();
    };
  }, [gl, scene]);

  return null;
}

function normalizeAndCenterScene(rawScene: THREE.Group): THREE.Group {
  const cloned = rawScene.clone(true);
  const box = new THREE.Box3().setFromObject(cloned);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  const maxDim = Math.max(size.x, size.y, size.z);
  const targetSize = 1.85;
  const scaleFactor = maxDim > 0 ? targetSize / maxDim : 1;

  cloned.position.set(
    -center.x * scaleFactor,
    -center.y * scaleFactor,
    -center.z * scaleFactor
  );
  cloned.scale.setScalar(scaleFactor);

  const wrapper = new THREE.Group();
  wrapper.add(cloned);
  return wrapper;
}

function IndustrialModelOrProceduralMesh({
  shapeType,
  modelPath,
  isHovered,
}: ShapeMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [loadedModel, setLoadedModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    if (!modelPath) return;
    let isMounted = true;

    if (gltfCache.has(modelPath)) {
      const cached = gltfCache.get(modelPath);
      if (cached && isMounted) {
        setLoadedModel(normalizeAndCenterScene(cached));
      }
      return;
    }

    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        gltfCache.set(modelPath, gltf.scene);
        if (isMounted) {
          setLoadedModel(normalizeAndCenterScene(gltf.scene));
        }
      },
      undefined,
      () => {
        gltfCache.set(modelPath, null);
      }
    );

    return () => {
      isMounted = false;
    };
  }, [modelPath]);

  // Continuous 360-degree rotation
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const speed = isHovered ? 1.35 : 0.65;
    groupRef.current.rotation.y += delta * speed;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      isHovered ? 0.42 : 0.28,
      0.08
    );
  });

  // Helical coiled hydraulic hose geometry
  const hoseGeometry = useMemo(() => {
    if (shapeType !== "hose") return null;
    const points: THREE.Vector3[] = [];
    const turns = 3.5;
    const radius = 0.82;
    const segments = 96;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * Math.PI * 2 * turns;
      const height = (t - 0.5) * 0.95;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        )
      );
    }
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 96, 0.145, 20, false);
  }, [shapeType]);

  // Realistic PBR Materials
  const stainlessSteelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#E2E8F0",
        metalness: 0.9,
        roughness: 0.18,
      }),
    []
  );

  const forgedGunmetalMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#64748B",
        metalness: 0.82,
        roughness: 0.28,
      }),
    []
  );

  const machinedBrassMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#E5B84B",
        metalness: 0.86,
        roughness: 0.2,
      }),
    []
  );

  const rubberMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#22262C",
        metalness: 0.08,
        roughness: 0.42,
      }),
    []
  );

  const abrasiveStoneMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#363B42",
        metalness: 0.18,
        roughness: 0.78,
      }),
    []
  );

  const flapBlueMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1F6E8C",
        metalness: 0.15,
        roughness: 0.55,
      }),
    []
  );

  const safetyAmberMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#F5A524",
        metalness: 0.25,
        roughness: 0.28,
      }),
    []
  );

  if (loadedModel) {
    return (
      <group ref={groupRef} rotation={[0.28, 0.4, 0]}>
        <primitive object={loadedModel} />
      </group>
    );
  }

  return (
    <group ref={groupRef} rotation={[0.28, 0.5, 0]}>
      {/* 1. HOSES: Coiled Rubber Hydraulic Hose with Crimped SS Ferrules & Brass Hex Couplings */}
      {shapeType === "hose" && hoseGeometry && (
        <group>
          <mesh geometry={hoseGeometry} material={rubberMat} />
          {/* Top End Coupling: SS Crimp Ferrule + Brass Hex Nut + Threaded Nipple */}
          <group position={[0.82, 0.475, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh position={[0, 0.05, 0]} material={stainlessSteelMat}>
              <cylinderGeometry args={[0.175, 0.175, 0.24, 20]} />
            </mesh>
            <mesh position={[0, 0.22, 0]} material={machinedBrassMat}>
              <cylinderGeometry args={[0.21, 0.21, 0.16, 6]} />
            </mesh>
            <mesh position={[0, 0.35, 0]} material={machinedBrassMat}>
              <cylinderGeometry args={[0.14, 0.14, 0.14, 20]} />
            </mesh>
          </group>
          {/* Bottom End Coupling */}
          <group position={[0.82, -0.475, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh position={[0, -0.05, 0]} material={stainlessSteelMat}>
              <cylinderGeometry args={[0.175, 0.175, 0.24, 20]} />
            </mesh>
            <mesh position={[0, -0.22, 0]} material={machinedBrassMat}>
              <cylinderGeometry args={[0.21, 0.21, 0.16, 6]} />
            </mesh>
            <mesh position={[0, -0.35, 0]} material={stainlessSteelMat}>
              <cylinderGeometry args={[0.14, 0.14, 0.14, 20]} />
            </mesh>
          </group>
        </group>
      )}

      {/* 2. FASTENERS: Stainless Hex Bolt + Nut + Washer + Forged Eye Bolt */}
      {shapeType === "fastener" && (
        <group>
          {/* Left: Stainless Steel Hex Bolt + Washer + Brass Hex Nut */}
          <group position={[-0.42, 0.05, 0]}>
            {/* Hex Head */}
            <mesh position={[0, 0.68, 0]} material={stainlessSteelMat}>
              <cylinderGeometry args={[0.46, 0.46, 0.28, 6]} />
            </mesh>
            {/* Flange Washer under head */}
            <mesh position={[0, 0.52, 0]} material={stainlessSteelMat}>
              <cylinderGeometry args={[0.5, 0.5, 0.05, 28]} />
            </mesh>
            {/* Bolt Shank */}
            <mesh position={[0, -0.1, 0]} material={stainlessSteelMat}>
              <cylinderGeometry args={[0.22, 0.22, 1.25, 24]} />
            </mesh>
            {/* Precision Thread Ridges */}
            {[-0.02, -0.14, -0.26, -0.38, -0.5, -0.62].map((yPos, idx) => (
              <mesh
                key={idx}
                position={[0, yPos, 0]}
                rotation={[Math.PI / 2, 0, 0]}
                material={forgedGunmetalMat}
              >
                <torusGeometry args={[0.225, 0.028, 12, 24]} />
              </mesh>
            ))}
            {/* Threaded Hex Nut */}
            <mesh position={[0, 0.12, 0]} material={machinedBrassMat}>
              <cylinderGeometry args={[0.42, 0.42, 0.24, 6]} />
            </mesh>
          </group>

          {/* Right: Forged Steel Lifting Eye Bolt */}
          <group position={[0.48, -0.05, 0]}>
            {/* Eye Ring */}
            <mesh position={[0, 0.48, 0]} material={forgedGunmetalMat}>
              <torusGeometry args={[0.32, 0.11, 20, 36]} />
            </mesh>
            {/* Shoulder Collar */}
            <mesh position={[0, 0.1, 0]} material={forgedGunmetalMat}>
              <cylinderGeometry args={[0.24, 0.18, 0.18, 24]} />
            </mesh>
            {/* Threaded Stem */}
            <mesh position={[0, -0.38, 0]} material={stainlessSteelMat}>
              <cylinderGeometry args={[0.14, 0.14, 0.8, 20]} />
            </mesh>
            {[-0.15, -0.28, -0.41, -0.54, -0.67].map((yPos, idx) => (
              <mesh
                key={idx}
                position={[0, yPos, 0]}
                rotation={[Math.PI / 2, 0, 0]}
                material={forgedGunmetalMat}
              >
                <torusGeometry args={[0.145, 0.02, 10, 20]} />
              </mesh>
            ))}
          </group>
        </group>
      )}

      {/* 3. SEALS & O-RINGS: Precision Elastomer O-Rings & Metallic Radial Shaft Seal */}
      {shapeType === "seal" && (
        <group>
          {/* Large Nitrile O-Ring */}
          <mesh position={[-0.15, 0.08, -0.1]} material={rubberMat}>
            <torusGeometry args={[0.78, 0.18, 28, 56]} />
          </mesh>
          {/* Metallic Cased Radial Shaft Seal */}
          <group position={[0.35, -0.18, 0.22]} rotation={[0.35, -0.25, 0]}>
            <mesh material={stainlessSteelMat}>
              <cylinderGeometry args={[0.56, 0.56, 0.18, 36, 1, true]} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} material={rubberMat}>
              <torusGeometry args={[0.46, 0.1, 20, 40]} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} material={machinedBrassMat}>
              <torusGeometry args={[0.34, 0.035, 16, 36]} />
            </mesh>
          </group>
        </group>
      )}

      {/* 4. ABRASIVES: Industrial Grinding Wheel + Zirconium Flap Disc with SS Arbor Hub */}
      {shapeType === "abrasive" && (
        <group rotation={[Math.PI / 3.2, 0, 0]}>
          {/* Main Depressed-Center Grinding Disc */}
          <mesh position={[0, -0.06, 0]} material={abrasiveStoneMat}>
            <cylinderGeometry args={[1.05, 1.05, 0.14, 40]} />
          </mesh>
          {/* Radial Zirconium Abrasive Flaps */}
          {Array.from({ length: 16 }).map((_, idx) => {
            const angle = (idx / 16) * Math.PI * 2;
            return (
              <mesh
                key={idx}
                position={[Math.cos(angle) * 0.72, 0.04, Math.sin(angle) * 0.72]}
                rotation={[0, -angle, 0.18]}
                material={flapBlueMat}
              >
                <boxGeometry args={[0.42, 0.04, 0.22]} />
              </mesh>
            );
          })}
          {/* Depressed Steel Hub */}
          <mesh position={[0, 0.05, 0]} material={forgedGunmetalMat}>
            <cylinderGeometry args={[0.48, 0.54, 0.08, 32]} />
          </mesh>
          {/* Stainless Steel Center Bore Ring */}
          <mesh
            position={[0, 0.1, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            material={stainlessSteelMat}
          >
            <torusGeometry args={[0.28, 0.06, 16, 32]} />
          </mesh>
        </group>
      )}

      {/* 5. LIFTING PRODUCTS: Forged Alloy Omega Bow Shackle with Threaded Pin & Collar */}
      {shapeType === "lifting" && (
        <group position={[0, 0.05, 0]}>
          {/* Omega Shackle Bow */}
          <mesh
            position={[0, 0.18, 0]}
            rotation={[0, 0, 0.24]}
            material={forgedGunmetalMat}
          >
            <torusGeometry args={[0.68, 0.17, 24, 48, Math.PI * 1.35]} />
          </mesh>
          {/* Left Shackle Ear */}
          <mesh
            position={[-0.58, -0.38, 0]}
            rotation={[0, 0, Math.PI / 2]}
            material={forgedGunmetalMat}
          >
            <cylinderGeometry args={[0.27, 0.27, 0.26, 24]} />
          </mesh>
          {/* Right Shackle Ear */}
          <mesh
            position={[0.58, -0.38, 0]}
            rotation={[0, 0, Math.PI / 2]}
            material={forgedGunmetalMat}
          >
            <cylinderGeometry args={[0.27, 0.27, 0.26, 24]} />
          </mesh>
          {/* High-Visibility Safety Clevis Pin */}
          <mesh
            position={[0, -0.38, 0]}
            rotation={[0, 0, Math.PI / 2]}
            material={safetyAmberMat}
          >
            <cylinderGeometry args={[0.15, 0.15, 1.72, 24]} />
          </mesh>
          {/* Pin Eye Head (Left) */}
          <mesh
            position={[-0.88, -0.38, 0]}
            rotation={[0, 0, Math.PI / 2]}
            material={safetyAmberMat}
          >
            <cylinderGeometry args={[0.28, 0.28, 0.16, 20]} />
          </mesh>
          {/* Hex Retaining Nut (Right) */}
          <mesh
            position={[0.84, -0.38, 0]}
            rotation={[0, 0, Math.PI / 2]}
            material={stainlessSteelMat}
          >
            <cylinderGeometry args={[0.24, 0.24, 0.18, 6]} />
          </mesh>
        </group>
      )}

      {/* 6. MS/SS INDUSTRIAL PRODUCTS: Polished SS Bolted Pipe Flange + Structural Steel I-Beam */}
      {shapeType === "metal" && (
        <group>
          {/* Left/Front: Polished Stainless Steel Pipe Flange */}
          <group position={[-0.32, -0.05, 0.18]} rotation={[0.45, 0.25, 0]}>
            <mesh material={stainlessSteelMat}>
              <cylinderGeometry args={[0.68, 0.68, 0.16, 36]} />
            </mesh>
            <mesh position={[0, 0.14, 0]} material={stainlessSteelMat}>
              <cylinderGeometry args={[0.38, 0.44, 0.18, 32]} />
            </mesh>
            <mesh position={[0, 0.1, 0]} material={forgedGunmetalMat}>
              <cylinderGeometry args={[0.26, 0.26, 0.28, 28]} />
            </mesh>
            {/* 8 Bolt Studs around Flange Perimeter */}
            {Array.from({ length: 8 }).map((_, idx) => {
              const angle = (idx / 8) * Math.PI * 2;
              return (
                <mesh
                  key={idx}
                  position={[
                    Math.cos(angle) * 0.53,
                    0.09,
                    Math.sin(angle) * 0.53,
                  ]}
                  material={forgedGunmetalMat}
                >
                  <cylinderGeometry args={[0.045, 0.045, 0.06, 12]} />
                </mesh>
              );
            })}
          </group>

          {/* Right/Back: Structural Mild Steel I-Beam Section */}
          <group position={[0.42, 0.08, -0.18]} rotation={[0.1, -0.35, 0]}>
            <mesh material={forgedGunmetalMat}>
              <boxGeometry args={[0.16, 0.88, 1.15]} />
            </mesh>
            <mesh position={[0, 0.46, 0]} material={stainlessSteelMat}>
              <boxGeometry args={[0.78, 0.14, 1.15]} />
            </mesh>
            <mesh position={[0, -0.46, 0]} material={stainlessSteelMat}>
              <boxGeometry args={[0.78, 0.14, 1.15]} />
            </mesh>
          </group>
        </group>
      )}

      {/* 7. OTHER INDUSTRIAL SUPPLIES: Machined Brass Industrial Ball Valve with Lever Handle */}
      {shapeType === "general" && (
        <group position={[0, -0.05, 0]}>
          {/* Main Forged Brass Valve Body */}
          <mesh
            rotation={[0, 0, Math.PI / 2]}
            material={machinedBrassMat}
          >
            <cylinderGeometry args={[0.38, 0.38, 0.95, 24]} />
          </mesh>
          {/* Left Hex Port */}
          <mesh
            position={[-0.58, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
            material={machinedBrassMat}
          >
            <cylinderGeometry args={[0.44, 0.44, 0.28, 6]} />
          </mesh>
          {/* Right Hex Port */}
          <mesh
            position={[0.58, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
            material={machinedBrassMat}
          >
            <cylinderGeometry args={[0.44, 0.44, 0.28, 6]} />
          </mesh>
          {/* Stainless Valve Stem */}
          <mesh position={[0, 0.42, 0]} material={stainlessSteelMat}>
            <cylinderGeometry args={[0.14, 0.18, 0.36, 20]} />
          </mesh>
          {/* Safety Amber Valve Lever Handle */}
          <mesh position={[0.38, 0.62, 0]} material={safetyAmberMat}>
            <boxGeometry args={[0.95, 0.09, 0.18]} />
          </mesh>
        </group>
      )}
    </group>
  );
}

interface Category3DSceneProps {
  shapeType: CategoryShapeType;
  modelPath?: string;
  isHovered: boolean;
}

export default function Category3DScene({
  shapeType,
  modelPath,
  isHovered,
}: Category3DSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 3.0], fov: 40 }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        touchAction: "pan-x pan-y",
      }}
    >
      <StudioEnvironment />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      <directionalLight position={[-4, -2, 3]} intensity={0.6} />
      <IndustrialModelOrProceduralMesh
        shapeType={shapeType}
        modelPath={modelPath}
        isHovered={isHovered}
      />
    </Canvas>
  );
}
