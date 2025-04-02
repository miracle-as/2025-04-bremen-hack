<script setup>
import { ref } from 'vue'

const selectedFile = ref(null)
const fileUploaded = ref(false)

function handleFileChange(event) {
  const file = event.target.files[0]
  selectedFile.value = file
  fileUploaded.value = false
}

function uploadFile() {
  if (!selectedFile.value) return
  
  // Here you would typically send the file to a server
  // This is a placeholder for the actual upload logic
  console.log('Uploading file:', selectedFile.value.name)
  
  // Simulate successful upload
  setTimeout(() => {
    fileUploaded.value = true
  }, 1000)
}
</script>

<template>
  <div class="file-upload">
    <h2>File Upload</h2>
    <div class="upload-container">
      <input 
        type="file" 
        id="fileInput" 
        @change="handleFileChange"
        class="file-input"
      />
      <label for="fileInput" class="file-label">
        {{ selectedFile ? selectedFile.name : 'Choose a file' }}
      </label>
      <button 
        @click="uploadFile" 
        class="upload-button"
        :disabled="!selectedFile || fileUploaded"
      >
        {{ fileUploaded ? 'Uploaded!' : 'Upload' }}
      </button>
    </div>
    <p v-if="fileUploaded" class="success-message">
      File successfully uploaded!
    </p>
  </div>
</template>

<style scoped>
.file-upload {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.upload-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.file-input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.file-label {
  display: block;
  padding: 0.75rem 1.25rem;
  background-color: #e9ecef;
  color: #495057;
  border-radius: 4px;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  transition: background-color 0.3s;
}

.file-label:hover {
  background-color: #dee2e6;
}

.upload-button {
  padding: 0.75rem 1.25rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.upload-button:hover:not(:disabled) {
  background-color: #3e8e41;
}

.upload-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.success-message {
  text-align: center;
  color: #4CAF50;
  margin-top: 1rem;
  font-weight: bold;
}
</style> 