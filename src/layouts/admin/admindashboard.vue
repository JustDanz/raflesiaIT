<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import NavbarLogin from '../../components/navbarlogin.vue';
import FooterAll from '../../components/footerall.vue';
import AdminSidebar from './AdminSidebar.vue';
import DashboardSection from './DashboardSection.vue';
import UsersSection from './UserSection.vue';
import BlogsSection from './BlogSection.vue';
import CoursesSection from './CourseSection.vue';
import InstructorsSection from './InstructorSection.vue';
import EventsSection from './EventSection.vue';
import { useAdmin } from './useAdmin';

// State management
const activeSection = ref('dashboard');
const { 
  isLoading, 
  errors, 
  dataCache, 
  stats, 
  initializeData, 
  dashboardMessage, 
  newUser, 
  editingUser, 
  newBlog, 
  editingBlog, 
  newCourse, 
  editingCourse, 
  previewImage, 
  newInstructor, 
  editingInstructor, 
  instructorPreviewImage, 
  editInstructorPreviewImage, 
  newEvent, 
  editingEvent,
  addUser,
  startEditingUser,
  updateUser,
  deleteUser,
  addBlog,
  startEditingBlog,
  updateBlog,
  deleteBlog,
  addCourse,
  startEditingCourse,
  updateCourse,
  deleteCourse,
  resetNewCourseForm,
  addSyllabusItem,
  removeSyllabusItem,
  addEditSyllabusItem,
  removeEditSyllabusItem,
  addInstructor,
  startEditingInstructor,
  updateInstructor,
  deleteInstructor,
  resetNewInstructorForm,
  addEvent,
  startEditingEvent,
  updateEvent,
  deleteEvent,
  handleFileUpload,
  formatDate,
  getPageTitle
} = useAdmin();

// Auto-refresh
let refreshInterval = null;

onMounted(() => {
  initializeData();
  refreshInterval = setInterval(initializeData, 30000);
});

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});
</script>

<template>
  <div class="admin-layout">
    <NavbarLogin />
    
    <div class="admin-container">
      <AdminSidebar :activeSection="activeSection" @update-section="(section) => activeSection = section" />
      
      <main class="admin-content">
        <div class="content-header">
          <h1>{{ getPageTitle(activeSection) }}</h1>
          <div class="header-actions">
            <button class="notification-btn">
              <i class="fas fa-bell"></i>
              <span class="badge">3</span>
            </button>
            <div class="user-profile">
              <div class="avatar">AD</div>
              <div class="user-info">
                <span class="username">Admin User</span>
                <span class="role">Super Admin</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="errors.length" class="error-message">
          <p v-for="error in errors" :key="error">{{ error }}</p>
          <button @click="errors = []" class="close-btn"><i class="fas fa-times"></i></button>
        </div>

        <div class="content-wrapper">
          <DashboardSection v-if="activeSection === 'dashboard'" :dashboardMessage="dashboardMessage" :stats="stats" />
          <UsersSection 
            v-if="activeSection === 'users'" 
            :users="dataCache.users" 
            :newUser="newUser" 
            :editingUser="editingUser"
            :isLoading="isLoading"
            @add-user="addUser"
            @start-editing-user="startEditingUser"
            @update-user="updateUser"
            @delete-user="deleteUser"
            @cancel-edit="editingUser = null"
          />
          <BlogsSection 
            v-if="activeSection === 'blogs'" 
            :blogs="dataCache.blogs" 
            :newBlog="newBlog" 
            :editingBlog="editingBlog"
            :isLoading="isLoading"
            @add-blog="addBlog"
            @start-editing-blog="startEditingBlog"
            @update-blog="updateBlog"
            @delete-blog="deleteBlog"
            @cancel-edit="editingBlog = null"
            @file-upload="handleFileUpload"
            :formatDate="formatDate"
          />
          <CoursesSection 
            v-if="activeSection === 'courses'" 
            :courses="dataCache.courses" 
            :instructors="dataCache.instructors"
            :newCourse="newCourse" 
            :editingCourse="editingCourse"
            :previewImage="previewImage"
            :isLoading="isLoading"
            @add-course="addCourse"
            @start-editing-course="startEditingCourse"
            @update-course="updateCourse"
            @delete-course="deleteCourse"
            @cancel-edit="editingCourse = null"
            @file-upload="handleFileUpload"
            @reset-form="resetNewCourseForm"
            @add-syllabus-item="addSyllabusItem"
            @remove-syllabus-item="removeSyllabusItem"
            @add-edit-syllabus-item="addEditSyllabusItem"
            @remove-edit-syllabus-item="removeEditSyllabusItem"
          />
          <InstructorsSection 
            v-if="activeSection === 'instructors'" 
            :instructors="dataCache.instructors"
            :newInstructor="newInstructor" 
            :editingInstructor="editingInstructor"
            :instructorPreviewImage="instructorPreviewImage"
            :editInstructorPreviewImage="editInstructorPreviewImage"
            :isLoading="isLoading"
            @add-instructor="addInstructor"
            @start-editing-instructor="startEditingInstructor"
            @update-instructor="updateInstructor"
            @delete-instructor="deleteInstructor"
            @cancel-edit="editingInstructor = null"
            @file-upload="handleFileUpload"
            @reset-form="resetNewInstructorForm"
          />
          <EventsSection 
            v-if="activeSection === 'events'" 
            :events="dataCache.events"
            :newEvent="newEvent" 
            :editingEvent="editingEvent"
            :isLoading="isLoading"
            @add-event="addEvent"
            @start-editing-event="startEditingEvent"
            @update-event="updateEvent"
            @delete-event="deleteEvent"
            @cancel-edit="editingEvent = null"
          />
        </div>
      </main>
    </div>
  </div> 
