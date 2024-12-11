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

      // Pass result.data to the addListingToPage function
      addListingToPage(result.data); // Update the UI with the new listing
      document.getElementById("create-listing-form").reset();
      alert("Listing created successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the listing.");
    }
  });
});
