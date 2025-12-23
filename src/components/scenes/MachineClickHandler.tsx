import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import type { MachineType } from "../../data/machines";

type Props = {
  onSelect: (machine: MachineType) => void;
};

export function MachineClickHandler({ onSelect }: Props) {
  const { camera, scene, raycaster, pointer } = useThree();

  function isTarget(obj: THREE.Object3D | null): boolean {
    while (obj) {
      if (obj.name.includes("SM_TreadMill_22015")) return true;
      obj = obj.parent as THREE.Object3D | null;
    }
    return false;
  }

  useEffect(() => {
    function handleMove() {
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(scene.children, true);
      const hovering = hits.some((h) => isTarget(h.object));
      document.body.style.cursor = hovering ? "pointer" : "default";
    }

    function handleClick() {
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(scene.children, true);
      if (hits.some((h) => isTarget(h.object))) {
        onSelect("treadmill");
      }
    }

    // ✅ Canvas-level events
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerdown", handleClick);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleClick);
    };
  }, [camera, pointer, raycaster, scene, onSelect]);

  return null;
}
