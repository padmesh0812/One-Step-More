import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, ShieldCheck, Sparkles, Check, ArrowRight, 
  ChevronLeft, ChevronRight, Flower2, Salad, UserCheck, 
  XCircle, CheckCircle2 
} from 'lucide-react';
import { 
  ABOUT_CAROUSEL_SLIDES, 
  ABOUT_HERO_CONTENT, 
  ABOUT_STORY_CONTENT, 
  ABOUT_MISSION_CONTENT, 
  ABOUT_PILLARS_CONTENT, 
  ABOUT_COMPARISON_CONTENT, 
  ABOUT_CTA_CONTENT 
} from '../../constants';
import './About.css';

const About = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide transition every 2.5 seconds (2500ms)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ABOUT_CAROUSEL_SLIDES.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % ABOUT_CAROUSEL_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + ABOUT_CAROUSEL_SLIDES.length) % ABOUT_CAROUSEL_SLIDES.length);
  };

  const getPillarIcon = (tag) => {
    switch (tag) {
      case 'Evidence-Based': return <ShieldCheck size={24} />;
      case 'Real Food': return <Salad size={24} />;
      case 'Metabolic Reset': return <Flower2 size={24} />;
      case 'Lifelong Habits': return <Heart size={24} />;
      default: return <ShieldCheck size={24} />;
    }
  };

  return (
    <main className="about-main">
      {/* 1. HERO SECTION WITH 2-3s AUTO-SLIDING CAROUSEL */}
      <section className="about-hero-section section">
        <div className="container">
          <div className="about-hero-grid">
            
            {/* Left Content */}
            <div className="about-hero-content">
              <span className="about-hero-badge">
                <Sparkles size={15} /> {ABOUT_HERO_CONTENT.badge}
              </span>

              <h1 className="about-hero-title">
                {ABOUT_HERO_CONTENT.titlePrefix}<span>{ABOUT_HERO_CONTENT.titleHighlight}</span>
              </h1>

              <p className="about-hero-lead">
                {ABOUT_HERO_CONTENT.lead}
              </p>

              <div className="about-hero-chips">
                <div className="about-hero-chip">
                  <UserCheck size={16} /> {ABOUT_HERO_CONTENT.chips[0]}
                </div>
                <div className="about-hero-chip">
                  <Salad size={16} /> {ABOUT_HERO_CONTENT.chips[1]}
                </div>
                <div className="about-hero-chip">
                  <ShieldCheck size={16} /> {ABOUT_HERO_CONTENT.chips[2]}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/services')} className="btn btn-primary">
                  {ABOUT_HERO_CONTENT.primaryBtnText} <ArrowRight size={16} />
                </button>
                <button onClick={() => navigate('/contact')} className="btn btn-outline">
                  {ABOUT_HERO_CONTENT.outlineBtnText}
                </button>
              </div>
            </div>

            {/* Right Auto-sliding Photo Carousel */}
            <div 
              className="about-carousel-card"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {ABOUT_CAROUSEL_SLIDES.map((slide, index) => {
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
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
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
                {ABOUT_CAROUSEL_SLIDES.map((_, dotIdx) => (
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

      {/* 2. THE FOUNDER'S JOURNEY */}
      <section className="about-story-section section">
        <div className="container">
          
          <div className="about-story-header">
            <span className="section-tag">{ABOUT_STORY_CONTENT.tag}</span>
            <h2>{ABOUT_STORY_CONTENT.titlePrefix}<span>{ABOUT_STORY_CONTENT.titleHighlight}</span></h2>
            <p>{ABOUT_STORY_CONTENT.description}</p>
          </div>

          <div className="about-story-grid">
            
            {/* Left Column: Founder Portrait Spotlight */}
            <div className="founder-spotlight-wrap">
              <div className="founder-portrait-card">
                <img 
                  src={ABOUT_STORY_CONTENT.founderPortrait.image} 
                  alt={ABOUT_STORY_CONTENT.founderPortrait.alt} 
                  className="founder-portrait-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="founder-floating-badge">
                  <Heart size={14} fill="var(--primary)" color="var(--primary)" /> {ABOUT_STORY_CONTENT.founderPortrait.badge}
                </div>
                <div className="founder-portrait-overlay">
                  <h3 className="founder-portrait-name">{ABOUT_STORY_CONTENT.founderPortrait.name}</h3>
                  <p className="founder-portrait-role">{ABOUT_STORY_CONTENT.founderPortrait.role}</p>
                </div>
              </div>

              <div className="founder-trust-card">
                <div className="founder-trust-icon">
                  <UserCheck size={20} />
                </div>
                <div className="founder-trust-text">
                  <strong>{ABOUT_STORY_CONTENT.founderPortrait.trustCount}</strong>
                  <span>{ABOUT_STORY_CONTENT.founderPortrait.trustSubtitle}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Founder's Story Stream */}
            <div className="founder-story-stream">
              
              <div className="story-narrative-card">
                <span className="story-card-number">{ABOUT_STORY_CONTENT.phases[0].number}</span>
                <p>{ABOUT_STORY_CONTENT.phases[0].text}</p>
              </div>

              <div className="story-narrative-card">
                <span className="story-card-number">{ABOUT_STORY_CONTENT.phases[1].number}</span>
                <p>{ABOUT_STORY_CONTENT.phases[1].text}</p>
              </div>

              {/* Central Emotional Highlight Banner */}
              <div className="story-callout-banner">
                <div className="callout-quote-symbol">“</div>
                <p className="callout-text">
                  {ABOUT_STORY_CONTENT.calloutQuote}
                </p>
              </div>

              <div className="story-narrative-card">
                <span className="story-card-number">{ABOUT_STORY_CONTENT.phases[2].number}</span>
                <p>{ABOUT_STORY_CONTENT.phases[2].text}</p>
              </div>

              <div className="story-narrative-card">
                <span className="story-card-number">{ABOUT_STORY_CONTENT.phases[3].number}</span>
                <p>{ABOUT_STORY_CONTENT.phases[3].text}</p>
              </div>

              {/* Founder Signature Box */}
              <div className="story-signature-box">
                <div>
                  <div className="signature-name">{ABOUT_STORY_CONTENT.signature.name}</div>
                  <div className="signature-title">{ABOUT_STORY_CONTENT.signature.title}</div>
                </div>
                <button onClick={() => navigate('/contact')} className="btn btn-outline btn-sm">
                  {ABOUT_STORY_CONTENT.signature.ctaText}
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. CORE MISSION BANNER */}
      <section className="about-mission-section section">
        <div className="container">
          <div className="about-mission-box">
            <span className="mission-tag">{ABOUT_MISSION_CONTENT.tag}</span>
            <h2 className="mission-quote">
              {ABOUT_MISSION_CONTENT.quote}
            </h2>
            <p className="mission-subtext">
              {ABOUT_MISSION_CONTENT.subtext}
            </p>

            <div className="mission-pillars-grid">
              {ABOUT_MISSION_CONTENT.pillars.map((pillar, idx) => (
                <div key={idx} className="mission-pillar-card">
                  <h4>{pillar.icon} {pillar.title}</h4>
                  <p>{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUNDATIONAL PHILOSOPHY */}
      <section className="about-pillars-section section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{ABOUT_PILLARS_CONTENT.tag}</span>
            <h2 className="section-title">
              {ABOUT_PILLARS_CONTENT.titlePrefix}<span>{ABOUT_PILLARS_CONTENT.titleHighlight}</span>
            </h2>
            <p className="section-description">
              {ABOUT_PILLARS_CONTENT.description}
            </p>
          </div>

          <div className="about-pillars-grid">
            {ABOUT_PILLARS_CONTENT.boxes.map((box, idx) => (
              <div 
                key={idx}
                className="about-pillar-box" 
                style={{ '--pillar-accent': box.accent, '--pillar-bg': box.bg }}
              >
                <div className="pillar-header-row">
                  <div className="pillar-icon-box">
                    {getPillarIcon(box.tag)}
                  </div>
                  <span className="pillar-tag">{box.tag}</span>
                </div>
                <h3>{box.title}</h3>
                <p>{box.description}</p>
                <div className="pillar-features-list">
                  {box.features.map((feat, fIdx) => (
                    <div key={fIdx} className="pillar-feature-item">
                      <Check size={14} /> {feat}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Philosophy Comparison Breakdown */}
          <div className="philosophy-compare-wrap">
            <div className="compare-title-wrap">
              <span className="section-tag">{ABOUT_COMPARISON_CONTENT.tag}</span>
              <h3>{ABOUT_COMPARISON_CONTENT.title}</h3>
              <p>{ABOUT_COMPARISON_CONTENT.description}</p>
            </div>

            <div className="compare-grid">
              {/* Reject Column */}
              <div className="compare-col reject">
                <div className="compare-col-header">
                  <XCircle size={20} /> {ABOUT_COMPARISON_CONTENT.rejectTitle}
                </div>
                <div className="compare-list">
                  {ABOUT_COMPARISON_CONTENT.rejectItems.map((item, idx) => (
                    <div key={idx} className="compare-list-item">
                      <XCircle size={16} /> {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stand For Column */}
              <div className="compare-col standfor">
                <div className="compare-col-header">
                  <CheckCircle2 size={20} /> {ABOUT_COMPARISON_CONTENT.standForTitle}
                </div>
                <div className="compare-list">
                  {ABOUT_COMPARISON_CONTENT.standForItems.map((item, idx) => (
                    <div key={idx} className="compare-list-item">
                      <CheckCircle2 size={16} /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. BOTTOM ACTION CALLOUT */}
      <section className="about-cta-section section">
        <div className="container">
          <div className="about-cta-card">
            <div className="about-cta-text">
              <h3>{ABOUT_CTA_CONTENT.title}</h3>
              <p>{ABOUT_CTA_CONTENT.description}</p>
            </div>

            <div className="about-cta-actions">
              <button onClick={() => navigate('/services')} className="btn btn-primary">
                {ABOUT_CTA_CONTENT.primaryBtnText} <ArrowRight size={16} />
              </button>
              <button onClick={() => navigate('/contact')} className="btn btn-outline">
                {ABOUT_CTA_CONTENT.outlineBtnText}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
