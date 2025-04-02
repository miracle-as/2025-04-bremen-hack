<script setup>
import { ref } from 'vue'
import { storage } from '../firebase'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const formRef = ref(null)
const form = ref({
  employeeName: '',
  employeeEmail: '',
  file: null
})
const fileUploaded = ref(false)
const isUploading = ref(false)
const uploadProgress = ref(0)
const downloadURL = ref('')
const errorMessage = ref('')
const formValid = ref(false)

const nameRules = [
  v => !!v || 'Name is required'
]

const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'Email must be valid'
]

const fileRules = [
  v => !!v || 'CV file is required'
]

function handleFileChange(event) {
  form.value.file = event.target.files[0]
  fileUploaded.value = false
  uploadProgress.value = 0
  downloadURL.value = ''
  errorMessage.value = ''
}

async function submitForm() {
  const { valid } = await formRef.value.validate()
  
  if (!valid) {
    errorMessage.value = 'Please fill all required fields correctly'
    return
  }
  
  uploadFile()
}

function uploadFile() {
  if (!form.value.file) return
  
  // Reset states
  isUploading.value = true
  errorMessage.value = ''
  downloadURL.value = ''
  
  const file = form.value.file
  
  // Create a unique file name that includes employee name
  const timestamp = new Date().getTime()
  const sanitizedName = form.value.employeeName.replace(/\s+/g, '_').toLowerCase()
  const fileName = `${timestamp}_${sanitizedName}_${file.name}`
  
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
      <span>Upload CV</span>
    </v-card-title>
    
    <v-card-text>
      <v-form
        ref="formRef"
        v-model="formValid"
        @submit.prevent="submitForm"
      >
        <v-text-field
          v-model="form.employeeName"
          label="Full Name"
          variant="outlined"
          :disabled="isUploading"
          :rules="nameRules"
          class="mb-4"
          required
        ></v-text-field>
        
        <v-text-field
          v-model="form.employeeEmail"
          label="Email Address"
          variant="outlined"
          :disabled="isUploading"
          type="email"
          :rules="emailRules"
          class="mb-4"
          required
        ></v-text-field>
        
        <v-file-input
          @change="handleFileChange"
          label="Choose CV File"
          prepend-icon="mdi-file-upload"
          variant="outlined"
          :disabled="isUploading"
          :loading="isUploading"
          :rules="fileRules"
          accept=".pdf,.doc,.docx"
          class="mb-4"
          required
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
          type="submit"
          color="accent"
          :disabled="!formValid || isUploading || fileUploaded"
          :loading="isUploading"
          prepend-icon="mdi-cloud-upload"
          class="mb-4"
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
          <p>CV for {{ form.employeeName }} successfully uploaded!</p>
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
            View uploaded CV
          </v-btn>
        </v-alert>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<style scoped>
/* All styling is handled by Vuetify */
</style> 