<script setup>
import { ref, computed } from 'vue';
import { useAdmin } from './useAdmin';

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

// Course categories
const courseCategories = ref([
  { id: 1, name: 'Ethical Hacking' },
  { id: 2, name: 'Network Security' },
  { id: 3, name: 'Cryptography' },
  { id: 4, name: 'Penetration Testing' },
  { id: 5, name: 'Forensics' },
  { id: 6, name: 'Secure Coding' }
]);

// Cybersecurity tools
const cybersecurityToolsOptions = ref([...props.cybersecurityTools]);
const newToolName = ref('');
const showToolDropdown = ref(false);
const showCategoryDropdown = ref(false);
const showEditToolDropdown = ref(false);
const showEditCategoryDropdown = ref(false);

// Add new tool function
const addNewTool = () => {
  if (newToolName.value.trim()) {
    const newTool = {
      id: Math.floor(Math.random() * 10000000),
      name: newToolName.value.trim(),
      isNew: true
    };
    cybersecurityToolsOptions.value.push(newTool);
    
    if (!Array.isArray(props.newCourse.cybersecurity_tool_ids)) {
      props.newCourse.cybersecurity_tool_ids = [];
    }
    props.newCourse.cybersecurity_tool_ids.push(newTool.id);
    newToolName.value = '';
  }
};

// Add new tool in edit mode
const addNewEditTool = () => {
  if (newToolName.value.trim()) {
    const newTool = {
      id: Math.floor(Math.random() * 10000000),
      name: newToolName.value.trim(),
      isNew: true
    };
    cybersecurityToolsOptions.value.push(newTool);
    
    if (!Array.isArray(props.editingCourse.cybersecurity_tool_ids)) {
      props.editingCourse.cybersecurity_tool_ids = [];
    }
    props.editingCourse.cybersecurity_tool_ids.push(newTool.id);
    newToolName.value = '';
  }
};

// Toggle tool selection
const toggleToolSelection = (toolId) => {
  if (!Array.isArray(props.newCourse.cybersecurity_tool_ids)) {
    props.newCourse.cybersecurity_tool_ids = [];
  }
  
  const index = props.newCourse.cybersecurity_tool_ids.indexOf(toolId);
  if (index === -1) {
    props.newCourse.cybersecurity_tool_ids.push(toolId);
  } else {
    props.newCourse.cybersecurity_tool_ids.splice(index, 1);
  }
};

// Check if tool is selected
const isToolSelected = (toolId) => {
  return Array.isArray(props.newCourse.cybersecurity_tool_ids) && 
         props.newCourse.cybersecurity_tool_ids.includes(toolId);
};

// Similar functions for editing course
const toggleEditToolSelection = (toolId) => {
  if (!Array.isArray(props.editingCourse.cybersecurity_tool_ids)) {
    props.editingCourse.cybersecurity_tool_ids = [];
  }
  
  const index = props.editingCourse.cybersecurity_tool_ids.indexOf(toolId);
  if (index === -1) {
    props.editingCourse.cybersecurity_tool_ids.push(toolId);
  } else {
    props.editingCourse.cybersecurity_tool_ids.splice(index, 1);
  }
};

const isEditToolSelected = (toolId) => {
  return props.editingCourse && 
         Array.isArray(props.editingCourse.cybersecurity_tool_ids) && 
         props.editingCourse.cybersecurity_tool_ids.includes(toolId);
};

// Get selected tools names
const selectedToolsNames = computed(() => {
  if (!Array.isArray(props.newCourse.cybersecurity_tool_ids)) return [];
  return props.newCourse.cybersecurity_tool_ids.map(toolId => {
    return cybersecurityToolsOptions.value.find(t => t.id === toolId)?.name || '';
  }).filter(Boolean);
});

// Get selected edit tools names
const selectedEditToolsNames = computed(() => {
  if (!props.editingCourse || !Array.isArray(props.editingCourse.cybersecurity_tool_ids)) return [];
  return props.editingCourse.cybersecurity_tool_ids.map(toolId => {
    return cybersecurityToolsOptions.value.find(t => t.id === toolId)?.name || '';
  }).filter(Boolean);
});

// Get selected category name
const selectedCategoryName = computed(() => {
  return courseCategories.value.find(c => c.id === props.newCourse.category_id)?.name || 'Select category';
});

