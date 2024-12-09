import { API_PROFILES } from '../../api/constants.js';
import { getHeaders } from '../../api/headers.js';
import { getProfile } from "../../api/profile/read.js"; // Import getProfile

/**
 * Update the user's profile and update the DOM dynamically.
 */
export async function updateProfile(updatedData) {
  const loggedInUserName = localStorage.getItem('name'); // or extract from JWT

  if (!loggedInUserName) {
    throw new Error('User not logged in');
  }

  const { bio, avatarUrl, bannerUrl } = updatedData;

  const data = {};

  if (bio) {
    data.bio = bio;
  }

  if (avatarUrl) {
    data.avatar = {
      url: avatarUrl,
      alt: 'User Avatar',
    };
  }

  if (bannerUrl) {
    data.banner = {
      url: bannerUrl,
      alt: 'User Banner',
    };
  }

  try {
    const response = await fetch(`${API_PROFILES}/${loggedInUserName}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    const result = await response.json();
    console.log('Profile updated:', result);

    // Re-fetch the profile after the update and update the DOM
    getProfile();

  } catch (error) {
    console.error('Error updating profile:', error);
  }
}
