import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import type { MachineConfig } from "../../data/machines";
import { MACHINES } from "../../data/machines";

type Props = {
  onSelect: (machine: MachineConfig) => void;
};

export function MachineClickHandler({ onSelect }: Props) {
  const { camera, scene, raycaster, pointer } = useThree();

  /**
   * Probeert via parent-chain te bepalen
   * of dit object bij een machine hoort
   */
function getMachineFromObject(
  obj: THREE.Object3D | null
): MachineConfig | null {
  while (obj) {
    const machine = MACHINES.find(
      (m) => m.meshName === obj.name
    );
    if (machine) return machine;

    obj = obj.parent as THREE.Object3D | null;
  }
  return null;
}



  useEffect(() => {
    function handleMove() {
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(scene.children, true);

      const hovering = hits.some(
        (hit) => getMachineFromObject(hit.object) !== null
      );

      document.body.style.cursor = hovering ? "pointer" : "default";
    }

    function handleClick() {
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(scene.children, true);

      for (const hit of hits) {
        const machine = getMachineFromObject(hit.object);
        if (machine) {
          onSelect(machine);
          return;
        }
      }
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerdown", handleClick);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleClick);
    };
  }, [camera, pointer, raycaster, scene, onSelect]);

  return null;
}
