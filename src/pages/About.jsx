import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, ShieldCheck, Sparkles, Check, ArrowRight, ArrowLeft, 
  ChevronLeft, ChevronRight, Flower2, Salad, UserCheck, Flame,
  XCircle, CheckCircle2 
} from 'lucide-react';
import './About.css';
import slide1 from '../assets/images/about/slide 1.webp';
import slide2 from '../assets/images/about/slide 2.webp';
import slide3 from '../assets/images/about/slide 3.webp';
import slide4 from '../assets/images/about/slide 4.webp';

const CAROUSEL_SLIDES = [
  {
    image: slide1,
    badge: "🎤 Keynote & Wellness Seminars",
    title: "Empowering Communities Through Health",
    caption: "Educating and inspiring women on sustainable nutrition and active lifestyles at live wellness workshops."
  },
  {
    image: slide2,
    badge: "🎙️ Public Speaker & Panelist",
    title: "Advocating for Women's Wellness",
    caption: "Sharing clinical expertise, evidence-based nutrition insights, and real client success journeys at health forums."
  },
  {
    image: slide3,
    badge: "🏆 Recognition & Milestones",
    title: "Honored for Impact in Clinical Nutrition",
    caption: "Celebrating milestones, client trust, and leadership in holistic healthcare with the 1 Step More community."
  },
  {
    image: slide4,
    badge: "🎧 Podcast & Media Conversations",
    title: "Spreading Wellness Beyond Boundaries",
    caption: "Busting nutrition myths, sharing practical diet wisdom, and inspiring healthy daily habits through digital media."
  }
];

