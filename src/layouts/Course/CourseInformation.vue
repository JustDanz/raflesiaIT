<template>
  <div class="course-info-container">
    <div class="course-header">
      <h1>Chapter Informasi Pelaksanaan Kelas</h1>
      <p class="course-subtitle">Live Class Purple Teaming Keamanan Aplikasi Web</p>
    </div>

    <div class="course-content">
      <div class="chapter-section">
        <h2><i class="fas fa-calendar-alt"></i> Jadwal Pelaksanaan</h2>
        
        <div class="chapter-list">
          <div class="chapter-item">
            <div class="chapter-icon"><i class="fas fa-laptop-code"></i></div>
            <div>
              <h3>Chapter Day 1 - Setup SIEM & Testing Environment</h3>
              <p>Setup SIEM & Testing Environment</p>
            </div>
          </div>
          
          <div class="chapter-item">
            <div class="chapter-icon"><i class="fas fa-search"></i></div>
            <div>
              <h3>Chapter Day 2 - Web Fuzzing & Discovery</h3>
              <p>Web Fuzzing & Discovery</p>
            </div>
          </div>
          
          <div class="chapter-item">
            <div class="chapter-icon"><i class="fas fa-chart-line"></i></div>
            <div>
              <h3>Chapter Day 3 - SIEM Reading</h3>
              <p>SIEM Reading</p>
            </div>
          </div>
          
          <div class="chapter-item">
            <div class="chapter-icon"><i class="fas fa-bug"></i></div>
            <div>
              <h3>Chapter Day 4 - Web Exploitation</h3>
              <p>Web Exploitation</p>
            </div>
          </div>
          
          <div class="chapter-item">
            <div class="chapter-icon"><i class="fas fa-shield-alt"></i></div>
            <div>
              <h3>Chapter Day 5 - Active Response & Verification</h3>
              <p>Active Response And Verification</p>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <div class="info-card-header">
          <i class="fas fa-info-circle"></i>
          <h3>Informasi Penting</h3>
        </div>
        <div class="info-card-content">
          <p>Link Zoom kelas kami umumkan melalui grup, notion, & email.</p>
          <p>Video rekaman dapat diakses di website cyberkarta H+1 setelah kelas.</p>
          <p>Sertifikat akan dikirim via email setelah semua kelas selesai.</p>
        </div>
      </div>

      <div class="video-section">
        <h2><i class="fab fa-youtube"></i> Materi Video Pembelajaran</h2>
        <div class="video-container">
          <iframe 
            width="560" 
            height="315" 
            :src="'https://www.youtube.com/embed/' + youtubeVideoId" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
        <div class="video-actions">
          <a :href="labLink" target="_blank" class="video-action-btn lab-btn">
            <i class="fas fa-flask"></i> Link Lab Kelas
          </a>
          <a :href="telegramGroupLink" target="_blank" class="video-action-btn telegram-btn">
            <i class="fab fa-telegram"></i> Grup Telegram
          </a>
        </div>
      </div>

      <div class="action-buttons">
        <button class="action-btn review-btn">
          <i class="fas fa-star"></i> Beri Review Kelas
        </button>
        <a :href="telegramGroupLink" target="_blank" class="action-btn group-btn">
          <i class="fab fa-telegram"></i> Gabung Grup Diskusi
        </a>
        <a :href="labLink" target="_blank" class="action-btn lab-btn">
          <i class="fas fa-flask"></i> Akses Link Lab
        </a>
      </div>

      <div class="feedback-section">
        <button class="feedback-btn">
          <i class="fas fa-flag"></i> Laporkan Masalah
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      youtubeVideoId: 'dQw4w9WgXcQ', // Replace with your actual YouTube video ID
      telegramGroupLink: 'https://t.me/yourtelegramgroup', // Replace with your Telegram group link
      labLink: 'https://example.com/lab-link' // Replace with your lab link
    }
  }
}
</script>

<style scoped>
:root {
  --primary-color: #6a4c93;
  --primary-light: #9575cd;
  --secondary-color: #8a5a44;
  --secondary-light: #b58365;
  --accent-color: #f8bbd0;
  --accent-dark: #f48fb1;
  --light-bg: #f9f7f3;
  --dark-text: #2d3748;
  --light-text: #4a5568;
  --border-radius: 12px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease-in-out; /* Updated to ease-in-out for smoother transitions */
}

.course-info-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--dark-text);
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  line-height: 1.6;
}

.course-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.course-header h1 {
  color: var(--primary-color);
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.course-subtitle {
  color: var(--light-text);
  font-size: 1.1rem;
  font-weight: 500;
}

i {
  color : black;
}

h2 {
  color: var(--primary-color);
  font-size: 1.4rem;
  margin: 1.8rem 0 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

h2 i {
  color: var(--accent-dark);
}

.chapter-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chapter-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.2rem;
  background-color: var(--light-bg);
  border-radius: var(--border-radius);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out; /* Explicitly include all transitioned properties */
}

.chapter-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15); /* Slightly stronger shadow */
  background-color: #f1f0ec; /* Subtle background change */
}

