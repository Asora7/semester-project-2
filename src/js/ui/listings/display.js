/**
 * Add a listing to the page with expandable bid form
 * @param {Object} listing - The listing data returned from the API
 */
export function addListingToPage(listing) {
    const listingsContainer = document.getElementById("listings");

    if (!listingsContainer) {
        console.error("Listings container not found!");
        return;a
    }

    // Create a new listing div
    const listingDiv = document.createElement("div");
    listingDiv.className = "listing";

    // Handle media
    const mediaUrl = listing.media && Array.isArray(listing.media) && listing.media.length > 0
        ? `<img src="${listing.media[0].url}" alt="${listing.title || "No title"}" class="listing-image">`
        : "";

    // Handle tags
    const tags = listing.tags && Array.isArray(listing.tags) && listing.tags.length > 0
        ? listing.tags.join(", ")
        : "No tags";

    // Format the end date
    const endsAt = listing.endsAt
        ? new Date(listing.endsAt).toLocaleString()
        : "Invalid Date";

    // Build the main listing HTML
    listingDiv.innerHTML = `
        <h3>${listing.title || "No title provided"}</h3>
        <p>${listing.description || "No description provided"}</p>
        ${mediaUrl}
        <p><strong>Tags:</strong> ${tags}</p>
        <p><strong>Ends At:</strong> ${endsAt}</p>
        <button class="view-details-btn">View Details</button>
        <div class="details hidden">
            <form class="bid-form">
                <label for="bid-amount-${listing.id}">Bid Amount:</label>
                <input type="number" id="bid-amount-${listing.id}" name="bidAmount" min="1" required>
                <button type="submit">Place Bid</button>
            </form>
        </div>
    `;

    // Add toggle functionality for details
    const detailsDiv = listingDiv.querySelector(".details");
    const viewDetailsBtn = listingDiv.querySelector(".view-details-btn");

    viewDetailsBtn.addEventListener("click", () => {
        detailsDiv.classList.toggle("hidden");
    });

    // Handle bid form submission
    const bidForm = listingDiv.querySelector(".bid-form");
    bidForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const bidAmount = bidForm.querySelector(`#bid-amount-${listing.id}`).value;
        placeBid(listing.id, bidAmount);
    });

    // Append the listing to the container
    listingsContainer.appendChild(listingDiv);
}
