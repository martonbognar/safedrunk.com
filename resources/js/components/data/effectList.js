const EFFECT_LIST = [
  {
    percentageFloor: 0.0001,
    percentageCeiling: 0.03,
    behavior: [
      "Average individual appears normal",
    ],
    impairment: [
      "Subtle effects that can be detected with special tests",
    ],
  },
  {
    percentageFloor: 0.03,
    percentageCeiling: 0.06,
    behavior: [
      "Mild euphoria",
      "Relaxation",
      "Joyousness",
      "Talkativeness",
      "Decreased inhibition",
    ],
    impairment: [
      "Concentration",
    ],
  },
  {
    percentageFloor: 0.06,
    percentageCeiling: 0.1,
    behavior: [
      "Blunted feelings",
      "Reduced sensitivity to pain",
      "Euphoria",
      "Disinhibition",
      "Extroversion",
    ],
    impairment: [
      "Reasoning",
      "Depth perception",
      "Peripheral vision",
      "Glare recovery",
    ],
  },
  {
    percentageFloor: 0.1,
    percentageCeiling: 0.2,
    behavior: [
      "Over-expression",
      "Boisterousness",
      "Possibility of nausea and vomiting",
    ],
    impairment: [
      "Reflexes",
      "Reaction time",
      "Gross motor control",
      "Staggering",
      "Slurred speech",
      "Temporary erectile dysfunction",
    ],
  },
  {
    percentageFloor: 0.2,
    percentageCeiling: 0.3,
    behavior: [
      "Nausea",
      "Vomiting",
      "Emotional swings",
      "Anger or sadness",
      "Partial loss of understanding",
      "Impaired sensations",
      "Decreased libido",
      "Possibility of stupor",
    ],
    impairment: [
      "Severe motor impairment",
      "Loss of consciousness",
      "Memory blackout",
    ],
  },
  {
    percentageFloor: 0.3,
    percentageCeiling: 0.4,
    behavior: [
      "Stupor",
      "Central nervous system depression",
      "Loss of understanding",
      "Lapses in and out of consciousness",
      "Low possibility of death",
    ],
    impairment: [
      "Bladder function",
      "Breathing",
      "Dysequilibrium",
      "Heart rate",
    ],
  },
  {
    percentageFloor: 0.4,
    percentageCeiling: 1,
    behavior: [
      "Severe central nervous system depression",
      "Coma",
      "Possibility of death",
    ],
    impairment: [
      "Breathing",
      "Heart rate",
      "Positional alcohol nystagmus",
    ],
  },
];

export default EFFECT_LIST;
