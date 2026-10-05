import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Salad, Flower2, HeartPulse, Leaf, Check } from 'lucide-react';
import { WellnessQuiz, BmiCalculator, HomeTestimonials } from '../../components';
import { 
  BRAND,
  HERO_CONTENT, 
  WHY_CHOOSE_CONTENT, 
  TOOLS_SECTION_CONTENT, 
  HOW_IT_WORKS_CONTENT, 
  PROGRAMS_OVERVIEW_CONTENT, 
  FOUNDER_SECTION_CONTENT 
} from '../../constants';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const scrollToQuiz = () => {
    const element = document.getElementById('wellness-quiz-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getWhyChooseIcon = (iconName) => {
    switch (iconName) {
      case 'Salad': return <Salad />;
      case 'Flower2': return <Flower2 />;
      case 'HeartPulse': return <HeartPulse />;
      case 'Leaf': return <Leaf />;
      default: return <Salad />;
    }
  };

  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-badge">
                {HERO_CONTENT.badge}
              </span>
              <h1 className="hero-title">
                {HERO_CONTENT.titlePrefix}<span>{HERO_CONTENT.titleHighlight}</span>
              </h1>
              <p className="hero-description">
                {HERO_CONTENT.description}
              </p>
              <div className="hero-buttons">
                <button onClick={scrollToQuiz} className="btn btn-primary">
                  {HERO_CONTENT.primaryBtnText}
                </button>
                <button onClick={() => navigate('/services')} className="btn btn-outline">
                  {HERO_CONTENT.outlineBtnText}
                </button>
              </div>
            </div>
            <div className="hero-image-container">
              <img 
                src={HERO_CONTENT.image} 
                alt={HERO_CONTENT.imageAlt} 
                className="hero-image"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              {WHY_CHOOSE_CONTENT.tag} <span className="brand-step">{BRAND.stepText}</span> <span className="brand-more">{BRAND.moreText}</span>
            </span>
            <h2 className="section-title">{WHY_CHOOSE_CONTENT.title}</h2>
            <p className="section-description">
              {WHY_CHOOSE_CONTENT.description}
            </p>
          </div>

          <div className="choose-grid">
            {WHY_CHOOSE_CONTENT.cards.map((card) => (
              <div key={card.id} className={`choose-card ${card.cardClass}`}>
                <div className="choose-content">
                  <div className="choose-icon">
                    {getWhyChooseIcon(card.iconName)}
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Blueprint Quiz & BMI Calculator Split Section */}
      <section id="wellness-quiz-section" className="section container tools-split-section">
        <div className="section-header">
          <span className="section-tag">{TOOLS_SECTION_CONTENT.tag}</span>
          <h2 className="section-title">
            {TOOLS_SECTION_CONTENT.titlePrefix}<span>{TOOLS_SECTION_CONTENT.titleHighlight}</span>
          </h2>
          <p className="section-description">
            {TOOLS_SECTION_CONTENT.description}
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
            <span className="section-tag">{HOW_IT_WORKS_CONTENT.tag}</span>
            <h2 className="section-title">
              {HOW_IT_WORKS_CONTENT.titlePrefix}<span className="brand-step">{BRAND.stepText}</span> <span className="brand-more">{BRAND.moreText}</span>{HOW_IT_WORKS_CONTENT.titleSuffix}
            </h2>
            <p className="section-description">
              {HOW_IT_WORKS_CONTENT.description}
            </p>
          </div>

          <div className="steps-wrapper">
            {HOW_IT_WORKS_CONTENT.steps.map((step) => (
              <div key={step.number} className="step-card">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Overview Section */}
      <section className="programs section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{PROGRAMS_OVERVIEW_CONTENT.tag}</span>
            <h2 className="section-title">
              {PROGRAMS_OVERVIEW_CONTENT.titlePrefix}<span>{PROGRAMS_OVERVIEW_CONTENT.titleHighlight}</span>
            </h2>
            <p className="section-description">
              {PROGRAMS_OVERVIEW_CONTENT.description}
            </p>
          </div>

          <div className="programs-grid">
            {PROGRAMS_OVERVIEW_CONTENT.cards.map((card) => (
              <div 
                key={card.tab}
                onClick={() => navigate('/services', { state: { tab: card.tab } })} 
                className={`program-card ${card.cardClass}`}
              >
                <div className="program-overlay"></div>
                <div className="program-content">
                  <span className="program-category" style={card.categoryStyle || {}}>
                    {card.category}
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <div className="program-arrow">&rarr;</div>
                </div>
              </div>
            ))}
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
                src={HERO_CONTENT.image ? "/assets/images/founder/founder.webp" : ""} 
                alt={`${FOUNDER_SECTION_CONTENT.name} - ${FOUNDER_SECTION_CONTENT.role}`}
                loading="lazy"
                decoding="async"
              />
              <div className="experience-card">
                <h3>{FOUNDER_SECTION_CONTENT.statsCount}</h3>
                <p>{FOUNDER_SECTION_CONTENT.statsLabel}</p>
              </div>
            </div>

            <div className="founder-content">
              <span className="section-tag">
                {FOUNDER_SECTION_CONTENT.tag} <span className="brand-step">{BRAND.stepText}</span> <span className="brand-more">{BRAND.moreText}</span>
              </span>
              <h2 className="section-title">{FOUNDER_SECTION_CONTENT.title}</h2>
              <p className="founder-intro">
                At <span className="brand-name"><span className="brand-step">{BRAND.stepText}</span> <span className="brand-more">{BRAND.moreText}</span></span>, {FOUNDER_SECTION_CONTENT.intro}
              </p>
              <blockquote>
                "{FOUNDER_SECTION_CONTENT.quote}"
              </blockquote>
              <div className="founder-name">
                <h4>{FOUNDER_SECTION_CONTENT.name}</h4>
                <span>{FOUNDER_SECTION_CONTENT.role}</span>
              </div>
              
              <div className="founder-features">
                {FOUNDER_SECTION_CONTENT.features.map((feat, idx) => (
                  <div key={idx} className="feature">
                    <Check size={16} color="var(--primary)" /> {feat}
                  </div>
                ))}
              </div>

              <div className="founder-buttons" style={{ display: 'flex', gap: '16px' }}>
                <button onClick={() => navigate('/about')} className="btn btn-primary">
                  {FOUNDER_SECTION_CONTENT.primaryBtnText}
                </button>
                <button onClick={() => navigate('/contact')} className="btn btn-outline">
                  {FOUNDER_SECTION_CONTENT.outlineBtnText}
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
