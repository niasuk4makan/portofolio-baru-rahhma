/**
 * Portfolio Rahh Mania Ainnur - XI RPL SMKN 6 Surakarta
 * Interactive Front-End Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. DATA: PROJECT DETAILS FOR MODAL
  // -------------------------------------------------------------------------
  const projectsData = {
    'portfolio': {
      title: 'Website Portfolio Pribadi',
      tag: 'Showcase Project',
      img: 'assets/img/projects/portfolio.svg',
      desc: 'Website portofolio interaktif yang dirancang dengan estetika modern, tema dark-tech, dan responsivitas penuh. Dibuat khusus untuk memperkenalkan identitas, latar belakang kejuruan RPL di SMKN 6 Surakarta, serta kumpulan karya.',
      features: [
        'Desain modern dengan sentuhan glassmorphism & dark aesthetic',
        'Struktur semantik HTML5 yang ramah SEO dan aksesibilitas',
        'Navigasi sticky & responsive hamburger menu untuk mobile',
        'Integrasi tombol interaktif sosial media & direct chat WhatsApp'
      ],
      stack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Git']
    },
    'wisata': {
      title: 'Website Informasi Wisata',
      tag: 'Showcase Project',
      img: 'assets/img/projects/wisata.jpg',
      desc: 'Konsep landing page destinasi wisata modern yang menyajikan ragam informasi tempat liburan, pemandangan alam, galeri foto, rute perjalanan, dan tips wisata yang menarik bagi wisatawan.',
      features: [
        'Katalog kartu destinasi wisata dengan visual memukau & harga estimasi',
        'Filter kategori destinasi populer dan rekomendasi liburan',
        'Desain antarmuka bersih dengan layout grid yang adaptif',
        'Mudah disesuaikan dengan konten wisata lokal Surakarta / nusantara'
      ],
      stack: ['HTML5', 'CSS3', 'Flexbox / CSS Grid', 'UI/UX Design']
    },
    'sekolah': {
      title: 'Aplikasi / Website Sekolah',
      tag: 'Showcase Project',
      img: 'assets/img/projects/sekolah.jpg',
      desc: 'Portal antarmuka sekolah vokasi modern yang menampilkan informasi seputar jurusan Rekayasa Perangkat Lunak, jadwal pembelajaran siswa, pengumuman sekolah, dan modul kejuruan.',
      features: [
        'Dashboard modular untuk memantau modul dan materi kejuruan',
        'Papan jadwal praktikum dan seminar workshop sekolah',
        'Pengumuman resmi sekolah dan beasiswa siswa berprestasi',
        'Tampilan ramah pengguna untuk siswa dan guru'
      ],
      stack: ['HTML5', 'CSS3', 'JavaScript', 'Dashboard UI', 'SMK RPL']
    },
    'programming': {
      title: 'Project Pemrograman Dasar',
      tag: 'Showcase Project',
      img: 'assets/img/projects/programming.svg',
      desc: 'Kumpulan latihan algoritma dan implementasi logika pemrograman dasar yang dipelajari dalam kurikulum Rekayasa Perangkat Lunak, mencakup struktur data sederhana dan penyelesaian studi kasus.',
      features: [
        'Latihan manipulasi array dan objek pemrograman',
        'Implementasi logika percabangan, perulangan, dan fungsi modular',
        'Penyelesaian tantangan algoritma dengan output console terverifikasi',
        'Fondasi kuat untuk pengembangan aplikasi perangkat lunak lanjutan'
      ],
      stack: ['JavaScript', 'Algoritma', 'Struktur Data', 'Problem Solving']
    }
  };

  // -------------------------------------------------------------------------
  // 2. NAVBAR: SCROLL & MOBILE TOGGLE
  // -------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Toggle mobile menu
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // -------------------------------------------------------------------------
  // 3. SCROLLSPY (ACTIVE NAV LINK)
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  
  function updateScrollSpy() {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

      if (activeLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  updateScrollSpy();

  // -------------------------------------------------------------------------
  // 4. SCROLL REVEAL & SKILL PROGRESS ANIMATION
  // -------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');
  const skillFills = document.querySelectorAll('.skill-fill');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 40);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Animate skill bars when section is in view
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillFills.forEach(bar => bar.classList.add('animate'));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillObserver.observe(skillsSection);
  }

  // -------------------------------------------------------------------------
  // 5. PROJECT MODAL HANDLER
  // -------------------------------------------------------------------------
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalClose');
  const projectButtons = document.querySelectorAll('.btn-view-project');

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data || !modalOverlay) return;

    document.getElementById('modalImg').src = data.img;
    document.getElementById('modalImg').alt = data.title;
    document.getElementById('modalTag').textContent = data.tag;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.desc;

    // Populate features list
    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa-solid fa-check-circle" aria-hidden="true"></i> <span>${feat}</span>`;
      featuresContainer.appendChild(li);
    });

    // Populate tech stack
    const stackContainer = document.getElementById('modalStack');
    stackContainer.innerHTML = '';
    data.stack.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'modal-tech-badge';
      span.textContent = tech;
      stackContainer.appendChild(span);
    });

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  projectButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeProjectModal();
    }
  });

  // -------------------------------------------------------------------------
  // 6. QUICK WHATSAPP FORM SENDER
  // -------------------------------------------------------------------------
  const waForm = document.getElementById('waForm');
  if (waForm) {
    waForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('waSenderName');
      const msgInput = document.getElementById('waMessageText');

      const senderName = nameInput ? nameInput.value.trim() : '';
      const message = msgInput ? msgInput.value.trim() : '';

      if (!message) {
        showToast('Silakan tuliskan pesan terlebih dahulu.', 'fa-circle-exclamation');
        return;
      }

      let text = `Halo Rahh Mania,`;
      if (senderName) {
        text += ` saya ${senderName}.`;
      }
      text += `\n\n${message}`;

      const waUrl = `https://wa.me/6285970848016?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      
      // Reset form
      waForm.reset();
      showToast('Membuka WhatsApp...', 'fa-paper-plane');
    });
  }

  // -------------------------------------------------------------------------
  // 7. COPY WHATSAPP NUMBER & TOAST
  // -------------------------------------------------------------------------
  const copyWaBtn = document.getElementById('copyWaBtn');
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message, iconClass = 'fa-check-circle') {
    if (!toast) return;
    toast.innerHTML = `<i class="fa-solid ${iconClass}" aria-hidden="true"></i> <span>${message}</span>`;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  if (copyWaBtn) {
    copyWaBtn.addEventListener('click', () => {
      const phoneNumber = '085970848016';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(phoneNumber).then(() => {
          showToast('Nomor WhatsApp berhasil disalin: 085970848016');
        }).catch(() => {
          showToast('085970848016');
        });
      } else {
        showToast('Nomor WhatsApp: 085970848016');
      }
    });
  }

  // -------------------------------------------------------------------------
  // 8. BACK TO TOP BUTTON
  // -------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------------------
  // 9. SUBTLE 3D TILT EFFECT ON HERO PHOTO CARD
  // -------------------------------------------------------------------------
  const heroCard = document.querySelector('.hero-card');
  if (heroCard && window.matchMedia('(hover: hover)').matches) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 14;
      const rotateY = (x / rect.width) * 14;
      heroCard.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  }
});
