<script setup lang="ts">
import { SearchResult, SearchResultItem, isErrorResult } from '@/types/search';
import { computed } from 'vue';
import SearchResultItemVue from './SearchResultItem.vue';

interface Props {
  results: SearchResult[];
  isVisible: boolean;
  isDownloading: Record<string, boolean>;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'toggleSummary', index: number): void;
  (e: 'downloadCV', email: string, name?: string, summary?: string): void;
}>();

const errorResults = computed(() => {
  if (props.results.length === 0) return null;
  
  const firstResult = props.results[0];
  if (isErrorResult(firstResult)) {
    return firstResult;
  }
  
  return null;
});

const validResults = computed(() => {
  return props.results.filter(
    (result): result is SearchResultItem => !isErrorResult(result)
  );
});

const handleToggleSummary = (index: number) => {
  emit('toggleSummary', index);
};

const handleDownloadCV = (email: string, name?: string, summary?: string) => {
  emit('downloadCV', email, name, summary);
};
</script>

<template>
  <div 
    v-if="results.length > 0"
    class="mt-10"
    :class="{ 'results-container': true, 'results-visible': isVisible }"
  >
    <h2 class="text-h6 mb-4 font-weight-medium">
      <v-icon color="primary" class="mr-2">mdi-format-list-text</v-icon>
      Search Results 
      <span class="text-subtitle-1 ml-2">({{ results.length }})</span>
    </h2>
    
    <!-- Error message result -->
    <v-alert 
      v-if="errorResults" 
      type="info" 
      class="mb-4 error-alert"
      variant="tonal"
    >
      {{ errorResults.message }}
    </v-alert>
    
    <!-- Display the results as rows -->
    <div v-else class="results-list">
      <SearchResultItemVue
        v-for="(result, index) in validResults"
        :key="result.email"
        :result="result"
        :index="index"
        :isDownloading="isDownloading[result.email]"
        @toggle-summary="handleToggleSummary"
        @download-c-v="handleDownloadCV"
      />
    </div>
  </div>
</template>

<style scoped>
/* Results animations */
.results-container {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.results-visible {
  opacity: 1;
  transform: translateY(0);
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.error-alert {
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  10%, 90% {
    transform: translateX(-1px);
  }
  20%, 80% {
    transform: translateX(2px);
  }
  30%, 50%, 70% {
    transform: translateX(-4px);
  }
  40%, 60% {
    transform: translateX(4px);
  }
}
</style> 