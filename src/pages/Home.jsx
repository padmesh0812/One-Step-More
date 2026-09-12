import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Salad, Flower2, HeartPulse, Leaf, ArrowRight, Check } from 'lucide-react';
import WellnessQuiz from '../components/WellnessQuiz';
import BmiCalculator from '../components/BmiCalculator';
import HomeTestimonials from '../components/HomeTestimonials';

const Home = () => {
  const navigate = useNavigate();

  const scrollToQuiz = () => {
    const element = document.getElementById('wellness-quiz-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-badge">
                ✨ Diet &bull; Yoga &bull; Lifestyle &bull; Weight Management
              </span>
              <h1 className="hero-title">
                Your Stronger, Healthier Journey <span>Begins Here</span>
              </h1>
              <p className="hero-description">
                Personalized nutrition, yoga & lifestyle coaching for women, with specialized support for postpartum recovery and sustainable weight management
              </p>
              <div className="hero-buttons">
                <button onClick={scrollToQuiz} className="btn btn-primary">
                  Start Your Journey
                </button>
                <button onClick={() => navigate('/services')} className="btn btn-outline">
                  Explore Services
                </button>
              </div>
            </div>
            <div className="hero-image-container">
              <img 
                src="/assets/images/hero/hero.webp" 
                alt="Wellness Journey" 
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">WHY CHOOSE <span className="brand-step">1 STEP</span> <span className="brand-more">MORE</span></span>
            <h2 className="section-title">Wellness Designed Around You</h2>
            <p className="section-description">
              Every woman deserves a wellness journey that is personalized, supportive and sustainable. We combine expert nutrition, yoga and lifestyle coaching to help you feel stronger, healthier and more confident every day.
            </p>
          </div>

          <div className="choose-grid">
            {/* Card 1 */}
            <div className="choose-card diet-card">
              <div className="choose-content">
                <div className="choose-icon">
                  <Salad />
                </div>
                <h3>Personalized Diet Plans</h3>
                <p>Nutrition tailored to your lifestyle and wellness goals.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="choose-card yoga-card">
              <div className="choose-content">
                <div className="choose-icon">
                  <Flower2 />
                </div>
                <h3>Expert Yoga Guidance</h3>
                <p>Improve flexibility, strength and inner balance.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="choose-card weight-card">
              <div className="choose-content">
                <div className="choose-icon">
                  <HeartPulse />
                </div>
                <h3>Weight Management</h3>
                <p>Sustainable weight management for lasting results.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="choose-card lifestyle-card">
              <div className="choose-content">
                <div className="choose-icon">
                  <Leaf />
                </div>
                <h3>Lifestyle Coaching</h3>
                <p>Build healthy habits that support lifelong wellness.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Blueprint Quiz & BMI Calculator Split Section */}
      <section id="wellness-quiz-section" className="section container tools-split-section">
        <div className="section-header">
          <span className="section-tag">PERSONALIZED HEALTH TOOLS</span>
          <h2 className="section-title">Discover Your <span>Body & Routine Blueprint</span></h2>
          <p className="section-description">
            Take our quick lifestyle quiz to unlock a tailored routine roadmap, and use our instant BMI Calculator to calculate your healthy weight targets and hydration goals.
          </p>
        </div>

        <div className="quiz-bmi-split-grid">
          <div className="tools-grid-col">
            <WellnessQuiz />
          </div>
          <div className="tools-grid-col">
            <BmiCalculator />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">SIMPLE PROCESS</span>
            <h2 className="section-title">How <span className="brand-step">1 Step</span> <span className="brand-more">More</span> Works</h2>
            <p className="section-description">
              Getting started on your wellness journey is simple, straightforward and supportive.
            </p>
          </div>

          <div className="steps-wrapper">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3>Choose Your Program</h3>
              <p>Select the program that best fits your health goals.</p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h3>Personal Assessment</h3>
              <p>We understand your routine, preferences and lifestyle.</p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h3>Follow Your Plan</h3>
              <p>Receive your customized diet, yoga and lifestyle guidance.</p>
            </div>

            <div className="step-card">
              <div className="step-number">04</div>
              <h3>Feel the Transformation</h3>
              <p>Experience lasting health improvements and higher energy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview Section (Compact Overview Cards navigating to /services tabs) */}
      <section className="programs section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">OUR PROGRAMS</span>
            <h2 className="section-title">Explore Our <span>Specialized Programs</span></h2>
            <p className="section-description">
              Choose from customized nutrition plans, live yoga guidance, child nutrition, or combo programs tailored to your unique wellness goals.
            </p>
          </div>

          <div className="programs-grid">
            {/* Card 1: Diet */}
            <div onClick={() => navigate('/services', { state: { tab: 'diet' } })} className="program-card diet">
              <div className="program-overlay"></div>
              <div className="program-content">
                <span className="program-category">Nutrition</span>
                <h3>Customized Diet Plans</h3>
                <p>Personalized meal plans created around your food preferences, medical history, and weight goals.</p>
                <div className="program-arrow">&rarr;</div>
              </div>
            </div>

            {/* Card 2: Child Nutrition (Trending) */}
            <div onClick={() => navigate('/services', { state: { tab: 'child' } })} className="program-card child-nutrition">
              <div className="program-overlay"></div>
              <div className="program-content">
                <span className="program-category" style={{ background: '#F57C00', color: '#fff' }}>🔥 Trending</span>
                <h3>Child Nutrition Program</h3>
                <p>Tailored diets for children to boost immunity, weight, and healthy eating habits.</p>
                <div className="program-arrow">&rarr;</div>
              </div>
            </div>

            {/* Card 3: Live Group Yoga */}
            <div onClick={() => navigate('/services', { state: { tab: 'group-yoga' } })} className="program-card yoga">
              <div className="program-overlay"></div>
              <div className="program-content">
                <span className="program-category">Yoga</span>
                <h3>Yoga & Breathwork</h3>
                <p>Improve flexibility, posture and inner peace with guided live yoga sessions.</p>
                <div className="program-arrow">&rarr;</div>
              </div>
            </div>

            {/* Card 4: 1:1 Personal Yoga */}
            <div onClick={() => navigate('/services', { state: { tab: 'one-yoga' } })} className="program-card weight">
              <div className="program-overlay"></div>
              <div className="program-content">
                <span className="program-category">1:1 Coaching</span>
                <h3>1:1 Live Personal Yoga</h3>
                <p>Targeted root-cause fat loss and joint rehabilitation with dedicated trainer guidance.</p>
                <div className="program-arrow">&rarr;</div>
              </div>
            </div>

            {/* Card 5: Diet & Yoga Combo */}
            <div onClick={() => navigate('/services', { state: { tab: 'combo' } })} className="program-card lifestyle">
              <div className="program-overlay"></div>
              <div className="program-content">
                <span className="program-category">Combo Bundle</span>
                <h3>Diet & Live Yoga Combo</h3>
                <p>Complete 360° transformation with customized nutrition plus daily live yoga flows.</p>
                <div className="program-arrow">&rarr;</div>
              </div>
            </div>

            {/* Card 6: 10 Days Gut Detox Plan (₹699 Special) */}
            <div onClick={() => navigate('/services', { state: { tab: 'gut-detox' } })} className="program-card gut-detox">
              <div className="program-overlay"></div>
              <div className="program-content">
                <span className="program-category" style={{ background: '#16A34A', color: '#fff' }}>🍃 ₹699 Special</span>
                <h3>10 Days Gut Cleaning Detox</h3>
                <p>Cleanse toxins, heal bloating & reset your gut microbiome with custom diet, Zoom education & recipes.</p>
                <div className="program-arrow">&rarr;</div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* Client Transformations & Testimonials Section */}
      <HomeTestimonials />

      {/* Founder Section */}
      <section className="founder section">
        <div className="container">
          <div className="founder-wrapper">
            <div className="founder-image">
              <img 
                src="/assets/images/founder/founder.webp" 
                alt="Dt. Pragati Mishra - Founder & Wellness Coach"
              />
              <div className="experience-card">
                <h3>2000+</h3>
                <p>Women Guided</p>
              </div>
            </div>

            <div className="founder-content">
              <span className="section-tag">THE HEART BEHIND <span className="brand-step">1 STEP</span> <span className="brand-more">MORE</span></span>
              <h2 className="section-title">Guiding You Every Step Towards Better Health</h2>
              <p className="founder-intro">
                At <span className="brand-name"><span className="brand-step">1 Step</span> <span className="brand-more">More</span></span>, wellness is more than following a diet or exercise routine—it's about creating sustainable habits that help women feel healthier, stronger and more confident every day.
              </p>
              <blockquote>
                "Every healthy habit begins with one small step. <span className="brand-name"><span className="brand-step">1 Step</span> <span className="brand-more">More</span></span> is here to walk that journey with you."
              </blockquote>
              <div className="founder-name">
                <h4>Dt. Pragati Mishra</h4>
                <span>Founder & Wellness Coach</span>
              </div>
              
              <div className="founder-features">
                <div className="feature">
                  <Check size={16} color="var(--primary)" /> Personalized Wellness Plans
                </div>
                <div className="feature">
                  <Check size={16} color="var(--primary)" /> Holistic Nutrition Guidance
                </div>
                <div className="feature">
                  <Check size={16} color="var(--primary)" /> Women's Health Focus
                </div>
                <div className="feature">
                  <Check size={16} color="var(--primary)" /> Sustainable Lifestyle Coaching
                </div>
              </div>

              <div className="founder-buttons" style={{ display: 'flex', gap: '16px' }}>
                <button onClick={() => navigate('/about')} className="btn btn-primary">
                  Read My Story
                </button>
                <button onClick={() => navigate('/contact')} className="btn btn-outline">
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
