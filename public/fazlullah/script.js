/**
 * FAZLULLAH, S.H. - PORTOFOLIO HUKUM EKONOMI SYARIAH
 * Interactive Script Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Update Current Year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Sticky Navbar & Active Section Spy
  initNavbarScrollSpy();

  // Mobile Navigation Drawer
  initMobileDrawer();

  // Skill Filtering Tabs
  initSkillFilters();

  // Scroll to Top Button
  initScrollToTop();

  // Set Default WhatsApp Template
  updateMessageTemplate();

  // Animate elements on scroll
  initScrollAnimations();
});

/* ==========================================================================
   NAVBAR & SCROLL SPY
   ========================================================================== */
function initNavbarScrollSpy() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], main');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Sticky shadow effect
    if (scrollPos > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy for active nav link
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const menuToggle = document.getElementById('menu-toggle');
  const drawerClose = document.getElementById('drawer-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   SKILLS FILTERING
   ========================================================================== */
function initSkillFilters() {
  const tabs = document.querySelectorAll('.skill-tab');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle active class on tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          // Re-trigger animation
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   MODAL: RISET SKRIPSI
   ========================================================================== */
function openResearchModal() {
  const modal = document.getElementById('research-modal');
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeResearchModal() {
  const modal = document.getElementById('research-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

// Close modal when clicking outside dialog or pressing Escape
window.addEventListener('click', (e) => {
  const modal = document.getElementById('research-modal');
  if (e.target === modal) {
    closeResearchModal();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeResearchModal();
  }
});

/* ==========================================================================
   WHATSAPP DIRECT GENERATOR & FORM
   ========================================================================== */
function updateMessageTemplate() {
  const topic = document.getElementById('topic-select')?.value;
  const messageBox = document.getElementById('sender-message');
  if (!messageBox || !topic) return;

  const templates = {
    'Tawaran Karir & Rekrutmen Kerja': 'Halo Fazlullah, S.H., kami dari [Nama Perusahaan/Institusi] tertarik dengan profil dan kompetensi Hukum Ekonomi Syariah Anda. Kami ingin mendiskusikan peluang posisi kerja yang relevan.',
    'Konsultasi Hukum Syariah / Legal Compliance': 'Halo Fazlullah, S.H., saya ingin berkonsultasi mengenai aspek hukum muamalah dan kepatuhan syariah terkait [Tuliskan topik/masalah].',
    'Diskusi Riset & Kerjasama Akademik': 'Halo Fazlullah, S.H., saya membaca riset skripsi Anda mengenai transaksi Vending Machine dalam Hukum Ekonomi Syariah dan ingin berdiskusi lebih lanjut.',
    'Pertanyaan Umum & Silaturahmi': 'Halo Fazlullah, S.H., salam silaturahmi. Saya ingin terhubung dan berdiskusi terkait [Tuliskan keperluan Anda].'
  };

  messageBox.value = templates[topic] || '';
}

function handleSendWhatsApp(event) {
  event.preventDefault();

  const name = document.getElementById('sender-name')?.value.trim();
  const topic = document.getElementById('topic-select')?.value;
  const customMessage = document.getElementById('sender-message')?.value.trim();

  if (!name || !customMessage) {
    showToast('Mohon lengkapi nama dan isi pesan terlebih dahulu.');
    return;
  }

  const phone = '6282279271105';
  const fullText = `*Pesan dari Portofolio Fazlullah, S.H.*\n\n` +
                   `*Nama Pengirim:* ${name}\n` +
                   `*Topik Keperluan:* ${topic}\n\n` +
                   `*Pesan:*\n${customMessage}\n\n` +
                   `_Dikirim via Web Portofolio Fazlullah, S.H._`;

  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(fullText)}`;
  window.open(waUrl, '_blank');
  showToast('Membuka WhatsApp...');
}

/* ==========================================================================
   CLIPBOARD & TOAST NOTIFICATION
   ========================================================================== */
function copyToClipboard(text, successMessage = 'Berhasil disalin!') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage);
    }).catch(() => {
      fallbackCopyText(text, successMessage);
    });
  } else {
    fallbackCopyText(text, successMessage);
  }
}

function fallbackCopyText(text, successMessage) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMessage);
  } catch (err) {
    showToast('Gagal menyalin teks.');
  }
  document.body.removeChild(textArea);
}

function showToast(message) {
  const toast = document.getElementById('toast-notif');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   SCROLL TO TOP BUTTON
   ========================================================================== */
function initScrollToTop() {
  const scrollBtn = document.getElementById('scroll-top-btn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });

  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.stat-card, .about-text-card, .edu-card, .syariah-principles-card, .timeline-card, .org-card, .research-showcase-card, .skill-card, .award-card, .contact-info-card, .contact-form-card');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });
  }
}
