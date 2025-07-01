<script>
import { defineAsyncComponent } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLaptop, faUsers, faAward } from '@fortawesome/free-solid-svg-icons'

library.add(faLaptop, faUsers, faAward)

const NavbarAll = defineAsyncComponent(() =>
  import('../components/navbarlogin.vue').catch((error) => {
    console.error('Failed to load NavbarAll:', error)
    return import('./NotFound.vue')
  })
)
const FooterAll = defineAsyncComponent(() =>
  import('../components/footerall.vue').catch((error) => {
    console.error('Failed to load FooterAll:', error)
    return import('./NotFound.vue')
  })
)

export default {
  components: {
    NavbarAll,
    FontAwesomeIcon,
    FooterAll
  },
  data() {
    return {
      activeFaq: null,
      popularCourses: [
        {
          title: "Web Development",
          description: "Pelajari cara membangun website modern dengan HTML, CSS, dan JavaScript...",
          price: "Rp 1.500.000",
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=280&q=60"
        },
        {
          title: "Data Science",
          description: "Kuasai analisis data dengan Python, Pandas, dan Machine Learning...",
          price: "Rp 2.000.000",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=280&q=60"
        },
        {
          title: "Mobile App Development",
          description: "Bangun aplikasi mobile dengan Flutter dan Dart untuk iOS dan Android...",
          price: "Rp 1.800.000",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=280&q=60"
        }
      ],
      latestArticles: [
        {
          title: "Tips Meningkatkan Skill Coding",
          date: "Ditulis oleh Admin pada 25 Mei 2025",
          description: "Pelajari cara meningkatkan kemampuan coding Anda dengan praktik terbaik...",
          image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=280&q=60"
        },
        {
          title: "Tren Teknologi 2025",
          date: "Ditulis oleh Admin pada 20 Mei 2025",
          description: "Apa saja teknologi yang akan mendominasi di tahun 2025?...",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=280&q=60"
        },
        {
          title: "Memulai Karir di IT",
          date: "Ditulis oleh Admin pada 15 Mei 2025",
          description: "Panduan untuk memulai karir di bidang teknologi informasi...",
          image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=280&q=60"
        }
      ],
      testimonials: [
        {
          content: "Kursus web development di RaflesiaIT sangat lengkap dan mudah dipahami. Instruktur berpengalaman dan selalu siap membantu. Sekarang saya sudah bekerja sebagai full-stack developer!",
          name: "Ahmad Rizki",
          role: "Full-Stack Developer di PT. Tech Indonesia",
          image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
          content: "Materi mobile app development sangat up-to-date dengan teknologi terbaru. Komunitasnya juga aktif dan supportif. Recommended banget untuk yang mau career switch ke IT!",
          name: "Sari Dewi",
          role: "Mobile App Developer di Startup Unicorn",
          image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
          content: "Investasi terbaik untuk karir saya! Dari zero knowledge sampai bisa bikin aplikasi sendiri. Support system dari komunitas dan mentor sangat luar biasa!",
          name: "Lisa Rahmawati",
          role: "Freelance Web Developer",
          image: "https://randomuser.me/api/portraits/women/68.jpg"
        }
      ],
      faqs: [
        {
          question: 'Apakah saya perlu background IT untuk mengikuti kursus?',
          answer: 'Tidak perlu! Kami menyediakan kursus untuk berbagai level, mulai dari pemula hingga advanced.'
        },
        {
          question: 'Berapa lama waktu yang dibutuhkan untuk menyelesaikan satu kursus?',
          answer: 'Durasi kursus bervariasi, rata-rata 4-12 minggu, dengan akses seumur hidup.'
        },
        {
          question: 'Apakah tersedia sertifikat setelah menyelesaikan kursus?',
          answer: 'Ya, Anda akan mendapatkan sertifikat digital setelah menyelesaikan kursus.'
        },
        {
          question: 'Bagaimana sistem pembayaran kursus?',
          answer: 'Kami menerima transfer bank, e-wallet, dan kartu kredit, dengan opsi pembayaran sekali bayar.'
        },
        {
          question: 'Apakah ada mentor atau tutor yang membantu selama kursus?',
          answer: 'Ya, setiap kursus didampingi mentor berpengalaman dan ada komunitas untuk diskusi.'
        },
        {
          question: 'Apakah materi kursus selalu update dengan teknologi terbaru?',
          answer: 'Ya, materi kami selalu diperbarui oleh praktisi industri untuk relevansi pasar.'
        },
        {
          question: 'Bagaimana jika saya tidak puas dengan kursus yang dibeli?',
          answer: 'Kami menawarkan garansi 30 hari uang kembali, hubungi customer service untuk detail.'
        },
        {
          question: 'Apakah ada job guarantee setelah lulus kursus?',
          answer: 'Kami menyediakan career support seperti review CV dan job portal untuk alumni.'
        }
      ]
    }
  },
  methods: {
    toggleFaq(index) {
      this.activeFaq = this.activeFaq === index ? null : index
    }
  },
  mounted() {
    document.body.style.overflow = 'auto'
  }
}
</script>

