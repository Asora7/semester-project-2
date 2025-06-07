/**
 * Place a bid on a listing.
 * @param {string} listingId - The ID of the listing.
 * @param {number} bidAmount - The bid amount.
 */
import { getCreditScore, updateCreditScore } from '../../ui/creditScore.js';
import { API_CREATE_LISTING } from '../constants.js';
import { getHeaders } from '../headers.js';
import Toastify from 'toastify-js';

/**
 * Check if the user is logged in by looking for the JWT token in localStorage.
 * @returns {boolean}
 */
function isLoggedIn() {
  return !!localStorage.getItem('my_token');
}

/**
 * Check if the user is trying to bid on their own listing.
 * @param {string} userId
 * @param {string} listingUserId
 * @returns {boolean}
 */
function isOwnListing(userId, listingUserId) {
  return userId === listingUserId;
}

export async function placeBid(listingId, bidAmount, listingUserId) {
  console.log(`Placing bid for listing ID: ${listingId} with amount: ${bidAmount}`);

  if (!isLoggedIn()) {
    Toastify({
      text: 'Please log in to place a bid.',
      duration: 3000,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to right, #b00000, #c9302c)'
    }).showToast();
    return;
  }

  const currentUserId = localStorage.getItem('my_token');

  if (isOwnListing(currentUserId, listingUserId)) {
    Toastify({
      text: 'You cannot place a bid on your own listing.',
      duration: 3000,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to right, #b00000, #c9302c)'
    }).showToast();
    return;
  }

  try {
    const userBalance = getCreditScore();
    if (userBalance < bidAmount) {
      Toastify({
        text: 'Insufficient balance to place the bid.',
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #b00000, #c9302c)'
      }).showToast();
      return;
    }

    const apiUrl = `${API_CREATE_LISTING}/${listingId}/bids`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        ...getHeaders(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: bidAmount })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Response Data:', data);
      Toastify({
        text: `Failed to place bid: ${data.message}`,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #b00000, #c9302c)'
      }).showToast();
      return;
    }

    const updatedBalance = userBalance - bidAmount;
    updateCreditScore(updatedBalance);

    Toastify({
      text: `Bid placed! New balance: ${updatedBalance}`,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)'
    }).showToast();

    console.log('Bid placed successfully!', data);
    // … (re-render-listings-logikken din her)
  } catch (error) {
    console.error('Error placing bid:', error);
    Toastify({
      text: 'An error occurred while placing the bid.',
      duration: 3000,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to right, #b00000, #c9302c)'
    }).showToast();
  }
}
