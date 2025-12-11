// Beena Engineering Works - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navigation Toggle for Mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu after clicking
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Basic validation
            let isValid = true;
            const requiredFields = ['name', 'email', 'service', 'message'];

            requiredFields.forEach(field => {
                const element = document.getElementById(field);
                if (!data[field] || data[field].trim() === '') {
                    element.style.borderColor = '#ff6b35';
                    isValid = false;
                } else {
                    element.style.borderColor = '#e1e1e1';
                }
            });

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (data.email && !emailRegex.test(data.email)) {
                document.getElementById('email').style.borderColor = '#ff6b35';
                isValid = false;
            }

            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Check if using EmailJS or Formspree
                const formAction = contactForm.getAttribute('action');

                if (formAction && formAction.includes('formspree.io')) {
                    // Using Formspree - let the form submit normally
                    contactForm.submit();
                    showNotification('Thank you! Your message has been sent successfully. We will get back to you within 24 hours.', 'success');
                } else {
                    // Using EmailJS
                    const emailData = {
                        from_name: data.name,
                        from_email: data.email,
                        phone: data.phone || 'Not provided',
                        service: data.service,
                        message: data.message,
                        to_name: 'Beena Engineering Works',
                        reply_to: data.email
                    };

                    emailjs.send(
                        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
                        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
                        emailData
                    ).then(function(response) {
                        console.log('Email sent successfully!', response);
                        showNotification('Thank you! Your message has been sent successfully. We will get back to you within 24 hours.', 'success');
                        contactForm.reset();
                    }, function(error) {
                        console.error('Failed to send email:', error);
                        showNotification('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
                    }).finally(function() {
                        // Reset button state
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    });
                }

            } else {
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
    }

    // Notification System
    function showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Animate Elements on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .about-stat');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Counter Animation for Statistics
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }, 16);
    }

    // Trigger counter animation when stats come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number, .about-stat h4');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
                    if (target && !stat.classList.contains('animated')) {
                        stat.classList.add('animated');
                        animateCounter(stat, target);
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    const aboutStats = document.querySelector('.about-stats');
    if (statsSection) statsObserver.observe(statsSection);
    if (aboutStats) statsObserver.observe(aboutStats);

    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter portfolio items with animation
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // Enhanced Loading Animation
    window.addEventListener('load', function() {
        // Immediately make content visible
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');

        try {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                // Hide loading screen with animation
                loadingScreen.classList.add('hide');

                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    // Trigger entrance animations
                    animateOnLoad();
                }, 500);
            }
        } catch (error) {
            console.error('Loading animation error:', error);
        }
    });

    function animateOnLoad() {
        // Stagger animations for different sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('animate-in-section');
            }, index * 200);
        });
    }

    // Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Prevent form resubmission on page refresh
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
});

// Add loading class to body initially
document.body.classList.add('loading');
