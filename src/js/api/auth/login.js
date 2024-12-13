import { API_AUTH_LOGIN } from '../constants.js'; // Import your API constants
import { getHeaders } from '../headers.js'; // Import header function
import { initializeCreditScore } from '../../ui/creditScore.js';

/**
 * Logs in a user by sending a POST request to the API.
 * 
 * @param {string} email - The user's email address.
 * @param {string} password - The user's chosen password.
 */
export async function loginUser(email, password) {
    const loginData = {
        email: email,
        password: password,
    };

    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(loginData),
        });

        const data = await response.json();

        if (response.ok) {
            // Store the token and name in localStorage
            localStorage.setItem('my_token', data.data.accessToken);
            localStorage.setItem('name', data.data.name);

            // Ensure credit score is initialized
            initializeCreditScore(); // Initialize credit score to 1000 if not already set

            window.location.href = '/'; // Redirect on successful login
        } else {
            throw new Error('Incorrect credentials. Please check your email and password.');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while logging in. Please try again.');
    }
}
