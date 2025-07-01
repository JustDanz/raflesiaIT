<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isMobile = ref(false)

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 992
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeAllMenus = () => {
  isMobileMenuOpen.value = false
}

const handleClickOutside = (event) => {
  const toggler = event.target.closest('.navbar-toggler')
  const bottomNav = event.target.closest('.navbar-bottom')
  if (!toggler && !bottomNav && isMobileMenuOpen.value) {
    closeAllMenus()
  }
}

const handleNavigation = (to) => {
  window.location.href = to // Forces full page reload
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', checkScreenSize, { passive: true })
  document.addEventListener('click', handleClickOutside)
  checkScreenSize()
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', checkScreenSize)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div v-cloak>
    <nav class="navbar" :class="{ 'scrolled': isScrolled, 'mobile-menu-open': isMobileMenuOpen }">
      <div class="container">
        <router-link class="navbar-brand" to="/" @click="handleNavigation('/')">
          <img 
            src="../assets/raflesiait.png" 
            alt="RaflesiaIT" 
            class="logo" 
            :class="{ 'logo-small': isScrolled }"
            loading="lazy"
          >
        </router-link>

        <div class="navbar-center">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link 
                class="nav-link" 
                to="/academy"
                @click="handleNavigation('/academy')"
                active-class="active"
              >
                <i class="fas fa-home"></i>
                <span>Beranda</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link 
                class="nav-link" 
                to="/courses"
                @click="handleNavigation('/courses')"
                active-class="active"
              >
                <i class="fas fa-book"></i>
                <span>Course</span>
              </router-link>
              <router-link 
                class="nav-link" 
                to="/admin-dashboard"
                @click="handleNavigation('/admin-dashboard')"
                active-class="active"
              >
                <i class="fas fa-book"></i>
                <span>Admin Dashboard</span>
              </router-link>
              <router-link 
                class="nav-link" 
                to="/mentor-dashboard"
                @click="handleNavigation('/mentor-dashboard')"
                active-class="active"
              >
                <i class="fas fa-book"></i>
                <span>Mentor Dashboard</span>
              </router-link>
              <router-link 
                class="nav-link" 
                to="/user-dashboard"
                @click="handleNavigation('/user-dashboard')"
                active-class="active"
              >
                <i class="fas fa-book"></i>
                <span>User Dashboard</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link 
                class="nav-link" 
                to="/blog"
                @click="handleNavigation('/blog')"
                active-class="active"
              >
                <i class="fas fa-blog"></i>
                <span>Blog</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link 
                class="nav-link" 
                to="/events"
                @click="handleNavigation('/events')"
                active-class="active"
              >
                <i class="fas fa-calendar-alt"></i>
                <span>Event</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link 
                class="nav-link" 
                to="/about"
                @click="handleNavigation('/about')"
                active-class="active"
              >
                <i class="fas fa-info-circle"></i>
                <span>About Us</span>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="navbar-right">
          <router-link 
            class="auth-link login-link" 
            to="/login"
            @click="handleNavigation('/login')"
            active-class="active"
            aria-label="Login"
          >
            <i class="fas fa-sign-in-alt"></i>
            <span>Login</span>
          </router-link>
          <router-link 
            class="auth-link register-link" 
            to="/register"
            @click="handleNavigation('/register')"
            active-class="active"
            aria-label="Register"
          >
            <i class="fas fa-user-plus"></i>
            <span>Register</span>
          </router-link>
        </div>

        <button 
          class="navbar-toggler" 
          type="button" 
          @click="toggleMobileMenu"
          :class="{ 'active': isMobileMenuOpen }"
          aria-label="Toggle navigation"
          aria-expanded="isMobileMenuOpen"
          aria-controls="navbarCollapse"
        >
          <span class="toggler-line top-line"></span>
          <span class="toggler-line middle-line"></span>
          <span class="toggler-line bottom-line"></span>
        </button>
      </div>

      <div class="mobile-menu" :class="{ 'open': isMobileMenuOpen }">
        <div class="mobile-menu-content">
          <ul class="mobile-nav">
            <li class="nav-item">
              <router-link 
                class="nav-link" 
                to="/academy"
                @click="handleNavigation('/academy')"
                active-class="active"
              >
                <i class="fas fa-home"></i>
                <span>Beranda</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link 
                class="nav-link" 
                to="/courses"
                @click="handleNavigation('/courses')"
                active-class="active"
              >
                <i class="fas fa-book"></i>
                <span>Course</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link 
                class="nav-link" 
                to="/blog"
                @click="handleNavigation('/blog')"
                active-class="active"
              >
                <i class="fas fa-blog"></i>
                <span>Blog</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link 
                class="nav-link" 
                to="/events"
                @click="handleNavigation('/events')"
                active-class="active"
              >
                <i class="fas fa-calendar-alt"></i>
                <span>Event</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link 
                class="nav-link" 
                to="/about"
                @click="handleNavigation('/about')"
                active-class="active"
              >
                <i class="fas fa-info-circle"></i>
                <span>About Us</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link 
                class="nav-link auth-link login-link" 
                to="/login"
                @click="handleNavigation('/login')"
                active-class="active"
              >
                <i class="fas fa-sign-in-alt"></i>
                <span>Login</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link 
                class="nav-link auth-link register-link" 
                to="/register"
                @click="handleNavigation('/register')"
                active-class="active"
              >
                <i class="fas fa-user-plus"></i>
                <span>Register</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
[v-cloak] {
  display: none;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1200;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--gray);
  padding: 0.75rem 0;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
  min-height: 70px;
}

