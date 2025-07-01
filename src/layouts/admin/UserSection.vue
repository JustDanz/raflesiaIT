<script setup>
defineProps({
  users: {
    type: Array,
    required: true
  },
  newUser: {
    type: Object,
    required: true
  },
  editingUser: {
    type: Object,
    required: false
  },
  isLoading: {
    type: Boolean,
    required: true
  }
});

defineEmits(['add-user', 'start-editing-user', 'update-user', 'delete-user', 'cancel-edit']);
</script>

<template>
  <div class="management-section">
    <h2>Add New User</h2>
    <form @submit.prevent="$emit('add-user')" class="form">
      <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" v-model="newUser.username" required />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control" v-model="newUser.email" required />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model="newUser.password" required />
      </div>
      <div class="form-group">
        <label>Role</label>
        <select class="form-control" v-model="newUser.role" required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="superuser">Superuser</option>
        </select>
      </div>
      <button type="submit" class="btn btn-success"><i class="fas fa-save"></i> Add User</button>
    </form>

    <h2 class="mt-4">User List</h2>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.user_id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td><span :class="`badge ${user.role === 'admin' ? 'bg-primary' : user.role === 'superuser' ? 'bg-info' : 'bg-secondary'}`">{{ user.role }}</span></td>
            <td>
              <button class="btn btn-sm btn-warning me-1" @click="$emit('start-editing-user', user)"><i class="fas fa-edit"></i></button>
              <button class="btn btn-sm btn-danger" @click="$emit('delete-user', user.user_id)"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="editingUser" class="modal">
      <div class="modal-content">
        <h2>Edit User</h2>
        <form @submit.prevent="$emit('update-user')" class="form">
          <div class="form-group">
            <label>Username</label>
            <input type="text" class="form-control" v-model="editingUser.username" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="editingUser.email" required />
          </div>
          <div class="form-group">
            <label>Role</label>
            <select class="form-control" v-model="editingUser.role" required>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superuser">Superuser</option>
            </select>
          </div>
          <div class="form-group">
            <label>New Password (leave blank to keep current)</label>
            <input type="password" class="form-control" v-model="editingUser.password" />
          </div>
          <div class="modal-actions">
            <button type="submit" class="btn btn-success"><i class="fas fa-save"></i> Save</button>
            <button type="button" class="btn btn-secondary" @click="$emit('cancel-edit')">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>