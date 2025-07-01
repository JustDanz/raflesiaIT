<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NavbarAll from '../components/navbarall.vue'
import FooterAll from '../components/footerall.vue'

const route = useRoute()
const event = ref(null)

const events = [
  {
    id: 1,
    title: "Tech Summit 2025",
    description: "Join industry leaders to discuss the future of technology and innovation. This summit brings together innovators, entrepreneurs, and tech enthusiasts to explore emerging trends and network with industry pioneers.",
    category: "Conference",
    date: "March 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Jakarta Convention Center, Jakarta, Indonesia",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    price: "$150",
    organizer: "Tech Indonesia",
    agenda: [
      { time: "9:00 AM", activity: "Opening Keynote" },
      { time: "11:00 AM", activity: "Panel Discussion: AI Revolution" },
      { time: "1:00 PM", activity: "Lunch Break" },
      { time: "2:00 PM", activity: "Breakout Sessions" },
      { time: "4:00 PM", activity: "Networking Session" }
    ]
  },
  {
    id: 2,
    title: "Web Dev Workshop",
    description: "Hands-on workshop to build responsive websites with modern frameworks like Vue.js and React. Perfect for beginners and intermediate developers looking to enhance their skills.",
    category: "Workshop",
    date: "April 10, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Online (Zoom)",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    price: "Free",
    organizer: "Code Academy",
    agenda: [
      { time: "10:00 AM", activity: "Introduction to Modern Frameworks" },
      { time: "11:30 AM", activity: "Hands-on Coding Session" },
      { time: "1:00 PM", activity: "Lunch Break" },
      { time: "1:30 PM", activity: "Responsive Design Techniques" },
      { time: "2:30 PM", activity: "Q&A and Wrap-up" }
    ]
  },
  {
    id: 3,
    title: "AI Hackathon",
    description: "Compete in a 24-hour hackathon to create innovative AI solutions. Teams will work on real-world problems and present their projects to a panel of judges.",
    category: "Hackathon",
    date: "May 20, 2025",
    time: "8:00 AM - 8:00 AM (Next Day)",
    location: "Bandung Institute of Technology, Bandung, Indonesia",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    price: "$50/team",
    organizer: "AI Indonesia",
    agenda: [
      { time: "8:00 AM", activity: "Opening Ceremony" },
      { time: "9:00 AM", activity: "Hacking Begins" },
      { time: "8:00 PM", activity: "Dinner" },
      { time: "6:00 AM Next Day", activity: "Project Submission" },
      { time: "7:00 AM Next Day", activity: "Presentations and Awards" }
    ]
  },
  {
    id: 4,
    title: "Cloud Computing Seminar",
    description: "Learn about cloud architecture and deployment strategies from industry experts. This seminar covers AWS, Azure, and hybrid cloud solutions.",
    category: "Seminar",
    date: "June 5, 2025",
    time: "1:00 PM - 4:30 PM",
    location: "Surabaya Marriott Hotel, Surabaya, Indonesia",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    price: "$75",
    organizer: "Cloud Tech Asia",
    agenda: [
      { time: "1:00 PM", activity: "Introduction to Cloud Computing" },
      { time: "1:45 PM", activity: "AWS Architecture Deep Dive" },
      { time: "2:00 PM", activity: "Azure Fundamentals" },
      { time: "3:00 PM", activity: "Hybrid Cloud Strategies" },
      { time: "3:00 PM", activity: "Q&A and Networking" }
    ]
  }
]

onMounted(() => {
  const eventId = parseInt(route.params.id)
  event.value = events.find(e => e.id === eventId) || null
})

const handleRegister = () => {
  alert('Registration process initiated!')
  // Implement actual registration logic here
}
</script>

<template>
  <NavbarAll />
  <div class="event-detail-container">
    <div v-if="event" class="container">
      <div class="hero-section">
        <img :src="event.image" :alt="event.title" class="hero-image">
        <div class="hero-overlay">
          <div class="event-badge">{{ event.category }}</div>
          <h1 class="event-title">{{ event.title }}</h1>
          <div class="event-meta">
            <span class="date">{{ event.date }} • {{ event.time }}</span>
            <span class="location">{{ event.location }}</span>
            <span class="price">{{ event.price }}</span>
          </div>
        </div>
      </div>

      <div class="main-content">
        <div class="event-details">
          <h2>About This Event</h2>
          <p>{{ event.description }}</p>

          <h2>Agenda</h2>
          <div class="agenda-list">
            <div v-for="(item, index) in event.agenda" :key="index" class="agenda-item">
              <span class="agenda-time">{{ item.time }}</span>
              <span class="agenda-activity">{{ item.activity }}</span>
            </div>
          </div>

          <h2>Organizer</h2>
          <p>{{ event.organizer }}</p>

          <button class="register-button" @click="handleRegister">
            Register Now
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div v-else class="container">
      <div class="not-found">
        <h2>Event Not Found</h2>
        <p>Sorry, we couldn't find the event you're looking for.</p>
        <router-link to="/events" class="back-link">Back to Events</router-link>
      </div>
    </div>
  </div>
  <FooterAll />
</template>

<style scoped>
.event-detail-container {
  padding-top: 0;
  background-color: #f8fafc;
  min-height: calc(100vh - 200px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero-section {
  margin-top: 90px;
  position: relative;
  height: 400px;
  overflow: hidden;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: white;
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
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
}

.event-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.event-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-size: 1rem;
}

.event-meta span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.event-meta span:before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #ffffff;
  border-radius: 50%;
}

.main-content {
  padding: 2rem 0;
}

.event-details {
  background: white;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.event-details h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.event-details p {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.agenda-list {
  margin-bottom: 2rem;
}

.agenda-item {
  display: flex;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.agenda-time {
  font-weight: 600;
  color: #1e293b;
  min-width: 100px;
}

.agenda-activity {
  color: #475569;
}

.register-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: #1d4ed8;
}

.register-button svg {
  transition: transform 0.3s ease;
}

.register-button:hover svg {
  transform: translateX(3px);
}

.not-found {
  text-align: center;
  padding: 4rem 0;
}

.not-found h2 {
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 1rem;
}

.not-found p {
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: #ffffff;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
}

.back-link:hover {
  background-color: #1d4ed8;
}

@media (max-width: 768px) {
  .hero-section {
    height: 300px;
  }

  .event-title {
    font-size: 2rem;
  }

  .event-meta {
    flex-direction: column;
    gap: 0.75rem;
  }

  .event-details {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 250px;
  }

  .event-title {
    font-size: 1.5rem;
  }

  .agenda-item {
    flex-direction: column;
    gap: 0.5rem;
  }

  .agenda-time {
    min-width: auto;
  }
}
</style>