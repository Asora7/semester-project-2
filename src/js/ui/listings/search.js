import { searchListings } from "../../api/listings/search.js";
import { placeBid } from "../../api/listings/bid.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const listingsContainer = document.getElementById("listings");

  if (searchForm && searchInput && listingsContainer) {
    searchForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const query = searchInput.value.trim();

      if (!query) return;

      try {
        const listings = await searchListings(query);
        displayListings(listings, listingsContainer);  
      } catch (error) {
        listingsContainer.innerHTML = "<p>Unable to fetch search results. Try again later.</p>";
      }
    });
  }
});

function displayListings(listings, listingsContainer) {
  if (!listings || listings.length === 0) {
    listingsContainer.innerHTML = "<p>No listings found.</p>";
    return;
  }

  listingsContainer.innerHTML = "";  

  listings.forEach(listing => {
    const price = listing.price ? `$${listing.price}` : '';
    const imageUrl = listing.media && listing.media.length > 0 ? listing.media[0].url : 'default-image.jpg';
    const endsAt = listing.endsAt ? new Date(listing.endsAt).toLocaleString() : 'No end date';
    const tags = listing.tags && listing.tags.length > 0 ? listing.tags.join(", ") : 'No tags available';
    const highestBid = listing.highestBid || 'No bids yet';
    const bidsList = listing.bids && listing.bids.length > 0
      ? listing.bids.map(bid => `<li>Amount: $${bid.amount}, By User ID: ${bid.userId || 'Unknown'}</li>`).join('')
      : '<li>No bids yet</li>';

    const endsAtDate = new Date(listing.endsAt);
    const isActive = endsAtDate > new Date();
    const statusBadge = isActive
      ? `<span class="badge bg-success">Active</span>`
      : `<span class="badge bg-danger">Not Active</span>`;

    const bidForm = isActive
      ? `
        <form class="bid-form" data-listing-id="${listing.id}">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <label for="bidAmount" class="font-weight-bold">Bid Amount: </label>
            <input type="number" id="bidAmount" name="bidAmount" class="form-control w-50" min="${listing.highestBid || 1}" required />
          </div>
          <button type="submit" class="btn btn-primary">Place Bid</button>
        </form>
      `
      : '';

    const listingHTML = `
      <div class="col-12 col-md-6 col-lg-4">
        <article data-listing-id="${listing.id}" class="listing-card p-3 border rounded shadow-sm">
          <div class="listing-image text-center mb-3">
            <img src="${imageUrl}" alt="${listing.title || 'No title'}" class="img-fluid">
          </div>
          <h3 class="text-center">${listing.title || "No title provided"}</h3>
          <p class="description mt-2">${listing.description || "No description provided"}</p>
          <div class="listing-details">
            <p><strong class="font-weight-bold">Ends At:</strong> ${endsAt}</p>
            <p><strong class="font-weight-bold current-price">Current Price:</strong> ${highestBid}</p>
            <p>${statusBadge}</p>
            <p><strong class="font-weight-bold">Tags:</strong> ${tags}</p>
            <ul><strong class="font-weight-bold">All Bids:</strong>${bidsList}</ul>
            ${bidForm}
          </div>
        </article>
      </div>
    `;

    listingsContainer.innerHTML += listingHTML;

    const bidForms = document.querySelectorAll('.bid-form');
    bidForms.forEach(form => {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const bidAmount = form.querySelector('#bidAmount').value;
        const listingId = form.getAttribute('data-listing-id');

        if (bidAmount && listingId) {
          try {
            await placeBid(listingId, bidAmount);
            const listingCard = document.querySelector(`[data-listing-id="${listingId}"]`);
            const priceElement = listingCard.querySelector('.current-price');
            const bidsListElement = listingCard.querySelector('ul');

            priceElement.textContent = `Current Price: $${bidAmount}`;
            const newBid = `<li>Amount: $${bidAmount}, By User ID: Unknown</li>`;
            bidsListElement.innerHTML += newBid;
            
            const bidButton = form.querySelector('button');
            bidButton.disabled = true;
            bidButton.textContent = "Bid Placed";
          } catch (error) {
            console.error('Failed to place bid:', error);
          }
        }
      });
    });
  });
}
