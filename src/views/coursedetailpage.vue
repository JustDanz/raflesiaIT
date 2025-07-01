<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NavbarAll from '../components/navbarall.vue'
import FooterAll from '../components/footerall.vue'

const route = useRoute()
const course = ref(null)
const openAccordions = ref([])

const courses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Master HTML, CSS, and JavaScript to build modern responsive websites.",
    category: "Frontend",
    duration: "6 weeks",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    instructor: "John Doe",
    instructorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    syllabus: [
      "Introduction to Web Development",
      "HTML5 and Semantic Markup",
      "CSS3 Styling and Layouts",
      "JavaScript Basics",
      "Responsive Design",
      "Project: Personal Portfolio"
    ],
    price: "$99.00",
    rating: 4.8,
    students: 1250,
    lastUpdated: "June 2023"
  },
  {
    id: 2,
    title: "Advanced React Framework",
    description: "Dive deep into React hooks, context API, and performance optimization.",
    category: "Frontend",
    duration: "8 weeks",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    instructor: "Jane Smith",
    instructorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    syllabus: [
      "React Hooks",
      "Context API",
      "State Management",
      "Performance Optimization",
      "Testing React Apps",
      "Project: E-commerce Dashboard"
    ],
    price: "$149.00",
    rating: 4.9,
    students: 980,
    lastUpdated: "May 2023"
  },
  {
    id: 3,
    title: "Node.js Backend Development",
    description: "Learn to build scalable server-side applications with Node.js and Express.",
    category: "Backend",
    duration: "10 weeks",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    instructor: "Mike Johnson",
    instructorAvatar: "https://randomuser.me/api/portraits/men/75.jpg",
    syllabus: [
      "Node.js Fundamentals",
      "Express Framework",
      "RESTful APIs",
      "Database Integration",
      "Authentication",
      "Project: API Server"
    ],
    price: "$199.00",
    rating: 4.7,
    students: 850,
    lastUpdated: "April 2023"
  },
  {
    id: 4,
    title: "Fullstack JavaScript",
    description: "Complete journey from frontend to backend with the MERN stack.",
    category: "Fullstack",
    duration: "12 weeks",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    instructor: "Sarah Lee",
    instructorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
    syllabus: [
      "Frontend with React",
      "Backend with Node.js",
      "MongoDB Integration",
      "Express Middleware",
      "Fullstack Project Setup",
      "Project: Social Media App"
    ],
    price: "$249.00",
    rating: 4.9,
    students: 1120,
    lastUpdated: "March 2023"
  }
]

onMounted(() => {
  const courseId = parseInt(route.params.id)
  course.value = courses.find(c => c.id === courseId) || null
})

const handleNavigation = (to) => {
  window.location.href = to
}
const toggleAccordion = (index) => {
  const currentIndex = openAccordions.value.indexOf(index)
  if (currentIndex > -1) {
    openAccordions.value.splice(currentIndex, 1)
  } else {
    openAccordions.value.push(index)
  }
}
</script>