.chapter-icon {
  background-color: var(--primary-color);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chapter-item h3 {
  color: var(--primary-color);
  font-size: 1.1rem;
  margin-bottom: 0.4rem;
}

.chapter-item p {
  color: var(--light-text);
  font-size: 0.95rem;
  margin: 0;
}

.info-card {
  background: linear-gradient(135deg, #f5f7fa 0%, #f8bbd0 100%);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin: 2rem 0;
  box-shadow: var(--box-shadow);
}

.info-card-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.info-card-header i {
  color: var(--primary-color);
  font-size: 1.5rem;
}

.info-card-header h3 {
  margin: 0;
  color: var(--primary-color);
}

.info-card-content {
  padding-left: 0.5rem;
}

.info-card-content p {
  margin: 0.6rem 0;
  color: var(--dark-text);
}

.video-section {
  margin: 3rem 0;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  margin: 1.5rem 0 
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.video-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}

.video-action-btn {
  padding: 0.8rem 1.8rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* Include all properties */
  text-decoration: none;
  font-size: 0.95rem;
}

.video-action-btn i {
  font-size: 1.1rem;
}

.lab-btn {
  background-color: var(--secondary-color);
  color: white;
  border: 2px solid var(--secondary-color);
}

.lab-btn:hover {
  background-color: var(--secondary-light);
  border-color: var(--secondary-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(138, 90, 68, 0.3);
}

.telegram-btn {
  background-color: #0088cc;
  color: white;
  border: 2px solid #0088cc;
}

.telegram-btn:hover {
  background-color: #1e96d4;
  border-color: #1e96d4;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 136, 204, 0.3);
}

.thank-you-card {
  text-align: center;
  padding: 2rem;
  background-color: var(--light-bg);
  border-radius: var(--border-radius);
  margin: 2rem 0;
}

.thank-you-card h2 {
  justify-content: center;
  color: var(--primary-color);
}

.thank-you-card p {
  margin: 1rem 0;
  color: var(--light-text);
}

.website-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  font-weight: 600;
  margin-top: 1rem;
  transition: color 0.3s ease-in-out, transform 0.3s ease-in-out; /* Smooth color and transform */
}

.website-link:hover {
  color: var(--primary-light);
  transform: translateY(-1px); /* Subtle lift */
  text-decoration: none;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2.5rem 0;
  justify-content: center;
}

.action-btn {
  padding: 0.9rem 1.8rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out; /* Include all properties */
  text-decoration: none;
  font-size: 0.95rem;
}

.action-btn i {
  font-size: 1.1rem;
  color: black;
}
.action-btn a {
  color: black;
}

.review-btn {
  background-color: var(--accent-color);
  color: var(--dark-text);
  border: 2px solid var(--accent-color);
}

.review-btn:hover {
  background-color: white;
  color: black;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(248, 187, 208, 0.4);
  border-color: var(--accent-color); /* Ensure border persists */
}

.group-btn {
  background-color: var(--primary-color);
  color: rgb(0, 0, 0);
  border: 2px solid var(--primary-color);
}

.group-btn:hover {
  background-color: white;
  color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(106, 76, 147, 0.3);
  border-color: var(--primary-color); /* Ensure border persists */
}

.lab-btn {
  background-color: var(--secondary-color);
  color: rgb(0, 0, 0);
  border: 2px solid var(--secondary-color);
}

.lab-btn:hover {
  background-color: white;
  color: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(138, 90, 68, 0.3);
  border-color: var(--secondary-color); /* Ensure border persists */
}

.feedback-section {
  text-align: center;
  margin-top: 2rem;
}

.feedback-btn {
  padding: 0.7rem 1.5rem;
  background-color: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 50px;
  color: var(--light-text);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out, transform 0.3s ease-in-out; /* Include all properties */
}

.feedback-btn:hover {
  background-color: #f8fafc;
  color: var(--primary-color);
  border-color: var(--accent-color);
  transform: translateY(-2px); /* Subtle lift */
}

@media (max-width: 768px) {
  .course-info-container {
    padding: 1.5rem;
  }
  
  .action-buttons, .video-actions {
    flex-direction: column;
  }
  
  .action-btn, .video-action-btn {
    width: 100%;
    justify-content: center;
  }
  
  .course-header h1 {
    font-size: 1.6rem;
  }
  
  h2 {
    font-size: 1.3rem;
  }
  
  .chapter-item, .action-btn, .video-action-btn, .feedback-btn, .website-link {
    transition: all 0.3s ease-in-out; /* Consistent transitions on mobile */
  }
}
</style>