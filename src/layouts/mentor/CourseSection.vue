<script>
export default {
  data() {
    return {
      showCourseForm: false,
      editingCourse: false,
      courses: [
        {
          id: 1,
          title: 'Introduction to Vue.js',
          category: 'Beginner',
          students: 45,
          description: 'Learn Vue basics including components, directives, and state management.',
          price: 29.99,
          imageUrl: 'https://via.placeholder.com/400x225?text=Vue.js',
        },
        {
          id: 2,
          title: 'Advanced Vue Patterns',
          category: 'Advanced',
          students: 32,
          description: 'Master advanced Vue techniques including custom directives, render functions, and performance optimization.',
          price: 49.99,
          imageUrl: 'https://via.placeholder.com/400x225?text=Advanced+Vue',
        },
        {
          id: 3,
          title: 'Vuex State Management',
          category: 'Intermediate',
          students: 28,
          description: 'Understand how to manage complex application state with Vuex.',
          price: 39.99,
          imageUrl: 'https://via.placeholder.com/400x225?text=Vuex',
        },
      ],
      newCourse: {
        title: '',
        description: '',
        category: 'Beginner',
        price: 0,
        imageUrl: '',
      },
    };
  },
  methods: {
    toggleCourseForm() {
      this.showCourseForm = !this.showCourseForm;
      if (!this.showCourseForm) {
        this.editingCourse = false;
        this.resetCourseForm();
      }
    },
    addCourse() {
      if (!this.newCourse.title || !this.newCourse.description) {
        this.$toast.error('Please fill all required fields');
        return;
      }
      const newCourse = {
        id: this.courses.length + 1,
        ...this.newCourse,
        students: 0,
        createdAt: new Date().toISOString(),
      };
      this.courses.push(newCourse);
      this.$toast.success('Course created successfully');
      this.resetCourseForm();
      this.showCourseForm = false;
    },
    editCourse(course) {
      this.newCourse = { ...course };
      this.editingCourse = true;
      this.showCourseForm = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    updateCourse() {
      const index = this.courses.findIndex((c) => c.id === this.newCourse.id);
      if (index !== -1) {
        this.courses.splice(index, 1, { ...this.newCourse });
        this.$toast.success('Course updated successfully');
        this.resetCourseForm();
        this.showCourseForm = false;
        this.editingCourse = false;
      }
    },
    resetCourseForm() {
      this.newCourse = {
        title: '',
        description: '',
        category: 'Beginner',
        price: 0,
        imageUrl: '',
      };
    },
    viewCourse(id) {
      this.$toast.info(`Viewing course ${id}`);
    },
    deleteItem(type, id) {
      if (type === 'course') {
        this.courses = this.courses.filter((c) => c.id !== id);
        this.$toast.success('Course deleted successfully');
      }
    },
    truncateDescription(text, length = 100) {
      return text.length > length ? text.substring(0, length) + '...' : text;
    },
  },
};
</script>

<template>
  <section class="tab-content">
    <div class="page-header">
      <div>
        <h1>Manage Courses</h1>
        <p class="subtitle">Create and manage your teaching courses</p>
      </div>
      <button @click="toggleCourseForm" class="btn btn-primary add-course-btn">
        <i class="fas" :class="showCourseForm ? 'fa-times' : 'fa-plus'"></i>
        <span>{{ showCourseForm ? 'Cancel' : 'Add New Course' }}</span>
      </button>
    </div>

    <!-- Add Course Form -->
    <transition name="fade">
      <div v-if="showCourseForm" class="form-container card">
        <h3>{{ editingCourse ? 'Edit Course' : 'Add New Course' }}</h3>
        <div class="form-group">
          <label>Title <span class="required">*</span></label>
          <input v-model="newCourse.title" type="text" placeholder="Course title" required />
        </div>
        <div class="form-group">
          <label>Description <span class="required">*</span></label>
          <textarea v-model="newCourse.description" rows="4" placeholder="Course description" required></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Category</label>
            <select v-model="newCourse.category" class="custom-select">
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Professional">Professional</option>
            </select>
          </div>
          <div class="form-group">
            <label>Price ($)</label>
            <input v-model.number="newCourse.price" type="number" min="0" step="0.01" class="price-input" />
          </div>
        </div>
        <div class="form-group">
          <label>Cover Image URL</label>
          <input v-model="newCourse.imageUrl" type="url" placeholder="https://example.com/image.jpg" />
        </div>
        <div class="form-actions">
          <button @click="resetCourseForm" type="button" class="btn btn-secondary">
            <i class="fas fa-undo"></i> Reset
          </button>
          <button @click="editingCourse ? updateCourse() : addCourse()" type="button" class="btn btn-primary">
            <i :class="editingCourse ? 'fas fa-save' : 'fas fa-plus'"></i>
            {{ editingCourse ? 'Update Course' : 'Save Course' }}
          </button>
        </div>
      </div>
    </transition>

    <!-- Courses List -->
    <div class="list-container">
      <div v-if="courses.length === 0 && !showCourseForm" class="empty-state card">
        <i class="fas fa-book-open"></i>
        <p>No courses found</p>
        <button @click="toggleCourseForm" class="btn btn-primary">Create Your First Course</button>
      </div>

      <div v-else class="grid-container">
        <div v-for="course in courses" :key="course.id" class="card course-card">
          <div class="card-image" v-if="course.imageUrl">
            <img :src="course.imageUrl" :alt="course.title" />
          </div>
          <div class="card-body">
            <div class="card-header">
              <h3>{{ course.title }}</h3>
              <span class="badge" :class="course.category.toLowerCase()">{{ course.category }}</span>
            </div>
            <p class="description">{{ truncateDescription(course.description) }}</p>
            <div class="card-footer">
              <div class="meta-info">
                <span class="students">
                  <i class="fas fa-users"></i> {{ course.students }} students
                </span>
                <span class="price" v-if="course.price > 0">
                  <i class="fas fa-dollar-sign"></i> {{ course.price.toFixed(2) }}
                </span>
                <span class="price free" v-else> Free </span>
              </div>
              <div class="actions">
                <button @click="editCourse(course)" class="btn btn-icon" aria-label="Edit course">
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="$emit('confirm-delete', 'course', course.id)"
                  class="btn btn-icon danger"
                  aria-label="Delete course"
                >
                  <i class="fas fa-trash"></i>
                </button>
                <button @click="viewCourse(course.id)" class="btn btn-icon success" aria-label="View course">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Base Button Styles */
.btn {
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
  text-align: center;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Primary Button (Add/Save Course) */
.btn-primary {
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  color: white;
}

/* Secondary Button (Reset) */
.btn-secondary {
  background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
  color: white;
}

/* Danger Button */
.btn-danger {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
}

/* Success Button */
.btn-success {
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  color: white;
}

/* Icon Button */
.btn-icon {
  background: none;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #7f8c8d;
}

.btn-icon:hover {
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
}

.btn-icon.danger:hover {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.btn-icon.success:hover {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
}

/* Course Section Specific Styles */
.add-course-btn {
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.course-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.card-image {
  height: 160px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
}

.course-card:hover .card-image img {
  transform: scale(1.05);
}

.card-body {
  padding: 1.25rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.card-header h3 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-right: 0.5rem;
}

.badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.badge.beginner {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
}

.badge.intermediate {
  background: rgba(241, 196, 15, 0.1);
  color: #f39c12;
}

.badge.advanced {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.description {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.meta-info {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #7f8c8d;
}

.price {
  font-weight: 600;
  color: #2c3e50;
}

.price.free {
  color: #2ecc71;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

/* Form Styles */
.form-container {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-row .form-group {
  flex: 1;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
}

.empty-state i {
  font-size: 3rem;
  color: #bdc3c7;
  margin-bottom: 1rem;
}

.empty-state p {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
}
</style>