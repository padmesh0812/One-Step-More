import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Check, AlertCircle, ArrowLeft, Heart, Shield, CreditCard, Smartphone, CheckCircle, RefreshCw } from 'lucide-react';
import './Enroll.css';

const PROGRAMS_LIST = [
  {
    id: 'diet',
    title: "Customized Diet Program",
    pricing: [
      { weeks: 4, original: 4500, offer: 2999 },
      { weeks: 8, original: 8899, offer: 5999 },
      { weeks: 12, original: 12499, offer: 7999 },
      { weeks: 24, original: 21899, offer: 11999 },
      { weeks: 48, original: 43899, offer: 21999 }
    ]
  },
  {
    id: 'child',
    title: "Customized Child Nutrition",
    pricing: [
      { weeks: 4, original: 2500, offer: 1500 },
      { weeks: 8, original: 4900, offer: 2900 },
      { weeks: 12, original: 6900, offer: 3900 },
      { weeks: 24, original: 11900, offer: 5900 },
      { weeks: 48, original: 23900, offer: 11900 }
    ]
  },
  {
    id: 'group-yoga',
    title: "Yoga & Beyond (Group Sessions)",
    pricing: [
      { weeks: 4, original: 1999, offer: 999 },
      { weeks: 8, original: 3899, offer: 1899 },
      { weeks: 12, original: 5799, offer: 2699 },
      { weeks: 24, original: 11499, offer: 4999 },
      { weeks: 48, original: 21999, offer: 7999 }
    ]
  },
  {
    id: 'one-yoga',
    title: "1:1 Live Personal Yoga",
    pricing: [
      { weeks: 4, original: 5999, offer: 2999 },
      { weeks: 8, original: 11899, offer: 5899 },
      { weeks: 12, original: 17499, offer: 8499 },
      { weeks: 24, original: 33999, offer: 15999 },
      { weeks: 48, original: 63999, offer: 27999 }
    ]
  },
  {
    id: 'combo',
    title: "Diet & Group Yoga Combo",
    pricing: [
      { weeks: 4, original: 4499, offer: 2999 },
      { weeks: 8, original: 8899, offer: 5999 },
      { weeks: 12, original: 12499, offer: 7999 },
      { weeks: 24, original: 21899, offer: 11999 },
      { weeks: 48, original: 43899, offer: 21999 }
    ]
  }
];

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Payment brand SVG icons
const GPayLogo = () => (
  <svg viewBox="0 0 100 40" height="22" style={{ display: 'block' }}>
    <path d="M12.4 16.3c0-2.4 1.9-4.3 4.3-4.3 1.2 0 2.3.5 3 1.3l2.8-2.8c-1.5-1.6-3.7-2.6-5.8-2.6-4.6 0-8.3 3.7-8.3 8.3s3.7 8.3 8.3 8.3c2.2 0 4.3-1 5.8-2.6l-2.8-2.8c-.8.8-1.8 1.3-3 1.3-2.4-.1-4.3-2-4.3-4.4z" fill="#4285F4"/>
    <path d="M26.2 8.3H22v16.1h4.2v-6.3h2.6c3.2 0 5.8-2.6 5.8-5.8s-2.6-5.8-5.8-5.8zm0 7.4H26v-3.2h2.2c1.2 0 2.2 1 2.2 2.2s-1 2.2-2.2 2.2z" fill="#EA4335"/>
    <path d="M37.9 14.8c-2.4 0-4.3 1.9-4.3 4.3v5.4h4.2v-5.1c0-.8.6-1.4 1.4-1.4s1.4.6 1.4 1.4v5.1h4.2v-5.4c.1-2.4-1.8-4.3-4.3-4.3z" fill="#FBBC05"/>
    <path d="M51.9 14.8c-2.1 0-3.9 1.5-4.2 3.5h8.4c-.3-2-2.1-3.5-4.2-3.5zm0-2.8c3.2 0 5.8 2.6 5.8 5.8v6.6h-4.2v-1.6c-1.1 1.3-2.8 2-4.6 2-3.2 0-5.8-2.6-5.8-5.8s2.6-5.8 5.8-5.8c1.8 0 3.5.7 4.6 2v-1c0-1.2-1-2.2-2.2-2.2c-.9 0-1.8.5-2.2 1.3l-3.3-1.8c1.3-2.1 3.5-3.3 5.9-3.3z" fill="#34A853"/>
  </svg>
);

