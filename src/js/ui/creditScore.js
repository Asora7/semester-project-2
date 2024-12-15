/**
 * Retrieves the user's current credit score.
 * @returns {number} The current credit score.
 */
export function getCreditScore() {
    return parseInt(localStorage.getItem('user_balance')) || 1000;
}

/**
 * Updates the user's credit score by deducting a bid amount.
 * @param {number} bidAmount - The amount to deduct from the credit score.
 */
export function updateCreditScore(bidAmount) {
    let currentScore = getCreditScore(); 
    if (bidAmount <= currentScore) {
        currentScore -= bidAmount; 
        localStorage.setItem('user_balance', currentScore);
        console.log(`New credit score: ${currentScore}`);
    } else {
        console.error('Insufficient credit score for this bid.');
    }
}


/**
 * Initializes the user's credit score if not already set.
 * @param {number} defaultScore - The default score to initialize (optional).
 */
export function initializeCreditScore(defaultScore = 1000) {
    if (!localStorage.getItem('user_balance')) {
        localStorage.setItem('user_balance', defaultScore);
        console.log(`Credit score initialized to: ${defaultScore}`);
    }
}

