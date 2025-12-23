/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { ZoneId } from "../../data/zones";
import { useZoneCamera } from "../../hooks/useZoneCamera";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { ParallaxScene } from "./ParallaxScene";
import { MachineClickHandler } from "./MachineClickHandler";
import type { MachineType } from "../../data/machines";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function SceneContents({
  activeZone,
  viewFactor,
  onMachineSelect,
}: {
  activeZone: ZoneId;
  viewFactor: number;
  onMachineSelect: (machine: MachineType) => void;
}) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  // 🔹 Laad gym model
  const gltf = useGLTF("/models/gym_overview.glb") as any;

  // 🔹 Zone camera logic
  useZoneCamera(activeZone, gltf, controlsRef, viewFactor);

  // 🔹 Ref voor volledige treadmill (parent object)
  const treadmillRef = useRef<THREE.Object3D | null>(null);

  // 🎨 Glow + ref koppelen
  useEffect(() => {
    gltf.scene.traverse((child: any) => {
      if (child.isMesh && child.name.includes("SM_TreadMill_22015", "SM_Stair_Stepper_24.003")) {
        // 👉 volledige treadmill laten zweven
        treadmillRef.current = child.parent;

        // 👉 materiaal clonen voor emissive
        child.material = child.material.clone();
child.material.emissive = new THREE.Color("#ff9f43");
child.material.emissiveIntensity = 1.2;

      }
    });
  }, [gltf]);

  // 🌀 Zweef-animatie (smooth & duidelijk)
useFrame(({ clock }) => {
  if (!treadmillRef.current) return;

  const t = clock.getElapsedTime();

  // 🔁 cyclus van 0 → 1 → 0 (smooth)
  const liftCycle = (Math.sin(t * 1.1) + 1) / 2;

  // ⬆️ start op grond → gaat hoger → exact terug
  const baseY = 4.00;        // originele hoogte (grond)
  const liftHeight = 1.50;   // HOE hoog hij omhoog gaat
  treadmillRef.current.position.y = baseY + liftHeight * liftCycle;

});


  // ✨ Glow pulse (optioneel maar nice)
useFrame(({ clock }) => {
  const t = clock.getElapsedTime();

  gltf.scene.traverse((child: any) => {
    if (
      child.isMesh &&
      child.name.includes("SM_TreadMill_22015") &&
      child.material?.emissive
    ) {
      child.material.emissiveIntensity =
        1.0 + Math.sin(t * 1.3) * 0.2;
    }
  });
});


  return (
    <>
      {/* 🌐 3D Scene */}
      <ParallaxScene scene={gltf.scene} />

      {/* 🖱️ Click + hover handler */}
      <MachineClickHandler onSelect={onMachineSelect} />

      {/* 🌫️ Schaduwen */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.45}
        width={400}
        height={400}
        blur={2.8}
        far={200}
        resolution={1024}
      />

      {/* 🎥 Controls (uitgeschakeld) */}
      <OrbitControls
        ref={controlsRef}
        enabled={false}
        enableRotate={false}
        enableZoom={false}
        enablePan={false}
      />
    </>
  );
}
