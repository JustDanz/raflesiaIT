<script setup>
defineProps({
  blogs: {
    type: Array,
    required: true
  },
  newBlog: {
    type: Object,
    required: true
  },
  editingBlog: {
    type: Object,
    required: false
  },
  isLoading: {
    type: Boolean,
    required: true
  },
  formatDate: {
    type: Function,
    required: true
  }
});

defineEmits(['add-blog', 'start-editing-blog', 'update-blog', 'delete-blog', 'cancel-edit', 'file-upload']);
</script>

<template>
  <div class="management-section">
    <div class="card">
      <div class="card-header">
        <h2>Add New Blog Post</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="$emit('add-blog')" class="form" enctype="multipart/form-data">
          <div class="form-grid">
            <div class="form-group">
              <label>Title</label>
              <input type="text" v-model="newBlog.title" required />
            </div>
            <div class="form-group">
              <label>Featured Image</label>
              <div class="file-upload">
                <label class="upload-label">
                  <input type="file" @change="$emit('file-upload', $event, 'blog')" accept=".jpg,.jpeg,.png,.gif" />
                  <span v-if="!newBlog.image">Choose File</span>
                  <span v-else>{{ newBlog.image.name }}</span>
                </label>
              </div>
            </div>
            <div class="form-group full-width">
              <label>Content</label>
              <textarea v-model="newBlog.content" rows="6" required></textarea>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Publish Post</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-header">
        <h2>Blog Posts</h2>
        <div class="header-actions">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search posts..." />
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
                <th>Author</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(blog, index) in blogs" :key="blog.blog_id">
                <td>{{ index + 1 }}</td>
                <td>
                  <div class="post-title">
                    {{ blog.title }}
                    <span class="post-slug">/{{ blog.slug }}</span>
                  </div>
                </td>
                <td>{{ blog.username }}</td>
                <td>{{ formatDate(blog.created_at) }}</td>
                <td><span class="badge published">Published</span></td>
                <td>
                  <div class="action-buttons">
                    <a :href="`/blog/blog-${blog.slug}`" target="_blank" class="btn-icon view" title="View">
                      <i class="fas fa-eye"></i>
                    </a>
                    <button @click="$emit('start-editing-blog', blog)" class="btn-icon edit" title="Edit">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button @click="$emit('delete-blog', blog.blog_id)" class="btn-icon delete" title="Delete">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <button class="page-btn" disabled><i class="fas fa-chevron-left"></i></button>
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <button class="page-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </div>

    <div v-if="editingBlog" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Edit Blog Post</h3>
          <button @click="$emit('cancel-edit')" class="close-modal"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="$emit('update-blog')" class="form" enctype="multipart/form-data">
            <div class="form-group">
              <label>Title</label>
              <input type="text" v-model="editingBlog.title" required />
            </div>
            <div class="form-group">
              <label>Current Image</label>
              <div class="current-image" v-if="editingBlog.image">
                <img :src="`/uploads/blogs/${editingBlog.image}`" />
              </div>
              <label>Update Image (optional)</label>
              <div class="file-upload">
                <label class="upload-label">
                  <input type="file" @change="$emit('file-upload', $event, 'blog', true)" accept=".jpg,.jpeg,.png,.gif" />
                  <span v-if="!editingBlog.newImage">Choose New File</span>
                  <span v-else>{{ editingBlog.newImage.name }}</span>
                </label>
              </div>
            </div>
            <div class="form-group">
              <label>Content</label>
              <textarea v-model="editingBlog.content" rows="6" required></textarea>
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