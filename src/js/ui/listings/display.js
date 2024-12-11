/**
 * Add a listing to the page
 * @param {Object} listing - The listing data returned from the API
 */
export function addListingToPage(listing) {
    const listingsContainer = document.getElementById("listings");
  
    if (!listingsContainer) {
        console.error("Listings container not found!");
        return;
    }

    const listingDiv = document.createElement("div");
    listingDiv.className = "listing";

    const mediaUrl = listing.media && Array.isArray(listing.media) && listing.media.length > 0
        ? `<img src="${listing.media[0].url}" alt="${listing.title}" style="max-width: 100px;">`
        : "";

    const tags = listing.tags && Array.isArray(listing.tags) && listing.tags.length > 0
        ? listing.tags.join(", ")
        : "No tags";

    const endsAt = listing.endsAt
        ? new Date(listing.endsAt).toLocaleString()
        : "Invalid Date";

    listingDiv.innerHTML = `
        <h3>${listing.title || "No title provided"}</h3>
        <p>${listing.description || "No description provided"}</p>
        ${mediaUrl}
        <p>Tags: ${tags}</p>
        <p>Ends At: ${endsAt}</p>
    `;

    listingsContainer.appendChild(listingDiv);
}