const PhonePeLogo = () => (
  <svg viewBox="0 0 100 40" height="22" style={{ display: 'block' }}>
    <rect width="100" height="40" rx="8" fill="#5f259f" />
    <path d="M25 12h8v16h-8zm6 3c0-.6-.4-1-1-1s-1 .4-1 1v6c0 .6.4 1 1 1s1-.4 1-1z" fill="#fff" />
    <circle cx="21" cy="20" r="3" fill="#fff" />
    <text x="38" y="26" fill="#fff" style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '13px' }}>PhonePe</text>
  </svg>
);

const BhimLogo = () => (
  <svg viewBox="0 0 100 40" height="22" style={{ display: 'block' }}>
    <path d="M10 28 L22 12 L35 12 L23 28 Z" fill="#FF9933" />
    <path d="M27 28 L39 12 L43 12 L31 28 Z" fill="#000" />
    <path d="M35 28 L47 12 L59 12 L47 28 Z" fill="#128807" />
    <text x="50" y="26" fill="#003366" style={{ fontFamily: 'sans-serif', fontWeight: '800', fontSize: '12px', fontStyle: 'italic' }}>UPI</text>
  </svg>
);

const PaytmLogo = () => (
  <svg viewBox="0 0 100 40" height="22" style={{ display: 'block' }}>
    <text x="10" y="26" fill="#00baf2" style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '20px' }}>Pay</text>
    <text x="48" y="26" fill="#002e6e" style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '20px' }}>tm</text>
  </svg>
);

