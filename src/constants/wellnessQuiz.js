export const QUIZ_HEADER_CONTENT = {
  title: "Personalized Wellness Quiz",
  subtitle: "Find your ideal nutrition & recovery routine"
};

export const QUIZ_QUESTIONS = [
  {
    id: 'timeline',
    question: 'What describes your current lifestyle stage?',
    options: [
      { value: '0-6w', label: 'Postpartum Recovery', description: 'Early healing & nutrient restoration' },
      { value: '6-12w', label: 'Busy Mom / Parent', description: 'Balancing child care and personal habits' },
      { value: '3-6m', label: 'Active Professional', description: 'Looking to manage stress, sleep, and core posture' },
      { value: '6m+', label: 'Consistency Seeker', description: 'Rebuilding long-term fitness and diet routines' }
    ]
  },
  {
    id: 'focus',
    question: 'What is your primary wellness goal right now?',
    options: [
      { value: 'core', label: 'Rebuild Core & Posture', description: 'Address stability, back pain, and strength' },
      { value: 'energy', label: 'Boost Energy & Sleep Support', description: 'Overcome chronic fatigue and nourish body' },
      { value: 'weight', label: 'Sustainable Weight Management', description: 'Healthy weight adjustments without starvation' },
      { value: 'mind', label: 'Mental Wellness & Stress Relief', description: 'Mindful breathing and resetting nervous system' }
    ]
  },
  {
    id: 'time',
    question: 'How much time can you realistically dedicate daily?',
    options: [
      { value: '15m', label: '15 Minutes', description: 'Bite-sized routines, fits during breaks' },
      { value: '30m', label: '30 Minutes', description: 'Balanced routines for focused progress' },
      { value: '45m+', label: '45 Minutes or more', description: 'Complete wellness and movement sessions' }
    ]
  }
];

export const QUIZ_PATHWAYS = {
  postpartum: {
    pathName: "Nurture & Heal Blueprint",
    explanation: "Focus is entirely on deep tissue rest, hydration, and alignment. Avoid high-stress structural training. Engage only in light pelvic floor activation and mindful breathing.",
    yogaFocus: "Supine pelvic tilts, deep breathing, chest openers",
    dietFocus: "Warm, easily digestible foods, collagen support, plenty of water",
    waterTarget: 3.4,
    baseCalories: 2100
  },
  core: {
    pathName: "Core Foundation & Posture Blueprint",
    explanation: "Designed specifically to close the abdominal gap, strengthen pelvic floor muscles, and address lower back strain caused by carrying baby or sitting at a desk.",
    yogaFocus: "Glute bridges, bird-dog variations, diaphragmatic breaths",
    dietFocus: "Lean proteins (collagen synthesis), vitamin C, mineral-rich broths",
    waterTarget: 3.0,
    baseCalories: 1900
  },
  energy: {
    pathName: "Vitality & Restorative Energy Course",
    explanation: "Tailored for combatting chronic fatigue. We focus on movement sequences that open up tight shoulders and iron-rich meal plans that raise blood oxygen and restore energy.",
    yogaFocus: "Chest stretch, gentle twists, child's pose restoration",
    dietFocus: "Iron-rich leafy greens, complex carbs for slow energy release, magnesium",
    waterTarget: 3.2,
    baseCalories: 2000
  },
  weight: {
    pathName: "Metabolic Flow & Habit Plan",
    explanation: "Sustainable weight management. We avoid crash deficits to preserve thyroid health and muscle tissue, combining progressive yoga with nutrition coaching.",
    yogaFocus: "Gentle sun salutations, modified warriors, alignment poses",
    dietFocus: "High fiber vegetables, lean protein, healthy fats, seed cycling",
    waterTarget: 3.1,
    baseCalories: 1850
  },
  mind: {
    pathName: "Mind-Body Balance Routine",
    explanation: "Focus on resetting your nervous system. Learn to manage anxiety, improve sleep quality, and align yoga practice with stress release.",
    yogaFocus: "Legs up the wall, breathing patterns, restorative flows",
    dietFocus: "Herbal teas, anti-inflammatory greens, healthy fats for hormone regulation",
    waterTarget: 3.0,
    baseCalories: 1950
  },
  default: {
    pathName: "Gentle Restorative Pathway",
    explanation: "Your body is in a critical phase of healing and replenishment. We focus strictly on diaphragmatic breathing, alignment stability, and restorative nutrition to support energy reserves.",
    yogaFocus: "Savasana, Cat-Cow (gentle), Diaphragmatic Breathing",
    dietFocus: "Warm broths, mineral-rich grain bowls, anti-inflammatory spices",
    waterTarget: 3.2,
    baseCalories: 2000
  }
};

export const QUIZ_LABELS = {
  nextBtn: "Next Question",
  seePlanBtn: "See My Routine Plan",
  backBtn: "Back",
  retakeBtn: "Retake Assessment",
  lockInBtn: "Lock In Your Routine",
  caloricTarget: "Caloric Target",
  hydrationTarget: "Hydration Target",
  yogaMovementFocus: "Yoga & Movement Focus",
  nutritionGuidance: "Nutrition Guidance"
};
