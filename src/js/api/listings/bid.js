/**
 * Place a bid on a listing.
 * @param {string} listingId - The ID of the listing.
 * @param {number} bidAmount - The bid amount.
 */

import { getCreditScore, updateCreditScore } from '../../ui/creditScore.js';
import { API_CREATE_LISTING } from '../constants.js';
import { getHeaders } from '../headers.js';

/**
 * Check if the user is logged in by looking for the JWT token in localStorage.
 * @returns {boolean} - True if the user is logged in, false otherwise.
 */
function isLoggedIn() {
    const token = localStorage.getItem('my_token');  // Or sessionStorage if preferred
    return token !== null;
}

/**
 * Check if the user is trying to bid on their own listing.
 * @param {string} userId - The ID of the current user.
 * @param {string} listingUserId - The ID of the user who created the listing.
 * @returns {boolean} - True if the user is trying to bid on their own listing.
 */
function isOwnListing(userId, listingUserId) {
    return userId === listingUserId;
}

export async function placeBid(listingId, bidAmount, listingUserId) {
    console.log(`Placing bid for listing ID: ${listingId} with amount: ${bidAmount}`);

    // Check if the user is logged in
    if (!isLoggedIn()) {
        alert("Please log in to place a bid.");
        return;
    }

    // Assuming we have the logged-in user's ID stored in localStorage
    const currentUserId = localStorage.getItem('my_token');  // Replace with your logic to fetch the current user's ID

    // Check if the user is trying to bid on their own listing
    if (isOwnListing(currentUserId, listingUserId)) {
        alert("You cannot place a bid on your own listing.");
        return;
    }

    try {
        const userBalance = getCreditScore();

        if (userBalance < bidAmount) {
            alert("Insufficient balance to place the bid.");
            return;
        }

        const apiUrl = `${API_CREATE_LISTING}/${listingId}/bids`;
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                ...getHeaders(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: bidAmount }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Response Data:", data);
            alert(`Failed to place bid: ${data.message}`);
            return;
        }

        const updatedBalance = userBalance - bidAmount;
        updateCreditScore(updatedBalance);
        alert(`Bid placed successfully. Your updated credit score is updated in profile`);

        console.log("Bid placed successfully!", data);

        // Assuming the API response contains the updated price:
        const updatedPrice = data.updatedPrice || bidAmount;

        // Update the price of the listing with the new bid amount
        const listingDiv = document.getElementById(`listing-${listingId}`);
        if (listingDiv) {
            // Get the current price element inside the listing
            const priceElement = listingDiv.querySelector(".current-price");
            if (priceElement) {
                // Update the current price with the new bid amount
                priceElement.textContent = `Current Price: $${bidAmount}`;
            }
        }

        // Optionally, reorder listings if needed
        const listingsContainer = document.getElementById("listings");
        const listingDivs = Array.from(listingsContainer.children);

        // Sort the listings by the highest bid (assuming the new bid is the highest)
        const sortedListings = listingDivs.sort((a, b) => {
            const bidA = a.querySelector(".current-price");
            const bidB = b.querySelector(".current-price");

            const priceA = bidA ? parseFloat(bidA.textContent.replace('Current Price: $', '')) : 0;
            const priceB = bidB ? parseFloat(bidB.textContent.replace('Current Price: $', '')) : 0;

            return priceB - priceA; // Sort by the highest price (bid)
        });

        // Clear the listings container and append the sorted listings
        listingsContainer.innerHTML = '';
        sortedListings.forEach(listing => listingsContainer.appendChild(listing));

    } catch (error) {
        console.error("Error placing bid:", error);
        alert("An error occurred while placing the bid.");
    }
}