// Get selected edit category name
const selectedEditCategoryName = computed(() => {
  if (!props.editingCourse) return 'Select category';
  return courseCategories.value.find(c => c.id === props.editingCourse.category_id)?.name || 'Select category';
});
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
                <div class="dropdown multiselect-dropdown-container" @click.stop="showCategoryDropdown = !showCategoryDropdown">
                  <button 
                    class="dropdown-toggle multiselect-toggle" 
                    type="button"
                    :class="{ show: showCategoryDropdown }"
                  >
                    <span>{{ selectedCategoryName }}</span>
                  </button>
                  <ul 
                    class="dropdown-menu multiselect-dropdown-menu" 
                    :class="{ show: showCategoryDropdown }"
                    v-click-outside="() => showCategoryDropdown = false"
                  >
                    <li v-for="category in courseCategories" :key="category.id">
                      <a 
                        class="dropdown-item multiselect-option" 
                        href="#" 
                        @click.prevent="newCourse.category_id = category.id; showCategoryDropdown = false"
                      >
                        {{ category.name }}
                      </a>
                    </li>
                  </ul>
                </div>
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
                <div class="dropdown multiselect-dropdown-container" @click.stop="showToolDropdown = !showToolDropdown">
                  <button 
                    class="dropdown-toggle multiselect-toggle" 
                    type="button"
                    :class="{ show: showToolDropdown }"
                  >
                    <span v-if="newCourse.cybersecurity_tool_ids?.length">
                      {{ newCourse.cybersecurity_tool_ids.length }} selected
                    </span>
                    <span v-else>Select tools...</span>
                  </button>
                  <div 
                    class="dropdown-menu multiselect-dropdown-menu" 
                    :class="{ show: showToolDropdown }"
                    v-click-outside="() => showToolDropdown = false"
                  >
                    <!-- Search and add new tool -->
                    <div class="multiselect-search d-flex mb-3">
                      <input
                        type="text"
                        class="form-control me-2"
                        v-model="newToolName"
                        placeholder="Add new tool..."
                        @keyup.enter="addNewTool"
                      >
                      <button 
                        class="btn btn-primary" 
                        @click="addNewTool"
                        :disabled="!newToolName.trim()"
                      >
                        Add
                      </button>
                    </div>
                    
                    <!-- Tools list -->
                    <div class="tools-list multiselect-options">
                      <div 
                        v-for="tool in cybersecurityToolsOptions" 
                        :key="tool.id"
                        class="multiselect-option-wrapper"
                        :class="{ active: isToolSelected(tool.id) }"
                      >
                        <div class="multiselect-option-content">
                          <div class="checkbox-wrapper">
                            <input
                              class="multiselect-checkbox"
                              type="checkbox"
                              :id="`tool-${tool.id}`"
                              :checked="isToolSelected(tool.id)"
                              @change="toggleToolSelection(tool.id)"
                            >
                            <label class="checkbox-label" :for="`tool-${tool.id}`">
                              <span class="checkmark"></span>
                            </label>
                          </div>
                          <div class="tool-info">
                            <span class="tool-name">{{ tool.name }}</span>
                            <span v-if="tool.isNew" class="badge multiselect-new-badge">New</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Selected tools chips -->
                <div class="selected-tools multiselect-selected-tags mt-2">
                  <span 
                    v-for="(toolName, index) in selectedToolsNames" 
                    :key="index"
                    class="badge multiselect-tag"
                  >
                    {{ toolName }}
                    <span 
                      class="multiselect-tag-remove" 
                      @click="toggleToolSelection(newCourse.cybersecurity_tool_ids[index])"
                      aria-label="Remove"
                    >×</span>
                  </span>
                </div>
                
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
                    <div class="dropdown multiselect-dropdown-container" @click.stop="showEditCategoryDropdown = !showEditCategoryDropdown">
                      <button 
                        class="dropdown-toggle multiselect-toggle" 
                        type="button"
                        :class="{ show: showEditCategoryDropdown }"
                      >
                        <span>{{ selectedEditCategoryName }}</span>
                      </button>
                      <ul 
                        class="dropdown-menu multiselect-dropdown-menu" 
                        :class="{ show: showEditCategoryDropdown }"
                        v-click-outside="() => showEditCategoryDropdown = false"
                      >
                        <li v-for="category in courseCategories" :key="category.id">
                          <a 
                            class="dropdown-item multiselect-option" 
                            href="#" 
                            @click.prevent="editingCourse.category_id = category.id; showEditCategoryDropdown = false"
                          >
                            {{ category.name }}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="form-group mb-3">
                    <label class="form-label required">Cybersecurity Tools</label>
                    <div class="dropdown multiselect-dropdown-container" @click.stop="showEditToolDropdown = !showEditToolDropdown">
                      <button 
                        class="dropdown-toggle multiselect-toggle" 
                        type="button"
                        :class="{ show: showEditToolDropdown }"
                      >
                        <span v-if="editingCourse.cybersecurity_tool_ids?.length">
                          {{ editingCourse.cybersecurity_tool_ids.length }} selected
                        </span>
                        <span v-else>Select tools...</span>
                      </button>
                      <div 
                        class="dropdown-menu multiselect-dropdown-menu" 
                        :class="{ show: showEditToolDropdown }"
                        v-click-outside="() => showEditToolDropdown = false"
                      >
                        <!-- Search and add new tool -->
                        <div class="multiselect-search d-flex mb-3">
                          <input
                            type="text"
                            class="form-control me-2"
                            v-model="newToolName"
                            placeholder="Add new tool..."
                            @keyup.enter="addNewEditTool"
                          >
                          <button 
                            class="btn btn-primary" 
                            @click="addNewEditTool"
                            :disabled="!newToolName.trim()"
                          >
                            Add
                          </button>
                        </div>
                        
                        <!-- Tools list -->
                        <div class="tools-list multiselect-options">
                          <div 
                            v-for="tool in cybersecurityToolsOptions" 
                            :key="tool.id"
                            class="form-check multiselect-option"
                            :class="{ active: isEditToolSelected(tool.id) }"
                          >
                            <input
                              class="form-check-input multiselect-checkbox"
                              type="checkbox"
                              :id="`edit-tool-${tool.id}`"
                              :checked="isEditToolSelected(tool.id)"
                              @change="toggleEditToolSelection(tool.id)"
                            >
                            <label class="form-check-label" :for="`edit-tool-${tool.id}`">
                              {{ tool.name }}
                              <span v-if="tool.isNew" class="badge multiselect-new-badge">New</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Selected tools chips -->
                    <div class="selected-tools multiselect-selected-tags mt-2">
                      <span 
                        v-for="(toolName, index) in selectedEditToolsNames" 
                        :key="index"
                        class="badge multiselect-tag"
                      >
                        {{ toolName }}
                        <span 
                          class="multiselect-tag-remove" 
                          @click="toggleEditToolSelection(editingCourse.cybersecurity_tool_ids[index])"
                          aria-label="Remove"
                        >×</span>
                      </span>
                    </div>
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
/* Base Styles */
.course-management {
  padding: 2rem;
  background: white !important;
  min-height: 100vh;
}

