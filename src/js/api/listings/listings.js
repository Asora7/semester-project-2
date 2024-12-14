import { API_GET_LISTINGS, API_KEY } from '../constants.js';

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


import { API_ALL_LISTINGS } from '../constants.js';


export const getAllListings = async (limit = 10, page = 1) => {
  try {
    const response = await fetch(`${API_ALL_LISTINGS}?_bids=true&limit=${limit}&page=${page}&sort=created&sortOrder=desc`, {
      method: 'GET',
      headers: {
        'X-Noroff-API-Key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch listings');
    }

    const data = await response.json();
    console.log('API Response:', data); // Log the full API response for debugging

    if (!data || !Array.isArray(data.data)) {
      console.error('No valid listings found in API response.');
      return {
        listings: [],
        totalListings: 0,
        totalPages: 0,
        pagination: {},
      };
    }

    return {
      listings: data.data || [],
      totalListings: data.meta?.totalListings || 0,
      totalPages: data.meta?.totalPages || 0,
      pagination: data.meta || {},
    };
  } catch (error) {
    console.error('Error in getAllListings:', error);
    throw error;
  }
};
