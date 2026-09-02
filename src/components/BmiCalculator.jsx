import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, Heart, Droplet, Flame, ArrowRight, RefreshCw, Info, CheckCircle2 } from 'lucide-react';
import './BmiCalculator.css';

const BmiCalculator = () => {
  const navigate = useNavigate();

  // Unit Mode: 'metric' (cm, kg) or 'imperial' (ft/in, lbs)
  const [unit, setUnit] = useState('metric');
  const [gender, setGender] = useState('female');
  const [age, setAge] = useState(28);

  // Metric state
  const [heightCm, setHeightCm] = useState(162);
  const [weightKg, setWeightKg] = useState(62);

  // Imperial state
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(4);
  const [weightLbs, setWeightLbs] = useState(136);

  // Calculate BMI and health metrics
  const { bmi, category, color, idealWeightMin, idealWeightMax, dailyWater, dailyCalories, advice } = useMemo(() => {
    let hM = 0;
    let wKg = 0;

    if (unit === 'metric') {
      hM = Number(heightCm) / 100;
      wKg = Number(weightKg);
    } else {
      const totalInches = (Number(heightFt) * 12) + Number(heightIn);
      hM = totalInches * 0.0254;
      wKg = Number(weightLbs) * 0.453592;
    }

    if (!hM || hM <= 0 || !wKg || wKg <= 0) {
      return {
        bmi: 0,
        category: 'N/A',
        color: '#888',
        idealWeightMin: 0,
        idealWeightMax: 0,
        dailyWater: 0,
        dailyCalories: 0,
        advice: ''
      };
    }

    const calculatedBmi = Number((wKg / (hM * hM)).toFixed(1));

    // Ideal Weight Range (BMI 18.5 - 24.9)
    const minIdealKg = Number((18.5 * (hM * hM)).toFixed(1));
    const maxIdealKg = Number((24.9 * (hM * hM)).toFixed(1));

    let cat = 'Normal Weight';
    let col = '#2E7D32'; // brand green
    let adv = 'Your BMI is within the healthy zone. Focus on balanced nutrition, functional yoga for strength, and sustainable lifestyle consistency.';

    if (calculatedBmi < 18.5) {
      cat = 'Underweight';
      col = '#0284C7';
      adv = 'You are below the optimal weight range. We recommend a nutrient-dense meal plan with adequate healthy fats, complex carbs, and strength-building yoga flows.';
    } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
      cat = 'Healthy Weight';
      col = '#2E7D32';
      adv = 'Great job! Maintain your metabolic vitality with nutrient-dense meals and restorative alignment yoga.';
    } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
      cat = 'Overweight';
      col = '#F57C00'; // brand orange
      adv = 'You are slightly above your ideal weight. Our sustainable nutrition and live group yoga sessions can help you shed fat without starvation diets.';
    } else {
      cat = 'Obese Range';
      col = '#DC2626';
      adv = 'Personalized clinical nutrition and guided joint-friendly yoga will help reduce systemic inflammation and safely reset your metabolism.';
    }

    // Daily Water Intake estimation (approx 35ml per kg)
    const waterL = Number((wKg * 0.035).toFixed(1));

    // Estimated BMR / Calorie Target
    let bmr = 0;
    if (gender === 'female') {
      bmr = Math.round(10 * wKg + 6.25 * (hM * 100) - 5 * Number(age) - 161);
    } else {
      bmr = Math.round(10 * wKg + 6.25 * (hM * 100) - 5 * Number(age) + 5);
    }

    // TDEE with moderate activity multiplier (~1.375)
    const tdee = Math.round(bmr * 1.35);

    return {
      bmi: calculatedBmi,
      category: cat,
      color: col,
      idealWeightMin: unit === 'metric' ? `${minIdealKg} kg` : `${Math.round(minIdealKg * 2.20462)} lbs`,
      idealWeightMax: unit === 'metric' ? `${maxIdealKg} kg` : `${Math.round(maxIdealKg * 2.20462)} lbs`,
      dailyWater: waterL,
      dailyCalories: tdee,
      advice: adv
    };
  }, [unit, gender, age, heightCm, weightKg, heightFt, heightIn, weightLbs]);

  // Gauge indicator percentage (clamps between 10 and 40 BMI mapped to 0% - 100%)
  const gaugePercent = Math.min(Math.max(((bmi - 12) / (38 - 12)) * 100, 0), 100);

  return (
    <div className="bmi-card">
      <div className="bmi-card-header">
        <div className="bmi-title-wrap">
          <div className="bmi-icon-badge">
            <Scale size={22} color="var(--primary)" />
          </div>
          <div>
            <h3>Smart BMI & Health Calculator</h3>
            <p>Instant body composition assessment & ideal targets</p>
          </div>
        </div>

        {/* Unit Toggle */}
        <div className="bmi-unit-toggle">
          <button 
            className={`bmi-unit-btn ${unit === 'metric' ? 'active' : ''}`}
            onClick={() => setUnit('metric')}
          >
            Metric (cm, kg)
          </button>
          <button 
            className={`bmi-unit-btn ${unit === 'imperial' ? 'active' : ''}`}
            onClick={() => setUnit('imperial')}
          >
            Imperial (ft, lbs)
          </button>
        </div>
      </div>

      <div className="bmi-form-grid">
        {/* Gender selector */}
        <div className="bmi-input-group">
          <label className="bmi-label">Gender</label>
          <div className="bmi-gender-toggle">
            <button
              type="button"
              className={`bmi-gender-btn ${gender === 'female' ? 'active' : ''}`}
              onClick={() => setGender('female')}
            >
              👩 Female
            </button>
            <button
              type="button"
              className={`bmi-gender-btn ${gender === 'male' ? 'active' : ''}`}
              onClick={() => setGender('male')}
            >
              👨 Male
            </button>
          </div>
        </div>

        {/* Age selector */}
        <div className="bmi-input-group">
          <label className="bmi-label">Age (Years)</label>
          <input 
            type="number" 
            min="10" 
            max="95" 
            value={age} 
            onChange={(e) => setAge(Math.max(1, Number(e.target.value)))}
            className="bmi-number-input" 
          />
        </div>

        {/* Height Input */}
        <div className="bmi-input-group">
          <label className="bmi-label">
            Height {unit === 'metric' ? '(cm)' : '(Feet & Inches)'}
          </label>
          {unit === 'metric' ? (
            <div className="bmi-range-input-wrap">
              <input 
                type="number" 
                min="100" 
                max="240" 
                value={heightCm} 
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="bmi-number-input" 
              />
              <input 
                type="range" 
                min="120" 
                max="210" 
                value={heightCm} 
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="bmi-slider" 
              />
            </div>
          ) : (
            <div className="bmi-dual-input">
              <div className="bmi-sub-input">
                <input 
                  type="number" 
                  min="3" 
                  max="7" 
                  value={heightFt} 
                  onChange={(e) => setHeightFt(Number(e.target.value))}
                  className="bmi-number-input" 
                />
                <span>ft</span>
              </div>
              <div className="bmi-sub-input">
                <input 
                  type="number" 
                  min="0" 
                  max="11" 
                  value={heightIn} 
                  onChange={(e) => setHeightIn(Number(e.target.value))}
                  className="bmi-number-input" 
                />
                <span>in</span>
              </div>
            </div>
          )}
        </div>

        {/* Weight Input */}
        <div className="bmi-input-group">
          <label className="bmi-label">
            Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
          </label>
          {unit === 'metric' ? (
            <div className="bmi-range-input-wrap">
              <input 
                type="number" 
                min="30" 
                max="200" 
                value={weightKg} 
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="bmi-number-input" 
              />
              <input 
                type="range" 
                min="35" 
                max="140" 
                value={weightKg} 
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="bmi-slider" 
              />
            </div>
          ) : (
            <div className="bmi-range-input-wrap">
              <input 
                type="number" 
                min="70" 
                max="400" 
                value={weightLbs} 
                onChange={(e) => setWeightLbs(Number(e.target.value))}
                className="bmi-number-input" 
              />
              <input 
                type="range" 
                min="80" 
                max="300" 
                value={weightLbs} 
                onChange={(e) => setWeightLbs(Number(e.target.value))}
                className="bmi-slider" 
              />
            </div>
          )}
        </div>
      </div>

      {/* Results Output Display */}
      <div className="bmi-results-box">
        <div className="bmi-score-header">
          <div>
            <div className="bmi-score-label">Your BMI Score</div>
            <div className="bmi-score-number" style={{ color: color }}>
              {bmi}
            </div>
          </div>
          <div className="bmi-status-badge" style={{ backgroundColor: `${color}18`, color: color, borderColor: `${color}40` }}>
            <span className="bmi-status-dot" style={{ backgroundColor: color }}></span>
            {category}
          </div>
        </div>

        {/* BMI Progress Bar Meter */}
        <div className="bmi-meter-wrapper">
          <div className="bmi-meter-bar">
            <div className="meter-segment segment-under" title="Underweight (< 18.5)"></div>
            <div className="meter-segment segment-normal" title="Normal (18.5 - 24.9)"></div>
            <div className="meter-segment segment-over" title="Overweight (25 - 29.9)"></div>
            <div className="meter-segment segment-obese" title="Obese (30+)"></div>
            <div 
              className="bmi-meter-pointer" 
              style={{ left: `${gaugePercent}%`, borderColor: color }}
            ></div>
          </div>
          <div className="bmi-meter-labels">
            <span>18.5</span>
            <span>25.0</span>
            <span>30.0</span>
          </div>
        </div>

        {/* Health Insights Badges */}
        <div className="bmi-insights-grid">
          <div className="bmi-insight-item">
            <div className="bmi-insight-icon">
              <Heart size={16} color="var(--primary)" />
            </div>
            <div>
              <div className="bmi-insight-title">Ideal Weight Range</div>
              <div className="bmi-insight-value">{idealWeightMin} &ndash; {idealWeightMax}</div>
            </div>
          </div>

          <div className="bmi-insight-item">
            <div className="bmi-insight-icon">
              <Droplet size={16} color="#0284C7" />
            </div>
            <div>
              <div className="bmi-insight-title">Daily Hydration</div>
              <div className="bmi-insight-value">{dailyWater} Liters / day</div>
            </div>
          </div>

          <div className="bmi-insight-item">
            <div className="bmi-insight-icon">
              <Flame size={16} color="var(--secondary)" />
            </div>
            <div>
              <div className="bmi-insight-title">Daily Energy Need</div>
              <div className="bmi-insight-value">~{dailyCalories} kcal</div>
            </div>
          </div>
        </div>

        <p className="bmi-advice-text">
          <Info size={15} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }} />
          {advice}
        </p>

        <button
          onClick={() => {
            const prog = category === 'Healthy Weight' ? 'group-yoga' : 'diet';
            navigate('/services', { state: { tab: prog } });
          }}
          className="btn btn-primary bmi-action-btn"
        >
          Explore Tailored Plans for Your BMI <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default BmiCalculator;