<template>
  <div class="page-wrapper">
    <NavbarAll />
    
    <section class="hero-section">
      <div class="container text-center py-5">
        <h1 class="hero-title">Tingkatkan Skill IT Anda Bersama Kami</h1>
        <p class="hero-subtitle">Bergabunglah dengan komunitas IT terbaik dan akses berbagai course berkualitas untuk mengembangkan karir Anda</p>
        <div class="hero-cta">
          <router-link to="/courses" class="btn btn-primary btn-lg px-4">Lihat Course</router-link>
          <router-link to="/register" class="btn btn-outline-light btn-lg px-4">Daftar Sekarang</router-link>
        </div>
      </div>
    </section>

    <section class="features-section">
      <div class="container">
        <h2 class="section-title">Kenapa Memilih RaflesiaIT?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon"><font-awesome-icon :icon="['fas', 'laptop']" /></div>
            <h3>Course Berkualitas</h3>
            <p>Materi selalu update dengan teknologi terbaru diajarkan oleh praktisi berpengalaman</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><font-awesome-icon :icon="['fas', 'users']" /></div>
            <h3>Komunitas Aktif</h3>
            <p>Bergabung dengan ribuan anggota komunitas yang siap berbagi pengetahuan</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><font-awesome-icon :icon="['fas', 'award']" /></div>
            <h3>Sertifikat</h3>
            <p>Dapatkan sertifikat resmi setelah menyelesaikan course untuk mendukung karir Anda</p>
          </div>
        </div>
      </div>
    </section>

    <section class="courses-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Course Terpopuler</h2>
          <router-link to="/courses" class="btn btn-outline-primary">Lihat Semua Course</router-link>
        </div>
        <div class="courses-grid">
          <div class="course-card" v-for="(course, index) in popularCourses" :key="index">
            <div class="course-image">
              <img :src="course.image" :alt="course.title" loading="lazy">
            </div>
            <div class="course-body">
              <h5 class="course-title">{{ course.title }}</h5>
              <p class="course-description">{{ course.description }}</p>
              <div class="course-footer">
                <span class="course-price">{{ course.price }}</span>
                <router-link to="/course_detail" class="btn btn-sm btn-primary">Detail</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="articles-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Artikel Terbaru</h2>
          <router-link to="/blog" class="btn btn-outline-primary">Lihat Semua Artikel</router-link>
        </div>
        <div class="articles-grid">
          <div class="article-card" v-for="(article, index) in latestArticles" :key="index">
            <div class="article-image">
              <img :src="article.image" :alt="article.title" loading="lazy">
            </div>
            <div class="article-body">
              <h5 class="article-title">{{ article.title }}</h5>
              <p class="article-meta">{{ article.date }}</p>
              <p class="article-description">{{ article.description }}</p>
              <router-link to="/blog_detail" class="btn btn-sm btn-outline-primary">Baca Selengkapnya</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="testimonial-section">
      <div class="container">
        <div class="section-title-center">
          <h2>Apa Kata Mereka?</h2>
          <p class="section-subtitle">Dengarkan pengalaman dari ribuan siswa yang telah bergabung dengan RaflesiaIT Academy</p>
        </div>
        <div class="testimonials-grid">
          <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="index">
            <div class="stars">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <div class="testimonial-content">
              {{ testimonial.content }}
            </div>
            <div class="testimonial-author">
              <img :src="testimonial.image" :alt="testimonial.name" class="testimonial-avatar" loading="lazy">
              <div class="testimonial-info">
                <h5>{{ testimonial.name }}</h5>
                <small>{{ testimonial.role }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="faq-section">
      <div class="container">
        <div class="section-title-center">
          <h2>Pertanyaan Yang Sering Ditanyakan</h2>
          <p class="section-subtitle">Temukan jawaban untuk pertanyaan umum seputar kursus dan layanan kami</p>
        </div>
        <div class="faq-container">
          <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
            <button 
              class="faq-question" 
              :class="{ active: activeFaq === index }"
              @click="toggleFaq(index)"
            >
              {{ faq.question }}
            </button>
            <div 
              class="faq-answer" 
              :class="{ active: activeFaq === index }"
            >
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container text-center">
        <h2 class="cta-title">Siap Memulai Perjalanan Belajar Anda?</h2>
        <p class="cta-subtitle">Bergabunglah dengan ribuan anggota lainnya dan tingkatkan skill IT Anda sekarang juga</p>
        <div class="cta-buttons">
          <router-link to="/register" class="btn btn-primary btn-lg px-4 me-2">Daftar Sekarang</router-link>
          <router-link to="/courses" class="btn btn-outline-light btn-lg px-4">Lihat Course</router-link>
        </div>
      </div>
    </section>
    
    <FooterAll />
  </div>
</template>

<style scoped>

.page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  line-height: 1.6;
  color: var(--secondary);
  background-color: var(--light);
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  overflow-y: auto;
}

