export interface SearchResultItem {
  email: string;
  summary: string;
  expanded?: boolean;
  distance?: number;
  name?: string;
}

export interface SearchResultError {
  message: string;
}

export type SearchResult = SearchResultItem | SearchResultError;

export const isErrorResult = (result: SearchResult): result is SearchResultError => {
  return 'message' in result;
}; 