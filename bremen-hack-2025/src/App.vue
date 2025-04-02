<script setup>
// App.vue with routing
</script>

<template>
  <div class="app-container">
    <div class="app">
      <RouterView />
    </div>
  </div>
</template>

<style>
.app-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.app {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  font-weight: normal;
}

a {
  text-decoration: none;
  transition: 0.4s;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .app {
    padding: 0 0.5rem;
  }
}
</style>
