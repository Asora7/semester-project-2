import { logout } from './logout.js';

export function createHeader() {
  const header = document.createElement('header');
  header.classList.add('navbar'); // Add a navbar class for styling

  // Create the logo
  const logo = document.createElement('div');
  logo.classList.add('logo');
  logo.textContent = 'BIDSHARE';

  // Create the home button
  const homeButton = document.createElement('a');
  homeButton.textContent = 'Home';
  homeButton.href = '/';
  homeButton.classList.add('nav-text');

  // Create the profile button
  const profileButton = document.createElement('a');
  profileButton.textContent = 'Profile';
  profileButton.href = '/profile/';
  profileButton.classList.add('nav-text');

  // Create the logout button
  const logoutButton = document.createElement('button');
  logoutButton.textContent = 'Logout';
  logoutButton.classList.add('nav-button');
  logoutButton.onclick = logout;

  // Create the login and register buttons
  const loginButton = document.createElement('a');
  loginButton.textContent = 'Login';
  loginButton.href = '/auth/login/';
  loginButton.classList.add('nav-text');

  const registerButton = document.createElement('a');
  registerButton.textContent = 'Register';
  registerButton.href = '/auth/register/';
  registerButton.classList.add('nav-text');

  // Check if the user is logged in (using token in localStorage)
  const token = localStorage.getItem('my_token');

  // Create a nav container for all items
  const navItems = document.createElement('div');
  navItems.classList.add('nav-items');

  // Append elements to the nav items container
  navItems.appendChild(homeButton);

  if (token) {
    navItems.appendChild(profileButton);
    navItems.appendChild(logoutButton);
  } else {
    navItems.appendChild(loginButton);
    navItems.appendChild(registerButton);
  }

  // Append elements to the header
  header.appendChild(logo);
  header.appendChild(navItems);

  document.body.prepend(header); // Add the header to the top of the page
}
