<script setup>
defineProps({
  instructors: {
    type: Array,
    required: true
  },
  newInstructor: {
    type: Object,
    required: true
  },
  editingInstructor: {
    type: Object,
    required: false
  },
  instructorPreviewImage: {
    type: String,
    required: false
  },
  editInstructorPreviewImage: {
    type: String,
    required: false
  },
  isLoading: {
    type: Boolean,
    required: true
  }
});

defineEmits([
  'add-instructor',
  'start-editing-instructor',
  'update-instructor',
  'delete-instructor',
  'cancel-edit',
  'file-upload',
  'reset-form'
]);
</script>

<template>
  <div class="management-section">
    <div class="card">
      <div class="card-header">
        <h2>Add New Instructor</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="$emit('add-instructor')" class="form" enctype="multipart/form-data">
          <div class="form-grid">
            <div class="form-group">
              <label>Name</label>
              <input type="text" v-model="newInstructor.name" required />
            </div>
            <div class="form-group">
              <label>Expertise</label>
              <input type="text" v-model="newInstructor.expertise" required />
            </div>
            <div class="form-group">
              <label>Photo</label>
              <div class="file-upload">
                <label class="upload-label">
                  <input type="file" @change="$emit('file-upload', $event, 'instructor')" accept=".jpg,.jpeg,.png,.gif" />
                  <span v-if="!newInstructor.photo">Choose File</span>
                  <span v-else>{{ newInstructor.photo.name }}</span>
                </label>
              </div>
              <div v-if="instructorPreviewImage" class="mt-2">
                <img :src="instructorPreviewImage" class="img-thumbnail" style="max-width: 200px;" />
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Add Instructor</button>
              <button type="button" @click="$emit('reset-form')" class="btn btn-secondary">Reset</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-header">
        <h2>Instructors</h2>
        <div class="header-actions">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search instructors..." />
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Expertise</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(instructor, index) in instructors" :key="instructor.instructors_id">
                <td>{{ index + 1 }}</td>
                <td>
                  <div v-if="instructor.photo_url">
                    <img :src="`/uploads/instructors/${instructor.photo_url}`" class="instructor-photo" />
                  </div>
                  <div v-else class="no-photo">
                    No Photo
                  </div>
                </td>
                <td>{{ instructor.name }}</td>
                <td>{{ instructor.expertise }}</td>
                <td>
                  <div class="action-buttons">
                    <button @click="$emit('start-editing-instructor', instructor)" class="btn-icon edit" title="Edit">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button @click="$emit('delete-instructor', instructor.instructors_id)" class="btn-icon delete" title="Delete">
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

    <div v-if="editingInstructor" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Edit Instructor</h3>
          <button @click="$emit('cancel-edit')" class="close-modal"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="$emit('update-instructor')" class="form" enctype="multipart/form-data">
            <div class="form-group">
              <label>Name</label>
              <input type="text" v-model="editingInstructor.name" required />
            </div>
            <div class="form-group">
              <label>Expertise</label>
              <input type="text" v-model="editingInstructor.expertise" required />
            </div>
            <div class="form-group">
              <label>Current Photo</label>
              <div v-if="editInstructorPreviewImage" class="current-image">
                <img :src="editInstructorPreviewImage" class="img-thumbnail" style="max-width: 200px;" />
              </div>
              <div v-else class="no-photo">
                No Photo
              </div>
              <label>Update Photo (optional)</label>
              <div class="file-upload">
                <label class="upload-label">
                  <input type="file" @change="$emit('file-upload', $event, 'instructor', true)" accept=".jpg,.jpeg,.png,.gif" />
                  <span v-if="!editingInstructor.photo">Choose New File</span>
                  <span v-else>{{ editingInstructor.photo.name }}</span>
                </label>
              </div>
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