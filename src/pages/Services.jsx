import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Check, ArrowRight, Apple, Activity, Heart, Shield, 
  Plus, Minus, Star, Users, ShieldCheck, Sparkles, PhoneCall,
  ChevronDown, Calendar
} from 'lucide-react';
import './Services.css';

const PROGRAMS_DATA = [
  {
    id: 'diet',
    title: "CUSTOMIZED DIET PROGRAM",
    tabLabel: "Customized Diet",
    category: "Nutrition & Metabolic Health",
    badge: "✨ Most Popular For Women",
    badgeColor: "var(--primary)",
    image: '/assets/images/programs/diet.webp',
    enrolledCount: '31,784+',
    rating: '4.9',
    reviewsCount: '1,420',
    description: "Whether it's your bodyweight or it is the weight of procrastination, inconsistency, low motivation levels, work-life imbalance, judgments or simply not knowing where to start. This program will help you not just in losing weight but also in dropping the burden of achieving that weight loss. Don't let this extra weight pull you back. Go chase your goals and dreams.",
    bestFor: [
      "Weight Loss & Belly Fat Reduction",
      "PCOD / PCOS Reversal",
      "Thyroid Disorders",
      "Diabetes & BP Management",
      "Postpartum Fat Loss & Recovery",
      "Stress Eating & Gut Healing"
    ],
    keyPoints: [
      "Dedicated Nutritionist",
      "Personalized diet plan every week (7 days plan, no repetition)",
      "Simple Diet Plan (with quantities, calories and nutritional details)",
      "Customization for Medical conditions (like PCOD, Diabetes, Thyroid, BP, Pregnancy, Stress, Kidney, Liver disorders etc)",
      "Video consultation call with coach every week",
      "Weekly Counselling Call (In-depth analysis, motivation and Q&A)",
      "Consultation Notes after every call",
      "Dedicated chat support with your coach for 9 hours (Mon to Sat)",
      "28 days Grocery plan",
      "Option to choose workout plans (Home or yoga)",
      "Special meal planning for travel, holidays, festivals, weddings etc.",
      "Weekly fun activities for Motivation",
      "Powerful affirmations to help you manifest your fitness goals",
      "Lifetime access to the 1 Step More Premium Community"
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
    title: "CUSTOMIZED CHILD NUTRITION PROGRAM",
    tabLabel: "Child Nutrition",
    category: "Child Growth & Immunity",
    badge: "🔥 Healthy Growth Starts With Right Nutrition",
    badgeColor: "#F57C00",
    image: '/assets/images/programs/child.webp',
    enrolledCount: '14,250+',
    rating: '4.9',
    reviewsCount: '890',
    description: "Healthy Growth Starts with the Right Nutrition. Every child is unique, and so are their nutritional needs. Our customized child nutrition program is designed to support healthy growth, improve immunity, build healthy eating habits, and address concerns like underweight, overweight, picky eating, low immunity, and nutritional deficiencies.",
    bestFor: [
      "Underweight Children",
      "Overweight & Childhood Obesity",
      "Picky Eaters & Poor Appetite",
      "Low Immunity & Frequent Illness",
      "Nutritional Deficiencies",
      "Healthy Growth & Development"
    ],
    keyPoints: [
      "Personalized Child Diet Plan based on child's age, height, weight & health goals",
      "Easy-to-follow, home-cooked meal plans",
      "Weekly Progress Review & plan modifications",
      "Growth & Weight Monitoring",
      "Healthy Snack Recommendations",
      "School Tiffin Meal Ideas",
      "Parent Nutrition Guidance",
      "Dedicated WhatsApp Support",
      "Lifestyle & Hydration Guidance",
      "Sustainable Healthy Eating Habits (no temporary diets)"
    ],
    pricing: [
      { weeks: 4, original: 2000, offer: 1500 },
      { weeks: 8, original: 4000, offer: 2800 },
      { weeks: 12, original: 6000, offer: 3900 },
      { weeks: 24, original: 12000, offer: 6900 },
      { weeks: 48, original: 24000, offer: 11900 }
    ]
  },
  {
    id: 'group-yoga',
    title: "YOGA & BEYOND - GROUP SESSIONS",
    tabLabel: "Live Group Yoga",
    category: "Traditional Yoga & Breathwork",
    badge: "🧘‍♀️ Live Interactive Online Classes",
    badgeColor: "#0284C7",
    image: '/assets/images/programs/yoga.webp',
    enrolledCount: '22,900+',
    rating: '4.8',
    reviewsCount: '1,120',
    description: "Transform Your Health Through Traditional Yoga. Experience expert-guided online yoga sessions designed to improve flexibility, strength, posture, mobility, and overall well-being. Whether you're a beginner or an experienced practitioner, our certified yoga trainers will help you achieve your health goals with a structured and personalized approach.",
    bestFor: [
      "Weight Loss & Fat Burning",
      "Back & Neck Pain Relief",
      "Flexibility & Mobility",
      "Stress Management & Relaxation",
      "PCOD / PCOS & Thyroid Balance",
      "Overall Fitness & Posture"
    ],
    keyPoints: [
      "Live Group Yoga Sessions (Monday–Friday)",
      "Certified Yoga Trainer guidance",
      "Beginner-Friendly Classes & progressive flows",
      "Strength, Mobility & Flexibility Training",
      "Breathing Practices (Pranayama)",
      "Meditation & Deep Relaxation",
      "Posture Correction & alignment audits",
      "Consistent Progress Tracking",
      "WhatsApp Support Circle",
      "Session Recordings for flexible access"
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
    title: "CUSTOMIZED YOGA PROGRAM WITH LIVE 1:1 SESSIONS",
    tabLabel: "1:1 Personal Yoga",
    category: "1-on-1 Personal Yoga Program",
    badge: "⭐ 1:1 Private Trainer Attention",
    badgeColor: "#8B5CF6",
    image: '/assets/images/programs/weight.webp',
    enrolledCount: '9,840+',
    rating: '5.0',
    reviewsCount: '650',
    description: "Weight loss or Healthy weight loss. Just losing weight should not be the goal. But, eliminating the root cause of unwanted fat and repairing the entire machine called body is the right way. Join this program if you want to lose weight happily and sustain it, where we provide you the right workout and amazing non-repetitive yoga sessions to lose that unwanted weight with bonus of improved nervous system, gut and mental health.",
    bestFor: [
      "Weight Loss & Stubborn Fat",
      "Back & Neck Pain Rehabilitation",
      "PCOS / PCOD & Thyroid Disorders",
      "Diabetes Management",
      "Stress & Anxiety Relief",
      "Postnatal Recovery & Pelvic Strength",
      "Senior Citizens Gentle Mobility",
      "Flexibility & Overall Wellness"
    ],
    keyPoints: [
      "One-on-One Live Yoga Sessions with 1 Step More Yoga Coach",
      "Personalized Yoga Plan tailored for your health goals",
      "Flexible Session Timing based on your schedule",
      "Weekly Progress Assessment & posture review",
      "Customized Practice for Your Health Goals",
      "Pranayama & Meditation for nervous system calming",
      "Lifestyle Guidance & Posture Correction",
      "Priority Trainer Assistance & WhatsApp Support",
      "Technique & Alignment Correction",
      "Ashtanga, Hatha and Power Yoga Sessions",
      "Weight loss special targeted workouts",
      "Lifetime access to 1 Step More Premium Community"
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
    title: "CUSTOMIZED DIET AND GROUP LIVE YOGA SESSIONS",
    tabLabel: "Diet & Yoga Combo",
    category: "Complete Wellness Program",
    badge: "⚡ Complete 360° Transformation",
    badgeColor: "#10B981",
    image: '/assets/images/programs/lifestyle.webp',
    enrolledCount: '18,600+',
    rating: '4.9',
    reviewsCount: '980',
    description: "Eat Right. Move Better. Live Healthier. Achieve your health goals with a complete wellness program that combines a personalized diet plan with live group yoga sessions. Get expert guidance, regular follow-ups, and a sustainable approach to healthy living.",
    bestFor: [
      "Weight Loss & Fat Loss",
      "PCOS / PCOD Reversal",
      "Thyroid Disorders",
      "Diabetes Management",
      "Stress Management",
      "Back Pain Relief",
      "Overall Fitness & Lifelong Wellness"
    ],
    keyPoints: [
      "Customized Diet Plan tailored to your metabolic needs",
      "Live Group Yoga Sessions (Monday–Friday)",
      "Weekly Diet Review & follow-ups",
      "Regular Diet Plan Modifications",
      "Pranayama & Guided Meditation",
      "Mobility, Strength & Flexibility Training",
      "Healthy Lifestyle Coaching",
      "Dedicated WhatsApp Support",
      "Guidance by Certified Nutritionist & Certified Yoga Trainer"
    ],
    pricing: [
      { weeks: 4, original: 4499, offer: 2999 },
      { weeks: 8, original: 8899, offer: 5999 },
      { weeks: 12, original: 12499, offer: 7999 },
      { weeks: 24, original: 21899, offer: 11999 },
      { weeks: 48, original: 43899, offer: 21999 }
    ]
  },
  {
    id: 'gut-detox',
    title: "10 DAYS GUT CLEANING DETOX PLAN",
    tabLabel: "Gut Detox (₹699)",
    category: "Digestive Wellness & Microbiome Reset",
    badge: "🍃 Special Detox Offer - Flat ₹699",
    badgeColor: "#16A34A",
    image: '/assets/images/programs/gut-detox.webp',
    enrolledCount: '8,450+',
    rating: '5.0',
    reviewsCount: '620',
    description: "Reboot your digestion, flush out toxic waste, and reset sluggish metabolism with our intensive 10-Day Gut Cleaning Detox Plan. Guided by clinical nutrition science, this program heals chronic bloating, balances gut flora, and restores daily vitality—all through 100% home-cooked gut healing meals and targeted detox recipes.",
    bestFor: [
      "Chronic Bloating, Gas & Acidity",
      "Sluggish Metabolism & Weight Loss Resistance",
      "Irregular Digestion & Constipation",
      "Post-Festive / Post-Vacation Heavy Detox",
      "Low Daily Energy & Digestive Fatigue",
      "Skin Breakouts Linked to Poor Gut Health"
    ],
    keyPoints: [
      "Free one-on-one initial consultation",
      "1 Live Gut Education Session on Zoom (Deep dive & Q&A)",
      "Personalised gut-friendly daily diet plan",
      "2 Days Free Detox Plan (Bonus cleansing booster)",
      "Full-time chat and call support throughout the 10 days",
      "Exclusive Gut Reset drink & herbal infusion recipes",
      "Gut-friendly low-impact workout & stretch routine",
      "Nutrition guidance for nourishing healthy gut bacteria",
      "100% natural, home-cooked food (no chemical laxatives or pills)"
    ],
    pricing: [
      { weeks: 1.4, days: 10, label: "10 Days Detox Plan (Special ₹699)", original: 1499, offer: 699 }
    ]
  }
];

const FAQS_DATA = [
  {
    q: "Q1) What kind of food will be given in the meal plan?",
    a: "Our diet plans include basic home-based food. No fat cutter drinks or fad supplements."
  },
  {
    q: "Q2) How frequently will my diet change?",
    a: "A new diet will be given every week. A Diet chart will be created on the basis of careful review of the previous week’s progress."
  },
  {
    q: "Q3) I have tried a lot of diet programs in past but nothing worked or gained back the weight. How is your program any different?",
    a: "We believe in sustainability and hence through this program, we work on your eating patterns and lifestyle. The meals provided promote home-cooked Indian food items. We educate our clients to understand their body's requirements and enable them to understand their own body and its requirements. Getting fitter, feeling transformed, and believing in sustainable wellness is what 1 Step More truly stands for."
  },
  {
    q: "Q4) How much weight can I lose in one month?",
    a: "There is no fixed answer to this question. It depends on your current weight and how precisely you follow the given plans. On an average people who enrol with us lose upto 5kg in a month."
  },
  {
    q: "Q5) How soon will I see results?",
    a: "Just as eating wrong has an immediate effect on the body, so does eating correct. It might not be a measurable effect but you will start feeling better, more energetic and shrunk within a week or two of following the diet and exercising. Weight loss or rather fat loss, is a by-product. If you follow the plan, results will follow you back."
  },
  {
    q: "Q6) What kind of exercise is recommended?",
    a: "Any form of exercise like strength training, HIIT, running, yoga etc. which is challenging and enjoyable for you is recommended. There is no definite answer to these questions. Everybody is different and so are its needs."
  }
];

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(location.state?.tab || 'diet');
  const [selectedDurations, setSelectedDurations] = useState({
    diet: 4,
    child: 4,
    'group-yoga': 4,
    'one-yoga': 4,
    combo: 4,
    'gut-detox': 1.4
  });
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Update tab if location state changes (e.g. from homepage card navigation)
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  const activeProgram = PROGRAMS_DATA.find(p => p.id === activeTab) || PROGRAMS_DATA[0];
  const selectedDuration = selectedDurations[activeTab] || (activeProgram.pricing[0]?.weeks || 4);
  const activePricing = activeProgram.pricing.find(pr => pr.weeks === selectedDuration) || activeProgram.pricing[0];

  const handleDurationChange = (progId, weeks) => {
    setSelectedDurations(prev => ({
      ...prev,
      [progId]: Number(weeks)
    }));
  };

  const handleEnrollClick = () => {
    navigate('/enroll', { 
      state: { 
        program: activeTab, 
        programId: activeTab, 
        weeks: selectedDuration, 
        duration: selectedDuration 
      } 
    });
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const savings = activePricing.original - activePricing.offer;
  const discountPercent = Math.round((savings / activePricing.original) * 100);

  return (
    <main className="services-main">
      {/* Services Hero Header */}
      <section className="services-hero-section">
        <div className="container">
          <div className="section-header services-header">
            <span className="section-tag">OUR STRUCTURED PROGRAMS</span>
            <h1 className="services-title">Choose Your Path to <span>Lasting Health</span></h1>
            <p className="section-description">
              Select a program to view full plan details, live coaching inclusions, and duration pricing tiers.
            </p>
          </div>

          {/* Program Switcher Tabs */}
          <div className="programs-nav-tabs">
            {PROGRAMS_DATA.map((prog) => {
              const isChild = prog.id === 'child';
              const isDetox = prog.id === 'gut-detox';
              const isActive = activeTab === prog.id;
              return (
                <button
                  key={prog.id}
                  onClick={() => setActiveTab(prog.id)}
                  className={`program-nav-tab ${isActive ? 'active' : ''} ${isChild ? 'trending-tab' : ''} ${isDetox ? 'detox-tab' : ''}`}
                >
                  {isChild && <span className="trending-pill">🔥 Trending</span>}
                  {isDetox && <span className="trending-pill" style={{ background: '#16A34A', color: '#fff' }}>🍃 ₹699</span>}
                  <span className="tab-title">{prog.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* 1. Main Showcase Hero Banner (1 Step More Brand Theme) */}
          <div className="showcase-banner-card">
            <div className="showcase-banner-grid">

              {/* Left Column: High-Res Program Picture */}
              <div className="showcase-image-col">
                <div className="showcase-img-wrap">
                  <img
                    src={activeProgram.image}
                    alt={activeProgram.title}
                    className="showcase-main-img"
                  />
                  <div className="showcase-img-badge">
                    {activeProgram.badge}
                  </div>
                </div>
                <div className="showcase-social-proof">
                  <div className="proof-item">
                    <Users size={15} color="var(--primary)" />
                    <span>Already Enrolled ({activeProgram.enrolledCount})</span>
                  </div>
                  <div className="proof-item">
                    <Star size={15} color="var(--secondary)" fill="var(--secondary)" />
                    <span>{activeProgram.rating} ({activeProgram.reviewsCount})</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Program Details, Pricing & Duration */}
              <div className="showcase-details-col">
                <span
                  className="showcase-tag-badge"
                  style={{
                    backgroundColor: activeTab === 'child' ? 'rgba(245, 124, 0, 0.1)' : activeTab === 'gut-detox' ? 'rgba(22, 163, 74, 0.1)' : 'rgba(46, 125, 50, 0.1)',
                    color: activeTab === 'child' ? 'var(--secondary)' : activeTab === 'gut-detox' ? '#16A34A' : 'var(--primary)',
                    borderColor: activeTab === 'child' ? 'rgba(245, 124, 0, 0.25)' : activeTab === 'gut-detox' ? 'rgba(22, 163, 74, 0.25)' : 'rgba(46, 125, 50, 0.25)'
                  }}
                >
                  {activeProgram.badge}
                </span>

                <h2 className="showcase-prog-title">
                  {activeProgram.title}
                </h2>

                <p className="showcase-prog-desc">
                  {activeProgram.description}
                </p>

                {/* Price & Duration Row */}
                <div className="showcase-pricing-box">
                  <div className="showcase-price-wrap">
                    <span className="showcase-offer-price">
                      RS. {activePricing.offer.toLocaleString('en-IN')}/-
                    </span>
                    <span className="showcase-orig-price">
                      ₹{activePricing.original.toLocaleString('en-IN')}
                    </span>
                    <span className="showcase-save-badge">
                      {discountPercent}% OFF
                    </span>
                  </div>

                  {/* Styled Duration Dropdown Selector */}
                  <div className="showcase-duration-selector">
                    <label htmlFor="duration-select-main" className="duration-label">Plan Duration:</label>
                    <div className="select-container">
                      <select
                        id="duration-select-main"
                        value={selectedDuration}
                        onChange={(e) => handleDurationChange(activeTab, Number(e.target.value))}
                        className="styled-duration-select"
                      >
                        {activeProgram.pricing.map((tier) => (
                          <option key={tier.weeks} value={tier.weeks}>
                            {tier.label ? tier.label : `${tier.weeks} Week Plan (${tier.weeks * 7} Days)`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Big Prominent Brand Enroll CTA Button */}
                <div className="showcase-cta-wrap">
                  <button
                    onClick={handleEnrollClick}
                    className="showcase-enroll-btn"
                  >
                    Enroll Now <ArrowRight size={18} />
                  </button>
                  <span className="showcase-guarantee-text">
                    <ShieldCheck size={16} color="var(--primary)" /> 100% Certified Nutritionists & Experienced Yoga Coaches
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* 2. Key Points Section (Matching Theme) */}
          <div className="showcase-keypoints-card">
            <div className="keypoints-header">
              <h3 className="keypoints-title">KEY POINTS</h3>
              <div className="keypoints-underline"></div>
              <p className="keypoints-subtitle">Everything included in your {activeProgram.title}:</p>
            </div>

            <div className="keypoints-grid">
              {activeProgram.keyPoints.map((point, index) => (
                <div key={index} className="keypoint-item">
                  <div className="keypoint-icon-box">
                    <Check size={15} strokeWidth={2.5} color="var(--primary)" />
                  </div>
                  <span className="keypoint-text">{point}</span>
                </div>
              ))}
            </div>

            {/* Best For Tags & Direct Consultation CTA */}
            <div className="keypoints-footer">
              <div className="keypoints-bestfor-wrap">
                <span className="bestfor-label">
                  {activeTab === 'child' ? 'Best For Children With:' : 'Ideal For Addressing:'}
                </span>
                <div className="bestfor-tags">
                  {activeProgram.bestFor.map((tag, idx) => (
                    <span key={idx} className="bestfor-pill">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="keypoints-actions">
                <button onClick={handleEnrollClick} className="btn btn-primary btn-sm">
                  Enroll In This Plan <ArrowRight size={15} />
                </button>
                <button onClick={() => navigate('/contact')} className="btn btn-outline btn-sm">
                  Book Free Consultation
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQs Section (Universal FAQ for all programs) */}
      <section className="section container services-faq-section">
        <div className="section-header">
          <span className="section-tag">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="section-title">Frequently Asked <span>Questions (FAQ)</span></h2>
          <p className="section-description">
            Everything you need to know about our nutritionist consultations, custom meal planning, and live yoga sessions.
          </p>
        </div>

        <div className="faq-accordion-wrapper">
          {FAQS_DATA.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openFaqIndex === index ? 'active' : ''}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <h4>{faq.q}</h4>
                <div className="faq-toggle-icon">
                  {openFaqIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
              {openFaqIndex === index && (
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Consultation CTA Banner */}
      <section className="services-bottom-cta">
        <div className="container">
          <div className="services-cta-box">
            <div className="services-cta-content">
              <h2>Still Unsure Which Plan Suits You Best?</h2>
              <p>
                Speak directly with <span className="brand-name"><span className="brand-step">1 Step</span> <span className="brand-more">More</span></span> founder Dt. Pragati Mishra for an initial health evaluation.
              </p>
            </div>
            <div className="services-cta-actions">
              <button onClick={() => navigate('/contact')} className="btn btn-secondary">
                <PhoneCall size={18} /> Book Free Call
              </button>
              <button onClick={() => navigate('/enroll', { state: { program: activeTab, weeks: selectedDuration } })} className="btn btn-outline-white">
                Enroll Now <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Services;
