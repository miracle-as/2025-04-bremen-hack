<script setup lang="ts">
import { ref } from 'vue';

interface SearchFormProps {
  isSearching: boolean;
}

const props = defineProps<SearchFormProps>();
const emit = defineEmits<{
  (e: 'search', query: string): void;
}>();

const searchQuery = ref<string>('');

const handleSearch = (): void => {
  if (!searchQuery.value.trim()) return;
  emit('search', searchQuery.value);
};
</script>

<template>
  <v-card 
    class="pa-5 mx-auto searchCardAnimation"
    max-width="800px"
    elevation="3"
    rounded="lg"
  >
    <v-card-text>
      <v-form @submit.prevent="handleSearch">
        <v-textarea
          v-model="searchQuery"
          label="What skills or experience are you looking for?"
          placeholder="Examples: 'React developers with 5+ years experience', 'Project managers familiar with agile', 'Data scientists with AI experience'"
          rows="3"
          auto-grow
          variant="outlined"
          counter
          class="searchInputAnimation"
        ></v-textarea>
        
        <v-btn
          color="accent"
          type="submit"
          :loading="isSearching"
          :disabled="!searchQuery.trim()"
          class="mt-4 search-btn"
        >
          <v-icon class="mr-2">mdi-magnify</v-icon>
          Search
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.searchCardAnimation {
  animation: fadeIn 0.8s ease-out;
  animation-delay: 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.searchCardAnimation:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.searchInputAnimation {
  animation: fadeIn 0.8s ease-out;
  animation-delay: 0.6s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.search-btn {
  transition: all 0.3s ease;
}

.search-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style> 