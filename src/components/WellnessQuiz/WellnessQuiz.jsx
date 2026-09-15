import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Award, Compass, Droplet, Flame, RotateCcw } from 'lucide-react';
import { QUIZ_HEADER_CONTENT, QUIZ_QUESTIONS, QUIZ_PATHWAYS, QUIZ_LABELS } from '../../constants';
import './WellnessQuiz.css';

const WellnessQuiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    timeline: '',
    focus: '',
    time: ''
  });

  const handleSelect = (optionValue) => {
    const currentQuestionId = QUIZ_QUESTIONS[currentStep].id;
    setAnswers(prev => ({
      ...prev,
      [currentQuestionId]: optionValue
    }));
  };

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length) {
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

    let pathConfig = QUIZ_PATHWAYS.default;

    if (timeline === '0-6w') {
      pathConfig = QUIZ_PATHWAYS.postpartum;
    } else if (focus === 'core') {
      pathConfig = QUIZ_PATHWAYS.core;
    } else if (focus === 'energy' || timeline === '6-12w') {
      pathConfig = QUIZ_PATHWAYS.energy;
    } else if (focus === 'weight') {
      pathConfig = QUIZ_PATHWAYS.weight;
    } else if (focus === 'mind') {
      pathConfig = QUIZ_PATHWAYS.mind;
    }

    const calculatedCalories = pathConfig.baseCalories + (timeline === '0-6w' || timeline === '6-12w' ? 400 : 200);

    return {
      pathName: pathConfig.pathName,
      explanation: pathConfig.explanation,
      yogaFocus: pathConfig.yogaFocus,
      dietFocus: pathConfig.dietFocus,
      calories: calculatedCalories,
      water: pathConfig.waterTarget,
      duration: time === '15m' ? '15 minutes daily' : time === '30m' ? '30 minutes daily' : '45+ minutes daily'
    };
  };

  const isCurrentQuestionAnswered = answers[QUIZ_QUESTIONS[currentStep]?.id] !== '';

  return (
    <div className="quiz-section">
      <div className="quiz-container">
        {currentStep < QUIZ_QUESTIONS.length ? (
          <div className="quiz-content-wrapper">
            <div className="quiz-header">
              <div className="quiz-title-wrap">
                <div className="quiz-icon-badge">
                  <Compass size={22} color="var(--primary)" />
                </div>
                <div>
                  <h3>{QUIZ_HEADER_CONTENT.title}</h3>
                  <p>{QUIZ_HEADER_CONTENT.subtitle}</p>
                </div>
              </div>
              <div className="quiz-progress-pill">
                Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="quiz-progress-track">
              <div 
                className="quiz-progress-bar" 
                style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Card */}
            <div className="quiz-question-box">
              <h4 className="quiz-question-text">
                {QUIZ_QUESTIONS[currentStep].question}
              </h4>

              <div className="quiz-options-grid">
                {QUIZ_QUESTIONS[currentStep].options.map((opt) => {
                  const isSelected = answers[QUIZ_QUESTIONS[currentStep].id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={`quiz-option-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelect(opt.value)}
                    >
                      <div className="option-radio-circle">
                        {isSelected && <div className="option-radio-dot"></div>}
                      </div>
                      <div className="option-text-wrap">
                        <div className="option-title">{opt.label}</div>
                        <div className="option-desc">{opt.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Navigation Actions */}
            <div className="quiz-actions-row">
              {currentStep > 0 ? (
                <button type="button" onClick={handleBack} className="btn btn-outline quiz-back-btn">
                  <ArrowLeft size={16} /> {QUIZ_LABELS.backBtn}
                </button>
              ) : (
                <div></div>
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={!isCurrentQuestionAnswered}
                className="btn btn-primary quiz-next-btn"
              >
                {currentStep === QUIZ_QUESTIONS.length - 1 ? QUIZ_LABELS.seePlanBtn : QUIZ_LABELS.nextBtn} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* RESULT SCREEN */
          (() => {
            const rec = getRecommendation();
            return (
              <div className="quiz-result-box">
                <div className="quiz-result-header">
                  <div className="result-badge-pill">
                    <Award size={15} /> Verified Blueprint
                  </div>
                  <h3 className="result-title">{rec.pathName}</h3>
                  <p className="result-desc">{rec.explanation}</p>
                </div>

                <div className="result-metrics-grid">
                  <div className="result-metric-card">
                    <Flame size={20} color="#F57C00" />
                    <div>
                      <div className="metric-tag">{QUIZ_LABELS.caloricTarget}</div>
                      <div className="metric-figure">~{rec.calories} kcal/day</div>
                    </div>
                  </div>

                  <div className="result-metric-card">
                    <Droplet size={20} color="#0284C7" />
                    <div>
                      <div className="metric-tag">{QUIZ_LABELS.hydrationTarget}</div>
                      <div className="metric-figure">{rec.water} Liters/day</div>
                    </div>
                  </div>
                </div>

                <div className="result-breakdown-card">
                  <div className="breakdown-row">
                    <strong>{QUIZ_LABELS.yogaMovementFocus}:</strong>
                    <span>{rec.yogaFocus} ({rec.duration})</span>
                  </div>
                  <div className="breakdown-row">
                    <strong>{QUIZ_LABELS.nutritionGuidance}:</strong>
                    <span>{rec.dietFocus}</span>
                  </div>
                </div>

                <div className="result-actions-row">
                  <button 
                    onClick={() => navigate('/enroll', { state: { program: 'combo', duration: 4 } })} 
                    className="btn btn-primary result-cta-btn"
                  >
                    {QUIZ_LABELS.lockInBtn} <ArrowRight size={16} />
                  </button>
                  <button 
                    onClick={resetQuiz} 
                    className="btn btn-outline result-reset-btn"
                  >
                    <RotateCcw size={15} /> {QUIZ_LABELS.retakeBtn}
                  </button>
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
};

export default WellnessQuiz;
