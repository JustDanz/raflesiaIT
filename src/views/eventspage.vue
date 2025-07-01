<script setup>
import NavbarAll from '../components/navbarall.vue'
import FooterAll from '../components/footerall.vue'

const handleNavigation = (to) => {
  window.location.href = to
}

const events = [
  {
    id: 1,
    title: "Tech Summit 2025",
    description: "Join industry leaders to discuss the future of technology and innovation.",
    category: "Conference",
    date: "March 15, 2025",
    location: "Jakarta, Indonesia",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    title: "Web Dev Workshop",
    description: "Hands-on workshop to build responsive websites with modern frameworks.",
    category: "Workshop",
    date: "April 10, 2025",
    location: "Online",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    title: "AI Hackathon",
    description: "Compete in a 24-hour hackathon to create innovative AI solutions.",
    category: "Hackathon",
    date: "May 20, 2025",
    location: "Bandung, Indonesia",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 4,
    title: "Cloud Computing Seminar",
    description: "Learn about cloud architecture and deployment strategies.",
    category: "Seminar",
    date: "June 5, 2025",
    location: "Surabaya, Indonesia",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  }
]
</script>

<template>
  <NavbarAll />
  <div class="events-container">
    <div class="hero-section">
      <div class="container">
        <h1 class="page-title">Join Our Tech Events</h1>
        <p class="page-subtitle">Discover workshops, hackathons, and conferences to boost your tech skills and network.</p>
        <div class="search-bar">
          <input type="text" placeholder="Search events...">
          <button class="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 c1 2 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <div class="container main-content">
      <div class="filters">
        <div class="filter-tags">
          <button class="filter-tag active">All</button>
          <button class="filter-tag">Conference</button>
          <button class="filter-tag">Workshop</button>
          <button class="filter-tag">Hackathon</button>
          <button class="filter-tag">Seminar</button>
        </div>
      </div>
      
      <div class="events-grid">
        <div class="event-card" v-for="event in events" :key="event.id">
          <div class="event-image-container">
            <img :src="event.image" :alt="event.title" class="event-image">
            <div class="event-badge">{{ event.category }}</div>
          </div>
          <div class="event-content">
            <h3>{{ event.title }}</h3>
            <p>{{ event.description }}</p>
            <div class="event-meta">
              <span class="date">{{ event.date }}</span>
              <span class="location">{{ event.location }}</span>
            </div>
          </div>
          <router-link 
            :to="`/event/${event.id}`" 
            @click="handleNavigation(`/event/${event.id}`)" 
            class="event-link"
          >
            Register Now
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <FooterAll />
</template>

<style scoped>
.events-container {
  padding-top: 0;
  background-color: #f8fafc;
  min-height: calc(100vh - 200px);
}

.hero-section {
  margin-top: 90px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../assets/bg3.png');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 4rem 1rem;
  text-align: center;
  margin-bottom: 3rem;
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

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
}

.page-title {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.page-subtitle {
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto 2rem;
  opacity: 0.9;
}

.search-bar {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.search-bar:focus-within {
  transform: translateY(-2px);
  box-shadow: 0 15px 20px -5px rgba(0, 0, 0, 0.15);
}

.search-bar input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  font-size: 1rem;
  color: #1e293b;
}

.search-bar input:focus {
  outline: none;
}

.search-button {
  background: #1e40af;
  color: white;
  border: none;
  padding: 0 1.5rem;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button:hover {
  background: #1e3a8a;
}

.filters {
  margin-bottom: 2rem;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-tag {
  background: #e2e8f0;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.filter-tag:hover {
  background: #cbd5e1;
  transform: translateY(-1px);
}

.filter-tag.active {
  background: #2563eb;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

.event-card {
  background: #ffffff;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.event-image-container {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.event-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.event-card:hover .event-image {
  transform: scale(1.05);
}

.event-badge {
  position: absolute;
  top: 1rem;
  left: 0;
  background: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.event-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.event-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

.event-content p {
  font-size: 0.95rem;
  color: #64748b;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  flex-grow: 1;
}

.event-meta {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  font-size: 0.85rem;
}

.event-meta span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #475569;
}

.event-meta span:before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 4px;
  background: #94a3b8;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.event-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #2563eb;
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.event-link:hover {
  background-color: #1d4ed8;
}

.event-link svg {
  transition: transform 0.3s ease;
}

.event-link:hover svg {
  transform: translateX(3px);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .hero-section {
    padding: 3rem 1rem;
    margin-bottom: 2rem;
  }
  
  .events-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-tags {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.8rem;
  }
  
  .search-bar {
    flex-direction: column;
    border-radius: 0.5rem;
  }
  
  .search-bar input {
    border-radius: 0.5rem 0.5rem 0 0;
  }
  
  .search-button {
    padding: 0.75rem;
    border-radius: 0 0 0.5rem 0.5rem;
  }
}
</style>