<script setup>
import { RouterLink } from 'vue-router'
import ColorPalette from '../components/ColorPalette.vue'
</script>

<template>
  <v-container>
    <h1>Color Palette</h1>
    <p class="text-subtitle-1 mb-6">Bremen Hack 2025 official brand colors</p>
    <ColorPalette />
    <v-card class="pa-4">
      <v-card-title class="text-center text-h5 font-weight-bold mb-4">Button Examples</v-card-title>
      
      <v-row justify="center">
        <v-col cols="12" sm="6" md="4" lg="2" class="pa-2">
          <v-btn color="primary" block>Primary Button</v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="2" class="pa-2">
          <v-btn color="primary-darken-1" block>Primary Dark</v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="2" class="pa-2">
          <v-btn color="secondary" block>Primary Light</v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="2" class="pa-2">
          <v-btn color="error" block>Accent Red</v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="2" class="pa-2">
          <v-btn color="warning" block>Accent Orange</v-btn>
        </v-col>
      </v-row>
    </v-card>
    
    <v-row justify="center" class="mt-6">
      <v-col cols="12" sm="auto" class="text-center">
        <v-btn 
          to="/" 
          color="primary" 
          variant="outlined"
          prepend-icon="mdi-arrow-left"
        >
          Back to Home
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* All styling is handled by Vuetify */
</style> 