<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  data() {
    return {
      youtubeVideoId: 'dQw4w9WgXcQ',
      telegramGroupLink: 'https://t.me/yourtelegramgroup',
      labLink: 'https://example.com/lab-link',
      completedChapters: [],
      showReviewModal: false,
      chapters: [
        {
          icon: 'fas fa-laptop-code',
          title: 'Day 1 - Setup SIEM & Testing Environment',
          description: 'Setup SIEM & Testing Environment'
        },
        {
          icon: 'fas fa-search',
          title: 'Day 2 - Web Fuzzing & Discovery',
          description: 'Web Fuzzing & Discovery'
        },
        {
          icon: 'fas fa-chart-line',
          title: 'Day 3 - SIEM Reading',
          description: 'SIEM Reading'
        },
        {
          icon: 'fas fa-bug',
          title: 'Day 4 - Web Exploitation',
          description: 'Web Exploitation'
        },
        {
          icon: 'fas fa-shield-alt',
          title: 'Day 5 - Active Response & Verification',
          description: 'Active Response And Verification'
        }
      ]
    }
  },
  computed: {
    allChaptersCompleted() {
      return this.completedChapters.length === this.chapters.length;
    },
    progressPercentage() {
      return (this.completedChapters.length / this.chapters.length) * 100;
    }
  },
  methods: {
    toggleChapterCompletion(index) {
      if (this.completedChapters.includes(index)) {
        this.completedChapters = this.completedChapters.filter(c => c !== index);
      } else {
        this.completedChapters.push(index);
        this.completedChapters.sort();
      }
    },
    downloadCertificate() {
      alert('Sertifikat akan segera diunduh!');
    },
    reportIssue() {
      alert('Terima kasih! Laporan Anda akan kami tindaklanjuti.');
    },
    toggleFullscreen() {
      const container = this.$el.querySelector('.video-fullscreen-container');
      if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    },
    goBackToDashboard() {
      this.$router.push('/user-dashboard');
    }
  }
}
</script>

<template>
  <div class="course-container">
    <!-- Fullscreen Video Section -->
    <div class="video-fullscreen-container">
      <div class="video-fullscreen-wrapper">
        <iframe 
          :src="'https://www.youtube.com/embed/' + youtubeVideoId" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
        <button class="fullscreen-btn" @click="toggleFullscreen">
          <i class="fas fa-expand"></i>
        </button>
      </div>
    </div>

    <!-- Header -->
    <div class="header">
      <h1>Informasi Pelaksanaan Kelas</h1>
      <p class="subtitle">Live Class Purple Teaming Keamanan Aplikasi Web</p>
      <button class="btn-back" @click="goBackToDashboard">
        <i class="fas fa-arrow-left"></i>
        <span>Kembali ke Dashboard</span>
      </button>
    </div>

    <!-- Main Content Grid -->
    <div class="main-content">
      <!-- Left Column -->
      <div class="left-column">
        <!-- Schedule Section -->
        <div class="section">
          <h2><i class="fas fa-calendar-alt"></i> Jadwal Pelaksanaan</h2>
          <div class="chapters">
            <div 
              v-for="(chapter, index) in chapters" 
              :key="index"
              class="chapter"
              :class="{ completed: completedChapters.includes(index) }"
              @click="toggleChapterCompletion(index)"
            >
              <div class="chapter-icon">
                <i :class="chapter.icon"></i>
              </div>
              <div class="chapter-info">
                <h3>{{ chapter.title }}</h3>
                <p>{{ chapter.description }}</p>
              </div>
              <div class="check-icon" v-if="completedChapters.includes(index)">
                <i class="fas fa-check"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <!-- Progress Section -->
        <div class="progress-section">
          <div class="progress-header">
            <span>Progress Kelas</span>
            <span>{{ completedChapters.length }}/{{ chapters.length }}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
          </div>
          <div class="progress-text">{{ Math.round(progressPercentage) }}% Complete</div>
        </div>

        <!-- Info Card -->
        <div class="info-card">
          <div class="info-header">
            <i class="fas fa-info-circle"></i>
            <h3>Informasi Penting</h3>
          </div>
          <div class="info-content">
            <p><i class="fas fa-video"></i> Link Zoom kelas kami umumkan melalui grup, notion, & email</p>
            <p><i class="fas fa-play-circle"></i> Video rekaman dapat diakses di website cyberkarta H+1 setelah kelas</p>
            <p><i class="fas fa-certificate"></i> Sertifikat akan dikirim via email setelah semua kelas selesai</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="actions">
          <a :href="labLink" target="_blank" class="btn lab">
            <i class="fas fa-flask"></i> 
            <span>Link Lab Kelas</span>
          </a>
          <a :href="telegramGroupLink" target="_blank" class="btn telegram">
            <i class="fab fa-telegram"></i> 
            <span>Grup Telegram</span>
          </a>
          <button class="btn review" @click="showReviewModal = true">
            <i class="fas fa-star"></i> 
            <span>Beri Review</span>
          </button>
        </div>

        <!-- Certificate Section -->
        <div v-if="allChaptersCompleted" class="certificate">
          <button class="btn-certificate" @click="downloadCertificate">
            <i class="fas fa-award"></i> 
            <span>Unduh Sertifikat</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <button class="btn-report" @click="reportIssue">
        <i class="fas fa-flag"></i> 
        <span>Laporkan Masalah</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.course-container {
  font-family: 'Inter', system-ui, sans-serif;
  background: #000;
  min-height: 100vh;
  color: white;
}

