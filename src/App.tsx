import { useState } from "react";
import { MapScene } from "./components/scenes/MapScene";
import { NavBar } from "./components/ui/NavBar";
import { MachineInfoPanel } from "./components/ui/MachineInfoPanel";
import type { ZoneId } from "./data/zones";
import { CAMERA_NAMES } from "./data/cameras";
import type { MachineConfig } from "./data/machines";

export default function App() {
  const [activeZone, setActiveZone] = useState<ZoneId>("overview");
  const [selectedMachine, setSelectedMachine] =
    useState<MachineConfig | null>(null);

  const [zoneViewFactors, setZoneViewFactors] = useState<
    Record<ZoneId, number>
  >({
    overview: 0,
    cardio: 0,
    strength: 0,
    free: 0,
    dumbbells: 0,
  });

  function handleZoneChange(zone: ZoneId) {
    setActiveZone(zone);
    setZoneViewFactors((prev) => ({ ...prev, [zone]: 0 }));
  }

  return (
    <>
      <NavBar activeZone={activeZone} onZoneChange={handleZoneChange} />

      {CAMERA_NAMES[activeZone].views && (
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={zoneViewFactors[activeZone]}
          onChange={(e) =>
            setZoneViewFactors((prev) => ({
              ...prev,
              [activeZone]: Number(e.target.value),
            }))
          }
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            width: 250,
            zIndex: 10,
          }}
        />
      )}

      <MapScene
        activeZone={activeZone}
        viewFactor={zoneViewFactors[activeZone]}
        onMachineSelect={setSelectedMachine}
      />

      <MachineInfoPanel
        machine={selectedMachine}
        onClose={() => setSelectedMachine(null)}
      />
    </>
  );
}
