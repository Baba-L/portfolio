/**
 * ============================================================
 * PORTFOLIO BABA LAMINE — JavaScript Principal
 * Animations, interactions, validation, et effets avancés
 * ============================================================
 */

(function () {
    'use strict';

    // ==================== INITIALISATION ====================
    document.addEventListener('DOMContentLoaded', function () {
        initPreloader();
        initAOS();
        initNavbar();
        initTypingEffect();
        initParticles();
        initCustomCursor();
        initScrollProgress();
        initScrollAnimations();
        initCounters();
        initSkillBars();
        initProjectFilters();
        initSwiper();
        initContactForm();
        initBackToTop();
    });

    // ==================== PRELOADER ====================
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        const loaderProgress = document.querySelector('.loader-progress');

        // Attendre que tout soit chargé
        window.addEventListener('load', function () {
            setTimeout(function () {
                preloader.classList.add('loaded');
                document.body.style.overflow = 'auto';
                // Lancer les compteurs après le preloader
                setTimeout(initHeroCounters, 500);
            }, 1800);
        });
    }

    // ==================== AOS ANIMATIONS ====================
    function initAOS() {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80,
            disable: 'mobile'
        });
    }

    // ==================== NAVBAR ====================
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        const navToggler = document.querySelector('.navbar-toggler');
        const navCollapse = document.getElementById('navMenu');

        // Scroll effect
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Active link based on scroll position
            let current = '';
            sections.forEach(function (section) {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(function (link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });

        // Close mobile menu on link click
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                if (navCollapse.classList.contains('show')) {
                    navToggler.click();
                }
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const offset = 80;
                    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            });
        });
    }

    // ==================== TYPING EFFECT ====================
    function initTypingEffect() {
        const typingElement = document.getElementById('typing-text');
        const texts = [
            'Développeur Full Stack',
            'CEO de Dunuya Mall',
            'Créateur de solutions numériques',
            'Expert Mobile Money',
            'Entrepreneur Tech Africain'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typingSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before new word
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 1000);
    }

    // ==================== PARTICLES BACKGROUND ====================
    function initParticles() {
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createParticles() {
            particles = [];
            const count = Math.min(80, Math.floor(window.innerWidth / 20));
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.1
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(function (p, i) {
                // Move
                p.x += p.speedX;
                p.y += p.speedY;

                // Wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(59, 130, 246, ' + p.opacity + ')';
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[j].x - p.x;
                    const dy = particles[j].y - p.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = 'rgba(59, 130, 246, ' + (0.1 * (1 - distance / 120)) + ')';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            animationId = requestAnimationFrame(drawParticles);
        }

        // Initialize
        resizeCanvas();
        createParticles();
        drawParticles();

        // Handle resize
        let resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                resizeCanvas();
                createParticles();
            }, 250);
        });

        // Reduce animation on preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            cancelAnimationFrame(animationId);
            return;
        }
    }

    // ==================== CUSTOM CURSOR ====================
    function initCustomCursor() {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const dot = document.querySelector('.cursor-dot');
        const outline = document.querySelector('.cursor-outline');

        if (!dot || !outline) return;

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX - 4 + 'px';
            dot.style.top = mouseY - 4 + 'px';
        });

        function animateOutline() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            outline.style.left = outlineX - 17 + 'px';
            outline.style.top = outlineY - 17 + 'px';
            requestAnimationFrame(animateOutline);
        }
        animateOutline();

        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .project-card, .skill-card, input, textarea, select');
        interactiveElements.forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                outline.style.width = '50px';
                outline.style.height = '50px';
                outline.style.borderColor = 'var(--accent-blue)';
            });
            el.addEventListener('mouseleave', function () {
                outline.style.width = '35px';
                outline.style.height = '35px';
                outline.style.borderColor = 'var(--accent-violet)';
            });
        });
    }

    // ==================== SCROLL PROGRESS BAR ====================
    function initScrollProgress() {
        const progressBar = document.getElementById('scroll-progress');

        window.addEventListener('scroll', function () {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // ==================== SCROLL ANIMATIONS ====================
    function initScrollAnimations() {
        // Reveal elements on scroll (fallback for AOS)
        const revealElements = document.querySelectorAll('.fade-in');

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    }

    // ==================== COUNTERS (HERO) ====================
    function initHeroCounters() {
        const counters = document.querySelectorAll('.hero-stats .stat-number');
        counters.forEach(function (counter) {
            animateCounter(counter);
        });
    }

    // ==================== COUNTERS (STATS SECTION) ====================
    function initCounters() {
        const counters = document.querySelectorAll('.counter');

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (counter) {
            observer.observe(counter);
        });
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        if (isNaN(target)) return;

        const duration = 2000;
        const startTime = Date.now();
        const startValue = 0;

        function update() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (target - startValue) * eased);

            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }

        update();
    }

    // ==================== SKILL BARS ====================
    function initSkillBars() {
        const skillFills = document.querySelectorAll('.skill-fill');

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const width = fill.getAttribute('data-width');
                    fill.style.width = width + '%';
                    observer.unobserve(fill);
                }
            });
        }, { threshold: 0.3 });

        skillFills.forEach(function (fill) {
            observer.observe(fill);
        });
    }

    // ==================== PROJECT FILTERS ====================
    function initProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                // Update active button
                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(function (card) {
                    const category = card.getAttribute('data-category');

                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Add fadeInUp animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(styleSheet);

    // ==================== SWIPER TESTIMONIALS ====================
    function initSwiper() {
        new Swiper('.testimonials-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            breakpoints: {
                768: {
                    slidesPerView: 2
                },
                1200: {
                    slidesPerView: 3
                }
            }
        });
    }

    // ==================== CONTACT FORM ====================
    function initContactForm() {
        const form = document.getElementById('contactForm');
        const successMessage = document.getElementById('formSuccess');

        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate
            if (!validateForm()) return;

            // Show loading state
            const submitBtn = form.querySelector('.btn-submit');
            submitBtn.classList.add('loading');

            // Simulate sending (replace with actual API call)
            setTimeout(function () {
                submitBtn.classList.remove('loading');
                form.style.display = 'none';
                successMessage.style.display = 'block';

                // Reset form after delay
                setTimeout(function () {
                    form.reset();
                    form.style.display = 'block';
                    successMessage.style.display = 'none';
                }, 5000);
            }, 2000);
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(function (input) {
            input.addEventListener('blur', function () {
                validateField(this);
            });
            input.addEventListener('input', function () {
                const errorSpan = this.parentElement.querySelector('.form-error');
                if (errorSpan) errorSpan.textContent = '';
                this.style.borderColor = '';
            });
        });
    }

    function validateForm() {
        const form = document.getElementById('contactForm');
        let isValid = true;

        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(function (field) {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        // Validate email format
        const emailField = form.querySelector('#email');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                showError(emailField, 'Veuillez entrer un email valide');
                isValid = false;
            }
        }

        return isValid;
    }

    function validateField(field) {
        if (!field.value.trim()) {
            showError(field, 'Ce champ est requis');
            return false;
        }
        clearError(field);
        return true;
    }

    function showError(field, message) {
        field.style.borderColor = '#ef4444';
        const errorSpan = field.parentElement.querySelector('.form-error');
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }

    function clearError(field) {
        field.style.borderColor = '';
        const errorSpan = field.parentElement.querySelector('.form-error');
        if (errorSpan) {
            errorSpan.textContent = '';
        }
    }

    // ==================== BACK TO TOP ====================
    function initBackToTop() {
        const btn = document.getElementById('backToTop');

        window.addEventListener('scroll', function () {
            if (window.scrollY > 500) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

})();