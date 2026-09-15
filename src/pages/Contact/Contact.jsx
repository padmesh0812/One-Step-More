import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Check, AlertCircle, ChevronDown } from 'lucide-react';
import { 
  CONTACT_HEADER_CONTENT, 
  CONTACT_INFO_PANEL_CONTENT, 
  CONTACT_FORM_CONTENT, 
  CONTACT_VALIDATION_MESSAGES, 
  CONTACT_MAP_CONTENT, 
  CONTACT_FAQS, 
  CONTACT_FAQS_HEADER,
  CONTACT_INFO,
  SOCIAL_LINKS
} from '../../constants';
import './Contact.css';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

const Contact = () => {
  const location = useLocation();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    reason: location.state?.program || '',
    address: '',
    message: location.state?.message || (location.state?.weeks ? `Interested in the ${location.state.weeks}-week plan.` : '')
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = {};
    if (!form.name.trim()) tempErrors.name = CONTACT_VALIDATION_MESSAGES.name;
    if (!form.email.trim()) {
      tempErrors.email = CONTACT_VALIDATION_MESSAGES.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = CONTACT_VALIDATION_MESSAGES.emailInvalid;
    }
    if (!form.phone.trim()) {
      tempErrors.phone = CONTACT_VALIDATION_MESSAGES.phoneRequired;
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(form.phone.trim())) {
      tempErrors.phone = CONTACT_VALIDATION_MESSAGES.phoneInvalid;
    }
    if (!form.reason) tempErrors.reason = CONTACT_VALIDATION_MESSAGES.reason;
    if (!form.address.trim()) tempErrors.address = CONTACT_VALIDATION_MESSAGES.address;

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('Backend contact save error:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <main>
      {/* Contact Section */}
      <section className="section container">
        <div className="section-header">
          <h1>{CONTACT_HEADER_CONTENT.titlePrefix}<span>{CONTACT_HEADER_CONTENT.titleHighlight}</span></h1>
          <p>{CONTACT_HEADER_CONTENT.description}</p>
        </div>

        <div className="contact-grid">
          {/* Info Panel */}
          <div className="contact-info-panel">
            <h3>{CONTACT_INFO_PANEL_CONTENT.title}</h3>
            <p>{CONTACT_INFO_PANEL_CONTENT.description}</p>

            <div className="contact-details-list">
              <div className="contact-detail-card">
                <div className="contact-detail-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-detail-text">
                  <h4>{CONTACT_INFO_PANEL_CONTENT.emailTitle}</h4>
                  <p>{CONTACT_INFO.email}</p>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="contact-detail-icon">
                  <Phone size={20} />
                </div>
                <div className="contact-detail-text">
                  <h4>{CONTACT_INFO_PANEL_CONTENT.phoneTitle}</h4>
                  <p>{CONTACT_INFO.phone}</p>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="contact-detail-icon">
                  <MapPin size={20} />
                </div>
                <div className="contact-detail-text">
                  <h4>{CONTACT_INFO_PANEL_CONTENT.officeTitle}</h4>
                  <p>{CONTACT_INFO.address}</p>
                </div>
              </div>
            </div>

            <h4 className="contact-social-heading">{CONTACT_INFO_PANEL_CONTENT.socialHeading}</h4>
            <div className="social-links-row">
              <a href={SOCIAL_LINKS.instagram.url} target="_blank" rel="noreferrer" className="social-link-btn" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href={SOCIAL_LINKS.facebook.url} target="_blank" rel="noreferrer" className="social-link-btn" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href={SOCIAL_LINKS.youtube.url} target="_blank" rel="noreferrer" className="social-link-btn" aria-label="Youtube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Form Panel */}
          <div className="contact-form-panel">
            {submitted ? (
              <div className="form-success-animation">
                <div className="success-check-circle">
                  <Check size={40} />
                </div>
                <h4>{CONTACT_FORM_CONTENT.successTitle}</h4>
                <p className="contact-success-desc">{CONTACT_FORM_CONTENT.successDesc}</p>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline">
                  {CONTACT_FORM_CONTENT.anotherMessageBtn}
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <h3>{CONTACT_FORM_CONTENT.title}</h3>
                <p className="contact-form-subtitle">{CONTACT_FORM_CONTENT.subtitle}</p>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">{CONTACT_FORM_CONTENT.nameLabel}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      placeholder={CONTACT_FORM_CONTENT.namePlaceholder}
                      value={form.name}
                      onChange={handleInput}
                    />
                    {errors.name && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.name}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">{CONTACT_FORM_CONTENT.emailLabel}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder={CONTACT_FORM_CONTENT.emailPlaceholder}
                      value={form.email}
                      onChange={handleInput}
                    />
                    {errors.email && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.email}</div>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">{CONTACT_FORM_CONTENT.phoneLabel}</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="form-input"
                      placeholder={CONTACT_FORM_CONTENT.phonePlaceholder}
                      value={form.phone}
                      onChange={handleInput}
                    />
                    {errors.phone && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.phone}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="reason">{CONTACT_FORM_CONTENT.reasonLabel}</label>
                    <select
                      id="reason"
                      name="reason"
                      className="form-input contact-select-pointer"
                      value={form.reason}
                      onChange={handleInput}
                    >
                      <option value="">{CONTACT_FORM_CONTENT.reasonPlaceholder}</option>
                      {CONTACT_FORM_CONTENT.reasonOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    {errors.reason && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.reason}</div>}
                  </div>
                </div>

                <div className="form-group contact-mb-20">
                  <label className="form-label" htmlFor="address">{CONTACT_FORM_CONTENT.addressLabel}</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-input"
                    placeholder={CONTACT_FORM_CONTENT.addressPlaceholder}
                    value={form.address}
                    onChange={handleInput}
                  />
                  {errors.address && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.address}</div>}
                </div>

                <div className="form-group contact-mb-30">
                  <label className="form-label" htmlFor="message">{CONTACT_FORM_CONTENT.messageLabel}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="form-input contact-textarea"
                    placeholder={CONTACT_FORM_CONTENT.messagePlaceholder}
                    value={form.message}
                    onChange={handleInput}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary contact-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? CONTACT_FORM_CONTENT.submittingBtn : CONTACT_FORM_CONTENT.submitBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section contact-map-section">
        <div className="container">
          <div className="section-header contact-map-header">
            <span className="section-tag">{CONTACT_MAP_CONTENT.tag}</span>
            <h2>{CONTACT_MAP_CONTENT.title}</h2>
            <p>{CONTACT_MAP_CONTENT.description}</p>
          </div>
          <div className="contact-map-wrapper">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14238.487056461947!2d80.99268805!3d26.8520336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2e307df590f%3A0xe54d24177b8f2d5c!2sGomti%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="400" 
              className="contact-map-iframe"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title={CONTACT_MAP_CONTENT.iframeTitle}
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section contact-faq-section">
        <div className="container">
          <div className="section-header">
            <h2>{CONTACT_FAQS_HEADER.title}</h2>
            <p>{CONTACT_FAQS_HEADER.description}</p>
          </div>

          <div className="faq-list">
            {CONTACT_FAQS.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
              >
                <div 
                  className="faq-question" 
                  onClick={() => toggleFaq(index)}
                >
                  <h4>{faq.q}</h4>
                  <ChevronDown size={18} className="faq-icon-arrow" />
                </div>
                <div className="faq-answer">
                  <p className="contact-faq-answer-text">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
