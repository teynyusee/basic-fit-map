import { useState } from "react";
import { MapScene } from "./components/scenes/MapScene";
import { NavBar } from "./components/ui/NavBar";
import type { ZoneId } from "./data/zones";
import { CAMERA_NAMES } from "./data/cameras";
import { MACHINES } from "./data/machines";
import type { MachineType } from "./data/machines";


export default function App() {
  const [activeZone, setActiveZone] = useState<ZoneId>("overview");
  const [selectedMachine, setSelectedMachine] = useState<MachineType | null>(null);


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

    // 🔹 slider altijd resetten bij binnenkomen zone
    setZoneViewFactors((prev) => ({
      ...prev,
      [zone]: 0,
    }));
  }

  return (
    <>
      <NavBar
        activeZone={activeZone}
        onZoneChange={handleZoneChange}
      />

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

{selectedMachine && (
  <div
    style={{
      position: "absolute",
      right: 20,
      top: 80,
      width: 300,
      background: "rgba(0,0,0,0.85)",
      color: "#fff",
      padding: "1rem",
      borderRadius: 14,
      zIndex: 30,
    }}
  >
    <h3>{MACHINES[selectedMachine].title}</h3>
    <p>{MACHINES[selectedMachine].description}</p>

    <p><strong>Calorieën:</strong> {MACHINES[selectedMachine].calories}</p>

    <p><strong>Spieren:</strong> {MACHINES[selectedMachine].muscles.join(", ")}</p>

    <ul>
      {MACHINES[selectedMachine].tips.map((tip) => (
        <li key={tip}>{tip}</li>
      ))}
    </ul>

    <button
      onClick={() => setSelectedMachine(null)}
      style={{
        marginTop: "0.5rem",
        width: "100%",
        padding: "0.4rem",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
      }}
    >
      Sluiten
    </button>
  </div>
)}
    </>
  );
}
