/* ========================================
   ELECTRA POWER CO. — RECRUITING SITE
   Main JavaScript
   GSAP Animations, Form Logic, Language Toggle
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initLanguageToggle();
    initForm();
    initFAQ();

    // Wait for GSAP to load
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        initAnimations();
    } else {
        // GSAP loaded via defer — wait for it
        window.addEventListener('load', () => {
            if (typeof gsap !== 'undefined') {
                initAnimations();
            } else {
                // Fallback: show everything if GSAP fails to load
                showAllContent();
            }
        });
    }
});

/* ===================== NAVIGATION ===================== */
function initNavigation() {
    const hamburger = document.getElementById('navHamburger');
    const mobileMenu = document.getElementById('navMobile');
    const nav = document.getElementById('nav');

    // Hamburger toggle
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Nav background on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 100) {
            nav.style.background = 'rgba(13,11,26,0.98)';
        } else {
            nav.style.background = 'rgba(13,11,26,0.92)';
        }
        lastScroll = scrollY;
    }, { passive: true });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===================== LANGUAGE TOGGLE ===================== */
function initLanguageToggle() {
    const toggle = document.getElementById('langToggle');
    let currentLang = 'es';

    if (!toggle) return;

    toggle.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        toggle.textContent = currentLang === 'es' ? 'EN' : 'ES';
        document.documentElement.lang = currentLang;

        // Update all translatable elements
        document.querySelectorAll('[data-es][data-en]').forEach(el => {
            const text = el.getAttribute(`data-${currentLang}`);
            if (text) {
                if (el.tagName === 'INPUT' || el.tagName === 'SELECT') {
                    // For form elements with placeholder
                    if (el.placeholder) el.placeholder = text;
                } else if (el.tagName === 'OPTION') {
                    el.textContent = text;
                } else {
                    el.textContent = text;
                }
            }
        });
    });
}

/* ===================== FORM LOGIC ===================== */
function initForm() {
    const form = document.getElementById('applicationForm');
    const zonaSelect = document.getElementById('zona');
    const otraCiudadGroup = document.getElementById('otraCiudadGroup');
    const formSuccess = document.getElementById('formSuccess');

    if (!form) return;

    // Phone field — only allow digits, +, (, ), -, space. Max 15 chars.
    const phoneInput = document.getElementById('telefono');
    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            phoneInput.value = phoneInput.value.replace(/[^0-9+\-() ]/g, '');
            if (phoneInput.value.replace(/\D/g, '').length > 15) {
                phoneInput.value = phoneInput.value.slice(0, -1);
            }
        });
    }

    // Show/hide "otra ciudad" field
    if (zonaSelect && otraCiudadGroup) {
        zonaSelect.addEventListener('change', () => {
            if (zonaSelect.value === 'otro') {
                otraCiudadGroup.classList.add('visible');
                otraCiudadGroup.querySelector('input').required = true;
            } else {
                otraCiudadGroup.classList.remove('visible');
                otraCiudadGroup.querySelector('input').required = false;
            }
        });
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear previous errors
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });

        // Validate
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value || field.value.trim() === '') {
                field.closest('.form-group').classList.add('error');
                isValid = false;
            }
        });

        // Phone validation — 10-15 digits only
        const phone = document.getElementById('telefono');
        if (phone && phone.value) {
            const digitsOnly = phone.value.replace(/\D/g, '');
            if (digitsOnly.length < 10 || digitsOnly.length > 15) {
                phone.closest('.form-group').classList.add('error');
                isValid = false;
            }
        }

        if (!isValid) {
            // Focus first invalid field
            const firstError = form.querySelector('.form-group.error input, .form-group.error select');
            if (firstError) firstError.focus();
            return;
        }

        // Age screening — disqualify 31+
        const edadSelect = document.getElementById('edad');
        if (edadSelect && edadSelect.value === '31+') {
            form.hidden = true;
            formSuccess.hidden = false;
            formSuccess.querySelector('h3').textContent = document.documentElement.lang === 'en'
                ? 'Thanks for your interest!'
                : '¡Gracias por tu interés!';
            formSuccess.querySelector('p').textContent = document.documentElement.lang === 'en'
                ? 'Unfortunately, we don\'t have positions available that match your profile right now. We\'ll keep your info on file.'
                : 'Lamentablemente, no tenemos posiciones disponibles que se ajusten a tu perfil en este momento. Mantendremos tu información en archivo.';
            formSuccess.querySelector('.form-success-icon svg').setAttribute('stroke', '#B8B0D0');
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // Show loading
        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Send to Google Sheets
        const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxtzu942iS4sUTLCUeAkrqZkpY7FNvLvyMYT9zb-1kUnnlcxTsPRa9LRdz982niqrew/exec';

        const params = new URLSearchParams();
        params.append('nombre', data.nombre || '');
        params.append('telefono', data.telefono || '');
        params.append('zona', data.zona || '');
        params.append('otraCiudad', data.otraCiudad || '');
        params.append('edad', data.edad || '');

        fetch(GOOGLE_SHEET_URL + '?' + params.toString())
        .then(() => {
            if (typeof fbq === 'function') {
                fbq('track', 'Lead');
            }
            form.hidden = true;
            formSuccess.hidden = false;
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(() => {
            form.hidden = true;
            formSuccess.hidden = false;
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .finally(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        });
    });

    // Inline validation on blur
    form.querySelectorAll('input[required], select[required]').forEach(field => {
        field.addEventListener('blur', () => {
            const group = field.closest('.form-group');
            if (!field.value || field.value.trim() === '') {
                group.classList.add('error');
            } else {
                group.classList.remove('error');
            }
        });

        // Clear error on input
        field.addEventListener('input', () => {
            field.closest('.form-group').classList.remove('error');
        });

        field.addEventListener('change', () => {
            field.closest('.form-group').classList.remove('error');
        });
    });
}

/* ===================== FAQ ===================== */
function initFAQ() {
    // Accordion behavior — close others when one opens
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('toggle', () => {
            if (item.open) {
                faqItems.forEach(other => {
                    if (other !== item && other.open) {
                        other.open = false;
                    }
                });
            }
        });
    });
}

