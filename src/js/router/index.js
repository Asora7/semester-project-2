/**
 * @module router
 * 
 * This module controls the routing of the application by dynamically loading 
 * the appropriate JavaScript file based on the current URL pathname.
 * 
 * The function takes a pathname as an argument (defaulting to the current 
 * window location) and uses a switch statement to determine which view 
 * to load. Additional routes can be added by implementing new cases 
 * in the switch statement.
 * 
 * @param {string} [pathname=window.location.pathname] - The URL pathname to determine 
 * which view to load. Defaults to the current window location.
 */
export default async function router(pathname = window.location.pathname) {
    switch (pathname) {
      case "/":
        await import("./views/home.js");
        break;
      case "/auth/login/":
        await import("./views/login.js");
        break;
      case "/auth/register/":
        await import("./views/register.js");
        break;
      default:
        // Optionally, you could add a default case for a 404 page or redirect
        break;
    }
  }
  