.navbar.scrolled {
  padding: 0.5rem 0;
  box-shadow: var(--shadow);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
}

.navbar-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  z-index: 1001;
}

.logo {
  height: 100px;
  width: auto;
  transition: var(--transition);
  object-fit: contain;
}

.logo.logo-small {
  height: 80px;
}

.navbar-center {
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 0 1rem;
}

.navbar-nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: var(--secondary);
  font-weight: 500;
  font-size: 0.95rem;
  border-radius: var(--radius);
  transition: var(--transition);
}

.nav-link i {
  font-size: 1rem;
  color: var(--primary);
  transition: var(--transition);
  width: 20px;
  text-align: center;
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary);
  background-color: rgba(59, 130, 246, 0.1);
  transform: scale(1.02);
}

.nav-link:hover i,
.nav-link.active i {
  color: var(--primary-dark);
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.auth-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: var(--radius);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.register-link {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: var(--white);
  border: none;
  box-shadow: var(--shadow-sm);
}

.auth-link i {
  font-size: 1rem;
  transition: var(--transition);
  width: 20px;
  text-align: center;
}

.login-link {
  color: var(--primary);
  border: 1px solid var(--primary);
  background: transparent;
}

.login-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transition: 0.5s;
}

.login-link:hover::before,
.login-link.active::before {
  left: 100%;
}

.login-link:hover,
.login-link.active {
  color: var(--white);
  background: var(--primary);
  transform: scale(1.05);
  box-shadow: var(--shadow-sm);
}

.login-link:hover i,
.login-link.active i {
  color: var(--white);
}

.register-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}

.register-link:hover::before,
.register-link.active::before {
  left: 100%;
}

.register-link:hover,
.register-link.active {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary));
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
}

.register-link i {
  color: var(--white);
}

.navbar-toggler {
  display: none;
  position: relative;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 1001;
}

.toggler-line {
  position: absolute;
  left: 10px;
  width: 24px;
  height: 2px;
  background-color: var(--primary);
  transition: all 0.3s ease;
  border-radius: 2px;
  transform-origin: center;
}

.top-line {
  top: 14px;
}

.middle-line {
  top: 21px;
}

.bottom-line {
  top: 28px;
}

.navbar-toggler.active .top-line {
  transform: translateY(7px) rotate(45deg);
}

.navbar-toggler.active .middle-line {
  opacity: 0;
}

.navbar-toggler.active .bottom-line {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1029;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition);
}

.mobile-menu.open {
  opacity: 1;
  visibility: visible;
}

.mobile-menu-content {
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  background: var(--white);
  padding: 1.5rem;
  transform: translateY(-20px);
  transition: var(--transition);
  max-height: calc(100vh - 80px);
  overflow-y: auto;
}

.mobile-menu.open .mobile-menu-content {
  transform: translateY(0);
}

.mobile-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav .nav-link {
  padding: 1rem;
  font-size: 1.1rem;
  border-radius: var(--radius);
}

.mobile-nav .auth-link {
  padding: 1rem;
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.mobile-nav .login-link {
  color: var(--primary);
  border: 1px solid var(--primary);
  background: transparent;
}

.mobile-nav .login-link:hover,
.mobile-nav .login-link.active {
  color: var(--white);
  background: var(--primary);
}

.mobile-nav .register-link {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: var(--white);
  border: none;
}

@media (max-width: 992px) {
  .navbar-toggler {
    display: flex;
  }
  
  .navbar-center {
    display: none;
  }
  
  .mobile-menu {
    display: block;
  }
  
  .logo {
    height: 80px;
  }
  
  .logo.logo-small {
    height: 50px;
  }
  
  .navbar-right {
    display: none;
  }
}

@media (max-width: 576px) {
  .logo {
    height: 40px;
  }
  
  .logo.logo-small {
    height: 35px;
  }
  
  .navbar-toggler {
    width: 36px;
    height: 36px;
  }
  
  .toggler-line {
    width: 20px;
    height: 2px;
    left: 8px;
  }
  
  .top-line {
    top: 12px;
  }
  
  .middle-line {
    top: 18px;
  }
  
  .bottom-line {
    top: 24px;
  }
}

.nav-link:focus,
.navbar-toggler:focus,
.navbar-bottom .nav-link:focus,
.navbar-bottom .auth-link:focus {
  outline: 3px solid var(--primary);
  outline-offset: 3px;
  border-radius: var(--radius);
}

@media (prefers-reduced-motion: reduce) {
  .navbar,
  .mobile-menu,
  .navbar-toggler span,
  .auth-link::before {
    transition: none !important;
  }
}
</style>