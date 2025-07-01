<script setup>
defineProps({
  events: {
    type: Array,
    required: true
  },
  newEvent: {
    type: Object,
    required: true
  },
  editingEvent: {
    type: Object,
    required: false
  },
  isLoading: {
    type: Boolean,
    required: true
  }
});

defineEmits([
  'add-event',
  'start-editing-event',
  'update-event',
  'delete-event',
  'cancel-edit'
]);
</script>

<template>
  <div class="management-section">
    <div class="card">
      <div class="card-header">
        <h2>Add New Event</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="$emit('add-event')" class="form">
          <div class="form-grid">
            <div class="form-group">
              <label>Title</label>
              <input type="text" v-model="newEvent.title" required />
            </div>
            <div class="form-group">
              <label>Date & Time</label>
              <input type="datetime-local" v-model="newEvent.event_datetime" required />
            </div>
            <div class="form-group">
              <label>Location</label>
              <input type="text" v-model="newEvent.location" required />
            </div>
            <div class="form-group full-width">
              <label>Description</label>
              <textarea v-model="newEvent.description" rows="4" required></textarea>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Add Event</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-header">
        <h2>Upcoming Events</h2>
        <div class="header-actions">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search events..." />
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Date & Time</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(event, index) in events" :key="event.event_id">
                <td>{{ index + 1 }}</td>
                <td>{{ event.title }}</td>
                <td>{{ new Date(event.event_datetime).toLocaleString() }}</td>
                <td>{{ event.location }}</td>
                <td>
                  <div class="action-buttons">
                    <button @click="$emit('start-editing-event', event)" class="btn-icon edit" title="Edit">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button @click="$emit('delete-event', event.event_id)" class="btn-icon delete" title="Delete">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="editingEvent" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Edit Event</h3>
          <button @click="$emit('cancel-edit')" class="close-modal"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="$emit('update-event')" class="form">
            <div class="form-group">
              <label>Title</label>
              <input type="text" v-model="editingEvent.title" required />
            </div>
            <div class="form-group">
              <label>Date & Time</label>
              <input type="datetime-local" v-model="editingEvent.event_datetime" required />
            </div>
            <div class="form-group">
              <label>Location</label>
              <input type="text" v-model="editingEvent.location" required />
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea v-model="editingEvent.description" rows="4" required></textarea>
            </div>
            <div class="modal-actions">
              <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Save Changes</button>
              <button type="button" @click="$emit('cancel-edit')" class="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>