<script setup>
import FileUpload from '../components/FileUpload.vue'
import FileList from '../components/FileList.vue'
</script>

<template>
  <v-container>
    <h1 class="my-8">CV</h1>
    <FileUpload />
    <FileList />
  </v-container>
</template>

<style scoped>
/* All styling is handled by Vuetify */
</style> 