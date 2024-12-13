import { getAllListings } from '../../api/listings/listings.js';
import { addListingToPage } from '../../ui/listings/display.js';

export async function renderHomePage() {
    try {
        const response = await getAllListings(); 
        const listings = Array.isArray(response.data) ? response.data : [];
        
        console.log('Listings:', listings);
  
        const listingsContainer = document.getElementById("listings-container");
        listingsContainer.innerHTML = ""; 
  
        listings.forEach((listing) => {
            addListingToPage(listing);  
        });
    } catch (error) {
        console.error("Error fetching listings:", error);
        alert("Failed to load listings.");
    }
}

  

  document.addEventListener("DOMContentLoaded", async () => {
    try {
        const allListings = await getAllListings(); // Fetch listings only once
        updateHomepageListings(allListings); // Display listings on the page
    } catch (error) {
        console.error("Error fetching listings:", error);
    }
});
  
// Homepage update function to dynamically display posts
function updateHomepageListings(listings) {
    const listingsContainer = document.querySelector("#listings-container");
    
    if (!listingsContainer) {
        console.error('Listings container not found!');
        return;
    }

    listingsContainer.innerHTML = ""; // Clear the current listings

    listings.forEach(listing => {
        const listingElement = document.createElement("div");
        listingElement.classList.add("listing");

        const imageUrl = listing.media && listing.media.length > 0 ? listing.media[0].url : 'default-image.jpg'; // Use default image if none exists
        const endsAt = listing.endsAt ? new Date(listing.endsAt).toLocaleString() : 'No end date'; // Format end date if present
        const tags = listing.tags ? listing.tags.join(", ") : 'No tags available'; // Handle missing tags
        const price = listing.price || 'N/A'; // Fallback if price is missing
        const highestBid = listing.highestBid || 'No bids yet'; // Handle missing highestBid
        const bidsList = listing.bids && listing.bids.length > 0 ? listing.bids.map(bid => `<li>${bid.amount}</li>`).join('') : '<li>No bids yet</li>';

        listingElement.innerHTML = `
            <div class="listing-image">
                <img src="${imageUrl}" alt="${listing.title}" />
            </div>
            <h3>${listing.title}</h3>
            <p>${listing.description}</p>
            <p><strong>Price: $${price}</strong></p>
            <p><strong>Tags:</strong> ${tags}</p>
            <p><strong>Ends At:</strong> ${endsAt}</p>
            <p><strong class="current-price">Current Price:</strong> $${highestBid}</p>
            <ul><strong>All Bids:</strong>${bidsList}</ul>
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

        listingsContainer.appendChild(listingElement);
    });
}



  
  