import React, { useState } from 'react';

const WhatsAppWidget = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Pre-filled WhatsApp message URL
  const whatsappUrl = "https://wa.me/918115660790?text=Hi!%20I%20visited%20your%20website%20One%20Step%20More%20and%20want%20to%20learn%20more%20about%20your%20wellness%20programs.";

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-widget"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Chat on WhatsApp"
    >
      <span className={`whatsapp-tooltip ${isHovered ? 'visible' : ''}`}>
        Chat on WhatsApp
      </span>
      <div className="whatsapp-icon-wrapper">
        <svg 
          viewBox="0 0 24 24" 
          width="28" 
          height="28" 
          fill="currentColor"
        >
          <path d="M12.012 2C6.48 2 2 6.48 2 12.012c0 1.764.468 3.48 1.344 5L2 22l5.124-1.344c1.476.804 3.144 1.236 4.884 1.236 5.532 0 10.012-4.48 10.012-10.012C22.02 6.48 17.544 2 12.012 2zm0 18.024c-1.584 0-3.132-.42-4.488-1.224l-.324-.192-3.324.876.888-3.24-.216-.348A7.994 7.994 0 0 1 3.996 12.012c0-4.416 3.6-8.016 8.016-8.016 4.416 0 8.016 3.6 8.016 8.016 0 4.416-3.6 8.016-8.016 8.016zm4.62-6.3c-.252-.12-1.488-.732-1.716-.816-.228-.084-.396-.12-.564.12-.168.252-.648.816-.792.984-.144.168-.288.192-.54.072a7.844 7.844 0 0 1-2.904-1.788 8.653 8.653 0 0 1-2.016-2.508c-.144-.252-.012-.384.108-.504.12-.12.252-.288.384-.432.12-.144.168-.24.252-.396.084-.168.048-.312-.024-.456-.072-.144-.564-1.356-.768-1.86-.204-.492-.408-.42-.564-.428h-.48c-.168 0-.444.06-.672.312-.228.252-.876.852-.876 2.076 0 1.224.888 2.4 1.008 2.568.12.168 1.752 2.676 4.248 3.756.588.252 1.056.408 1.416.516.6.192 1.14.168 1.572.108.48-.072 1.488-.612 1.692-1.2.204-.588.204-1.092.144-1.2-.06-.108-.228-.168-.48-.288z" />
        </svg>
      </div>
    </a>
  );
};

export default WhatsAppWidget;
