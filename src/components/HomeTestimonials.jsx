import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, Quote, CheckCircle2, Sparkles, ArrowRight, 
  TrendingDown, Award, ZoomIn, X 
} from 'lucide-react';
import './HomeTestimonials.css';

// Import client transformation images
import client1Img from '../assets/images/testimonials/testimonial 1.webp';
import client2Img from '../assets/images/testimonials/testimonial 2.webp';
import client3Img from '../assets/images/testimonials/testimonial 3.webp';

const TESTIMONIALS = [
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

const HomeTestimonials = () => {
  const navigate = useNavigate();
  const [activeModalImage, setActiveModalImage] = useState(null);

  return (
    <section className="home-testimonials-section section" id="client-stories">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Sparkles size={14} className="tag-icon" /> REAL TRANSFORMATIONS, REAL RESULTS
          </span>
          <h2 className="section-title">
            Stories of Lasting Change with <span className="brand-step">1 Step</span> <span className="brand-more">More</span>
          </h2>
          <p className="section-description">
            See how our clients enrolled in our personalized weight loss programs and unlocked remarkable physical and mental breakthroughs—using 100% home-cooked food, mindful habits, and zero crash starvation.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="home-testimonials-grid">
          {TESTIMONIALS.map((item) => (
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
            <span className="cta-subtitle">READY TO WRITE YOUR OWN STORY?</span>
            <h3 className="cta-title">Take Your First Step Towards Sustainable Weight Loss</h3>
            <p className="cta-desc">
              Get an individualized nutrition and routine roadmap curated by Dt. Pragati Mishra tailored to your body type, metabolism, and lifestyle.
            </p>
          </div>
          <div className="cta-banner-actions">
            <button 
              onClick={() => navigate('/services', { state: { tab: 'diet' } })} 
              className="btn btn-primary"
            >
              Explore Weight Loss Plans <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => navigate('/contact')} 
              className="btn btn-outline"
            >
              Book Free Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Image Lightbox Modal */}
      {activeModalImage && (
        <div className="testimonial-lightbox-backdrop" onClick={() => setActiveModalImage(null)}>
          <div className="testimonial-lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button 
              className="lightbox-close-btn" 
              onClick={() => setActiveModalImage(null)}
              aria-label="Close Preview"
            >
              <X size={22} />
            </button>
            <div className="lightbox-image-holder">
              <img 
                src={activeModalImage.image} 
                alt={`${activeModalImage.name} transformation`} 
                className="lightbox-full-img"
              />
            </div>
            <div className="lightbox-details">
              <div className="lightbox-header-row">
                <div>
                  <h3 className="lightbox-client-name">{activeModalImage.name}</h3>
                  <p className="lightbox-program">{activeModalImage.program} ({activeModalImage.duration})</p>
                </div>
                <div className="lightbox-result-badge">
                  <TrendingDown size={16} /> {activeModalImage.resultTag}
                </div>
              </div>
              <p className="lightbox-quote">"{activeModalImage.quote}"</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeTestimonials;
