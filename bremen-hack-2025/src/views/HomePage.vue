<script setup>
import { RouterLink } from 'vue-router'
import ColorPalette from '../components/ColorPalette.vue'
</script>

<template>
  <div class="home-page">
    <h1>Bremen Hack 2025</h1>
    <p>Welcome to the Bremen Hack 2025 project</p>
    
    <div class="actions">
      <RouterLink to="/upload" class="action-button">
        Go to File Upload
      </RouterLink>
      <a href="#" class="action-button accent-red">
        Accent Red Button
      </a>
      <a href="#" class="action-button accent-orange">
        Accent Orange Button
      </a>
    </div>
    
    <ColorPalette />
  </div>
</template>

<style scoped>
.home-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  color: var(--color-primary-dark);
  margin-bottom: 1rem;
}

p {
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.2rem;
}

.actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-button {
  display: inline-block;
  background-color: var(--color-primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: var(--color-primary-dark);
}

.action-button.accent-red {
  background-color: var(--color-accent-red);
}

.action-button.accent-red:hover {
  background-color: #c0004f;
}

.action-button.accent-orange {
  background-color: var(--color-accent-orange);
}

.action-button.accent-orange:hover {
  background-color: #e0682c;
}
</style> 