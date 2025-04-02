<script setup>
import { ref, onMounted } from 'vue'
import { storage } from '../firebase'
import { ref as storageRef, listAll, getDownloadURL, deleteObject } from 'firebase/storage'

const files = ref([])
const loading = ref(true)
const error = ref(null)
const deleteDialog = ref(false)
const fileToDelete = ref(null)

// Function to fetch files from Firebase Storage
async function fetchFiles() {
  loading.value = true
  error.value = null
  files.value = []
  
  try {
    const listRef = storageRef(storage, 'uploads/')
    const res = await listAll(listRef)
    
    // Process each item
    const filePromises = res.items.map(async (itemRef) => {
      try {
        const url = await getDownloadURL(itemRef)
        const name = itemRef.name
        // Extract the original file name (remove timestamp prefix)
        const originalName = name.substring(name.indexOf('_') + 1)
        return {
          name: originalName,
          fullPath: itemRef.fullPath,
          url,
          ref: itemRef,
        }
      } catch (err) {
        console.error("Error getting download URL for item", itemRef.name, err)
        return null
      }
    })
    
    // Wait for all promises to resolve
    const fileResults = await Promise.all(filePromises)
    // Filter out any nulls (failed downloads)
    files.value = fileResults.filter(file => file !== null)
    
    // Sort by newest (assumes timestamp_filename format)
    files.value.sort((a, b) => {
      const aTime = parseInt(a.fullPath.split('/')[1].split('_')[0])
      const bTime = parseInt(b.fullPath.split('/')[1].split('_')[0])
      return bTime - aTime // Descending order (newest first)
    })
    
  } catch (err) {
    console.error("Error fetching files:", err)
    error.value = "Failed to load files. Please try again later."
  } finally {
    loading.value = false
  }
}

// Function to open the delete confirmation dialog
function confirmDelete(file) {
  fileToDelete.value = file
  deleteDialog.value = true
}

// Function to delete a file
async function deleteFile() {
  if (!fileToDelete.value) return
  
  try {
    await deleteObject(fileToDelete.value.ref)
    // Remove from the list
    files.value = files.value.filter(f => f.fullPath !== fileToDelete.value.fullPath)
    // Show a success snackbar or message if needed
  } catch (err) {
    console.error("Error deleting file:", err)
    error.value = `Failed to delete ${fileToDelete.value.name}. Please try again.`
  } finally {
    deleteDialog.value = false
    fileToDelete.value = null
  }
}

// Load files when component is mounted
onMounted(fetchFiles)
</script>

<template>
  <v-card class="mx-auto mt-5 pa-5">
    <v-card-title class="d-flex align-center justify-space-between">
      <span>Uploaded Files</span>
      <v-btn
        color="secondary"
        size="small"
        @click="fetchFiles"
        :loading="loading"
        prepend-icon="mdi-refresh"
        variant="outlined"
      >
        Refresh
      </v-btn>
    </v-card-title>
    
    <v-card-text>
      <v-progress-circular 
        v-if="loading" 
        indeterminate 
        color="primary" 
        class="mx-auto d-block my-6"
      ></v-progress-circular>
      
      <v-alert
        v-else-if="error"
        type="error"
        variant="tonal"
        class="my-3"
      >
        {{ error }}
      </v-alert>
      
      <v-alert
        v-else-if="files.length === 0"
        type="info"
        variant="tonal"
        class="my-3"
      >
        No files have been uploaded yet.
      </v-alert>
      
      <div v-else>
        <v-list lines="two">
          <v-list-item
            v-for="file in files"
            :key="file.fullPath"
            class="my-1"
            rounded
            variant="outlined"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-file-document-outline"></v-icon>
            </template>
            
            <v-list-item-title>
              {{ file.name }}
            </v-list-item-title>
            
            <template v-slot:append>
              <div class="d-flex">
                <v-btn
                  :href="file.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  size="small"
                  variant="text"
                  class="me-2"
                  prepend-icon="mdi-eye"
                >
                  View
                </v-btn>
                
                <v-btn
                  @click="confirmDelete(file)"
                  color="error"
                  size="small"
                  variant="text"
                  prepend-icon="mdi-delete"
                >
                  Delete
                </v-btn>
              </div>
            </template>
          </v-list-item>
        </v-list>
      </div>
    </v-card-text>
    
    <!-- Delete Confirmation Dialog -->
    <v-dialog
      v-model="deleteDialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          Confirm Deletion
        </v-card-title>
        
        <v-card-text v-if="fileToDelete">
          Are you sure you want to delete <strong>{{ fileToDelete.name }}</strong>?
          <br>
          This action cannot be undone.
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="deleteDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="error"
            variant="flat"
            @click="deleteFile"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style scoped>
/* All styling is handled by Vuetify */
</style> 