import { API_KEY } from './constants.js';  

/**
 * @module headers
 * 
 * This module provides functions to generate request headers for API calls.
 */

/**
 * Returns an object containing the necessary headers for API requests.
 * 
 * @returns {Object} headers - The headers for the API request.
 * @returns {string} headers['Content-Type'] - The content type of the request, set to 'application/json'.
 * @returns {string} headers['X-Noroff-API-Key'] - The API key used for authenticating requests.
 * @returns {string} [headers['Authorization']] - The authorization token if available in local storage.
 */
export function getHeaders() {
  const headers = {
    'Content-Type': 'application/json',  
    'X-Noroff-API-Key': API_KEY,  // API key from constants.js
  };

  // Check if there's a stored JWT token in local storage
  const token = localStorage.getItem('token');

  // If token exists, include Authorization header with Bearer token
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}
