<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isDropdownOpen = ref(false)
const isMobile = ref(false)

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 992
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    isDropdownOpen.value = false
  }
}

const toggleDropdown = (event) => {
  if (isMobile.value) {
    event.preventDefault()
    event.stopPropagation()
  }
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeAllMenus = () => {
  isMobileMenuOpen.value = false
  isDropdownOpen.value = false
}

const handleClickOutside = (event) => {
  const dropdown = event.target.closest('.dropdown')
  const toggler = event.target.closest('.navbar-toggler')
  const bottomNav = event.target.closest('.navbar-bottom')
  if (!dropdown && !toggler && !bottomNav && (isMobileMenuOpen.value || isDropdownOpen.value)) {
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

      <div class="navbar-right" v-show="!isMobile || !isMobileMenuOpen">
        <div class="dropdown" :class="{ 'open': isDropdownOpen }">
          <button 
            class="user-dropdown-btn" 
            type="button" 
            @click="toggleDropdown"
            :aria-expanded="isDropdownOpen"
            :aria-label="isDropdownOpen ? 'Close user menu' : 'Open user menu'"
            id="userDropdown"
          >
            <div class="user-avatar">
              <i class="fas fa-user"></i>
            </div>
            <div class="user-info">
              <span class="username">Username</span>
              <i 
                class="fas fa-chevron-down dropdown-arrow" 
                :class="{ 'rotate': isDropdownOpen }"
              ></i>
            </div>
          </button>
          <transition name="dropdown">
            <ul 
              v-show="isDropdownOpen"
              class="dropdown-menu" 
              aria-labelledby="userDropdown"
            >
              <li class="dropdown-header">
                <div class="user-avatar-large">
                  <i class="fas fa-user"></i>
                </div>
                <div>
                  <div class="dropdown-username">Username</div>
                  <div class="dropdown-email"><a href="/cdn-cgi/l/email-protection#8ffafceafdcfeaf7eee2ffe3eaa1ece0e2"><span class="__cf_email__" data-cfemail="93e6e0f6e1d3f6ebf2fee3fff6bdf0fcfe">[Isi nya Email]</span></a></div>
                </div>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <router-link 
                  class="dropdown-item" 
                  to="/dashboard"
                  @click="handleNavigation('/dashboard')"
                >
                  <i class="fas fa-tachometer-alt"></i>
                  Dashboard
                </router-link>
              </li>
              <li>
                <router-link 
                  class="dropdown-item" 
                  to="/profile"
                  @click="handleNavigation('/profile')"
                >
                  <i class="fas fa-user-cog"></i>
                  Profile Settings
                </router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <router-link 
                  class="dropdown-item logout-item" 
                  to="/logout"
                  @click="handleNavigation('/logout')"
                >
                  <i class="fas fa-sign-out-alt"></i>
                  Logout
                </router-link>
              </li>
            </ul>
          </transition>
        </div>
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
              @click="handleNavigation('/')"
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
              class="nav-link dropdown-item" 
              to="/dashboard"
              @click="handleNavigation('/dashboard')"
              active-class="active"
            >
              <i class="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              class="nav-link dropdown-item" 
              to="/profile"
              @click="handleNavigation('/profile')"
              active-class="active"
            >
              <i class="fas fa-user-cog"></i>
              <span>Profile Settings</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              class="nav-link dropdown-item logout-item" 
              to="/logout"
              @click="handleNavigation('/logout')"
              active-class="active"
            >
              <i class="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1200;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--gray);
  padding: 0.75rem 0;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
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

/* Logo/Brand */
.navbar-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  z-index: 1001;
}

.logo {
  height: 60px;
  width: auto;
  transition: var(--transition);
  object-fit: contain;
}

.logo.logo-small {
  height: 50px;
}

/* Centered Navigation */
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

/* Right Side (User Dropdown) */
.navbar-right {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.user-dropdown-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: 1px solid var(--primary);
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: var(--radius);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.user-dropdown-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transition: 0.5s;
}

.user-dropdown-btn:hover::before {
  left: 100%;
}

.user-dropdown-btn:hover {
  background: var(--primary);
  color: var(--white);
  box-shadow: var(--shadow-sm);
}

.user-dropdown-btn:hover .username,
.user-dropdown-btn:hover .dropdown-arrow {
  color: var(--white);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.username {
  font-weight: 600;
  color: var(--secondary);
  font-size: 0.9rem;
  white-space: nowrap;
}

.dropdown-arrow {
  font-size: 0.8rem;
  color: var(--secondary);
  transition: var(--transition);
}

.dropdown-arrow.rotate {
  transform: rotate(180deg);
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: var(--white);
  border: 1px solid var(--gray);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  min-width: 240px;
  padding: 0.5rem 0;
  z-index: 1000;
  list-style: none; /* Remove list decoration */
}

.dropdown-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-bottom: 1px solid var(--gray);
}

.user-avatar-large {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.dropdown-username {
  font-weight: 600;
  color: var(--secondary);
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.dropdown-email {
  color: var(--secondary);
  font-size: 0.8rem;
}

.dropdown-divider {
  height: 1px;
  background-color: var(--gray);
  border: none;
  margin: 0.5rem 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--secondary);
  text-decoration: none;
  transition: var(--transition);
  font-size: 0.9rem;
  list-style: none; /* Remove list decoration for individual items */
}

.dropdown-item:hover {
  background-color: rgba(59, 130, 246, 0.1);
  color: var(--primary);
}

.dropdown-item i {
  width: 20px;
  text-align: center;
  font-size: 0.95rem;
  color: var(--secondary);
}

.dropdown-item:hover i {
  color: var(--primary);
}

.logout-item {
  color: var(--danger);
}

.logout-item:hover {
  background-color: rgba(245, 101, 101, 0.1);
}

.logout-item i {
  color: var(--danger);
}

/* Mobile Menu Toggle */
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

/* Mobile Menu */
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

.mobile-nav .dropdown-item {
  margin-top: 0.5rem;
}

.mobile-nav .logout-item {
  color: var(--danger);
  border: 1px solid var(--danger);
  background: transparent;
}

.mobile-nav .logout-item:hover,
.mobile-nav .logout-item.active {
  background: rgba(245, 101, 101, 0.1);
}

/* Bottom Navbar (Mobile Only) */
.navbar-bottom {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 0.75rem;
  z-index: 1030;
  max-width: calc(100% - 2rem);
}

.navbar-bottom-nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
  justify-content: space-around;
}

.navbar-bottom .nav-item {
  flex: 1;
  text-align: center;
}

.navbar-bottom .nav-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  padding: 0;
  border-radius: var(--radius);
  font-size: 1.4rem;
}

.navbar-bottom .logout-item {
  background: none;
  color: var(--danger);
}

.navbar-bottom .logout-item i {
  color: var(--danger);
}

/* Animations */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.bottom-nav-enter-active,
.bottom-nav-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.bottom-nav-enter-from,
.bottom-nav-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

/* Responsive Styles */
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
  
  .navbar-bottom {
    display: flex;
  }
  
  .logo {
    height: 50px;
  }
  
  .logo.logo-small {
    height: 40px;
  }
}

@media (max-width: 768px) {
  .username {
    display: none;
  }
  
  .user-dropdown-btn {
    padding: 0.5rem;
  }
  
  .navbar-bottom .nav-link {
    width: 44px;
    height: 44px;
  }
  
  .navbar-bottom .nav-link i {
    font-size: 1.3rem;
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
  
  .navbar-bottom {
    bottom: 0.5rem;
    padding: 0.5rem;
  }
  
  .navbar-bottom .nav-link {
    width: 40px;
    height: 40px;
  }
  
  .navbar-bottom .nav-link i {
    font-size: 1.2rem;
  }
}

/* Accessibility */
.nav-link:focus,
.user-dropdown-btn:focus,
.navbar-toggler:focus,
.navbar-bottom .nav-link:focus {
  outline: 3px solid var(--primary);
  outline-offset: 3px;
  border-radius: var(--radius);
}

@media (prefers-reduced-motion: reduce) {
  .navbar,
  .dropdown-menu,
  .mobile-menu,
  .navbar-bottom,
  .navbar-toggler span,
  .user-dropdown-btn::before {
    transition: none !important;
  }
}
</style>