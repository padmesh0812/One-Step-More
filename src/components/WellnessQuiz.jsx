import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Award, Compass, Droplet, Flame, RotateCcw } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'timeline',
    question: 'What describes your current lifestyle stage?',
    options: [
      { value: '0-6w', label: 'Postpartum Recovery', description: 'Early healing & nutrient restoration' },
      { value: '6-12w', label: 'Busy Mom / Parent', description: 'Balancing child care and personal habits' },
      { value: '3-6m', label: 'Active Professional', description: 'Looking to manage stress, sleep, and core posture' },
      { value: '6m+', label: 'Consistency Seeker', description: 'Rebuilding long-term fitness and diet routines' }
    ]
  },
  {
    id: 'focus',
    question: 'What is your primary wellness goal right now?',
    options: [
      { value: 'core', label: 'Rebuild Core & Posture', description: 'Address stability, back pain, and strength' },
      { value: 'energy', label: 'Boost Energy & Sleep Support', description: 'Overcome chronic fatigue and nourish body' },
      { value: 'weight', label: 'Sustainable Weight Management', description: 'Healthy weight adjustments without starvation' },
      { value: 'mind', label: 'Mental Wellness & Stress Relief', description: 'Mindful breathing and resetting nervous system' }
    ]
  },
  {
    id: 'time',
    question: 'How much time can you realistically dedicate daily?',
    options: [
      { value: '15m', label: '15 Minutes', description: 'Bite-sized routines, fits during breaks' },
      { value: '30m', label: '30 Minutes', description: 'Balanced routines for focused progress' },
      { value: '45m+', label: '45 Minutes or more', description: 'Complete wellness and movement sessions' }
    ]
  }
];

const WellnessQuiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    timeline: '',
    focus: '',
    time: ''
  });

  const handleSelect = (optionValue) => {
    const currentQuestionId = QUESTIONS[currentStep].id;
    setAnswers(prev => ({
      ...prev,
      [currentQuestionId]: optionValue
    }));
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({
      timeline: '',
      focus: '',
      time: ''
    });
  };

  const getRecommendation = () => {
    const { timeline, focus, time } = answers;

    let pathName = "Gentle Restorative Pathway";
    let explanation = "Your body is in a critical phase of healing and replenishment. We focus strictly on diaphragmatic breathing, alignment stability, and restorative nutrition to support energy reserves.";
    let yogaFocus = "Savasana, Cat-Cow (gentle), Diaphragmatic Breathing";
    let dietFocus = "Warm broths, mineral-rich grain bowls, anti-inflammatory spices";
    let calorieAdd = 400; 
    let baseCalories = 2000;
    let waterTarget = 3.2; // Liters

    if (timeline === '0-6w') {
      pathName = "Nurture & Heal Blueprint";
      explanation = "Focus is entirely on deep tissue rest, hydration, and alignment. Avoid high-stress structural training. Engage only in light pelvic floor activation and mindful breathing.";
      yogaFocus = "Supine pelvic tilts, deep breathing, chest openers";
      dietFocus = "Warm, easily digestible foods, collagen support, plenty of water";
      waterTarget = 3.4;
      baseCalories = 2100;
    } else if (focus === 'core') {
      pathName = "Core Foundation & Posture Blueprint";
      explanation = "Designed specifically to close the abdominal gap, strengthen pelvic floor muscles, and address lower back strain caused by carrying baby or sitting at a desk.";
      yogaFocus = "Glute bridges, bird-dog variations, diaphragmatic breaths";
      dietFocus = "Lean proteins (collagen synthesis), vitamin C, mineral-rich broths";
      waterTarget = 3.0;
      baseCalories = 1900;
    } else if (focus === 'energy' || timeline === '6-12w') {
      pathName = "Vitality & Restorative Energy Course";
      explanation = "Tailored for combatting chronic fatigue. We focus on movement sequences that open up tight shoulders and iron-rich meal plans that raise blood oxygen and restore energy.";
      yogaFocus = "Chest stretch, gentle twists, child's pose restoration";
      dietFocus = "Iron-rich leafy greens, complex carbs for slow energy release, magnesium";
      waterTarget = 3.2;
      baseCalories = 2000;
    } else if (focus === 'weight') {
      pathName = "Metabolic Flow & Habit Plan";
      explanation = "Sustainable weight management. We avoid crash deficits to preserve thyroid health and muscle tissue, combining progressive yoga with nutrition coaching.";
      yogaFocus = "Gentle sun salutations, modified warriors, alignment poses";
      dietFocus = "High fiber vegetables, lean protein, healthy fats, seed cycling";
      waterTarget = 3.1;
      baseCalories = 1850;
    } else {
      pathName = "Mind-Body Balance Routine";
      explanation = "Focus on resetting your nervous system. Learn to manage anxiety, improve sleep quality, and align yoga practice with stress release.";
      yogaFocus = "Legs up the wall, breathing patterns, restorative flows";
      dietFocus = "Herbal teas, anti-inflammatory greens, healthy fats for hormone regulation";
      waterTarget = 3.0;
      baseCalories = 1950;
    }

    const calculatedCalories = baseCalories + (answers.timeline === '0-6w' || answers.timeline === '6-12w' ? calorieAdd : 200);

    return {
      pathName,
      explanation,
      yogaFocus,
      dietFocus,
      calories: calculatedCalories,
      water: waterTarget,
      duration: time === '15m' ? '15 minutes daily' : time === '30m' ? '30 minutes daily' : '45+ minutes daily'
    };
  };

  const isCurrentQuestionAnswered = answers[QUESTIONS[currentStep]?.id] !== '';

  return (
    <div className="quiz-section">
      <div className="quiz-container">
        {currentStep < QUESTIONS.length ? (
          <div>
            <div className="quiz-header">
              <h3>Personalized Wellness Quiz</h3>
              <p>Find the custom diet, yoga, and lifestyle path that matches your current routine and goals.</p>
            </div>

            <div className="quiz-progress-wrapper">
              <div className="quiz-progress-bar">
                <div 
                  className="quiz-progress-fill" 
                  style={{ width: `${((currentStep) / QUESTIONS.length) * 100}%` }}
                />
              </div>
              <div className="quiz-step-indicator">
                <span>Step {currentStep + 1} of {QUESTIONS.length}</span>
                <span>{Math.round(((currentStep) / QUESTIONS.length) * 100)}% Complete</span>
              </div>
            </div>

            <h4 className="quiz-question-title">{QUESTIONS[currentStep].question}</h4>

            <div className="quiz-options-grid">
              {QUESTIONS[currentStep].options.map((opt) => (
                <div
                  key={opt.value}
                  className={`quiz-option-card ${answers[QUESTIONS[currentStep].id] === opt.value ? 'selected' : ''}`}
                  onClick={() => handleSelect(opt.value)}
                >
                  <div style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '6px' }}>{opt.label}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text)' }}>{opt.description}</div>
                </div>
              ))}
            </div>

            <div className="quiz-nav-buttons">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="btn btn-outline btn-sm"
                style={{ opacity: currentStep === 0 ? 0.4 : 1, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <ArrowLeft size={16} /> Back
              </button>

              <button
                onClick={handleNext}
                disabled={!isCurrentQuestionAnswered}
                className="btn btn-primary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {currentStep === QUESTIONS.length - 1 ? 'Get My Blueprint' : 'Next'} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="quiz-result">
            <div className="quiz-result-icon">
              <Compass size={40} />
            </div>
            <h4>Your Wellness Recommendation is Ready</h4>
            <p>Based on your timeline, goals, and schedule, we recommend the following focus path:</p>

            {(() => {
              const rec = getRecommendation();
              return (
                <div>
                  <div className="quiz-result-rec">
                    <h5>{rec.pathName}</h5>
                    <p style={{ marginBottom: '20px', fontSize: '0.95rem' }}>{rec.explanation}</p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--heading)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Recommended Movement</strong>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text)' }}>{rec.yogaFocus}</span>
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--heading)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Nutrition Strategy</strong>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text)' }}>{rec.dietFocus}</span>
                      </div>
                    </div>

                    <div className="quiz-stats">
                      <div className="quiz-stat-item">
                        <div className="quiz-stat-val" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                          <Flame size={18} color="var(--primary)" /> {rec.calories}
                        </div>
                        <div className="quiz-stat-lbl">Target Calories / Day</div>
                      </div>
                      <div className="quiz-stat-item">
                        <div className="quiz-stat-val" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                          <Droplet size={18} color="#3388FF" /> {rec.water}L
                        </div>
                        <div className="quiz-stat-lbl">Daily Water Target</div>
                      </div>
                      <div className="quiz-stat-item">
                        <div className="quiz-stat-val" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                          <Award size={18} color="var(--secondary)" /> {answers.time === '15m' ? '15m' : answers.time === '30m' ? '30m' : '45m+'}
                        </div>
                        <div className="quiz-stat-lbl">Daily Commitment</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <button 
                      onClick={resetQuiz} 
                      className="btn btn-outline"
                      style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <RotateCcw size={16} /> Retake Quiz
                    </button>
                    <button 
                      onClick={() => {
                        let formProgram = 'general';
                        const pathNameLower = rec.pathName.toLowerCase();
                        if (pathNameLower.includes('diet') || pathNameLower.includes('metabolic')) {
                          formProgram = 'diet';
                        } else if (pathNameLower.includes('core') || pathNameLower.includes('posture')) {
                          formProgram = 'one-yoga';
                        } else if (pathNameLower.includes('vitality') || pathNameLower.includes('energy')) {
                          formProgram = 'combo';
                        }

                        const msg = `I completed the Wellness Quiz and received the recommended path: "${rec.pathName}".\n\n- Suggested Movement: ${rec.yogaFocus}\n- Suggested Nutrition: ${rec.dietFocus}\n- Target Calories: ${rec.calories} kcal/day\n- Target Hydration: ${rec.water}L/day\n- Daily Commitment: ${answers.time === '15m' ? '15 minutes' : answers.time === '30m' ? '30 minutes' : '45+ minutes'}\n\nI would like to schedule a consultation with an expert to start this program.`;

                        navigate('/contact', { state: { program: formProgram, message: msg } });
                      }}
                      className="btn btn-primary"
                    >
                      Consult with an Expert
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default WellnessQuiz;