<template>
  <NavbarAll />
  <div class="course-detail-container">
    <div v-if="course" class="container">
      <!-- Breadcrumb Navigation -->
      <nav class="breadcrumb">
        <router-link to="/">Home</router-link>
        <span>/</span>
        <router-link to="/courses">Courses</router-link>
        <span>/</span>
        <span>{{ course.title }}</span>
      </nav>

      <div class="hero-section">
        <div class="hero-content">
          <div class="badges">
            <span class="badge level-badge">{{ course.level }}</span>
            <span class="badge category-badge">{{ course.category }}</span>
          </div>
          <h1 class="course-title">{{ course.title }}</h1>
          <p class="course-subtitle">{{ course.description }}</p>
          
          <div class="rating-container">
            <div class="stars">
              <span v-for="i in 5" :key="i" :class="['star', i <= Math.floor(course.rating) ? 'filled' : '']">
                {{ i <= course.rating ? '★' : '☆' }}
              </span>
              <span class="rating-value">{{ course.rating }}</span>
            </div>
            <span class="students-count">{{ course.students.toLocaleString() }}+ students</span>
            <span class="last-updated">Updated {{ course.lastUpdated }}</span>
          </div>

          <!-- Moved course-image-container here, before instructor-info -->
          <div class="course-image-container">
            <img :src="course.image" :alt="course.title" class="course-image">
            <div class="preview-overlay">
              <button class="preview-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                </svg>
                Preview this course
              </button>
            </div>
          </div>

          <div class="instructor-info">
            <img :src="course.instructorAvatar" :alt="course.instructor" class="instructor-avatar">
            <span>Created by <strong>{{ course.instructor }}</strong></span>
          </div>
        </div>
        <div class="enrollment-card">
          <div class="card-content">
            <div class="price-section">
              <span class="price">{{ course.price }}</span>
              <span class="original-price" v-if="course.price !== '$99.00'">$129.00</span>
            </div>
            <div class="duration">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
              </svg>
              <span>{{ course.duration }}</span>
            </div>
            <router-link 
              :to="`/enroll/${course.id}`" 
              @click="handleNavigation(`/enroll/${course.id}`)" 
              class="enroll-button"
            >
              Enroll Now
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </svg>
            </router-link>
            <div class="guarantee">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
              </svg>
              <span>30-day money-back guarantee</span>
            </div>
            <div class="includes">
              <h4>This course includes:</h4>
              <ul>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                  </svg>
                  <span>50 hours on-demand video</span>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                  </svg>
                  <span>20 coding exercises</span>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                  </svg>
                  <span>Certificate of completion</span>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                  </svg>
                  <span>Full lifetime access</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="course-content">
        <div class="main-content">
          <div class="tabs">
            <button class="tab active">Overview</button>
            <button class="tab">Curriculum</button>
            <button class="tab">Instructor</button>
            <button class="tab">Reviews</button>
          </div>

          <div class="tab-content">
            <h2>What you'll learn</h2>
            <div class="learning-outcomes">
              <div class="outcome-column">
                <div class="outcome-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                  <span>Build modern responsive websites with HTML, CSS, and JavaScript</span>
                </div>
                <div class="outcome-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                  <span>Master CSS Grid and Flexbox for modern layouts</span>
                </div>
              </div>
              <div class="outcome-column">
                <div class="outcome-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                  <span>Implement responsive design principles</span>
                </div>
                <div class="outcome-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                  <span>Deploy websites to production environments</span>
                </div>
              </div>
            </div>

            <h3>Course Content</h3>
            <div class="syllabus-accordion">
  <div class="accordion-item" v-for="(item, index) in course.syllabus" :key="index">
    <div class="accordion-header" @click="toggleAccordion(index)">
      <span class="lecture-number">Lecture {{ index + 1 }}</span>
      <span class="lecture-title">{{ item }}</span>
      <span class="lecture-duration">15 min</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" 
           :class="['accordion-icon', openAccordionIndex === index ? 'rotate-180' : '']">
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
      </svg>
    </div>
   <div class="accordion-content" v-show="openAccordions.includes(index)">
      <p>This introductory lecture covers the basics of web development, including an overview of the technologies you'll be learning and the tools you'll need to get started.</p>
    </div>
  </div>
</div>
          </div>
        </div>
        <div class="sidebar">
          <div class="sidebar-card">
            <h3>Course Features</h3>
            <ul class="feature-list">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
                <span>Beginner Friendly</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
                <span>Hands-on Projects</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
                <span>Quizzes & Exercises</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
                <span>Certificate of Completion</span>
              </li>
            </ul>
          </div>

          <div class="sidebar-card">
            <h3>Who this course is for</h3>
            <ul class="audience-list">
              <li>Beginners who want to learn web development</li>
              <li>Designers looking to add coding skills</li>
              <li>Career changers entering tech</li>
              <li>Anyone who wants to build their own website</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container not-found">
      <div class="error-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#ef4444" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
        </svg>
        <h2>Course Not Found</h2>
        <p>We couldn't find the course you're looking for.</p>
        <router-link to="/courses" class="browse-button">Browse All Courses</router-link>
      </div>
    </div>
  </div>
  <FooterAll />
</template>

<style scoped>
.course-detail-container {
  padding-top: 80px;
  background-color: #f8fafc;
  min-height: 100vh;
  color: #1e293b;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  color: #64748b;
}

