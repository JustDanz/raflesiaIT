<script setup>
import { useAdmin } from './useAdmin';

const { getYoutubeEmbedUrl } = useAdmin();

defineProps({
  courses: {
    type: Array,
    required: true
  },
  instructors: {
    type: Array,
    required: true
  },
  cybersecurityTools: { // Prop baru untuk daftar tools cybersecurity
    type: Array,
    required: true,
    default: () => [
      { id: 1, name: 'Nmap' },
      { id: 2, name: 'Wireshark' },
      { id: 3, name: 'Metasploit' },
      { id: 4, name: 'Burp Suite' },
      { id: 5, name: 'John the Ripper' }
    ]
  },
  newCourse: {
    type: Object,
    required: true
  },
  editingCourse: {
    type: Object,
    required: false
  },
  previewImage: {
    type: String,
    required: false
  },
  isLoading: {
    type: Boolean,
    required: true
  }
});

defineEmits([
  'add-course', 
  'start-editing-course', 
  'update-course', 
  'delete-course', 
  'cancel-edit', 
  'file-upload',
  'reset-form',
  'add-syllabus-item',
  'remove-syllabus-item',
  'add-edit-syllabus-item',
  'remove-edit-syllabus-item'
]);
</script>

<template>
  <div class="management-section">
    <h2>Add New Course</h2>
    <form @submit.prevent="$emit('add-course')" class="form" enctype="multipart/form-data">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Title</label>
          <input type="text" class="form-control" v-model="newCourse.title" required />
        </div>
        <div class="form-group col-md-6">
          <label>Price (IDR)</label>
          <input type="number" class="form-control" v-model="newCourse.price" required min="0" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Level</label>
          <select class="form-control" v-model="newCourse.level" required>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div class="form-group col-md-6">
          <label>Instructor</label>
          <select class="form-control" v-model="newCourse.instructor_id" required>
            <option value="">Select Instructor</option>
            <option v-for="instructor in instructors" :key="instructor.instructors_id" :value="instructor.instructors_id">{{ instructor.name }}</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Cybersecurity Tool</label>
          <select class="form-control" v-model="newCourse.cybersecurity_tool_id" required>
            <option value="">Select Cybersecurity Tool</option>
            <option v-for="tool in cybersecurityTools" :key="tool.id" :value="tool.id">{{ tool.name }}</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea class="form-control" v-model="newCourse.description" rows="4"></textarea>
      </div>
      <div class="form-group">
        <label>Thumbnail Image</label>
        <input type="file" class="form-control" @change="$emit('file-upload', $event, 'course')" accept="image/*" />
        <div v-if="previewImage" class="image-preview mt-2">
          <img :src="previewImage" alt="Preview" class="img-thumbnail" style="max-width: 200px; max-height: 200px;" />
        </div>
      </div>
      <div class="syllabus-section">
        <h3>Syllabus</h3>
        <div v-for="(item, index) in newCourse.syllabus" :key="index" class="syllabus-item mb-3 p-3 border rounded">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5>Item {{ index + 1 }}</h5>
            <button type="button" class="btn btn-sm btn-danger" @click="$emit('remove-syllabus-item', index)" v-if="newCourse.syllabus.length > 1">
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label>Title</label>
              <input type="text" class="form-control" v-model="item.title" required />
            </div>
            <div class="form-group col-md-6">
              <label>Duration (minutes)</label>
              <input type="number" class="form-control" v-model="item.duration" min="1" required />
            </div>
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea class="form-control" v-model="item.description" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>YouTube Video URL</label>
            <input type="url" class="form-control" v-model="item.video_url" placeholder="https://www.youtube.com/watch?v=..." />
            <small class="form-text text-muted">Paste the full YouTube URL here</small>
            <div v-if="item.video_url" class="video-preview mt-2">
              <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" :src="getYoutubeEmbedUrl(item.video_url)" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-secondary mb-3" @click="$emit('add-syllabus-item')">
          <i class="fas fa-plus"></i> Add Syllabus Item
        </button>
      </div>
      <button type="submit" class="btn btn-success"><i class="fas fa-save"></i> Add Course</button>
    </form>

    <h2 class="mt-4">Course List</h2>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price</th>
            <th>Level</th>
            <th>Instructor</th>
            <th>Cybersecurity Tool</th> <!-- Kolom baru -->
            <th>Syllabus Items</th>
            <th>Thumbnail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(course, index) in courses" :key="course.course_id">
            <td>{{ index + 1 }}</td>
            <td>{{ course.course_title }}</td>
            <td>{{ course.price.toLocaleString('id-ID') }}</td>
            <td>{{ course.level }}</td>
            <td>{{ course.instructor_name }}</td>
            <td>{{ course.cybersecurity_tool_name || 'N/A' }}</td> <!-- Kolom baru -->
            <td>{{ course.syllabus ? JSON.parse(course.syllabus).length : 0 }}</td>
            <td>
              <img v-if="course.thumbnail_url" :src="course.thumbnail_url" alt="Thumbnail" style="max-width: 50px; max-height: 50px;" />
            </td>
            <td>
              <button class="btn btn-sm btn-warning me-1" @click="$emit('start-editing-course', course)"><i class="fas fa-edit"></i></button>
              <button class="btn btn-sm btn-danger" @click="$emit('delete-course', course.course_id)"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="editingCourse" class="modal">
      <div class="modal-content">
        <h2>Edit Course</h2>
        <form @submit.prevent="$emit('update-course')" class="form" enctype="multipart/form-data">
          <div class="form-row">
            <div class abandonment="form-group col-md-6">
              <label>Title</label>
              <input type="text" class="form-control" v-model="editingCourse.title" required />
            </div>
            <div class="form-group col-md-6">
              <label>Price (IDR)</label>
              <input type="number" class="form-control" v-model="editingCourse.price" required min="0" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label>Level</label>
              <select class="form-control" v-model="editingCourse.level" required>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div class="form-group col-md-6">
              <label>Instructor</label>
              <select class="form-control" v-model="editingCourse.instructor_id" required>
                <option value="">Select Instructor</option>
                <option v-for="instructor in instructors" :key="instructor.instructors_id" :value="instructor.instructors_id">{{ instructor.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label>Cybersecurity Tool</label>
              <select class="form-control" v-model="editingCourse.cybersecurity_tool_id" required>
                <option value="">Select Cybersecurity Tool</option>
                <option v-for="tool in cybersecurityTools" :key="tool.id" :value="tool.id">{{ tool.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea class="form-control" v-model="editingCourse.description" rows="4"></textarea>
          </div>
          <div class="form-group">
            <label>Thumbnail Image</label>
            <input type="file" class="form-control" @change="$emit('file-upload', $event, 'course', true)" accept="image/*" />
            <div v-if="editingCourse.thumbnailPreview" class="image-preview mt-2">
              <img :src="editingCourse.thumbnailPreview" alt="Preview" class="img-thumbnail" style="max-width: 200px; max-height: 200px;" />
            </div>
          </div>
          <div class="syllabus-section">
            <h3>Syllabus</h3>
            <div v-for="(item, index) in editingCourse.syllabus" :key="index" class="syllabus-item mb-3 p-3 border rounded">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h5>Item {{ index + 1 }}</h5>
                <button type="button" class="btn btn-sm btn-danger" @click="$emit('remove-edit-syllabus-item', index)" v-if="editingCourse.syllabus.length > 1">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label>Title</label>
                  <input type="text" class="form-control" v-model="item.title" required />
                </div>
                <div class="form-group col-md-6">
                  <label>Duration (minutes)</label>
                  <input type="number" class="form-control" v-model="item.duration" min="1" required />
                </div>
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea class="form-control" v-model="item.description" rows="3"></textarea>
              </div>
              <div class="form-group">
                <label>YouTube Video URL</label>
                <input type="url" class="form-control" v-model="item.video_url" placeholder="https://www.youtube.com/watch?v=..." />
                <small class="form-text text-muted">Paste the full YouTube URL here</small>
                <div v-if="item.video_url" class="video-preview mt-2">
                  <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" :src="getYoutubeEmbedUrl(item.video_url)" allowfullscreen></iframe>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" class="btn btn-secondary mb-3" @click="$emit('add-edit-syllabus-item')">
              <i class="fas fa-plus"></i> Add Syllabus Item
            </button>
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