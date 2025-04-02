<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-6">Settings</h1>
        
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
          size="64"
          class="mx-auto my-8 d-block"
        ></v-progress-circular>

        <v-card v-else class="pa-6">
          <v-card-title class="text-h5 mb-4">Prompt Settings</v-card-title>
          
          <v-form @submit.prevent="saveSettings">
            <v-textarea
              v-model="settings.searchSummaryPrompt"
              label="Search Summary Prompt"
              variant="outlined"
              rows="3"
              class="mb-4"
              hide-details="auto"
            ></v-textarea>
            
            <v-textarea
              v-model="settings.searchTemplatePrompt"
              label="Search Template Prompt"
              variant="outlined"
              rows="3"
              class="mb-6"
              hide-details="auto"
            ></v-textarea>
            
            <v-btn
              color="primary"
              :loading="saving"
              @click="saveSettings"
              variant="flat"
            >
              {{ saving ? 'Saving...' : 'Save Changes' }}
            </v-btn>
          </v-form>
          
          <v-alert
            v-if="saveSuccess"
            type="success"
            variant="tonal"
            class="mt-4"
          >
            Settings saved successfully!
          </v-alert>
          
          <v-alert
            v-if="saveError"
            type="error"
            variant="tonal"
            class="mt-4"
          >
            {{ saveError }}
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const settings = ref({
  searchSummaryPrompt: "",
  searchTemplatePrompt: ""
});

const loading = ref(true);
const saving = ref(false);
const saveSuccess = ref(false);
const saveError = ref(null);

onMounted(async () => {
  try {
    await fetchSettings();
  } catch (error) {
    console.error("Error fetching settings:", error);
    saveError.value = "Failed to load settings. Please try again.";
  } finally {
    loading.value = false;
  }
});

async function fetchSettings() {
  const promptDocRef = doc(db, "config", "prompt");
  const promptDocSnap = await getDoc(promptDocRef);
  
  if (promptDocSnap.exists()) {
    const data = promptDocSnap.data();
    settings.value.searchSummaryPrompt = data.searchSummaryPrompt || "";
    settings.value.searchTemplatePrompt = data.searchTemplatePrompt || "";
  } else {
    // If document doesn't exist, use defaults from your screenshot
    settings.value.searchSummaryPrompt = "Make a short summary of the following CV";
    settings.value.searchTemplatePrompt = "Giv mig alle de kandidater, der passer på følgende beskrivelse QUERY_INSERTED_HERE";
  }
}

async function saveSettings() {
  saving.value = true;
  saveSuccess.value = false;
  saveError.value = null;
  
  try {
    const promptDocRef = doc(db, "config", "prompt");
    await setDoc(promptDocRef, {
      searchSummaryPrompt: settings.value.searchSummaryPrompt,
      searchTemplatePrompt: settings.value.searchTemplatePrompt
    });
    
    saveSuccess.value = true;
    setTimeout(() => {
      saveSuccess.value = false;
    }, 3000);
  } catch (error) {
    console.error("Error saving settings:", error);
    saveError.value = "Failed to save settings. Please try again.";
  } finally {
    saving.value = false;
  }
}
</script> 