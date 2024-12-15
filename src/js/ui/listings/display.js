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
  listingDiv.className = "col listing p-3 border rounded shadow-sm";
  listingDiv.id = `listing-${listing.id}`;

  const mediaUrl = listing.media?.length
    ? `<img src="${listing.media[0].url}" alt="${listing.title || "No title"}" class="img-fluid w-100 object-fit-cover mb-3">`
    : `<div class="placeholder-image bg-secondary d-flex align-items-center justify-content-center text-white mb-3" style="height: 200px;">No Image</div>`;

  const tags = listing.tags?.length ? listing.tags.join(", ") : "No tags";
  const endsAtDate = listing.endsAt ? new Date(listing.endsAt) : null;
  const endsAt = endsAtDate ? endsAtDate.toLocaleString() : "Invalid Date";
  const bids = listing.bids || [];

  const highestBid = bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0;

  const now = new Date();
  const isActive = endsAtDate && endsAtDate > now;

  const bidsList = bids
    .map((bid) => `<li>Amount: $${bid.amount}, By User ID: ${bid.userId || "Unknown"}</li>`)
    .join("");

  const statusBadge = isActive
    ? `<span class="badge bg-success">Active</span>`
    : `<span class="badge bg-danger">Not Active</span>`;

    listingDiv.innerHTML = `
    ${mediaUrl}
    <h3>${listing.title || "No title provided"}</h3>
    <p><strong>Ends At:</strong> ${endsAt}</p>
    <p><strong class="current-price">Current Price:</strong> $${highestBid}</p>
    <p>${statusBadge}</p>
    <div class="mt-auto text-center">
      <button class="btn btn-primary view-details-btn" ${!isActive ? "disabled" : ""}>View Details</button>
    </div>
    <div class="details hidden">
        <p>${listing.description || "No description provided"}</p>
        <p><strong>Tags:</strong> ${tags}</p>
        <ul><strong>All Bids:</strong>${bidsList || "<li>No bids yet</li>"}</ul>
        <form class="bid-form" ${!isActive ? "style='display:none;'" : ""}>
            <label for="bid-amount-${listing.id}">Bid Amount:</label>
            <input type="number" id="bid-amount-${listing.id}" name="bidAmount" min="1" required class="form-control mb-2">
            <input type="hidden" value="${listing.id}" id="listing-id-${listing.id}">
            <button type="submit" class="btn btn-success">Place Bid</button>
        </form>
    </div>
  `;

  const viewDetailsBtn = listingDiv.querySelector(".view-details-btn");
  const detailsDiv = listingDiv.querySelector(".details");

  viewDetailsBtn.addEventListener("click", () => {
    // Hide other expanded listings
    document.querySelectorAll(".listing .details").forEach((otherDetails) => {
      if (otherDetails !== detailsDiv) {
        otherDetails.classList.add("hidden");
      }
    });

    detailsDiv.classList.toggle("hidden"); // Toggle current listing's details
    viewDetailsBtn.textContent = detailsDiv.classList.contains("hidden") ? "View Details" : "Hide Details";
  });

  const bidForm = listingDiv.querySelector(".bid-form");
  if (bidForm) {
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

      placeBid(listingId, bidAmount); // Place the bid using the provided function
    });
  }

  listingsContainer.appendChild(listingDiv);
}

  
  