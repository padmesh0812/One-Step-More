import { CONTACT_INFO, SOCIAL_LINKS } from './common';

export const FOOTER_COLUMNS = {
  getKnowUs: {
    title: "Get to Know Us",
    links: [
      { label: "Home", path: "/" },
      { label: "About Us", path: "/about" },
      { label: "Our Programs", path: "/services" },
      { label: "Wellness Blog", path: "/blog" },
      { label: "Contact Us", path: "/contact" }
    ]
  },
  connectWithUs: {
    title: "Connect with Us",
    links: [
      { label: SOCIAL_LINKS.instagram.label, url: SOCIAL_LINKS.instagram.url, icon: "Instagram" },
      { label: SOCIAL_LINKS.facebook.label, url: SOCIAL_LINKS.facebook.url, icon: "Facebook" },
      { label: SOCIAL_LINKS.youtube.label, url: SOCIAL_LINKS.youtube.url, icon: "Youtube" }
    ]
  },
  privacyPolicies: {
    title: "Privacy & Policies",
    links: [
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms & Conditions", path: "/privacy" },
      { label: "Refund Policy", path: "/privacy" },
      { label: "Disclaimer & Guidance", path: "/privacy" }
    ]
  },
  letUsHelp: {
    title: "Let Us Help You",
    emailLabel: "Email Support:",
    email: CONTACT_INFO.email,
    phoneLabel: "Phone Support:",
    phone: CONTACT_INFO.phone,
    addressLabel: "Office Address:",
    address: CONTACT_INFO.address
  }
};

export const FOOTER_BOTTOM_CONTENT = {
  copyrightNotice: "All rights reserved. • Every Healthy Habit Begins With One Small Step",
  language: "🌐 English",
  country: "🇮🇳 India"
};
