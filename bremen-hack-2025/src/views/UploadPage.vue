<script setup>
import { RouterLink } from 'vue-router'
import FileUpload from '../components/FileUpload.vue'
</script>

<template>
  <div class="upload-page">
    <h1>File Upload</h1>
    
    <FileUpload />
    
    <div class="navigation">
      <RouterLink to="/" class="back-link">
        Back to Home
      </RouterLink>
      <RouterLink to="/colors" class="back-link accent">
        View Colors
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.upload-page {
  max-width: 800px;
  margin: 0 auto;
  padding: clamp(1rem, 5vw, 2rem);
  display: flex;
  flex-direction: column;
  min-height: 80vh;
}

h1 {
  text-align: center;
  color: var(--color-primary-dark);
  margin-bottom: clamp(1rem, 5vw, 2rem);
  font-size: clamp(1.8rem, 5vw, 2.5rem);
}

.navigation {
  margin-top: clamp(1.5rem, 5vw, 2rem);
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.back-link {
  display: inline-block;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  transition: all 0.3s;
  min-width: 120px;
}

.back-link:hover {
  background-color: var(--color-primary);
  color: white;
}

.back-link.accent {
  color: var(--color-accent-red);
  border-color: var(--color-accent-red);
}

.back-link.accent:hover {
  background-color: var(--color-accent-red);
  color: white;
}

@media (max-width: 480px) {
  .navigation {
    flex-direction: column;
    align-items: center;
  }
  
  .back-link {
    min-width: 80%;
  }
}
</style> 