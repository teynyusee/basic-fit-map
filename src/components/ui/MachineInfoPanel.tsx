import { type MachineConfig } from "../../data/machines";

type Props = {
  machine: MachineConfig | null;
  onClose: () => void;
};

export function MachineInfoPanel({ machine, onClose }: Props) {
  if (!machine) return null;

  return (
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
      <h3>{machine.info.title}</h3>
      <p>{machine.info.description}</p>

      <p>
        <strong>Zone:</strong> {machine.zone}
      </p>

      <p>
        <strong>Lift hoogte:</strong> {machine.liftHeight}
      </p>

      <button
        onClick={onClose}
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
  );
}
