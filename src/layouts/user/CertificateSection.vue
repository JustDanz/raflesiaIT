<script setup>
import { ref } from 'vue'

const certificates = ref([
  {
    id: 1,
    course: 'HTML5 Crash Course',
    date: '15 March 2023',
    downloadLink: '#',
    category: 'Web Development',
  },
  {
    id: 2,
    course: 'Responsive Web Design',
    date: '2 May 2023',
    downloadLink: '#',
    category: 'Web Design',
  },
])
</script>

<template>
  <div class="tab-content">
    <div class="content-header">
      <h2><i class="fas fa-award header-icon"></i> My Certificates</h2>
      <p class="subtitle">Your digital achievements</p>
    </div>

    <div class="certificates-list">
      <div v-for="cert in certificates" :key="cert.id" class="certificate-card">
        <div class="certificate-icon">
          <i class="fas fa-certificate"></i>
        </div>
        <div class="certificate-details">
          <h3>{{ cert.course }}</h3>
          <p class="certificate-date">
            <i class="fas fa-calendar-alt"></i> Issued on {{ cert.date }}
          </p>
          <span class="certificate-category">{{ cert.category }}</span>
        </div>
        <a :href="cert.downloadLink" class="download-btn">
          <i class="fas fa-download"></i> Download
        </a>
      </div>
    </div>
  </div>
</template>
<style scoped>
.certificates-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.25rem;
}

.certificate-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.certificate-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-light);
}

.certificate-icon {
  font-size: 1.75rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-light);
  border-radius: 50%;
  color: var(--primary-color);
  flex-shrink: 0;
}

.certificate-details {
  flex-grow: 1;
}

.certificate-details h3 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  color: var(--dark-color);
  font-weight: 600;
}

.certificate-date {
  margin: 0 0 0.25rem;
  font-size: 0.8rem;
  color: var(--gray-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.certificate-category {
  display: inline-block;
  background: #f0f0f0;
  color: var(--gray-color);
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.7rem;
  margin-top: 0.25rem;
}

.download-btn {
  padding: 0.6rem 1rem;
  background: rebeccapurple;
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}



.download-btn:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: black;
}
</style>