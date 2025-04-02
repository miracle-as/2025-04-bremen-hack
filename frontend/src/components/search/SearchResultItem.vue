<script setup lang="ts">
import { computed } from 'vue';
import { SearchResultItem } from '@/types/search';

interface Props {
  result: SearchResultItem;
  index: number;
  isDownloading: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'toggleSummary', index: number): void;
  (e: 'downloadCV', email: string, name?: string, summary?: string): void;
}>();

const displayName = computed(() => props.result.name || getFirstNameFromEmail(props.result.email));

function getFirstNameFromEmail(email: string): string {
  if (!email) return 'User';
  const namePart = email.split('@')[0];
  const firstNamePart = namePart.split('.')[0];
  return firstNamePart.charAt(0).toUpperCase() + firstNamePart.slice(1);
}

function getMatchPercentage(distance?: number): number {
  if (distance === undefined) return 95; // Default value
  return Math.round((1 - distance) * 100);
}

function toggleSummary(): void {
  emit('toggleSummary', props.index);
}

function downloadCV(): void {
  emit('downloadCV', props.result.email, props.result.name, props.result.summary);
}
</script>

<template>
  <v-card 
    class="result-row mb-4"
    :style="{ animationDelay: `${index * 0.1}s` }"
    elevation="2"
    rounded="lg"
  >
    <div class="d-flex flex-row align-start pa-4">
      <!-- Content section -->
      <div class="flex-grow-1">
        <div class="d-flex flex-wrap align-start mb-1">
          <div>
            <div class="text-h6">{{ displayName }}</div>
            <div class="text-body-2 text-grey-darken-1">
              <v-icon size="small" class="mr-1">mdi-email</v-icon>
              {{ result.email }}
            </div>
          </div>
          
          <div class="d-flex flex-wrap ml-auto">
            <v-chip
              size="small"
              color="primary"
              variant="flat"
              class="mr-2 mt-1"
            >
              <v-icon size="x-small" class="mr-1">mdi-star</v-icon>
              {{ getMatchPercentage(result.distance) }}% Match
            </v-chip>
            
            <v-chip
              v-if="result.distance !== undefined"
              size="small"
              variant="flat"
              class="mr-2 mt-1"
              color="info"
            >
              <v-icon size="x-small" class="mr-1">mdi-map-marker</v-icon>
              {{ result.distance.toFixed(2) }} Distance
            </v-chip>
          </div>
        </div>
        
        <p 
          class="text-body-2 text-pre-wrap" 
          :class="{ 'summary-text-row': !result.expanded, 'summary-text-expanded': result.expanded }"
          @click="toggleSummary"
        >
          {{ result.summary }}
          <span v-if="!result.expanded" class="expand-indicator">
            <v-icon size="small">mdi-chevron-down</v-icon> Show more
          </span>
          <span v-else class="expand-indicator">
            <v-icon size="small">mdi-chevron-up</v-icon> Show less
          </span>
        </p>
      </div>
      
      <!-- Actions section -->
      <div class="ml-4 d-flex">
        <v-btn
          variant="outlined"
          color="primary"
          size="small"
          prepend-icon="mdi-download"
          @click="downloadCV"
          :loading="isDownloading"
          :disabled="isDownloading"
        >
          CV
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.result-row {
  animation: fadeInUp 0.5s ease-out;
  animation-fill-mode: forwards;
  opacity: 0;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  position: relative;
  overflow: hidden;
}

.result-row:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08) !important;
  border-left: 4px solid rgb(var(--v-theme-primary));
}

.result-row:after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 5px;
  background: linear-gradient(90deg, transparent, rgba(var(--v-theme-primary), 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.result-row:hover:after {
  opacity: 1;
}

.summary-text-row {
  max-height: 60px;
  overflow: hidden;
  position: relative;
  margin-bottom: 0;
  margin-top: 8px;
  line-height: 1.5;
  cursor: pointer;
}

.summary-text-row::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 20px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
}

.summary-text-expanded {
  margin-top: 8px;
  line-height: 1.5;
  cursor: pointer;
  padding-bottom: 4px;
  transition: all 0.3s ease;
}

.expand-indicator {
  display: inline-flex;
  align-items: center;
  color: rgb(var(--v-theme-primary));
  font-size: 0.75rem;
  margin-left: 8px;
  opacity: 0.8;
  vertical-align: middle;
}

.summary-text-expanded .expand-indicator {
  display: block;
  margin-top: 8px;
}

.text-pre-wrap {
  white-space: pre-wrap;
}

.skills-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
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