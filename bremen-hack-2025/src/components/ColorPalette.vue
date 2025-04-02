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
          <p>{{ color.pantone }}</p>
          <p>{{ color.rgb }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.color-palette {
  max-width: 800px;
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
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.color-swatch {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.color-preview {
  height: 100px;
  width: 100%;
}

.color-info {
  padding: 1rem;
  background-color: white;
}

.color-info h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.color-info p {
  margin: 0.2rem 0;
  font-size: 0.9rem;
  color: #666;
}
</style> 