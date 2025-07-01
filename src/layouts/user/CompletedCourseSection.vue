<script setup>
import { ref } from 'vue'

const completedCourses = ref([
  {
    id: 4,
    title: 'HTML5 Crash Course',
    completionDate: '15 March 2023',
    image: 'https://via.placeholder.com/150/d32776',
    category: 'Web Development',
  },
  {
    id: 5,
    title: 'Responsive Web Design',
    completionDate: '2 May 2023',
    image: 'https://via.placeholder.com/150/f66b97',
    category: 'Web Design',
  },
])
</script>

<template>
  <div class="tab-content">
    <div class="content-header">
      <h2><i class="fas fa-check-circle header-icon"></i> Completed Courses</h2>
      <p class="subtitle">Your achievements</p>
    </div>

    <div class="completed-courses">
      <div v-for="course in completedCourses" :key="course.id" class="completed-card">
        <div class="completed-image-container">
          <img :src="course.image" :alt="course.title" class="completed-image" />
          <span class="course-category">{{ course.category }}</span>
        </div>
        <div class="completed-info">
          <h3>{{ course.title }}</h3>
          <p class="completion-date">
            <i class="fas fa-calendar-alt"></i> Completed on {{ course.completionDate }}
          </p>
          <button class="view-certificate-btn">
            <i class="fas fa-certificate"></i> View Certificate
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.completed-courses {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.completed-card {
  display: flex;
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: var(--transition);
}

.completed-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-light);
}

.completed-image-container {
  position: relative;
  flex-shrink: 0;
  width: 120px;
}

.completed-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.completed-image-container .course-category {
  position: absolute;
  bottom: 10px;
  left: 10px;
  top: auto;
}

.completed-info {
  padding: 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.completed-info h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: var(--dark-color);
  font-weight: 600;
}

.completion-date {
  margin: 0 0 1rem;
  font-size: 0.8rem;
  color: var(--gray-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.view-certificate-btn {
  margin-top: auto;
  padding: 0.5rem 1rem;
  background: var(--primary-light);
  color: var(--primary-color);
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: fit-content;
}

.view-certificate-btn:hover {
  background: #d6e4ff;
  transform: translateY(-2px);
}
</style>