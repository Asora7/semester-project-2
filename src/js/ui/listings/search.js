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
      .map((listing) => {
        // Fallbacks for missing data
        const price = listing.price ? `$${listing.price}` : ''; // Remove "Price not available" if no price
        const imageUrl = listing.media && listing.media.length > 0 ? listing.media[0].url : 'default-image.jpg'; // Fallback image
        const endsAt = listing.endsAt ? new Date(listing.endsAt).toLocaleString() : 'No end date'; // Fallback date
        const tags = listing.tags && listing.tags.length > 0 ? listing.tags.join(", ") : 'No tags available'; // Fallback tags
        const highestBid = listing.highestBid || 'No bids yet'; // Fallback for highestBid
        const bidsList = listing.bids && listing.bids.length > 0
          ? listing.bids.map(bid => `<li>Amount: $${bid.amount}, By User ID: ${bid.userId || 'Unknown'}</li>`).join('')
          : '<li>No bids yet</li>'; // Handle bids if present
  
        // Create bid form if auction is still active (endsAt in the future)
        const bidForm = listing.endsAt && new Date(listing.endsAt) > new Date()
          ? `
              <form class="bid-form">
                <label for="bidAmount">Bid Amount: </label>
                <input type="number" id="bidAmount" name="bidAmount" min="${listing.highestBid || 1}" required />
                <button type="submit">Place Bid</button>
              </form>
            `
          : '';
  
        return `
          <article data-listing-id="${listing.id}">
            <div class="listing-image">
              <img src="${imageUrl}" alt="${listing.title}" />
            </div>
            <h2>${listing.title}</h2>
            <p>${listing.description}</p>
            ${price ? `<p><strong>Price:</strong> ${price}</p>` : ''} <!-- Only show Price if available -->
            <p><strong>Tags:</strong> ${tags}</p>
            <p><strong>Ends At:</strong> ${endsAt}</p>
            <p><strong class="current-price">Current Price:</strong> ${highestBid}</p>
            <ul><strong>All Bids:</strong>${bidsList}</ul>
  
            <!-- Display bid form if auction is active -->
            ${bidForm}
          </article>
        `;
      })
      .join("");
  }
  
  
