<script setup>
import { useTheme } from 'vuetify';
import { ref, defineEmits, computed } from 'vue';

const emit = defineEmits(['click:color']);
const theme = useTheme();
const themeColors = theme.current.value.colors;

// Directly use Vuetify theme colors
const colorPalette = computed(() => {
  return [
    { 
      name: 'Primary', 
      color: 'primary',
      hexCode: themeColors.primary,
      rgb: hexToRgb(themeColors.primary)
    },
    { 
      name: 'Secondary', 
      color: 'secondary',
      hexCode: themeColors.secondary,
      rgb: hexToRgb(themeColors.secondary) 
    },
    { 
      name: 'Accent', 
      color: 'accent',
      hexCode: themeColors.accent,
      rgb: hexToRgb(themeColors.accent) 
    },
    { 
      name: 'Error', 
      color: 'error',
      hexCode: themeColors.error,
      rgb: hexToRgb(themeColors.error) 
    },
    { 
      name: 'Warning', 
      color: 'warning',
      hexCode: themeColors.warning,
      rgb: hexToRgb(themeColors.warning) 
    },
    { 
      name: 'Info', 
      color: 'info',
      hexCode: themeColors.info,
      rgb: hexToRgb(themeColors.info) 
    },
    { 
      name: 'Success', 
      color: 'success',
      hexCode: themeColors.success,
      rgb: hexToRgb(themeColors.success) 
    },
    {
      name: 'Surface',
      color: 'surface',
      hexCode: themeColors.surface,
      rgb: hexToRgb(themeColors.surface)
    },
    {
      name: 'Background',
      color: 'background',
      hexCode: themeColors.background,
      rgb: hexToRgb(themeColors.background)
    }
  ];
});

// Function to convert hex to RGB
function hexToRgb(hex) {
  if (!hex) return 'N/A';
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
    `RGB ${parseInt(result[1], 16)}.${parseInt(result[2], 16)}.${parseInt(result[3], 16)}` :
    'N/A';
}

// Copy color code to clipboard and emit event
function copyColor(color) {
  if (color && color.hexCode) {
    console.log('Emitting color:', color.hexCode);
    emit('click:color', color.hexCode);
  }
}
</script>

<template>
  <v-card class="mx-auto mt-6">
    <v-card-title class="text-center">
      AI-HackDay 2025 Color Palette
    </v-card-title>
    
    <v-card-text>
      <v-row>
        <v-col 
          v-for="color in colorPalette" 
          :key="color.name"
          cols="12"
          sm="6"
          md="4"
          class="pa-2"
        >
          <v-card
            elevation="2"
            class="h-100 color-card"
            :ripple="true"
            @click="copyColor(color)"
          >
            <div 
              class="d-flex align-center justify-center color-block" 
              style="height: 120px"
              :style="{backgroundColor: color.hexCode}"
            >
              <v-tooltip activator="parent" location="top">Click to copy color code</v-tooltip>
              <v-icon class="copy-icon" color="white" icon="mdi-content-copy"></v-icon>
            </div>
            
            <v-card-text>
              <h3 class="text-h6 font-weight-bold mb-2">{{ color.name }}</h3>
              
              <v-list-item density="compact" class="px-0">
                <template v-slot:prepend>
                  <v-icon icon="mdi-palette-swatch" size="small"></v-icon>
                </template>
                <v-list-item-title class="text-body-2">
                  {{ color.rgb }}
                </v-list-item-title>
              </v-list-item>
              
              <v-chip
                class="mt-2"
                size="small"
                :color="color.color"
                variant="flat"
              >
                {{ color.color }}
              </v-chip>
              
              <v-chip
                class="mt-2 ml-2"
                size="small"
                color="grey-lighten-3"
                variant="flat"
              >
                {{ color.hexCode }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.color-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.color-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.color-block {
  position: relative;
}

.color-block .copy-icon {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.color-block:hover .copy-icon {
  opacity: 0.8;
}
</style> 