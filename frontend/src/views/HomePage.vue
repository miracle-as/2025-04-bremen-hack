<template>
  <div>
    <div class="background-container">
      <div class="gradient-background"></div>
      <div class="particle-overlay" ref="particles"></div>
    </div>
    <div class="home-page">
      <v-container class="text-center">
        <h1 class="text-h3 font-weight-black" ref="mainTitle">AI-HackDay 2025</h1>
        <p class="text-subtitle-1 tagline" ref="tagline">Where innovation meets creativity</p>

        <v-row justify="center">
          <v-col cols="12" sm="auto" class="pa-2">
            <v-btn 
              to="/upload" 
              color="accent" 
              class="upload-btn"
              size="large"
              elevation="4"
              ref="uploadBtn"
            >
              <v-icon left class="mr-2">mdi-cloud-upload</v-icon>
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
      </v-container>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { useTheme } from 'vuetify';

export default {
  name: 'HomePage',
  setup() {
    const theme = useTheme();
    return { theme };
  },
  mounted() {
    this.initAnimations();
    this.createParticles();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if (this.particlesInstance) {
      this.particlesInstance.destroy();
    }
  },
  methods: {
    initAnimations() {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.from(this.$refs.mainTitle, {
        y: 100,
        opacity: 0,
        duration: 1.2,
      })
        .from(this.$refs.tagline, {
          y: 50,
          opacity: 0,
          duration: 0.8,
        }, '-=0.6')
        .from(this.$refs.uploadBtn, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        }, '-=0.4');
      
      // Continuous floating animation for title
      gsap.to(this.$refs.mainTitle, {
        y: '+=10',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    createParticles() {
      // Simple particle effect using AI-HackDay colors
      this.particlesContainer = this.$refs.particles;
      this.particlesCount = 80;
      this.particles = [];
      
      // Get colors from Vuetify theme
      const themeColors = this.theme.current.value.colors;
      const colors = [
        themeColors.primary,
        themeColors.accent,
        themeColors.secondary,
        themeColors.warning,
        themeColors.error,
      ];
      
      for (let i = 0; i < this.particlesCount; i++) {
        this.createParticle(colors);
      }
      
      this.animateParticles();
    },
    createParticle(colors) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      const size = Math.random() * 10 + 2;
      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * window.innerHeight;
      const opacity = Math.random() * 0.5 + 0.2;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      const colorIndex = Math.floor(Math.random() * colors.length);
      
      // Set particle styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      particle.style.opacity = opacity;
      particle.style.backgroundColor = colors[colorIndex];
      
      this.particlesContainer.appendChild(particle);
      this.particles.push(particle);
      
      // Animate each particle
      gsap.to(particle, {
        y: `+=${Math.random() * 300 - 150}`,
        x: `+=${Math.random() * 300 - 150}`,
        opacity: Math.random() * 0.5 + 0.1,
        duration: duration,
        delay: delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    animateParticles() {
      // No additional animation needed as we're using GSAP for individual particles
    },
    handleResize() {
      // Update particle positions on window resize if needed
    },
  },
};
</script>

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

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-color: var(--v-background-base, #fdfbe6);
}

.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
}

.home-page {
  position: relative;
  width: 100%;
  z-index: 1;
}

.home-page::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(135deg, rgba(56, 147, 159, 0.05) 0%, transparent 40%),
    linear-gradient(235deg, rgba(224, 0, 96, 0.05) 10%, transparent 50%);
  z-index: -1;
  pointer-events: none;
}

.gradient-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, 
                rgba(56, 147, 159, 0.15) 0%, 
                rgba(0, 146, 165, 0.1) 35%, 
                rgba(224, 0, 96, 0.05) 70%,
                rgba(244, 120, 60, 0.03) 100%);
  z-index: 0;
}

.particle-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.main-title {
  font-size: 5rem !important;
  font-weight: 900 !important;
  letter-spacing: -1px;
  margin-bottom: 2rem !important;
  background: linear-gradient(to right, #38939F, #0092A5);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(56, 147, 159, 0.2);
}

.tagline {
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 2rem;
  letter-spacing: 1px;
  padding-top: 0.5rem;
  position: relative;
  top: 0;
  margin-top: 7em;
}

.upload-btn {
  transition: transform 0.3s ease;
  min-width: 180px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 2em;
}

.upload-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(224, 0, 96, 0.3) !important;
}
</style> 