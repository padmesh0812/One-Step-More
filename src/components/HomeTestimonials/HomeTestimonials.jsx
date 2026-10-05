import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, Quote, CheckCircle2, Sparkles, ArrowRight, 
  TrendingDown, Award, ZoomIn, X 
} from 'lucide-react';
import { BRAND, TESTIMONIALS_HEADER, TESTIMONIALS_DATA, TESTIMONIALS_CTA } from '../../constants';
import './HomeTestimonials.css';

const HomeTestimonials = () => {
  const navigate = useNavigate();
  const [activeModalImage, setActiveModalImage] = useState(null);

  return (
    <section className="home-testimonials-section section" id="client-stories">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Sparkles size={14} className="tag-icon" /> {TESTIMONIALS_HEADER.tag}
          </span>
          <h2 className="section-title">
            {TESTIMONIALS_HEADER.titlePrefix}
            <span className="brand-step">{BRAND.stepText}</span> <span className="brand-more">{BRAND.moreText}</span>
          </h2>
          <p className="section-description">
            {TESTIMONIALS_HEADER.description}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="home-testimonials-grid">
          {TESTIMONIALS_DATA.map((item) => (
            <div key={item.id} className="transformation-card">
              {/* Image Preview with Hover Overlay */}
              <div 
                className="transformation-image-wrapper"
                onClick={() => setActiveModalImage(item)}
                title="Click to view full transformation photo"
              >
                <img 
                  src={item.image} 
                  alt={`${item.name} weight loss transformation`} 
                  className="transformation-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="image-badge-pill">
                  <Award size={13} /> {item.badge}
                </div>
                <div className="image-hover-zoom">
                  <ZoomIn size={18} />
                  <span>Click to expand</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="transformation-body">
                {/* Result Highlight Banner */}
                <div className="result-metric-banner">
                  <TrendingDown size={16} className="metric-icon" />
                  <span className="metric-text">{item.resultTag}</span>
                </div>

                {/* Stars Rating */}
                <div className="stars-row">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} size={16} className="star-filled" fill="#F57C00" color="#F57C00" />
                  ))}
                  <span className="rating-text">5.0 Verified Result</span>
                </div>

                {/* Quote */}
                <div className="quote-box">
                  <Quote size={20} className="quote-icon" />
                  <p className="quote-text">"{item.quote}"</p>
                </div>

                {/* Bullet Highlights */}
                <ul className="transformation-highlights">
                  {item.highlights.map((point, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={14} className="check-bullet" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Client Footer */}
                <div className="client-footer">
                  <div className="client-info">
                    <div className="client-name-row">
                      <h4 className="client-name">{item.name}</h4>
                      <span className="verified-badge" title="Verified Program Enrollment">
                        <CheckCircle2 size={13} /> Verified
                      </span>
                    </div>
                    <span className="client-program">{item.program} &bull; {item.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="testimonials-cta-banner">
          <div className="cta-banner-content">
            <span className="cta-subtitle">{TESTIMONIALS_CTA.subtitle}</span>
            <h3 className="cta-title">{TESTIMONIALS_CTA.title}</h3>
            <p className="cta-desc">
              {TESTIMONIALS_CTA.description}
            </p>
          </div>
          <div className="cta-banner-actions">
            <button 
              onClick={() => navigate('/services')} 
              className="btn btn-secondary cta-btn-glow"
            >
              {TESTIMONIALS_CTA.primaryBtnText} <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => navigate('/contact')} 
              className="btn btn-outline-white"
            >
              {TESTIMONIALS_CTA.outlineBtnText}
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full Image Inspection */}
      {activeModalImage && (
        <div 
          className="transformation-modal-overlay" 
          onClick={() => setActiveModalImage(null)}
        >
          <div 
            className="transformation-modal-box" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close-trigger" 
              onClick={() => setActiveModalImage(null)}
              aria-label="Close transformation photo preview"
            >
              <X size={20} />
            </button>
            <div className="modal-inner-img-wrap">
              <img 
                src={activeModalImage.image} 
                alt={`${activeModalImage.name} transformation large preview`} 
                className="modal-full-img"
                decoding="async"
              />
            </div>
            <div className="modal-caption-bar">
              <div className="modal-caption-left">
                <h4>{activeModalImage.name} ({activeModalImage.location})</h4>
                <p>{activeModalImage.program} &bull; {activeModalImage.duration}</p>
              </div>
              <div className="modal-caption-right">
                <span className="modal-metric-badge">{activeModalImage.resultTag}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeTestimonials;
