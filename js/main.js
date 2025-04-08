// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ===== Header Scroll Effect =====
    const header = document.getElementById('header');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopButton = document.querySelector('.back-to-top');
    
    // ===== Reverse Countdown Timer =====
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');
    
    // Set the start date (today)
    const startDate = new Date();
    
    // Handle scroll events
    window.addEventListener('scroll', function() {
        // Add scrolled class to header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/hide back to top button
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        
        // Update active nav link based on scroll position
        updateActiveNav();
    });
    
    // ===== Mobile Menu Toggle =====
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent scroll when menu is open
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset for header height
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Update Active Navigation Link =====
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + header.offsetHeight + 20;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
            
            // Special case for the header/hero section
            if (scrollPosition < document.getElementById('services').offsetTop) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#header') {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ===== Testimonial Slider =====
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Hide all active dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial and dot
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentIndex = index;
    }
    
    // Next testimonial
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    });
    
    // Previous testimonial
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Auto rotate testimonials every 5 seconds
    setInterval(function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
    
    // ===== Stats Counter Animation =====
    const stats = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'), 10);
            let count = 0;
            const duration = 2000; // 2 seconds
            const interval = duration / target;
            
            const counter = setInterval(() => {
                count++;
                stat.textContent = count;
                
                if (count === target) {
                    clearInterval(counter);
                }
            }, interval);
        });
        
        statsAnimated = true;
    }
    
    // Start stats animation when about section is in view
    window.addEventListener('scroll', function() {
        const aboutSection = document.getElementById('about');
        const aboutPosition = aboutSection.getBoundingClientRect();
        
        if (aboutPosition.top < window.innerHeight && aboutPosition.bottom >= 0) {
            animateStats();
        }
    });
    
    // ===== Form Handling =====
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showFormStatus('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (in a real application, you would send this to a server)
            setTimeout(() => {
                showFormStatus('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
            }, 1000);
        });
    }
    
    // Display form status messages
    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status';
        formStatus.classList.add(type);
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formStatus.className = 'form-status';
        }, 5000);
    }
    
    // Handle newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Basic validation
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
    
    // Initialize the active navigation on page load
    updateActiveNav();
    
    // ===== Update Reverse Countdown =====
    function updateCountdown() {
        const now = new Date();
        const diff = now - startDate; // Time passed in milliseconds
        
        // Calculate time components
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
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
