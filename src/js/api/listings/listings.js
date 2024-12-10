// src/js/api/profile/listings.js
import { API_GET_LISTINGS } from '../constants.js';

export const getProfileListings = async (profileName) => {
  const response = await fetch(API_GET_LISTINGS(profileName), {  // Use profileName here
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('my_token')}`, // JWT token
      'X-Noroff-API-Key': API_KEY,  // Use the constant API_KEY from constants.js
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile listings');
  }

  return await response.json(); // Assuming the API returns JSON
};
