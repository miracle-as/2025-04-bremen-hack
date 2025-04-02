<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="home-container">
    <h1>Bremen Hack 2025</h1>
    <p>Welcome to the Bremen Hack 2025 project</p>
    
    <div class="actions">
      <RouterLink to="/upload" class="action-button accent-red">
        Go to File Upload
      </RouterLink>
      <RouterLink to="/colors" class="action-button secondary">
        View Color Palette
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  text-align: center;
  width: 100%;
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
  color: white;
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 3vw, 2rem);
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
}

.action-button.secondary {
  background-color: transparent;
  color: var(--color-primary-dark);
  border: 2px solid var(--color-primary-dark);
}

.action-button.secondary:hover {
  background-color: var(--color-primary-dark);
  color: white;
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