/* Card Styles */
.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  background: white !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
  margin-bottom: 2rem;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.card-header {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 1.25rem 1.5rem;
  border-bottom: none;
}

.card-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.card-title i {
  font-size: 1.25rem;
}

.card-body {
  padding: 1.5rem;
}

/* Form Elements */
.form-label {
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
  display: block;
}

.form-label.required::after {
  content: " *";
  color: #ef4444;
}

.form-control,
.form-select {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.625rem 1rem;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
  background-color: white !important;
  color: #111827 !important;
}

.form-control:focus,
.form-select:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  outline: none;
}

.form-control:hover,
.form-select:hover {
  border-color: #9ca3af;
}

.input-group-text {
  background-color: #f3f4f6;
  border-color: #e5e7eb;
  color: #4b5563;
}

.invalid-feedback {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-text {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Buttons */
.btn {
  border-radius: 8px;
  padding: 0.625rem 1.25rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.btn-success {
  background-color: #10b981;
  border-color: #10b981;
  color: white;
}

.btn-success:hover {
  background-color: #059669;
  border-color: #059669;
}

.btn-primary {
  background-color: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background-color: #2563eb;
  border-color: #2563eb;
}

.btn-outline-secondary {
  border-color: #9ca3af;
  color: #4b5563;
}

.btn-outline-secondary:hover {
  background-color: #f3f4f6;
}

.btn-outline-warning {
  border-color: #f59e0b;
  color: #f59e0b;
}

.btn-outline-warning:hover {
  background-color: #fef3c7;
}

.btn-outline-danger {
  border-color: #ef4444;
  color: #ef4444;
}

.btn-outline-danger:hover {
  background-color: #fee2e2;
}

/* Table Styles */
.table {
  border-radius: 8px;
  overflow: hidden;
}

.table thead th {
  background-color: #f9fafb;
  color: #374151;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.table tbody td {
  padding: 1rem;
  vertical-align: middle;
  border-bottom: 1px solid #f3f4f6;
}

.table tbody tr:hover {
  background-color: #f9fafb;
}

/* Badges */
.badge {
  font-weight: 500;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
}

.bg-success {
  background-color: #10b981 !important;
}

.bg-warning {
  background-color: #f59e0b !important;
  color: white !important;
}

.bg-danger {
  background-color: #ef4444 !important;
}

.bg-info {
  background-color: #3b82f6 !important;
}

.bg-secondary {
  background-color: #9ca3af !important;
}

/* Image Previews */
.image-preview-container {
  position: relative;
  display: inline-block;
  border-radius: 8px;
  overflow: hidden;
}

.preview-image {
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.course-thumbnail {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.no-thumbnail {
  width: 60px;
  height: 60px;
  background-color: #f3f4f6;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
}

/* Syllabus Items */
.syllabus-item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  background-color: white !important;
}

.syllabus-item:hover {
  border-color: #d1d5db;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.syllabus-item .card-header {
  background-color: #f9fafb;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.syllabus-item .card-header h6 {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #111827;
}

.syllabus-item .card-body {
  padding: 1rem;
}

/* Video Preview */
.video-preview {
  border-radius: 8px;
  overflow: hidden;
}

.ratio iframe {
  border: none;
  border-radius: 8px;
}

/* Modal Styles */
.modal.show {
  background-color: rgba(0, 0, 0, 0.5);
  display: flex !important;
  align-items: center;
}

.modal-content {
  border: none;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  background-color: white !important;
}

.modal-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

/* Multiselect Dropdown */
.multiselect-dropdown-container {
  position: relative;
}

.multiselect-toggle {
  width: 100%;
  padding: 0.625rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: white !important;
  color: #111827 !important;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;
}

.multiselect-toggle:hover {
  border-color: #9ca3af;
}

.multiselect-toggle:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  outline: none;
}

.multiselect-toggle::after {
  content: "";
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 0.5rem;
  border-top: 5px solid #6b7280;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  transition: transform 0.2s ease;
}

.multiselect-toggle.show::after {
  transform: rotate(180deg);
}

.multiselect-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: white !important;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 0.5rem;
  padding: 0.5rem;
  opacity: 0;
  visibility: hidden;
  transform: translateY(5px);
  transition: all 0.2s ease;
}

.multiselect-dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.multiselect-search {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

.multiselect-option-wrapper {
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.multiselect-option-wrapper:hover {
  background-color: #f3f4f6;
}

.multiselect-option-wrapper.active {
  background-color: #eef2ff;
}

.multiselect-option-content {
  display: flex;
  align-items: center;
}

.checkbox-wrapper {
  margin-right: 0.75rem;
}

.multiselect-checkbox {
  width: 16px;
  height: 16px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  appearance: none;
  margin: 0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.multiselect-checkbox:checked {
  background-color: #4f46e5;
  border-color: #4f46e5;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  background-position: center;
  background-repeat: no-repeat;
}

.tool-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tool-name {
  font-size: 0.9375rem;
}

.multiselect-selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.multiselect-tag {
  background-color: #eef2ff;
  color: #4f46e5;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.multiselect-tag-remove {
  cursor: pointer;
  color: #818cf8;
  font-size: 1rem;
  line-height: 1;
}

.multiselect-tag-remove:hover {
  color: #4f46e5;
}

.multiselect-new-badge {
  background-color: #06b6d4;
  color: white;
  font-size: 0.6875rem;
  padding: 0.125rem 0.375rem;
  border-radius: 999px;
  font-weight: 600;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .course-management {
    padding: 1rem;
  }
  
  .card-header {
    padding: 1rem;
  }
  
  .card-body {
    padding: 1rem;
  }
  
  .modal-body {
    padding: 1rem;
  }
  
  .table-responsive {
    font-size: 0.875rem;
  }
  
  .course-thumbnail,
  .no-thumbnail {
    width: 40px;
    height: 40px;
  }
  
  .multiselect-dropdown-menu {
    max-height: 250px;
  }
}
</style>