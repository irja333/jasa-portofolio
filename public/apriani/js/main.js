/**
 * Apriani Portfolio - Main Interactive & Parallax Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderNav();
    initTypewriter();
    initParallax3DTilt();
    initCounters();
    initSkillsFilter();
    initContactForm();
    initClipboardToast();
    initBackToTop();
    initScrollSpy();
});

/* --------------------------------------------------------------------------
   1. Header Navigation & Mobile Drawer
   -------------------------------------------------------------------------- */
function initHeaderNav() {
    const header = document.getElementById('header-nav');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky glass header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile drawer toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            mobileToggle.innerHTML = isOpen 
                ? '<i class="fa-solid fa-xmark"></i>' 
                : '<i class="fa-solid fa-bars"></i>';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }
}

/* --------------------------------------------------------------------------
   2. Dynamic Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const roles = [
        'Admin & Finance Specialist',
        'S1 Teknik Komputer (IPK 3.69)',
        'Digital Content & Media Creator',
        'Aspirasi Perbankan Syariah & Korporasi'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 90;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2200; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 400; // Pause before next word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* --------------------------------------------------------------------------
   3. 3D Card Tilt & Ambient Parallax Movement
   -------------------------------------------------------------------------- */
function initParallax3DTilt() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within element
            const y = e.clientY - rect.top;  // y position within element

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // Parallax background orbs movement on mouse
    const orb1 = document.querySelector('.ambient-glow-1');
    const orb2 = document.querySelector('.ambient-glow-2');
    const orb3 = document.querySelector('.ambient-glow-3');

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        if (orb1) orb1.style.transform = `translate(${mouseX * 40}px, ${mouseY * 40}px)`;
        if (orb2) orb2.style.transform = `translate(${mouseX * -50}px, ${mouseY * -50}px)`;
        if (orb3) orb3.style.transform = `translate(${mouseX * 30}px, ${mouseY * 30}px)`;
    });
}

/* --------------------------------------------------------------------------
   4. Animated Metric Counters
   -------------------------------------------------------------------------- */
function initCounters() {
    const counters = document.querySelectorAll('.counter-val');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = parseFloat(counter.getAttribute('data-target'));
                    const isDecimal = target % 1 !== 0;
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const duration = 1800; // ms
                    const startTime = performance.now();

                    function updateCount(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const currentVal = easeOut * target;

                        if (isDecimal) {
                            counter.textContent = currentVal.toFixed(2) + suffix;
                        } else {
                            counter.textContent = Math.floor(currentVal) + suffix;
                        }

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.textContent = (isDecimal ? target.toFixed(2) : target) + suffix;
                        }
                    }

                    requestAnimationFrame(updateCount);
                });
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.hero-stats-row');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

/* --------------------------------------------------------------------------
   5. Skills Filter & Progress Bar Animations
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
    const filterButtons = document.querySelectorAll('.skill-tab-btn');
    const skillCards = document.querySelectorAll('.skill-card-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Animate skill progress bars on view
    const skillBars = document.querySelectorAll('.skill-meter-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-level') || '90%';
                    bar.style.width = width;
                });
            }
        });
    }, { threshold: 0.2 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
}

/* --------------------------------------------------------------------------
   6. Contact Form (WhatsApp & Email Direct Dispatch)
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const subject = document.getElementById('form-subject').value.trim();
        const message = document.getElementById('form-message').value.trim();

        if (!name || !message) {
            showToast('⚠️ Mohon lengkapi nama dan pesan Anda.');
            return;
        }

        // Generate WhatsApp message
        const waText = encodeURIComponent(
            `Halo Apriani, saya ${name} (${email || 'kontak'}).\n\nSubjek: ${subject || 'Peluang Kerja / Kolaborasi'}\n\nPesan:\n${message}`
        );
        const waUrl = `https://wa.me/6285280695721?text=${waText}`;

        showToast('🚀 Membuka WhatsApp untuk mengirim pesan...');
        setTimeout(() => {
            window.open(waUrl, '_blank');
        }, 600);
    });
}

/* --------------------------------------------------------------------------
   7. Clipboard Copy & Toast Notifications
   -------------------------------------------------------------------------- */
function initClipboardToast() {
    const copyTriggers = document.querySelectorAll('[data-copy]');

    copyTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const textToCopy = trigger.getAttribute('data-copy');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`✅ Tersalin: ${textToCopy}`);
            }).catch(() => {
                showToast(`✅ Disalin ke clipboard`);
            });
        });
    });
}

function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }

    toast.innerHTML = `<span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

/* --------------------------------------------------------------------------
   8. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* --------------------------------------------------------------------------
   9. ScrollSpy for Active Navigation Links
   -------------------------------------------------------------------------- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}
