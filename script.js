// Import configuration from config.js
import { TARGET_DATE, SITE_SETTINGS } from './config.js';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Get countdown elements
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');
    
    // Update page content from config
    if (SITE_SETTINGS.countdownTitle) {
        document.querySelector('.countdown h2').textContent = SITE_SETTINGS.countdownTitle;
    }
    
    if (SITE_SETTINGS.countdownNote) {
        document.querySelector('.countdown-note').textContent = SITE_SETTINGS.countdownNote;
    }
    
    // Update social media links if they exist
    const socialLinks = document.querySelectorAll('.social-icon');
    if (socialLinks.length > 0 && SITE_SETTINGS.socialLinks) {
        const socialPlatforms = ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'];
        socialLinks.forEach((link, index) => {
            if (index < socialPlatforms.length) {
                const platform = socialPlatforms[index];
                if (SITE_SETTINGS.socialLinks[platform]) {
                    link.href = SITE_SETTINGS.socialLinks[platform];
                }
            }
        });
    }
    
    // Update the countdown
    function updateCountdown() {
        // Get the target date from config
        const targetDate = TARGET_DATE.getTime();
        
        // Get the current date and time
        const now = new Date().getTime();
        
        // Find the time remaining
        const remaining = targetDate - now;
        
        // If past the target date, show zeros
        if (remaining < 0) {
            daysEl.textContent = '0';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }
        
        // Calculate time components
        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        
        // Update the DOM elements
        daysEl.textContent = days;
        hoursEl.textContent = hours < 10 ? '0' + hours : hours;
        minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    }
    
    // Update the countdown every second
    setInterval(updateCountdown, 1000);
    
    // Initial update
    updateCountdown();
});