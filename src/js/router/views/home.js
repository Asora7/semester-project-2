import { getAllListings } from '../../api/listings/listings.js';
import { addListingToPage } from '../../ui/listings/display.js';

export async function renderHomePage() {
  try {
    // Fetch all listings (without pagination)
    const listings = await getAllListings();

    // Clear the listings container
    const listingsContainer = document.getElementById("listings-container");
    listingsContainer.innerHTML = ""; // Clear the container

    // If no listings, show message
    if (!Array.isArray(listings) || listings.length === 0) {
      listingsContainer.innerHTML = "<p>No listings available.</p>";
    } else {
      listings.forEach(listing => addListingToPage(listing)); // Add listings to page
    }

  } catch (error) {
    console.error("Error fetching listings:", error);
    alert("Failed to load listings.");
  }
}

