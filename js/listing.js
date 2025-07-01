// שליפת דירות, סינון, חיפוש
window.addEventListener('DOMContentLoaded', () => {
setupFilterForm();
setupResetButton();
});
function setupFilterForm() {
    const filterForm = document.querySelector('#filter-form');
    if (!filterForm) return;

    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let minRating = parseFloat(document.querySelector('#min-rating').value) || 0;
        let minPrice = parseFloat(document.querySelector('#min-price').value) || 0;
        let maxPrice = parseFloat(document.querySelector('#max-price').value) || Infinity;
        let roomCount = document.querySelector('#room-count').value;

        if (isNaN(minRating)) minRating = 0;
        if (isNaN(minPrice)) minPrice = 0;
        if (isNaN(maxPrice)) maxPrice = 1000000;
        const apartments = window.amsterdam;
        const filtered = [];

        for (let i = 0; i <apartments.length; i++) {
            const ap = apartments[i];
            const rating = parseFloat(ap.review_scores_rating);
            const price = parseFloat(ap.price.replace(/[^0-9.]/g, ''));
            const rooms = parseInt(ap.bedrooms);
            
            const validRating = isNaN(rating) ? 0 : rating;
            const validPrice = isNaN(price) ? 0 : price;
            const validRooms = isNaN(rooms) ? 0 : rooms;

            let roomCondition = false;
            if (roomCount === "") {
                roomCondition = true;
            } else if (roomCount === "4") {
                roomCondition = validRooms === parseInt(roomCount);
            }

            if (
                validRating >= minRating &&
                validPrice >= minPrice &&
                validPrice <= maxPrice &&
                roomCondition
            ) {
                filtered.push(ap);
            }
        }
        appendApartmentCards(filtered);
    });
}

function setupResetButton() {
    const resetBtn = document.querySelector('#reset-filter');
    if (!resetBtn) return;
    resetBtn.addEventListener('click', () => {
        document.querySelector('#filter-form').reset();
        appendApartmentCards(window.amsterdam);
    });
}