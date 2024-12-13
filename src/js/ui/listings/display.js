import { placeBid } from '../../api/listings/bid.js';

export function updateListingDisplay(listingId, updatedData) {
    const listingElement = document.getElementById(`listing-${listingId}`);
    
    if (!listingElement) {
        console.error(`Listing element with ID listing-${listingId} not found.`);
        return;
    }

    // Update the current price
    const currentPriceElement = listingElement.querySelector(".current-price");
    if (currentPriceElement) {
        const highestBid = Array.isArray(updatedData.bids) && updatedData.bids.length > 0 
            ? Math.max(...updatedData.bids.map((bid) => bid.amount))
            : 0;

        currentPriceElement.textContent = `Current Price: $${highestBid}`;
    }

    // Optionally, update other parts of the listing (e.g., bid history, tags)
}


// Adds the listing to the top of the listings container
export function addListingToPage(listing) {
    const listingsContainer = document.getElementById("listings");
  
    if (!listingsContainer) {
      console.error("Listings container not found!");
      return;
    }
  
    const listingDiv = document.createElement("div");
    listingDiv.className = "listing";
    listingDiv.id = `listing-${listing.id}`;
  
    const mediaUrl = listing.media?.length
      ? `<img src="${listing.media[0].url}" alt="${listing.title || "No title"}" class="listing-image">`
      : "";
  
    const tags = listing.tags?.length ? listing.tags.join(", ") : "No tags";
    const endsAt = listing.endsAt ? new Date(listing.endsAt).toLocaleString() : "Invalid Date";
    const bids = listing.bids || [];
  
    const highestBid = bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0;
  
    // Build the bids list HTML
    const bidsList = bids
      .map((bid) => `<li>Amount: $${bid.amount}, By User ID: ${bid.userId || "Unknown"}</li>`)
      .join("");
  
    listingDiv.innerHTML = `
      <h3>${listing.title || "No title provided"}</h3>
      <p>${listing.description || "No description provided"}</p>
      ${mediaUrl}
      <p><strong>Tags:</strong> ${tags}</p>
      <p><strong>Ends At:</strong> ${endsAt}</p>
      <p><strong class="current-price">Current Price:</strong> $${highestBid}</p>
      <ul><strong>All Bids:</strong>${bidsList || "<li>No bids yet</li>"}</ul>
      <button class="view-details-btn">View Details</button>
      <div class="details hidden">
          <form class="bid-form">
              <label for="bid-amount-${listing.id}">Bid Amount:</label>
              <input type="number" id="bid-amount-${listing.id}" name="bidAmount" min="1" required>
              <input type="hidden" value="${listing.id}" id="listing-id-${listing.id}">
              <button type="submit">Place Bid</button>
          </form>
      </div>
    `;
  
    const detailsDiv = listingDiv.querySelector(".details");
    const viewDetailsBtn = listingDiv.querySelector(".view-details-btn");
  
    viewDetailsBtn.addEventListener("click", () => {
      detailsDiv.classList.toggle("hidden");
    });
  
    const bidForm = listingDiv.querySelector(".bid-form");
    bidForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const bidAmount = parseFloat(
        bidForm.querySelector(`#bid-amount-${listing.id}`).value
      );
      const listingId = bidForm.querySelector(`#listing-id-${listing.id}`).value;
  
      if (isNaN(bidAmount) || bidAmount <= 0) {
        alert("Please enter a valid bid amount.");
        return;
      }
  
      placeBid(listingId, bidAmount);
    });
  
    // Insert the listing at the top of the container
    listingsContainer.insertBefore(listingDiv, listingsContainer.firstChild);
  }
  