h1, h2, h3, h4, h5, h6 {
  line-height: 1.3;
  color: var(--dark);
  font-weight: 700;
}

a {
  color: var(--primary);
  text-decoration: none;
  transition: var(--transition);
}

a:hover {
  color: var(--primary-dark);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

.container {
  width: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 576px) { .container { max-width: 540px; } }
@media (min-width: 768px) { .container { max-width: 720px; } }
@media (min-width: 992px) { .container { max-width: 960px; } }
@media (min-width: 1200px) { .container { max-width: 1140px; } }
@media (min-width: 1400px) { .container { max-width: 1320px; } }

.text-center {
  text-align: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: 2px solid transparent;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: var(--radius);
  transition: var(--transition);
  touch-action: manipulation;
}

.btn-primary {
  color: var(--white);
  background-color: var(--primary);
  border-color: var(--primary);
}

.btn-primary:hover,
.btn-primary:active {
  color: var(--white);
  background-color: var(--primary-dark);
  border-color: var(--primary-dark);
  transform: scale(1.03);
  box-shadow: var(--shadow);
}

.btn-outline-primary {
  color: var(--primary);
  border-color: var(--primary);
}

.btn-outline-primary:hover,
.btn-outline-primary:active {
  color: var(--white);
  background-color: var(--primary);
  border-color: var(--primary);
  transform: scale(1.03);
  box-shadow: var(--shadow);
}

.btn-outline-light {
  color: var(--light);
  border-color: var(--light);
}

.btn-outline-light:hover,
.btn-outline-light:active {
  color: var(--dark);
  background-color: var(--light);
  border-color: var(--light);
  transform: scale(1.03);
  box-shadow: var(--shadow);
}

.btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  border-radius: var(--radius);
}

.btn-sm {
  padding: 0.3rem 0.75rem;
  font-size: 0.875rem;
  border-radius: var(--radius-sm);
}

.section-title {
  position: relative;
  margin-top: 2rem;
  padding-bottom: 0.75rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-size: clamp(1.5rem, 4.5vw, 2.2rem);
  text-align: center;
}

.section-title:after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 3.5rem;
  height: 0.2rem;
  background: linear-gradient(90deg, var(--primary), var(--primary-dark));
}

.section-title-center {
  text-align: center;
  margin-bottom: clamp(2rem, 5vw, 3rem);
}

.section-title-center h2 {
  font-size: clamp(1.5rem, 4.5vw, 2.2rem);
  font-weight: 700;
  position: relative;
  display: inline-block;
  padding-bottom: 0.75rem;
}

