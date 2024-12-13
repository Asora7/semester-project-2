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

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
