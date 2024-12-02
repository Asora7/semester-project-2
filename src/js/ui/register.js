import { registerUser } from '../api/auth/register.js';  // Import the register function

// ui/register.js
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('form[name="register"]').addEventListener('submit', async function (e) {
      e.preventDefault();  // Prevent the form from submitting the default way
  
      // Clear previous error messages
      document.getElementById('name-error').textContent = '';
      document.getElementById('email-error').textContent = '';
      document.getElementById('password-error').textContent = '';
  
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      let isValid = true;
  
      // Validate Name
      if (!/^[\w]+$/.test(name)) {
        document.getElementById('name-error').textContent = 'Name must only contain letters, numbers, or underscores.';
        isValid = false;
      }
  
      // Validate Email
      if (!/^[\w\-.]+@(stud\.)?noroff\.no$/.test(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid stud.noroff.no email address.';
        isValid = false;
      }
  
      // Validate Password (minimum length of 8)
      if (password.length < 8) {
        document.getElementById('password-error').textContent = 'Password must be at least 8 characters long.';
        isValid = false;
      }
  
      if (isValid) {
        // If all validations pass, call the registerUser function from api/register.js
        await registerUser(name, email, password);
      }
    });
  });

