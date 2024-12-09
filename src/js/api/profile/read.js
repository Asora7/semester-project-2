import { API_PROFILES } from '../../api/constants.js';
import { getHeaders } from '../../api/headers.js';

/**
 * Fetch and display the profile details for the logged-in user.
 */
export async function getProfile() {
  try {
    const loggedInUserName = localStorage.getItem('name'); 

    if (!loggedInUserName) {
      throw new Error('User not logged in');
    }

    const response = await fetch(`${API_PROFILES}/${loggedInUserName}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    const data = await response.json();
    const profile = data.data; 

    document.getElementById('avatar').src = profile.avatar.url;
    document.getElementById('avatar').alt = profile.avatar.alt || 'User Avatar';
    document.getElementById('profile-name').textContent = profile.name;
    document.getElementById('profile-email').textContent = profile.email;
    document.getElementById('profile-credits').textContent = profile.credits;
    document.getElementById('profile-bio').textContent = profile.bio;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
}
