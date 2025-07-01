<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faBars, 
  faTimes,
  faUserPlus,
  faInfoCircle,
  faGraduationCap,
  faCalendarAlt,
  faStar,
  faChevronRight,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faSignInAlt,
  faUsers,
  faLaptopCode,
  faComments,
  faBook,
  faHandsHelping,
  faShieldAlt,
  faLock,
  faGlobe
} from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faYoutube, faTelegram, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add icons to Font Awesome library
library.add(
  faBars, 
  faTimes,
  faUserPlus,
  faInfoCircle,
  faGraduationCap,
  faCalendarAlt,
  faStar,
  faChevronRight,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faSignInAlt,
  faUsers,
  faLaptopCode,
  faComments,
  faBook,
  faHandsHelping,
  faShieldAlt,
  faLock,
  faGlobe,
  faInstagram,
  faYoutube,
  faTelegram,
  faGithub
)

// Benefits data
const benefits = [
  {
    name: "Jaringan Profesional",
    desc: "Terhubung langsung dengan berbagai profesional dari latar belakang dan industri berbeda. Memperluas jaringan, kolaborasi proyek, hingga peluang kerja.",
    icon: "users",
    color: "#3b82f6"
  },
  {
    name: "Workshop Rutin",
    desc: "Akses ke pelatihan eksklusif berkualitas dan berkelanjutan. Upgrade skill lewat pelatihan langsung (Live Zoom) atau mandiri (video course).",
    icon: "laptop-code",
    color: "#10b981"
  },
  {
    name: "Forum Diskusi",
    desc: "Tempat bertanya, berbagi ide, atau minta bantuan dari sesama anggota komunitas. Mendapatkan solusi dari sesama praktisi.",
    icon: "comments",
    color: "#f59e0b"
  },
  {
    name: "Event Bulanan",
    desc: "Agenda bulanan seperti seminar, webinar, atau sharing session dengan praktisi industri. Menambah wawasan dari pembicara inspiratif.",
    icon: "calendar-alt",
    color: "#8b5cf6"
  },
  {
    name: "Sumber Belajar",
    desc: "Perpustakaan digital berisi materi eksklusif yang selalu diperbarui. Akses ke artikel, modul, PDF, dan video tutorial cyber security.",
    icon: "book",
    color: "#ec4899"
  },
  {
    name: "Mentorship",
    desc: "Program bimbingan 1-on-1 bersama mentor berpengalaman. Konsultasi langsung, bimbingan karier, dan pengembangan pribadi di dunia keamanan siber.",
    icon: "hands-helping",
    color: "#ef4444"
  }
]

// Navigation state
const isMobileMenuOpen = ref(false)
const activeBenefit = ref(null)
const isScrolled = ref(false)
const isMobile = ref(false)

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 992
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.classList.toggle('no-scroll', isMobileMenuOpen.value)
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.classList.remove('no-scroll')
}

const handleSmoothScroll = (e) => {
  if (e.target.getAttribute('href').startsWith('#')) {
    e.preventDefault()
    closeMobileMenu()
    const targetId = e.target.getAttribute('href')
    const target = document.querySelector(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

// Event listener setup and cleanup
const setupEventListeners = () => {
  // Smooth scrolling
  const handleClick = (e) => handleSmoothScroll(e)
  const anchors = document.querySelectorAll('a[href^="#"]')
  anchors.forEach(anchor => anchor.addEventListener('click', handleClick))

  // Fade-in animation
  const fadeElements = document.querySelectorAll('.fade-in')
  const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight
      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
      }
    })
  }

  fadeElements.forEach(element => {
    element.style.opacity = '0'
    element.style.transform = 'translateY(20px)'
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'
  })

  window.addEventListener('load', fadeInOnScroll)
  window.addEventListener('scroll', fadeInOnScroll)

  // Click outside to close menu
  const handleClickOutside = (e) => {
    const navLinks = document.getElementById('navLinks')
    const menuBtn = document.getElementById('mobileMenuBtn')
    if (!navLinks?.contains(e.target) && !menuBtn?.contains(e.target) && isMobileMenuOpen.value) {
      closeMobileMenu()
    }
  }
  document.addEventListener('click', handleClickOutside)

  // Return cleanup function
  return () => {
    anchors.forEach(anchor => anchor.removeEventListener('click', handleClick))
    window.removeEventListener('load', fadeInOnScroll)
    window.removeEventListener('scroll', fadeInOnScroll)
    document.removeEventListener('click', handleClickOutside)
  }
}

