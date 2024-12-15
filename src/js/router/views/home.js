import { getAllListings } from '../../api/listings/listings.js';
import { addListingToPage } from '../../ui/listings/display.js';

export async function renderHomePage() {
  try {
    const listings = await getAllListings();

    const listingsContainer = document.getElementById("listings-container");
    listingsContainer.innerHTML = ""; 

    if (!Array.isArray(listings) || listings.length === 0) {
      listingsContainer.innerHTML = "<p>No listings available.</p>";
    } else {
      listings.forEach(listing => addListingToPage(listing)); 
    }

  } catch (error) {
    console.error("Error fetching listings:", error);
    alert("Failed to load listings.");
  }
}

