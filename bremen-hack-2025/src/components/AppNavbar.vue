<script setup>
// Navbar component with navigation links
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTheme } from 'vuetify';

const drawer = ref(false);
const route = useRoute();
const router = useRouter();
const theme = useTheme();

// Get all routes for navigation
const routes = router.getRoutes();

// Filter out any routes you don't want to show in the navbar
const navRoutes = computed(() => 
  routes.filter(r => 
    r.name && !r.meta?.hideInNav
  )
);

// Check if a route is active
const isActive = (path) => {
  return route.path === path;
};
</script>

<template>
  <div>
    <!-- App Bar for larger screens -->
    <v-app-bar app color="appBar" elevation="0" class="border-b">
      <v-container class="py-0 fill-height">
        <router-link to="/" class="text-decoration-none d-flex align-center">
          <v-avatar size="36" color="primary" class="mr-2">
            <span class="text-h6 font-weight-bold text-white">A</span>
          </v-avatar>
          <v-app-bar-title class="logo-text">
            <span class="font-weight-bold">AI-</span>
            <span class="font-weight-medium">HackDay</span>
          </v-app-bar-title>
        </router-link>
        
        <v-spacer></v-spacer>
        
        <!-- Navigation links for desktop -->
        <div class="hidden-sm-and-down nav-links">
          <router-link
            v-for="route in navRoutes"
            :key="route.name"
            :to="route.path"
            :class="['nav-link', { 'active': isActive(route.path) }]"
          >
            {{ route.name.charAt(0).toUpperCase() + route.name.slice(1) }}
          </router-link>
        </div>
        
        <!-- Menu button for mobile -->
        <v-app-bar-nav-icon
          class="hidden-md-and-up"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </v-container>
    </v-app-bar>
    
    <!-- Navigation drawer for mobile -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="right"
      theme="light"
      width="280"
    >
      <v-list>
        <v-list-item class="pa-4">
          <template v-slot:prepend>
            <v-avatar color="primary" class="mr-3">
              <span class="text-h6 font-weight-bold text-white">A</span>
            </v-avatar>
          </template>
          <v-list-item-title class="text-h6">AI-HackDay</v-list-item-title>
          <v-list-item-subtitle>2025</v-list-item-subtitle>
        </v-list-item>
      </v-list>
      
      <v-divider></v-divider>
      
      <v-list nav>
        <v-list-item
          v-for="route in navRoutes"
          :key="route.name"
          :to="route.path"
          :value="route.path"
          :active="isActive(route.path)"
          @click="drawer = false"
          class="mb-1"
        >
          <v-list-item-title>
            {{ route.name.charAt(0).toUpperCase() + route.name.slice(1) }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
      
      <template v-slot:append>
        <div class="pa-4">
          <v-btn 
            block 
            variant="tonal" 
            color="primary" 
            to="/upload"
          >
            Upload Files
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<style scoped>
.border-b {
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}

.logo-text {
  font-size: 1.2rem;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-link {
  margin: 0 8px;
  padding: 8px 16px;
  border-radius: 20px;
  color: rgba(var(--v-theme-on-surface), 0.8);
  font-weight: 500;
  position: relative;
  text-transform: capitalize;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.nav-link.active {
  color: rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.1);
}

.nav-link:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
  color: rgb(var(--v-theme-primary));
}
</style> 