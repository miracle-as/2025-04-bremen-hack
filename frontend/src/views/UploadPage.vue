<script setup>
import FileUpload from '../components/FileUpload.vue'
import FileList from '../components/FileList.vue'
</script>

<template>
  <v-container class="pt-8 pb-4">
    <h1 class="text-h3 font-weight-black text-center">Upload CV</h1>
    <p class="text-subtitle-1 mt-2 text-center">Upload a CV to get started</p>
  </v-container>
  <v-container>
    <FileUpload />
    <FileList />
  </v-container>
</template>
