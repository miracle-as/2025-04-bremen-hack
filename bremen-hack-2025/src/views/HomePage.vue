<template>
  <div>
    <div class="video-background">
      <video autoplay loop muted playsinline>
        <source src="/hack-video-3.mp4" type="video/mp4">
        <!-- Replace your-video-file.mp4 with your actual video file name -->
      </video>
    </div>
    <v-container class="text-center content-overlay">
      <v-row justify="center">
        <v-col>
          <h1 class="my-12 text-h2 font-weight-bold">Bremen Hack 2025</h1>        
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
  </div>
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

.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  margin: 0;
  padding: 0;
}

.video-background video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(5px) brightness(1.3); /* Added blur effect and increased brightness */
}

.content-overlay {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content-overlay h1 {
  color: black;
  /* text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); */
}
</style> 