.section-title-center h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 3.5rem;
  height: 0.2rem;
  background: linear-gradient(90deg, var(--primary), var(--primary-dark));
}

.section-subtitle {
  font-size: clamp(0.9rem, 2.2vw, 1.1rem);
  color: var(--secondary);
  max-width: clamp(20rem, 55vw, 35rem);
  margin: 0.5rem auto 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-section {
  background-image: url('../assets/bg2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: var(--white);
  padding: clamp(3rem, 10vw, 5rem) 0;
  position: relative;
  margin-top: 70px;
  width: 100%;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

.hero-section .container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
}

.hero-title {
  color: var(--white);
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 800;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  margin-bottom: 1.5rem;
  line-height: 1.2;
  animation: fadeInUp 0.5s ease-out;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.hero-subtitle {
  font-size: clamp(1rem, 3vw, 1.5rem);
  opacity: 0.95;
  max-width: 700px;
  margin: 0 auto 2rem;
  text-shadow: 0 1px 3px rgba(0,0,0,0.2);
  animation: fadeInUp 0.5s ease-out 0.1s;
}

.hero-cta {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  animation: fadeInUp 0.5s ease-out 0.2s;
}

.hero-cta .btn {
  padding: 0.6rem 1rem;
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  min-width: 120px;
}

.features-section {
  padding: clamp(2rem, 7vw, 4rem) 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  text-align: center;
  padding: clamp(1rem, 3.5vw, 1.5rem);
  border-radius: var(--radius-lg);
  transition: var(--transition);
  background-color: var(--white);
  box-shadow: var(--shadow);
}

.feature-card:hover {
  transform: translateY(-0.3rem);
  box-shadow: var(--shadow-md);
}

.feature-icon {
  font-size: clamp(1.8rem, 4.5vw, 2.5rem);
  margin-bottom: 1rem;
  color: var(--primary);
  transition: var(--transition);
}

.feature-card:hover .feature-icon {
  color: var(--primary-dark);
}

.feature-card h3 {
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.feature-card p {
  font-size: clamp(0.85rem, 2vw, 0.95rem);
  color: var(--secondary);
}

.courses-section {
  padding: clamp(2rem, 7vw, 4rem) 0;
  background-color: var(--white);
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.course-card {
  border-radius: var(--radius-lg);
  transition: var(--transition);
  box-shadow: var(--shadow);
  background-color: var(--white);
  overflow: hidden;
}

.course-card:hover {
  transform: translateY(-0.3rem);
  box-shadow: var(--shadow-md);
}

.course-image {
  height: clamp(8rem, 20vw, 10rem);
  overflow: hidden;
}

.course-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.course-card:hover .course-image img {
  transform: scale(1.03);
}

.course-body {
  padding: 1rem;
}

.course-title {
  font-size: clamp(0.9rem, 2.2vw, 1.1rem);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.course-description {
  font-size: clamp(0.8rem, 1.8vw, 0.9rem);
  color: var(--secondary);
  margin-bottom: 1rem;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course-price {
  font-weight: 700;
  color: var(--primary);
  font-size: clamp(0.9rem, 2.2vw, 1.1rem);
}

.articles-section {
  padding: clamp(2rem, 7vw, 4rem) 0;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.article-card {
  border-radius: var(--radius-lg);
  transition: var(--transition);
  box-shadow: var(--shadow);
  background-color: var(--white);
  overflow: hidden;
}

.article-card:hover {
  transform: translateY(-0.3rem);
  box-shadow: var(--shadow-md);
}

.article-image {
  height: clamp(8rem, 20vw, 10rem);
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.article-card:hover .article-image img {
  transform: scale(1.03);
}

.article-body {
  padding: 1rem;
}

.article-title {
  font-size: clamp(0.9rem, 2.2vw, 1.1rem);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.article-meta {
  font-size: clamp(0.8rem, 1.8vw, 0.85rem);
  color: var(--secondary);
  margin-bottom: 0.75rem;
}

.article-description {
  font-size: clamp(0.8rem, 1.8vw, 0.9rem);
  color: var(--secondary);
  margin-bottom: 1rem;
}

.testimonial-section {
  background: linear-gradient(135deg, #edf2f7, #e2e8f0);
  padding: clamp(2rem, 7vw, 4rem) 0;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.testimonial-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: clamp(1rem, 3.5vw, 1.5rem);
  box-shadow: var(--shadow);
  transition: var(--transition);
  position: relative;
}

.testimonial-card:hover {
  transform: translateY(-0.3rem);
  box-shadow: var(--shadow-md);
}

.testimonial-card::before {
  content: '"';
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: clamp(2rem, 6vw, 3rem);
  color: var(--primary);
  opacity: 0.2;
  font-family: serif;
  line-height: 1;
}

.stars {
  color: #f6ad55;
  font-size: clamp(0.85rem, 1.8vw, 1rem);
  margin-bottom: 0.75rem;
}

.testimonial-content {
  font-style: italic;
  font-size: clamp(0.85rem, 2vw, 0.95rem);
  line-height: 1.6;
  color: var(--secondary);
  margin-bottom: 1rem;
}

.testimonial-author {
  display: flex;
  align-items: center;
}

.testimonial-avatar {
  width: clamp(2.5rem, 8vw, 3.5rem);
  height: clamp(2.5rem, 8vw, 3.5rem);
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--primary);
  margin-right: 0.75rem;
}

.testimonial-info h5 {
  font-weight: 600;
  font-size: clamp(0.9rem, 2.2vw, 1rem);
  margin-bottom: 0.25rem;
}

.testimonial-info small {
  font-size: clamp(0.75rem, 1.8vw, 0.85rem);
  color: #718096;
}

.faq-section {
  padding: clamp(2rem, 7vw, 4rem) 0;
  background-color: var(--white);
}

.faq-container {
  max-width: 700px;
  margin: 0 auto;
}

.faq-item {
  background: var(--white);
  border: 1px solid var(--gray);
  border-radius: var(--radius-lg);
  margin-bottom: 0.75rem;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.faq-item:hover {
  box-shadow: var(--shadow);
}

.faq-question {
  background: var(--light);
  padding: clamp(0.75rem, 2.5vw, 1.2rem);
  cursor: pointer;
  border: none;
  width: 100%;
  text-align: left;
  font-weight: 600;
  font-size: clamp(0.9rem, 2.2vw, 1.1rem);
  color: var(--dark);
  transition: var(--transition);
  display: flex;
  justify-content: space-between;
  align-items: center;
  touch-action: manipulation;
}

.faq-question:hover {
  background: var(--gray);
}

.faq-question.active {
  background: var(--primary);
  color: var(--white);
}

.faq-question::after {
  content: '+';
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  transition: var(--transition);
}

.faq-question.active::after {
  content: '−';
}

.faq-answer {
  padding: 0 clamp(1rem, 2.5vw, 1.5rem);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
}

.faq-answer.active {
  padding: clamp(0.75rem, 2.5vw, 1.2rem);
  max-height: 300px;
}

.faq-answer p {
  margin: 0;
  color: var(--secondary);
  line-height: 1.6;
  font-size: clamp(0.85rem, 2vw, 0.95rem);
}

.cta-section {
  background: linear-gradient(135deg, var(--primary-dark), #001f53);
  color: var(--white);
  padding: clamp(2.5rem, 7vw, 4rem) 0;
  text-align: center;
  position: relative;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(255,255,255,0.1), transparent);
  z-index: 0;
}

.cta-section .container {
  position: relative;
  z-index: 1;
}

.cta-title {
  color: var(--white);
  font-weight: 700;
  font-size: clamp(1.5rem, 4.5vw, 2.2rem);
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: clamp(0.9rem, 2.8vw, 1.2rem);
  opacity: 0.95;
  max-width: 40rem;
  margin: 0 auto 1.5rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

@media (max-width: 992px) {
  .hero-section {
    padding: clamp(1.5rem, 5vw, 2.5rem) 0;
    margin-top: 80px;
  }
  .hero-title { font-size: clamp(1.5rem, 4.5vw, 2.2rem); }
  .hero-subtitle { font-size: clamp(0.85rem, 2.5vw, 1.1rem); }
  .section-title { font-size: clamp(1.3rem, 4vw, 1.8rem); }
  .cta-section, .testimonial-section, .faq-section, .courses-section, .articles-section, .features-section {
    padding: clamp(1.5rem, 5vw, 3rem) 0;
  }
  .features-grid, .courses-grid, .articles-grid, .testimonials-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  body { font-size: 15px; }
  .container { padding-left: 0.75rem; padding-right: 0.75rem; }
  .hero-section {
    margin-top: 80px;
    padding: clamp(1.2rem, 4vw, 2rem) 0;
  }
  .hero-title {
    font-size: clamp(1.3rem, 4vw, 1.8rem);
    margin-bottom: 0.75rem;
  }
  .hero-subtitle {
    font-size: clamp(0.8rem, 2.2vw, 0.95rem);
    margin-bottom: 1rem;
  }
  .hero-cta {
    flex-direction: column;
    gap: 0.5rem;
  }
  .hero-cta .btn {
    width: 100%;
    max-width: 240px;
    margin: 0 auto;
    padding: 0.5rem 0.75rem;
    font-size: clamp(0.85rem, 2vw, 0.95rem);
  }
  .section-title { font-size: clamp(1.1rem, 3.5vw, 1.5rem); }
  .section-title:after { width: 3rem; }
  .feature-icon { font-size: clamp(1.5rem, 4vw, 2rem); }
  .feature-card h3 { font-size: clamp(0.9rem, 2.2vw, 1.1rem); }
  .course-image, .article-image { height: clamp(7rem, 18vw, 9rem); }
  .course-title, .article-title { font-size: clamp(0.85rem, 2vw, 1rem); }
  .course-description, .article-description { font-size: clamp(0.75rem, 1.8vw, 0.85rem); }
  .course-price { font-size: clamp(0.85rem, 2vw, 1rem); }
  .cta-title { font-size: clamp(1.3rem, 4vw, 1.8rem); }
  .cta-subtitle { font-size: clamp(0.85rem, 2.2vw, 0.95rem); }
  .testimonial-card { padding: clamp(0.75rem, 2.5vw, 1.2rem); }
  .testimonial-card::before { font-size: clamp(1.5rem, 5vw, 2.5rem); }
  .testimonial-content { font-size: clamp(0.8rem, 1.8vw, 0.9rem); }
  .testimonial-avatar { width: clamp(2rem, 7vw, 3rem); height: clamp(2rem, 7vw, 3rem); }
  .section-title-center h2 { font-size: clamp(1.1rem, 3.5vw, 1.5rem); }
  .section-subtitle { font-size: clamp(0.8rem, 2vw, 0.9rem); }
  .faq-container { max-width: 100%; }
  .faq-question { font-size: clamp(0.85rem, 2vw, 1rem); }
  .faq-answer.active { max-height: 250px; }
}

@media (max-width: 576px) {
  body { font-size: 14px; }
  .container { padding-left: 0.5rem; padding-right: 0.5rem; }
  .hero-section {
    padding: clamp(1rem, 3.5vw, 1.5rem) 0;
    margin-top: 75px;
  }
  .hero-title {
    font-size: clamp(1.1rem, 3.5vw, 1.5rem);
  }
  .hero-subtitle { font-size: clamp(0.75rem, 1.8vw, 0.85rem); }
  .section-title { font-size: clamp(1rem, 3vw, 1.3rem); }
  .section-title:after { width: 2.5rem; }
  .section-title-center h2 { font-size: clamp(1rem, 3vw, 1.3rem); }
  .section-title-center h2::after { width: 2.5rem; }
  .section-subtitle { font-size: clamp(0.75rem, 1.8vw, 0.85rem); padding: 0 0.5rem; }
  .hero-cta, .cta-buttons { flex-direction: column; gap: 0.5rem; }
  .hero-cta .btn, .cta-buttons .btn {
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
    font-size: clamp(0.8rem, 1.8vw, 0.9rem);
  }
  .section-header { flex-direction: column; align-items: center; }
  .features-grid, .courses-grid, .articles-grid, .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .course-image, .article-image { height: clamp(6rem, 16vw, 8rem); }
  .faq-question { padding: clamp(0.5rem, 2vw, 0.8rem); }
  .faq-answer.active { padding: clamp(0.5rem, 2vw, 0.8rem); max-height: 200px; }
}
</style>