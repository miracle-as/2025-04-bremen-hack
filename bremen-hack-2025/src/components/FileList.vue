<script setup>
import { ref, onMounted } from 'vue'
import { storage } from '../firebase'
import { ref as storageRef, listAll, getDownloadURL, deleteObject } from 'firebase/storage'

const files = ref([])
const loading = ref(true)
const error = ref(null)

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

// Function to delete a file
async function deleteFile(file) {
  if (!confirm(`Are you sure you want to delete ${file.name}?`)) return
  
  try {
    await deleteObject(file.ref)
    // Remove from the list
    files.value = files.value.filter(f => f.fullPath !== file.fullPath)
  } catch (err) {
    console.error("Error deleting file:", err)
    alert(`Failed to delete ${file.name}. Please try again.`)
  }
}

// Load files when component is mounted
onMounted(fetchFiles)
</script>

<template>
  <div class="file-list">
    <div class="file-list-header">
      <h2>Uploaded Files</h2>
      <button @click="fetchFiles" class="refresh-button">
        Refresh
      </button>
    </div>
    
    <div v-if="loading" class="loading">
      <p>Loading files...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    
    <div v-else-if="files.length === 0" class="empty">
      <p>No files have been uploaded yet.</p>
    </div>
    
    <ul v-else class="files">
      <li v-for="file in files" :key="file.fullPath" class="file-item">
        <div class="file-info">
          <span class="file-name">{{ file.name }}</span>
        </div>
        <div class="file-actions">
          <a :href="file.url" target="_blank" rel="noopener noreferrer" class="view-button">View</a>
          <button @click="deleteFile(file)" class="delete-button">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.file-list {
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.file-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h2 {
  color: var(--color-primary-dark);
  margin: 0;
}

.refresh-button {
  background-color: var(--color-primary-light);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.refresh-button:hover {
  filter: brightness(1.1);
}

.loading, .error, .empty {
  text-align: center;
  padding: 1.5rem 0;
  color: #666;
}

.error {
  color: var(--color-accent-red);
}

.files {
  list-style: none;
  padding: 0;
  margin: 0;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-radius: 4px;
  background-color: var(--color-background-gray);
  margin-bottom: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.file-name {
  font-weight: 500;
  word-break: break-all;
}

.file-actions {
  display: flex;
  gap: 0.5rem;
}

.view-button, .delete-button {
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s;
}

.view-button {
  background-color: var(--color-primary);
  color: white;
  text-decoration: none;
}

.view-button:hover {
  background-color: var(--color-primary-dark);
}

.delete-button {
  background-color: var(--color-accent-red);
  color: white;
  border: none;
}

.delete-button:hover {
  filter: brightness(0.9);
}

@media (max-width: 480px) {
  .file-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .file-actions {
    margin-top: 0.75rem;
    align-self: flex-end;
  }
}
</style> 