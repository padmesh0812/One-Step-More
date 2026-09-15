import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, Heart, Droplet, Flame, ArrowRight, RefreshCw, Info, CheckCircle2 } from 'lucide-react';
import { BMI_CONTENT } from '../../constants';
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

    let cat = BMI_CONTENT.categories.healthy.name;
    let col = BMI_CONTENT.categories.healthy.color;
    let adv = BMI_CONTENT.categories.healthy.advice;

    if (calculatedBmi < 18.5) {
      cat = BMI_CONTENT.categories.underweight.name;
      col = BMI_CONTENT.categories.underweight.color;
      adv = BMI_CONTENT.categories.underweight.advice;
    } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
      cat = BMI_CONTENT.categories.healthy.name;
      col = BMI_CONTENT.categories.healthy.color;
      adv = BMI_CONTENT.categories.healthy.advice;
    } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
      cat = BMI_CONTENT.categories.overweight.name;
      col = BMI_CONTENT.categories.overweight.color;
      adv = BMI_CONTENT.categories.overweight.advice;
    } else {
      cat = BMI_CONTENT.categories.obese.name;
      col = BMI_CONTENT.categories.obese.color;
      adv = BMI_CONTENT.categories.obese.advice;
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
            <h3>{BMI_CONTENT.title}</h3>
            <p>{BMI_CONTENT.subtitle}</p>
          </div>
        </div>

        {/* Unit Toggle */}
        <div className="bmi-unit-toggle">
          <button 
            className={`bmi-unit-btn ${unit === 'metric' ? 'active' : ''}`}
            onClick={() => setUnit('metric')}
          >
            {BMI_CONTENT.units.metric}
          </button>
          <button 
            className={`bmi-unit-btn ${unit === 'imperial' ? 'active' : ''}`}
            onClick={() => setUnit('imperial')}
          >
            {BMI_CONTENT.units.imperial}
          </button>
        </div>
      </div>

      <div className="bmi-form-grid">
        {/* Gender selector */}
        <div className="bmi-input-group">
          <label className="bmi-label">{BMI_CONTENT.labels.gender}</label>
          <div className="bmi-gender-toggle">
            <button
              type="button"
              className={`bmi-gender-btn ${gender === 'female' ? 'active' : ''}`}
              onClick={() => setGender('female')}
            >
              {BMI_CONTENT.genders.female}
            </button>
            <button
              type="button"
              className={`bmi-gender-btn ${gender === 'male' ? 'active' : ''}`}
              onClick={() => setGender('male')}
            >
              {BMI_CONTENT.genders.male}
            </button>
          </div>
        </div>

        {/* Age selector */}
        <div className="bmi-input-group">
          <label className="bmi-label">{BMI_CONTENT.labels.age}</label>
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
            {unit === 'metric' ? BMI_CONTENT.labels.heightMetric : BMI_CONTENT.labels.heightImperial}
          </label>
          {unit === 'metric' ? (
            <div className="bmi-range-input-wrap">
              <input 
                type="number" 
                min="100" 
                max="230" 
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
            <div className="bmi-imperial-row">
              <div className="bmi-imperial-item">
                <input 
                  type="number" 
                  min="3" 
                  max="7" 
                  value={heightFt}
                  onChange={(e) => setHeightFt(Number(e.target.value))}
                  className="bmi-number-input" 
                />
                <span className="bmi-sublabel">ft</span>
              </div>
              <div className="bmi-imperial-item">
                <input 
                  type="number" 
                  min="0" 
                  max="11" 
                  value={heightIn}
                  onChange={(e) => setHeightIn(Number(e.target.value))}
                  className="bmi-number-input" 
                />
                <span className="bmi-sublabel">in</span>
              </div>
            </div>
          )}
        </div>

        {/* Weight Input */}
        <div className="bmi-input-group">
          <label className="bmi-label">
            {unit === 'metric' ? BMI_CONTENT.labels.weightMetric : BMI_CONTENT.labels.weightImperial}
          </label>
          {unit === 'metric' ? (
            <div className="bmi-range-input-wrap">
              <input 
                type="number" 
                min="30" 
                max="180" 
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="bmi-number-input" 
              />
              <input 
                type="range" 
                min="40" 
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

      {/* Results Box */}
      <div className="bmi-results-box" style={{ borderColor: `${color}40` }}>
        {/* Top Summary Row */}
        <div className="bmi-score-row">
          <div className="bmi-gauge-col">
            <div className="bmi-val" style={{ color: color }}>
              {bmi}
            </div>
            <div className="bmi-score-tag">{BMI_CONTENT.labels.bmiScore}</div>
          </div>

          <div className="bmi-category-col">
            <span className="bmi-cat-badge" style={{ backgroundColor: `${color}18`, color: color, borderColor: `${color}40` }}>
              {category}
            </span>
            <div className="bmi-ideal-row">
              <Heart size={14} color="var(--primary)" />
              <span>{BMI_CONTENT.labels.idealRange}: <strong>{idealWeightMin} – {idealWeightMax}</strong></span>
            </div>
          </div>
        </div>

        {/* Visual Progress Meter */}
        <div className="bmi-meter-track">
          <div className="bmi-meter-bar underweight"></div>
          <div className="bmi-meter-bar normal"></div>
          <div className="bmi-meter-bar overweight"></div>
          <div className="bmi-meter-bar obese"></div>
          <div 
            className="bmi-meter-pointer" 
            style={{ left: `${gaugePercent}%`, backgroundColor: color }}
            title={`BMI: ${bmi}`}
          />
        </div>
        <div className="bmi-meter-labels">
          <span>&lt;18.5</span>
          <span>18.5 - 24.9</span>
          <span>25.0 - 29.9</span>
          <span>30.0+</span>
        </div>

        {/* Secondary Metrics: Water & Calories */}
        <div className="bmi-secondary-metrics">
          <div className="bmi-metric-card">
            <div className="metric-icon-wrap water">
              <Droplet size={18} color="#0284C7" />
            </div>
            <div>
              <div className="metric-lbl">{BMI_CONTENT.labels.waterTarget}</div>
              <div className="metric-val">{dailyWater} {BMI_CONTENT.labels.litersPerDay}</div>
            </div>
          </div>

          <div className="bmi-metric-card">
            <div className="metric-icon-wrap flame">
              <Flame size={18} color="#F57C00" />
            </div>
            <div>
              <div className="metric-lbl">{BMI_CONTENT.labels.calorieTarget}</div>
              <div className="metric-val">~{dailyCalories} {BMI_CONTENT.labels.kcalPerDay}</div>
            </div>
          </div>
        </div>

        {/* Personalized Clinical Advice */}
        <div className="bmi-advice-box">
          <div className="advice-header">
            <Info size={15} color="var(--primary)" />
            <span>{BMI_CONTENT.labels.lifestyleGuidance}</span>
          </div>
          <p className="advice-text">{advice}</p>
        </div>

        {/* CTAs */}
        <div className="bmi-cta-row">
          <button 
            onClick={() => navigate('/services', { state: { tab: bmi >= 25 ? 'diet' : 'combo' } })} 
            className="btn btn-primary bmi-action-btn"
          >
            {BMI_CONTENT.labels.getPlanBtn} <ArrowRight size={16} />
          </button>
          <button 
            onClick={() => navigate('/contact')} 
            className="btn btn-outline bmi-action-btn"
          >
            {BMI_CONTENT.labels.talkCoachBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BmiCalculator;
