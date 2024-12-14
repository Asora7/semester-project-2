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
      
      // Display listings
      displayListings(data.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  }
  
  // Function to display listings
  function displayListings(listings) {
    const listingsContainer = document.getElementById('listingsContainer');
    listingsContainer.innerHTML = '';
  
    listings.forEach(listing => {
      const listingElement = document.createElement('div');
      listingElement.classList.add('listing');
  
      const title = document.createElement('h3');
      title.textContent = listing.title;
      listingElement.appendChild(title);
  
      const description = document.createElement('p');
      description.textContent = listing.description;
      listingElement.appendChild(description);
  
      const media = listing.media.map(item => {
        const img = document.createElement('img');
        img.src = item.url;
        img.alt = item.alt;
        return img;
      });
  
      media.forEach(img => listingElement.appendChild(img));
  
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
      bidElement.classList.add('bid');

      const bidderName = document.createElement('h4');
      bidderName.textContent = bid.bidder.name;
      bidElement.appendChild(bidderName);

      const amount = document.createElement('p');
      amount.textContent = `Amount: ${bid.amount}`;
      bidElement.appendChild(amount);

      const bidDate = document.createElement('p');
      bidDate.textContent = `Bid placed on: ${new Date(bid.created).toLocaleDateString()}`;
      bidElement.appendChild(bidDate);

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
  
