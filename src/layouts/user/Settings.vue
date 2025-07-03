<script setup>
import { defineProps } from 'vue'

defineProps({
  userProfile: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="tab-content">
    <div class="content-header">
      <h2><i class="fas fa-cog header-icon"></i> Account Settings</h2>
      <p class="subtitle">Manage your account</p>
    </div>

    <div class="settings-form">
      <div class="form-section">
        <h3><i class="fas fa-user"></i> Profile Information</h3>
        <div class="form-group">
          <label>Full Name</label>
          <div class="input-with-icon">
            <i class="fas fa-user input-icon"></i>
            <input type="text" :value="userProfile.name" />
          </div>
        </div>
        <div class="form-group">
          <label>Email Address</label>
          <div class="input-with-icon">
            <i class="fas fa-envelope input-icon"></i>
            <input type="email" :value="userProfile.email" disabled />
          </div>
        </div>
        <button class="save-btn">
          <i class="fas fa-save"></i> Update Profile
        </button>
      </div>

      <div class="form-section">
        <h3><i class="fas fa-lock"></i> Change Password</h3>
        <div class="form-group">
          <label>Current Password</label>
          <div class="input-with-icon">
            <i class="fas fa-key input-icon"></i>
            <input type="password" placeholder="Current Password" />
          </div>
        </div>
        <div class="form-group">
          <label>New Password</label>
          <div class="input-with-icon">
            <i class="fas fa-key input-icon"></i>
            <input type="password" placeholder="New Password" />
          </div>
        </div>
        <div class="form-group">
          <label>Confirm New Password</label>
          <div class="input-with-icon">
            <i class="fas fa-key input-icon"></i>
            <input type="password" placeholder="Confirm New Password" />
          </div>
        </div>
        <button class="save-btn">
          <i class="fas fa-save"></i> Update Password
        </button>
      </div>

      <div class="danger-zone">
        <h3><i class="fas fa-exclamation-triangle"></i> Danger Zone</h3>
        <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
        <button class="delete-account-btn">
          <i class="fas fa-trash-alt"></i> Delete Account
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.settings-form {
  max-width: 700px;
}

.form-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--light-gray);
}

.form-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.form-section h3 {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  color: var(--dark-color);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.form-section h3 i {
  color: var(--primary-color);
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--dark-color);
  font-weight: 500;
}

.input-with-icon {
  position: relative;
}

.input-with-icon i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-color);
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--light-gray);
  border-radius: 6px;
  font-size: 0.9rem;
  transition: var(--transition);
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
}

.save-btn {
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.save-btn:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
}

.danger-zone {
  margin-top: 3rem;
  padding: 1.5rem;
  background: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: var(--border-radius);
}

.danger-zone h3 {
  margin: 0 0 0.75rem;
  color: var(--danger-color);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.danger-zone p {
  margin: 0 0 1.5rem;
  color: var(--gray-color);
  font-size: 0.9rem;
  line-height: 1.5;
}

.delete-account-btn {
  padding: 0.75rem 1.5rem;
  background: #d11466;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.delete-account-btn:hover {
  background: #d11466;
  transform: translateY(-2px);
}
</style>