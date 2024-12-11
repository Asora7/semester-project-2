import { API_LISTINGS_SEARCH } from "../constants.js";
import { getHeaders } from "../headers.js";

export async function searchListings(query) {
  try {
    const url = `${API_LISTINGS_SEARCH}?q=${encodeURIComponent(query)}`;
    
    // Log the URL to ensure it's constructed correctly
    console.log('Request URL:', url);
    
    const response = await fetch(url, { headers: getHeaders() });

    // Log the status of the response
    console.log('Response Status:', response.status);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Fetched Listings:', data.data);  // Ensure the correct data structure
    
    return data.data;  // Ensure you're returning the actual listings array here
  } catch (error) {
    console.error("Failed to search listings:", error);
    throw error;
  }
}