// Lifecycle hooks
onMounted(() => {
  const cleanup = setupEventListeners()
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', checkScreenSize)
  checkScreenSize()
  
  // Store cleanup for unmounted
  onUnmounted(() => {
    cleanup()
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', checkScreenSize)
  })
})
</script>

<template>
  <div>
    <header>
      <div class="header-container">
        <RouterLink to="/" class="logo">
          <img src="../assets/raflesiait.png" alt="RaflesiaIT">
        </RouterLink>
        <button class="mobile-menu-btn" id="mobileMenuBtn" @click="toggleMobileMenu" :aria-expanded="isMobileMenuOpen" aria-controls="navLinks">
          <FontAwesomeIcon :icon="isMobileMenuOpen ? faTimes : faBars" />
        </button>
        <nav>
          <div class="nav-overlay" :class="{ 'active': isMobileMenuOpen }" @click="closeMobileMenu"></div>
          <ul class="nav-links" id="navLinks" :class="{ 'active-mobile': isMobileMenuOpen }">
            <li><RouterLink to="/about"><FontAwesomeIcon icon="info-circle" /> About Us</RouterLink></li>
            <li><RouterLink to="/academy"><FontAwesomeIcon icon="graduation-cap" /> Academy</RouterLink></li>
            <li><RouterLink to="/events"><FontAwesomeIcon icon="calendar-alt" /> Events</RouterLink></li>
            <li><a href="#benefit"><FontAwesomeIcon icon="star" /> Benefit</a></li>
            <li><RouterLink to="/register" class="btn-nav"><FontAwesomeIcon icon="user-plus" /> Gabung</RouterLink></li>
          </ul>
        </nav>
      </div>
    </header>

    <section class="section-hero">
      <div class="hero-content fade-in">
        <div class="hero-badge">
          <FontAwesomeIcon icon="shield-alt" /> Komunitas Cyber Security Bengkulu
        </div>
        <h1>Attack and Defend to Protect</h1>
        <p>
          Kami percaya bahwa Cyber Security membutuhkan pemahaman dari dua sisi yaitu <b>menyerang dan bertahan</b>. 
          Karena itu, kami mempelajari keduanya untuk melindungi dunia digital secara menyeluruh.
        </p>
        <div class="hero-cta">
          <RouterLink to="/register" class="btn btn-primary">
            <FontAwesomeIcon icon="fas fa-user-plus" /> Gabung Sekarang
          </RouterLink>
          <RouterLink to="/about" class="btn btn-outline">
            <FontAwesomeIcon icon="fas fa-info-circle" /> Pelajari Lebih
          </RouterLink>
        </div>
      </div>
    </section>

    <section id="about" class="section">
      <div class="section-title">
        <h2>Tentang <span class="highlight">RaflesiaIT</span></h2>
        <p class="section-subtitle">Komunitas Cyber Security berbasis di Bengkulu</p>
      </div>
      <div class="card-container">
        <article class="about-card fade-in">
          <div class="about-content">
            <p>
              <b>RaflesiaIT</b> adalah komunitas cyber security yang dibentuk dari semangat kolaborasi dan edukasi. 
              Dengan visi menjadi pusat pembelajaran Cyber Security yang progresif, RaflesiaIT menyediakan ruang belajar, 
              pelatihan praktis, dan membangun ekosistem talenta yang siap bersaing secara nasional.
            </p>
            <p>
              Terbuka untuk pelajar hingga profesional, komunitas ini berfokus pada dua pilar utama, 
              <b>Red Team</b> (penetration testing, ethical hacking) dan <b>Blue Team</b> (defensive security, incident response), 
              membekali anggota dengan pemahaman menyeluruh untuk melindungi dunia digital.
            </p>
            <RouterLink to="/academy" class="btn btn-outline">
              <FontAwesomeIcon icon="fas fa-chevron-right" /> Baca Selengkapnya
            </RouterLink>
          </div>
          <img src="../assets/raflesiait.png" alt="RaflesiaIT Logo" class="about-logo">
        </article>
      </div>
    </section>

    <section id="benefit" class="benefit-section">
      <div class="benefit-title">
        <h2 align="center">Benefit Bergabung di <span class="highlight">RaflesiaIT</span></h2>
      </div>
      <div class="benefit-grid">
        <article 
          class="benefit-card fade-in" 
          v-for="(benefit, index) in benefits" 
          :key="index"
          @mouseenter="activeBenefit = index"
          @mouseleave="activeBenefit = null"
          :class="{ 'active': activeBenefit === index }"
        >
          <div class="benefit-header">
            <div class="benefit-icon" :style="{ backgroundColor: benefit.color }">
              <FontAwesomeIcon :icon="benefit.icon" />
            </div>
            <h3 class="benefit-name">{{ benefit.name }}</h3>
          </div>
          <p class="benefit-desc">
            {{ benefit.desc }}
          </p>
          <div class="benefit-arrow">
            <FontAwesomeIcon icon="chevron-right" />
          </div>
        </article>
      </div>
    </section>

    <section class="journey">
       <h2>Perjalanan Kami</h2>
      <div class="journey-container">
        <article class="journey-item fade-in">
          <div class="journey-number">100+</div>
          <div class="journey-text">Member Community</div>
        </article>
        <article class="journey-item fade-in">
          <div class="journey-number">2</div>
          <div class="journey-text">Journal Research</div>
        </article>
        <article class="journey-item fade-in">
          <div class="journey-number">100+</div>
          <div class="journey-text">Education Video</div>
        </article>
        <article class="journey-item fade-in">
          <div class="journey-number">5</div>
          <div class="journey-text">Course Academy</div>
        </article>
      </div>
    </section>

    <section id="partnership" class="section partnership">
      <div class="section-title">
        <h2>Partner <span class="highlight">Kami</span></h2>
        <p class="section-subtitle">Organisasi yang berkolaborasi dengan kami</p>
      </div>
      <div class="partners-container">
        <img src="../assets/kzrdev_logo.png" alt="KaizerDev" class="partner-logo">
      </div>
    </section>

    <section id="gabung" class="cta-section">
      <div class="cta-container fade-in">
        <div class="cta-content">
          <h2 style="color: white;">Siap Bergabung dengan <span style="color: white;">RaflesiaIT</span></h2>
          <p>
            Jadilah bagian dari komunitas cyber security yang berkembang di Bengkulu. 
            Akses materi belajar, event eksklusif, dan jaringan profesional.
          </p>
        </div>
        <RouterLink to="/register" class="btn btn-primary btn-large">
          <FontAwesomeIcon icon="fas fa-sign-in-alt" /> Daftar Sekarang
        </RouterLink>
      </div>
    </section>

    <footer>
      <div class="footer-content">
        <div class="footer-column footer-about">
          <RouterLink to="/" class="footer-logo">
            <img src="../assets/raflesiait.png" alt="RaflesiaIT">
            <span class="logo-text">RaflesiaIT</span>
          </RouterLink>
          <p class="footer">
