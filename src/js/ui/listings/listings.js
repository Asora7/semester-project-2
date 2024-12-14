import { getAllListings } from '../../api/listings/listings.js';

document.getElementById('listings').addEventListener('click', event => {
    if (event.target.classList.contains('expand-btn')) {
        const listing = event.target.closest('.listing');
        const details = listing.querySelector('.details');
        const bidForm = listing.querySelector('.bid-form');
        
        // Toggle visibility
        details.classList.toggle('hidden');
        bidForm.classList.toggle('hidden');
        
        // Optionally change button text
        event.target.textContent = details.classList.contains('hidden') ? 'View Details' : 'Hide Details';
    }
});


const listingsContainer = document.getElementById('listings-container');
const nextPageButton = document.getElementById('next-page');
const prevPageButton = document.getElementById('prev-page');
let currentPage = 1;
const listingsPerPage = 10; // You want to show 10 listings per page

async function renderListings(page) {
    try {
      // Fetch listings with pagination
      const data = await getAllListings(listingsPerPage, page);
      console.log(data); // Log the full response for debugging
  
      if (data && data.listings) {
        listingsContainer.innerHTML = ''; // Clear existing listings
      
        // Render each listing
        data.listings.forEach(listing => {
          const listingElement = document.createElement('div');
          listingElement.classList.add('listing');
          listingElement.innerHTML = `
            <h3>${listing.title}</h3>
            <p>${listing.description}</p>
            <p><strong>Price:</strong> $${listing.price}</p>
            <p><strong>Created:</strong> ${new Date(listing.created).toLocaleDateString()}</p>
          `;
          listingsContainer.appendChild(listingElement);
        });
      
        // Make sure your API provides the total number of listings (totalListings)
        const totalListings = data.totalListings || 0;
        const totalPages = Math.ceil(totalListings / listingsPerPage);
  
        console.log('Total Listings:', totalListings);
        console.log('Total Pages:', totalPages);
      
        // Update pagination buttons based on current page
        nextPageButton.disabled = currentPage >= totalPages;
        prevPageButton.disabled = currentPage <= 1;
      }
      
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  }
  
  // Event listeners for pagination buttons
  nextPageButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderListings(currentPage); // Re-render with the next page
    }
  });
  
  prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderListings(currentPage); // Re-render with the previous page
    }
  });
  
  // Initial render (First page)
  renderListings(currentPage);
  