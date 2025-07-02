<script setup>
import { ref } from 'vue'
import NavbarLogin from '../components/navbarlogin.vue'
import FooterAll from '../components/footerall.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faInstagram, faYoutube, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faNetworkWired, faUsers, faShieldAlt, faBookOpen, faGlobe, faUserTie, faAward, faGraduationCap } from '@fortawesome/free-solid-svg-icons'

// Import banner image
import bannerImage from '../assets/bgabout.png';

const socialLinks = ref([
  { name: 'Instagram', url: 'https://instagram.com/raflesiait', icon: faInstagram },
  { name: 'Email', url: 'mailto:raflesiait@gmail.com', icon: faEnvelope },
  { name: 'YouTube', url: 'https://www.youtube.com/@raflesiait-cyber-securtiy', icon: faYoutube },
  { name: 'GitHub', url: 'https://github.com/raflesiait', icon: faGithub },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/raflesiait', icon: faLinkedin }
])

const benefits = ref([
  {
    title: "Jaringan Profesional",
    description: "Terhubung dengan profesional dari berbagai industri untuk kolaborasi dan peluang kerja.",
    icon: faNetworkWired
  },
  {
    title: "Komunitas Aktif",
    description: "Bergabung dengan komunitas yang suportif untuk berbagi pengetahuan dan pengalaman.",
    icon: faUsers
  },
  {
    title: "Pelatihan Keamanan",
    description: "Akses pelatihan dan workshop cyber security untuk meningkatkan keterampilan.",
    icon: faShieldAlt
  },
  {
    title: "Sumber Belajar",
    description: "Dapatkan materi pembelajaran terbaru tentang keamanan siber.",
    icon: faBookOpen
  },
  {
    title: "Jangkauan Global",
    description: "Kesempatan untuk berkontribusi pada proyek keamanan siber berskala internasional.",
    icon: faGlobe
  }
])

const profileItems = ref([
  {
    title: "Nama Komunitas",
    content: "RaflesiaIT",
    icon: faUsers
  },
  {
    title: "Fokus",
    content: "Cyber Security - Red & Blue Team",
    icon: faShieldAlt
  },
  {
    title: "Tahun Berdiri",
    content: "2024",
    icon: faBookOpen
  },
  {
    title: "Asal",
    content: "Bengkulu, Indonesia",
    icon: faGlobe
  }
])

const founderProfile = ref({
  name: "Isriade Putra, S.Kom., M.Kom.",
  position: "Pendiri & Ketua Komunitas",
  bio: "Lulusan Magister Informatika UII Yogyakarta dengan konsentrasi Cyber Security dan Forensik Digital. Memiliki pengalaman lebih dari 5 tahun di bidang keamanan informasi dan jaringan komputer.",
  education: [
    "S2 Magister Informatika - Universitas Islam Indonesia",
    "S1 Sistem Informasi - Universitas Bengkulu"
  ],
  certifications: [
    "Certified Ethical Hacker (CEH)",
    "Certified Information Systems Security Professional (CISSP)",
    "Offensive Security Certified Professional (OSCP)"
  ],
})

const vision = ref("Menjadi komunitas unggulan dan pusat edukasi dunia cyber security di Indonesia yang inklusif, aktif, dan berdampak nyata — dimulai dari daerah, menembus skala nasional dan global.")

const missionItems = ref([
  "Menyediakan ruang belajar terbuka untuk siapa pun yang ingin mendalami dunia keamanan siber.",
  "Meningkatkan literasi dan keterampilan praktis dalam bidang cyber security.",
  "Menyelenggarakan pelatihan, webinar, workshop, dan CTF untuk semua kalangan.",
  "Menjadi jembatan antara talenta IT lokal dengan kebutuhan industri nasional.",
  "Membangun ekosistem cyber talent yang solid dan berkelanjutan."
])

