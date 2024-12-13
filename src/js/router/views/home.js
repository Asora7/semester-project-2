import { getAllListings } from '../../api/listings/listings.js';
import { addListingToPage } from '../../ui/listings/display.js';

export async function renderHomePage() {
  try {
    const response = await getAllListings();
    const listings = response.data;

    const listingsContainer = document.getElementById("listings-container");
    listingsContainer.innerHTML = ""; // Clear existing listings

    if (Array.isArray(listings)) {
      listings.forEach((listing) => {
        addListingToPage(listing);  // Pass the listing directly
      });
    }
  } catch (error) {
    console.error("Error fetching listings:", error);
    alert("Failed to load listings.");
  }
}