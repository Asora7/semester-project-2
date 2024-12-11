import { searchListings } from "../../api/listings/search.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const listingContainer = document.getElementById("results");

  if (searchForm && searchInput && listingContainer) {
    searchForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const query = searchInput.value.trim();

      if (!query) return;

      try {
        const listings = await searchListings(query);
        displayListings(listings, listingContainer); // pass listingContainer here
      } catch (error) {
        listingContainer.innerHTML = "<p>Unable to fetch search results. Try again later.</p>";
      }
    });
  }
});

function displayListings(listings, listingContainer) {
  if (!listings || listings.length === 0) {
    listingContainer.innerHTML = "<p>No listings found.</p>";
    return;
  }

  listingContainer.innerHTML = listings
    .map(
      (listing) => `
        <article>
          <h2>${listing.title}</h2>
          <p>${listing.description}</p>
          <p><strong>Price:</strong> $${listing.price}</p>
        </article>
      `
    )
    .join("");
}