const CardLogo = () => (
  <svg viewBox="0 0 100 40" height="22" style={{ display: 'block' }}>
    <rect x="5" y="8" width="40" height="24" rx="4" fill="#1A1F2C" />
    <rect x="10" y="12" width="8" height="6" rx="1" fill="#FFD700" />
    <text x="50" y="22" fill="#fff" style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '8px' }}>VISA</text>
    <circle cx="78" cy="20" r="6" fill="#EB001B" opacity="0.9" />
    <circle cx="86" cy="20" r="6" fill="#F79E1B" opacity="0.9" />
  </svg>
);

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
      program: location.state?.program || 'diet',
      duration: location.state?.weeks || 12,
      bloodGroup: '',
      weight: '',
      height: '',
      dob: '',
      age: '',
      address: ''
    });

    // Dynamic programs & pricing from database
    const [programs, setPrograms] = useState(PROGRAMS_LIST);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const [errors, setErrors] = useState({});

    // Fetch dynamic programs on mount
    useEffect(() => {
      fetch('http://localhost:5000/api/plans')
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
    const selectedProgramData = programs.find(p => p.id === form.program) || programs[0] || PROGRAMS_LIST[0];
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
      if (!form.name.trim()) tempErrors.name = "Full name is required.";
      if (!form.email.trim()) {
        tempErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        tempErrors.email = "Enter a valid email.";
      }
      if (!form.phone.trim()) {
        tempErrors.phone = "Phone number is required.";
      } else if (!/^\+?[0-9\s-]{8,15}$/.test(form.phone.trim())) {
        tempErrors.phone = "Enter a valid phone number.";
      }
      if (!form.dob) tempErrors.dob = "Date of Birth is required.";
      if (!form.bloodGroup) tempErrors.bloodGroup = "Select blood group.";
      if (!form.weight.trim()) tempErrors.weight = "Weight is required.";
      if (!form.height.trim()) tempErrors.height = "Height is required.";
      if (!form.address.trim()) tempErrors.address = "Address is required.";

      if (Object.keys(tempErrors).length > 0) {
        setErrors(tempErrors);
        // Scroll to top of form
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
        // 1. Create order on the backend to dynamically calculate amount and key configuration securely
        const response = await fetch('http://localhost:5000/api/create-order', {
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

        const orderData = await response.json(); // returns orderId, amount, currency, keyId

        // 2. Configure Razorpay Standard Checkout SDK popup options
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "One Step More",
          description: `Enrollment in ${selectedProgramData.title}`,
          order_id: orderData.orderId,
          prefill: {
            name: form.name,
            email: form.email,
            contact: form.phone
          },
          theme: {
            color: "#4A7559"
          },
          handler: async function (paymentResponse) {
            try {
              setIsProcessingPayment(true);
              
              // 3. Post to backend node to verify signature of payment before confirming order
              const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
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
                setStep(3); // Direct to payment success view
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
            <h1>Complete Your <span>Enrollment</span></h1>
            <p>Provide your biology parameters and secure checkout to lock in your personalized roadmap call.</p>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="enroll-stepper-wrapper">
            <div className="enroll-step-container">
              <div className={`enroll-step-number ${step >= 1 ? 'active' : ''}`}>1</div>
              <span className={`enroll-step-label ${step === 1 ? 'active' : ''}`}>Biological Stats</span>
            </div>
            <div className={`enroll-step-line ${step >= 2 ? 'active' : ''}`}></div>
            
            <div className="enroll-step-container">
              <div className={`enroll-step-number ${step >= 2 ? 'active' : ''}`}>2</div>
              <span className={`enroll-step-label ${step === 2 ? 'active' : ''}`}>Secure Payment</span>
            </div>
            <div className={`enroll-step-line ${step === 3 ? 'active' : ''}`}></div>

            <div className="enroll-step-container">
              <div className={`enroll-step-number ${step === 3 ? 'active' : ''}`}><Check size={14} /></div>
              <span className={`enroll-step-label ${step === 3 ? 'active' : ''}`}>Success</span>
            </div>
          </div>

          {/* STEP 3: SUCCESS */}
          {step === 3 && (
            <div className="enroll-success-box">
              <div className="enroll-success-icon-circle">
                <CheckCircle size={40} />
              </div>
              <h2 className="enroll-success-title">Enrollment Confirmed!</h2>
              <p className="enroll-success-desc">
                Thank you, <strong>{form.name}</strong>. Your payment was successfully processed. We have locked in your slot for the <strong>{selectedProgramData.title} ({form.duration} Weeks)</strong>.
              </p>
              
              <div className="enroll-success-summary">
                <div><strong>Biological Configuration:</strong> {form.age} Years &bull; Blood group {form.bloodGroup} &bull; Weight {form.weight} kg &bull; Height {form.height}</div>
                <div><strong>Delivery Address:</strong> {form.address}</div>
                <div><strong>Secured Gateway:</strong> Razorpay Secure Payment (Verified API Node)</div>
                <div className="enroll-success-total">
                  Active Transaction Value: ₹{activePricing.offer.toLocaleString('en-IN')}/-
                </div>
              </div>

              <button onClick={() => navigate('/services')} className="btn btn-primary enroll-success-btn">
                Return to Services
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
                  <form onSubmit={handleDetailsSubmit}>
                    <h3 className="enroll-form-title">
                      Biological Stats & Contact Info
                    </h3>

                    <div className="enroll-form-grid-vertical">
                      
                      {/* Name input */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="name">Full Name</label>
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

                      {/* Email & Phone */}
                      <div className="enroll-form-grid-half">
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
                      </div>

                      {/* Program choice override dropdowns */}
                      <div className="enroll-form-grid-asym">
                        <div className="form-group">
                          <label className="form-label" htmlFor="program">Change Program Choice</label>
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
                          <label className="form-label" htmlFor="duration">Weeks Duration</label>
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
                          <label className="form-label" htmlFor="dob">Date of Birth</label>
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
                          <label className="form-label" htmlFor="age">Calculated Age</label>
                          <input
                            type="text"
                            id="age"
                            name="age"
                            className="form-input disabled-input"
                            placeholder="Automatic"
                            readOnly
                            value={form.age ? `${form.age} Years` : ''}
                          />
                        </div>
                      </div>

                      {/* Stats details: Blood Group, Weight, Height */}
                      <div className="enroll-form-grid-thirds">
                        <div className="form-group">
                          <label className="form-label" htmlFor="bloodGroup">Blood Group</label>
                          <select
                            id="bloodGroup"
                            name="bloodGroup"
                            className="form-input pointer-input"
                            value={form.bloodGroup}
                            onChange={handleInput}
                          >
                            <option value="">Select</option>
                            {BLOOD_GROUPS.map(bg => (
                              <option key={bg} value={bg}>{bg}</option>
                            ))}
                          </select>
                          {errors.bloodGroup && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.bloodGroup}</div>}
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="weight">Weight (kg)</label>
                          <input
                            type="text"
                            id="weight"
                            name="weight"
                            className="form-input"
                            placeholder="e.g. 68"
                            value={form.weight}
                            onChange={handleInput}
                          />
                          {errors.weight && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.weight}</div>}
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="height">Height</label>
                          <input
                            type="text"
                            id="height"
                            name="height"
                            className="form-input"
                            placeholder="e.g. 5ft 4in or 165cm"
                            value={form.height}
                            onChange={handleInput}
                          />
                          {errors.height && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{errors.height}</div>}
                        </div>
                      </div>

                      {/* Address */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="address">Your Physical Address</label>
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

                    </div>

                    <button type="submit" className="btn btn-primary enroll-submit-btn">
                      Proceed to Payment &arr;
                    </button>
                  </form>
                )}

                {/* STEP 2: SECURE PAYMENT GATEWAY (RAZORPAY) */}
                {step === 2 && (
                  <form onSubmit={handlePaymentSubmit} className="enroll-payment-form">
                    <div>
                      <h3 className="enroll-payment-title">
                        Review & Complete Payment
                      </h3>
                      <p className="enroll-payment-subtitle">
                        You will be redirected to the secure Razorpay Checkout node to complete your transaction.
                      </p>
                    </div>

                    {/* Summary Info Cards */}
                    <div className="enroll-summary-grid">
                      <div className="enroll-summary-card">
                        <h4 className="enroll-card-label">
                          Billing Details
                        </h4>
                        <div className="enroll-card-details">
                          <div><strong>Name:</strong> {form.name}</div>
                          <div><strong>Email:</strong> {form.email}</div>
                          <div><strong>Phone:</strong> {form.phone}</div>
                        </div>
                      </div>

                      <div className="enroll-summary-card">
                        <h4 className="enroll-card-label">
                          Biological Parameters
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
                        <strong>100% Encrypted Transactions</strong>
                        <div className="desc">Payments are securely routed via 128-bit SSL encrypted connection through the official Razorpay node.</div>
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
                          <RefreshCw className="spin-animation" size={16} /> Connecting Secure Node...
                        </>
                      ) : (
                        <>
                          <CreditCard size={18} /> Pay Securely ₹{activePricing.offer.toLocaleString('en-IN')}/-
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
                    Chosen Pricing Details
                  </h4>
                  <p className="enroll-sidebar-subtitle">
                    Calculated based on your selection.
                  </p>
                </div>

                {/* Package Details Box */}
                <div className="enroll-package-box">
                  <span className="enroll-package-label">
                    Selected Program & Term
                  </span>
                  <h4 className="enroll-package-title">
                    {selectedProgramData.title}
                  </h4>
                  <div className="enroll-package-desc">
                    {form.duration} Weeks duration setup
                  </div>
                </div>

                {/* Pricing Box */}
                <div className="enroll-pricing-box">
                  <div className="enroll-pricing-row">
                    <span>Original Price:</span>
                    <span>₹{activePricing.original.toLocaleString('en-IN')}/-</span>
                  </div>
                  <div className="enroll-pricing-row-main">
                    <span>Offer Price:</span>
                    <span className="enroll-pricing-value">₹{activePricing.offer.toLocaleString('en-IN')}/-</span>
                  </div>
                  <div className="enroll-savings-badge">
                    You Save: ₹{(activePricing.original - activePricing.offer).toLocaleString('en-IN')}/- ({Math.round(((activePricing.original - activePricing.offer) / activePricing.original) * 100)}% Off)
                  </div>
                </div>

                <div className="enroll-protection-section">
                  <div className="enroll-protection-line">
                    <Shield size={16} color="var(--primary)" />
                    <span>14-day refund protection applies automatically.</span>
                  </div>
                  <div className="enroll-protection-line">
                    <Heart size={16} color="var(--secondary)" />
                    <span>Personalized dietitian review every 7 days.</span>
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
          <h2>Enrollment Module Rendering Error</h2>
          <p>We caught a JavaScript routing or reference error during compilation rendering. Diagnostics trace details:</p>
          <pre className="enroll-error-stack">
            {err.stack || err.toString()}
          </pre>
          <Link to="/services" className="enroll-error-link">
            Return to Services Tab
          </Link>
        </div>
      </div>
    );
  }
};

export default Enroll;
