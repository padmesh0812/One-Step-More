import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Check, AlertCircle, ArrowLeft, Heart, Shield, CreditCard, Smartphone, CheckCircle, RefreshCw } from 'lucide-react';

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

    // Payment method states
    const [paymentMethod, setPaymentMethod] = useState('gpay');
    const [upiId, setUpiId] = useState('');
    const [cardDetails, setCardDetails] = useState({
      number: '',
      expiry: '',
      cvv: '',
      name: ''
    });
    const [paymentErrors, setPaymentErrors] = useState({});
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const [errors, setErrors] = useState({});

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
    const selectedProgramData = PROGRAMS_LIST.find(p => p.id === form.program) || PROGRAMS_LIST[0];
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

    // Process secure checkout
    const handlePaymentSubmit = (e) => {
      e.preventDefault();
      const pErrors = {};

      if (['gpay', 'phonepe', 'bhim', 'paytm'].includes(paymentMethod)) {
        if (!upiId.trim()) {
          pErrors.upiId = "UPI ID is required.";
        } else if (!upiId.includes('@')) {
          pErrors.upiId = "Please enter a valid UPI ID (e.g. username@bank).";
        }
      } else {
        if (!cardDetails.number.trim() || cardDetails.number.replace(/\s/g, '').length < 16) {
          pErrors.cardNumber = "Enter a valid 16-digit card number.";
        }
        if (!cardDetails.expiry.trim() || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardDetails.expiry)) {
          pErrors.expiry = "Enter expiry date (MM/YY).";
        }
        if (!cardDetails.cvv.trim() || cardDetails.cvv.length < 3) {
          pErrors.cvv = "Enter 3-digit CVV.";
        }
        if (!cardDetails.name.trim()) {
          pErrors.cardName = "Enter cardholder name.";
        }
      }

      if (Object.keys(pErrors).length > 0) {
        setPaymentErrors(pErrors);
        return;
      }

      setIsProcessingPayment(true);

      // Simulate network request to payment gateway
      setTimeout(() => {
        setIsProcessingPayment(false);
        setStep(3); // Success step
      }, 2000);
    };

    return (
      <main style={{ backgroundColor: '#FAF8F5', minHeight: '80vh', padding: '40px 0' }}>
        <div className="container">
          
          {/* Back Trigger */}
          <div style={{ marginBottom: '24px' }}>
            <button 
              onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} 
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.95rem',
                fontWeight: 600
              }}
            >
              <ArrowLeft size={16} /> Back {step > 1 ? 'to Stats' : 'to Programs'}
            </button>
          </div>

          <div className="section-header" style={{ marginBottom: '40px' }}>
            <h1>Complete Your <span>Enrollment</span></h1>
            <p>Provide your biology parameters and secure checkout to lock in your personalized roadmap call.</p>
          </div>

          {/* Stepper Progress Indicator */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '600px',
            margin: '0 auto 40px auto',
            gap: '15px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: step >= 1 ? 'var(--primary)' : '#ccc',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}>1</div>
              <span style={{ fontSize: '0.9rem', fontWeight: step === 1 ? 700 : 500, color: step === 1 ? 'var(--heading)' : 'var(--text-muted)' }}>Biological Stats</span>
            </div>
            <div style={{ height: '2px', width: '50px', backgroundColor: step >= 2 ? 'var(--primary)' : '#ccc' }}></div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: step >= 2 ? 'var(--primary)' : '#ccc',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}>2</div>
              <span style={{ fontSize: '0.9rem', fontWeight: step === 2 ? 700 : 500, color: step === 2 ? 'var(--heading)' : 'var(--text-muted)' }}>Secure Payment</span>
            </div>
            <div style={{ height: '2px', width: '50px', backgroundColor: step === 3 ? 'var(--primary)' : '#ccc' }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: step === 3 ? 'var(--primary)' : '#ccc',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}><Check size={14} /></div>
              <span style={{ fontSize: '0.9rem', fontWeight: step === 3 ? 700 : 500, color: step === 3 ? 'var(--heading)' : 'var(--text-muted)' }}>Success</span>
            </div>
          </div>

          {/* STEP 3: SUCCESS */}
          {step === 3 && (
            <div style={{
              maxWidth: '650px',
              margin: '0 auto',
              backgroundColor: '#fff',
              borderRadius: '24px',
              padding: '40px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border)'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: 'rgba(74, 117, 89, 0.1)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto'
              }}>
                <CheckCircle size={40} />
              </div>
              <h2 style={{ color: 'var(--heading)', marginBottom: '16px' }}>Enrollment Confirmed!</h2>
              <p style={{ color: 'var(--text)', marginBottom: '24px', lineHeight: 1.7 }}>
                Thank you, <strong>{form.name}</strong>. Your payment was successfully processed. We have locked in your slot for the <strong>{selectedProgramData.title} ({form.duration} Weeks)</strong>.
              </p>
              
              <div style={{
                backgroundColor: '#FBFBFA',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'left',
                fontSize: '0.9rem',
                marginBottom: '30px',
                border: '1px solid var(--border)',
                display: 'grid',
                gap: '10px'
              }}>
                <div><strong>Biological Configuration:</strong> {form.age} Years &bull; Blood group {form.bloodGroup} &bull; Weight {form.weight} kg &bull; Height {form.height}</div>
                <div><strong>Delivery Address:</strong> {form.address}</div>
                <div><strong>Secured Gateway:</strong> Simulated Razorpay Checkout ({paymentMethod.toUpperCase()})</div>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px', color: 'var(--primary)', fontWeight: 700 }}>
                  Active Transaction Value: ₹{activePricing.offer.toLocaleString('en-IN')}/-
                </div>
              </div>

              <button onClick={() => navigate('/services')} className="btn btn-primary" style={{ minWidth: '220px' }}>
                Return to Services
              </button>
            </div>
          )}

          {/* STEP 1 & 2 CONTENT WRAPPER */}
          {step < 3 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '40px',
              alignItems: 'start'
            }} className="enroll-grid-layout">
              
              {/* LEFT SIDE PANEL (Forms) */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '24px',
                padding: '40px',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border)'
              }}>
                
                {/* STEP 1: BIOLOGICAL & PERSONAL STATS */}
                {step === 1 && (
                  <form onSubmit={handleDetailsSubmit}>
                    <h3 style={{ fontSize: '1.3rem', color: 'var(--heading)', marginBottom: '24px', fontWeight: 700 }}>
                      Biological Stats & Contact Info
                    </h3>

                    <div style={{ display: 'grid', gap: '20px' }}>
                      
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
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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
                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
                        <div className="form-group">
                          <label className="form-label" htmlFor="program">Change Program Choice</label>
                          <select
                            id="program"
                            name="program"
                            className="form-input"
                            style={{ cursor: 'pointer' }}
                            value={form.program}
                            onChange={handleInput}
                          >
                            {PROGRAMS_LIST.map(p => (
                              <option key={p.id} value={p.id}>{p.title}</option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="duration">Weeks Duration</label>
                          <select
                            id="duration"
                            name="duration"
                            className="form-input"
                            style={{ cursor: 'pointer' }}
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
                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
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
                            className="form-input"
                            placeholder="Automatic"
                            readOnly
                            value={form.age ? `${form.age} Years` : ''}
                            style={{ backgroundColor: '#F9FAFB', cursor: 'not-allowed' }}
                          />
                        </div>
                      </div>

                      {/* Stats details: Blood Group, Weight, Height */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                          <label className="form-label" htmlFor="bloodGroup">Blood Group</label>
                          <select
                            id="bloodGroup"
                            name="bloodGroup"
                            className="form-input"
                            style={{ cursor: 'pointer' }}
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

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '30px', padding: '16px', fontWeight: 700 }}>
                      Proceed to Payment &rarr;
                    </button>
                  </form>
                )}

                {/* STEP 2: SECURE PAYMENT GATEWAY (UPI / CARD) */}
                {step === 2 && (
                  <form onSubmit={handlePaymentSubmit}>
                    <h3 style={{ fontSize: '1.3rem', color: 'var(--heading)', marginBottom: '8px', fontWeight: 700 }}>
                      Secure Gateway Selection
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                      Choose your payment mode to securely checkout via the local Razorpay API node.
                    </p>

                    <div style={{ display: 'grid', gap: '24px' }}>
                      
                      {/* Payment Selection Grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '12px'
                      }}>
                        <div 
                          onClick={() => { setPaymentMethod('gpay'); setPaymentErrors({}); }}
                          style={{
                            border: '2px solid',
                            borderColor: paymentMethod === 'gpay' ? 'var(--primary)' : 'var(--border)',
                            backgroundColor: paymentMethod === 'gpay' ? 'rgba(74, 117, 89, 0.05)' : '#fff',
                            borderRadius: '12px',
                            padding: '12px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: '0.2s',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <GPayLogo />
                        </div>

                        <div 
                          onClick={() => { setPaymentMethod('phonepe'); setPaymentErrors({}); }}
                          style={{
                            border: '2px solid',
                            borderColor: paymentMethod === 'phonepe' ? 'var(--primary)' : 'var(--border)',
                            backgroundColor: paymentMethod === 'phonepe' ? 'rgba(74, 117, 89, 0.05)' : '#fff',
                            borderRadius: '12px',
                            padding: '12px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: '0.2s',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <PhonePeLogo />
                        </div>

                        <div 
                          onClick={() => { setPaymentMethod('bhim'); setPaymentErrors({}); }}
                          style={{
                            border: '2px solid',
                            borderColor: paymentMethod === 'bhim' ? 'var(--primary)' : 'var(--border)',
                            backgroundColor: paymentMethod === 'bhim' ? 'rgba(74, 117, 89, 0.05)' : '#fff',
                            borderRadius: '12px',
                            padding: '12px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: '0.2s',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <BhimLogo />
                        </div>

                        <div 
                          onClick={() => { setPaymentMethod('paytm'); setPaymentErrors({}); }}
                          style={{
                            border: '2px solid',
                            borderColor: paymentMethod === 'paytm' ? 'var(--primary)' : 'var(--border)',
                            backgroundColor: paymentMethod === 'paytm' ? 'rgba(74, 117, 89, 0.05)' : '#fff',
                            borderRadius: '12px',
                            padding: '12px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: '0.2s',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <PaytmLogo />
                        </div>

                        <div 
                          onClick={() => { setPaymentMethod('card'); setPaymentErrors({}); }}
                          style={{
                            border: '2px solid',
                            borderColor: paymentMethod === 'card' ? 'var(--primary)' : 'var(--border)',
                            backgroundColor: paymentMethod === 'card' ? 'rgba(74, 117, 89, 0.05)' : '#fff',
                            borderRadius: '12px',
                            padding: '12px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: '0.2s',
                            gridColumn: 'span 2',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <CardLogo />
                        </div>
                      </div>

                      {/* SUB-FORM FOR UPI */}
                      {['gpay', 'phonepe', 'bhim', 'paytm'].includes(paymentMethod) ? (
                        <div style={{
                          backgroundColor: '#F9FAFB',
                          borderRadius: '16px',
                          padding: '20px',
                          border: '1px solid var(--border)'
                        }}>
                          <label className="form-label" htmlFor="upiId" style={{ textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.75rem' }}>
                            Enter {paymentMethod.toUpperCase()} UPI Address
                          </label>
                          <input 
                            type="text"
                            id="upiId"
                            placeholder="e.g. mobileNumber@ybl or username@paytm"
                            className="form-input"
                            value={upiId}
                            onChange={(e) => {
                              setUpiId(e.target.value);
                              if (paymentErrors.upiId) setPaymentErrors(prev => ({ ...prev, upiId: '' }));
                            }}
                            style={{ backgroundColor: '#fff' }}
                          />
                          {paymentErrors.upiId && <div className="form-error-msg" style={{ marginTop: '6px' }}><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{paymentErrors.upiId}</div>}
                          <p style={{ margin: '10px 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            * A collect request request notification will be pushed securely to your mobile app.
                          </p>
                        </div>
                      ) : (
                        
                        /* SUB-FORM FOR CREDIT/DEBIT CARD */
                        <div style={{
                          backgroundColor: '#F9FAFB',
                          borderRadius: '16px',
                          padding: '24px',
                          border: '1px solid var(--border)',
                          display: 'grid',
                          gap: '16px'
                        }}>
                          {/* Card Number */}
                          <div className="form-group">
                            <label className="form-label" htmlFor="cardNumber">Card Number</label>
                            <input 
                              type="text"
                              id="cardNumber"
                              placeholder="4111 2222 3333 4444"
                              className="form-input"
                              value={cardDetails.number}
                              onChange={(e) => {
                                setCardDetails({ ...cardDetails, number: e.target.value });
                                if (paymentErrors.cardNumber) setPaymentErrors(prev => ({ ...prev, cardNumber: '' }));
                              }}
                              style={{ backgroundColor: '#fff' }}
                            />
                            {paymentErrors.cardNumber && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{paymentErrors.cardNumber}</div>}
                          </div>

                          {/* Expiry & CVV */}
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div className="form-group">
                              <label className="form-label" htmlFor="expiry">Expiry (MM/YY)</label>
                              <input 
                                type="text"
                                id="expiry"
                                placeholder="12/28"
                                className="form-input"
                                value={cardDetails.expiry}
                                onChange={(e) => {
                                  setCardDetails({ ...cardDetails, expiry: e.target.value });
                                  if (paymentErrors.expiry) setPaymentErrors(prev => ({ ...prev, expiry: '' }));
                                }}
                                style={{ backgroundColor: '#fff' }}
                              />
                              {paymentErrors.expiry && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{paymentErrors.expiry}</div>}
                            </div>

                            <div className="form-group">
                              <label className="form-label" htmlFor="cvv">CVV</label>
                              <input 
                                type="password"
                                id="cvv"
                                placeholder="***"
                                maxLength="3"
                                className="form-input"
                                value={cardDetails.cvv}
                                onChange={(e) => {
                                  setCardDetails({ ...cardDetails, cvv: e.target.value });
                                  if (paymentErrors.cvv) setPaymentErrors(prev => ({ ...prev, cvv: '' }));
                                }}
                                style={{ backgroundColor: '#fff' }}
                              />
                              {paymentErrors.cvv && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{paymentErrors.cvv}</div>}
                            </div>
                          </div>

                          {/* Card Name */}
                          <div className="form-group">
                            <label className="form-label" htmlFor="cardName">Cardholder Name</label>
                            <input 
                              type="text"
                              id="cardName"
                              placeholder="Name written on card"
                              className="form-input"
                              value={cardDetails.name}
                              onChange={(e) => {
                                setCardDetails({ ...cardDetails, name: e.target.value });
                                if (paymentErrors.cardName) setPaymentErrors(prev => ({ ...prev, cardName: '' }));
                              }}
                              style={{ backgroundColor: '#fff' }}
                            />
                            {paymentErrors.cardName && <div className="form-error-msg"><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{paymentErrors.cardName}</div>}
                          </div>
                        </div>
                      )}
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      disabled={isProcessingPayment}
                      style={{ 
                        width: '100%', 
                        marginTop: '30px', 
                        padding: '16px', 
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      {isProcessingPayment ? (
                        <>
                          <RefreshCw className="spin-animation" size={16} /> Connecting Secure Node...
                        </>
                      ) : (
                        `Pay Securely ₹${activePricing.offer.toLocaleString('en-IN')}/-`
                      )}
                    </button>
                  </form>
                )}

              </div>

              {/* RIGHT SIDE PANEL (Summary Card) */}
              <div style={{
                backgroundColor: '#FAF6F0',
                borderRadius: '24px',
                padding: '30px',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                position: 'sticky',
                top: '100px'
              }}>
                <div>
                  <h4 style={{ color: 'var(--heading)', marginBottom: '4px', fontSize: '1.1rem', fontWeight: 700 }}>
                    Chosen Pricing Details
                  </h4>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: 0 }}>
                    Calculated based on your selection.
                  </p>
                </div>

                {/* Package Details Box */}
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '1px solid var(--border)'
                }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Selected Program & Term
                  </span>
                  <h4 style={{ color: 'var(--heading)', margin: '4px 0 0 0', fontSize: '1.05rem', fontWeight: 700 }}>
                    {selectedProgramData.title}
                  </h4>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {form.duration} Weeks duration setup
                  </div>
                </div>

                {/* Pricing Box */}
                <div style={{ display: 'grid', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <span>Original Price:</span>
                    <span style={{ textDecoration: 'line-through' }}>₹{activePricing.original.toLocaleString('en-IN')}/-</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, color: 'var(--heading)' }}>
                    <span>Offer Price:</span>
                    <span style={{ color: 'var(--secondary)', fontSize: '1.3rem' }}>₹{activePricing.offer.toLocaleString('en-IN')}/-</span>
                  </div>
                  <div style={{
                    backgroundColor: 'rgba(74, 117, 89, 0.08)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '0.8rem',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    textAlign: 'center',
                    marginTop: '8px'
                  }}>
                    You Save: ₹{(activePricing.original - activePricing.offer).toLocaleString('en-IN')}/- ({Math.round(((activePricing.original - activePricing.offer) / activePricing.original) * 100)}% Off)
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '0.825rem', color: 'var(--text)', marginBottom: '10px' }}>
                    <Shield size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                    <span>14-day refund protection applies automatically.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '0.825rem', color: 'var(--text)' }}>
                    <Heart size={16} color="var(--secondary)" style={{ flexShrink: 0 }} />
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
      <div style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: '#FFF5F5', color: '#D32F2F', fontFamily: 'sans-serif' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #FFCDD2', borderRadius: '12px', padding: '30px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>Enrollment Module Rendering Error</h2>
          <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '20px' }}>We caught a JavaScript routing or reference error during compilation rendering. Diagnostics trace details:</p>
          <pre style={{ textAlign: 'left', backgroundColor: '#F9F9F9', padding: '15px', borderRadius: '8px', overflowX: 'auto', fontSize: '0.8rem', color: '#333', border: '1px solid #E0E0E0', whiteSpace: 'pre-wrap' }}>
            {err.stack || err.toString()}
          </pre>
          <Link to="/services" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', backgroundColor: 'var(--primary, #4A7559)', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontWeight: 600 }}>
            Return to Services Tab
          </Link>
        </div>
      </div>
    );
  }
};

export default Enroll;