/* ===================== GSAP ANIMATIONS ===================== */
function initAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        showAllContent();
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance animation
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
        .from('.hero-badge', { opacity: 0, y: 20, duration: 0.6, delay: 0.2 })
        .from('.hero-line', { opacity: 0, y: 30, duration: 0.6, stagger: 0.1 }, '-=0.3')
        .from('.hero-amount', { opacity: 0, scale: 0.8, duration: 0.8 }, '-=0.4')
        .from('.hero-highlight', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from('.hero-sub', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
        .from('.hero-ctas', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
        .from('.hero-stats', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
        .from('.hero-scroll-indicator', { opacity: 0, duration: 0.5 }, '-=0.1');

    // Section reveal animations
    document.querySelectorAll('.reveal').forEach(el => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true
            }
        });
    });

    // Staggered reveals
    document.querySelectorAll('.reveal-stagger').forEach(container => {
        const children = container.children;
        gsap.to(children, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                once: true
            }
        });
    });

    // Number counter animations
    initCounters();

    // Parallax on hero grid
    gsap.to('.hero-grid', {
        y: 100,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

/* ===================== NUMBER COUNTERS ===================== */
function initCounters() {
    // Hero stats
    document.querySelectorAll('.hero-stat-num').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(target)) return;

        ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            once: true,
            onEnter: () => animateCounter(el, target)
        });
    });

    // Earnings numbers
    document.querySelectorAll('.earnings-num').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(target)) return;

        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => animateCounter(el, target)
        });
    });
}

function animateCounter(element, target) {
    const duration = 2;
    const obj = { value: 0 };

    gsap.to(obj, {
        value: target,
        duration: duration,
        ease: 'power2.out',
        onUpdate: () => {
            element.textContent = Math.round(obj.value).toLocaleString();
        }
    });
}

/* ===================== FALLBACK ===================== */
function showAllContent() {
    // If GSAP doesn't load or reduced motion is on, show everything
    document.querySelectorAll('.reveal, .reveal-stagger > *').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });

    // Set counter values immediately
    document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        if (!isNaN(target)) {
            el.textContent = target.toLocaleString();
        }
    });
}
