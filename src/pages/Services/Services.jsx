import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Check, ArrowRight, Star, Users, ShieldCheck, PhoneCall,
  Plus, Minus 
} from 'lucide-react';
import { 
  BRAND,
  SERVICES_HEADER_CONTENT, 
  PROGRAMS_DATA, 
  SERVICES_FAQS_DATA, 
  SERVICES_BOTTOM_CTA_CONTENT 
} from '../../constants';
import './Services.css';

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
            <span className="section-tag">{SERVICES_HEADER_CONTENT.tag}</span>
            <h1 className="services-title">
              {SERVICES_HEADER_CONTENT.titlePrefix}<span>{SERVICES_HEADER_CONTENT.titleHighlight}</span>
            </h1>
            <p className="section-description">
              {SERVICES_HEADER_CONTENT.description}
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

          {/* 1. Main Showcase Hero Banner */}
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

          {/* 2. Key Points Section */}
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

      {/* FAQs Section */}
      <section className="section container services-faq-section">
        <div className="section-header">
          <span className="section-tag">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="section-title">Frequently Asked <span>Questions (FAQ)</span></h2>
          <p className="section-description">
            Everything you need to know about our nutritionist consultations, custom meal planning, and live yoga sessions.
          </p>
        </div>

        <div className="faq-accordion-wrapper">
          {SERVICES_FAQS_DATA.map((faq, index) => (
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
              <h2>{SERVICES_BOTTOM_CTA_CONTENT.title}</h2>
              <p>
                {SERVICES_BOTTOM_CTA_CONTENT.description}
              </p>
            </div>
            <div className="services-cta-actions">
              <button onClick={() => navigate('/contact')} className="btn btn-secondary">
                <PhoneCall size={18} /> {SERVICES_BOTTOM_CTA_CONTENT.primaryBtnText}
              </button>
              <button onClick={() => navigate('/enroll', { state: { program: activeTab, weeks: selectedDuration } })} className="btn btn-outline-white">
                {SERVICES_BOTTOM_CTA_CONTENT.outlineBtnText} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Services;
