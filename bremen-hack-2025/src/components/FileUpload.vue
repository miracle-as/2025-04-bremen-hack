<script setup>
import { ref } from 'vue'
import { storage } from '../firebase'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const selectedFile = ref(null)
const fileUploaded = ref(false)
const isUploading = ref(false)
const uploadProgress = ref(0)
const downloadURL = ref('')
const errorMessage = ref('')

function handleFileChange(event) {
  const file = event.target.files[0]
  selectedFile.value = file
  fileUploaded.value = false
  uploadProgress.value = 0
  downloadURL.value = ''
  errorMessage.value = ''
}

function uploadFile() {
  if (!selectedFile.value) return
  
  // Reset states
  isUploading.value = true
  errorMessage.value = ''
  downloadURL.value = ''
  
  const file = selectedFile.value
  
  // Create a unique file name
  const timestamp = new Date().getTime()
  const fileName = `${timestamp}_${file.name}`
  
  // Create a storage reference
  const fileStorageRef = storageRef(storage, `uploads/${fileName}`)
  
  // Upload the file
  const uploadTask = uploadBytesResumable(fileStorageRef, file)
  
  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      uploadProgress.value = Math.round(progress)
      console.log('Upload is ' + progress + '% done')
      
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused')
          break
        case 'running':
          console.log('Upload is running')
          break
      }
    },
    (error) => {
      // Handle unsuccessful uploads
      isUploading.value = false
      errorMessage.value = `Upload failed: ${error.message}`
      console.error('Upload error:', error)
    },
    () => {
      // Handle successful uploads on complete
      isUploading.value = false
      fileUploaded.value = true
      
      // Get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        downloadURL.value = url
        console.log('File available at', url)
      })
    }
  )
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
        :disabled="!selectedFile || isUploading || fileUploaded"
      >
        <span v-if="isUploading">Uploading... {{ uploadProgress }}%</span>
        <span v-else-if="fileUploaded">Uploaded!</span>
        <span v-else>Upload</span>
      </button>
      
      <div v-if="isUploading" class="progress-container">
        <div class="progress-bar" :style="{ width: uploadProgress + '%' }"></div>
      </div>
    </div>
    
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    
    <div v-if="fileUploaded" class="success-message">
      <p>File successfully uploaded!</p>
      <div class="download-link">
        <a :href="downloadURL" target="_blank" rel="noopener noreferrer">View uploaded file</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-upload {
  padding: 2rem;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 1.5rem;
  color: var(--color-primary-dark);
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
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.upload-button:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
}

.upload-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.success-message {
  text-align: center;
  color: var(--color-primary);
  margin-top: 1rem;
  font-weight: bold;
}

.error-message {
  text-align: center;
  color: var(--color-accent-red);
  margin-top: 1rem;
  font-weight: bold;
}

.progress-container {
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: var(--color-primary);
  transition: width 0.3s ease;
}

.download-link {
  margin-top: 0.5rem;
}

.download-link a {
  color: var(--color-primary);
  text-decoration: underline;
}

.download-link a:hover {
  color: var(--color-primary-dark);
}
</style> 