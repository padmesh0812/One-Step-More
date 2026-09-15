export const ENROLL_STEPPER = [
  { step: 1, label: "Biological Stats" },
  { step: 2, label: "Secure Payment" },
  { step: 3, label: "Success" }
];

export const ENROLL_HEADER_CONTENT = {
  titlePrefix: "Complete Your ",
  titleHighlight: "Enrollment",
  description: "Provide your biology parameters and secure checkout to lock in your personalized roadmap call."
};

export const ENROLL_VALIDATION_MESSAGES = {
  name: "Full name is required.",
  emailRequired: "Email is required.",
  emailInvalid: "Enter a valid email.",
  phoneRequired: "Phone number is required.",
  phoneInvalid: "Enter a valid phone number.",
  dob: "Date of Birth is required.",
  bloodGroup: "Select blood group.",
  weight: "Weight is required.",
  height: "Height is required.",
  address: "Address is required."
};

export const ENROLL_FORM_LABELS = {
  step1Title: "Biological Stats & Contact Info",
  name: "Full Name",
  namePlaceholder: "e.g. Sarah Miller",
  email: "Email Address",
  emailPlaceholder: "e.g. sarah@example.com",
  phone: "Phone Number",
  phonePlaceholder: "e.g. +91 98765 43210",
  program: "Change Program Choice",
  duration: "Weeks Duration",
  dob: "Date of Birth",
  age: "Calculated Age",
  agePlaceholder: "Automatic",
  bloodGroup: "Blood Group",
  bloodGroupSelect: "Select",
  weight: "Weight (kg)",
  weightPlaceholder: "e.g. 68",
  height: "Height",
  heightPlaceholder: "e.g. 5ft 4in or 165cm",
  address: "Your Physical Address",
  addressPlaceholder: "e.g. Gomti Nagar, Lucknow, UP",
  proceedToPayment: "Proceed to Payment"
};

export const ENROLL_PAYMENT_CONTENT = {
  title: "Review & Complete Payment",
  subtitle: "You will be redirected to the secure Razorpay Checkout node to complete your transaction.",
  billingDetailsTitle: "Billing Details",
  bioParamsTitle: "Biological Parameters",
  securityTitle: "100% Encrypted Transactions",
  securityDescription: "Payments are securely routed via 128-bit SSL encrypted connection through the official Razorpay node.",
  connectingNode: "Connecting Secure Node...",
  paySecurely: "Pay Securely"
};

export const ENROLL_SUCCESS_CONTENT = {
  title: "Enrollment Confirmed!",
  bioLabel: "Biological Configuration:",
  addressLabel: "Delivery Address:",
  gatewayLabel: "Secured Gateway:",
  gatewayValue: "Razorpay Secure Payment (Verified API Node)",
  activeValueLabel: "Active Transaction Value:",
  returnBtnText: "Return to Services"
};

export const ENROLL_SIDEBAR_CONTENT = {
  title: "Chosen Pricing Details",
  subtitle: "Calculated based on your selection.",
  programTermLabel: "Selected Program & Term",
  originalPrice: "Original Price:",
  offerPrice: "Offer Price:",
  youSave: "You Save:",
  guarantees: [
    "14-day refund protection applies automatically.",
    "Personalized dietitian review every 7 days."
  ]
};
