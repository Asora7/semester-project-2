import { getAllListings } from '../../api/listings/listings.js';
import { addListingToPage } from '../../ui/listings/display.js';

let currentPage = 1;
const listingsPerPage = 10;

export async function renderHomePage(page = 1) {
  try {
    // Fetch listings for the current page
    const { listings, totalListings, pagination } = await getAllListings(listingsPerPage, page);

    // Update the listings container
    const listingsContainer = document.getElementById("listings-container");
    listingsContainer.innerHTML = ""; // Clear the container

    if (!Array.isArray(listings) || listings.length === 0) {
      listingsContainer.innerHTML = "<p>No listings available.</p>";
    } else {
      listings.forEach(listing => addListingToPage(listing));
    }

    // Update pagination controls
    updatePaginationControls(pagination);
  } catch (error) {
    console.error("Error fetching listings:", error);
    alert("Failed to load listings.");
  }
}

function updatePaginationControls(pagination) {
  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = '';

  // Previous button
  if (pagination.currentPage > 1) {
    paginationContainer.innerHTML += `<button id="prev-btn">Previous</button>`;
  }

  // Page buttons
  for (let i = 1; i <= pagination.totalPages; i++) {
    paginationContainer.innerHTML += `<button class="page-btn">${i}</button>`;
  }

  // Next button
  if (pagination.currentPage < pagination.totalPages) {
    paginationContainer.innerHTML += `<button id="next-btn">Next</button>`;
  }

  // Event listeners for pagination buttons
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => renderHomePage(pagination.currentPage - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => renderHomePage(pagination.currentPage + 1));
  }

  const pageButtons = document.querySelectorAll(".page-btn");
  pageButtons.forEach(button => {
    button.addEventListener("click", () => {
      const pageNum = parseInt(button.textContent);
      renderHomePage(pageNum);
    });
  });
}

// Initial call to render the page
document.addEventListener("DOMContentLoaded", () => renderHomePage(currentPage));

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

function updateListings() {
  getAllListings() // Assuming this fetches the API response with `listings` and `pagination`
    .then(response => {
      console.log("API Response:", response);  // Log the full API response

      const allListings = response.listings;  // Access listings from the 'listings' property
      if (!Array.isArray(allListings)) {
        throw new Error("The 'listings' property is not an array");
      }

      const totalListings = response.totalListings; // Now using the 'totalListings' property
      const listingsPerPage = 10; // Adjust as necessary
      const totalPages = Math.ceil(totalListings / listingsPerPage);

      // Pagination logic
      const start = (currentPage - 1) * listingsPerPage;
      const end = start + listingsPerPage;
      const currentListings = allListings.slice(start, end);

      // Display the listings using updateHomepageListings
      updateHomepageListings(currentListings);

      // Update pagination controls
      updatePaginationControls({
        currentPage,
        totalPages
      });
    })
    .catch(error => {
      console.error("Error fetching listings:", error);
    });
}

updateListings(); // Initial call to display listings
