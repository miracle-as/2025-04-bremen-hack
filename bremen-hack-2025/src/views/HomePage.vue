<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="home-page">
    <h1>Bremen Hack 2025</h1>
    <p>Welcome to the Bremen Hack 2025 project</p>
    
    <div class="actions">
      <RouterLink to="/upload" class="action-button">
        Go to File Upload
      </RouterLink>
      <RouterLink to="/colors" class="action-button accent-red">
        View Color Palette
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 80vh;
}

h1 {
  font-size: clamp(2.5rem, 8vw, 4rem);
  color: var(--color-primary-dark);
  margin-bottom: 1rem;
}

p {
  color: #666;
  margin-bottom: 2rem;
  font-size: clamp(1.2rem, 2vw, 1.5rem);
}

.actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: clamp(0.5rem, 3vw, 1.5rem);
  flex-wrap: wrap;
}

.action-button {
  display: inline-block;
  background-color: var(--color-primary);
  color: white;
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 3vw, 2rem);
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
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

@media (max-width: 480px) {
  .home-page {
    padding: 1rem;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  .action-button {
    min-width: 80%;
  }
}
</style> 