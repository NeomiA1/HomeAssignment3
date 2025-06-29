window.addEventListener('DOMContentLoaded', () => {
    checkIfLoggedIn();
    logoutBtnHandler();
    appendApartmentCards(window.amsterdam);
    showUserName();
    setupFilterForm();
    setupResetButton();
    setupHamburger();
});
function checkIfLoggedIn() {
    const currUser = loadFromStorage('currentUser');
    if (!currUser) {
        window.location.href = 'login.html';
    }
}

function showUserName() {
    const userNameSpan = document.querySelector("#nbr-user-name");
    const currentUser = loadFromStorage("currentUser");
    if (currentUser && userNameSpan) {
        userNameSpan.textContent = `Welcome, ${currentUser}`;
    }
}

function logoutBtnHandler() {
    const logoutBtn = document.querySelector('#btn-logout');
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
}

// #############################################################
// Utility function to create an HTML element

function createElement(tag, className = '', textContent = '') {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (textContent) {
        element.textContent = textContent;
    }
    return element;
}

function addApartmentCard(apId, apURL, apName, apDescription, apPic) {
  const listingSection = document.querySelector('#listing');
  const username = loadFromStorage ("currentUser");
  let favorites = loadFromStorage(`${username}_favorites`) || [];

  const cardDiv = createElement('div', 'card');
  cardDiv.id = apId;

  const id = createElement('p', 'card-id', `Apartment ID: ${apId}`);
  const title = createElement('h3', 'card-title', apName);
  const description = createElement('p', 'card-description');
  description.innerHTML = apDescription;

  const image = createElement('img', 'card-image');
  image.src = apPic;
  image.alt = apName;

  const rentBtn = createElement('a', 'rent-button', 'Rent');
  rentBtn.href = `rent.html?id=${apId}`;

  const favBtn = createElement('button', 'fav-button');
  favBtn.textContent = favorites.includes(apId) ? '★ Remove from Favorites' : '☆ Add to Favorites';

  favBtn.addEventListener('click', () => {
    favorites = loadFromStorage(`${username}_favorites`) || [];
    let found = false;

    let newFavorites = [];

    for (let i = 0; i < favorites.length; i++) {
     if (favorites[i] === apId) {
      found = true;
     continue;
    }
     newFavorites.push(favorites[i]); 
    }

    if (found) {
    favorites = newFavorites;
    } else {
  favorites.push(apId);
}
    saveToStorage(`${username}_favorites`, favorites);
    favBtn.textContent = found ? '★ Remove from Favorites' : '☆ Add to Favorites';
  });   

  // עטיפת הכפתורים יחד בשורה אחת
  const btnsContainer = createElement('div', 'buttons-container');
  btnsContainer.append(rentBtn, favBtn);

  // הרכבת כרטיס
  cardDiv.append(title, image, id, description, btnsContainer);
  listingSection.appendChild(cardDiv);
}

function appendApartmentCards(amsterdam) {
    const listingSection = document.querySelector('#listing');
    if (!listingSection) return;
    listingSection.innerHTML = '';

    amsterdam.forEach(apartment => {
        addApartmentCard(
            apartment.listing_id,
            apartment.listing_url,
            apartment.name,
            apartment.description,
            apartment.picture_url
        );
    });
    document.querySelector('#apartment-count').textContent = amsterdam.length;
}

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

function setupHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const icon = hamburger.querySelector('i');

  if (!hamburger || !navLinks || !icon) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
}


