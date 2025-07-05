<script setup>
import { useAdmin } from './useAdmin';
import { onMounted, ref } from 'vue';

const { getYoutubeEmbedUrl } = useAdmin();

const props = defineProps({
  courses: {
    type: Array,
    required: true
  },
  instructors: {
    type: Array,
    required: true
  },
  cybersecurityTools: {
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
    required: false,
    default: null
  },
  previewImage: {
    type: String,
    required: false,
    default: null
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

// Choices.js instance ref
const toolsSelect = ref(null);
const categorySelect = ref(null);

// Course categories
const courseCategories = ref([
  { id: 1, name: 'Ethical Hacking' },
  { id: 2, name: 'Network Security' },
  { id: 3, name: 'Cryptography' },
  { id: 4, name: 'Penetration Testing' },
  { id: 5, name: 'Forensics' },
  { id: 6, name: 'Secure Coding' }
]);

// Initialize Choices.js
onMounted(() => {
  // Initialize tools select
  if (document.getElementById('cybersecurity-tools-select')) {
    toolsSelect.value = new Choices('#cybersecurity-tools-select', {
      removeItemButton: true,
      searchEnabled: true,
      duplicateItemsAllowed: false,
      placeholder: true,
      placeholderValue: 'Select tools...',
      searchPlaceholderValue: 'Search tools...'
    });

    // Initialize category select
    categorySelect.value = new Choices('#course-category-select', {
      searchEnabled: true,
      placeholder: true,
      placeholderValue: 'Select category...',
      searchPlaceholderValue: 'Search category...',
      shouldSort: false
    });
  }
});

// Update newCourse when tools selection changes
const updateSelectedTools = () => {
  if (toolsSelect.value) {
    const selectedValues = toolsSelect.value.getValue(true);
    props.newCourse.cybersecurity_tool_ids = selectedValues.map(item => item.value);
  }
};

// Update newCourse when category selection changes
const updateSelectedCategory = () => {
  if (categorySelect.value) {
    const selectedValue = categorySelect.value.getValue(true);
    props.newCourse.category_id = selectedValue.length > 0 ? selectedValue[0].value : null;
  }
};
</script>

<template>
  <div class="course-management">
    <!-- Add New Course Section -->
    <div class="card mb-4">
      <div class="card-header">
        <h2 class="card-title">
          <i class="fas fa-plus-circle text-primary"></i>
          Add New Course
        </h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="$emit('add-course')" class="needs-validation" novalidate>
          <!-- Basic Information -->
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-3">
                <label class="form-label required">Course Title</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="newCourse.title" 
                  required 
                  placeholder="Enter course title"
                />
                <div class="invalid-feedback">
                  Please provide a valid course title.
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-3">
                <label class="form-label required">Price (IDR)</label>
                <div class="input-group">
                  <span class="input-group-text">Rp</span>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model="newCourse.price" 
                    required 
                    min="0"
                    placeholder="0"
                  />
                </div>
                <div class="invalid-feedback">
                  Please provide a valid price.
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <div class="form-group mb-3">
                <label class="form-label required">Level</label>
                <select class="form-select" v-model="newCourse.level" required>
                  <option value="">Select Level</option>
                  <option value="Beginner">🟢 Beginner</option>
                  <option value="Intermediate">🟡 Intermediate</option>
                  <option value="Advanced">🔴 Advanced</option>
                </select>
                <div class="invalid-feedback">
                  Please select a course level.
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-3">
                <label class="form-label required">Instructor</label>
                <select class="form-select" v-model="newCourse.instructor_id" required>
                  <option value="">Select Instructor</option>
                  <option 
                    v-for="instructor in instructors" 
                    :key="instructor.instructors_id" 
                    :value="instructor.instructors_id"
                  >
                    {{ instructor.name }}
                  </option>
                </select>
                <div class="invalid-feedback">
                  Please select an instructor.
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-3">
                <label class="form-label required">Category</label>
                <select 
                  id="course-category-select"
                  class="form-select"
                  @change="updateSelectedCategory"
                  required
                >
                  <option value="">Select Category</option>
                  <option 
                    v-for="category in courseCategories" 
                    :key="category.id" 
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
                <div class="invalid-feedback">
                  Please select a category.
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="form-group mb-3">
                <label class="form-label required">Cybersecurity Tools</label>
                <select 
                  id="cybersecurity-tools-select"
                  class="form-select"
                  multiple
                  @change="updateSelectedTools"
                  required
                >
                  <option 
                    v-for="tool in cybersecurityTools" 
                    :key="tool.id" 
                    :value="tool.id"
                  >
                    🔧 {{ tool.name }}
                  </option>
                </select>
                <div class="invalid-feedback">
                  Please select at least one tool.
                </div>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="form-group mb-3">
            <label class="form-label">Description</label>
            <textarea 
              class="form-control" 
              v-model="newCourse.description" 
              rows="4"
              placeholder="Enter course description..."
            ></textarea>
            <div class="form-text">Optional: Provide a detailed description of the course.</div>
          </div>

          <!-- Thumbnail Upload -->
          <div class="form-group mb-4">
            <label class="form-label">Thumbnail Image</label>
            <input 
              type="file" 
              class="form-control" 
              @change="$emit('file-upload', $event, 'course')" 
              accept="image/*"
            />
            <div class="form-text">Recommended size: 1200x800px, Max size: 2MB</div>
            <div v-if="previewImage" class="mt-3">
              <div class="image-preview-container">
                <img 
                  :src="previewImage" 
                  alt="Course thumbnail preview" 
                  class="img-thumbnail preview-image"
                />
                <div class="preview-overlay">
                  <i class="fas fa-eye"></i>
                  <span>Preview</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Syllabus Section -->
          <div class="syllabus-section">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="mb-0">
                <i class="fas fa-list-ul text-info"></i>
                Course Syllabus
              </h4>
              <button 
                type="button" 
                class="btn btn-outline-primary btn-sm" 
                @click="$emit('add-syllabus-item')"
              >
                <i class="fas fa-plus"></i>
                Add Item
              </button>
            </div>

            <div class="syllabus-items">
              <div 
                v-for="(item, index) in newCourse.syllabus" 
                :key="index" 
                class="syllabus-item card mb-3"
              >
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h6 class="mb-0">
                    <span class="badge bg-secondary me-2">{{ index + 1 }}</span>
                    Syllabus Item
                  </h6>
                  <button 
                    type="button" 
                    class="btn btn-sm btn-outline-danger" 
                    @click="$emit('remove-syllabus-item', index)" 
                    v-if="newCourse.syllabus.length > 1"
                    title="Remove this item"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group mb-3">
                        <label class="form-label required">Title</label>
                        <input 
                          type="text" 
                          class="form-control" 
                          v-model="item.title" 
                          required 
                          placeholder="Enter lesson title"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group mb-3">
                        <label class="form-label required">Duration (minutes)</label>
                        <input 
                          type="number" 
                          class="form-control" 
                          v-model="item.duration" 
                          min="1" 
                          required 
                          placeholder="30"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div class="form-group mb-3">
                    <label class="form-label">Description</label>
                    <textarea 
                      class="form-control" 
                      v-model="item.description" 
                      rows="3"
                      placeholder="Describe what students will learn in this lesson..."
                    ></textarea>
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">YouTube Video URL</label>
                    <input 
                      type="url" 
                      class="form-control" 
                      v-model="item.video_url" 
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                    <div class="form-text">
                      <i class="fab fa-youtube text-danger"></i>
                      Paste the full YouTube URL here
                    </div>
                    <div v-if="item.video_url" class="video-preview mt-3">
                      <div class="ratio ratio-16x9">
                        <iframe 
                          :src="getYoutubeEmbedUrl(item.video_url)" 
                          allowfullscreen
                          class="rounded"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-secondary" @click="$emit('reset-form')">
              <i class="fas fa-undo"></i>
              Reset
            </button>
            <button type="submit" class="btn btn-success" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
              <i v-else class="fas fa-save me-2"></i>
              {{ isLoading ? 'Adding...' : 'Add Course' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Course List Section -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">
          <i class="fas fa-list text-success"></i>
          Course List
        </h2>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr>
                <th width="50">#</th>
                <th>Course Details</th>
                <th width="120">Price</th>
                <th width="100">Level</th>
                <th width="150">Instructor</th>
                <th width="150">Tools</th>
                <th width="100">Category</th>
                <th width="80">Items</th>
                <th width="80">Thumbnail</th>
                <th width="120">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(course, index) in courses" :key="course.course_id">
                <td>
                  <span class="badge bg-light text-dark">{{ index + 1 }}</span>
                </td>
                <td>
                  <div class="course-info">
                    <h6 class="mb-1">{{ course.course_title }}</h6>
                    <small class="text-muted">{{ course.description ? course.description.substring(0, 100) + '...' : 'No description' }}</small>
                  </div>
                </td>
                <td>
                  <span class="fw-bold text-success">
                    Rp {{ course.price.toLocaleString('id-ID') }}
                  </span>
                </td>
                <td>
                  <span class="badge" :class="{
                    'bg-success': course.level === 'Beginner',
                    'bg-warning': course.level === 'Intermediate',
                    'bg-danger': course.level === 'Advanced'
                  }">
                    {{ course.level }}
                  </span>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <i class="fas fa-user-tie me-2 text-muted"></i>
                    <span>{{ course.instructor_name }}</span>
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center flex-wrap gap-1">
                    <template v-if="course.cybersecurity_tool_names && course.cybersecurity_tool_names.length > 0">
                      <span 
                        v-for="(toolName, index) in JSON.parse(course.cybersecurity_tool_names)" 
                        :key="index"
                        class="badge bg-light text-dark d-flex align-items-center"
                      >
                        <i class="fas fa-tools me-1 text-muted"></i>
                        {{ toolName }}
                      </span>
                    </template>
                    <span v-else class="text-muted">N/A</span>
                  </div>
                </td>
                <td>
                  <span class="badge bg-info">
                    {{ course.category_name || 'N/A' }}
                  </span>
                </td>
                <td>
                  <span class="badge bg-info">
                    {{ course.syllabus ? JSON.parse(course.syllabus).length : 0 }}
                  </span>
                </td>
                <td>
                  <div class="thumbnail-container">
                    <img 
                      v-if="course.thumbnail_url" 
                      :src="course.thumbnail_url" 
                      alt="Course thumbnail" 
                      class="img-thumbnail course-thumbnail"
                    />
                    <div v-else class="no-thumbnail">
                      <i class="fas fa-image text-muted"></i>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="btn-group" role="group">
                    <button 
                      class="btn btn-sm btn-outline-warning" 
                      @click="$emit('start-editing-course', course)"
                      title="Edit course"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button 
                      class="btn btn-sm btn-outline-danger" 
                      @click="$emit('delete-course', course.course_id)"
                      title="Delete course"
                    >
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

    <!-- Edit Course Modal -->
    <div v-if="editingCourse" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fas fa-edit text-warning"></i>
              Edit Course
            </h5>
            <button type="button" class="btn-close" @click="$emit('cancel-edit')"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="$emit('update-course')" class="needs-validation" novalidate>
              <!-- Basic Information -->
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group mb-3">
                    <label class="form-label required">Course Title</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      v-model="editingCourse.title" 
                      required 
                      placeholder="Enter course title"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group mb-3">
                    <label class="form-label required">Price (IDR)</label>
                    <div class="input-group">
                      <span class="input-group-text">Rp</span>
                      <input 
                        type="number" 
                        class="form-control" 
                        v-model="editingCourse.price" 
                        required 
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <div class="form-group mb-3">
                    <label class="form-label required">Level</label>
                    <select class="form-select" v-model="editingCourse.level" required>
                      <option value="">Select Level</option>
                      <option value="Beginner">🟢 Beginner</option>
                      <option value="Intermediate">🟡 Intermediate</option>
                      <option value="Advanced">🔴 Advanced</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group mb-3">
                    <label class="form-label required">Instructor</label>
                    <select class="form-select" v-model="editingCourse.instructor_id" required>
                      <option value="">Select Instructor</option>
                      <option 
                        v-for="instructor in instructors" 
                        :key="instructor.instructors_id" 
                        :value="instructor.instructors_id"
                      >
                        {{ instructor.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group mb-3">
                    <label class="form-label required">Category</label>
                    <select 
                      id="edit-course-category-select"
                      class="form-select"
                      @change="updateSelectedCategory"
                      required
                    >
                      <option value="">Select Category</option>
                      <option 
                        v-for="category in courseCategories" 
                        :key="category.id" 
                        :value="category.id"
                        :selected="editingCourse.category_id === category.id"
                      >
                        {{ category.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="form-group mb-3">
                    <label class="form-label required">Cybersecurity Tools</label>
                    <select 
                      id="edit-cybersecurity-tools-select"
                      class="form-select"
                      multiple
                      @change="updateSelectedTools"
                      required
                    >
                      <option 
                        v-for="tool in cybersecurityTools" 
                        :key="tool.id" 
                        :value="tool.id"
                        :selected="editingCourse.cybersecurity_tool_ids && editingCourse.cybersecurity_tool_ids.includes(tool.id)"
                      >
                        🔧 {{ tool.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <div class="form-group mb-3">
                <label class="form-label">Description</label>
                <textarea 
                  class="form-control" 
                  v-model="editingCourse.description" 
                  rows="4"
                  placeholder="Enter course description..."
                ></textarea>
              </div>

              <!-- Thumbnail Upload -->
              <div class="form-group mb-4">
                <label class="form-label">Thumbnail Image</label>
                <input 
                  type="file" 
                  class="form-control" 
                  @change="$emit('file-upload', $event, 'course', true)" 
                  accept="image/*"
                />
                <div v-if="editingCourse.thumbnailPreview" class="mt-3">
                  <div class="image-preview-container">
                    <img 
                      :src="editingCourse.thumbnailPreview" 
                      alt="Course thumbnail preview" 
                      class="img-thumbnail preview-image"
                    />
                    <div class="preview-overlay">
                      <i class="fas fa-eye"></i>
                      <span>Preview</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Syllabus Section -->
              <div class="syllabus-section">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="mb-0">
                    <i class="fas fa-list-ul text-info"></i>
                    Course Syllabus
                  </h5>
                  <button 
                    type="button" 
                    class="btn btn-outline-primary btn-sm" 
                    @click="$emit('add-edit-syllabus-item')"
                  >
                    <i class="fas fa-plus"></i>
                    Add Item
                  </button>
                </div>

                <div class="syllabus-items">
                  <div 
                    v-for="(item, index) in editingCourse.syllabus" 
                    :key="index" 
                    class="syllabus-item card mb-3"
                  >
                    <div class="card-header d-flex justify-content-between align-items-center">
                      <h6 class="mb-0">
                        <span class="badge bg-secondary me-2">{{ index + 1 }}</span>
                        Syllabus Item
                      </h6>
                      <button 
                        type="button" 
                        class="btn btn-sm btn-outline-danger" 
                        @click="$emit('remove-edit-syllabus-item', index)" 
                        v-if="editingCourse.syllabus.length > 1"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-8">
                          <div class="form-group mb-3">
                            <label class="form-label required">Title</label>
                            <input 
                              type="text" 
                              class="form-control" 
                              v-model="item.title" 
                              required 
                              placeholder="Enter lesson title"
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group mb-3">
                            <label class="form-label required">Duration (minutes)</label>
                            <input 
                              type="number" 
                              class="form-control" 
                              v-model="item.duration" 
                              min="1" 
                              required 
                              placeholder="30"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div class="form-group mb-3">
                        <label class="form-label">Description</label>
                        <textarea 
                          class="form-control" 
                          v-model="item.description" 
                          rows="3"
                          placeholder="Describe what students will learn in this lesson..."
                        ></textarea>
                      </div>
                      
                      <div class="form-group">
                        <label class="form-label">YouTube Video URL</label>
                        <input 
                          type="url" 
                          class="form-control" 
                          v-model="item.video_url" 
                          placeholder="https://www.youtube.com/watch?v=..."
                        />
                        <div class="form-text">
                          <i class="fab fa-youtube text-danger"></i>
                          Paste the full YouTube URL here
                        </div>
                        <div v-if="item.video_url" class="video-preview mt-3">
                          <div class="ratio ratio-16x9">
                            <iframe 
                              :src="getYoutubeEmbedUrl(item.video_url)" 
                              allowfullscreen
                              class="rounded"
                            ></iframe>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('cancel-edit')">
              <i class="fas fa-times"></i>
              Cancel
            </button>
            <button type="submit" class="btn btn-success" @click="$emit('update-course')">
              <i class="fas fa-save"></i>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add Choices.js styles */
@import 'https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css';

/* Custom styles for Choices.js */
.choices {
  margin-bottom: 0;
}

.choices__inner {
  min-height: 38px;
  border-radius: 0.375rem;
  border: 1px solid #ced4da;
  background-color: white;
}

.choices__list--multiple .choices__item {
  background-color: #0d6efd;
  border: 1px solid #0a58ca;
  border-radius: 0.25rem;
  margin-right: 0.375rem;
  margin-bottom: 0.375rem;
  padding: 0.25rem 0.75rem;
}

.choices__list--multiple .choices__item.is-highlighted {
  background-color: #0a58ca;
  border: 1px solid #084298;
}

.choices[data-type*="select-one"] .choices__inner {
  padding-bottom: 0;
}

.choices__list--dropdown {
  border: 1px solid #ced4da;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  z-index: 1050;
}

/* Rest of your existing styles... */
.course-management {
  padding: 20px;
}

.card {
  border: none;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border-radius: 0.5rem;
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  padding: 1rem 1.5rem;
}

.card-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #495057;
}

.form-label.required::after {
  content: " *";
  color: #dc3545;
}

.image-preview-container {
  position: relative;
  display: inline-block;
}

.preview-image {
  max-width: 200px;
  max-height: 200px;
  border-radius: 0.375rem;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 0.375rem;
}

.image-preview-container:hover .preview-overlay {
  opacity: 1;
}

.syllabus-item {
  border: 1px solid #e9ecef;
  transition: box-shadow 0.15s ease-in-out;
}

.syllabus-item:hover {
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.15);
}

.syllabus-item .card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  padding: 0.75rem 1rem;
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.course-info h6 {
  color: #495057;
  font-weight: 600;
}

.course-thumbnail {
  max-width: 60px;
  max-height: 60px;
  border-radius: 0.375rem;
}

.no-thumbnail {
  width: 60px;
  height: 60px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumbnail-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal.show {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  margin: 1.75rem auto;
}

.modal-content {
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.modal-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  border-radius: 0.5rem 0.5rem 0 0;
}

.btn-group .btn {
  border-radius: 0.375rem;
}

.btn-group .btn:not(:last-child) {
  margin-right: 0.25rem;
}

.video-preview {
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  overflow: hidden;
}

.ratio iframe {
  border: none;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .course-management {
    padding: 10px;
  }
  
  .modal-dialog {
    margin: 0.5rem;
  }
  
  .table-responsive {
    font-size: 0.875rem;
  }
  
  .course-thumbnail {
    max-width: 40px;
    max-height: 40px;
  }
  
  .no-thumbnail {
    width: 40px;
    height: 40px;
  }
}
</style>