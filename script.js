// script.js

// Theme Toggle
const themeBtn = document.getElementById('themeBtn');
const htmlEl = document.documentElement;

themeBtn.addEventListener('click', () => {
  const currentTheme = htmlEl.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  htmlEl.setAttribute('data-theme', newTheme);
  themeBtn.textContent = newTheme === 'light' ? '🌙' : '☀️';
  localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
htmlEl.setAttribute('data-theme', savedTheme);
themeBtn.textContent = savedTheme === 'light' ? '🌙' : '☀️';

// Menu Overlay
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const menuOverlay = document.getElementById('menuOverlay');
const overlayLinks = document.querySelectorAll('.ol-link');

menuBtn.addEventListener('click', () => {
  menuOverlay.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  menuOverlay.classList.remove('active');
});

overlayLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
  });
});

// Typewriter Effect
const roles = ['Frontend Developer', 'MERN Stack Expert', 'UI/UX Enthusiast', 'Web Architect'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function type() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500; // Pause before new word
  }

  setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
  if (typewriterEl) type();
});

// Scroll Animations (AOS replacement)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
  observer.observe(el);
});

// Scroll-linked Process Timeline
const tlItems = document.querySelectorAll('.tl-item');
const tlObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.5 });

tlItems.forEach(item => tlObserver.observe(item));

// Project Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projCards = document.querySelectorAll('.proj-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filterValue = btn.getAttribute('data-filter');
    
    // Filter projects with animation
    projCards.forEach(card => {
      const categories = card.getAttribute('data-category').split(' ');
      const shouldShow = filterValue === 'all' || categories.includes(filterValue);
      
      if (shouldShow) {
        card.style.display = 'flex';
        card.style.animation = 'scaleIn 0.6s ease-out forwards';
        setTimeout(() => card.classList.add('visible'), 10);
      } else {
        card.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
          card.style.display = 'none';
          card.classList.remove('visible');
        }, 300);
      }
    });
  });
});

// Back to Top Button
const backTopBtn = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backTopBtn.classList.add('visible');
  } else {
    backTopBtn.classList.remove('visible');
  }
});

backTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const counter = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + '+';
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(start) + '+';
    }
  }, 16);
}

// Trigger counter animation when stats come into view
const statCards = document.querySelectorAll('.stat-card');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      const statNum = entry.target.querySelector('.sn');
      const targetNum = parseInt(statNum.textContent);
      animateCounter(statNum, targetNum);
      entry.target.classList.add('animated');
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statCards.forEach(card => statsObserver.observe(card));

// Parallax Effect on Scroll
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const decorCircles = document.querySelectorAll('.deco-circle');
  decorCircles.forEach((circle, index) => {
    circle.style.transform = `translateY(${scrolled * (0.2 + index * 0.1)}px)`;
  });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScroll && window.scrollY > 500) {
    // Scroll Down - Hide navbar
    navbar.style.transform = 'translateY(-100%)';
  } else {
    // Scroll Up - Show navbar
    navbar.style.transform = 'translateY(0)';
  }
  lastScroll = window.scrollY;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Initialize AOS-style animations on page load
window.addEventListener('load', () => {
  document.querySelectorAll('[data-aos]').forEach(el => {
    const delay = el.getAttribute('data-aos-delay') || 0;
    setTimeout(() => {
      observer.observe(el);
    }, parseInt(delay));
  });
});



// ═══════════════ PROJECT STEPS TIMELINE COMPONENT ═══════════════

class ProjectStepsTimeline {
  constructor() {
    this.timeline = document.getElementById('stepsTimeline');
    if (!this.timeline) return;

    this.stepButtons = document.querySelectorAll('.step-button');
    this.contentItems = document.querySelectorAll('.step-content-item');
    this.visualItems = document.querySelectorAll('.step-visual-item');
    this.playPauseBtn = document.getElementById('playPauseBtn');

    this.currentStep = 0;
    this.totalSteps = this.stepButtons.length;
    this.autoPlayActive = false;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 2000; // 2 seconds
    this.isVisible = false;

    this.init();
  }

  init() {
    // Add click listeners to step buttons
    this.stepButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => this.handleStepClick(index));
    });

    // Play/Pause button
    if (this.playPauseBtn) {
      this.playPauseBtn.addEventListener('click', () => this.toggleAutoPlay());
    }

    // Intersection Observer for viewport detection
    this.setupIntersectionObserver();

    // Set initial state
    this.updateStepUI(0);
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.isVisible) {
            // Section became visible
            this.isVisible = true;
            this.startAutoPlay();
          } else if (!entry.isIntersecting && this.isVisible) {
            // Section left viewport
            this.isVisible = false;
            this.stopAutoPlay();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(this.timeline);
  }

  handleStepClick(stepIndex) {
    // Pause auto-play on manual click
    this.stopAutoPlay();
    this.autoPlayActive = false;
    this.updatePlayPauseButton();

    // Update to clicked step
    this.currentStep = stepIndex;
    this.updateStepUI(stepIndex);
  }

  updateStepUI(stepIndex) {
    // Update step buttons
    this.stepButtons.forEach((btn, index) => {
      btn.classList.remove('active', 'completed');

      if (index === stepIndex) {
        btn.classList.add('active');
      } else if (index < stepIndex) {
        btn.classList.add('completed');
      }
    });

    // Update content items
    this.contentItems.forEach((item, index) => {
      if (index === stepIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update visual items
    this.visualItems.forEach((item, index) => {
      if (index === stepIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  startAutoPlay() {
    if (this.autoPlayActive) return;

    this.autoPlayActive = true;
    this.updatePlayPauseButton();

    this.autoPlayInterval = setInterval(() => {
      this.currentStep = (this.currentStep + 1) % this.totalSteps;
      this.updateStepUI(this.currentStep);
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  toggleAutoPlay() {
    if (this.autoPlayActive) {
      this.stopAutoPlay();
      this.autoPlayActive = false;
    } else {
      this.startAutoPlay();
    }

    this.updatePlayPauseButton();
  }

  updatePlayPauseButton() {
    if (!this.playPauseBtn) return;

    if (this.autoPlayActive) {
      this.playPauseBtn.classList.remove('paused');
      this.playPauseBtn.innerHTML = '<span class="control-icon">⏸</span>';
    } else {
      this.playPauseBtn.classList.add('paused');
      this.playPauseBtn.innerHTML = '<span class="control-icon">▶</span>';
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ProjectStepsTimeline();
    initOfferTimeline();
  });
} else {
  new ProjectStepsTimeline();
  initOfferTimeline();
}

// ═══════════════ SERVICES TIMELINE ANIMATION ═══════════════
function initOfferTimeline() {
  const offerItems = document.querySelectorAll('.offer-item');
  if (offerItems.length === 0) return;

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  offerItems.forEach(item => {
    observer.observe(item);
  });
}
