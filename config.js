// Configuration file for Embus Landing Page

// Target date for countdown (format: YYYY, MM-1, DD, HH, MM, SS)
// Note: Month is 0-indexed (0 = January, 11 = December)
const TARGET_DATE = new Date(2025, 9, 15, 10, 0, 0); // October 15, 2025 at 10:00:00

// Site settings
const SITE_SETTINGS = {
  // Title for countdown section
  countdownTitle: "Coming Soon - Launching in:",
  
  // Note below the countdown
  countdownNote: "Until we launch our new platform",
  
  // Social media links (empty string if not available)
  socialLinks: {
    facebook: "https://facebook.com/embus",
    twitter: "https://twitter.com/embus",
    instagram: "https://instagram.embus.in",
    linkedin: "https://linkedin.com/company/embus",
    youtube: ""
  }
};

// Export the configurations
export { TARGET_DATE, SITE_SETTINGS };