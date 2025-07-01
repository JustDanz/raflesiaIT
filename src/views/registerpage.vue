<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import NavbarLogin from '../components/navbarlogin.vue'
  import FooterAll from '../components/footerall.vue'

  const router = useRouter()
  const fullName = ref('')
  const username = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  const showError = ref(false)
  const error = ref('')
  const isSubmitting = ref(false)

  const togglePassword = () => showPassword.value = !showPassword.value
  const toggleConfirmPassword = () => showConfirmPassword.value = !showConfirmPassword.value

  const handleRegister = async () => {
    if (password.value !== confirmPassword.value) {
      showError.value = true
      error.value = 'Passwords do not match.'
      return
    }
    isSubmitting.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/dashboard')
    } catch (err) {
      showError.value = true
      error.value = 'Registration failed.'
    } finally {
      isSubmitting.value = false
    }
  }
  </script>

  <template>
    <NavbarLogin />
    <div class="register-wrapper">
      <div class="register-container">
        <div class="register-card">
          <div class="register-header">
            <h1>RaflesiaIT</h1>
            <p>Learning Management System</p>
          </div>

          <div class="alerts-container" v-if="showError">
            <div class="alert alert-error">
              <span>{{ error }}</span>
              <button @click="showError = false" aria-label="Close error alert">X</button>
            </div>
          </div>

          <form @submit.prevent="handleRegister" class="register-form">
            <div class="form-group">
              <label for="fullName">Full Name</label>
              <input v-model="fullName" type="text" id="fullName" placeholder="Enter your full name" required aria-label="Full name"/>
            </div>
            <div class="form-group">
              <label for="username">Username</label>
              <input v-model="username" type="text" id="username" placeholder="Enter your username" required aria-label="Username"/>
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input v-model="email" type="email" id="email" placeholder="Enter your email" required aria-label="Email address"/>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <div class="input-wrapper">
                <input v-model="password" :type="showPassword ? 'text' : 'password'" id="password" placeholder="Enter your password" required aria-label="Password"/>
                <button type="button" @click="togglePassword" aria-label="Toggle password visibility">
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <div class="input-wrapper">
                <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" placeholder="Confirm your password" required aria-label="Confirm password"/>
                <button type="button" @click="toggleConfirmPassword" aria-label="Toggle confirm password visibility">
                  <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>
            <button type="submit" class="submit-button" :disabled="isSubmitting">
              {{ isSubmitting ? 'Registering...' : 'Register' }}
            </button>
            <div class="login-link">
              <p>Already have an account? <router-link to="/login" @click="handleNavigation('/login')">Login now</router-link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
    <FooterAll />
  </template>

<style scoped>
.register-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 1rem;
}

.register-container {
  max-width: 400px;
  padding-top: 50px;
  margin: 2rem auto;
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.register-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 2rem;
  width: 100%;
}

.register-header {
  text-align: center;
  margin-bottom: 2rem;
}

.register-header h1 {
  color: var(--primary);
  font-size: 1.5rem;
}

.register-header p {
  color: var(--secondary);
  font-size: 0.95rem;
}

.alert-error {
  background: #fee2e2;
  color: var(--danger);
  padding: 0.75rem;
  border-radius: var(--radius);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.alert-error button {
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem; /* Increased gap for better spacing */
}

.form-group label {
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
  color: var(--secondary);
}

.input-wrapper {
  position: relative;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--gray);
  border-radius: var(--radius);
  font-size: 0.95rem;
  transition: border-color 0.2s ease;
}

.form-group input:focus {
  border-color: var(--primary);
  outline: none;
}

.input-wrapper button {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--secondary);
}

.input-wrapper button:hover {
  color: var(--primary);
}

.submit-button {
  background: var(--primary);
  color: var(--white);
  padding: 0.75rem;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease, transform 0.2s ease;
  margin-top: 0.5rem; /* Added margin to prevent button from feeling too low */
}

.submit-button:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.login-link {
  text-align: center;
  color: var(--secondary);
  font-size: 0.95rem;
  margin-top: 1rem; /* Added margin for better spacing */
}

.login-link a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}

@media (max-width: 576px) {
  .register-container {
    max-width: 100%;
    padding: 0 1rem;
    margin: 1rem auto; /* Reduced margin for smaller screens */
  }
  .register-card {
    padding: 1.5rem;
  }
  .register-form {
    gap: 1rem; /* Adjusted gap for smaller screens */
  }
}
</style>