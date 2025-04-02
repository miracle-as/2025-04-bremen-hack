<script setup>
// App.vue with routing and Vuetify
import AppNavbar from './components/AppNavbar.vue';
</script>

<template>
  <v-app>
    <AppNavbar />

    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
/* Global styles */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

a {
  text-decoration: none;
  transition: 0.4s;
}

/* Let Vuetify handle most of the styling */
</style>
