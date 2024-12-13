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
