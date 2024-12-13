/**
 * Place a bid on a listing.
 * @param {string} listingId - The ID of the listing.
 * @param {number} bidAmount - The bid amount.
 */

import { getCreditScore, updateCreditScore } from '../../ui/creditScore.js';
import { API_CREATE_LISTING } from '../constants.js';
import { getHeaders } from '../headers.js';

export async function placeBid(listingId, bidAmount) {
    console.log(`Placing bid for listing ID: ${listingId} with amount: ${bidAmount}`);

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
        alert(`Bid placed successfully. Your updated credit score is ${updatedBalance}.`);

        console.log("Bid placed successfully!", data);

        // Update the price of the listing with the new bid amount
        const listingDiv = document.getElementById(`listing-${listingId}`);
        if (listingDiv) {
            const priceElement = listingDiv.querySelector(".current-price");
            if (priceElement) {
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