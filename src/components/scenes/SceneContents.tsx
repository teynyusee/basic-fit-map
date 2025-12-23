/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import type { ZoneId } from "../../data/zones";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { MachineConfig } from "../../data/machines";

import { MACHINES } from "../../data/machines";
import { SCENE_CONFIG } from "../../data/sceneConfig";

import { ParallaxScene } from "./ParallaxScene";
import { MachineClickHandler } from "./MachineClickHandler";
import { useZoneCamera } from "../../hooks/useZoneCamera";

export function SceneContents({
  activeZone,
  viewFactor,
  onMachineSelect,
}: {
  activeZone: ZoneId;
  viewFactor: number;
  onMachineSelect: (machine: MachineConfig) => void;
}) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const gltf = useGLTF("/models/gym_overview.glb") as any;

  useZoneCamera(activeZone, gltf, controlsRef, viewFactor);

  const floatingObjects = useRef<THREE.Object3D[]>([]);

  useEffect(() => {
    floatingObjects.current = [];

    MACHINES.forEach((machine) => {
      const obj = gltf.scene.getObjectByName(machine.meshName);

      if (!obj) {
        console.warn("Machine niet gevonden:", machine.meshName);
        return;
      }

      // glow (machine)
      obj.traverse((child: any) => {
        if (!child.isMesh) return;

        child.material = child.material.clone();
        child.material.emissive = new THREE.Color(
          SCENE_CONFIG.glowColor
        );
        child.material.emissiveIntensity = 0.6;
      });

      floatingObjects.current.push(obj);
    });
  }, [gltf]);

  // Animatie

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    floatingObjects.current.forEach((obj, i) => {
      obj.position.y =
        SCENE_CONFIG.baseY +
        Math.sin(t * 1.2 + i) * SCENE_CONFIG.liftHeight;

      obj.rotation.y = Math.sin(t * 0.6 + i) * 0.08;
    });
  });

  return (
    <>
      <ParallaxScene scene={gltf.scene} />
      <MachineClickHandler onSelect={onMachineSelect} />

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.45}
        width={400}
        height={400}
        blur={2.8}
        far={200}
      />

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
