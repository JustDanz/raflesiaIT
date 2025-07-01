<script>
export default {
  data() {
    return {
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        bio: 'Vue.js expert with 5 years of experience teaching web development',
        expertise: 'Vue.js, JavaScript, Frontend Development',
      },
      password: {
        current: '',
        new: '',
        confirm: '',
      },
      notifications: {
        email: true,
        system: true,
        promotions: false,
      },
    };
  },
  methods: {
    saveProfile() {
      this.$toast.success('Profile updated successfully');
    },
    changePassword() {
      if (this.password.new !== this.password.confirm) {
        this.$toast.error('New passwords do not match');
        return;
      }
      this.$toast.success('Password changed successfully');
      this.password = { current: '', new: '', confirm: '' };
    },
    exportData() {
      this.$toast.info('Exporting your data...');
    },
  },
};
</script>

<template>
  <section class="tab-content">
    <div class="page-header">
      <div>
        <h1>Account Settings</h1>
        <p class="subtitle">Manage your profile and preferences</p>
      </div>
    </div>

    <div class="settings-container">
      <div class="settings-card card">
        <h2><i class="fas fa-user-cog"></i> Profile Information</h2>
        <form @submit.prevent="saveProfile">
          <div class="form-row">
            <div class="form-group">
              <label>First Name</label>
              <input v-model="profile.firstName" type="text" />
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input v-model="profile.lastName" type="text" />
            </div>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="profile.email" type="email" disabled />
          </div>
          <div class="form-group">
            <label>Bio</label>
            <textarea v-model="profile.bio" rows="4" placeholder="Tell us about yourself"></textarea>
          </div>
          <div class="form-group">
            <label>Expertise</label>
            <input v-model="profile.expertise" type="text" placeholder="Your areas of expertise" />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">
              <i class="fas fa-save"></i> Save Profile
            </button>
          </div>
        </form>
      </div>

      <div class="settings-card card">
        <h2><i class="fas fa-lock"></i> Security</h2>
        <form @submit.prevent="changePassword">
          <div class="form-group">
            <label>Current Password</label>
            <input v-model="password.current" type="password" />
          </div>
          <div class="form-group">
            <label>New Password</label>
            <input v-model="password.new" type="password" />
          </div>
          <div class="form-group">
            <label>Confirm New Password</label>
            <input v-model="password.confirm" type="password" />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">
              <i class="fas fa-key"></i> Change Password
            </button>
          </div>
        </form>
      </div>

      <div class="settings-card card">
        <h2><i class="fas fa-bell"></i> Notifications</h2>
        <div class="notification-settings">
          <div class="setting-item">
            <div class="setting-info">
              <h3>Email Notifications</h3>
              <p>Receive email updates about your courses and students</p>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="notifications.email" />
              <span class="slider round"></span>
            </label>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <h3>System Messages</h3>
              <p>Get important platform notifications</p>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="notifications.system" />
              <span class="slider round"></span>
            </label>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <h3>Promotional Offers</h3>
              <p>Receive offers and discounts for mentor tools</p>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="notifications.promotions" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      <div class="settings-card card danger-zone">
        <h2><i class="fas fa-exclamation-triangle"></i> Danger Zone</h2>
        <div class="danger-actions">
          <button @click="$emit('confirm-account-deletion')" class="btn-danger">
            <i class="fas fa-trash"></i> Delete Account
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.settings-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.settings-card {
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.notification-settings {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #ecf0f1;
}

.setting-info h3 {
  font-size: 1rem;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.setting-info p {
  font-size: 0.85rem;
  color: #7f8c8d;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #bdc3c7;
  transition: all 0.3s ease;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: all 0.3s ease;
}

input:checked + .slider {
  background-color: #3498db;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 24px;
}

.slider.round:before {
  border-radius: 50%;
}

.danger-zone {
  border: 1px solid rgba(231, 76, 60, 0.3);
}

.danger-zone h2 {
  color: #e74c3c;
}

.danger-actions {
  display: flex;
  justify-content: flex-end;
}
.btn-primary {
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  color: white;
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
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  background: #ecf0f1;
  color: #2c3e50;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-secondary:hover {
  background: #d5dbdb;
}

.btn-danger {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
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
}

.btn-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

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
</style>