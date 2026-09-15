export const BLOG_HEADER_CONTENT = {
  titlePrefix: "Wellness ",
  titleHighlight: "Blog",
  description: "Healthy recipes, core rehab exercises, and lifestyle habit guides written by our qualified coaches."
};

export const BLOG_CATEGORIES = ["All", "Nutrition", "Movement", "Mindfulness"];

export const BLOG_POSTS = [
  {
    id: 1,
    title: "5 Gentle Exercises to Rebuild Your Core & Posture Safely",
    excerpt: "Learn the gentle movement progressions that rebuild abdominal strength, relieve spinal pressure, and correct posture. Crucial safety tips included.",
    category: "Movement",
    author: "Maya Lin (Yoga Therapist)",
    date: "July 12, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
    sections: [
      {
        heading: "Understanding Deep Core Rehab",
        text: "True core stability starts with the Transverse Abdominis (TVA) and the pelvic floor. These deep structural stabilizers act as your body's natural corset, supporting posture, reducing back pain, and flattening the abdominal wall from the inside out."
      },
      {
        heading: "The 5 Safe Exercises",
        intro: "Whether you are recovering from childbirth or combatting long sitting hours at a desk, standard core workouts like sit-ups, crunches, and heavy front planks can put excess strain on your lower spine and trigger muscle imbalances.",
        exercises: [
          {
            title: "Diaphragmatic Breathing",
            desc: "Lie on your back with knees bent. Place one hand on your chest and one on your belly. Inhale deeply, letting your ribs and abdomen expand outwards. As you exhale slowly, pull your navel gently toward your spine while lifting your pelvic floor. Repeat 10 times."
          },
          {
            title: "Supine Pelvic Tilts",
            desc: "Lie on your back, knees bent, feet flat. Inhale. On the exhale, tilt your pelvis backward, pressing your lower back flat into the mat. Hold for 3 seconds, then release. Do 12 repetitions."
          },
          {
            title: "Heel Slides",
            desc: "On your back with knees bent, engage your lower abdomen. Slowly slide your right heel forward along the floor until your leg is straight, then draw it back. Alternate sides, keeping your pelvis completely stable. Do 8 per leg."
          },
          {
            title: "Glute Bridges",
            desc: "Press your heels flat and squeeze your glutes to lift your hips in a straight line from knees to shoulders. Do not arch your lower back. Lower down slowly. Repeat 10 times."
          },
          {
            title: "Opposite Arm-Leg Extension (Bird-Dog)",
            desc: "On hands and knees, extend your right arm forward and left leg backward. Keep your hips level and head in line with your spine. Hold for 3 seconds. Alternate sides. Repeat 8 times per side."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Women's Recovery Nutrition: Essential Mineral Rebalancing",
    excerpt: "Restoring depleted mineral reserves is vital for thyroid, adrenal, and overall energy function. Discover Dt. Pragati's golden rules.",
    category: "Nutrition",
    author: "Dt. Pragati Mishra (Dietitian)",
    date: "July 08, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80",
    sections: [
      {
        heading: "Why Starvation Diets Fail",
        intro: "Postpartum depletion and metabolic sluggishness are clinical realities. When our bodies undergo high-stress windows (such as pregnancy, lactation, or high professional burnout), minerals are drawn directly from bones and tissues, leading to chronic fatigue, thyroid slowdown, and hormonal crashes.",
        text: "Restricting calories immediately to lose weight triggers high cortisol (stress hormone) signals, slowing down thyroid conversion and stalling your metabolism. Sustainable weight loss is built on protein-dense and mineral-sufficient nutrition, not extreme deprivation."
      },
      {
        heading: "Core Rebalancing Micronutrients",
        nutrients: [
          {
            name: "Iron",
            desc: "Transports oxygen throughout the body. Deficiencies lead to chronic exhaustion and brain fog.",
            sources: "Grass-fed meats, lentils, pumpkin seeds, dark leafy greens."
          },
          {
            name: "Zinc",
            desc: "Vital for enzyme systems, gut lining repair, immune function, and thyroid hormone synthesis.",
            sources: "Pumpkin seeds, sesame seeds, chickpeas, oysters."
          },
          {
            name: "Magnesium",
            desc: "Calms the nervous system, supports sleep architecture, and reduces stress-induced sugar cravings.",
            sources: "Cacao nibs, almonds, spinach, avocado."
          }
        ]
      },
      {
        heading: "Dt. Pragati's Rule: Warm & Digestible",
        text: "When recovering from burnout or birth, prioritize warm, slow-cooked foods. Sluggish digestion cannot process raw, cold foods efficiently. Warm broths, grain bowls, and slow-cooked oats are excellent vessels for rebuilding tissue gently."
      }
    ]
  },
  {
    id: 3,
    title: "Circadian Rhythm Reset: Manage Cortisol, Mood, and Sleep",
    excerpt: "Nervous system fatigue is real. Read our doula's practical tips for resetting your biological clock and managing daily cortisol spikes.",
    category: "Mindfulness",
    author: "Sarah Jenkins (Certified Doula)",
    date: "June 28, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80",
    sections: [
      {
        heading: "Nervous System Reset Exercises",
        intro: "Managing the emotional and physical demands of motherhood or career stress requires a well-supported nervous system. When sleep is interrupted or stress levels remain high, our stress hormone (cortisol) remains elevated, disrupting progesterone levels and leading to mood swings.",
        exercises: [
          {
            title: "Vagal Breathing (4-7-8 Technique)",
            desc: "Inhale for 4 seconds, hold for 7 seconds, and exhale slowly for 8 seconds. This directly activates the vagus nerve to slow down your heart rate and lower stress hormones instantly."
          },
          {
            title: "Circadian Sun Exposure",
            desc: "Step outside for 10 minutes in the morning light. Early sun exposure halts melatonin production and resets your internal biological clock, helping you fall asleep faster at night."
          },
          {
            title: "Guided Body Scans",
            desc: "Before bed, practice a 5-minute progressive muscle relaxation body scan to release stored physical tension in the jaw, shoulders, and lower back."
          }
        ]
      }
    ]
  }
];

export const BLOG_RECIPE_CONTENT = {
  sectionTitle: "Healthy Recipe Spot",
  sectionDesc: "Nutrition is a key pillar of energy restoration. Try our healthy hormone balancing recipe of the month.",
  badge: "Metabolic Superfood",
  badgeSubtitle: "Recipe of the Month",
  title: "Thyroid & Metabolic Healing Oats",
  desc: "Warm, mineral-dense oats packed with trace elements to support hormone mapping, active metabolism, and energy reserves.",
  image: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?auto=format&fit=crop&w=600&q=80",
  prep: "5 mins",
  cook: "10 mins",
  servings: "1 Serving",
  tabs: [
    { key: "ingredients", label: "Ingredients" },
    { key: "instructions", label: "Instructions" },
    { key: "nutrition", label: "Nutritional Value" }
  ],
  ingredients: [
    "1/2 cup Organic rolled oats (slow carbs & fiber)",
    "1 cup Unsweetened almond milk (hydration base)",
    "1 tbsp Ground flaxseeds (healthy omega-3 fats)",
    "1 tbsp Chia seeds (mineral binding & digestion)",
    "1 tbsp Pumpkin seeds (zinc for thyroid conversion)",
    "1/4 cup Walnuts (healthy brain fats)",
    "1 tbsp Raw honey (natural energy catalyst)",
    "Pinch of sea salt and cinnamon (warming metabolic spices)"
  ],
  instructions: [
    "Combine rolled oats, almond milk, cinnamon, and a pinch of salt in a saucepan.",
    "Bring to a gentle boil, then simmer on low for 6-8 minutes, stirring occasionally until creamy.",
    "Remove from heat. Stir in ground flaxseeds and chia seeds until incorporated.",
    "Pour into a bowl. Top with walnuts, pumpkin seeds, raw honey, and fresh berries.",
    "Eat warm to optimize digestive enzyme absorption."
  ],
  nutrition: [
    { label: "Calories", val: "390 kcal" },
    { label: "Protein", val: "11g" },
    { label: "Zinc", val: "18% DV" },
    { label: "Fiber", val: "9g" },
    { label: "Omega-3", val: "2.3g" }
  ]
};
