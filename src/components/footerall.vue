<template>
  <footer class="enhanced-footer">
    
    <div class="container">
      <div class="footer-content">
        <div class="footer-item">
          <div class="footer-logo">
            <img src="../assets/raflesiait.png" alt="RaflesialT Logo" class="logo-img">
          </div>
          <p class="item-description">
            Komunitas IT yang berfokus pada pengembangan skill dan pengetahuan teknologi informasi melalui course, blog, dan event yang berkualitas tinggi.
          </p>
          <div class="social-icons">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url" 
              :class="['social-link', social.name.toLowerCase()]" 
              :title="social.name"
              @click="handleSocialClick($event, social.url)"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>

        <div class="footer-item">
          <h3 class="item-title">
            <span class="title-icon">
              <i class="fas fa-link"></i>
            </span>
            Quick Links
          </h3>
          <ul class="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Courses</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div class="footer-item">
          <h3 class="item-title">
            <span class="title-icon">
              <i class="fas fa-phone-alt"></i>
            </span>
            Hubungi Kami
          </h3>
          <div class="contact-item">
            <div class="contact-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <div class="contact-details">
              <a :href="`mailto:${contactInfo.email}`" class="contact-value">
                {{ contactInfo.email }}
              </a>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <i class="fas fa-phone"></i>
            </div>
            <div class="contact-details">
              <a :href="`tel:${contactInfo.phone.replace(/\s/g, '')}`" class="contact-value">
                {{ contactInfo.phone }}
              </a>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="contact-details">
              <span class="contact-value">
                {{ contactInfo.address.street }}<br>
                {{ contactInfo.address.city }}
              </span>
            </div>
          </div>
        </div>

        <div class="footer-item newsletter">
          <h3 class="item-title">
            <span class="title-icon">
              <i class="fas fa-paper-plane"></i>
            </span>
            Newsletter
          </h3>
          <p class="newsletter-description">
            Daftar untuk mendapatkan informasi terbaru tentang course dan event kami.
          </p>
          <form class="newsletter-form">
            <input type="email" placeholder="Alamat Email Anda" required>
            <button type="submit">
              <i class="fas fa-paper-plane"></i> Daftar
            </button>
          </form>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          <i class="far fa-copyright"></i>
          <span>{{ currentYear }} {{ companyInfo.name }}. {{ companyInfo.rights }}</span>
        </p>
        <div class="footer-legal">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Reactive data
const currentYear = ref(new Date().getFullYear())

const companyInfo = ref({
  name: 'RaflesialT Community',
  rights: 'All rights reserved.'
})

const contactInfo = ref({
  email: 'email@raflesialt.com',
  phone: '+62 812 3456 7890',
  address: {
    street: 'Jl. Teknologi No. 123',
    city: 'Jakarta, Indonesia'
  }
})

const socialLinks = ref([
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/raflesiait',
    icon: 'fab fa-facebook-f'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/raflesiait/',
    icon: 'fab fa-instagram'
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@raflesiait-cyber-securtiy',
    icon: 'fab fa-youtube'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/raflesiait',
    icon: 'fab fa-linkedin-in'
  }
])

// Methods
const handleSocialClick = (event, url) => {
  event.preventDefault()
  const icon = event.currentTarget.querySelector('i')
  const originalClass = icon.className
  
  icon.className = 'fas fa-spinner fa-spin'
  
  setTimeout(() => {
    icon.className = originalClass
    console.log('Social media link clicked:', url)
    window.location.href = url
  }, 1000)
}

// Update current year on mount
onMounted(() => {
  currentYear.value = new Date().getFullYear()
})
</script>