const historyItems = ref([
  {
    year: "2024",
    description: "Komunitas RaflesiaIT didirikan oleh Isriade Putra, S.Kom., M.Kom. setelah menyelesaikan studi S2 Magister Informatika di UII Yogyakarta dengan konsentrasi Cyber Security dan Forensik Digital."
  },
  {
    year: "11 November 2024",
    description: "Komunitas secara resmi berfokus pada Cyber Security (Red Team & Blue Team) setelah sebelumnya bersifat general IT."
  },
  {
    year: "Masa Depan",
    description: "Berkembang menjadi pusat edukasi cyber security terkemuka di Indonesia, menghasilkan talenta-talenta keamanan siber yang kompeten."
  }
])

const memberTypes = ref([
  "Siswa & Mahasiswa",
  "Fresh Graduate",
  "Profesional Muda",
  "Semua Kalangan"
])
</script>

<template>
  <NavbarLogin />
  <div class="about-page">
    <!-- Hero Section with Image Banner -->
    <header class="hero-section">
      <div class="hero-image-container">
        <img :src="bannerImage" alt="Cyber Security Community" class="hero-image" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">Tentang <span>RaflesiaIT</span></h1>
        <p class="hero-subtitle">Komunitas Cyber Security Indonesia</p>
        <p class="hero-motto">"Menyerang dan Bertahan untuk Melindungi"</p>
  <div class="social-container">
  <div class="social-links">
    <a 
      v-for="(link, index) in socialLinks" 
      :key="index" 
      :href="link.url" 
      target="_blank" 
      rel="noopener noreferrer"
      class="social-link"
      :class="'social-' + link.name.toLowerCase()"
    >
      <FontAwesomeIcon :icon="link.icon" class="social-icon" />
      <span class="social-text">{{ link.name }}</span>
    </a>
  </div>