Komunitas cyber security berbasis di Bengkulu yang fokus pada pengembangan kemampuan red team dan blue team.
</p>
          <div class="social-links">
            <a href="#" aria-label="Instagram"><FontAwesomeIcon icon="fab fa-instagram" /></a>
            <div><a href="#" aria-label="YouTube"><FontAwesomeIcon icon="fab fa-youtube" /></a></div>
            <div><a href="#" aria-label="Telegram"><FontAwesomeIcon icon="fab fa-telegram" /></a></div>
            <div><a href="#" aria-label="Github"><FontAwesomeIcon icon="fab fa-github" /></a></div>
          </div>
        </div>
        <div class="footer-column">
          <h3>Tautan Cepat</h3>
          <ul>
            <li><RouterLink to="/about"><FontAwesomeIcon icon="fas fa-chevron-right" /> Tentang Kami</RouterLink></li>
            <li><RouterLink to="/events"><FontAwesomeIcon icon="fas fa-chevron-right" /> Event</RouterLink></li>
            <li><a href="#partnership"><FontAwesomeIcon icon="fas fa-chevron-right" /> Partnership</a></li>
            <li><RouterLink to="/academy"><FontAwesomeIcon icon="fas fa-chevron-right" /> Academy</RouterLink></li>
            <li><a href="#gabung"><FontAwesomeIcon icon="fas fa-chevron-right" /> Bergabung</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Academy</h3>
          <ul>
            <li><RouterLink to="/academy"><FontAwesomeIcon icon="fas fa-chevron-right" /> Kelas Online</RouterLink></li>
            <li><RouterLink to="/academy"><FontAwesomeIcon icon="fas fa-chevron-right" /> Workshop</RouterLink></li>
            <li><RouterLink to="/academy"><FontAwesomeIcon icon="fas fa-chevron-right" /> Sertifikasi</RouterLink></li>
            <li><RouterLink to="/academy"><FontAwesomeIcon icon="fas fa-chevron-right" /> Materi Gratis</RouterLink></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Kontak Kami</h3>
          <ul class="contact-info">
            <li><a href="mailto:raflesiait@gmail.com"><FontAwesomeIcon icon="fas fa-envelope" /> raflesiait@gmail.com</a></li>
            <li><a href="tel:+6281234567890"><FontAwesomeIcon icon="fas fa-phone" /> +62 812-3456-7890</a></li>
            <li><a href="#"><FontAwesomeIcon icon="fas fa-map-marker-alt" /> Bengkulu, Indonesia</a></li>
          </ul>
        </div>
      </div>
      <div class="copyright">
        <p>© 2025 RaflesiaIT Community. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style>
:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --primary-light: #69a2ff;
  --secondary: #1e40af;
  --accent: #f59e0b;
  --accent-dark: #d97706;
  --light: #f8fafc;
  --dark: #1e293b;
  --dark-light: #334155;
  --text: #334155;
  --text-light: #64748b;
  --text-lighter: #94a3b8;
  --border: #e2e8f0;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.1);
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --radius: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  color: var(--text);
  background-color: var(--light);
  line-height: 1.6;
}

.highlight {
  color: #1d4ed8;
}

.no-scroll {
  overflow: hidden;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--dark);
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }

p {
  margin-bottom: 1.25rem;
}

/* Header Styles */
header {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 1rem 0;
  backdrop-filter: blur(10px);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 0.75rem;
}

.logo img {
  height: 80px;
  transition: var(--transition);
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark);
}

.logo:hover img {
  transform: scale(1.05);
}

.nav-links {
  padding-left: 20px;
  display: flex;
  list-style: none;
  gap: 1rem;
}

.nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.nav-overlay.active {
  opacity: 1;
  visibility: visible;
}

.nav-links a {
  margin-left: 20px;
  color: var(--dark);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-links a svg {
  font-size: 0.9rem;
}

.nav-links a:hover {
  color: var(--primary);
  background: rgba(37, 99, 235, 0.1);
}

.btn-nav {
  background: var(--primary);
  color: white !important;
  padding: 0.5rem 1.25rem !important;
}

.btn-nav:hover {
  background: var(--primary-dark) !important;
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.mobile-menu-btn {
  margin-left: auto;
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--dark);
  cursor: pointer;
  z-index: 1001;
  padding: 0.5rem;
  border-radius: var(--radius);
  transition: var(--transition);
}

.mobile-menu-btn:hover {
  background: rgba(0,0,0,0.05);
}

/* Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
  border: none;
  cursor: pointer;
  font-size: 1rem;
  gap: 0.5rem;
  white-space: nowrap;
}

.btn-primary {
  background: rgb(255, 255, 255);
  color: black;
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  color: white;
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border: 1px solid rgb(255, 255, 255);
}

.btn-outline {
  background: transparent;
  color: white;
  border: 1px solid rgb(255, 255, 255);
}

.btn-outline:hover {
  color: black;
  background: rgb(255, 255, 255);
  transform: translateY(-2px);
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

/* Hero Section */
.section-hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../assets/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  padding: clamp(4rem, 10vw, 6rem) 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 70vh;
  position: relative;
}

.hero-content {
  max-width: 700px;
  padding: 0 1rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  margin-bottom: 1.5rem;
  font-size: clamp(0.85rem, 2vw, 0.9rem);
  font-weight: 500;
}

.hero-content h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: white;
}

.hero-content p {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-cta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Section Styles */
.section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title h2 {
  font-size: 2.5rem;
  position: relative;
  display: inline-block;
  padding-bottom: 15px;
}

.section-title h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: var(--accent);
  border-radius: 2px;
}

