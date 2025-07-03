<script setup>
import { ref } from 'vue'

const purchasedCourses = ref([
  {
    id: 1,
    title: 'Vue.js Fundamentals',
    progress: 85,
    image: 'https://via.placeholder.com/150/92c952',
    category: 'Web Development',
  },
  {
    id: 2,
    title: 'Advanced CSS Techniques',
    progress: 45,
    image: 'https://via.placeholder.com/150/771796',
    category: 'Web Design',
  },
  {
    id: 3,
    title: 'JavaScript Masterclass',
    progress: 10,
    image: 'https://via.placeholder.com/150/24f355',
    category: 'Programming',
  },
])
</script>

<template>
  <div class="tab-content">
    <div class="content-header">
      <h2><i class="fas fa-book-open header-icon"></i> My Courses</h2>
      <p class="subtitle">Continue your learning journey</p>
    </div>

    <div class="course-grid">
      <div v-for="course in purchasedCourses" :key="course.id" class="course-card">
        <div class="course-image-container">
          <img :src="course.image" :alt="course.title" class="course-image" />
          <span class="course-category">{{ course.category }}</span>
        </div>
        <div class="course-info">
          <h3>{{ course.title }}</h3>
          <div class="progress-container">
            <div class="progress-bar" :style="{ width: course.progress + '%' }"></div>
          </div>
          <div class="progress-info">
            <span class="progress-text">{{ course.progress }}% Complete</span>
            <span class="progress-percentage">{{ course.progress }}%</span>
          </div>
          <button class="continue-btn">
            <i class="fas fa-play"></i> Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.course-card {
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-light);
}

.course-image-container {
  position: relative;
}

.course-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.course-category {
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 500;
}

.course-info {
  padding: 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.course-info h3 {
  margin: 0 0 1rem;
  font-size: 1.1rem;
  color: var(--dark-color);
  font-weight: 600;
}

.progress-container {
  height: 6px;
  background: var(--light-gray);
  border-radius: 3px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--primary-color);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.progress-text {
  font-size: 0.8rem;
  color: var(--gray-color);
}

.progress-percentage {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary-color);
}

.continue-btn {
  margin-top: auto;
  padding: 0.75rem;
  background: var(--primary-color);
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.continue-btn:hover {
  background: black;
  transform: translateY(-2px);
  color: white;
}
</style>