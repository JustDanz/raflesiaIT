<script setup>
import NavbarAll from '../components/navbarall.vue'
import FooterAll from '../components/footerall.vue'
import { ref, computed } from 'vue'

const handleNavigation = (to) => {
  window.location.href = to
}

const courses = [
  {
    id: 1,
    title: "Dasar Pengembangan Web",
    description: "Pelajari HTML, CSS, dan JavaScript untuk membangun website responsif modern. Kursus ini cocok untuk pemula yang ingin memulai karir di bidang web development.",
    category: "Frontend",
    duration: "6 minggu",
    level: "Pemula",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 1499000,
    discount: 999000,
    rating: 4.7,
    students: 1250,
    mentor: {
      name: "Budi Santoso",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "Senior Frontend Engineer at Gojek"
    },
    lessons: 42,
    projects: 5,
    completionRate: 92
  },
  {
    id: 2,
    title: "Framework React Lanjutan",
    description: "Mendalami React hooks, context API, dan optimasi performa. Bangun aplikasi React yang scalable dengan arsitektur modern dan best practices.",
    category: "Frontend",
    duration: "8 minggu",
    level: "Menengah",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 2199000,
    discount: 1799000,
    rating: 4.9,
    students: 890,
    mentor: {
      name: "Ani Wijaya",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      role: "React Specialist at Tokopedia"
    },
    lessons: 56,
    projects: 7,
    completionRate: 89
  },
  {
    id: 3,
    title: "Pengembangan Backend Node.js",
    description: "Belajar membangun aplikasi server-side yang scalable dengan Node.js dan Express. Pelajari autentikasi, database, caching, dan deployment.",
    category: "Backend",
    duration: "10 minggu",
    level: "Menengah",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 2499000,
    discount: 1999000,
    rating: 4.8,
    students: 750,
    mentor: {
      name: "Rudi Hermawan",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      role: "Backend Architect at Bukalapak"
    },
    lessons: 68,
    projects: 6,
    completionRate: 85
  },
  {
    id: 4,
    title: "JavaScript Fullstack",
    description: "Perjalanan lengkap dari frontend ke backend dengan stack MERN (MongoDB, Express, React, Node.js). Siap untuk menjadi fullstack developer profesional.",
    category: "Fullstack",
    duration: "12 minggu",
    level: "Lanjutan",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 3499000,
    discount: 2999000,
    rating: 4.9,
    students: 620,
    mentor: {
      name: "Dewi Kartini",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      role: "CTO at Startup Unicorn"
    },
    lessons: 84,
    projects: 8,
    completionRate: 78
  },
  {
    id: 5,
    title: "Python untuk Data Science",
    description: "Pelajari Python, Pandas, NumPy, dan Matplotlib untuk analisis data. Kuasai teknik cleaning data, visualisasi, dan machine learning dasar.",
    category: "Data Science",
    duration: "8 minggu",
    level: "Pemula",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 2299000,
    discount: 1899000,
    rating: 4.6,
    students: 1100,
    mentor: {
      name: "Hadi Pranoto",
      avatar: "https://randomuser.me/api/portraits/men/82.jpg",
      role: "Data Scientist at Traveloka"
    },
    lessons: 52,
    projects: 5,
    completionRate: 91
  }
]

const categories = [
  { name: "Semua", value: "all", count: courses.length },
  { name: "Frontend", value: "Frontend", count: courses.filter(c => c.category === "Frontend").length },
  { name: "Backend", value: "Backend", count: courses.filter(c => c.category === "Backend").length },
  { name: "Fullstack", value: "Fullstack", count: courses.filter(c => c.category === "Fullstack").length },
  { name: "Data Science", value: "Data Science", count: courses.filter(c => c.category === "Data Science").length }
]

const levels = [
  { name: "Semua", value: "all", count: courses.length },
  { name: "Pemula", value: "Pemula", count: courses.filter(c => c.level === "Pemula").length },
  { name: "Menengah", value: "Menengah", count: courses.filter(c => c.level === "Menengah").length },
  { name: "Lanjutan", value: "Lanjutan", count: courses.filter(c => c.level === "Lanjutan").length }
]

const activeCategory = ref("all")
const activeLevel = ref("all")
const searchQuery = ref("")

const filteredCourses = computed(() => {
  return courses.filter(course => {
    const matchesCategory = activeCategory.value === "all" || course.category === activeCategory.value
    const matchesLevel = activeLevel.value === "all" || course.level === activeLevel.value
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesLevel && matchesSearch
  })
})

// Format harga ke IDR
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(price)
}
</script>

<template>
  <NavbarAll />
  <div class="courses-container">
