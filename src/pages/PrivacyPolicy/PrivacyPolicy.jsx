import React from 'react';
import { PRIVACY_POLICY_CONTENT } from '../../constants';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <main className="section container">
      <div className="privacy-wrapper">
        <h1>{PRIVACY_POLICY_CONTENT.title}</h1>
        <div className="privacy-date">{PRIVACY_POLICY_CONTENT.lastUpdated}</div>

        <div className="privacy-section-block">
          {PRIVACY_POLICY_CONTENT.introParagraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {PRIVACY_POLICY_CONTENT.sections.map((section, sIdx) => (
          <div key={sIdx} className="privacy-section-block">
            <h3>{section.title}</h3>
            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default PrivacyPolicy;
