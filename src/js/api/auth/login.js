import { API_AUTH_LOGIN } from '../constants.js';  // Adjust the import to match your constants
import { getHeaders } from '../headers.js';  // Import getHeaders function for headers

/**
 * Logs in a user by sending a POST request to the API.
 * 
 * @param {string} email - The user's email address.
 * @param {string} password - The user's chosen password.
 */
export async function loginUser(email, password) {
  const loginData = {
    email: email,
    password: password
  };

  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: 'POST',
      headers: getHeaders(),  
      body: JSON.stringify(loginData)  
    });

    const data = await response.json();

    if (response.ok) {

      localStorage.setItem('my_token', data.data.accessToken);

      window.location.href = '/index.html';  // Adjust this path if necessary
    } else {
        throw new Error('Incorrect credentials. Please check your email and password.');
    }
  } catch (error) {
    throw new Error('An error occurred while logging in. Please try again.');
  }
}

localStorage.removeItem('token');  
localStorage.removeItem('username');   

