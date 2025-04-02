import { ref } from 'vue';
import { SearchResult, SearchResultItem } from '@/types/search';
import { functions } from '../firebase';
import { httpsCallable } from 'firebase/functions';

export function useSearch() {
  const searchResults = ref<SearchResult[]>([]);
  const isSearching = ref<boolean>(false);
  const resultsVisible = ref<boolean>(false);
  const error = ref<{ show: boolean; message: string }>({
    show: false,
    message: ''
  });

  // Toggle summary expansion
  const toggleSummary = (index: number): void => {
    const result = searchResults.value[index] as SearchResultItem;
    if (result && 'expanded' in result) {
      result.expanded = !result.expanded;
    }
  };

  const handleSearch = async (query: string): Promise<void> => {
    if (!query.trim()) return;
    
    isSearching.value = true;
    resultsVisible.value = false;
    
    try {
      const searchCVFunction = httpsCallable(functions, 'CVSearch');
      const result = await searchCVFunction(query);
      
      console.log('Raw response data:', result.data);
      
      // Store the raw results
      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        // Process the results to handle the API format
        searchResults.value = (result.data as any[]).map(item => {
          // If the result is already in the format we expect
          if (typeof item === 'object' && 'email' in item) {
            return {
              ...item,
              expanded: false
            };
          }
          
          // If the result is in the format seen in the example
          if (typeof item === 'object' && item !== null) {
            const resultItem: SearchResultItem = {
              email: item.email || '',
              summary: item.summary || '',
              expanded: false
            };
            
            if ('distance' in item) {
              resultItem.distance = parseFloat(item.distance);
            }
            
            if ('name' in item) {
              resultItem.name = item.name;
            }
            
            return resultItem;
          }
          
          // Fallback for unexpected formats
          return {
            email: 'unknown@example.com',
            summary: 'No summary available',
            expanded: false
          };
        });
      } else {
        searchResults.value = [{message: 'No results found for your search query.'}];
      }
      
      // Animate results appearance
      setTimeout(() => {
        resultsVisible.value = true;
      }, 100);
    } catch (err: any) {
      console.error('Search error:', err);
      error.value.message = err.message || 'An error occurred while searching';
      error.value.show = true;
      searchResults.value = [{message: 'Error occurred while searching. Please try again.'}];
      resultsVisible.value = true;
    } finally {
      isSearching.value = false;
    }
  };

  const clearError = () => {
    error.value.show = false;
  };

  return {
    searchResults,
    isSearching,
    resultsVisible,
    error,
    handleSearch,
    toggleSummary,
    clearError
  };
} 