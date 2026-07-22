import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, ArrowRight, Apple, Activity, Heart, Shield, Plus, Minus, X, AlertCircle } from 'lucide-react';
import './Services.css';

const PROGRAMS_DATA = [
  {
    id: 'diet',
    title: "Customized Diet Program",
    subtitle: "Rebuild Your Eating Patterns & Drop the Weight of Inconsistency",
    description: "Whether it's your bodyweight or it is the weight of procrastination, inconsistency, low motivation levels, work-life imbalance, judgments, or simply not knowing where to start. This program will help you not just in losing weight but also in dropping the burden of achieving that weight loss. Don't let this extra weight pull you back.",
    icon: <Apple size={24} />,
    bestFor: [
      "Weight Loss & Fat Reduction",
      "PCOD & PCOS Reversal",
      "Thyroid & Metabolic Sluggishness",
      "Diabetes & BP Management",
      "Pregnancy & Prenatal Nutrition",
      "Lifestyle Correction & Stress Eating"
    ],
    keyPoints: [
      "Dedicated Personal Nutritionist guiding you daily",
      "Personalized diet plan every week (7 days plan, no repetition)",
      "Simple, home-cooked diet plans (with quantities, calories and nutritional details)",
      "Weekly video consultation call with coach (In-depth analysis, motivation and Q&A)",
      "Consultation Notes delivered after every review call",
      "Dedicated chat support with your coach for 9 hours (Mon to Sat)",
      "28 days structured Grocery plan to take the guessing work away",
      "Option to choose workout plans (Home workout or Yoga)",
      "Special meal planning templates for travel, holidays, festivals, and weddings",
      "Weekly motivation activities & powerful affirmations to manifest your fitness goals",
      "Lifetime access to the 1Stepmore Premium Community"
    ],
    pricing: [
      { weeks: 4, original: 3999, offer: 2500 },
      { weeks: 8, original: 7900, offer: 4900 },
      { weeks: 12, original: 11900, offer: 6500 },
      { weeks: 24, original: 23900, offer: 9900 },
      { weeks: 48, original: 47800, offer: 19900 }
    ]
  },
  {
    id: 'child',
    title: "Customized Child Nutrition",
    subtitle: "Healthy Growth & Immunity Starts with the Right Nutrition",
    description: "Every child is unique, and so are their nutritional needs. Our customized child nutrition program is designed to support healthy growth, improve immunity, build healthy eating habits, and address parental concerns like underweight, overweight, picky eating, low immunity, and nutritional deficiencies.",
    icon: <Heart size={24} />,
    bestFor: [
      "Underweight Children",
      "Overweight & Childhood Obesity",
      "Picky Eaters & Meal Refusals",
      "Low Immunity & Frequent Illness",
      "Poor Appetite & Brain Fog",
      "Nutritional Deficiencies & Active Growth"
    ],
    keyPoints: [
      "Personalized Child Diet Plan based on age, height, weight & goals",
      "Easy-to-follow, delicious home-cooked child-friendly meal plans",
      "Weekly Progress Review and diet modifications as the child grows",
      "Comprehensive growth & weight monitoring schedules",
      "Healthy snack and home-made treats recommendations",
      "Creative School Tiffin / Lunchbox meal ideas children love",
      "Direct Parent Nutrition Guidance & mindset coaching for meal times",
      "WhatsApp Support with your child nutritionist",
      "Lifestyle, sleep, and hydration trackers",
      "Focus on building sustainable healthy eating habits early in life"
    ],
    pricing: [
      { weeks: 4, original: 2000, offer: 1500 },
      { weeks: 8, original: 4000, offer: 2800 },
      { weeks: 12, original: 6000, offer: 3900 },
      { weeks: 24, original: 12000, offer: 6900 },
      { weeks: 48, original: 24000, offer: 11900 } // Sane default instead of typo 1900
    ]
  },
  {
    id: 'group-yoga',
    title: "Yoga & Beyond (Group Sessions)",
    subtitle: "Transform Your Health Through Traditional Yoga & Breathwork",
    description: "Experience expert-guided online yoga sessions designed to improve flexibility, strength, posture, mobility, and overall well-being. Whether you're a beginner or an experienced practitioner, our certified yoga trainers will help you achieve your health goals with a structured and progressive group environment.",
    icon: <Activity size={24} />,
    bestFor: [
      "Body Flexibility & Mobility",
      "Chronic Back, Neck & Shoulder Pain",
      "Stress Management & Anxiety Relief",
      "PCOD/PCOS & Thyroid Balance",
      "Core Stabilization & Balance",
      "General Fitness & Mindful Living"
    ],
    keyPoints: [
      "Live interactive online group classes (Monday to Friday)",
      "Certified and experienced Yoga Trainer guidance",
      "Beginner-friendly progressive class designs",
      "Strength, Mobility & Flexibility focus in each flow",
      "Deep breathing practices (Pranayama) to calm hyperactive nervous system",
      "Meditation & deep relaxation techniques",
      "Posture correction audits with live trainer feedback",
      "Consistent progress tracking reviews",
      "WhatsApp community and support circles",
      "Session recordings available for catch-ups"
    ],
    pricing: [
      { weeks: 4, original: 1999, offer: 999 },
      { weeks: 8, original: 3999, offer: 1799 },
      { weeks: 12, original: 5999, offer: 2499 },
      { weeks: 24, original: 11999, offer: 4499 },
      { weeks: 48, original: 23999, offer: 7999 }
    ]
  },
  {
    id: 'one-yoga',
    title: "1:1 Live Personal Yoga",
    subtitle: "Eliminate Root Causes & Recover Your Health Happily",
    description: "Weight loss or healthy weight loss—just losing weight should not be the goal. Eliminating the root cause of unwanted fat and repairing the entire machine called the body is the right way. Join this program if you want to lose weight happily and sustain it, where we provide you the right workout and amazing non-repetitive yoga sessions to lose that unwanted weight with a bonus of improved nervous system, gut, and mental health.",
    icon: <Activity size={24} />,
    bestFor: [
      "Custom Weight Loss & Toning",
      "Back, Neck & Spine Alignment",
      "PCOS/PCOD & Hormonal Mapping",
      "Thyroid Disorders & Metabolic Fatigue",
      "Diabetes Management",
      "Postnatal Recovery & Pelvic Floor Strength",
      "Stress, Anxiety & Deep Insomnia",
      "Senior Citizens & Joint Support"
    ],
    keyPoints: [
      "One-on-One Live Yoga Sessions with 1Stepmore Yoga Coach",
      "100% personalized Yoga Plan adjusted for your joints & fitness level",
      "Flexible session timing according to your schedule",
      "Weekly progress assessment and physical feedback reviews",
      "Tailored practice focusing on clinical health goals (back pain, thyroid)",
      "Dedicated Pranayama & meditation segments",
      "Circadian lifestyle guidance and posture correction",
      "Priority trainer assistance & direct WhatsApp support",
      "Ashtanga, Hatha, and Power Yoga combined flows",
      "Weight loss special targeted workouts",
      "Access to 1Stepmore premium community"
    ],
    pricing: [
      { weeks: 4, original: 4999, offer: 2999 },
      { weeks: 8, original: 9999, offer: 5499 },
      { weeks: 12, original: 14999, offer: 7999 },
      { weeks: 24, original: 29999, offer: 14999 },
      { weeks: 48, original: 59999, offer: 27999 }
    ]
  },
  {
    id: 'combo',
    title: "Diet & Group Yoga Combo",
    subtitle: "Eat Right. Move Better. Live Healthier.",
    description: "Achieve your health goals with a complete wellness program that combines a personalized diet plan with live group yoga sessions. Get the best of both worlds: clinical nutrition assessments and daily movement flows, along with expert guidance, regular follow-ups, and a sustainable approach to healthy living.",
    icon: <Shield size={24} />,
    bestFor: [
      "Comprehensive Fat Loss & Toning",
      "Hormonal Balancing (PCOS/PCOD/Thyroid)",
      "Metabolic Boost & Diabetes Control",
      "Stress Management & Anxiety Reset",
      "Core & Spine Alignment Rehabilitation",
      "Overall Fitness & Wellness Lifestyles"
    ],
    keyPoints: [
      "Customized Clinical Diet Plan (7-day non-repetitive cycles)",
      "Live Group Yoga Sessions (Monday to Friday)",
      "Weekly dietitian review and diet plan modifications",
      "Mobility, strength, flexibility, & alignment training",
      "Pranayama & deep stress-release meditation",
      "Healthy lifestyle coaching & circadian habit setups",
      "Joint guidance by Certified Nutritionist & Certified Yoga Trainer",
      "Continuous WhatsApp Support and progress tracking",
      "Access to 1Stepmore Premium community circles"
    ],
    pricing: [
      { weeks: 4, original: 4499, offer: 2999 },
      { weeks: 8, original: 8899, offer: 5999 },
      { weeks: 12, original: 12499, offer: 7999 },
      { weeks: 24, original: 21899, offer: 11999 },
      { weeks: 48, original: 43899, offer: 21999 }
    ]
  }
];

