/* ==========================================================================
   DWI ANGGRAINY SURAH - PORTFOLIO INTERACTIVITY & SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Light / Dark Theme)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check stored theme or system preference
  const savedTheme = localStorage.getItem('dwi_portfolio_theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('dwi_portfolio_theme', newTheme);
  });

  // 2. Sticky Navbar Effect
  const navbar = document.getElementById('main-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Menu Toggle
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileToggleBtn?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
    const isOpen = navMenu?.classList.contains('open');
    mobileToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close mobile menu when clicking outside or clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('open');
      mobileToggleBtn?.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (navMenu?.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggleBtn.contains(e.target)) {
      navMenu.classList.remove('open');
      mobileToggleBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  // 4. Active Nav Item On Scroll (Scrollspy)
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        targetNavLink?.classList.add('active');
      } else {
        targetNavLink?.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveNavLink);

  // 5. Experience Filter Functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      timelineItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue || itemCategory.includes(filterValue)) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // 6. Toast Notification Manager
  const toastContainer = document.getElementById('toast-container');
  function showToast(message, iconSvg = '') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">
        ${iconSvg || `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`}
      </span>
      <span class="toast-msg">${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 20);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3200);
  }

  // 7. Copy to Clipboard Functionality
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = button.getAttribute('data-copy');
      const copyLabel = button.getAttribute('data-copy-label') || 'Data';

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`${copyLabel} berhasil disalin ke clipboard!`);
      }).catch(err => {
        showToast(`Gagal menyalin: ${err}`);
      });
    });
  });

  // 8. CV Modal Preview
  const openModalBtns = document.querySelectorAll('.open-cv-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const cvModalOverlay = document.getElementById('cv-modal-overlay');

  function openCvModal() {
    cvModalOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCvModal() {
    cvModalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCvModal();
    });
  });

  closeModalBtn?.addEventListener('click', closeCvModal);

  cvModalOverlay?.addEventListener('click', (e) => {
    if (e.target === cvModalOverlay) {
      closeCvModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModalOverlay?.classList.contains('active')) {
      closeCvModal();
    }
  });

  // 9. Contact Message Form
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('form-name');
    const messageInput = document.getElementById('form-message');
    const companyInput = document.getElementById('form-company');

    const senderName = nameInput?.value || 'Perekrut / Klien';
    const company = companyInput?.value ? ` dari ${companyInput.value}` : '';
    const senderMessage = messageInput?.value || 'Halo Dwi Anggrainy, saya tertarik untuk mendiskusikan peluang kerja.';

    const fullWaText = `Halo Dwi Anggrainy, saya ${senderName}${company}.%0A%0A${encodeURIComponent(senderMessage)}`;
    const waUrl = `https://wa.me/6282164491654?text=${fullWaText}`;

    showToast('Mengarahkan ke WhatsApp...');
    window.open(waUrl, '_blank');
    contactForm.reset();
  });

  // 10. Scroll Reveal Animations with IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal-up');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -20px 0px',
    threshold: 0.08
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    // Immediately reveal if already in or near viewport on load
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('active');
    } else {
      revealObserver.observe(el);
    }
  });
});

