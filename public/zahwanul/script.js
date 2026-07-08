document.addEventListener('DOMContentLoaded', () => {
    // Default to dark-theme
    document.body.className = 'dark-theme';

    // ==========================================================================
    // MOBILE NAVIGATION
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
    };

    const closeMenu = () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('open');
    };

    mobileToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
            closeMenu();
        }
    });

    // ==========================================================================
    // DYNAMIC TYPING EFFECT
    // ==========================================================================
    const typedTextSpan = document.getElementById('typed-text');
    const roles = [
        'Pendidikan Teknologi Informasi',
        'Administrator Data & IT',
        'Desain Grafis & UI/UX',
        'Multimedia & Video Editor'
    ];
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const newWordDelay = 2000;
    
    let roleIndex = 0;
    let charIndex = 0;

    const type = () => {
        if (charIndex < roles[roleIndex].length) {
            typedTextSpan.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newWordDelay);
        }
    };

    const erase = () => {
        if (charIndex > 0) {
            typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            roleIndex++;
            if (roleIndex >= roles.length) roleIndex = 0;
            setTimeout(type, typingSpeed + 500);
        }
    };

    // Start typing animation
    if (roles.length) setTimeout(type, 1000);

    // ==========================================================================
    // STICKY HEADER & BACK TO TOP BUTTON
    // ==========================================================================
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top visibility
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll back to top logic
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================================================
    // SCROLL SPY (ACTIVE NAV LINKS)
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');
    
    const scrollSpy = () => {
        let currentSectionId = 'home';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // A threshold of 180px from top viewport matches header size + offset padding
            if (rect.top <= 180) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Force Kontak active if user is at the absolute bottom of the scroll
        if ((window.innerHeight + Math.round(window.scrollY)) >= document.documentElement.scrollHeight - 50) {
            navLinks.forEach(link => link.classList.remove('active'));
            const lastLink = navLinks[navLinks.length - 1];
            if (lastLink) lastLink.classList.add('active');
        }
    };

    window.addEventListener('scroll', scrollSpy);
    // Trigger scrollSpy once on page load to highlight the initial active section
    scrollSpy();

    // ==========================================================================
    // SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
    // ==========================================================================
    // Set up css for scroll reveal dynamically to keep styling clean
    const styleReveal = document.createElement('style');
    styleReveal.textContent = `
        .reveal-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-item.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleReveal);

    const elementsToReveal = [
        '.section-header',
        '.about-info',
        '.about-card',
        '.timeline-item',
        '.edu-card',
        '.cert-card',
        '.skill-card',
        '.portfolio-item',
        '.contact-info-card'
    ];

    // Gather and prepare elements for reveal animation
    const prepareReveal = () => {
        elementsToReveal.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('reveal-item');
            });
        });
    };

    prepareReveal();

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal-item').forEach(el => {
        revealObserver.observe(el);
    });
});
