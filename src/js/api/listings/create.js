import { getHeaders } from "../headers.js";
import { API_CREATE_LISTING } from '../constants.js';

export async function createListing(listingData) {
  try {
    const response = await fetch(API_CREATE_LISTING, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(listingData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create listing: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}