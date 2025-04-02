<script setup>
const colors = [
  { name: 'Primary Dark', var: '--color-primary-dark', rgb: 'RGB 20.87.100', pantone: 'PANTONE 7477 C' },
  { name: 'Primary', var: '--color-primary', rgb: 'RGB 56.147.155', pantone: 'PANTONE 5483 C' },
  { name: 'Primary Light', var: '--color-primary-light', rgb: 'RGB 0.146.159', pantone: 'PANTONE 7474 C' },
  { name: 'Accent Red', var: '--color-accent-red', rgb: 'RGB 224.29.92', pantone: 'PANTONE RUBINE RED' },
  { name: 'Accent Orange', var: '--color-accent-orange', rgb: 'RGB 244.119.53', pantone: 'PANTONE 172 C' },
  { name: 'Background Gray', var: '--color-background-gray', rgb: 'RGB 232.231.230', pantone: 'PANTONE COOL GRAY 2 C' }
]
</script>

<template>
  <div class="color-palette">
    <h2>Bremen Hack 2025 Color Palette</h2>
    <div class="color-grid">
      <div 
        v-for="color in colors" 
        :key="color.name"
        class="color-swatch"
      >
        <div class="color-preview" :style="{backgroundColor: `var(${color.var})`}"></div>
        <div class="color-info">
          <h3>{{ color.name }}</h3>
          <p class="pantone">{{ color.pantone }}</p>
          <p class="rgb">{{ color.rgb }}</p>
          <p class="var-name">{{ color.var }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.color-palette {
  max-width: 100%;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: var(--color-primary-dark);
  margin-bottom: 1.5rem;
  font-size: clamp(1.5rem, 3vw, 1.8rem);
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.color-swatch {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.color-swatch:hover {
  transform: translateY(-5px);
}

.color-preview {
  height: 120px;
  width: 100%;
}

.color-info {
  padding: 1.2rem;
  background-color: white;
}

.color-info h3 {
  margin: 0 0 0.5rem;
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 600;
}

.color-info p {
  margin: 0.3rem 0;
  font-size: clamp(0.8rem, 1.5vw, 0.9rem);
  color: #666;
}

.var-name {
  font-family: monospace;
  background-color: #f5f5f5;
  padding: 0.3rem 0.5rem;
  border-radius: 3px;
  margin-top: 0.6rem !important;
  font-size: clamp(0.75rem, 1.5vw, 0.85rem) !important;
}

@media (max-width: 768px) {
  .color-palette {
    padding: 1rem;
  }
  
  .color-grid {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .color-preview {
    height: 100px;
  }
  
  .color-info {
    padding: 1rem;
  }
}
</style> 