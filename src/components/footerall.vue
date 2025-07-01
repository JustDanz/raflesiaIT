<script setup>
import { ref } from 'vue'

const email = ref('')
const privacyAgreed = ref(false)
const currentYear = new Date().getFullYear()

const handleSubmit = () => {
  if (privacyAgreed.value && email.value) {
    // Simulate API call with loading state
    const button = document.querySelector('.newsletter-button')
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'
    button.disabled = true
    
    setTimeout(() => {
      console.log('Newsletter subscription submitted:', email.value)
      // Show success animation
      button.innerHTML = '<i class="fas fa-check"></i>'
      setTimeout(() => {
        button.innerHTML = '<i class="fas fa-paper-plane"></i>'
        button.disabled = false
        email.value = ''
        privacyAgreed.value = false
      }, 1000)
    }, 1500)
  } else {
    // Add shake animation for invalid form
    const form = document.querySelector('.newsletter-form')
    form.classList.add('shake')
    setTimeout(() => form.classList.remove('shake'), 500)
  }
}
</script>

<template>
  <footer class="footer-modern">
    <!-- Floating decorative elements -->
    <div class="footer-decoration">
      <div class="deco-circle deco-1"></div>
      <div class="deco-circle deco-2"></div>
      <div class="deco-circle deco-3"></div>
    </div>
    
    <div class="container">
      <div class="row g-4">
        <!-- About Section -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="footer-section">
            <div class="section-header">
              <h5 class="section-title">
                <span class="title-highlight">Tentang</span> RaflesiaIT
              </h5>
            </div>
            <p class="section-description">
              Komunitas IT yang berfokus pada pengembangan skill dan pengetahuan teknologi informasi melalui course, blog, dan event yang berkualitas tinggi.
            </p>
            <div class="social-container">
              <div class="social-label">Ikuti Kami:</div>
              <div class="social-icons">
                <a href="#" class="social-link facebook" title="Facebook" aria-label="Facebook">
                  <i class="fab fa-facebook-f"></i>
                  <span class="social-tooltip">Facebook</span>
                </a>
                <a href="#" class="social-link instagram" title="Instagram" aria-label="Instagram">
                  <i class="fab fa-instagram"></i>
                  <span class="social-tooltip">Instagram</span>
                </a>
                <a href="#" class="social-link youtube" title="YouTube" aria-label="YouTube">
                  <i class="fab fa-youtube"></i>
                  <span class="social-tooltip">YouTube</span>
                </a>
                <a href="#" class="social-link linkedin" title="LinkedIn" aria-label="LinkedIn">
                  <i class="fab fa-linkedin-in"></i>
                  <span class="social-tooltip">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Section -->
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="footer-section">
            <div class="section-header">
              <h5 class="section-title">
                <span class="title-highlight">Hubungi</span> Kami
              </h5>
            </div>
            <ul class="contact-list">
              <li class="contact-item">
                <div class="contact-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="contact-info">
                  <a href="/cdn-cgi/l/email-protection#90f9fef6ffd0e2f1f6fcf5e3f9f1f9e4bef3fffd" class="contact-link">
                    <span class="contact-label">Email</span>
                    <span class="contact-value"><span class="__cf_email__" data-cfemail="d0f9fef6ffd0e2f1f6fcf5e3f9f1f9e4bef3fffd">[email&#160;protected]</span></span>
                  </a>
                </div>
              </li>
              <li class="contact-item">
                <div class="contact-icon">
                  <i class="fas fa-phone-alt"></i>
                </div>
                <div class="contact-info">
                  <a href="tel:+6281234567890" class="contact-link">
                    <span class="contact-label">Telepon</span>
                    <span class="contact-value">+62 812 3456 7890</span>
                  </a>
                </div>
              </li>
              <li class="contact-item">
                <div class="contact-icon">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="contact-info">
                  <div class="contact-link">
                    <span class="contact-label">Alamat</span>
                    <span class="contact-value">Jl. Teknologi No. 123<br>Jakarta, Indonesia</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Newsletter Section -->
        <div class="col-lg-3 col-md-12 mb-4">
          <div class="footer-section">
            <div class="section-header">
              <h5 class="section-title">
                <span class="title-highlight">News</span>letter
              </h5>
            </div>
            <p class="section-description">
              Dapatkan update terbaru tentang course, event, dan artikel teknologi langsung ke inbox Anda.
            </p>
            <form class="newsletter-form" @submit.prevent="handleSubmit">
              <div class="form-group">
                <div class="input-wrapper">
                  <input
                    v-model="email"
                    type="email"
                    class="newsletter-input"
                    placeholder="Masukkan email Anda"
                    required
                    aria-label="Email untuk newsletter"
                  />
                  <button
                    type="submit"
                    class="newsletter-button"
                    :disabled="!email || !privacyAgreed"
                    aria-label="Berlangganan newsletter"
                  >
                    <i class="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
              <div class="privacy-check">
                <label class="checkbox-container">
                  <input
                    v-model="privacyAgreed"
                    type="checkbox"
                    required
                    id="privacy-checkbox"
                  />
                  <span class="checkmark"></span>
                  <span class="checkbox-text">Saya setuju dengan 
                    <a href="#" class="privacy-link" aria-label="Kebijakan privasi">kebijakan privasi</a>
                  </span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Decorative Wave -->
      <div class="wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,120 L0,120 Z" fill="rgba(125, 201, 255, 0.1)"/>
        </svg>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p class="copyright">
              © {{ currentYear }} RaflesiaIT Community. 
            </p>
          </div>
          <div class="col-md-6 text-center text-md-end">
            <ul class="footer-legal">
              <li><a href="#" class="legal-link" aria-label="Terms of Service">Terms of Service</a></li>
              <li><span class="divider">•</span></li>
              <li><a href="#" class="legal-link" aria-label="Privacy Policy">Privacy Policy</a></li>
              <li><span class="divider">•</span></li>
              <li><a href="#" class="legal-link" aria-label="Sitemap">Sitemap</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Base Styles */
.footer-modern {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #e2e8f0;
  padding: 5rem 0 2rem;
  position: relative;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  width: 100%;
  margin: 0;
}

.footer-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.deco-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.15;
}

