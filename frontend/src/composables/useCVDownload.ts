import { ref } from 'vue';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';

export interface DownloadStatus {
  isDownloading: Record<string, boolean>;
  message: string;
  showMessage: boolean;
  status: 'success' | 'error' | 'info';
}

export function useCVDownload() {
  const downloadState = ref<DownloadStatus>({
    isDownloading: {},
    message: '',
    showMessage: false,
    status: 'success'
  });

  const getFirstNameFromEmail = (email: string): string => {
    if (!email) return 'User';
    const namePart = email.split('@')[0];
    const firstNamePart = namePart.split('.')[0];
    return firstNamePart.charAt(0).toUpperCase() + firstNamePart.slice(1);
  };

  const downloadCV = async (email: string, name?: string, summary?: string): Promise<void> => {
    if (!email) return;
    
    try {
      // Set loading state for this specific email
      downloadState.value.isDownloading = {
        ...downloadState.value.isDownloading,
        [email]: true
      };
      
      // Format the file path - typically CVs are stored by email address
      const formattedEmail = email.replace(/[@.]/g, '_');
      const filePath = `cvs/${formattedEmail}.pdf`;
      
      // Get a reference to the storage
      const storage = getStorage();
      const fileRef = storageRef(storage, filePath);
      
      try {
        // Try to get download URL from Firebase Storage
        const url = await getDownloadURL(fileRef);
        
        // If successful, download the file
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `CV_${email.split('@')[0]}.pdf`);
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        downloadState.value.status = 'success';
        downloadState.value.message = `CV for ${name || email.split('@')[0]} is downloading`;
        downloadState.value.showMessage = true;
        
      } catch (storageError) {
        // If storage download fails, generate a simple PDF with available info
        console.warn('CV not found in storage, generating simple version:', storageError);
        
        // This requires a PDF generation library, but for demo purposes
        // we'll create a simple text file with the CV information
        const displayName = name || getFirstNameFromEmail(email);
        const cvText = `CV for ${displayName}\n\nEmail: ${email}\n\n${summary || 'No summary available'}`;
        
        // Create a Blob with the CV data
        const blob = new Blob([cvText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        // Download the file
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `CV_${email.split('@')[0]}.txt`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        // Show success message but with a note
        downloadState.value.status = 'info';
        downloadState.value.message = `Generated basic CV for ${displayName} (original not found)`;
        downloadState.value.showMessage = true;
      }
      
    } catch (error) {
      console.error('Error downloading CV:', error);
      downloadState.value.status = 'error';
      downloadState.value.message = 'Unable to download CV. Please try again later.';
      downloadState.value.showMessage = true;
    } finally {
      // Reset loading state
      downloadState.value.isDownloading = {
        ...downloadState.value.isDownloading,
        [email]: false
      };
    }
  };

  const closeMessage = () => {
    downloadState.value.showMessage = false;
  };

  return {
    downloadState,
    downloadCV,
    closeMessage
  };
} 