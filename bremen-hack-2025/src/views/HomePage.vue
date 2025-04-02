<template>
  <v-container class="text-center">
    <v-row justify="center">
      <v-col>
        <h1 class="my-12 text-h2">Bremen Hack 2025</h1>        
        <v-row justify="center" class="mt-6">
          <v-col cols="12" sm="auto" class="pa-2">
            <v-btn 
              to="/upload" 
              color="accent" 
            >
              File Upload
            </v-btn>
          </v-col>
          <!-- <v-col cols="12" sm="auto" class="pa-2">
            <v-btn 
              to="/colors" 
              color="primary" 
              variant="outlined"
            >
              Color Palette
            </v-btn>
          </v-col> -->
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
/* We can create a custom theme to match the original colors */
/* :root {
  --v-theme-primary: var(--color-primary);
  --v-theme-primary-darken-1: var(--color-primary-dark);
  --v-theme-secondary: var(--color-primary-light);
  --v-theme-error: var(--color-accent-red);
  --v-theme-warning: var(--color-accent-orange);
  --v-theme-background: var(--color-background);
} */
</style> 