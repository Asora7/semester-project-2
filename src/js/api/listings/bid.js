import { getHeaders } from "../headers";
import { API_CREATE_LISTING } from "../constants.js";

export async function placeBid(listingId, bidAmount) {
  try {
    const response = await fetch(`${API_CREATE_LISTING}/${listingId}/bids`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ amount: bidAmount }),
    });

    if (!response.ok) {
      throw new Error(`Failed to place bid: ${response.statusText}`);
    }

    alert("Bid successfully placed!");
    return await response.json();
  } catch (error) {
    console.error(error);
    alert("Failed to place bid.");
  }
}