/* Fixed Fullscreen Video Styles */
.video-fullscreen-container {
  position: relative;
  width: 80%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  background: #000;
  margin: 0 auto;
}

.video-fullscreen-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-fullscreen-wrapper iframe {
  width: 100%;
  height: 100%;
}

.fullscreen-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.fullscreen-btn:hover {
  background: rgba(0,0,0,0.8);
  transform: scale(1.1);
}

/* Header Styles */
.header {
  text-align: center;
  margin: 2rem auto;
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 1400px;
}

.header h1 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: #2d3748;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
  line-height: 1.2;
}

.subtitle {
  color: #718096;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  margin: 0;
  font-weight: 500;
}

.btn-back {
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.1);
  color: rgb(0, 0, 0);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  margin-top: 1rem;
  backdrop-filter: blur(10px);
}

.btn-back:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 100, 130, 0.5);
}

.btn-back i {
  font-size: 0.9em;
}

/* Main Content Grid */
.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section {
  background: rgba(255, 255, 255, 0.95);
  padding: clamp(1.5rem, 4vw, 2rem);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #2d3748;
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

h2 i {
  color: #667eea;
  font-size: 1.2em;
}

/* Chapters Styles */
.chapters {
  display: grid;
  gap: 1rem;
}

.chapter {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: clamp(1rem, 3vw, 1.5rem);
  background: #f7fafc;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.chapter:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.chapter.completed {
  background: linear-gradient(135deg, #68d391 0%, #48bb78 100%);
  color: white;
}

.chapter.completed .chapter-info h3,
.chapter.completed .chapter-info p {
  color: white;
}

.chapter-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  width: clamp(40px, 8vw, 48px);
  height: clamp(40px, 8vw, 48px);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  flex-shrink: 0;
}

.chapter.completed .chapter-icon {
  background: rgba(255, 255, 255, 0.2);
}

.chapter-info {
  flex: 1;
  min-width: 0;
}

.chapter-info h3 {
  color: #2d3748;
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  margin: 0 0 0.25rem 0;
  font-weight: 600;
  line-height: 1.3;
}

.chapter-info p {
  color: #718096;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  margin: 0;
  line-height: 1.4;
}

.check-icon {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

/* Progress Section */
.progress-section {
  background: rgba(255, 255, 255, 0.95);
  padding: clamp(1.5rem, 4vw, 2rem);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #2d3748;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
}

.progress-bar {
  background: #e2e8f0;
  height: 12px;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  height: 100%;
  transition: width 0.3s ease;
  border-radius: 6px;
}

.progress-text {
  text-align: center;
  color: #718096;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  font-weight: 500;
}

/* Info Card */
.info-card {
  background: linear-gradient(135deg, #a9e4ff 0%, #a1f1ff 100%);
  padding: clamp(1.5rem, 4vw, 2rem);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.info-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.info-header i {
  color: #2d3748;
  font-size: clamp(1.2rem, 3vw, 1.5rem);
}

.info-header h3 {
  color: #2d3748;
  font-size: clamp(1.1rem, 3vw, 1.3rem);
  margin: 0;
  font-weight: 600;
}

.info-content p {
  color: #2d3748;
  margin: 0.75rem 0;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  line-height: 1.5;
}

.info-content i {
  color: #667eea;
  width: 20px;
  margin-top: 0.1rem;
  flex-shrink: 0;
}

/* Action Buttons */
.actions {
  display: grid;
  gap: 1rem;
}

.btn {
  padding: clamp(0.75rem, 3vw, 1rem) clamp(1rem, 4vw, 1.5rem);
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  min-height: 48px;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.btn i {
  font-size: 1.1em;
}

.btn span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn.lab {
  background: linear-gradient(135deg, #c4ebff 0%, #aff2ff 100%);
  color: #2d3748;
}

.btn.telegram {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn.review {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  color: #2d3748;
}

/* Certificate Section */
.certificate {
  text-align: center;
}

.btn-certificate {
  padding: clamp(1rem, 4vw, 1.5rem) clamp(1.5rem, 5vw, 2rem);
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
  color: #2d3748;
  border: none;
  border-radius: 16px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  min-height: 56px;
  width: 100%;
}

.btn-certificate:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

/* Footer */
.footer {
  text-align: center;
  margin-top: 2rem;
  padding: 0 2rem 2rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

.btn-report {
  padding: clamp(0.75rem, 3vw, 1rem) clamp(1rem, 4vw, 1.5rem);
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  backdrop-filter: blur(10px);
}

.btn-report:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
    padding: 0 1rem 1rem;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 1.5rem;
    margin: 1rem auto;
  }
  
  .chapter {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
  
  .chapter-icon {
    align-self: center;
  }
  
  .check-icon {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
  
  .info-content p {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.25rem;
  }
  
  .info-content i {
    margin-top: 0;
  }
}

@media (max-width: 480px) {
  .header, .main-content {
    padding: 1rem;
  }
  
  .section {
    padding: 1.25rem;
  }
}
</style>