.section-subtitle {
  color: var(--text-light);
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.1rem;
}

/* Card Styles */
.card-container, .benefit-grid {
  display: grid;
  gap: 2rem;
}

.about-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: 3rem;
  box-shadow: var(--shadow-lg);
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 3rem;
  border: 1px solid var(--border);
}

.about-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}

.about-content {
  flex: 1;
  font-size: 1.1rem;
}

.about-content p {
  color: var(--text);
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.about-logo {
  flex-shrink: 0;
  width: 250px;
  height: auto;
  object-fit: contain;
  border-radius: var(--radius);
}

/* Benefit Section */
.benefit-section {
  padding: 6rem 2rem;
  background: var(--light);
}

.benefit-section h2 {
  margin-bottom: 30px;
}

.benefit-grid {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.benefit-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}

.benefit-card:hover, .benefit-card.active {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-light);
}

.benefit-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 0;
  background: var(--primary);
  transition: var(--transition);
}

.benefit-card:hover::before, .benefit-card.active::before {
  height: 100%;
}

.benefit-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1.5rem;
}

.benefit-icon {
  font-size: 1.5rem;
  color: white;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  flex-shrink: 0;
}

.benefit-name {
  font-size: 1.25rem;
  font-weight: 600;
}

.benefit-desc {
  color: var(--text-light);
  margin-bottom: 2rem;
}

.benefit-arrow {
  color: var(--primary);
  opacity: 0;
  transform: translateX(-10px);
  transition: var(--transition);
}

.benefit-card:hover .benefit-arrow, .benefit-card.active .benefit-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Journey Section */
.journey {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  padding: 5rem 2rem;
  position: relative;
  overflow: hidden;
}

.journey::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path fill="rgba(255,255,255,0.1)" d="M0 0 Q50 20 100 0 Q50 20 0"></path></svg>');
  background-size: cover;
  opacity: 0.2;
}

.journey-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.journey-item {
  padding: 2.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: var(--transition);
  text-align: center;
}

.journey-item:hover {
  scale: 1.05;
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: var(--shadow-md);
}

.journey-number {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1;
}

.journey-text {
  font-size: 1.1rem;
  opacity: 0.9;
}

/* Partnership Section */
.partnership {
  background: var(--light);
  padding: 6rem 2rem;
  text-align: center;
}

.partners-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
}

.partner-logo {
  height: 200px;
  max-width: 100%;
  filter: none;
  opacity: 0.7;
  transition: var(--transition);
  object-fit: contain;
}

.partner-logo:hover {
  filter: none;
  opacity: 1;
  transform: scale(1.2);
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path fill="rgba(255,255,255,0.2)" d="M0 0 Q50 20 100 0 Q50 20 0 0 Z"></path></svg>');
  background-size: cover;
  opacity: 0.2;
}

.cta-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

/* Footer Styles */
footer {
  background: var(--dark);
  color: white;
  padding: 4rem 2rem 2rem;
  position: relative;
}

footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
}

.footer-column h3 {
  color: white;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  position: relative;
  padding-bottom: 10px;
}

.footer-column h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: var(--accent);
}

.footer-about p {
  color: var(--text-lighter);
  margin-bottom: 2rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  text-decoration: none;
}

.footer-logo img {
  height: 40px;
}

.footer-logo .logo-text {
  font-size: 1.25rem;
  color: white;
}

.footer-column ul {
  list-style: none;
}

.footer-column ul li {
  margin-bottom: 0.75rem;
}