<!-- Ubah bagian hero-section di template -->
<div class="hero-section">
  <div class="hero-overlay"></div>
  <div class="container">
    <div class="hero-content">
      <h1 class="page-title">Tingkatkan Skill Teknologi Anda</h1>
      <p class="page-subtitle">Kursus praktis diajarkan oleh ahli industri. Belajar sesuai kecepatan Anda dengan kurikulum komprehensif kami.</p>
      <div class="search-bar">
        <input type="text" placeholder="Cari kursus berdasarkan judul atau deskripsi..." v-model="searchQuery">
        <button class="search-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          <span>Cari</span>
        </button>
      </div>
      <div class="hero-stats">
        <div class="stat-item">
          <div class="stat-number">4.8/5.0</div>
          <div class="stat-label">Rating Kursus</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">5,000+</div>
          <div class="stat-label">Siswa Aktif</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">20+</div>
          <div class="stat-label">Mentor Expert</div>
        </div>
      </div>
    </div>
  </div>
</div>
    <div class="container main-content">
      <div class="filters-section">
        <div class="filters-header">
          <h2 class="section-title">Temukan Kursus yang Tepat untuk Anda</h2>
          <div class="results-count" v-if="filteredCourses.length > 0">
            Menampilkan <strong>{{ filteredCourses.length }}</strong> dari {{ courses.length }} kursus
          </div>
        </div>
        
        <div class="filters">
          <div class="filter-group">
            <h3 class="filter-title">Kategori</h3>
            <div class="filter-tags">
              <button 
                v-for="category in categories" 
                :key="category.value"
                class="filter-tag" 
                :class="{ active: activeCategory === category.value }"
                @click="activeCategory = category.value"
              >
                {{ category.name }} <span class="tag-count">{{ category.count }}</span>
              </button>
            </div>
          </div>
          
          <div class="filter-group">
            <h3 class="filter-title">Tingkat Kesulitan</h3>
            <div class="filter-tags">
              <button 
                v-for="level in levels" 
                :key="level.value"
                class="filter-tag" 
                :class="{ active: activeLevel === level.value }"
                @click="activeLevel = level.value"
              >
                {{ level.name }} <span class="tag-count">{{ level.count }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="no-results" v-if="filteredCourses.length === 0">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3>Tidak menemukan kursus yang cocok</h3>
        <p>Coba ubah filter pencarian atau kata kunci yang berbeda</p>
        <button class="reset-filters" @click="[activeCategory = 'all', activeLevel = 'all', searchQuery = '']">
          Reset Semua Filter
        </button>
      </div>
      
      <div class="courses-grid" v-else>
        <div class="course-card" v-for="course in filteredCourses" :key="course.id">
          <div class="course-image-container">
            <img :src="course.image" :alt="course.title" class="course-image">
            <div class="course-badge">{{ course.category }}</div>
            <div class="course-rating">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
              {{ course.rating }} <span class="rating-count">({{ course.students.toLocaleString('id-ID') }})</span>
            </div>
          </div>
          
          <div class="course-content">
            <div class="course-header">
              <div class="level-tag" :class="course.level.toLowerCase()">{{ course.level }}</div>
              <h3>{{ course.title }}</h3>
              <p class="course-description">{{ course.description }}</p>
            </div>
            
            <div class="course-meta">
              <div class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                </svg>
                <span>{{ course.duration }}</span>
              </div>
              <div class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                </svg>
                <span>{{ course.lessons }} Pelajaran</span>
              </div>
              <div class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                </svg>
                <span>{{ course.projects }} Proyek</span>
              </div>
            </div>
            
            <div class="mentor-info">
              <img :src="course.mentor.avatar" :alt="course.mentor.name" class="mentor-avatar">
              <div class="mentor-details">
                <div class="mentor-name">{{ course.mentor.name }}</div>
                <div class="mentor-role">{{ course.mentor.role }}</div>
              </div>
            </div>
            
            <div class="pricing">
              <div class="price-discount" v-if="course.discount">
                <span class="original-price">{{ formatPrice(course.price) }}</span>
                <span class="discounted-price">{{ formatPrice(course.discount) }}</span>
                <span class="discount-percent">{{ Math.round((1 - course.discount/course.price) * 100) }}% OFF</span>
              </div>
              <div class="price-normal" v-else>
                {{ formatPrice(course.price) }}
              </div>
            </div>
          </div>
          
          <div class="course-footer">
            <router-link 
              :to="`/course/${course.id}`" 
              @click="handleNavigation(`/course/${course.id}`)" 
              class="course-link"
            >
              Lihat Detail Kursus
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </svg>
            </router-link>
            <div class="completion-rate">
              <div class="rate-text">Tingkat Penyelesaian: {{ course.completionRate }}%</div>
              <div class="rate-bar">
                <div class="rate-progress" :style="{ width: `${course.completionRate}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterAll />
</template>

<style scoped>
.courses-container {
  padding-top: 60px;
  background-color: #f8fafc;
  min-height: calc(100vh - 200px);
}

/* Hero Section */
.hero-section {
  position: relative;
  padding: 5rem 1rem;
  margin-bottom: 3rem;
  /* Hapus gradient background */
  background-image: url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* Tambah overlay untuk readability */
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.page-title {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  /* Ubah gradient text untuk kontras yang lebih baik */
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.page-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.search-bar {
  display: flex;
  max-width: 700px;
  margin: 0 auto 2.5rem;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.search-bar:focus-within {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.25);
}

.search-bar input {
  flex: 1;
  padding: 1.1rem 1.75rem;
  border: none;
  font-size: 1rem;
  color: #1e293b;
  background: white;
}

.search-bar input::placeholder {
  color: #94a3b8;
}

.search-bar input:focus {
  outline: none;
}

.search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0 2rem;
  cursor: pointer;
  transition: background 0.2s;
  font-weight: 500;
}

.search-button:hover {
  background: #2563eb;
}

.search-button svg {
  flex-shrink: 0;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 3rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: #bfdbfe;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Main Content */
.main-content {
  padding: 2rem 1rem 4rem;
}

.filters-section {
  margin-bottom: 2.5rem;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.results-count {
  font-size: 0.95rem;
  color: #64748b;
}

.filters {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.filter-group {
  margin-bottom: 1.5rem;
}

.filter-group:last-child {
  margin-bottom: 0;
}

.filter-title {
  font-size: 1rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.75rem;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-tag {
  display: flex;
  align-items: center;
  background: #f1f5f9;
  border: none;
  padding: 0.6rem 1.25rem;
  border-radius: 50px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  color: #334155;
}

.filter-tag:hover {
  background: #e2e8f0;
  transform: translateY(-1px);
}

.filter-tag.active {
  background: #3b82f6;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
}

.tag-count {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 0.1rem 0.4rem;
  font-size: 0.75rem;
  margin-left: 0.4rem;
}

.filter-tag.active .tag-count {
  background: rgba(255, 255, 255, 0.3);
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.no-results svg {
  color: #94a3b8;
  margin-bottom: 1.5rem;
}

.no-results h3 {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.no-results p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.reset-filters {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.reset-filters:hover {
  background: #2563eb;
}

/* Courses Grid */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
}

.course-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.course-image-container {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.course-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.course-card:hover .course-image {
  transform: scale(1.05);
}

.course-badge {
  position: absolute;
  top: 1rem;
  left: 0;
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.course-rating {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.35rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.course-rating svg {
  color: #fbbf24;
}

.rating-count {
  font-size: 0.75rem;
  opacity: 0.8;
  margin-left: 0.15rem;
}

.course-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.course-header {
  margin-bottom: 1.25rem;
}

.level-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.level-tag.pemula {
  background: #dcfce7;
  color: #166534;
}

.level-tag.menengah {
  background: #fef9c3;
  color: #854d0e;
}

.level-tag.lanjutan {
  background: #fee2e2;
  color: #991b1b;
}

.course-header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.course-description {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 0;
}

.course-meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin: 1.5rem 0;
  padding: 1.25rem 0;
  border-top: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
}

.meta-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 0.8rem;
  color: #475569;
}

.meta-item svg {
  color: #94a3b8;
  margin-bottom: 0.4rem;
}

.mentor-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.mentor-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.mentor-details {
  flex: 1;
}

.mentor-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.1rem;
}

.mentor-role {
  font-size: 0.8rem;
  color: #64748b;
}

.pricing {
  margin-top: auto;
}

.price-discount {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.original-price {
  text-decoration: line-through;
  color: #94a3b8;
  font-size: 0.9rem;
}

.discounted-price {
  font-size: 1.35rem;
  font-weight: 700;
  color: #1e40af;
}

.discount-percent {
  background: #dcfce7;
  color: #166534;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
}

.price-normal {
  font-size: 1.35rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 1rem;
}

.course-footer {
  border-top: 1px solid #f1f5f9;
  padding: 1rem 1.5rem;
}

.course-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem;
  background-color: #3b82f6;
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  margin-bottom: 0.75rem;
}

.course-link:hover {
  background-color: #2563eb;
}

.course-link svg {
  transition: transform 0.3s ease;
}

.course-link:hover svg {
  transform: translateX(3px);
}

.completion-rate {
  font-size: 0.75rem;
  color: #64748b;
}

.rate-text {
  margin-bottom: 0.3rem;
}

.rate-bar {
  height: 6px;
  background: #f1f5f9;
  border-radius: 3px;
  overflow: hidden;
}

.rate-progress {
  height: 100%;
  background: #10b981;
  border-radius: 3px;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .hero-stats {
    gap: 2rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 1rem;
  }
  
  .page-title {
    font-size: 2.2rem;
  }
  
  .page-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-stats {
    gap: 1.5rem;
    margin-top: 2rem;
  }
  
  .stat-number {
    font-size: 1.3rem;
  }
  
  .filters-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .courses-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 576px) {
  .hero-section {
    padding: 3rem 1rem;
  }
  
  .page-title {
    font-size: 1.8rem;
  }
  
  .search-bar {
    flex-direction: column;
    border-radius: 8px;
  }
  
  .search-bar input {
    border-radius: 8px 8px 0 0;
  }
  
  .search-button {
    padding: 0.9rem;
    border-radius: 0 0 8px 8px;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .filter-tags {
    justify-content: center;
  }
  
  .course-meta {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}
</style>