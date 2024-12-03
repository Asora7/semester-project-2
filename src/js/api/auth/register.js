import { API_AUTH_REGISTER } from '../constants.js';  // Adjust path if necessary
import { getHeaders } from '../headers.js';  // Import getHeaders function for headers

/**
 * Registers a new user by sending a POST request to the API.
 * 
 * @param {string} name - The user's name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's chosen password.
 */
export async function registerUser(name, email, password) {
  const userData = {
    name: name,
    email: email,
    password: password
  };

  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: 'POST',
      headers: getHeaders(),  
      body: JSON.stringify(userData)  
    });

    const data = await response.json();

    if (response.ok) {

      alert('Registration successful!');
      window.location.href = '/auth/login/index.html';  
    } else {

      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error('Registration failed:', error);
    alert('An error occurred. Please try again.');
  }
}
