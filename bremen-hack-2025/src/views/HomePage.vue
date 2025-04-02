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
    </div>
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
  color: #333;
  margin-bottom: 1rem;
}

p {
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.2rem;
}

.actions {
  margin-top: 2rem;
}

.action-button {
  display: inline-block;
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #3e8e41;
}
</style> 