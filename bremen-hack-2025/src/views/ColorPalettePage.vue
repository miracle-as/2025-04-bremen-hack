<script setup>
import { ref } from 'vue';
import ColorPalette from '../components/ColorPalette.vue';

const selectedColor = ref(null);
const colorCopied = ref(false);

// Function to copy color code to clipboard
function copyColorToClipboard(color) {
  console.log('Color clicked:', color);
  
  try {
    navigator.clipboard.writeText(color);
    selectedColor.value = color;
    colorCopied.value = true;
    
    setTimeout(() => {
      colorCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy color:', err);
    // Show error alert as fallback
    alert(`Could not copy color: ${color}. Please copy it manually.`);
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <v-container class="pt-8 pb-4">
      <h1 class="text-h3 font-weight-black text-center">Color Palette</h1>
      <p class="text-subtitle-1 mt-2 text-center">AI-HackDay official brand colors</p>
    </v-container>
    
    <v-container>
      <v-card class="main-card" elevation="4">
        <v-row class="pa-4">
          <v-col cols="12">
            <h2 class="text-h5 font-weight-bold mb-4">Brand Colors</h2>
            <p class="mb-6">
              Our color palette reflects the innovation and creativity of AI-HackDay. 
              The colors are carefully selected to create a modern, tech-focused aesthetic 
              while maintaining accessibility and visual harmony.
            </p>
            
            <ColorPalette @click:color="copyColorToClipboard" />
            
            <v-alert
              v-if="colorCopied"
              type="success"
              variant="tonal"
              class="mt-4 mb-2 copy-alert"
            >
              <div class="d-flex align-center">
                <div 
                  class="color-preview mr-2" 
                  :style="{ backgroundColor: selectedColor }"
                ></div>
                <span>{{ selectedColor }} copied to clipboard!</span>
              </div>
            </v-alert>
          </v-col>
        </v-row>
      </v-card>
      
      <v-card class="pa-6 mt-8" elevation="3">
        <v-card-title class="text-center text-h5 font-weight-bold mb-6">
          Button Examples
        </v-card-title>
        
        <v-row justify="center" class="button-showcase">
          <v-col cols="12" sm="6" md="4" lg="2" class="pa-2">
            <v-btn color="primary" block size="large" class="button-demo">Primary Button</v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="2" class="pa-2">
            <v-btn color="primary-darken-1" block size="large" class="button-demo">Primary Dark</v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="2" class="pa-2">
            <v-btn color="secondary" block size="large" class="button-demo">Primary Light</v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="2" class="pa-2">
            <v-btn color="error" block size="large" class="button-demo">Accent Red</v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="2" class="pa-2">
            <v-btn color="warning" block size="large" class="button-demo">Accent Orange</v-btn>
          </v-col>
        </v-row>
        
        <v-divider class="my-6"></v-divider>
        
        <v-row justify="center" class="outlined-buttons">
          <v-col cols="12" sm="6" md="4" lg="2" class="pa-2">
            <v-btn color="primary" variant="outlined" block>Primary</v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="2" class="pa-2">
            <v-btn color="secondary" variant="outlined" block>Secondary</v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="2" class="pa-2">
            <v-btn color="accent" variant="outlined" block>Accent</v-btn>
          </v-col>
        </v-row>
        
        <v-row justify="center" class="text-buttons mt-4">
          <v-col cols="12" sm="6" md="4" lg="2" class="pa-2">
            <v-btn color="primary" variant="text" block>Text Button</v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="2" class="pa-2">
            <v-btn color="secondary" variant="text" block>Text Button</v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="2" class="pa-2">
            <v-btn color="accent" variant="text" block>Text Button</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    
    <v-container class="mt-8 mb-12">
      <v-row justify="center">
        <v-col cols="12" sm="auto" class="text-center">
          <v-btn 
            to="/" 
            color="primary" 
            variant="tonal"
            size="large"
            prepend-icon="mdi-arrow-left"
            class="back-btn"
          >
            Back to Home
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.main-card {
  border-radius: 16px;
  overflow: hidden;
}

.button-demo {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.button-demo:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.copy-alert {
  animation: fade-in 0.3s ease;
}

.color-preview {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.back-btn {
  transition: transform 0.3s ease;
}

.back-btn:hover {
  transform: translateX(-5px);
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 