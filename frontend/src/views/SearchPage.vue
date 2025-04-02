<script setup lang="ts">
import { useSearch } from '@/composables/useSearch';
import { useCVDownload } from '@/composables/useCVDownload';
import SearchForm from '@/components/search/SearchForm.vue';
import SearchResults from '@/components/search/SearchResults.vue';

const { 
  searchResults, 
  isSearching, 
  resultsVisible, 
  error, 
  handleSearch, 
  toggleSummary, 
  clearError 
} = useSearch();

const { 
  downloadState, 
  downloadCV, 
  closeMessage 
} = useCVDownload();
</script>

<template>
  <v-container class="pt-8 pb-4">
    <div class="text-center mb-8">
      <h1 class="text-h2 font-weight-black text-center searchTitleAnimation">
        <span class="primary--text">CV</span><span> Search</span>
      </h1>
      <p class="text-subtitle-1 mt-2 text-center subtitleAnimation">
        Discover expertise across our talent pool with AI-powered search
      </p>
    </div>
    
    <SearchForm 
      :is-searching="isSearching" 
      @search="handleSearch"
    />
    
    <SearchResults 
      :results="searchResults" 
      :is-visible="resultsVisible"
      :is-downloading="downloadState.isDownloading"
      @toggle-summary="toggleSummary"
      @download-c-v="downloadCV"
    />
    
    <v-snackbar
      v-model="error.show"
      :timeout="4000"
      color="error"
    >
      {{ error.message }}
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="clearError"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      v-model="downloadState.showMessage"
      :timeout="4000"
      :color="downloadState.status"
    >
      {{ downloadState.message }}
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="closeMessage"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<style scoped>
/* Search animations */
.searchTitleAnimation {
  animation: fadeInDown 0.8s ease-out;
}

.subtitleAnimation {
  animation: fadeInUp 0.8s ease-out;
  animation-delay: 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
}

/* Keyframe Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 