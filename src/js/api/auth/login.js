import { API_AUTH_LOGIN } from '../constants.js';
import { getHeaders } from '../headers.js'; 
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
            localStorage.setItem('my_token', data.data.accessToken);
            localStorage.setItem('name', data.data.name);

            initializeCreditScore(); 

            window.location.href = '/'; 
        } else {
            throw new Error('Incorrect credentials. Please check your email and password.');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while logging in. Please try again.');
    }
}

/** Return true if email is a valid stud.noroff.no address */
export function isValidEmail(email) {
    return /^[\w\-.]+@(stud\.)?noroff\.no$/.test(email);
  }
