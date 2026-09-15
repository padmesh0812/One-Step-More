import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Check, AlertCircle, ArrowLeft, Heart, Shield, CreditCard, CheckCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { 
  BRAND,
  PROGRAMS_DATA, 
  BLOOD_GROUPS, 
  ENROLL_STEPPER, 
  ENROLL_HEADER_CONTENT, 
  ENROLL_VALIDATION_MESSAGES, 
  ENROLL_FORM_LABELS, 
  ENROLL_PAYMENT_CONTENT, 
  ENROLL_SUCCESS_CONTENT, 
  ENROLL_SIDEBAR_CONTENT,
  API_BASE_URL 
} from '../../constants';
import './Enroll.css';

const Enroll = () => {
  try {
    const location = useLocation();
    const navigate = useNavigate();

    // Steps: 1 = Biological Details, 2 = Payment details, 3 = Success
    const [step, setStep] = useState(1);
    
    // Initialize form states
    const [form, setForm] = useState({
      name: '',
      email: '',
      phone: '',
      bloodGroup: '',
      weight: '',
      height: '',
      dob: '',
      age: '',
      address: '',
      program: location.state?.programId || 'diet',
      duration: location.state?.duration || 4
    });

    // Dynamic programs & pricing from database
    const [programs, setPrograms] = useState(PROGRAMS_DATA);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const [errors, setErrors] = useState({});

    // Fetch dynamic programs on mount
    useEffect(() => {
      fetch(`${API_BASE_URL}/api/plans`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setPrograms(data);
          }
        })
        .catch(err => {
          console.warn('Could not fetch dynamic plans from server, using static fallback:', err.message);
        });
    }, []);

    // Auto-calculate age from DOB
    const calculateAge = (dobString) => {
      if (!dobString) return '';
      const today = new Date();
      const birthDate = new Date(dobString);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 0 ? age : '';
    };

    // Find pricing based on program selection
    const selectedProgramData = programs.find(p => p.id === form.program) || programs[0] || PROGRAMS_DATA[0];
    const activePricing = selectedProgramData.pricing.find(pr => pr.weeks === Number(form.duration)) || selectedProgramData.pricing[2];

    const handleInput = (e) => {
      const { name, value } = e.target;
      setForm(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    };

    const handleDOBChange = (e) => {
      const dobValue = e.target.value;
      const computedAge = calculateAge(dobValue);
      setForm(prev => ({
        ...prev,
        dob: dobValue,
        age: computedAge
      }));
      if (errors.dob) {
        setErrors(prev => ({ ...prev, dob: '', age: '' }));
      }
    };

    // Handle biological stats validation
    const handleDetailsSubmit = (e) => {
      e.preventDefault();
      const tempErrors = {};
      if (!form.name.trim()) tempErrors.name = ENROLL_VALIDATION_MESSAGES.name;
      if (!form.email.trim()) {
        tempErrors.email = ENROLL_VALIDATION_MESSAGES.emailRequired;
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        tempErrors.email = ENROLL_VALIDATION_MESSAGES.emailInvalid;
      }
      if (!form.phone.trim()) {
        tempErrors.phone = ENROLL_VALIDATION_MESSAGES.phoneRequired;
      } else if (!/^\+?[0-9\s-]{8,15}$/.test(form.phone.trim())) {
        tempErrors.phone = ENROLL_VALIDATION_MESSAGES.phoneInvalid;
      }
      if (!form.dob) tempErrors.dob = ENROLL_VALIDATION_MESSAGES.dob;
      if (!form.bloodGroup) tempErrors.bloodGroup = ENROLL_VALIDATION_MESSAGES.bloodGroup;
      if (!form.weight.trim()) tempErrors.weight = ENROLL_VALIDATION_MESSAGES.weight;
      if (!form.height.trim()) tempErrors.height = ENROLL_VALIDATION_MESSAGES.height;
      if (!form.address.trim()) tempErrors.address = ENROLL_VALIDATION_MESSAGES.address;

      if (Object.keys(tempErrors).length > 0) {
        setErrors(tempErrors);
        window.scrollTo({ top: 150, behavior: 'smooth' });
        return;
      }
      setStep(2);
    };

    // Process secure checkout with Razorpay
    const handlePaymentSubmit = async (e) => {
      e.preventDefault();
      setIsProcessingPayment(true);

      try {
        const response = await fetch(`${API_BASE_URL}/api/create-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            programId: form.program,
            weeks: form.duration,
            bloodGroup: form.bloodGroup,
            weight: form.weight,
            height: form.height,
            dob: form.dob,
            age: form.age,
            address: form.address
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Server rejected order creation request.');
        }

        const orderData = await response.json();

        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: BRAND.name,
          description: `Enrollment in ${selectedProgramData.title}`,
          order_id: orderData.orderId,
          prefill: {
            name: form.name,
            email: form.email,
            contact: form.phone
          },
          theme: {
            color: "#2E7D32"
          },
          handler: async function (paymentResponse) {
            try {
              setIsProcessingPayment(true);
              
              const verifyResponse = await fetch(`${API_BASE_URL}/api/verify-payment`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,
                  razorpay_order_id: paymentResponse.razorpay_order_id,
                  razorpay_signature: paymentResponse.razorpay_signature
                })
              });

              const verifyData = await verifyResponse.json();
              if (verifyData.success) {
                setStep(3);
              } else {
                alert(verifyData.error || 'Razorpay Signature verification failed.');
              }
            } catch (err) {
              console.error('Error verifying Razorpay transaction signature:', err);
              alert('Network error verifying payment. Please contact Support.');
            } finally {
              setIsProcessingPayment(false);
            }
          },
          modal: {
            ondismiss: function () {
              setIsProcessingPayment(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

      } catch (err) {
        console.error('Razorpay Order API creation failed:', err);
        alert(err.message || 'Payment server is offline or unreachable. Please try again later.');
        setIsProcessingPayment(false);
      }
    };

    return (
      <main className="enroll-main">
        <div className="container">
          
          {/* Back Trigger */}
          <div className="enroll-back-wrapper">
            <button 
              onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} 
              className="enroll-back-btn"
            >
              <ArrowLeft size={16} /> Back {step > 1 ? 'to Stats' : 'to Programs'}
            </button>
          </div>

          <div className="section-header enroll-header">
            <h1>{ENROLL_HEADER_CONTENT.titlePrefix}<span>{ENROLL_HEADER_CONTENT.titleHighlight}</span></h1>
            <p>{ENROLL_HEADER_CONTENT.description}</p>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="enroll-stepper-wrapper">
            {ENROLL_STEPPER.map((st, idx) => (
              <React.Fragment key={st.step}>
                <div className="enroll-step-container">
                  <div className={`enroll-step-number ${step >= st.step ? 'active' : ''}`}>
                    {st.step === 3 && step === 3 ? <Check size={14} /> : st.step}
                  </div>
                  <span className={`enroll-step-label ${step === st.step ? 'active' : ''}`}>{st.label}</span>
                </div>
                {idx < ENROLL_STEPPER.length - 1 && (
                  <div className={`enroll-step-line ${step >= st.step + 1 ? 'active' : ''}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* STEP 3: SUCCESS */}
          {step === 3 && (
            <div className="enroll-success-box">
              <div className="enroll-success-icon-circle">
                <CheckCircle size={40} />
              </div>
              <h2 className="enroll-success-title">{ENROLL_SUCCESS_CONTENT.title}</h2>
              <p className="enroll-success-desc">
                Thank you, <strong>{form.name}</strong>. Your payment was successfully processed. We have locked in your slot for the <strong>{selectedProgramData.title} ({activePricing.label || `${form.duration} Weeks`})</strong>.
              </p>
              
              <div className="enroll-success-summary">
                <div><strong>{ENROLL_SUCCESS_CONTENT.bioLabel}</strong> {form.age} Years &bull; Blood group {form.bloodGroup} &bull; Weight {form.weight} kg &bull; Height {form.height}</div>
                <div><strong>{ENROLL_SUCCESS_CONTENT.addressLabel}</strong> {form.address}</div>
                <div><strong>{ENROLL_SUCCESS_CONTENT.gatewayLabel}</strong> {ENROLL_SUCCESS_CONTENT.gatewayValue}</div>
                <div className="enroll-success-total">
                  {ENROLL_SUCCESS_CONTENT.activeValueLabel} ₹{activePricing.offer.toLocaleString('en-IN')}/-
                </div>
              </div>

              <button onClick={() => navigate('/services')} className="btn btn-primary enroll-success-btn">
                {ENROLL_SUCCESS_CONTENT.returnBtnText}
              </button>
            </div>
          )}

          {/* STEP 1 & 2 CONTENT WRAPPER */}
          {step < 3 && (
            <div className="enroll-grid-layout">
              
              {/* LEFT SIDE PANEL (Forms) */}
              <div className="enroll-form-panel">
                
                {/* STEP 1: BIOLOGICAL & PERSONAL STATS */}
                {step === 1 && (
                  <form onSubmit={handleDetailsSubmit} className="enroll-step-form">
                    <h3 className="enroll-form-title">
                      {ENROLL_FORM_LABELS.step1Title}
                    </h3>

                    <div className="enroll-form-grid-vertical">
                      
                      {/* Name input */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="name">{ENROLL_FORM_LABELS.name}</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-input"
                          placeholder={ENROLL_FORM_LABELS.namePlaceholder}
                          value={form.name}
                          onChange={handleInput}
                        />
                        {errors.name && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.name}</div>}
                      </div>

                      {/* Email & Phone */}
                      <div className="enroll-form-grid-half">
                        <div className="form-group">
                          <label className="form-label" htmlFor="email">{ENROLL_FORM_LABELS.email}</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            placeholder={ENROLL_FORM_LABELS.emailPlaceholder}
                            value={form.email}
                            onChange={handleInput}
                          />
                          {errors.email && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.email}</div>}
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="phone">{ENROLL_FORM_LABELS.phone}</label>
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="form-input"
                            placeholder={ENROLL_FORM_LABELS.phonePlaceholder}
                            value={form.phone}
                            onChange={handleInput}
                          />
                          {errors.phone && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.phone}</div>}
                        </div>
                      </div>

                      {/* Program choice override dropdowns */}
                      <div className="enroll-form-grid-asym">
                        <div className="form-group">
                          <label className="form-label" htmlFor="program">{ENROLL_FORM_LABELS.program}</label>
                          <select
                            id="program"
                            name="program"
                            className="form-input pointer-input"
                            value={form.program}
                            onChange={handleInput}
                          >
                            {programs.map(p => (
                              <option key={p.id} value={p.id}>{p.title}</option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="duration">{ENROLL_FORM_LABELS.duration}</label>
                          <select
                            id="duration"
                            name="duration"
                            className="form-input pointer-input"
                            value={form.duration}
                            onChange={handleInput}
                          >
                            <option value={4}>4 Weeks</option>
                            <option value={8}>8 Weeks</option>
                            <option value={12}>12 Weeks</option>
                            <option value={24}>24 Weeks</option>
                            <option value={48}>48 Weeks</option>
                          </select>
                        </div>
                      </div>

                      {/* DOB and automatic age calculation */}
                      <div className="enroll-form-grid-asym">
                        <div className="form-group">
                          <label className="form-label" htmlFor="dob">{ENROLL_FORM_LABELS.dob}</label>
                          <input
                            type="date"
                            id="dob"
                            name="dob"
                            className="form-input"
                            value={form.dob}
                            onChange={handleDOBChange}
                          />
                          {errors.dob && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.dob}</div>}
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="age">{ENROLL_FORM_LABELS.age}</label>
                          <input
                            type="text"
                            id="age"
                            name="age"
                            className="form-input disabled-input"
                            placeholder={ENROLL_FORM_LABELS.agePlaceholder}
                            readOnly
                            value={form.age ? `${form.age} Years` : ''}
                          />
                        </div>
                      </div>

                      {/* Stats details: Blood Group, Weight, Height */}
                      <div className="enroll-form-grid-thirds">
                        <div className="form-group">
                          <label className="form-label" htmlFor="bloodGroup">{ENROLL_FORM_LABELS.bloodGroup}</label>
                          <select
                            id="bloodGroup"
                            name="bloodGroup"
                            className="form-input pointer-input"
                            value={form.bloodGroup}
                            onChange={handleInput}
                          >
                            <option value="">{ENROLL_FORM_LABELS.bloodGroupSelect}</option>
                            {BLOOD_GROUPS.map(bg => (
                              <option key={bg} value={bg}>{bg}</option>
                            ))}
                          </select>
                          {errors.bloodGroup && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.bloodGroup}</div>}
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="weight">{ENROLL_FORM_LABELS.weight}</label>
                          <input
                            type="text"
                            id="weight"
                            name="weight"
                            className="form-input"
                            placeholder={ENROLL_FORM_LABELS.weightPlaceholder}
                            value={form.weight}
                            onChange={handleInput}
                          />
                          {errors.weight && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.weight}</div>}
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="height">{ENROLL_FORM_LABELS.height}</label>
                          <input
                            type="text"
                            id="height"
                            name="height"
                            className="form-input"
                            placeholder={ENROLL_FORM_LABELS.heightPlaceholder}
                            value={form.height}
                            onChange={handleInput}
                          />
                          {errors.height && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.height}</div>}
                        </div>
                      </div>

                      {/* Address */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="address">{ENROLL_FORM_LABELS.address}</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="form-input"
                          placeholder={ENROLL_FORM_LABELS.addressPlaceholder}
                          value={form.address}
                          onChange={handleInput}
                        />
                        {errors.address && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.address}</div>}
                      </div>

                    </div>

                    <button type="submit" className="btn btn-primary enroll-submit-btn">
                      {ENROLL_FORM_LABELS.proceedToPayment} <ArrowRight size={16} />
                    </button>
                  </form>
                )}

                {/* STEP 2: SECURE PAYMENT GATEWAY (RAZORPAY) */}
                {step === 2 && (
                  <form onSubmit={handlePaymentSubmit} className="enroll-payment-form">
                    <div>
                      <h3 className="enroll-payment-title">
                        {ENROLL_PAYMENT_CONTENT.title}
                      </h3>
                      <p className="enroll-payment-subtitle">
                        {ENROLL_PAYMENT_CONTENT.subtitle}
                      </p>
                    </div>

                    {/* Summary Info Cards */}
                    <div className="enroll-summary-grid">
                      <div className="enroll-summary-card">
                        <h4 className="enroll-card-label">
                          {ENROLL_PAYMENT_CONTENT.billingDetailsTitle}
                        </h4>
                        <div className="enroll-card-details">
                          <div><strong>Name:</strong> {form.name}</div>
                          <div><strong>Email:</strong> {form.email}</div>
                          <div><strong>Phone:</strong> {form.phone}</div>
                        </div>
                      </div>

                      <div className="enroll-summary-card">
                        <h4 className="enroll-card-label">
                          {ENROLL_PAYMENT_CONTENT.bioParamsTitle}
                        </h4>
                        <div className="enroll-card-details">
                          {form.age} Years &bull; Blood group {form.bloodGroup} &bull; Weight {form.weight} kg &bull; Height {form.height}
                        </div>
                      </div>
                    </div>

                    {/* Security & Badges */}
                    <div className="enroll-security-card">
                      <Shield size={36} color="var(--primary)" />
                      <div className="enroll-security-text">
                        <strong>{ENROLL_PAYMENT_CONTENT.securityTitle}</strong>
                        <div className="desc">{ENROLL_PAYMENT_CONTENT.securityDescription}</div>
                      </div>
                    </div>

                    {/* Pay Button */}
                    <button 
                      type="submit" 
                      className={`btn btn-primary enroll-pay-btn ${isProcessingPayment ? 'loading' : ''}`}
                      disabled={isProcessingPayment}
                    >
                      {isProcessingPayment ? (
                        <>
                          <RefreshCw className="spin-animation" size={16} /> {ENROLL_PAYMENT_CONTENT.connectingNode}
                        </>
                      ) : (
                        <>
                          <CreditCard size={18} /> {ENROLL_PAYMENT_CONTENT.paySecurely} ₹{activePricing.offer.toLocaleString('en-IN')}/-
                        </>
                      )}
                    </button>
                  </form>
                )}

              </div>

              {/* RIGHT SIDE PANEL (Summary Card) */}
              <div className="enroll-sidebar">
                <div>
                  <h4 className="enroll-sidebar-title">
                    {ENROLL_SIDEBAR_CONTENT.title}
                  </h4>
                  <p className="enroll-sidebar-subtitle">
                    {ENROLL_SIDEBAR_CONTENT.subtitle}
                  </p>
                </div>

                {/* Package Details Box */}
                <div className="enroll-package-box">
                  <span className="enroll-package-label">
                    {ENROLL_SIDEBAR_CONTENT.programTermLabel}
                  </span>
                  <h4 className="enroll-package-title">
                    {selectedProgramData.title}
                  </h4>
                  <div className="enroll-package-desc">
                    {activePricing.label || `${form.duration} Weeks duration setup`}
                  </div>
                </div>

                {/* Pricing Box */}
                <div className="enroll-pricing-box">
                  <div className="enroll-pricing-row">
                    <span>{ENROLL_SIDEBAR_CONTENT.originalPrice}</span>
                    <span>₹{activePricing.original.toLocaleString('en-IN')}/-</span>
                  </div>
                  <div className="enroll-pricing-row-main">
                    <span>{ENROLL_SIDEBAR_CONTENT.offerPrice}</span>
                    <span className="enroll-pricing-value">₹{activePricing.offer.toLocaleString('en-IN')}/-</span>
                  </div>
                  <div className="enroll-savings-badge">
                    {ENROLL_SIDEBAR_CONTENT.youSave} ₹{(activePricing.original - activePricing.offer).toLocaleString('en-IN')}/- ({Math.round(((activePricing.original - activePricing.offer) / activePricing.original) * 100)}% Off)
                  </div>
                </div>

                <div className="enroll-protection-section">
                  <div className="enroll-protection-line">
                    <Shield size={16} color="var(--primary)" />
                    <span>{ENROLL_SIDEBAR_CONTENT.guarantees[0]}</span>
                  </div>
                  <div className="enroll-protection-line">
                    <Heart size={16} color="var(--secondary)" />
                    <span>{ENROLL_SIDEBAR_CONTENT.guarantees[1]}</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
    );
  } catch (err) {
    return (
      <div className="enroll-error-main">
        <div className="enroll-error-box">
          <h2>Enrollment Module Error</h2>
          <p>We caught an error. Diagnostics trace details:</p>
          <pre className="enroll-error-stack">
            {err.stack || err.toString()}
          </pre>
          <Link to="/services" className="enroll-error-link">
            Return to Services
          </Link>
        </div>
      </div>
    );
  }
};

export default Enroll;
