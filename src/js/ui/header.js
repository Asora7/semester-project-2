import { logout } from './logout.js';

export function createHeader() {
  const header = document.createElement('header');
  header.classList.add('navbar'); // Add a navbar class for styling

  // Create the logo
  const logo = document.createElement('div');
  logo.classList.add('logo');
  logo.textContent = 'BIDSHARE';
  
  // Create the search bar
  const searchBar = document.createElement('input');
  searchBar.type = 'text';
  searchBar.placeholder = 'Search...';
  searchBar.classList.add('search-bar'); // For styling

  // Create the home button
  const homeButton = document.createElement('a');  // Change button to link (anchor tag)
  homeButton.textContent = 'Home';
  homeButton.href = '/';  // Make it a link
  homeButton.classList.add('nav-text'); // Apply nav-text class for styling

  // Create the login button
  const loginButton = document.createElement('a');  // Change button to link (anchor tag)
  loginButton.textContent = 'Login';
  loginButton.href = '/auth/login/';  // Make it a link
  loginButton.classList.add('nav-text'); // Apply nav-text class for styling

  const logoutButton = document.createElement('button');
  logoutButton.textContent = 'Logout';
  logoutButton.classList.add('nav-button');
  logoutButton.onclick = logout;
  
  // Create the register button
  const registerButton = document.createElement('a');  // Change button to link (anchor tag)
  registerButton.textContent = 'Register';
  registerButton.href = '/auth/register/';  // Make it a link
  registerButton.classList.add('nav-text'); // Apply nav-text class for styling

  // Check if the user is logged in (using token in localStorage)
  const token = localStorage.getItem('my_token');

  // Append elements to the header
  header.appendChild(logo);
  header.appendChild(searchBar);

  // For logged-in users, show profile and logout
  if (token) {
    header.appendChild(homeButton);
    header.appendChild(logoutButton);
  } else {
    // For non-logged-in users, show login and register buttons
    header.appendChild(homeButton);
    header.appendChild(loginButton);
    header.appendChild(registerButton);
  }

  document.body.prepend(header); // Add the header to the top of the page
}
