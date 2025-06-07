import { getAllListings } from '../../api/listings/listings.js';
import { addListingToPage } from '../../ui/listings/display.js';

/**
 * Renders the home page listings with a loading spinner.
 * Fetches data from the API and displays a Bootstrap spinner while loading.
 */

export async function renderHomePage() {
  const listingsContainer = document.getElementById("listings-container");
  if (!listingsContainer) return;

  // 1) Vis Bootstrap-spinner mens vi laster data
  listingsContainer.innerHTML = `
    <div class="d-flex justify-content-center my-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Laster…</span>
      </div>
    </div>
  `;

  try {
    // 2) Hent listene
    const listings = await getAllListings();

    // 3) Fjern spinner og vis resultater
    listingsContainer.innerHTML = "";
    if (!Array.isArray(listings) || listings.length === 0) {
      listingsContainer.innerHTML = "<p>No listings available.</p>";
    } else {
      listings.forEach(listing => addListingToPage(listing));
    }
  } catch (error) {
    console.error("Error fetching listings:", error);
    listingsContainer.innerHTML = `
      <p class="text-danger text-center my-4">
        Failed to load listings.
      </p>
    `;
  }
}
