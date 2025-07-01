<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  userProfile: {
    type: Object,
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['change-tab'])
</script>

<template>
  <div class="profile-sidebar">
    <div class="profile-card">
      <div class="avatar-container">
        <img :src="userProfile.avatar" alt="User Avatar" class="avatar" />
        <button class="edit-avatar-btn">
          <i class="fas fa-camera"></i>
        </button>
      </div>
      <h2>{{ userProfile.name }}</h2>
      <p>{{ userProfile.email }}</p>
      <p class="join-date">Member since {{ userProfile.joinDate }}</p>
    </div>

    <nav class="dashboard-nav">
      <button
        @click="emit('change-tab', 'courses')"
        :class="{ active: activeTab === 'courses' }"
      >
        <i class="fas fa-book-open"></i> My Courses
      </button>
      <button
        @click="emit('change-tab', 'completed')"
        :class="{ active: activeTab === 'completed' }"
      >
        <i class="fas fa-check-circle"></i> Completed
      </button>
      <button
        @click="emit('change-tab', 'certificates')"
        :class="{ active: activeTab === 'certificates' }"
      >
        <i class="fas fa-award"></i> Certificates
      </button>
       <button
    @click="emit('change-tab', 'transactions')"
    :class="{ active: activeTab === 'transactions' }"
  >
    <i class="fas fa-receipt"></i> Transactions
  </button>
      <button
        @click="emit('change-tab', 'settings')"
        :class="{ active: activeTab === 'settings' }"
      >
        <i class="fas fa-cog"></i> Settings
      </button>
    </nav>
  </div>
</template>

<style scoped>
.profile-sidebar {
  width: 300px;
  flex-shrink: 0;
}

.profile-card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
  transition: var(--transition);
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.avatar-container {
  position: relative;
  margin: 0 auto 1.5rem;
  width: 120px;
  height: 120px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--light-gray);
}

.edit-avatar-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
}

.edit-avatar-btn:hover {
  background: var(--secondary-color);
  transform: scale(1.1);
}

.profile-card h2 {
  margin: 0.5rem 0 0;
  color: var(--dark-color);
  font-size: 1.3rem;
  font-weight: 600;
}

.profile-card p {
  margin: 0.25rem 0;
  color: var(--gray-color);
  font-size: 0.9rem;
}

.join-date {
  margin-top: 1rem !important;
  color: #adb5bd !important;
  font-size: 0.8rem !important;
}

.dashboard-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1rem;
}

.dashboard-nav button {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  border: none;
  background: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  color: var(--gray-color);
  font-weight: 500;
  transition: var(--transition);
  font-size: 0.95rem;
}

.dashboard-nav button:hover {
  background: var(--light-gray);
  color: var(--dark-color);
}

.dashboard-nav button.active {
  background: var(--primary-light);
  color: var(--primary-color);
  font-weight: 600;
}

.dashboard-nav button i {
  width: 20px;
  text-align: center;
  font-size: 1rem;
}
</style>