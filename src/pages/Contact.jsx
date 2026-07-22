import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Check, AlertCircle, ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: "Is it safe to start yoga after a C-section or surgery?",
    a: "Yes, but timing is crucial. For the first 6 weeks, we recommend only breathing techniques and light walking. Once you receive medical clearance, you can begin our gentle progressive postural yoga flows. Always inform your instructor about your health history."
  },
  {
    q: "Do your nutritional meal plans support medical conditions?",
    a: "Absolutely. All our meal guides are clinically designed and optimized for specific medical conditions including PCOD/PCOS, Thyroid disorders, Diabetes, High Blood Pressure, and pregnancy mineral requirements."
  },
  {
    q: "What is your refund policy if the plan doesn't suit me?",
    a: "We offer a 14-day hassle-free refund window. If you enroll in any plan and find that the exercises or meal guides don't match your routine, simply email our support for a full refund."
  },
  {
    q: "How frequently will my diet plan change?",
    a: "A new diet plan is customized and shared every week (7-day cycles) with zero repetitions, allowing you to build sustainable eating habits without getting bored."
  }
];

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
  const [activeFaq, setActiveFaq] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {};
    if (!form.name.trim()) tempErrors.name = "Name is required.";
    if (!form.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }
    if (!form.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(form.phone.trim())) {
      tempErrors.phone = "Please enter a valid phone number.";
    }
    if (!form.reason) tempErrors.reason = "Please select a reason to contact.";
    if (!form.address.trim()) tempErrors.address = "Address is required.";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setSubmitted(true);
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <main>
      {/* Contact Section */}
      <section className="section container">
        <div className="section-header">
          <h1>Connect With <span>Us</span></h1>
          <p>Have questions about plans, pricing, or booking? Reach out directly. We are here to support your journey.</p>
        </div>

        <div className="contact-grid">
          {/* Info Panel */}
          <div className="contact-info-panel">
            <h3>Support Center</h3>
            <p>Our dedicated wellness coaches and dietitians are available Monday through Saturday, 9 AM to 6 PM IST.</p>

            <div className="contact-details-list">
              <div className="contact-detail-card">
                <div className="contact-detail-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-detail-text">
                  <h4>Email Us</h4>
                  <p>hello@onestepmore.com</p>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="contact-detail-icon">
                  <Phone size={20} />
                </div>
                <div className="contact-detail-text">
                  <h4>Call Support</h4>
                  <p>+91 98765 43210</p>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="contact-detail-icon">
                  <MapPin size={20} />
                </div>
                <div className="contact-detail-text">
                  <h4>Office Address</h4>
                  <p>Gomti Nagar, Lucknow,<br />Uttar Pradesh, India</p>
                </div>
              </div>
            </div>

            <h4 style={{ marginBottom: '12px', color: 'var(--heading)' }}>Follow Our Community</h4>
            <div className="social-links-row">
              <a href="https://www.instagram.com/pragati8379?igsh=c3g4NHZ4bzVucjNu" target="_blank" rel="noreferrer" className="social-link-btn" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/share/1DGZYoWZdT/" target="_blank" rel="noreferrer" className="social-link-btn" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://youtube.com/@pragatimishra1941?si=-mK6NiLCwuWHnJYq" target="_blank" rel="noreferrer" className="social-link-btn" aria-label="Youtube">
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
                <h4>Thank You!</h4>
                <p style={{ maxWidth: '450px', margin: '0 auto 24px auto' }}>We have successfully received your inquiry. One of our dedicated wellness coaches will contact you within 24 hours to schedule your consultation call.</p>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <h3>Enquiry Form</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text)', marginBottom: '24px', textAlign: 'center' }}>Fill out this enquiry form to connect with our expert dietitian or yoga trainer for a custom roadmap call.</p>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      placeholder="e.g. Sarah Miller"
                      value={form.name}
                      onChange={handleInput}
                    />
                    {errors.name && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.name}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder="e.g. sarah@example.com"
                      value={form.email}
                      onChange={handleInput}
                    />
                    {errors.email && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.email}</div>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="form-input"
                      placeholder="e.g. +91 98765 43210"
                      value={form.phone}
                      onChange={handleInput}
                    />
                    {errors.phone && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.phone}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="reason">Reason to Contact</label>
                    <select
                      id="reason"
                      name="reason"
                      className="form-input"
                      style={{ cursor: 'pointer' }}
                      value={form.reason}
                      onChange={handleInput}
                    >
                      <option value="">Select Reason / Program</option>
                      <option value="diet">Customized Diet Program</option>
                      <option value="child">Customized Child Nutrition</option>
                      <option value="group-yoga">Yoga & Beyond (Group Sessions)</option>
                      <option value="one-yoga">1:1 Live Personal Yoga</option>
                      <option value="combo">Diet & Group Yoga Combo</option>
                      <option value="general">General Inquiry</option>
                    </select>
                    {errors.reason && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.reason}</div>}
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label className="form-label" htmlFor="address">Your Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-input"
                    placeholder="e.g. Gomti Nagar, Lucknow, UP"
                    value={form.address}
                    onChange={handleInput}
                  />
                  {errors.address && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.address}</div>}
                </div>

                <div className="form-group" style={{ marginBottom: '30px' }}>
                  <label className="form-label" htmlFor="message">Your Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="form-input"
                    placeholder="Tell us briefly about your fitness goals, medical history, or consultation requirements..."
                    style={{ resize: 'vertical' }}
                    value={form.message}
                    onChange={handleInput}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section" style={{ backgroundColor: '#fff', padding: '60px 0 0 0' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '40px' }}>
            <span className="section-tag">FIND US ON THE MAP</span>
            <h2>How to Reach Us</h2>
            <p>Our office is located in Gomti Nagar, Lucknow. Drop by for a physical consultation or posture check.</p>
          </div>
          <div style={{
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border)',
            lineHeight: 0
          }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14238.487056461947!2d80.99268805!3d26.8520336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2e307df590f%3A0xe54d24177b8f2d5c!2sGomti%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="One Step More Gomti Nagar Lucknow Office Map"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" style={{ backgroundColor: '#FAF6F0' }}>
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Read quick answers regarding exercise safety, meal planning, and coaching packages.</p>
          </div>

          <div className="faq-list">
            {FAQS.map((faq, index) => (
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
                  <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.6 }}>{faq.a}</p>
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