const FAQS_DATA = [
  {
    q: "What kind of food will be given in the meal plan?",
    a: "Our diet plans include basic home-based food that is easily accessible. No fancy fat cutter drinks, expensive exotic ingredients, or fad supplements are required. We focus on clean, home-cooked Indian meals."
  },
  {
    q: "How frequently will my diet change?",
    a: "A new diet chart will be given every week (every 7 days). Your nutritionist will review your previous week's progress, sleep patterns, energy levels, and measurements before tailoring the next chart to prevent plateaus."
  },
  {
    q: "I have tried a lot of diet programs in the past but nothing worked or I gained back the weight. How is your program different?",
    a: "We reject crash dieting. Through this program, we work directly on your daily eating patterns and lifestyle habit loops. The meals promote traditional, home-cooked food. We educate you to understand your body's requirements so you can sustain your weight loss for the rest of your life."
  },
  {
    q: "How much weight can I lose in one month?",
    a: "There is no fixed answer as it depends on your starting weight, activity level, and compliance. On average, clients who follow our personalized plans precisely lose up to 5kg of fat in a month safely and healthily."
  },
  {
    q: "How soon will I see results?",
    a: "Just as eating poorly affects the body immediately, so does eating clean. While weight scales take a few weeks to show major drops, you will start feeling lighter, more energetic, and observe reduced bloating within a week or two."
  },
  {
    q: "What kind of exercise is recommended?",
    a: "We recommend any form of movement that challenges you and is enjoyable, such as strength training, HIIT, walking, running, or yoga. For our yoga plans, our certified trainer corrects your alignment in real-time."
  }
];

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'diet');
  const [selectedDurations, setSelectedDurations] = useState({
    diet: 12,
    child: 12,
    'group-yoga': 12,
    'one-yoga': 12,
    combo: 12
  });
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const activeProgram = PROGRAMS_DATA.find(p => p.id === activeTab);
  const selectedDuration = selectedDurations[activeTab];
  const activePricing = activeProgram.pricing.find(pr => pr.weeks === selectedDuration) || activeProgram.pricing[2];

  const handleDurationChange = (progId, weeks) => {
    setSelectedDurations(prev => ({
      ...prev,
      [progId]: weeks
    }));
  };

  const calculateSavings = (orig, off) => {
    return orig - off;
  };

  return (
    <main className="services-main">
      {/* Services Hero */}
      <section className="section container services-hero-section">
        <div className="section-header services-header">
          <span className="section-tag">OUR STRUCTURED PROGRAMS</span>
          <h1 className="services-title">Find the Right Program for <span>Your Journey</span></h1>
          <p className="section-description">
            Choose your focus area and select a duration tier. All diet plans are clinical-nutritionist certified, and all yoga classes are live-guided.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="services-tabs-container">
          {PROGRAMS_DATA.map((prog) => (
            <button
              key={prog.id}
              onClick={() => setActiveTab(prog.id)}
              className={`filter-btn ${activeTab === prog.id ? 'active' : ''} services-tab-btn`}
            >
              {prog.icon}
              {prog.title}
            </button>
          ))}
        </div>

        {/* Tab Content Box */}
        <div className="services-content-card">
          <div className="services-grid about-hero-grid">
            
            {/* Left Content Column */}
            <div>
              <span className="section-tag">{activeProgram.title}</span>
              <h2 className="services-subtitle">
                {activeProgram.subtitle}
              </h2>
              <p className="services-desc">
                {activeProgram.description}
              </p>

              <h3 className="services-section-title">
                {activeTab === 'child' ? 'Best Suited For Children With:' : 'Ideal For Addressing:'}
              </h3>
              <div className="services-best-for-grid">
                {activeProgram.bestFor.map((item, idx) => (
                  <div key={idx} className="services-best-for-item">
                    <div className="services-bullet-dot"></div>
                    {item}
                  </div>
                ))}
              </div>

              <h3 className="services-section-title alt">
                What's Included in the Program:
              </h3>
              <ul className="modal-list services-included-list">
                {activeProgram.keyPoints.map((point, idx) => (
                  <li key={idx} className="modal-list-item services-included-item">
                    <Check size={18} color="var(--primary)" className="services-check-icon" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Interactive Calculator Column */}
            <div className="services-calc-card">
              <div>
                <h3 className="services-calc-title">
                  Choose Program Duration:
                </h3>
                <p className="services-calc-subtitle">
                  Longer plans include deeper metabolic resetting and better value.
                </p>

                {/* Duration Pills */}
                <div className="services-duration-grid">
                  {activeProgram.pricing.map((price) => (
                    <button
                      key={price.weeks}
                      onClick={() => handleDurationChange(activeTab, price.weeks)}
                      className={`services-duration-btn ${selectedDuration === price.weeks ? 'active' : ''}`}
                    >
                      {price.weeks} W
                    </button>
                  ))}
                </div>

                {/* Pricing Output Panel */}
                <div className="services-pricing-panel">
                  <div className="services-pricing-row">
                    <span className="services-pricing-label">Original Price:</span>
                    <span className="services-original-price">
                      ₹{activePricing.original.toLocaleString('en-IN')}/-
                    </span>
                  </div>

                  <div className="services-pricing-row-main">
                    <span className="services-offer-label">Special Offer Price:</span>
                    <span className="services-offer-price">
                      ₹{activePricing.offer.toLocaleString('en-IN')}/-
                    </span>
                  </div>

                  <div className="services-savings-badge">
                    Instant Savings of ₹{calculateSavings(activePricing.original, activePricing.offer).toLocaleString('en-IN')}/- ({Math.round(((activePricing.original - activePricing.offer) / activePricing.original) * 100)}% Off)
                  </div>
                </div>
              </div>

              {/* Consultation CTA */}
              <button
                onClick={() => navigate('/enroll', { state: { program: activeTab, weeks: selectedDuration } })}
                className="btn btn-primary services-enroll-btn"
              >
                Enroll / Consult on this Plan <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Program FAQs Section */}
      <section className="section services-faq-section">
        <div className="container services-faq-container">
          <div className="section-header">
            <span className="section-tag">FAQ & TRANSPARENCY</span>
            <h2>Frequently Asked Questions</h2>
            <p>We believe in sustainability and zero hidden boundaries. Read our guidelines directly.</p>
          </div>

          <div className="services-faq-list">
            {FAQS_DATA.map((faq, idx) => (
              <div key={idx} className="services-faq-item">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="services-faq-trigger"
                >
                  <span className="services-faq-question">
                    {faq.q}
                  </span>
                  <div className={`services-faq-icon ${openFaqIndex === idx ? 'active' : ''}`}>
                    {openFaqIndex === idx ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                {openFaqIndex === idx && (
                  <div className="services-faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default Services;