</template>

<style scoped>
:root {
  --white: #fff;
  --light-bg: #f5f7fa;
  --primary: #3b82f6;
  --primary-light: #60a5fa;
  --primary-dark: #2563eb;
  --secondary: #6b7280;
  --secondary-dark: #4b5563;
  --accent: #10b981;
  --danger: #ef4444;
  --gray-100: #f1f5f9;
  --gray-200: #e2e8f0;
  --radius: 8px;
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.admin-container {
  display: flex;
  flex: 1;
}

.admin-content {
  flex: 1;
  background: var(--light-bg);
  padding: 2rem;
  margin-top: 200px;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--gray-200);
}

.content-header h1 {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--secondary-dark);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.notification-btn {
  position: relative;
  background: none;
  border: none;
  color: var(--secondary);
  font-size: 1.25rem;
  cursor: pointer;
  transition: var(--transition);
}

.notification-btn:hover {
  color: var(--primary);
}

.notification-btn .badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: var(--danger);
  color: var(--white);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.65rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: 500;
}

.role {
  font-size: 0.75rem;
  color: var(--secondary);
}

.content-wrapper {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  padding: 1.5rem;
}

.error-message {
  background-color: #fee2e2;
  padding: 1rem;
  border-radius: var(--radius);
  color: var(--danger);
  margin-bottom: 1.5rem;
  position: relative;
}

.close-btn {
  background: none;
  border: none;
  color: var(--danger);
  cursor: pointer;
  position: absolute;
  right: 1rem;
  top: 1rem;
}

.form {
  background-color: var(--white);
  padding: 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  margin-bottom: 2rem;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.form-group {
  margin-bottom: 1rem;
  padding-right: 15px;
  padding-left: 15px;
  flex: 0 0 100%;
  max-width: 100%;
}

.col-md-6 {
  flex: 0 0 50%;
  max-width: 50%;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius);
  transition: var(--transition);
}

.form-control:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-group.full-width {
  grid-column: span 2;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--secondary-dark);
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
input[type="url"],
select,
textarea {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius);
  transition: var(--transition);
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
input[type="number"]:focus,
input[type="url"]:focus,
select:focus,
textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

textarea {
  min-height: 150px;
}

.file-upload {
  position: relative;
}

.upload-label {
  display: block;
  padding: 0.625rem 0.75rem;
  border: 1px dashed var(--gray-200);
  border-radius: var(--radius);
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
}

.upload-label:hover {
  border-color: var(--primary);
  background: var(--gray-100);
}

