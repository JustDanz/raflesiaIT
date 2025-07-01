<script setup>
  import NavbarLogin from '../components/navbarlogin.vue'
  import FooterAll from '../components/footerall.vue'
  </script>

  <template>
    <NavbarLogin />
    <div class="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <router-link to="/" @click="handleNavigation('/')">Go to Home</router-link>
    </div>
    <FooterAll />
  </template>

  <style scoped>
  .not-found-container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
    text-align: center;
  }
  </style>