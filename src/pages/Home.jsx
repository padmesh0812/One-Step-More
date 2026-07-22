import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Salad, Flower2, HeartPulse, Leaf, ArrowRight, Check } from 'lucide-react';
import WellnessQuiz from '../components/WellnessQuiz';

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
                Your Wellness Journey <span>Begins Here</span>
              </h1>
              <p className="hero-description">
                Helping women build healthier habits through expert nutrition, yoga, lifestyle coaching and personalized wellness programs.
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
                src="/assets/images/hero/hero.png" 
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
            <span className="section-tag">WHY CHOOSE ONE STEP MORE</span>
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

      {/* Interactive Quiz Section */}
      <section id="wellness-quiz-section" className="section container" style={{ padding: '40px 24px' }}>
        <div className="section-header">
          <span className="section-tag">QUICK BLUEPRINT QUIZ</span>
          <h2 className="section-title">Get Your Custom Roadmap</h2>
          <p className="section-description">
            Complete our short questionnaire to instantly calculate your metabolic stats, daily targets, and receive a customized recovery or healthy habit roadmap.
          </p>
        </div>
        <WellnessQuiz />
      </section>

      {/* How It Works Section */}
      <section className="how-it-works section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">HOW IT WORKS</span>
            <h2 className="section-title">Your Wellness Journey Starts Here</h2>
            <p className="section-description">
              Achieving a healthier lifestyle is simple with our guided approach. From your first consultation to long-term transformation, we support you every step of the way.
            </p>
          </div>

          <div className="steps-wrapper">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3>Book a Consultation</h3>
              <p>Connect with our wellness expert and discuss your goals.</p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h3>Receive Your Plan</h3>
              <p>Get a personalized diet, yoga and wellness roadmap.</p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h3>Follow the Program</h3>
              <p>Stay consistent with expert guidance and regular support.</p>
            </div>

            <div className="step-card">
              <div className="step-number">04</div>
              <h3>Enjoy Lasting Results</h3>
              <p>Feel healthier, stronger and more confident every day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Programs Section */}
      <section className="programs section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">OUR WELLNESS PROGRAMS</span>
            <h2 className="section-title">Find the Right Program for Your Journey</h2>
            <p className="section-description">
              Every wellness journey is unique. Explore our carefully designed programs that help you achieve sustainable health, confidence, and balance.
            </p>
          </div>

          <div className="program-grid">
            {/* Card 1 */}
            <div onClick={() => navigate('/services', { state: { tab: 'diet' } })} className="program-card diet">
              <div className="program-overlay"></div>
              <div className="program-content">
                <span className="program-category">Nutrition</span>
                <h3>Personalized Diet Plans</h3>
                <p>Customized nutrition plans designed around your lifestyle and health goals.</p>
                <div className="program-arrow">&rarr;</div>
              </div>
            </div>

            {/* Card 2 */}
            <div onClick={() => navigate('/services', { state: { tab: 'group-yoga' } })} className="program-card yoga">
              <div className="program-overlay"></div>
              <div className="program-content">
                <span className="program-category">Yoga</span>
                <h3>Yoga & Meditation</h3>
                <p>Improve flexibility, posture and inner peace with guided yoga sessions.</p>
                <div className="program-arrow">&rarr;</div>
              </div>
            </div>

            {/* Card 3 */}
            <div onClick={() => navigate('/services', { state: { tab: 'one-yoga' } })} className="program-card weight">
              <div className="program-overlay"></div>
              <div className="program-content">
                <span className="program-category">Fitness</span>
                <h3>Weight Management</h3>
                <p>Sustainable weight loss programs focused on long-term wellness.</p>
                <div className="program-arrow">&rarr;</div>
              </div>
            </div>

            {/* Card 4 */}
            <div onClick={() => navigate('/services', { state: { tab: 'diet' } })} className="program-card postpartum">
              <div className="program-overlay"></div>
              <div className="program-content">
                <span className="program-category">Motherhood</span>
                <h3>Postpartum Wellness</h3>
                <p>Recovery, nutrition and wellness support for new mothers.</p>
                <div className="program-arrow">&rarr;</div>
              </div>
            </div>

            {/* Card 5 */}
            <div onClick={() => navigate('/services', { state: { tab: 'combo' } })} className="program-card lifestyle">
              <div className="program-overlay"></div>
              <div className="program-content">
                <span className="program-category">Lifestyle</span>
                <h3>Lifestyle Coaching</h3>
                <p>Build healthy habits that create lasting positive change.</p>
                <div className="program-arrow">&rarr;</div>
              </div>
            </div>

            {/* Card 6 */}
            <div onClick={() => navigate('/services', { state: { tab: 'diet' } })} className="program-card consultation">
              <div className="program-overlay"></div>
              <div className="program-content">
                <span className="program-category">Consultation</span>
                <h3>One-on-One Consultation</h3>
                <p>Personal guidance tailored specifically to your wellness journey.</p>
                <div className="program-arrow">&rarr;</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="founder section">
        <div className="container">
          <div className="founder-wrapper">
            <div className="founder-image">
              <img 
                src="/assets/images/founder/founder.jpg" 
                alt="Dt. Pragati Mishra - Founder & Wellness Coach"
              />
              <div className="experience-card">
                <h3>500+</h3>
                <p>Women Guided</p>
              </div>
            </div>

            <div className="founder-content">
              <span className="section-tag">THE HEART BEHIND ONE STEP MORE</span>
              <h2 className="section-title">Guiding You Every Step Towards Better Health</h2>
              <p className="founder-intro">
                At One Step More, wellness is more than following a diet or exercise routine—it's about creating sustainable habits that help women feel healthier, stronger and more confident every day.
              </p>
              <blockquote>
                "Every healthy habit begins with one small step. One Step More is here to walk that journey with you."
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
