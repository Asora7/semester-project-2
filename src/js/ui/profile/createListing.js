import { createListing } from "../../api/profile/createListing.js"; // Correct path to your API function

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("create-listing-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const mediaUrl = document.getElementById("media").value;
    const tags = document.getElementById("tags").value.split(",").map(tag => tag.trim());
    const endsAt = new Date(document.getElementById("endsAt").value).toISOString();

    const listingData = {
      title,
      description,
      media: mediaUrl ? [{ url: mediaUrl }] : [],
      tags,
      endsAt,
    };

    try {
      const result = await createListing(listingData);
      console.log("Listing created:", result);

      addListingToPage(result);

      document.getElementById("create-listing-form").reset();
      alert("Listing created successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the listing.");
    }
  });
});

// Define the addListingToPage function
function addListingToPage(listing) {
  const listingsContainer = document.getElementById("listings");

  const listingDiv = document.createElement("div");
  listingDiv.className = "listing";

  // Check if listing.media exists and is an array
  const mediaUrl = listing.media && Array.isArray(listing.media) && listing.media.length > 0 
    ? `<img src="${listing.media[0].url}" alt="${listing.title}" style="max-width: 100px;">` 
    : "";

  listingDiv.innerHTML = `
    <h3>${listing.title}</h3>
    <p>${listing.description}</p>
    ${mediaUrl}
    <p>Tags: ${listing.tags.join(", ")}</p>
    <p>Ends At: ${new Date(listing.endsAt).toLocaleString()}</p>
  `;

  listingsContainer.appendChild(listingDiv);
}
