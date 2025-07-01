<script setup>
import { ref, onMounted } from 'vue'
import NavbarLogin from '../../components/navbarlogin.vue'
import FooterAll from '../../components/footerall.vue'
import ProfileSidebar from './ProfileSidebar.vue'
import CoursesSection from './CourseSection.vue'
import CompletedCoursesSection from './CompletedCourseSection.vue'
import CertificatesSection from './CertificateSection.vue'
import SettingsSection from './Settings.vue'
import TransactionSection from './TransactionSection.vue'

// Load FontAwesome
onMounted(() => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
  document.head.appendChild(link)
})

const activeTab = ref('courses')
const userProfile = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  joinDate: 'January 2023',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
})

const changeTab = (tab) => {
  activeTab.value = tab
}
</script>

<template>
  <NavbarLogin />
  <div class="dashboard-wrapper">
    <div class="dashboard-container">
      <ProfileSidebar :userProfile="userProfile" :activeTab="activeTab" @change-tab="changeTab" />
  <div class="main-content">
    <CoursesSection v-if="activeTab === 'courses'" />
    <CompletedCoursesSection v-if="activeTab === 'completed'" />
    <CertificatesSection v-if="activeTab === 'certificates'" />
    <TransactionSection v-if="activeTab === 'transactions'" />
    <SettingsSection v-if="activeTab === 'settings'" :userProfile="userProfile" />
  </div>
    </div>
  </div>
  <FooterAll />
</template>

<style scoped>
/* Base Styles */
:root {
  --primary-color: #4361ee;
  --primary-light: #ebf4ff;
  --secondary-color: #3f37c9;
  --success-color: #4cc9f0;
  --danger-color: #f72585;
  --warning-color: #f8961e;
  --light-color: #f8f9fa;
  --dark-color: #212529;
  --gray-color: #6c757d;
  --light-gray: #e9ecef;
  --border-radius: 8px;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

/* Dashboard Layout */
.dashboard-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
  padding: 1rem;
}

.dashboard-container {
  max-width: 1400px;
  margin: 100px auto 2rem;
  flex-grow: 1;
  display: flex;
  gap: 2rem;
}

.main-content {
  flex-grow: 1;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  overflow: hidden;
}

.content-header {
  margin-bottom: 2rem;
}

.content-header h2 {
  margin: 0 0 0.5rem;
  color: var(--dark-color);
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-icon {
  color: var(--primary-color);
}

.subtitle {
  margin: 0;
  color: var(--gray-color);
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .dashboard-container {
    gap: 1.5rem;
  }
  
  .profile-sidebar {
    width: 260px;
  }
}

@media (max-width: 992px) {
  .dashboard-container {
    flex-direction: column;
    margin-top: 80px;
  }
  
  .profile-sidebar {
    width: 100%;
  }
  
  .course-grid,
  .completed-courses,
  .certificates-list {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 1.5rem;
  }
  
  .completed-card {
    flex-direction: column;
  }
  
  .completed-image-container {
    width: 100%;
    height: 150px;
  }
  
  .certificate-card {
    flex-direction: column;
    text-align: center;
  }
  
  .certificate-details {
    text-align: center;
  }
  
  .certificate-date {
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .dashboard-wrapper {
    padding: 0.5rem;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .course-grid,
  .completed-courses,
  .certificates-list {
    grid-template-columns: 1fr;
  }
  
  .content-header h2 {
    font-size: 1.3rem;
  }
  
  .form-section h3 {
    font-size: 1.1rem;
  }
}
</style>