<script setup>
import { RouterLink } from 'vue-router'
import ColorPalette from '../components/ColorPalette.vue'
</script>

<template>
  <div class="colors-page">
    <h1>Color Palette</h1>
    <p>Bremen Hack 2025 official brand colors</p>
    
    <ColorPalette />
    
    <div class="color-samples">
      <h2>Button Examples</h2>
      <div class="button-grid">
        <button class="sample-button primary">Primary Button</button>
        <button class="sample-button primary-dark">Primary Dark Button</button>
        <button class="sample-button primary-light">Primary Light Button</button>
        <button class="sample-button accent-red">Accent Red Button</button>
        <button class="sample-button accent-orange">Accent Orange Button</button>
      </div>
    </div>
    
    <div class="navigation">
      <RouterLink to="/" class="nav-link">
        Back to Home
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.colors-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

h1 {
  font-size: clamp(2rem, 5vw, 2.5rem);
  color: var(--color-primary-dark);
  margin-bottom: 0.5rem;
  text-align: center;
}

p {
  color: #666;
  margin-bottom: 2rem;
  font-size: clamp(1rem, 2vw, 1.2rem);
  text-align: center;
}

.color-samples {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin: 2rem auto;
}

h2 {
  text-align: center;
  color: var(--color-primary-dark);
  margin-bottom: 1.5rem;
  font-size: clamp(1.5rem, 3vw, 1.8rem);
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.sample-button {
  padding: 0.75rem 1.25rem;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
}

.sample-button.primary {
  background-color: var(--color-primary);
}

.sample-button.primary:hover {
  background-color: var(--primary-dark);
}

.sample-button.primary-dark {
  background-color: var(--color-primary-dark);
}

.sample-button.primary-dark:hover {
  filter: brightness(1.1);
}

.sample-button.primary-light {
  background-color: var(--color-primary-light);
}

.sample-button.primary-light:hover {
  filter: brightness(0.9);
}

.sample-button.accent-red {
  background-color: var(--color-accent-red);
}

.sample-button.accent-red:hover {
  filter: brightness(0.9);
}

.sample-button.accent-orange {
  background-color: var(--color-accent-orange);
}

.sample-button.accent-orange:hover {
  filter: brightness(0.9);
}

.navigation {
  margin: 2rem auto;
  text-align: center;
}

.nav-link {
  display: inline-block;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-link:hover {
  background-color: var(--color-primary);
  color: white;
}

@media (max-width: 480px) {
  .button-grid {
    grid-template-columns: 1fr;
  }
  
  .colors-page {
    padding: 0.5rem;
  }
}
</style> 