.breadcrumb a {
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb a:hover {
  color: #2563eb;
  text-decoration: underline;
}

.breadcrumb span {
  color: #94a3b8;
}

/* Hero Section */
.hero-section {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.hero-content {
  flex: 2;
  min-width: 300px;
}

.enrollment-card {
  flex: 1;
  min-width: 300px;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 100px;
}

/* Badges */
.badges {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.level-badge {
  background-color: #e0f2fe;
  color: #0369a1;
}

.category-badge {
  background-color: #ede9fe;
  color: #7c3aed;
}

/* Course Title */
.course-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.course-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

/* Rating */
.rating-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.stars {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.star {
  color: #e2e8f0;
}

.star.filled {
  color: #f59e0b;
}

.rating-value {
  font-weight: 700;
  color: #1e293b;
  margin-left: 0.5rem;
}

.students-count, .last-updated {
  font-size: 0.9rem;
  color: #64748b;
}

/* Instructor */
.instructor-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.instructor-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

/* Course Image */
.course-image-container {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
  height: 400px;
}

.course-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.course-image-container:hover .preview-overlay {
  opacity: 1;
}

.preview-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.preview-button:hover {
  transform: scale(1.05);
}

/* Enrollment Card */
.card-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.price {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
}

.original-price {
  font-size: 1rem;
  color: #94a3b8;
  text-decoration: line-through;
}

.duration {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
}

.enroll-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  border-radius: 0.375rem;
  text-decoration: none;
  transition: background-color 0.2s;
  margin: 0.5rem 0;
}

.enroll-button:hover {
  background-color: #1d4ed8;
}

.guarantee {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #64748b;
  margin: 0.5rem 0;
}

.includes h4 {
  font-size: 1rem;
  margin: 1rem 0 0.5rem;
  color: #1e293b;
}

.includes ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.includes li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  font-size: 0.9rem;
  color: #475569;
}

/* Course Content */
.course-content {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.main-content {
  flex: 2;
  min-width: 300px;
}

.sidebar {
  flex: 1;
  min-width: 300px;
}

/* Tabs */
.tabs {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
}

.tab {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  position: relative;
}

.tab.active {
  color: #2563eb;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #2563eb;
}

/* Tab Content */
.tab-content h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.tab-content h3 {
  font-size: 1.25rem;
  margin: 1.5rem 0 1rem;
  color: #1e293b;
}

/* Learning Outcomes */
.learning-outcomes {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.outcome-column {
  flex: 1;
  min-width: 250px;
}

.outcome-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.outcome-item svg {
  flex-shrink: 0;
  color: #10b981;
  margin-top: 0.2rem;
}

/* Syllabus Accordion */
.syllabus-accordion {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
}

.accordion-icon {
  transition: transform 0.2s ease;
}

.accordion-icon.rotate-180 {
  transform: rotate(180deg);
}

.accordion-content {
  padding: 0 1rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease, padding 0.2s ease;
}

.accordion-item.active .accordion-content {
  padding: 1rem;
  max-height: 500px; /* Adjust based on your content */
}

.accordion-item {
  border-bottom: 1px solid #e2e8f0;
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f8fafc;
  cursor: pointer;
  transition: background-color 0.2s;
}

.accordion-header:hover {
  background-color: #f1f5f9;
}

.lecture-number {
  font-size: 0.875rem;
  color: #64748b;
  min-width: 70px;
}

.lecture-title {
  flex: 1;
  font-weight: 500;
}

.lecture-duration {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 1rem;
}

.accordion-content {
  padding: 1rem;
  background-color: white;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #475569;
}

/* Sidebar Cards */
.sidebar-card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.sidebar-card h3 {
  font-size: 1.125rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  font-size: 0.95rem;
}

.feature-list li svg {
  color: #10b981;
}

.audience-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.audience-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.audience-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #3b82f6;
}

/* Not Found */
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.error-content {
  text-align: center;
  max-width: 500px;
  padding: 2rem;
}

.error-content h2 {
  font-size: 1.75rem;
  margin: 1rem 0 0.5rem;
  color: #1e293b;
}

.error-content p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.browse-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: background-color 0.2s;
}

.browse-button:hover {
  background-color: #1d4ed8;
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-section {
    flex-direction: column;
  }
  
  .enrollment-card {
    position: static;
  }
}

@media (max-width: 768px) {
  .course-title {
    font-size: 2rem;
  }
  
  .course-subtitle {
    font-size: 1.1rem;
  }
  
  .course-content {
    flex-direction: column;
  }
  
  .learning-outcomes {
    flex-direction: column;
    gap: 1rem;
  }
  
  .tabs {
    overflow-x: auto;
    white-space: nowrap;
  }
}

@media (max-width: 480px) {
  .course-title {
    font-size: 1.75rem;
  }
  
  .rating-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .accordion-header {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .lecture-number, .lecture-duration {
    min-width: auto;
  }
}
</style>