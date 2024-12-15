import { getProfile } from "../../api/profile/read.js";
import { updateProfile } from "../../api/profile/update.js";
import { API_PROFILES } from '../../api/constants.js'; 
import { getHeaders } from '../../api/headers.js'; 


document.addEventListener("DOMContentLoaded", () => {
    const profileName = localStorage.getItem('name');
  getProfile(); // Fetch and display profile info
  

  fetchListingsByProfile(profileName);
  fetchBidsByProfile(profileName);
  fetchWinsByProfile(profileName);

  const updateForm = document.getElementById('update-profile-form');
  updateForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const avatarUrl = document.getElementById('avatar-url').value;
    const bio = document.getElementById('bio').value;
    const bannerUrl = document.getElementById('banner-url').value;
    const updatedData = {
      name: localStorage.getItem('name'), 
      avatarUrl,
      bio,
      bannerUrl
    };

    updateProfile(updatedData).then(() => {
      getProfile(); // Re-fetch profile to show updated info
    });

    updateForm.reset(); 
  });
});

// Function to fetch all listings by profile
async function fetchListingsByProfile(profileName) {
    try {
      const response = await fetch(`${API_PROFILES}/${profileName}/listings`, {
        method: 'GET',
        headers: getHeaders(),  // Use getHeaders for authorization
      });
      const data = await response.json();
      console.log('Listings data:', data); 
      
      // Display listings
      displayListings(data.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  }
  
  // Function to display listings
  function displayListings(listings) {
    const listingsContainer = document.getElementById('listingsContainer');
    listingsContainer.innerHTML = ''; // Clear any existing listings
  
    listings.forEach(listing => {
      const isActive = new Date(listing.endsAt) > new Date(); // Check if listing is still active
      const winningBid = listing.bids?.length
        ? Math.max(...listing.bids.map(bid => bid.amount)) // Get the highest bid
        : 'No bids yet';
  
      const listingElement = document.createElement('div');
      listingElement.classList.add('col-md-4'); // Bootstrap grid column for responsive layout
  
      // Dynamically set the media URL if available
      let mediaUrl = '';
      if (listing.media && listing.media.url) {
        mediaUrl = `<img src="${listing.media.url}" alt="${listing.title}" class="listing-media" />`;
      }
  
      listingElement.innerHTML = `
        <div class="listing">
          ${mediaUrl} <!-- Dynamically inserted image -->
          <h3>${listing.title}</h3>
          <p>${listing.description || 'No description provided'}</p>
          <p>Status: <strong>${isActive ? 'Active' : 'Ended'}</strong></p>
          <p>Ends At: ${new Date(listing.endsAt).toLocaleString()}</p>
          <p>Winning Bid: <strong>${winningBid}</strong></p>
        </div>
      `;
  
      listingsContainer.appendChild(listingElement);
    });
  }
  
  
  

  
  // Function to fetch all bids by profile
  async function fetchBidsByProfile(profileName) {
    try {
      const response = await fetch(`${API_PROFILES}/${profileName}/bids`, {
        method: 'GET',
        headers: getHeaders(),  // Use getHeaders for authorization
      });
      const data = await response.json();
  
      // Display bids
      displayBids(data.data);
    } catch (error) {
      console.error('Error fetching bids:', error);
    }
  }

  
// Modify displayBids to include listing details
function displayBids(bids) {
  const bidsContainer = document.getElementById('bidsContainer');
  bidsContainer.innerHTML = '';

  bids.forEach(bid => {
      const bidElement = document.createElement('div');
      bidElement.classList.add('col-md-4', 'mb-4'); // Bootstrap grid with margin-bottom

      bidElement.innerHTML = `
          <div class="card shadow-sm">
              <div class="card-body">
                  <h5 class="card-title">Bidder: ${bid.bidder.name || 'Unknown'}</h5>
                  <p class="card-text">Amount: <strong>$${bid.amount}</strong></p>
              </div>
              <div class="card-footer text-muted">
                  <small>Placed on ${new Date(bid.created).toLocaleDateString()}</small>
              </div>
          </div>
      `;

      bidsContainer.appendChild(bidElement);
  });
}


  // Function to fetch all wins by profile
  async function fetchWinsByProfile(profileName) {
    try {
      const response = await fetch(`${API_PROFILES}/${profileName}/wins`, {
        method: 'GET',
        headers: getHeaders(),  // Use getHeaders for authorization
      });
      const data = await response.json();
  
      // Display wins
      displayWins(data.data);
    } catch (error) {
      console.error('Error fetching wins:', error);
    }
  }
  
  // Function to display wins
  function displayWins(wins) {
    const winsContainer = document.getElementById('winsContainer');
    winsContainer.innerHTML = '';
  
    wins.forEach(win => {
      const winElement = document.createElement('div');
      winElement.classList.add('win');
  
      const title = document.createElement('h3');
      title.textContent = win.title;
      winElement.appendChild(title);
  
      const description = document.createElement('p');
      description.textContent = win.description;
      winElement.appendChild(description);
  
      const media = win.media.map(item => {
        const img = document.createElement('img');
        img.src = item.url;
        img.alt = item.alt;
        return img;
      });
  
      media.forEach(img => winElement.appendChild(img));
  
      winsContainer.appendChild(winElement);
    });
  }
  