<style scoped>
.enhanced-footer {
  background: linear-gradient(135deg, #001245 0%, #001046 50%, #00185a 100%);
  color: #ffffff;
  padding: 4rem 0 1rem;
  position: relative;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
  width: 100%;
  margin-top: 4rem;
}

.footer-wave {
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 100px;
  transform: rotate(180deg);
}

.footer-wave svg {
  width: 100%;
  height: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-item {
  padding: 1rem;
  position: relative;
}

.footer-logo {
  margin-bottom: 0.8rem;
}

.logo-img {
  max-width: 180px;
  height: auto;
  transition: transform 0.3s ease;
}

.logo-img:hover {
  transform: scale(1.05);
}

.item-title {
  color: #ffffff;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.item-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #22d3ee, #06b6d4);
  border-radius: 3px;
}

.title-icon {
  width: 40px;
  height: 40px;
  background: rgba(34, 211, 238, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-icon i {
  color: #22d3ee;
  font-size: 1rem;
}

.item-description {
  color: #e0f2fe;
  line-height: 1.7;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.8rem;
}

.footer-links a {
  color: #e0f2fe;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-links a::before {
  content: '\f054';
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
  font-size: 0.6rem;
  color: #22d3ee;
  transition: all 0.3s ease;
}

.footer-links a:hover {
  color: #ffffff;
  transform: translateX(5px);
}

.footer-links a:hover::before {
  color: #ffffff;
}

.contact-item {
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.8rem;
  background: rgba(34, 211, 238, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: rgba(6, 182, 212, 0.2);
  transform: translateY(-3px);
}

.contact-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #22d3ee, #06b6d4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-icon i {
  color: #ffffff;
  font-size: 1rem;
}

.contact-details {
  flex: 1;
}

.contact-value {
  color: #e0f2fe;
  text-decoration: none;
  font-size: 0.95rem;
  line-height: 1.5;
  font-weight: 400;
  transition: color 0.3s ease;
}

.contact-value:hover {
  color: #22d3ee;
}

.social-icons {
  display: flex;
  gap: 0.8rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.social-link {
  width: 40px;
  height: 40px;
  background: rgba(34, 211, 238, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.social-link:hover {
  transform: translateY(-5px);
}

.social-link i {
  color: #ffffff;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.social-link::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #22d3ee, #06b6d4);
  opacity: 0;
  transition: all 0.3s ease;
}

.social-link:hover::after {
  opacity: 1;
}

.social-link.facebook::after {
  background: #3b5998;
}

.social-link.instagram::after {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
}

.social-link.youtube::after {
  background: #ff0000;
}

.social-link.linkedin::after {
  background: #0077b5;
}

/* Newsletter Styles */
.newsletter-description {
  color: #e0f2fe;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.newsletter-form input {
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.newsletter-form input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.5);
}

.newsletter-form input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.newsletter-form button {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(45deg, #22d3ee, #06b6d4);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.newsletter-form button:hover {
  background: linear-gradient(45deg, #06b6d4, #22d3ee);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(6, 182, 212, 0.4);
}

/* Footer Bottom Styles */
.footer-bottom {
  border-top: 1px solid rgba(34, 211, 238, 0.2);
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 2rem;
}

.copyright {
  color: #e0f2fe;
  font-size: 0.9rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.copyright i {
  color: #22d3ee;
}

.footer-legal {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.footer-legal a {
  color: #e0f2fe;
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.footer-legal a:hover {
  color: #22d3ee;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}

@media (max-width: 768px) {
  .enhanced-footer {
    padding: 3rem 0 1rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr 1fr;
  }
  
  .newsletter {
    grid-column: span 2;
  }
}

@media (max-width: 576px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
  
  .newsletter {
    grid-column: span 1;
  }
  
  .footer-bottom {
    flex-direction: column;
  }
  
  .footer-legal {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Animation for page load */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.footer-item {
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.footer-item:nth-child(1) { animation-delay: 0.1s; }
.footer-item:nth-child(2) { animation-delay: 0.2s; }
.footer-item:nth-child(3) { animation-delay: 0.3s; }
.footer-item:nth-child(4) { animation-delay: 0.4s; }
</style>