.deco-1 {
  width: 300px;
  height: 300px;
  background: #7dc9ff;
  top: -100px;
  left: -100px;
}

.deco-2 {
  width: 400px;
  height: 400px;
  background: #6c63ff;
  bottom: -150px;
  right: -150px;
}

.deco-3 {
  width: 200px;
  height: 200px;
  background: #ff6b6b;
  top: 30%;
  right: 20%;
}

.container {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 0;
  margin: 0;
}

.footer-section {
  height: 100%;
  padding: 1.5rem;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(125, 201, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.footer-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(125, 201, 255, 0.2);
}

.section-header {
  margin-bottom: 1.75rem;
  position: relative;
}

.section-title {
  color: #f8fafc;
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  letter-spacing: 0.5px;
}

.title-highlight {
  color: #7dc9ff;
  font-weight: 800;
}

.section-description {
  color: #94a3b8;
  line-height: 1.7;
  margin-bottom: 1.75rem;
  font-size: 0.95rem;
}

/* Social Media Styles */
.social-container {
  margin-top: 2.5rem;
}

.social-label {
  color: #94a3b8;
  font-size: 0.9rem;
  margin-bottom: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.social-icons {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(125, 201, 255, 0.08);
  color: #7dc9ff;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(125, 201, 255, 0.15);
  position: relative;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(125, 201, 255, 0.2), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-link:hover::before {
  opacity: 1;
}

.social-link i {
  font-size: 1.1rem;
  position: relative;
  z-index: 1;
}

.social-tooltip {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  white-space: nowrap;
  border: 1px solid rgba(125, 201, 255, 0.2);
}

.social-link:hover .social-tooltip {
  opacity: 1;
  visibility: visible;
  bottom: -40px;
}

.social-link:hover {
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 10px 25px rgba(125, 201, 255, 0.2);
}

.social-link.facebook:hover { color: #1877f2; border-color: rgba(24, 119, 242, 0.3); }
.social-link.instagram:hover { color: #e4405f; border-color: rgba(228, 64, 95, 0.3); }
.social-link.youtube:hover { color: #ff0000; border-color: rgba(255, 0, 0, 0.3); }
.social-link.linkedin:hover { color: #0a66c2; border-color: rgba(10, 102, 194, 0.3); }

/* Contact Styles */
.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  background: rgba(30, 41, 59, 0.6);
  border-radius: 14px;
  border: 1px solid rgba(125, 201, 255, 0.1);
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: rgba(125, 201, 255, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.contact-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #7dc9ff, #6c63ff);
  border-radius: 12px;
  margin-right: 1.25rem;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(125, 201, 255, 0.3);
}

.contact-icon i {
  color: white;
  font-size: 1.2rem;
}

.contact-info {
  flex-grow: 1;
}

.contact-link {
  display: flex;
  flex-direction: column;
  color: #cbd5e0;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-label {
  font-size: 0.75rem;
  color: #7dc9ff;
  margin-bottom: 0.25rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.contact-value {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #e2e8f0;
}

.contact-link:hover .contact-value {
  color: #7dc9ff;
}

/* Newsletter Styles */
.newsletter-form {
  margin-top: 1.75rem;
  position: relative;
}

.form-group {
  margin-bottom: 1.25rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 14px;
  border: 1px solid rgba(125, 201, 255, 0.2);
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.input-wrapper:focus-within {
  border-color: #7dc9ff;
  box-shadow: 0 0 0 3px rgba(125, 201, 255, 0.1);
}

.newsletter-input {
  flex: 1;
  padding: 1.1rem 1.5rem;
  background: transparent;
  border: none;
  color: #f8fafc;
  font-size: 1rem;
  outline: none;
  font-family: inherit;
}

.newsletter-input::placeholder {
  color: #94a3b8;
  opacity: 0.7;
}

.newsletter-button {
  padding: 0 1.75rem;
  background: linear-gradient(135deg, #7dc9ff, #6c63ff);
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
}

.newsletter-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #6c63ff, #7dc9ff);
  transform: scale(1.05);
}

.newsletter-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Custom Checkbox */
.privacy-check {
  margin-top: 1.25rem;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1.6;
  position: relative;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  width: 22px;
  height: 22px;
  background: rgba(30, 41, 59, 0.8);
  border: 2px solid rgba(125, 201, 255, 0.3);
  border-radius: 6px;
  margin-right: 0.85rem;
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 2px;
}

.checkbox-container:hover .checkmark {
  border-color: rgba(125, 201, 255, 0.5);
}

.checkbox-container input:checked + .checkmark {
  background: linear-gradient(135deg, #7dc9ff, #6c63ff);
  border-color: transparent;
}

.checkbox-container input:checked + .checkmark::after {
  content: '\f00c';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  position: absolute;
  left: 4px;
  top: 2px;
  font-size: 0.8rem;
  color: white;
}

.checkbox-text {
  color: #94a3b8;
  font-size: 0.85rem;
}

.privacy-link {
  color: #7dc9ff;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.privacy-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.3s ease;
}

.privacy-link:hover::after {
  width: 100%;
}

/* Wave Divider */
.wave-divider {
  position: relative;
  height: 80px;
  margin: 3rem 0 2rem;
  overflow: hidden;
}

.wave-divider svg {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  left: 0;
}

/* Footer Bottom */
.footer-bottom {
  padding-top: 2.5rem;
  border-top: 1px solid rgba(125, 201, 255, 0.1);
  position: relative;
}

.copyright {
  color: #64748b;
  margin: 0;
  font-size: 0.9rem;
  letter-spacing: 0.3px;
}

.footer-legal {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.legal-link {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.3s ease;
  position: relative;
}

.legal-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.3s ease;
}

.legal-link:hover {
  color: #7dc9ff;
}

.legal-link:hover::after {
  width: 100%;
}

.divider {
  color: #475569;
  font-size: 0.9rem;
}

/* Animations */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
}

.shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

/* Responsive Design */
@media (max-width: 1199.98px) {
  .footer-section {
    padding: 1.25rem;
  }
}

@media (max-width: 991.98px) {
  .footer-modern {
    padding: 4rem 0 2rem;
  }
  
  .footer-section {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1.5rem;
  }
  
  .social-icons {
    justify-content: center;
  }
  
  .contact-item {
    text-align: left;
  }
}

@media (max-width: 767.98px) {
  .footer-modern {
    padding: 3rem 0 1.5rem;
  }
  
  .section-title {
    font-size: 1.2rem;
  }
  
  .social-icons {
    gap: 1rem;
  }
  
  .social-link {
    width: 44px;
    height: 44px;
  }
  
  .footer-legal {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .divider {
    display: none;
  }
  
  .wave-divider {
    height: 60px;
    margin: 2rem 0 1.5rem;
  }
  
  .footer-bottom {
    padding-top: 1.5rem;
  }
  
  .copyright, .footer-legal {
    font-size: 0.85rem;
  }
  
  .contact-item {
    padding: 1rem;
  }
  
  .contact-icon {
    width: 40px;
    height: 40px;
  }
  
  .contact-icon i {
    font-size: 1.1rem;
  }
  
  .newsletter-input {
    padding: 1rem 1.25rem;
    font-size: 0.95rem;
  }
  
  .newsletter-button {
    padding: 0 1.5rem;
    min-width: 50px;
  }
}

@media (max-width: 575.98px) {
  .footer-modern {
    padding: 2.5rem 0 1rem;
  }
  
  .container {
    padding-left: 0;
    padding-right: 0;
  }
  
  .footer-section {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .section-title {
    font-size: 1.1rem;
  }
  
  .section-description {
    font-size: 0.9rem;
  }
  
  .social-link {
    width: 40px;
    height: 40px;
  }
  
  .social-link i {
    font-size: 1rem;
  }
  
  .contact-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .contact-icon {
    margin-right: 0;
    margin-bottom: 0.75rem;
  }
  
  .contact-value {
    font-size: 0.9rem;
  }
  
  .newsletter-input {
    padding: 0.9rem 1rem;
    font-size: 0.9rem;
  }
  
  .newsletter-button {
    padding: 0 1.25rem;
    font-size: 1rem;
    min-width: 45px;
  }
  
  .checkbox-text {
    font-size: 0.8rem;
  }
  
  .checkmark {
    width: 20px;
    height: 20px;
    margin-right: 0.75rem;
  }
  
  .wave-divider {
    height: 50px;
    margin: 1.5rem 0 1rem;
  }
  
  .footer-bottom {
    padding-top: 1rem;
  }
  
  .copyright {
    font-size: 0.8rem;
  }
  
  .legal-link {
    font-size: 0.8rem;
  }
}

/* Accessibility */
.social-link:focus,
.contact-link:focus,
.newsletter-button:focus,
.privacy-link:focus,
.legal-link:focus {
  outline: 3px solid #7dc9ff;
  outline-offset: 3px;
  border-radius: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .footer-section,
  .social-link,
  .contact-item,
  .newsletter-button,
  .privacy-link,
  .legal-link {
    transition: none;
  }
  
  .shake {
    animation: none;
  }
}
</style>