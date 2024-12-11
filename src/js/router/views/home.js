import { getAllListings } from '../../api/listings/listings.js'; // Import the function to get all listings
import { addListingToPage } from '../../ui/listings/display.js'; // Import the function to display listings

export async function renderHomePage() {
    try {
      // Fetch all listings from the API
      const response = await getAllListings();
      
      // Check the structure of the response (log it)
      console.log("Fetched Listings:", response);
  
      // Access the listings array inside the response.data
      const listings = response.data;
  
      if (Array.isArray(listings)) {
        // Loop through listings and render them on the page
        listings.forEach(listing => {
          addListingToPage(listing); // Assuming this function adds each listing to the DOM
        });
      } else {
        console.error("Listings are not an array:", listings);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
      alert("Failed to load listings.");
    }
  }
  