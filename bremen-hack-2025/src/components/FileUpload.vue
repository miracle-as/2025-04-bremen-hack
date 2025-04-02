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
  <v-card class="pa-5">
    <v-card-title class="d-flex align-center justify-space-between">
      <span>File Upload</span>
    </v-card-title>
    
    <v-card-text>
      <v-file-input
        v-model="selectedFile"
        @change="handleFileChange"
        label="Choose a file"
        prepend-icon="mdi-file-upload"
        variant="outlined"
        :disabled="isUploading"
        :loading="isUploading"
        class="mb-4"
      ></v-file-input>
      
      <v-progress-linear
        v-if="isUploading"
        v-model="uploadProgress"
        height="10"
        color="primary"
        striped
        class="mb-4"
      ></v-progress-linear>
      
      <v-btn 
        @click="uploadFile" 
        color="accent"
        :disabled="!selectedFile || isUploading || fileUploaded"
        :loading="isUploading"
        prepend-icon="mdi-cloud-upload"
      >
        <template v-if="isUploading">Uploading... {{ uploadProgress }}%</template>
        <template v-else-if="fileUploaded">Uploaded!</template>
        <template v-else>Upload</template>
      </v-btn>
      
      <v-alert
        v-if="errorMessage"
        type="error"
        variant="tonal"
        class="my-3"
      >
        {{ errorMessage }}
      </v-alert>
      
      <v-alert
        v-if="fileUploaded"
        type="success"
        variant="tonal"
        class="my-3"
      >
        <p>File successfully uploaded!</p>
        <v-btn
          v-if="downloadURL"
          :href="downloadURL"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          size="small"
          variant="text"
          prepend-icon="mdi-eye"
          class="mt-2"
        >
          View uploaded file
        </v-btn>
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<style scoped>
/* All styling is handled by Vuetify */
</style> 