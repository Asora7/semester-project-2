import { logout } from './logout.js';

export function createHeader() {
    const header = document.createElement('header');
    const homeButton = document.createElement('button');
    homeButton.textContent = 'Home';
    homeButton.onclick = () => window.location.href = '/'; 
  
    const profileButton = document.createElement('button');
    profileButton.textContent = 'Profile';
    profileButton.onclick = () => window.location.href = '/profile/'; 
  
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.onclick = logout;
  
    const loginButton = document.createElement('button');
    loginButton.textContent = 'Login';
    loginButton.onclick = () => window.location.href = '/auth/login/'; 
  
    // Check if the user is logged in (using token in localStorage)
    const token = localStorage.getItem('my_token');
    
    // Add homeButton to the header for all users
    header.append(homeButton);
  
    if (token) {
      // Show profile and logout buttons if logged in
      header.append(profileButton, logoutButton);
    } else {
      // Show login button if not logged in
      header.append(loginButton);
    }
  
    document.body.prepend(header); // Add the header to the top of the page
  }
  

  