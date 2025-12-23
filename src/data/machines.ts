export type MachineType = "treadmill" | "stairstepper";


export interface Machine {
  id: string;
  title: string;
  description: string;
  muscles: string[];
  calories: string;
  tips: string[];
}

export const MACHINES = {
  treadmill: {
    id: "treadmill",
    title: "Treadmill",
    description: "Cardio toestel voor wandelen en lopen.",
    muscles: ["benen", "cardio"],
    calories: "500–700 kcal / uur",
    tips: [
      "Begin met 5 minuten wandelen",
      "Houd je houding recht",
      "Gebruik incline voor extra intensiteit"
    ],
  },
  stairstepper: {
    id: "stairstepper",
    title: "Stair Stepper",
    description: "Toestel dat de beweging van traplopen simuleert.",
    muscles: ["benen", "billen", "cardio"],
    calories: "400–600 kcal / uur",
    tips: [
      "Houd je rug recht tijdens het trainen",
      "Gebruik de handgrepen voor balans, niet om jezelf omhoog te trekken",
      "Varieer je snelheid voor een betere workout"
    ],
  },
} satisfies Record<MachineType, Machine>;
