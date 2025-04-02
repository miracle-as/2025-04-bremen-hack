<script setup>
// App.vue with routing
</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style>
.app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

a {
  text-decoration: none;
  transition: 0.4s;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }
}
</style>
