<script setup>
defineProps({
  activeSection: {
    type: String,
    required: true
  }
});

defineEmits(['update-section']);
</script>

<template>
  <aside class="admin-sidebar">
    <div class="sidebar-header">
      <h2>Admin Panel</h2>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <li v-for="section in ['dashboard', 'users', 'blogs', 'courses', 'instructors', 'events']" :key="section">
          <a 
            href="#" 
            :class="{ active: activeSection === section }"
            @click.prevent="$emit('update-section', section)"
          >
            <i :class="{
              'fas fa-tachometer-alt': section === 'dashboard',
              'fas fa-users': section === 'users',
              'fas fa-blog': section === 'blogs',
              'fas fa-book': section === 'courses',
              'fas fa-chalkboard-teacher': section === 'instructors',
              'fas fa-calendar-alt': section === 'events'
            }"></i>
            {{ section.charAt(0).toUpperCase() + section.slice(1) }}
          </a>
        </li>
        <li class="logout">
          <a href="/logout">
            <i class="fas fa-sign-out-alt"></i> Logout
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.admin-sidebar {
  width: 280px;
  background: #1e293b;
  color: white;
  padding: 1.5rem 0;
  transition: var(--transition);
  margin-top: 180px;
}

.sidebar-header {
  padding: 0 1.5rem 1.5rem;
  border-bottom: 1px solid #334155;
}

.sidebar-header h2 {
  color: white;
  font-size: 1.8rem;
  margin: 0;
  font-weight: 600;
}

.sidebar-nav ul {
  list-style: none;
  padding: 1rem 0;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.2s ease;
}

.sidebar-nav a:hover,
.sidebar-nav a.active {
  background: #334155;
  color: white;
}

.sidebar-nav a i {
  margin-right: 0.75rem;
  width: 20px;
  text-align: center;
}

.sidebar-nav .logout a {
  color: #f87171;
}

.sidebar-nav .logout a:hover {
  background: #7f1d1d;
  color: white;
}

@media (max-width: 768px) {
  .admin-sidebar {
    width: 100%;
  }
  .sidebar-nav ul {
    display: flex;
    overflow-x: auto;
    padding: 0.5rem 0;
  }
  .sidebar-nav li {
    flex-shrink: 0;
  }
  .sidebar-nav a {
    padding: 0.5rem 1rem;
  }
}
</style>