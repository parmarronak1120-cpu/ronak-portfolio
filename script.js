/* ==========================================================================
   ULTRA-PREMIUM PORTFOLIO INTERACTIVE CORE SYSTEM (VANILLA JS)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================================================
  // 1. STATE & GLOBAL CONFIGURATION
  // ==========================================================================
  const state = {
    lang: "en",           // Current active language: "en" or "gj"
    theme: "dark",        // Current theme: "dark" or "light"
    accent: "purple",     // Current HSL color wheel selection
    currentGalleryIdx: 0, // Lightbox navigation index
    typingIndex: 0,       // Typing word pointer
    charIndex: 0,         // Typing character pointer
    isDeleting: false,    // Typing state flag
    typingDelay: 100,     // Typing speed ms
    deletingDelay: 50,    // Deleting speed ms
    wordPauseDelay: 2000, // Wait time at complete word ms
    typingTimer: null     // Timer reference
  };

  // Gallery items SVG representation graphics
  const galleryItems = [
    { class: "fa-solid fa-laptop-code", label: "Developer Laptop Station Setup" },
    { class: "fa-solid fa-keyboard", label: "Frosted Glass Mechanical Keyboard" },
    { class: "fa-solid fa-mug-hot", label: "Fresh Premium Brewed Coffee Mug" }
  ];

  // Detailed mock project metadata
  const projectDetails = {
    1: {
      en: {
        title: "AI Smart Assistant",
        tech: "Next.js, Python, OpenAI, Vector DB",
        role: "Lead generative AI Architect",
        desc: "An intelligent generative AI conversational interface with real-time semantic search, active layouts rendering, and high-performance vector retrieval frameworks. Perfect for automating support and generating smart replies."
      },
      gj: {
        title: "AI સ્માર્ટ આસિસ્ટન્ટ",
        tech: "Next.js, Python, OpenAI, Vector DB",
        role: "મુખ્ય જનરેટિવ AI આર્કિટેક્ટ",
        desc: "રીઅલ-ટાઇમ સેમેન્ટિક સર્ચ, એક્ટિવ લેઆઉટ રેન્ડરિંગ અને હાઇ-પર્ફોર્મન્સ વેક્ટર રીટ્રીવલ ફ્રેમવર્ક સાથે એક બુદ્ધિશાળી જનરેટિવ AI સંવાદાત્મક ઇન્ટરફેસ. સપોર્ટ ઓટોમેશન માટે અને સ્માર્ટ જવાબો મેળવવા માટે આદર્શ."
      }
    },
    2: {
      en: {
        title: "Cloud ERP Dashboard",
        tech: "React, Node.js, Express, Chart.js, PostgreSQL",
        role: "Full-Stack System Architect",
        desc: "A secure, enterprise-grade business management portal featuring live financial accounting analytics, dynamic responsive chart views, full inventory auditing modules, and row-level role security settings."
      },
      gj: {
        title: "ક્લાઉડ ERP ડેશબોર્ડ",
        tech: "React, Node.js, Express, Chart.js, PostgreSQL",
        role: "ફૂલ-સ્ટેક સિસ્ટમ આર્કિટેક્ટ",
        desc: "લાઇવ ફાઇનાન્શિયલ એકાઉન્ટિંગ એનાલિટિક્સ, ડાયનેમિક રિસ્પોન્સિવ ચાર્ટ વ્યુઝ, સંપૂર્ણ ઇન્વેન્ટરી ઓડિટિંગ મોડ્યુલ્સ અને રો-લેવલ રોલ સિક્યોરિટી સેટિંગ્સ ધરાવતું એક સુરક્ષિત, એન્ટરપ્રાઇઝ-ગ્રેડ બિઝનેસ મેનેજમેન્ટ પોર્ટલ."
      }
    },
    3: {
      en: {
        title: "Glassmorphic E-Commerce App",
        tech: "HTML5, Vanilla CSS3, JavaScript ES6",
        role: "Frontend Creative Director",
        desc: "An immersive e-commerce shopping experience highlighting frosted-glass cards interfaces, fluid responsive page flips, dynamic instant filtering systems, and organic micro-animations interactions."
      },
      gj: {
        title: "ગ્લાસમોર્ફિક ઈ-કોમર્સ એપ",
        tech: "HTML5, Vanilla CSS3, JavaScript ES6",
        role: "ફ્રન્ટએન્ડ ક્રિએટિવ ડિરેક્ટર",
        desc: "ફ્રોસ્ટેડ-ગ્લાસ કાર્ડ્સ ઇન્ટરફેસ, ફ્લુઇડ રિસ્પોન્સિવ પેજ ફ્લિપ્સ, ડાયનેમિક ઇન્સ્ટન્ટ ફિલ્ટરિંગ સિસ્ટમ્સ અને ઓર્ગેનિક માઇક્રો-એનિમેશન ઇન્ટરેક્શન ધરાવતો અદભૂત શોપિંગ અનુભવ."
      }
    },
    4: {
      en: {
        title: "Cyberpunk Music Player",
        tech: "HTML5 Web Audio API, Canvas, CSS Keyframes",
        role: "Lead Creative Technologist",
        desc: "A beautiful desktop-grade browser audio engine fitted with live canvas spectral reactive visualizers, real-time gain equalizations, neon design elements, and interactive playlists configuration."
      },
      gj: {
        title: "સાયબરપંક મ્યુઝિક પ્લેયર",
        tech: "HTML5 Web Audio API, Canvas, CSS Keyframes",
        role: "મુખ્ય ક્રિએટિવ ટેક્નોલોજિસ્ટ",
        desc: "લાઇવ કેનવાસ સ્પેક્ટ્રલ રિએક્ટિવ વિઝ્યુલાઇઝર્સ, રીઅલ-ટાઇમ ગેઇન ઇક્વેલાઇઝેશન, નિયોન ડિઝાઇન એલિમેન્ટ્સ અને ઇન્ટરેક્ટિવ પ્લેલિસ્ટ્સ કન્ફિગરેશન ધરાવતું એક અદભૂત ડેસ્કટોપ-ગ્રેડ બ્રાઉઝર ઓડિયો એન્જિન."
      }
    }
  };

  // Accent color mappings to HSL values
  const accentColors = {
    purple: { h: 271, s: "76%", l: "53%" },
    blue: { h: 190, s: "90%", l: "50%" },
    green: { h: 142, s: "70%", l: "45%" },
    orange: { h: 32, s: "95%", l: "50%" },
    red: { h: 354, s: "70%", l: "54%" }
  };

  // ==========================================================================
  // 2. LOADING & INTRO preloader
  // ==========================================================================
  const loader = document.getElementById("loader-screen");
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("fade-out");
      // Trigger scroll observer once preloader finishes
      triggerScrollReveals();
      animateSkillsProgress();
      animateStatsCounters();
    }, 600);
  });

  // ==========================================================================
  // 3. HEADER & MENU DYNAMICS
  // ==========================================================================
  const header = document.querySelector(".header");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const backToTopBtn = document.getElementById("back-to-top");

  // Scrolled navbar style adjustment
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
      backToTopBtn.classList.add("visible");
    } else {
      header.classList.remove("scrolled");
      backToTopBtn.classList.remove("visible");
    }
    updateActiveNavLink();
  });

  // Return to top click callback
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Mobile Drawer Toggle
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const isOpen = navMenu.classList.contains("active");
    mobileMenuBtn.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars-staggered"></i>';
  });

  // Close Mobile Menu on Link Click
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
    });
  });

  // Active navigation tab mapping on scroll
  function updateActiveNavLink() {
    let current = "";
    const sections = document.querySelectorAll("section");
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // ==========================================================================
  // 4. THEME & COLOR WHEEL ENGINE
  // ==========================================================================
  const themeToggle = document.getElementById("theme-toggle");

  // Check localStorage for saved theme preferences
  const cachedTheme = localStorage.getItem("portfolio-theme");
  if (cachedTheme === "light") {
    document.body.classList.add("light-mode");
    state.theme = "light";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    state.theme = isLight ? "light" : "dark";
    localStorage.setItem("portfolio-theme", state.theme);
    showToast(
      isLight ? "fa-sun" : "fa-moon",
      isLight ? "Light Mode Active" : "Dark Mode Active",
      isLight ? "Optimized for bright lighting." : "Saves battery & fits low light."
    );
  });

  // Accent Switcher Popups
  const accentTrigger = document.getElementById("accent-trigger");
  const accentDropdown = document.getElementById("accent-dropdown");
  const colorDots = document.querySelectorAll(".color-dot");

  accentTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    accentDropdown.classList.toggle("active");
  });

  document.addEventListener("click", () => {
    accentDropdown.classList.remove("active");
  });

  colorDots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      colorDots.forEach(d => d.classList.remove("active"));
      dot.classList.add("active");

      const selection = dot.getAttribute("data-color");
      state.accent = selection;

      // Update variables on the root document element
      const config = accentColors[selection];
      document.documentElement.style.setProperty("--primary-h", config.h);
      document.documentElement.style.setProperty("--primary-s", config.s);
      document.documentElement.style.setProperty("--primary-l", config.l);

      accentDropdown.classList.remove("active");
      showToast(
        "fa-palette",
        "Color Accent Swapped",
        `Now featuring theme accent: ${selection.toUpperCase()}`
      );
    });
  });

  // ==========================================================================
  // 5. TRANSLATION & BILINGUAL ENGINE
  // ==========================================================================
  const langToggle = document.getElementById("lang-toggle");
  const langEn = document.getElementById("lang-en");
  const langGj = document.getElementById("lang-gj");

  // Load language settings from Cache
  const cachedLang = localStorage.getItem("portfolio-lang");
  if (cachedLang === "gj") {
    setLanguage("gj");
  } else {
    // Default system text typing setup
    startTypingAnimation();
  }

  langToggle.addEventListener("click", () => {
    const nextLang = state.lang === "en" ? "gj" : "en";
    setLanguage(nextLang);
  });

  function setLanguage(target) {
    state.lang = target;
    localStorage.setItem("portfolio-lang", target);

    // Swap toggler visibility
    if (target === "en") {
      langEn.classList.add("active");
      langGj.classList.remove("active");
    } else {
      langEn.classList.remove("active");
      langGj.classList.add("active");
    }

    // Apply translations across DOM with a smooth visual transition
    document.body.style.opacity = "0.7";
    setTimeout(() => {
      // 1. Text elements translations
      const translatable = document.querySelectorAll("[data-translate]");
      translatable.forEach(el => {
        const path = el.getAttribute("data-translate");
        const translatedValue = getTranslatedString(target, path);
        if (translatedValue) {
          el.innerHTML = translatedValue;
        }
      });

      // 2. Placeholders translations
      const inputs = document.querySelectorAll("[data-translate-placeholder]");
      inputs.forEach(el => {
        const path = el.getAttribute("data-translate-placeholder");
        const translatedValue = getTranslatedString(target, path);
        if (translatedValue) {
          el.setAttribute("placeholder", translatedValue);
        }
      });

      // 3. Reset typing animation with new vocabulary array
      if (state.typingTimer) {
        clearTimeout(state.typingTimer);
      }
      state.typingIndex = 0;
      state.charIndex = 0;
      state.isDeleting = false;
      document.getElementById("typewrite-text").innerHTML = "";
      startTypingAnimation();

      document.body.style.opacity = "1";
    }, 200);

    showToast(
      "fa-language",
      target === "en" ? "Language Swapped" : "ભાષા બદલાઈ ગઈ",
      target === "en" ? "Website translated to English" : "પોર્ટફોલિયો ગુજરાતી ભાષામાં રૂપાંતરિત થયો"
    );
  }

  // Helper resolving dictionary paths
  function getTranslatedString(lang, path) {
    const parts = path.split(".");
    let currentObj = translations[lang];
    for (let part of parts) {
      if (currentObj[part] !== undefined) {
        currentObj = currentObj[part];
      } else {
        return null;
      }
    }
    return currentObj;
  }

  // ==========================================================================
  // 6. TYPING DYNAMIC ROUTINES
  // ==========================================================================
  function startTypingAnimation() {
    const wordList = translations[state.lang].hero.roles;
    const txtBox = document.getElementById("typewrite-text");

    if (!txtBox) return;

    const currentWord = wordList[state.typingIndex];

    if (state.isDeleting) {
      // Remove character
      txtBox.innerHTML = currentWord.substring(0, state.charIndex - 1);
      state.charIndex--;
    } else {
      // Add character
      txtBox.innerHTML = currentWord.substring(0, state.charIndex + 1);
      state.charIndex++;
    }

    let delay = state.typingDelay;

    if (state.isDeleting) {
      delay = state.deletingDelay;
    }

    if (!state.isDeleting && state.charIndex === currentWord.length) {
      // Word completed, trigger pause
      delay = state.wordPauseDelay;
      state.isDeleting = true;
    } else if (state.isDeleting && state.charIndex === 0) {
      // Word deleted, move to next item
      state.isDeleting = false;
      state.typingIndex = (state.typingIndex + 1) % wordList.length;
      delay = 500; // brief pause before writing next word
    }

    state.typingTimer = setTimeout(startTypingAnimation, delay);
  }

  // ==========================================================================
  // 7. SCROLL OBSERVATION & REVEAL SYSTEM
  // ==========================================================================
  function triggerScrollReveals() {
    const reveals = document.querySelectorAll(".reveal-fade, .reveal-slide-up, .reveal-scale-in");

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
          observer.unobserve(entry.target); // Trigger once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(el => revealObserver.observe(el));
  }

  // Skills progress bar transitions
  function animateSkillsProgress() {
    const skillsSection = document.getElementById("skills");
    const bars = document.querySelectorAll(".skill-bar");

    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          bars.forEach(bar => {
            const width = bar.getAttribute("data-width");
            bar.style.width = width;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    if (skillsSection) {
      skillsObserver.observe(skillsSection);
    }
  }

  // Stats Achievement Numeric counters interpolation
  function animateStatsCounters() {
    const statsSection = document.getElementById("about");
    const counters = document.querySelectorAll(".stat-num");

    const countersObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(counter => {
            const targetCount = parseInt(counter.getAttribute("data-count"), 10);
            animateSingleCounter(counter, targetCount);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    if (statsSection) {
      countersObserver.observe(statsSection);
    }
  }

  function animateSingleCounter(element, target) {
    let startTimestamp = null;
    const duration = 1500; // Duration 1.5s

    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentVal = Math.floor(progress * target);
      element.innerHTML = currentVal + "+";
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.innerHTML = target + "+";
      }
    }

    window.requestAnimationFrame(step);
  }

  // ==========================================================================
  // 8. SKILLS & PROJECTS FILTERS
  // ==========================================================================

  // Skills filter
  const skillFilters = document.querySelectorAll("[data-skill-cat]");
  const skillCards = document.querySelectorAll(".skill-card");

  skillFilters.forEach(btn => {
    btn.addEventListener("click", () => {
      skillFilters.forEach(f => f.classList.remove("active"));
      btn.classList.add("active");

      const cat = btn.getAttribute("data-skill-cat");

      skillCards.forEach(card => {
        if (cat === "all" || card.getAttribute("data-skill-item") === cat) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // Projects filter
  const projectFilters = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll(".project-card");

  projectFilters.forEach(btn => {
    btn.addEventListener("click", () => {
      projectFilters.forEach(f => f.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        if (filter === "all" || card.getAttribute("data-cat") === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // ==========================================================================
  // 9. PROJECT DETAILS OVERLAYS
  // ==========================================================================
  const projectModal = document.getElementById("project-modal");
  const projectModalClose = document.getElementById("project-modal-close");
  const detailTriggers = document.querySelectorAll(".view-project-details");

  detailTriggers.forEach(btn => {
    btn.addEventListener("click", () => {
      const pid = btn.getAttribute("data-project");
      const data = projectDetails[pid][state.lang];

      document.getElementById("pm-title").innerHTML = data.title;
      document.getElementById("pm-tech").innerHTML = data.tech;
      document.getElementById("pm-role").innerHTML = data.role;
      document.getElementById("pm-desc").innerHTML = data.desc;

      projectModal.classList.add("active");
      document.body.style.overflow = "hidden"; // disable scroll
    });
  });

  projectModalClose.addEventListener("click", () => {
    projectModal.classList.remove("active");
    document.body.style.overflow = ""; // restore scroll
  });

  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      projectModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // ==========================================================================
  // 10. RESUME PAPER MODAL PREVIEW
  // ==========================================================================
  const resumeModal = document.getElementById("resume-modal");
  const resumeModalClose = document.getElementById("resume-modal-close");
  const resumeOpenBtn = document.getElementById("open-resume-preview-btn");

  resumeOpenBtn.addEventListener("click", () => {
    resumeModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  resumeModalClose.addEventListener("click", () => {
    resumeModal.classList.remove("active");
    document.body.style.overflow = "";
  });

  resumeModal.addEventListener("click", (e) => {
    if (e.target === resumeModal) {
      resumeModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // ==========================================================================
  // 11. WORKSPACE LIGHTBOX CAROUSEL
  // ==========================================================================
  const lightbox = document.getElementById("lightbox-overlay");
  const lightboxClose = document.getElementById("lightbox-close-btn");
  const lightboxPrev = document.getElementById("lightbox-prev-btn");
  const lightboxNext = document.getElementById("lightbox-next-btn");
  const lightboxIcon = document.getElementById("lightbox-icon-graphic");
  const galleryItemsDOM = document.querySelectorAll(".gallery-item");

  galleryItemsDOM.forEach(item => {
    item.addEventListener("click", () => {
      const idx = parseInt(item.getAttribute("data-index"), 10);
      openLightbox(idx);
    });
  });

  function openLightbox(index) {
    state.currentGalleryIdx = index;
    updateLightboxContent();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function updateLightboxContent() {
    const item = galleryItems[state.currentGalleryIdx];
    // Wipe class attributes
    lightboxIcon.className = "lightbox-placeholder " + item.class;
    lightboxIcon.setAttribute("title", item.label);
  }

  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  });

  lightboxPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    state.currentGalleryIdx = (state.currentGalleryIdx - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxContent();
  });

  lightboxNext.addEventListener("click", (e) => {
    e.stopPropagation();
    state.currentGalleryIdx = (state.currentGalleryIdx + 1) % galleryItems.length;
    updateLightboxContent();
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // ==========================================================================
  // 12. MOCK downloads BLOB ENGINE
  // ==========================================================================

  // CV Download PDF
  document.getElementById("dl-cv-btn").addEventListener("click", () => {
    const content = `=====================================================
RONAK PARMAR - FULL STACK DEVELOPER RESUME
=====================================================
Location: Gujarat, India
Email: parmarronak75749@gmail.com
Phone: +91 9913102838
Web: https://ronak-portfolio.vercel.app

TECHNICAL EXPERTISE:
- Frontend: HTML5, CSS3, JavaScript, React.js, Next.js, Figma
- Backend: Node.js, Express, PostgreSQL, MongoDB, RESTful APIs
- DevOps: AWS, Docker, Git Version Control

PROFESSIONAL EXPERIENCE:
1. Senior Full-Stack Developer | Vertex Digital Solutions (2026 - Present)
   - Scaled database performance by 40% using PostgreSQL connection pooling.
   - Built modern enterprise web portals using React and Tailwind.
2. Full-Stack Web Consultant | Freelance Services (2026 - 2027)
   - Developed custom high-performance e-commerce platforms.

EDUCATION:
- B.Tech in Computer Science | Gujarat Technological University (2027 - 2030)
  Honors graduate, focused on database models and web frameworks.

=====================================================
Thank you for downloading my professional curriculum vitae.`;

    triggerClientBlobDownload(content, "Ronak_Patel_CV.pdf", "text/plain");
    showToast("fa-circle-down", "CV PDF Downloaded", "Ready for review & presentation!");
  });

  // Project Report Download PDF
  document.getElementById("dl-report-btn").addEventListener("click", () => {
    const content = `=====================================================
TECHNICAL PROJECT ARCHITECTURE REPORT
=====================================================
Author: Ronak Parmar
Date: May 2026

PROJECT OVERVIEW: AI SMART ASSISTANT INTERFACE
This report details the architectural specifications implemented across the Generative Conversational Assistant.

KEY BENCHMARKS ACHIEVED:
1. Vector Retrieval Latency: <180ms across 2.4 Million node structures.
2. Render FPS: Stable 60fps on dynamic layouts rendering.
3. System Availability: 99.98% high-availability failover cluster.

CORE SYSTEM STACK:
- UI Layer: Next.js Server Components, CSS HSL design properties.
- Model Pipelines: FastAPI backend, PyTorch embeddings, LangChain pipeline.
- Database: PostgreSQL transactional schemas, Pinecone Vector Index.

=====================================================
End of Technical Project Blueprint.`;

    triggerClientBlobDownload(content, "Smart_Assistant_Project_Report.pdf", "text/plain");
    showToast("fa-circle-down", "Report PDF Downloaded", "Full technical architecture review.");
  });

  // PPT Presentation Download
  document.getElementById("dl-ppt-btn").addEventListener("click", () => {
    const content = `=====================================================
SLIDE DECK: ULTRA-PREMIUM DIGITAL EXPERIENCES
=====================================================
Speaker: Ronak Parmar

SLIDE 1: INTRODUCTION
- Ronak Parmar: Senior Full Stack Developer & UI/UX Expert.
- Core Theme: Merging aesthetics with optimized system code.

SLIDE 2: THE FRONTEND ART
- Utilizing modern HSL color structures for dynamic color accents.
- Responsive styling using clamp() typography parameters.
- Frosted-glass glassmorphism design layouts.

SLIDE 3: SCALABLE BACKEND SYSTEMS
- API integrations and secure token storage.
- High-efficiency relational database structures.

SLIDE 4: THANK YOU!
- Let's discuss your next dream project today.
- Contact: parmarronak75749@gmail.com / +91 9913102838`;

    triggerClientBlobDownload(content, "Ronak_Parmar_Presentation.pptx", "text/plain");
    showToast("fa-circle-down", "Slide Deck PPT Downloaded", "Ready to present slide deck loaded.");
  });

  // Standard downloader utility
  function triggerClientBlobDownload(text, filename, type) {
    const blob = new Blob([text], { type: type });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // ==========================================================================
  // 13. GITHUB SIMULATED STATS GRAPH
  // ==========================================================================
  const gitMatrix = document.getElementById("github-contribution-matrix");
  if (gitMatrix) {
    const cellCount = 53 * 7; // 371 cells (53 weeks * 7 days)
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement("div");
      cell.className = "github-cell";

      // Randomly assign contribution density levels
      const rand = Math.random();
      let level = "0";
      if (rand > 0.85) level = "4";      // Heavy
      else if (rand > 0.70) level = "3"; // Medium
      else if (rand > 0.50) level = "2"; // Light
      else if (rand > 0.30) level = "1"; // Minimal

      cell.setAttribute("data-level", level);

      // Simulated timestamp tooltip
      const date = new Date();
      date.setDate(date.getDate() - (cellCount - i));
      const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const commitCount = level === "0" ? "No" : (level * 3 - Math.floor(Math.random() * 2));
      cell.setAttribute("title", `${commitCount} commits on ${formattedDate}`);

      gitMatrix.appendChild(cell);
    }
  }

  // ==========================================================================
  // 14. CONTACT VALIDATOR & TOAST SUCCESS DIALOG
  // ==========================================================================
  const form = document.getElementById("portfolio-contact-form");
  const toastContainer = document.getElementById("toast-container");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Grab inputs
    const nameVal = document.getElementById("cf-name");
    const emailVal = document.getElementById("cf-email");
    const subVal = document.getElementById("cf-subject");
    const msgVal = document.getElementById("cf-message");
    const submitBtn = document.getElementById("cf-submit-btn");

    // Clear validation error highlights
    [nameVal, emailVal, subVal, msgVal].forEach(el => el.classList.remove("input-error"));

    let hasError = false;

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailVal.value.trim())) {
      emailVal.classList.add("input-error");
      hasError = true;
    }

    if (nameVal.value.trim().length < 2) {
      nameVal.classList.add("input-error");
      hasError = true;
    }

    if (msgVal.value.trim().length < 5) {
      msgVal.classList.add("input-error");
      hasError = true;
    }

    if (hasError) {
      showToast(
        "fa-circle-exclamation",
        state.lang === "en" ? "Validation Error" : "ચકાસણી ભૂલ",
        state.lang === "en" ? "Please fill out required fields correctly." : "કૃપા કરીને બધી વિગતો સાચી ભરો."
      );
      return;
    }

    // Submission loading state trigger
    const initialText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>${translations[state.lang].contact.sending_btn}</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
    submitBtn.disabled = true;

    // Simulate EmailJS or server API post call
    setTimeout(() => {
      // Trigger Success modal dialog
      showContactSuccessModal();

      // Reset Form fields
      form.reset();

      // Restore Button state
      submitBtn.innerHTML = initialText;
      submitBtn.disabled = false;

      showToast(
        "fa-envelope-circle-check",
        state.lang === "en" ? "Email Message Sent" : "સંદેશો મોકલાયો",
        state.lang === "en" ? "Ronak will get back to you shortly!" : "રોનક ટૂંક સમયમાં તમારો સંપર્ક કરશે!"
      );
    }, 1500);
  });

  // success Modal trigger
  function showContactSuccessModal() {
    const data = translations[state.lang].contact;
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.style.zIndex = "6000";

    overlay.innerHTML = `
      <div class="modal-content glass-card" style="max-width: 440px; text-align: center; padding: 3rem;">
        <i class="fa-solid fa-circle-check" style="font-size: 4.5rem; color: var(--primary); filter: drop-shadow(0 0 10px var(--primary-glow)); margin-bottom: 1.5rem; display: block;"></i>
        <h3 class="modal-title" style="margin-bottom: 1rem;">${data.success_title}</h3>
        <p style="color: var(--text-muted); margin-bottom: 2rem;">${data.success_desc}</p>
        <button class="btn btn-primary" id="success-close-btn" style="width: 100%; justify-content: center;">${data.success_close}</button>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    const closeBtn = overlay.querySelector("#success-close-btn");
    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("active");
      setTimeout(() => {
        document.body.removeChild(overlay);
        document.body.style.overflow = "";
      }, 300);
    });
  }

  // Sleek Bottom-Right Toast Alert System
  function showToast(icon, title, desc) {
    const toast = document.createElement("div");
    toast.className = "toast-notification";

    toast.innerHTML = `
      <i class="fa-solid ${icon} toast-icon"></i>
      <div class="toast-content">
        <span class="toast-title">${title}</span>
        <span class="toast-desc">${desc}</span>
      </div>
    `;

    toastContainer.appendChild(toast);

    // Trigger animation frame slide-in
    setTimeout(() => {
      toast.classList.add("active");
    }, 50);

    // Slide-out and destroy after 4 seconds
    setTimeout(() => {
      toast.classList.remove("active");
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 500);
    }, 4000);
  }

  // ==========================================================================
  // 15. SOCIAL SHARE & TESTIMONIALS SLIDER
  // ==========================================================================

  // WhatsApp Link Share
  document.getElementById("share-wa").addEventListener("click", () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out Ronak's awesome developer portfolio! ");
    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, "_blank");
  });

  // LinkedIn Share
  document.getElementById("share-li").addEventListener("click", () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  });

  // Twitter / X Share
  document.getElementById("share-tw").addEventListener("click", () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out this ultra-premium portfolio: ");
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  });

  // Testimonials Carousel Engine
  const slider = document.getElementById("testimonials-slider");
  const dots = document.querySelectorAll("#testimonial-dots .test-dot");

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      dots.forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
      const slideIdx = dot.getAttribute("data-slide");
      slider.style.transform = `translateX(-${slideIdx * 100}%)`;
    });
  });

});
