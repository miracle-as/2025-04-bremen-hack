<script setup>
// Navbar component with navigation links
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const drawer = ref(false);
const route = useRoute();
const router = useRouter();

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
    <v-app-bar app color="appBar">
      <v-container class="py-0 fill-height">
        <v-app-bar-title>knowit</v-app-bar-title>
        
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
    >
      <v-list>
        <v-list-item
          v-for="route in navRoutes"
          :key="route.name"
          :to="route.path"
          :active="isActive(route.path)"
          @click="drawer = false"
        >
          <v-list-item-title>
            {{ route.name.charAt(0).toUpperCase() + route.name.slice(1) }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style scoped>
.nav-links {
  display: flex;
  align-items: center;
}

.nav-link {
  margin: 0 12px;
  padding: 5px 0;
  color: rgb(var(--v-theme-on-surface));
  font-weight: 500;
  position: relative;
  text-transform: capitalize;
}

.nav-link.active {
  color: rgb(var(--v-theme-accent));
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: rgb(var(--v-theme-accent));
}

.nav-link:hover {
  opacity: 0.8;
  color: rgb(var(--v-theme-accent));
}
</style> 