</div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Community Profile Section -->
      <section class="section profile-section">
        <div class="section-header">
          <h2 class="section-title">Profil Komunitas</h2>
          <p class="section-description">Mengenal lebih dekat tentang RaflesiaIT</p>
        </div>
        <div class="profile-grid">
          <div class="profile-item" v-for="(item, index) in profileItems" :key="index">
            <div class="profile-item-icon">
              <FontAwesomeIcon :icon="item.icon" />
            </div>
            <h3 class="profile-item-title">{{ item.title }}</h3>
            <p class="profile-item-content">{{ item.content }}</p>
          </div>
        </div>
      </section>

      <!-- Founder Profile Section -->
      <section class="section founder-section">
        <div class="section-header">
          <h2 class="section-title">Pendiri Komunitas</h2>
          <p class="section-description">Profil pendiri RaflesiaIT</p>
        </div>
        <div class="founder-container">
          <div class="founder-photo">
            <img src="../assets/isriadeputra.jpg" class="founder-img">
            <div class="founder-badge">
              <FontAwesomeIcon :icon="faUserTie" />
              <span>Founder</span>
            </div>
          </div>
          <div class="founder-details">
            <h3 class="founder-name">{{ founderProfile.name }}</h3>
            <p class="founder-position">{{ founderProfile.position }}</p>
            <p class="founder-bio">{{ founderProfile.bio }}</p>
            
            <div class="founder-info">
              <div class="info-card">
                <div class="info-icon">
                  <FontAwesomeIcon :icon="faGraduationCap" />
                </div>
                <div class="info-content">
                  <h4>Pendidikan</h4>
                  <ul>
                    <li v-for="(edu, index) in founderProfile.education" :key="'edu'+index">{{ edu }}</li>
                  </ul>
                </div>
              </div>
              
              <div class="info-card">
                <div class="info-icon">
                  <FontAwesomeIcon :icon="faAward" />
                </div>
                <div class="info-content">
                  <h4>Sertifikasi</h4>
                  <ul>
                    <li v-for="(cert, index) in founderProfile.certifications" :key="'cert'+index">{{ cert }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Vision & Mission Section -->
      <section class="section vision-mission-section">
        <div class="section-header">
          <h2 class="section-title">Visi & Misi</h2>
          <p class="section-description">Arah dan tujuan komunitas kami</p>
        </div>
        <div class="vision-mission-grid">
          <div class="vision-card">
            <div class="vision-icon">
              <FontAwesomeIcon :icon="faGlobe" />
            </div>
            <h3>Visi Kami</h3>
            <p>{{ vision }}</p>
          </div>
          <div class="mission-card">
            <div class="mission-icon">
              <FontAwesomeIcon :icon="faShieldAlt" />
            </div>
            <h3>Misi Kami</h3>
            <ul class="mission-list">
              <li v-for="(item, index) in missionItems" :key="index">
                <FontAwesomeIcon :icon="faBookOpen" class="mission-bullet" />
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- History Section -->
      <section class="section history-section">
        <div class="section-header">
          <h2 class="section-title">Sejarah Kami</h2>
          <p class="section-description">Perjalanan RaflesiaIT dari awal hingga sekarang</p>
        </div>
        <div class="timeline">
          <div class="timeline-item" v-for="(item, index) in historyItems" :key="index">
            <div class="timeline-year">{{ item.year }}</div>
            <div class="timeline-content">
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Membership Section -->
      <section class="section membership-section">
        <div class="section-header">
          <h2 class="section-title">Keanggotaan</h2>
          <p class="section-description">Komunitas ini terbuka untuk semua kalangan yang tertarik pada dunia cyber security</p>
        </div>
        <div class="member-grid">
          <div class="member-type" v-for="(type, index) in memberTypes" :key="index">
            {{ type }}
          </div>
        </div>
      </section>

      <!-- Benefits Section -->
      <section class="section benefits-section">
        <div class="section-header">
          <h2 class="section-title">Keuntungan Bergabung</h2>
          <p class="section-description">Apa yang akan Anda dapatkan sebagai anggota RaflesiaIT</p>
        </div>
        <div class="benefits-grid">
          <div class="benefit-card" v-for="(benefit, index) in benefits" :key="index">
            <div class="benefit-icon-wrapper">
              <FontAwesomeIcon :icon="benefit.icon" class="benefit-icon" />
            </div>
            <h3>{{ benefit.title }}</h3>
            <p>{{ benefit.description }}</p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>Siap Bergabung dengan Komunitas Kami?</h2>
          <p>Jadilah bagian dari perjalanan kami dalam membangun ekosistem cyber security yang lebih kuat di Indonesia.</p>
          <router-link to="/register" class="cta-button">Daftar Sekarang</router-link>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <FooterAll />
  </div>
</template>

<style scoped>

h2 {
  color: white;
}

.about-page {
  margin-top: 170px;
  background-color: #ffffff;
  color: #333333;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
}

/* Hero Section with Image Banner */
.hero-section {
  position: relative;
  height: 500px;
  overflow: hidden;
}

.hero-image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 1.5rem;
  color: white;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-title span {
  color: #4a6cf7;
}

.hero-subtitle {
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.hero-motto {
  font-style: italic;
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  position: relative;
  display: inline-block;
  padding: 0 1rem;
}

.hero-motto::before,
.hero-motto::after {
  content: '"';
  position: absolute;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.5rem;
}

.hero-motto::before {
  left: -10px;
  top: -5px;
}

.hero-motto::after {
  right: -10px;
  bottom: -15px;
}

.social-container {
  width: 100%;
  max-width: 800px;
  margin-top: 2.5rem;
  padding: 0 1rem;
}

.social-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem; /* Meningkatkan gap antara item */
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 1rem 1.8rem; /* Sedikit lebih besar padding */
  border-radius: 50px;
  color: white;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  font-size: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0.1rem; /* Tambahkan margin untuk spacing ekstra */
  min-width: 140px; /* Lebar minimum yang konsisten */
  justify-content: center; /* Pusatkan konten */
}

.social-link:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.social-icon {
  font-size: 1.3rem; /* Sedikit lebih besar */
  width: 24px; /* Lebar tetap untuk alignment */
  text-align: center;
  transition: transform 0.3s ease;
}

.social-link:hover .social-icon {
  transform: scale(1.2);
}

.social-text {
  font-weight: 500;
  letter-spacing: 0.3px;
}

/* Warna khusus untuk setiap social media */
.social-instagram:hover {
  background-color: #E1306C;
  border-color: #E1306C;
}

.social-email:hover {
  background-color: #D44638;
  border-color: #D44638;
}

.social-youtube:hover {
  background-color: #FF0000;
  border-color: #FF0000;
}

.social-github:hover {
  background-color: #333;
  border-color: #333;
}

.social-linkedin:hover {
  background-color: #0077B5;
  border-color: #0077B5;
}

/* Responsive */
@media (max-width: 768px) {
  .social-links {
    gap: 1.2rem;
  }
  
  .social-link {
    padding: 0.9rem 1.5rem;
    font-size: 0.95rem;
    min-width: 120px;
  }
  
  .social-icon {
    font-size: 1.2rem;
  }
}

@media (max-width: 600px) {
  .social-links {
    gap: 1rem;
  }
  
  .social-link {
    padding: 0.8rem 1.2rem;
    min-width: 110px;
  }
}

/* Main Content */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
}

