/**
 * Place a bid on a listing.
 * @param {string} listingId - The ID of the listing.
 * @param {number} bidAmount - The bid amount.
 */

import { getCreditScore, updateCreditScore } from '../../ui/creditScore.js';
import { API_CREATE_LISTING } from '../constants.js'; // Import your API constants
import { getHeaders } from '../headers.js';
import { updateListingDisplay } from '../../ui/listings/display.js';


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

        // Update the listing display
        updateListingDisplay(listingId, data);
    } catch (error) {
        console.error("Error placing bid:", error);
        alert("An error occurred while placing the bid.");
    }
}
