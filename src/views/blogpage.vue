<script setup>
import NavbarAll from '../components/navbarall.vue'
import FooterAll from '../components/footerall.vue'

const blogPosts = [
  {
    id: 1,
    title: "Modern JavaScript Frameworks Comparison",
    excerpt: "A comprehensive comparison of React, Vue, and Angular in 2025",
    date: "June 08, 2025",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "The Future of Web Development",
    excerpt: "Exploring emerging technologies that will shape the web in coming years",
    date: "June 05, 2025",
    category: "Trends",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Optimizing Vue.js Performance",
    excerpt: "Proven techniques to make your Vue applications lightning fast",
    date: "May 28, 2025",
    category: "Performance",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox in 2025",
    excerpt: "When to use each layout system for modern web designs",
    date: "May 20, 2025",
    category: "CSS",
    image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  }
]

const handleNavigation = (to) => {
  window.location.href = to
}
</script>

<template>
  <NavbarAll />
  
  <!-- Hero Section with new background style -->
  <section class="hero-section">
    <div class="hero-container">
      <div class="hero-content">
        <h1 class="hero-title">Tech Insights & Tutorials</h1>
        <p class="hero-subtitle">Discover the latest in web development, design trends, and cutting-edge technologies</p>
        <div class="hero-search">
          <input type="text" placeholder="Search articles..." class="search-input">
          <button class="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        <div class="hero-tags">
          <span class="tag">#JavaScript</span>
          <span class="tag">#Vue</span>
          <span class="tag">#CSS</span>
          <span class="tag">#Performance</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Blog Content -->
  <div class="blog-container">
    <div class="container">
      <div class="blog-header">
        <h1 class="page-title">Latest Articles</h1>
        <p class="page-subtitle">Stay updated with the latest tutorials, trends, and best practices in web development.</p>
      </div>
      <div class="blog-grid">
        <div class="blog-card" v-for="post in blogPosts" :key="post.id">
          <div class="card-image">
            <img :src="post.image" :alt="post.title" />
            <span class="category-badge">{{ post.category }}</span>
          </div>
          <div class="card-content">
            <div class="post-date">{{ post.date }}</div>
            <h3>{{ post.title }}</h3>
            <p>{{ post.excerpt }}</p>
            <router-link 
              :to="`/post/${post.id}`" 
              @click="handleNavigation(`/post/${post.id}`)" 
              class="blog-link"
            >
              Read More
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <FooterAll />
</template>

<style scoped>
/* New Hero Section Styles with background image */
.hero-section {
  margin-top: 90px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                    url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 5rem 1rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path fill="rgba(255,255,255,0.05)" d="M0,0 L100,0 L100,100 L0,100 Z" /></svg>');
  background-size: cover;
  opacity: 0.2;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.hero-search {
  display: flex;
  margin: 0 auto 2rem;
  max-width: 500px;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.hero-search:focus-within {
  transform: translateY(-2px);
  box-shadow: 0 15px 20px -5px rgba(0, 0, 0, 0.3);
}

.search-input {
  flex: 1;
  padding: 0.8rem 1.2rem;
  border: none;
  font-size: 1rem;
  outline: none;
  color: #1e293b;
}

.search-button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button:hover {
  background-color: #1d4ed8;
}

.search-button svg {
  width: 1.5rem;
  height: 1.5rem;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.tag {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  transition: all 0.3s;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tag:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Blog Container Styles */
.blog-container {
  padding: 4rem 0;
  background-color: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.blog-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.75rem;
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 700;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.page-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;
}

.blog-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.card-image {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-card:hover .card-image img {
  transform: scale(1.05);
}

.category-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #3b82f6;
}

.card-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-date {
  font-size: 0.85rem;
  color: #94a3b8;
  margin-bottom: 0.5rem;
}

.blog-card h3 {
  font-size: 1.3rem;
  color: #1e293b;
  margin-bottom: 0.75rem;
  font-weight: 600;
  line-height: 1.4;
}

.blog-card p {
  font-size: 0.95rem;
  color: #64748b;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex: 1;
}

.blog-link {
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  background-color: #3b82f6;
  color: #ffffff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  width: fit-content;
}

.blog-link:hover {
  background-color: #2563eb;
  transform: translateX(4px);
}

.icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.blog-link:hover .icon {
  transform: translateX(2px);
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 3rem 1rem;
  }
  
  .hero-title {
    font-size: 2.25rem;
  }
  
  .blog-container {
    padding: 3rem 0;
  }
  
  .page-title {
    font-size: 2.25rem;
  }
  
  .page-subtitle {
    font-size: 1.1rem;
  }
  
  .blog-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .hero-search {
    flex-direction: column;
    border-radius: 8px;
    max-width: 100%;
  }
  
  .search-input {
    border-radius: 8px 8px 0 0;
  }
  
  .search-button {
    padding: 0.75rem;
    border-radius: 0 0 8px 8px;
  }
  
  .hero-tags {
    gap: 0.5rem;
  }
  
  .tag {
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
  }
}
</style>