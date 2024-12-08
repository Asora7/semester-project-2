function logout() {
    // Show a confirmation dialog
    const confirmLogout = confirm('Are you sure you want to log out?');
    
    if (confirmLogout) {
      // Remove token from localStorage
      localStorage.removeItem('my_token');
  
      // Show an alert message for successful logout
      alert('You have been logged out successfully.');
  
      // Redirect to login page after logging out
      window.location.href = '/auth/login/';
    }
  }

  let logoutTimer;

// Function to start the inactivity timer
function startInactivityTimer() {
  // Set the timeout for automatic logout (e.g., 5 minutes = 300000 ms)
  logoutTimer = setTimeout(() => {
    alert('You have been logged out due to inactivity.');
    logout(); // Call the logout function
  }, 300000); // 5 minutes
}

// Function to reset the inactivity timer
function resetInactivityTimer() {
  clearTimeout(logoutTimer); // Clear the previous timer
  startInactivityTimer(); // Start a new timer
}

// Attach event listeners for user activity
function monitorUserActivity() {
    // Listen for user events
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);
    window.addEventListener('click', resetInactivityTimer);
  
    // Start the inactivity timer when the page loads
    startInactivityTimer();
  }

  export { logout, monitorUserActivity };