.upload-label input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.form-actions {
  grid-column: span 2;
  display: flex;
  justify-content: flex-end;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--white);
  box-shadow: var(--shadow-sm);
}

.table th,
.table td {
  padding: 1rem;
  text-align: left;
}

.table th {
  background-color: var(--gray-100);
  font-weight: 600;
  color: var(--secondary-dark);
}

.table td {
  border-bottom: 1px solid var(--gray-200);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  background: var(--gray-100);
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--secondary-dark);
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid var(--gray-200);
  vertical-align: middle;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  transition: var(--transition);
}

.btn-primary {
  background-color: var(--primary);
  color: var(--white);
}

.btn-warning {
  background-color: #f59e0b;
  color: var(--white);
}

.btn-danger {
  background-color: var(--danger);
  color: var(--white);
}

.btn-success {
  background-color: var(--accent);
  color: var(--white);
}

.btn-secondary {
  background: var(--gray-200);
  color: var(--secondary-dark);
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.btn-secondary:hover {
  background: #cbd5e1;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge.bg-primary {
  background: var(--primary);
  color: var(--white);
}

.badge.bg-info {
  background: #0ea5e9;
  color: var(--white);
}

.badge.bg-secondary {
  background: var(--secondary);
  color: var(--white);
}

.badge.published {
  background: #dcfce7;
  color: #166534;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--white);
  padding: 2rem;
  border-radius: var(--radius);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
}

.close-modal {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--secondary);
  font-size: 1.25rem;
}

.modal-body {
  padding: 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.card {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.card-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--secondary-dark);
}

.card-body {
  padding: 1.5rem;
}

.search-box {
  position: relative;
  width: 250px;
}

.search-box i {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.search-box input {
  padding-left: 2.25rem;
  width: 100%;
}

.post-title {
  font-weight: 500;
}

.post-slug {
  color: var(--secondary);
  font-size: 0.875rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: var(--transition);
}

.btn-icon.view {
  background: #e0f2fe;
  color: #0369a1;
}

.btn-icon.edit {
  background: #fef3c7;
  color: #92400e;
}

.btn-icon.delete {
  background: #fee2e2;
  color: #b91c1c;
}

.btn-icon:hover {
  opacity: 0.9;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  gap: 0.5rem;
}

.page-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--gray-200);
  background: var(--white);
  cursor: pointer;
  transition: var(--transition);
}

.page-btn.active {
  background: var(--primary);
  color: var(--white);
  border-color: var(--primary);
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.current-image img {
  max-width: 200px;
  max-height: 150px;
  border-radius: var(--radius);
  margin-bottom: 1rem;
}

.syllabus-section {
  margin-top: 2rem;
  padding: 1rem;
  background-color: var(--gray-100);
  border-radius: var(--radius);
}

.syllabus-item {
  background-color: var(--white);
}

.embed-responsive {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
}

.embed-responsive::before {
  display: block;
  content: "";
}

.embed-responsive-16by9::before {
  padding-top: 56.25%;
}

.embed-responsive-item {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.img-thumbnail {
  padding: 0.25rem;
  background-color: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius);
  max-width: 100%;
  height: auto;
}

.instructor-photo {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
}

.no-photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--secondary);
  font-size: 0.8rem;
}

.mt-2 { margin-top: 0.5rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 1rem; }
.mt-4 { margin-top: 1.5rem; }
.p-3 { padding: 1rem; }
.border { border: 1px solid var(--gray-200) !important; }
.rounded { border-radius: var(--radius); }
.d-flex { display: flex; }
.justify-content-between { justify-content: space-between; }
.align-items-center { align-items: center; }
.text-muted { color: #6c757d !important; }

@media (max-width: 1024px) {
  .admin-sidebar {
    width: 240px;
  }
}

@media (max-width: 768px) {
  .admin-container {
    flex-direction: column;
  }
  .admin-sidebar {
    width: 100%;
  }
  .content-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
  .form-group.full-width {
    grid-column: span 1;
  }
  .form-group {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .search-box {
    width: 100%;
  }
  .data-table th,
  .data-table td {
    padding: 0.75rem;
  }
  .action-buttons {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>