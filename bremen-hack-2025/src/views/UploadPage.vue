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
    </div>
  </div>
</template>

<style scoped>
.upload-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  color: var(--color-primary-dark);
  margin-bottom: 2rem;
}

.navigation {
  margin-top: 2rem;
  text-align: center;
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
}

.back-link:hover {
  background-color: var(--color-primary);
  color: white;
}
</style> 