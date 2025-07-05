<script setup>
defineProps({
  dashboardMessage: {
    type: String,
    required: true
  },
  stats: {
    type: Array,
    required: true
  }
});
</script>
<template>
  <div class="dashboard-message">{{ dashboardMessage }}</div>
  <div class="stats-grid">
    <div v-for="stat in stats" :key="stat.title" class="stat-card">
      <i :class="stat.icon"></i>
      <div class="stat-info">
        <h3>{{ stat.title }}</h3>
        <p>{{ stat.value }}</p>
        <span class="trend">{{ stat.trend }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--white);
  padding: 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-card i {
  font-size: 2rem;
  color: var(--primary);
}

.stat-info h3 {
  font-size: 1.1rem;
  color: var(--secondary-dark);
  margin-bottom: 0.5rem;
}

.stat-info p {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-dark);
}

.trend {
  color: var(--accent);
  font-size: 0.9rem;
}
</style>