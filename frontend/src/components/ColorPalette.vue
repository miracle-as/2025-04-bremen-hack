<script setup>
const colors = [
  { name: 'Primary Dark', color: 'primary-darken-1', rgb: 'RGB 20.87.100', pantone: 'PANTONE 7477 C' },
  { name: 'Primary', color: 'primary', rgb: 'RGB 56.147.155', pantone: 'PANTONE 5483 C' },
  { name: 'Primary Light', color: 'secondary', rgb: 'RGB 0.146.159', pantone: 'PANTONE 7474 C' },
  { name: 'Accent Red', color: 'error', rgb: 'RGB 224.29.92', pantone: 'PANTONE RUBINE RED' },
  { name: 'Accent Orange', color: 'warning', rgb: 'RGB 244.119.53', pantone: 'PANTONE 172 C' },
  { name: 'Background Gray', color: 'grey', rgb: 'RGB 232.231.230', pantone: 'PANTONE COOL GRAY 2 C' }
]
</script>

<template>
  <v-card class="mx-auto mt-6">
    <v-card-title class="text-center">
      Bremen Hack 2025 Color Palette
    </v-card-title>
    
    <v-card-text>
      <v-row>
        <v-col 
          v-for="color in colors" 
          :key="color.name"
          cols="12"
          sm="6"
          md="4"
          class="pa-2"
        >
          <v-card
            elevation="2"
            class="h-100"
            :ripple="true"
          >
            <div 
              class="d-flex align-center justify-center" 
              style="height: 120px"
              :class="color.color"
            ></div>
            
            <v-card-text>
              <h3 class="text-h6 font-weight-bold mb-2">{{ color.name }}</h3>
              <v-list-item density="compact" class="px-0">
                <template v-slot:prepend>
                  <v-icon icon="mdi-palette" size="small"></v-icon>
                </template>
                <v-list-item-title class="text-body-2">{{ color.pantone }}</v-list-item-title>
              </v-list-item>
              
              <v-list-item density="compact" class="px-0">
                <template v-slot:prepend>
                  <v-icon icon="mdi-palette-swatch" size="small"></v-icon>
                </template>
                <v-list-item-title class="text-body-2">{{ color.rgb }}</v-list-item-title>
              </v-list-item>
              
              <v-chip
                class="mt-2"
                size="small"
                color="grey-lighten-3"
                variant="flat"
              >
                {{ color.color }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
/* All styling is handled by Vuetify */
</style> 