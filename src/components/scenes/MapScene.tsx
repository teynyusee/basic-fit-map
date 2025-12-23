import { SceneContents } from "./SceneContents";
import type { ZoneId } from "../../data/zones";
import type { MachineType } from "../../data/machines";
import { GymCanvas } from "../canvas/GymCanvas";

export function MapScene({
  activeZone,
  viewFactor,
  onMachineSelect,
}: {
  activeZone: ZoneId;
  viewFactor: number;
  onMachineSelect: (machine: MachineType) => void;
}) {
  return (
    <GymCanvas>
      <SceneContents
        activeZone={activeZone}
        viewFactor={viewFactor}
        onMachineSelect={onMachineSelect}
      />
    </GymCanvas>
  );
}
