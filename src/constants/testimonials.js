import client1Img from '../assets/images/testimonials/testimonial 1.webp';
import client2Img from '../assets/images/testimonials/testimonial 2.webp';
import client3Img from '../assets/images/testimonials/testimonial 3.webp';

export const TESTIMONIALS_HEADER = {
  tag: "REAL TRANSFORMATIONS, REAL RESULTS",
  titlePrefix: "Stories of Lasting Change with ",
  description: "See how our clients enrolled in our personalized weight loss programs and unlocked remarkable physical and mental breakthroughs—using 100% home-cooked food, mindful habits, and zero crash starvation."
};

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Pooja Sharma",
    location: "Delhi NCR",
    badge: "Week 0 ➔ Week 4 ➔ Week 8",
    resultTag: "-8.5 kg & 4 Inches Waist Loss",
    program: "Customized Weight Loss Program",
    duration: "8 Weeks",
    image: client1Img,
    stars: 5,
    quote: "Following Dt. Pragati's customized meal plan transformed my energy completely. No crash starving—just wholesome homemade Indian meals that my whole family could eat together. By week 8, my digestion was healed and I slipped back into my favorite sarees with pure confidence!",
    highlights: ["Zero crash dieting", "Improved gut health & digestion", "Sustainable home-cooked food"]
  },
  {
    id: 2,
    name: "Vikram Rawat",
    location: "Gurugram",
    badge: "Lifestyle & Metabolic Reset",
    resultTag: "-11 kg Fat Loss & High Stamina",
    program: "Weight Loss & Lifestyle Coaching",
    duration: "12 Weeks",
    image: client2Img,
    stars: 5,
    quote: "As a busy professional, irregular working hours and late snacking had completely derailed my health and weight. Pragati ma'am crafted a realistic diet that didn't disrupt my hectic work schedule. Dropped 11 kgs sustainably—and my constant sluggishness and acidity simply vanished.",
    highlights: ["High energy throughout workdays", "No expensive supplements", "Realistic habit design"]
  },
  {
    id: 3,
    name: "Sunita Maurya",
    location: "Mumbai",
    badge: "Size XXL ➔ Size L Transformation",
    resultTag: "Dropped 2 Dress Sizes",
    program: "Weight Loss & Inch Loss Program",
    duration: "8 Weeks",
    image: client3Img,
    stars: 5,
    quote: "I was stuck at Size XXL for more than 2 years despite trying random online crash diets. 1 Step More showed me how simple portion control, balanced macros, and daily routine tweaks create true magic. Going from XXL to L in just a few weeks without hunger was truly life-changing!",
    highlights: ["Significant inch loss", "Boosted confidence & mobility", "Long-term weight maintenance"]
  }
];

export const TESTIMONIALS_CTA = {
  subtitle: "READY TO WRITE YOUR OWN STORY?",
  title: "Take Your First Step Towards Sustainable Weight Loss",
  description: "Get an individualized nutrition and routine roadmap curated by Dt. Pragati Mishra tailored to your body type, metabolism, and lifestyle.",
  primaryBtnText: "Start Your Transformation",
  outlineBtnText: "Book Consultation"
};
