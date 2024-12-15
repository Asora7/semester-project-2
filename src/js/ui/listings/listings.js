document.getElementById('listings').addEventListener('click', event => {
    if (event.target.classList.contains('expand-btn')) {
        const listing = event.target.closest('.listing');
        const details = listing.querySelector('.details');
        const bidForm = listing.querySelector('.bid-form');
        
        details.classList.toggle('hidden');
        bidForm.classList.toggle('hidden');
        
        event.target.textContent = details.classList.contains('hidden') ? 'View Details' : 'Hide Details';
    }
});