const About = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide transition every 2.5 seconds (2500ms)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  return (
    <main className="about-main">
      {/* ==========================================================================
          1. HERO SECTION WITH 2-3s AUTO-SLIDING CAROUSEL
          ========================================================================== */}
      <section className="about-hero-section section">
        <div className="container">
          <div className="about-hero-grid">
            
            {/* Left Content */}
            <div className="about-hero-content">
              <span className="about-hero-badge">
                <Sparkles size={15} /> Meet Dt. Pragati Mishra & 1 Step More
              </span>

              <h1 className="about-hero-title">
                Transforming Women & Mothers <span>Without Disrupting Life</span>
              </h1>

              <p className="about-hero-lead">
                Every healthy habit begins with one small step. We combine clinical nutrition, restorative yoga, and realistic lifestyle design created around the real rhythms of motherhood and modern life.
              </p>

              <div className="about-hero-chips">
                <div className="about-hero-chip">
                  <UserCheck size={16} /> 2000+ Women Guided
                </div>
                <div className="about-hero-chip">
                  <Salad size={16} /> 100% Home-Cooked Food
                </div>
                <div className="about-hero-chip">
                  <ShieldCheck size={16} /> Zero Crash Deprivation
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/services')} className="btn btn-primary">
                  Explore Programs <ArrowRight size={16} />
                </button>
                <button onClick={() => navigate('/contact')} className="btn btn-outline">
                  Book Consultation
                </button>
              </div>
            </div>

            {/* Right Auto-sliding Photo Carousel */}
            <div 
              className="about-carousel-card"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {CAROUSEL_SLIDES.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                  <div 
                    key={index} 
                    className={`carousel-slide-item ${isActive ? 'active' : ''}`}
                  >
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className="carousel-img" 
                    />
                    <div className="carousel-overlay">
                      <span className="carousel-badge">{slide.badge}</span>
                      <div className="carousel-caption-wrap">
                        <h4 style={{ color: '#FFFFFF', margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 800 }}>{slide.title}</h4>
                        <p className="carousel-caption">{slide.caption}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Prev / Next Arrows */}
              <button onClick={handlePrev} className="carousel-arrow prev" aria-label="Previous Slide">
                <ChevronLeft size={18} />
              </button>
              <button onClick={handleNext} className="carousel-arrow next" aria-label="Next Slide">
                <ChevronRight size={18} />
              </button>

              {/* Dots Indicators */}
              <div className="carousel-dots">
                {CAROUSEL_SLIDES.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentSlide(dotIdx)}
                    className={`carousel-dot ${dotIdx === currentSlide ? 'active' : ''}`}
                    aria-label={`Slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================================================
          2. SECTION 1: THE FOUNDER'S JOURNEY (EXCLUSIVE FOCUS & ATTRACTIVE DESIGN)
          ========================================================================== */}
      <section className="about-story-section section">
        <div className="container">
          
          <div className="about-story-header">
            <span className="section-tag">THE HEART BEHIND 1 STEP MORE</span>
            <h2>My Journey Started with My Own <span>Postpartum Transformation</span></h2>
            <p>
              How navigating the physical, emotional, and everyday changes of motherhood sparked a lifelong mission to guide other women to lasting health.
            </p>
          </div>

          <div className="about-story-grid">
            
            {/* Left Column: Founder Portrait Spotlight */}
            <div className="founder-spotlight-wrap">
              <div className="founder-portrait-card">
                <img 
                  src="/assets/images/founder/founder.webp" 
                  alt="Dt. Pragati Mishra - Founder & Wellness Coach" 
                  className="founder-portrait-img"
                />
                <div className="founder-floating-badge">
                  <Heart size={14} fill="var(--primary)" color="var(--primary)" /> Mother & Lead Coach
                </div>
                <div className="founder-portrait-overlay">
                  <h3 className="founder-portrait-name">Dt. Pragati Mishra</h3>
                  <p className="founder-portrait-role">Founder & Clinical Nutritionist</p>
                </div>
              </div>

              <div className="founder-trust-card">
                <div className="founder-trust-icon">
                  <UserCheck size={20} />
                </div>
                <div className="founder-trust-text">
                  <strong>2000+ Mothers Guided</strong>
                  <span>Rebuilding strength, energy & body relationship</span>
                </div>
              </div>
            </div>

            {/* Right Column: Founder's Story Stream */}
            <div className="founder-story-stream">
              
              <div className="story-narrative-card">
                <span className="story-card-number">Phase 01 &bull; The Unprepared Changes</span>
                <p>
                  Motherhood brought me the most beautiful role of my life, but it also brought changes I wasn’t fully prepared for — changes in my body, my weight, my energy and even the way I saw myself.
                </p>
              </div>

              <div className="story-narrative-card">
                <span className="story-card-number">Phase 02 &bull; Finding Myself Again</span>
                <p>
                  Like many moms, I was busy taking care of everyone else. But deep down, I wanted to feel like myself again. My postpartum weight-loss journey wasn’t about becoming <em>“perfect.”</em> It was about slowly rebuilding my strength, confidence and relationship with my body — while still being a mother, managing my responsibilities and living my everyday life.
                </p>
              </div>

              {/* Central Emotional Highlight Banner */}
              <div className="story-callout-banner">
                <div className="callout-quote-symbol">“</div>
                <p className="callout-text">
                  Because becoming a mother may change you… but it doesn’t mean you have to lose yourself. <span className="callout-heart">❤️</span>
                </p>
              </div>

              <div className="story-narrative-card">
                <span className="story-card-number">Phase 03 &bull; A Reignited Purpose</span>
                <p>
                  And that journey changed more than just my body. <strong>It changed my purpose.</strong> I realised there were so many moms feeling the same way I once did — wanting to lose weight, feel healthier and have more energy, but not knowing how to do it without sacrificing their family, routine or themselves.
                </p>
              </div>

              <div className="story-narrative-card">
                <span className="story-card-number">Phase 04 &bull; The Decision & Promise</span>
                <p>
                  That’s when I decided: <strong>If I could transform my health while navigating motherhood, I wanted to help other moms believe that they could too.</strong> Today, my mission is to help women and mothers create sustainable transformations through practical nutrition, movement, yoga and lifestyle changes — without putting their daily lives on hold.
                </p>
              </div>

              {/* Founder Signature Box */}
              <div className="story-signature-box">
                <div>
                  <div className="signature-name">Dt. Pragati Mishra</div>
                  <div className="signature-title">Founder, Lead Clinical Nutritionist & Wellness Coach</div>
                </div>
                <button onClick={() => navigate('/contact')} className="btn btn-outline btn-sm">
                  Connect With Dt. Pragati &rarr;
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==========================================================================
          3. SECTION 2: OUR CORE MISSION BANNER
          ========================================================================== */}
      <section className="about-mission-section section">
        <div className="container">
          <div className="about-mission-box">
            <span className="mission-tag">OUR MISSION</span>
            <h2 className="mission-quote">
              "To help women and mothers transform their health without disrupting their daily lives."
            </h2>
            <p className="mission-subtext">
              Today, our mission is to help women and mothers create sustainable transformations through practical nutrition, movement, yoga and lifestyle changes — without putting their daily lives on hold.
            </p>

            <div className="mission-pillars-grid">
              <div className="mission-pillar-card">
                <h4>🥗 Practical Nutrition</h4>
                <p>Simple, delicious home-cooked Indian meals with zero exotic ingredients or food guilt.</p>
              </div>

              <div className="mission-pillar-card">
                <h4>🧘‍♀️ Movement & Live Yoga</h4>
                <p>Progressive postural flows designed for hormone balance, flexibility, and core recovery.</p>
              </div>

              <div className="mission-pillar-card">
                <h4>🌱 Sustainable Habit Loops</h4>
                <p>Micro-habit changes that stack naturally into busy schedules for lifelong vitality.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          4. SECTION 3: THE 1 STEP MORE FOUNDATIONAL PHILOSOPHY (PREMIUM CARDS)
          ========================================================================== */}
      <section className="about-pillars-section section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">OUR CORE PHILOSOPHY</span>
            <h2 className="section-title">Why Women & Mothers Trust <span>1 Step More</span></h2>
            <p className="section-description">
              We reject extreme crash diets and rigid workout pressure. Real health is created incrementally with science, compassion, and consistency.
            </p>
          </div>

          <div className="about-pillars-grid">
            {/* Box 1: Science First */}
            <div 
              className="about-pillar-box" 
              style={{ '--pillar-accent': '#2E7D32', '--pillar-bg': 'rgba(46, 125, 50, 0.1)' }}
            >
              <div className="pillar-header-row">
                <div className="pillar-icon-box">
                  <ShieldCheck size={24} />
                </div>
                <span className="pillar-tag">Evidence-Based</span>
              </div>
              <h3>Safety & Science First</h3>
              <p>
                Every nutrition roadmap is audited for medical indicators like Postpartum recovery, Thyroid, PCOS, Blood Sugar, and BP.
              </p>
              <div className="pillar-features-list">
                <div className="pillar-feature-item">
                  <Check size={14} /> Medical parameter customization
                </div>
                <div className="pillar-feature-item">
                  <Check size={14} /> Safe joint & pelvic alignment
                </div>
                <div className="pillar-feature-item">
                  <Check size={14} /> Weekly metabolic health reviews
                </div>
              </div>
            </div>

            {/* Box 2: Zero Deprivation */}
            <div 
              className="about-pillar-box" 
              style={{ '--pillar-accent': '#F57C00', '--pillar-bg': 'rgba(245, 124, 0, 0.1)' }}
            >
              <div className="pillar-header-row">
                <div className="pillar-icon-box">
                  <Salad size={24} />
                </div>
                <span className="pillar-tag">Real Food</span>
              </div>
              <h3>Zero Extreme Deprivation</h3>
              <p>
                Eat wholesome home foods you love. No starvation, no meal replacements, and no extreme calorie crashes.
              </p>
              <div className="pillar-features-list">
                <div className="pillar-feature-item">
                  <Check size={14} /> 100% Home-cooked Indian meals
                </div>
                <div className="pillar-feature-item">
                  <Check size={14} /> Structured 28-day grocery plans
                </div>
                <div className="pillar-feature-item">
                  <Check size={14} /> Festival & travel eating templates
                </div>
              </div>
            </div>

            {/* Box 3: Hormonal Harmony */}
            <div 
              className="about-pillar-box" 
              style={{ '--pillar-accent': '#0284C7', '--pillar-bg': 'rgba(2, 132, 199, 0.1)' }}
            >
              <div className="pillar-header-row">
                <div className="pillar-icon-box">
                  <Flower2 size={24} />
                </div>
                <span className="pillar-tag">Metabolic Reset</span>
              </div>
              <h3>Hormonal Harmony</h3>
              <p>
                Restore metabolic health, cortisol reserves, and adrenal vitality through anti-inflammatory eating and breathwork.
              </p>
              <div className="pillar-features-list">
                <div className="pillar-feature-item">
                  <Check size={14} /> Pranayama for nervous system reset
                </div>
                <div className="pillar-feature-item">
                  <Check size={14} /> Pelvic floor & spine alignment
                </div>
                <div className="pillar-feature-item">
                  <Check size={14} /> Circadian sleep habit support
                </div>
              </div>
            </div>

            {/* Box 4: Lifelong Habits */}
            <div 
              className="about-pillar-box" 
              style={{ '--pillar-accent': '#8B5CF6', '--pillar-bg': 'rgba(139, 92, 246, 0.1)' }}
            >
              <div className="pillar-header-row">
                <div className="pillar-icon-box">
                  <Heart size={24} />
                </div>
                <span className="pillar-tag">Lifelong Habits</span>
              </div>
              <h3>Habits That Last Forever</h3>
              <p>
                Transform incrementally in 15–30 min pockets that fit seamlessly around motherhood, work, and family schedules.
              </p>
              <div className="pillar-features-list">
                <div className="pillar-feature-item">
                  <Check size={14} /> Micro-habit stacking framework
                </div>
                <div className="pillar-feature-item">
                  <Check size={14} /> Weekly 1-on-1 coach video calls
                </div>
                <div className="pillar-feature-item">
                  <Check size={14} /> Lifetime community circle support
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Comparison Breakdown */}
          <div className="philosophy-compare-wrap">
            <div className="compare-title-wrap">
              <span className="section-tag">THE 1 STEP MORE STANDARD</span>
              <h3>What We Stand For vs. What We Reject</h3>
              <p>Why our approach creates lifelong, joy-filled transformations where crash diets fail.</p>
            </div>

            <div className="compare-grid">
              {/* Reject Column */}
              <div className="compare-col reject">
                <div className="compare-col-header">
                  <XCircle size={20} /> What We Strongly Reject
                </div>
                <div className="compare-list">
                  <div className="compare-list-item">
                    <XCircle size={16} /> Extreme starvation diets and skipping meals that crash your metabolic rate.
                  </div>
                  <div className="compare-list-item">
                    <XCircle size={16} /> Exhausting 2-hour workout routines that leave busy mothers depleted.
                  </div>
                  <div className="compare-list-item">
                    <XCircle size={16} /> Unscientific detox teas, synthetic fat burners, and artificial meal shakes.
                  </div>
                  <div className="compare-list-item">
                    <XCircle size={16} /> Rigid perfectionism that forces you to sacrifice your family or career.
                  </div>
                </div>
              </div>

              {/* Stand For Column */}
              <div className="compare-col standfor">
                <div className="compare-col-header">
                  <CheckCircle2 size={20} /> What 1 Step More Stands For
                </div>
                <div className="compare-list">
                  <div className="compare-list-item">
                    <CheckCircle2 size={16} /> 100% wholesome, home-cooked Indian meals that nourish without guilt.
                  </div>
                  <div className="compare-list-item">
                    <CheckCircle2 size={16} /> Gentle 15–30 minute restorative yoga flows and micro-habit loops.
                  </div>
                  <div className="compare-list-item">
                    <CheckCircle2 size={16} /> Clinical hormonal guidance for postpartum recovery, PCOS, and thyroid vitality.
                  </div>
                  <div className="compare-list-item">
                    <CheckCircle2 size={16} /> Compassionate weekly 1-on-1 accountability calls and non-judgmental guidance.
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================================================
          5. BOTTOM ACTION CALLOUT
          ========================================================================== */}
      <section className="about-cta-section section">
        <div className="container">
          <div className="about-cta-card">
            <div className="about-cta-text">
              <h3>Ready to Take Your First Step?</h3>
              <p>Connect directly with Dt. Pragati Mishra and start your personalized journey today.</p>
            </div>

            <div className="about-cta-actions">
              <button onClick={() => navigate('/services')} className="btn btn-primary">
                View All Programs <ArrowRight size={16} />
              </button>
              <button onClick={() => navigate('/contact')} className="btn btn-outline">
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
