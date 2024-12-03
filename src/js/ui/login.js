import { loginUser } from '../api/auth/login.js';  

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('form[name="login"]').addEventListener('submit', async function (e) {
    e.preventDefault();  

    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';
    document.getElementById('login-error').textContent = '';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let isValid = true;

    if (!/^[\w\-.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      document.getElementById('email-error').textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    if (isValid) {
      try {
        await loginUser(email, password); 

      } catch (error) {
        document.getElementById('login-error').textContent = 'Login failed. Please check your credentials and try again.';
      }
    }
  });
});