.footer-column ul li a {
  color: var(--text-lighter);
  text-decoration: none;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-column ul li a:hover {
  color: white;
  transform: translateX(5px);
}

.contact-info li a {
  align-items: flex-start !important;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-links a {
  color: white;
  background: var(--primary-dark);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.social-links a:hover {
  background: var(--accent);
  transform: translateY(-3px);
}

.copyright {
  text-align: center;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  color: var(--text-lighter);
  font-size: 0.9rem;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.6s ease-out forwards;
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .hero-content h1 {
    font-size: clamp(1.8rem, 4.5vw, 2.5rem);
  }

  .hero-content p {
    font-size: clamp(0.95rem, 2vw, 1.1rem);
  }
}

@media (max-width: 992px) {
  .hero-content h1 {
    font-size: clamp(1.6rem, 4vw, 2.2rem);
  }

  .hero-content p {
    font-size: clamp(0.9rem, 1.8vw, 1rem);
  }

  .section-title h2 {
    font-size: 1.8rem;
  }

  .about-card {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }

  .about-logo {
    order: -1;
    margin-bottom: 1.5rem;
    width: 180px;
  }

  .journey-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .journey-item {
    padding: 2rem 1rem;
  }

  .journey-number {
    font-size: 2.5rem;
  }

  .journey-text {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  header {
    padding: 0.75rem;
  }

  .header-container {
    padding: 0 1rem;
  }

  .logo img {
    height: 40px;
  }

  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    font-size: 1.25rem;
    z-index: 1001;
    position: relative;
  }

  .mobile-menu-btn svg {
    transition: transform 0.3s ease;
  }

  .mobile-menu-btn[aria-expanded="true"] svg {
    transform: rotate(90deg);
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 320px;
    height: 100vh;
    background: white;
    flex-direction: column;
    padding: 5rem 2rem 2rem;
    z-index: 1000;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  }

  .nav-links.active-mobile {
    transform: translateX(0);
  }

  .nav-links li {
    width: 100%;
  }

  .nav-links a {
    font-size: 1.1rem;
    padding: 0.75rem 1rem;
    width: 100%;
    border-radius: 8px;
    color: var(--dark);
    margin-left: 0;
  }

  .btn-nav {
    margin-top: 1rem;
    width: 100%;
    text-align: center;
    justify-content: center;
  }

  .section-hero {
    padding: clamp(3rem, 8vw, 4rem) 1rem;
    min-height: 60vh;
  }

  .hero-content {
    padding: 0 0.75rem;
  }

  .hero-content h1 {
    font-size: clamp(1.4rem, 3.5vw, 1.8rem);
  }

  .hero-content p {
    font-size: clamp(0.85rem, 2vw, 0.95rem);
  }

  .hero-badge {
    font-size: clamp(0.75rem, 1.5vw, 0.85rem);
    padding: 0.4rem 0.8rem;
  }

  .hero-cta {
    gap: 0.75rem;
    flex-direction: column;
    align-items: center;
  }

  .btn {
    padding: 0.65rem 1.25rem;
    font-size: 0.95rem;
    width: 100%;
    max-width: 250px;
  }

  .btn-large {
    padding: 0.85rem 1.75rem;
    font-size: 1rem;
  }

  .section, .benefit-section, .partnership, .cta-section {
    padding: 3rem 1rem;
  }

  .benefit-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .benefit-card {
    padding: 1.5rem;
  }

  .benefit-icon {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }

  .benefit-name {
    font-size: 1.1rem;
  }

  .benefit-desc {
    font-size: 0.95rem;
  }

  .partner-logo {
    height: 120px;
  }

  .cta-content h2 {
    font-size: 1.8rem;
  }

  .cta-content p {
    font-size: 1rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .social-links a {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
}

@media (max-width: 400px) {
  .nav-links {
    width: 85%;
  }

  .nav-links a {
    font-size: 1rem;
  }

  .section-hero {
    padding: clamp(2.5rem, 6vw, 3rem) 0.5rem;
    min-height: 50vh;
  }

  .hero-content h1 {
    font-size: clamp(1.2rem, 3vw, 1.6rem);
  }

  .hero-content p {
    font-size: clamp(0.8rem, 1.5vw, 0.9rem);
  }

  .hero-badge {
    font-size: clamp(0.7rem, 1.5vw, 0.8rem);
    padding: 0.25rem 0.75rem;
  }

  .section-title h2 {
    font-size: 1.6rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .about-card {
    padding: 1.5rem;
  }

  .about-logo {
    width: 150px;
    margin-bottom: 1rem;
  }

  .benefit-card {
    padding: 1.25rem;
  }

  .journey-container {
    gap: 1rem;
  }

  .journey-item {
    padding: 1.25rem 0.75rem;
  }

  .journey-number {
    font-size: 2rem;
  }

  .partner-logo {
    height: 100px;
  }

  .cta-content h2 {
    font-size: 1.6rem;
  }

  .cta-content p {
    font-size: 0.9rem;
  }

  .btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    max-width: 200px;
  }

  .btn-large {
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
  }
}
</style>
