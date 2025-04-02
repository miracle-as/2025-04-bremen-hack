<script setup lang="ts">
// Navbar component with navigation links
import { ref, computed } from 'vue';
import { useRoute, useRouter, RouteRecordRaw } from 'vue-router';
import { useTheme } from 'vuetify';

const drawer = ref<boolean>(false);
const route = useRoute();
const router = useRouter();
const theme = useTheme();

// Get all routes for navigation
const routes = router.getRoutes();

// Filter out any routes you don't want to show in the navbar
const navRoutes = computed<RouteRecordRaw[]>(() => 
  routes.filter(r => 
    r.name && !r.meta?.hideInNav
  )
);

// Check if a route is active
const isActive = (path: string): boolean => {
  return route.path === path;
};

// Format route name for display
const formatRouteName = (name: string | symbol): string => {
  const nameStr = String(name);
  return nameStr.charAt(0).toUpperCase() + nameStr.slice(1);
};
</script>

<template>
  <div>
    <!-- App Bar for larger screens -->
    <v-app-bar app color="appBar" elevation="0" class="border-b">
      <v-container class="py-0 fill-height">
        <router-link to="/" class="text-decoration-none d-flex align-center">
          <img src="/knowit_logo.svg" alt="Knowit Logo" class="knowit-logo mr-2" />
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
            {{ formatRouteName(route.name) }}
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
            <img src="/knowit_logo.svg" alt="Knowit Logo" class="knowit-logo-drawer mr-3" />
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
            {{ formatRouteName(route.name) }}
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

.knowit-logo {
  height: 24px;
  width: auto;
  margin-right: 12px;
}

.knowit-logo-drawer {
  height: 28px;
  width: auto;
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