/* Section Styles */
.section {
  margin-bottom: 5rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2a3f9d;
  margin-bottom: 0.8rem;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background-color: #4a6cf7;
  border-radius: 2px;
}

.section-description {
  font-size: 1.2rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Profile Section */
.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.profile-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #eaeaea;
}

.profile-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border-color: #4a6cf7;
}

.profile-item-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  background-color: rgba(74, 108, 247, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a6cf7;
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.profile-item:hover .profile-item-icon {
  background-color: #4a6cf7;
  color: white;
}

.profile-item-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #4a6cf7;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.profile-item-content {
  font-size: 1.1rem;
  color: #444;
  line-height: 1.6;
}

/* Founder Section */
.founder-section {
  background-color: #f8f9ff;
  padding: 4rem 1.5rem;
  border-radius: 16px;
  margin: 4rem 0;
}

.founder-container {
  display: flex;
  gap: 3rem;
  max-width: 1100px;
  margin: 0 auto;
  align-items: center;
}

.founder-photo {
  position: relative;
  flex: 0 0 350px;
}

.founder-img {
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  aspect-ratio: 1/1;
  object-fit: cover;
  transition: all 0.3s ease;
}

.founder-img:hover {
  transform: scale(1.02);
}

.founder-badge {
  position: absolute;
  bottom: -20px;
  right: -20px;
  background: linear-gradient(135deg, #4a6cf7 0%, #2a3f9d 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  font-size: 1.1rem;
}

.founder-details {
  flex: 1;
}

.founder-name {
  font-size: 2rem;
  color: #2a3f9d;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.founder-position {
  font-size: 1.2rem;
  color: #4a6cf7;
  font-weight: 500;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.founder-position::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 50px;
  height: 3px;
  background-color: #4a6cf7;
}

.founder-bio {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #555;
}

.founder-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.info-card {
  background-color: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid #eaeaea;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  border-color: #4a6cf7;
}

.info-icon {
  width: 50px;
  height: 50px;
  background-color: rgba(74, 108, 247, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a6cf7;
  font-size: 1.3rem;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.info-card:hover .info-icon {
  background-color: #4a6cf7;
  color: white;
}

.info-content h4 {
  font-size: 1.2rem;
  color: #2a3f9d;
  margin-bottom: 1rem;
  font-weight: 600;
}

.info-content ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.info-content li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.8rem;
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
}

.info-content li:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #4a6cf7;
  font-size: 1.5rem;
  line-height: 1;
}

/* Vision & Mission Section */
.vision-mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

@media (max-width: 768px) {
  .vision-mission-grid {
    grid-template-columns: 1fr;
  }
}

.vision-card, .mission-card {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #eaeaea;
}

.vision-card:hover, .mission-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.vision-card {
  border-top: 5px solid #4a6cf7;
}

.mission-card {
  border-top: 5px solid #2a3f9d;
}

.vision-icon, .mission-icon {
  font-size: 2.5rem;
  color: #4a6cf7;
  margin-bottom: 1.5rem;
  opacity: 0.8;
}

.mission-icon {
  color: #2a3f9d;
}

.vision-card h3, .mission-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #2a3f9d;
  font-weight: 700;
}

.vision-card p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
}

.mission-list {
  list-style: none;
  padding-left: 0;
}

.mission-list li {
  position: relative;
  padding-left: 2.5rem;
  margin-bottom: 1.2rem;
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
}

