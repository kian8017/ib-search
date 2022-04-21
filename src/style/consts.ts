// Helper interfaces
export interface StringArray {
  [index: string]: string;
}

// Various
//export const API_URL = "http://127.0.0.1:8018";
export const API_URL = "https://api.indexbrain.org";
export const MAX_RESULTS = 100;

// Search History
export const SEARCH_HISTORY = {
  STORAGE_NAME: "search-history",
  MAX_LENGTH: 50,
};

// Message Types
export const MT = {
  // Default
  DEFAULT: {
    SUCCESS: "success",
    FAILURE: "failure",
    UNAUTHORIZED: "unauthorized",
  },

  // Locations
  LOCATIONS: {
    GET: "get_locations",
  },

  // Message
  MESSAGE: {
    GET: "get_message",
  },

  // Search
  SEARCH: {
    SEARCH: "search",
    CANCEL: "cancel_search",
    RESULTS: {
      SPECIFIC: "results",
      FALLBACK: "fallback_results",
      EXTENDED: "extended_results",
    },
    COUNT: {
      SPECIFIC: "count",
      EXTENDED: "extended_count",
    },
    QUERY_MESSAGE: "query_message",
    INVALID_QUERY: "invalid_query",
    RS: {
      // Reasons for invalid query
      INVALID_JSON: "invalid_json",
      INVALID_TYPE: "invalid_type",
      INVALID_COUNTRY: "invalid_location",
      INVALID_QUERY: "invalid_query",
      BLANK_QUERY: "blank_query",
    },
  },
};