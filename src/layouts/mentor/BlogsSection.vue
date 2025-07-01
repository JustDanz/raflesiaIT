<script>
export default {
  data() {
    return {
      showBlogForm: false,
      editingBlog: false,
      blogs: [
        {
          id: 1,
          title: 'Getting Started with Vue 3',
          content: 'Vue 3 introduces the Composition API which provides better code organization and reusability...',
          category: 'Tutorial',
          tags: 'vue, javascript, frontend',
          imageUrl: 'https://via.placeholder.com/800x450?text=Vue+3',
          createdAt: '2023-05-15',
        },
        {
          id: 2,
          title: 'State Management Showdown: Vuex vs Pinia',
          content: 'With the introduction of Pinia as the new recommended state management solution for Vue...',
          category: 'Comparison',
          tags: 'vue, state-management, pinia',
          imageUrl: 'https://via.placeholder.com/800x450?text=Vuex+vs+Pinia',
          createdAt: '2023-06-20',
        },
      ],
      newBlog: {
        title: '',
        content: '',
        category: 'Tutorial',
        tags: '',
        imageUrl: '',
      },
    };
  },
  methods: {
    toggleBlogForm() {
      this.showBlogForm = !this.showBlogForm;
      if (!this.showBlogForm) {
        this.editingBlog = false;
        this.resetBlogForm();
      }
    },
    addBlog() {
      if (!this.newBlog.title || !this.newBlog.content) {
        this.$toast.error('Please fill all required fields');
        return;
      }
      const newBlog = {
        id: this.blogs.length + 1,
        ...this.newBlog,
        createdAt: new Date().toISOString().split('T')[0],
      };
      this.blogs.push(newBlog);
      this.$toast.success('Blog published successfully');
      this.resetBlogForm();
      this.showBlogForm = false;
    },
    editBlog(blog) {
      this.newBlog = { ...blog };
      this.editingBlog = true;
      this.showBlogForm = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    updateBlog() {
      const index = this.blogs.findIndex((b) => b.id === this.newBlog.id);
      if (index !== -1) {
        this.blogs.splice(index, 1, { ...this.newBlog });
        this.$toast.success('Blog updated successfully');
        this.resetBlogForm();
        this.showBlogForm = false;
        this.editingBlog = false;
      }
    },
    resetBlogForm() {
      this.newBlog = {
        title: '',
        content: '',
        category: 'Tutorial',
        tags: '',
        imageUrl: '',
      };
    },
    viewBlog(id) {
      this.$toast.info(`Viewing blog ${id}`);
    },
    deleteItem(type, id) {
      if (type === 'blog') {
        this.blogs = this.blogs.filter((b) => b.id !== id);
        this.$toast.success('Blog deleted successfully');
      }
    },
    truncateDescription(text, length = 100) {
      return text.length > length ? text.substring(0, length) + '...' : text;
    },
    calculateReadTime(content) {
      const wordsPerMinute = 200;
      const wordCount = content.split(/\s+/).length;
      return Math.ceil(wordCount / wordsPerMinute);
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<template>
  <section class="tab-content">
    <div class="page-header">
      <div>
        <h1>Manage Blogs</h1>
        <p class="subtitle">Share your knowledge through articles</p>
      </div>
   <button @click="toggleBlogForm" class="btn-primary add-blog-btn">
  <i class="fas" :class="showBlogForm ? 'fa-times' : 'fa-plus'"></i>
  <span>{{ showBlogForm ? 'Cancel' : 'Add New Blog' }}</span>
</button>
    </div>

    <!-- Blog Form -->
    <transition name="fade">
      <div v-if="showBlogForm" class="form-container card">
        <h3>{{ editingBlog ? 'Edit Blog' : 'Add New Blog' }}</h3>
        <div class="form-group">
          <label>Title <span class="required">*</span></label>
          <input v-model="newBlog.title" type="text" placeholder="Blog title" required />
        </div>
        <div class="form-group">
          <label>Content <span class="required">*</span></label>
          <textarea v-model="newBlog.content" rows="8" placeholder="Write your blog content here..." required></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Category</label>
            <select v-model="newBlog.category" class="custom-select">
              <option value="Tutorial">Tutorial</option>
              <option value="Industry News">Industry News</option>
              <option value="Case Study">Case Study</option>
              <option value="Opinion">Opinion</option>
            </select>
          </div>
          <div class="form-group">
            <label>Featured Image URL</label>
            <input v-model="newBlog.imageUrl" type="url" placeholder="https://example.com/image.jpg" />
          </div>
        </div>
        <div class="form-group">
          <label>Tags (comma separated)</label>
          <input v-model="newBlog.tags" type="text" placeholder="vue, javascript, web-development" />
        </div>
        <div class="form-actions">
          <button @click="resetBlogForm" type="button" class="btn-secondary">
            <i class="fas fa-undo"></i> Reset
          </button>
          <button @click="editingBlog ? updateBlog() : addBlog()" type="button" class="btn-primary">
            <i :class="editingBlog ? 'fas fa-save' : 'fas fa-plus'"></i>
            {{ editingBlog ? 'Update Blog' : 'Publish Blog' }}
          </button>
        </div>
      </div>
    </transition>

    <!-- Blogs List -->
    <div class="list-container">
      <div v-if="blogs.length === 0 && !showBlogForm" class="empty-state card">
        <i class="fas fa-blog"></i>
        <p>No blogs published yet</p>
        <button @click="toggleBlogForm" class="btn-primary">Write Your First Blog</button>
      </div>

      <div v-else class="blog-list">
        <div v-for="blog in blogs" :key="blog.id" class="card blog-card">
          <div class="blog-image" v-if="blog.imageUrl">
            <img :src="blog.imageUrl" :alt="blog.title" />
          </div>
          <div class="blog-content">
            <div class="blog-header">
              <h3>{{ blog.title }}</h3>
              <span class="blog-category">{{ blog.category }}</span>
            </div>
            <div class="blog-meta">
              <span class="publish-date">
                <i class="far fa-calendar-alt"></i> {{ formatDate(blog.createdAt) }}
              </span>
              <span class="read-time">
                <i class="far fa-clock"></i> {{ calculateReadTime(blog.content) }} min read
              </span>
            </div>
            <p class="blog-excerpt">{{ truncateDescription(blog.content) }}</p>
            <div class="blog-footer">
              <div class="blog-tags">
                <span v-for="(tag, index) in blog.tags.split(',')" :key="index" class="tag">
                  {{ tag.trim() }}
                </span>
              </div>
              <div class="blog-actions">
                <button @click="editBlog(blog)" class="btn-icon" aria-label="Edit blog">
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="$emit('confirm-delete', 'blog', blog.id)"
                  class="btn-icon danger"
                  aria-label="Delete blog"
                >
                  <i class="fas fa-trash"></i>
                </button>
                <button @click="viewBlog(blog.id)" class="btn-icon success" aria-label="View blog">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>

.add-blog-btn {
  background: linear-gradient(135deg, #f39c12 0%, #d35400 100%);
}

.btn-primary:not(.add-blog-btn) {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
}

.btn-danger {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
}

.blog-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.blog-card {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.blog-image {
  width: 250px;
  min-height: 180px;
  overflow: hidden;
  flex-shrink: 0;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
}

.blog-card:hover .blog-image img {
  transform: scale(1.05);
}

.blog-content {
  padding: 1.5rem;
  flex-grow: 1;
}

.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.blog-header h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-right: 0.5rem;
}

.blog-category {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-weight: 600;
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
}

.blog-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #7f8c8d;
  margin-bottom: 0.75rem;
}

.blog-excerpt {
  color: #7f8c8d;
  margin-bottom: 1rem;
}

.blog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  background: rgba(189, 195, 199, 0.2);
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .blog-card {
    flex-direction: column;
  }
  
  .blog-image {
    width: 100%;
    height: 200px;
  }
}
</style>