.mission-bullet {
  position: absolute;
  left: 0;
  top: 0.3rem;
  color: #4a6cf7;
  font-size: 1.2rem;
}

/* History Section */
.timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding-left: 3rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #4a6cf7, #2a3f9d);
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  padding-left: 3rem;
}

.timeline-year {
  position: absolute;
  left: -2.9rem;
  top: 0;
  transform: translateX(-50%);
  background-color: #4a6cf7;
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 5px 15px rgba(74, 108, 247, 0.3);
  min-width: 80px;
  text-align: center;
}

.timeline-content {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #4a6cf7;
  transition: all 0.3s ease;
}

.timeline-content:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.timeline-content p {
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
}

/* Membership Section */
.member-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem 0;
}

.member-type {
  background: linear-gradient(135deg, #4a6cf7 0%, #2a3f9d 100%);
  color: white;
  padding: 1.2rem 2.6rem;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(74, 108, 247, 0.2);
  min-width: 220px;
  font-size: 1.1rem;
}

.member-type:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(74, 108, 247, 0.3);
}

/* Benefits Section */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  max-width: 1000px;
  margin: 0 auto;
  justify-content: center;
}

.benefit-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
  text-align: center;
  border: 1px solid #eaeaea;
  transition: all 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border-color: #4a6cf7;
}

.benefit-icon-wrapper {
  width: 70px;
  height: 70px;
  margin: 0 auto 1.5rem;
  background-color: rgba(74, 108, 247, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.benefit-card:hover .benefit-icon-wrapper {
  background-color: #4a6cf7;
}

.benefit-icon {
  color: #4a6cf7;
  font-size: 1.8rem;
  transition: all 0.3s ease;
}

.benefit-card:hover .benefit-icon {
  color: white;
}

.benefit-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #2a3f9d;
}

.benefit-card p {
  font-size: 1.05rem;
  color: #666;
  line-height: 1.7;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #4a6cf7 0%, #2a3f9d 100%);
  color: white;
  padding: 5rem 2rem;
  border-radius: 16px;
  text-align: center;
  margin-top: 5rem;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.3;
}

.cta-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.cta-section p {
  font-size: 1.3rem;
  max-width: 600px;
  margin: 0 auto 3rem;
  opacity: 0.9;
  line-height: 1.7;
}

.cta-button {
  display: inline-block;
  padding: 1rem 3rem;
  background-color: white;
  color: #4a6cf7;
  font-weight: 600;
  text-decoration: none;
  border-radius: 50px;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  border: 2px solid white;
}

.cta-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  background-color: transparent;
  color: white;
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .founder-container {
    flex-direction: column;
  }
  
  .founder-photo {
    flex: 0 0 auto;
    max-width: 450px;
    width: 100%;
  }
  
  .hero-title {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 450px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .founder-info {
    grid-template-columns: 1fr;
  }
  
  .founder-name {
    font-size: 1.8rem;
  }
  
  .cta-section h2 {
    font-size: 2rem;
  }
  
  .cta-section p {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 400px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-motto {
    font-size: 1.1rem;
  }
  
      .social-container {
    margin-top: 2rem;
  }
  
  .social-links {
    gap: 0.8rem;
  }
  
  .social-link {
    padding: 0.7rem 1rem;
    font-size: 0.85rem;
    min-width: auto;
    flex: 1 1 calc(50% - 1rem); /* Dua kolom di mobile */
    max-width: calc(50% - 1rem);
  }
  
  .social-icon {
    font-size: 1.1rem;
  }

  
  .founder-badge {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    bottom: -15px;
    right: -15px;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .member-type {
    min-width: 100%;
  }
  
  .cta-section {
    padding: 3rem 1.5rem;
  }
  
  .cta-section h2 {
    font-size: 1.8rem;
  }
  
  .cta-button {
    padding: 0.8rem 2rem;
    font-size: 1.1rem;
  }
}

@media (max-width: 360px) {
  .social-link {
    flex: 1 1 100%; /* Satu kolom di layar sangat kecil */
    max-width: 100%;
    justify-content: center;
  }
}

</style>