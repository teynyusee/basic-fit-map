export type MachineConfig = {
  id: string;
  meshName: string;
  zone: "overview" | "cardio" | "strength" | "free" | "dumbbells";
  info: {
    title: string;
    description: string;
  };
};

export const MACHINES: MachineConfig[] = [
  {
    id: "treadmill",
    meshName: "SM__TreadMill__main",
    zone: "cardio",
    info: {
      title: "Treadmill",
      description: "Ideaal voor cardio en conditie.",
    },
  },
  {
    id: "stepper",
    meshName: "machine__stepper__main",
    zone: "cardio",
    info: {
      title: "Stair Stepper",
      description: "Versterkt benen en billen.",
    },
  },
  {
    id: "eleptical__trainer",
    meshName: "SM__Eleptical__Trainer__main",
    zone: "cardio",
    info: {
      title: "Roeimachine",
      description: "Volledige lichaamstraining.",
    },
  },
];
