<!-- App.vue -->
<script setup>
import { computed, watch, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const layout = computed(() => route.meta.layout || 'div')
const isLoaded = ref(false)

onMounted(() => {
  // Simulate loading completion (adjust based on actual needs)
  setTimeout(() => {
    isLoaded.value = true
  }, 100) // Small delay to account for Cloudflare script
})

watch(
  () => route.path,
  () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
)
</script>

<template>
  <div>
    <!-- Preloader -->
    <div v-if="!isLoaded" class="preloader">
      <div class="loader"></div>
    </div>
    <!-- Main Content -->
    <component :is="layout" id="app" v-show="isLoaded">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </component>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background-color: #f8fafc;
}

.preloader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader {
  width: 40px;
  height: 40px;
  border: 4px solid #2563eb;
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>