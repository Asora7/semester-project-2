import { getProfile } from "../../api/profile/read.js";
import { updateProfile } from "../../api/profile/update.js";
import { API_PROFILES } from '../../api/constants.js'; 
import { getHeaders } from '../../api/headers.js'; 


document.addEventListener("DOMContentLoaded", () => {
    const profileName = localStorage.getItem('name');
  getProfile(); 
  

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
      getProfile(); 
    });

    updateForm.reset(); 
  });
});

async function fetchListingsByProfile(profileName) {
    try {
      const response = await fetch(`${API_PROFILES}/${profileName}/listings`, {
        method: 'GET',
        headers: getHeaders(),  
      });
      const data = await response.json();
      console.log('Listings data:', data); 

      displayListings(data.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  }
  
  function displayListings(listings) {
    const listingsContainer = document.getElementById('listingsContainer');
    listingsContainer.innerHTML = ''; 
  
    listings.forEach(listing => {
      const isActive = new Date(listing.endsAt) > new Date(); 
      const winningBid = listing.bids?.length
        ? Math.max(...listing.bids.map(bid => bid.amount)) 
        : 'No bids yet';
  
      const listingElement = document.createElement('div');
      listingElement.classList.add('col-md-4'); 
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
  
  
  async function fetchBidsByProfile(profileName) {
    try {
      const response = await fetch(`${API_PROFILES}/${profileName}/bids`, {
        method: 'GET',
        headers: getHeaders(),  
      });
      const data = await response.json();
  
      displayBids(data.data);
    } catch (error) {
      console.error('Error fetching bids:', error);
    }
  }

function displayBids(bids) {
  const bidsContainer = document.getElementById('bidsContainer');
  bidsContainer.innerHTML = '';

  bids.forEach(bid => {
      const bidElement = document.createElement('div');
      bidElement.classList.add('col-md-4', 'mb-4'); 

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




  