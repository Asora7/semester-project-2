import { createListing } from "../../api/listings/create.js";
import { addListingToPage } from "./display.js"; // Import the function to add a listing to the page

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
      console.log("Listing created:", result); // Log the result to check the structure

      // Get the container where the new listing should be inserted
      const createListingSection = document.getElementById("create-listing");

      // Create a new element for the listing
      const newListing = document.createElement("div");
      newListing.classList.add("listing"); // You can add a specific class for styling

      newListing.innerHTML = `
        <h3>${result.data.title}</h3>
        <p>${result.data.description}</p>
        <p><strong>Tags:</strong> ${result.data.tags.join(", ")}</p>
        <p><strong>Ends At:</strong> ${new Date(result.data.endsAt).toLocaleString()}</p>
        <img src="${result.data.media[0]?.url}" alt="Listing Media" class="listing-media">
      `;

      // Insert the new listing directly below the form
      createListingSection.appendChild(newListing);

      // Optionally, reset the form
      document.getElementById("create-listing-form").reset();
      alert("Listing created successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the listing.");
    }
  });
});
