<script>
import NavbarLogin from '../../components/navbarlogin.vue';
import FooterAll from '../../components/footerall.vue';
import CoursesSection from '../mentor/CourseSection.vue';
import BlogsSection from '../mentor/BlogsSection.vue';
import EventsSection from '../mentor/EventsSection.vue';
import SettingsSection from '../mentor/SettingsSection.vue';
import ConfirmationModal from '../mentor/ConfirmationModal.vue';

export default {
  components: {
    NavbarLogin,
    FooterAll,
    CoursesSection,
    BlogsSection,
    EventsSection,
    SettingsSection,
    ConfirmationModal,
  },
  data() {
    return {
      activeTab: 'courses',
      sidebarOpen: true,
      tabs: [
        { id: 'courses', icon: 'fas fa-book', label: 'Courses' },
        { id: 'blogs', icon: 'fas fa-blog', label: 'Blogs' },
        { id: 'events', icon: 'fas fa-calendar-alt', label: 'Events' },
        { id: 'settings', icon: 'fas fa-cog', label: 'Settings' },
      ],
      showConfirmationModal: false,
      confirmationMessage: '',
      itemTypeToDelete: '',
      itemIdToDelete: null,
    };
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
    },
    confirmDelete(type, id) {
      this.itemTypeToDelete = type;
      this.itemIdToDelete = id;
      this.confirmationMessage = `Are you sure you want to delete this ${type}? This action cannot be undone.`;
      this.showConfirmationModal = true;
    },
    executeConfirmedAction() {
      this.$emit('delete-item', this.itemTypeToDelete, this.itemIdToDelete);
      this.showConfirmationModal = false;
    },
    confirmAccountDeletion() {
      this.confirmationMessage = 'Are you sure you want to delete your account? All your data will be permanently removed.';
      this.showConfirmationModal = true;
    },
  },
};
</script>

<template>
  <div>
    <NavbarLogin />
    <div class="dashboard-container">
      <!-- Sidebar -->
      <aside :class="['sidebar', { 'sidebar-collapsed': !sidebarOpen }]">
        <div class="sidebar-header">
          <h3 v-if="sidebarOpen">Mentor Menu</h3>
          <button @click="sidebarOpen = !sidebarOpen" class="toggle-btn" aria-label="Toggle sidebar">
            <i :class="sidebarOpen ? 'fas fa-chevron-left' : 'fas fa-chevron-right'"></i>
          </button>
        </div>
        <nav class="sidebar-nav">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="switchTab(tab.id)"
            :class="{ active: activeTab === tab.id }"
            :aria-label="tab.label"
          >
            <i :class="tab.icon"></i>
            <span v-if="sidebarOpen">{{ tab.label }}</span>
            <span v-if="!sidebarOpen" class="tooltip">{{ tab.label }}</span>
          </button>
        </nav>
        <div v-if="sidebarOpen" class="sidebar-footer">
          <p>Mentor Dashboard v1.0</p>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <CoursesSection v-if="activeTab === 'courses'" @confirm-delete="confirmDelete" @delete-item="deleteItem" />
        <BlogsSection v-if="activeTab === 'blogs'" @confirm-delete="confirmDelete" @delete-item="deleteItem" />
        <EventsSection v-if="activeTab === 'events'" @confirm-delete="confirmDelete" @delete-item="deleteItem" />
        <SettingsSection v-if="activeTab === 'settings'" @confirm-account-deletion="confirmAccountDeletion" />
      </main>
    </div>

    <!-- Confirmation Modal -->
    <ConfirmationModal
      v-if="showConfirmationModal"
      :message="confirmationMessage"
      @cancel="showConfirmationModal = false"
      @confirm="executeConfirmedAction"
    />
  </div>
</template>

<style scoped>

.btn-primary {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
}

.btn-danger {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
}

/* Dashboard Layout */
.dashboard-container {
  display: flex;
  min-height: calc(100vh - 120px);
  margin-top: 100px;
}

/* Sidebar Styles */
.sidebar {
  width: 250px;
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  color: white;
  transition: all 0.3s ease;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: calc(100vh - 60px);
  z-index: 100;
  margin-top: 80px;
}

.sidebar-collapsed {
  width: 70px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}
.sidebar-header h3 {
  color: white;

}

.sidebar-nav button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.25rem;
  border-radius: 8px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;
}

.sidebar-nav button:hover {
  background: rgba(255,255,255,0.15);
}

.sidebar-nav button.active {
  background: rgba(255,255,255,0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.sidebar-nav button i {
  font-size: 1.1rem;
  min-width: 20px;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
}

.tooltip {
  display: none;
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: #2c3e50;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  white-space: nowrap;
  margin-left: 0.5rem;
  z-index: 1000;
}

.sidebar-collapsed .sidebar-nav button:hover .tooltip {
  display: block;
}

/* Main Content */
.main-content {
  margin-left: 250px;
  flex-grow: 1;
  padding: 2rem;
  transition: all 0.3s ease;
  margin-top: 80px;
}

.sidebar-collapsed + .main-content {
  margin-left: 70px;
}

/* Tab Content Styles */
.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive Styles */
@media (max-width: 992px) {
  .sidebar {
    width: 70px;
  }
  
  .sidebar-header h3,
  .sidebar-nav button span {
    display: none;
  }
  
  .main-content {
    margin-left: 70px;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    flex-direction: row;
    padding: 0.5rem;
  }
  
  .sidebar-nav {
    display: flex;
    overflow-x: auto;
  }
  
  .sidebar-nav button {
    flex-direction: column;
    padding: 0.5rem;
    font-size: 0.8rem;
    gap: 0.25rem;
  }
  
  .main-content {
    margin-left: 0;
    padding: 1.5rem;
  }
}
</style>