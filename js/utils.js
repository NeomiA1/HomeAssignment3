window.addEventListener('DOMContentLoaded', () => {
    logoutBtnHandler();
    checkIfLoggedIn();
    appendApartmentCards(window.amsterdam);
    showUserName();
    setupFilterForm();
    setupResetButton();
    setupHamburger();
});

function showUserName() {
    const userNameSpan = document.querySelector("#nbr-user-name");
    const currentUser = localStorage.getItem("currentUser");
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

function checkIfLoggedIn() {
    const currUser = localStorage.getItem('currentUser');
    if (!currUser) {
        window.location.href = 'login.html';
    }
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
  const username = localStorage.getItem("currentUser");
  let favorites = JSON.parse(localStorage.getItem(`${username}_favorites`)) || [];

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
    favorites = JSON.parse(localStorage.getItem(`${username}_favorites`)) || [];
    if (favorites.includes(apId)) {
      favorites = favorites.filter(id => id !== apId);
    } else {
      favorites.push(apId);
    }
    localStorage.setItem(`${username}_favorites`, JSON.stringify(favorites));
    favBtn.textContent = favorites.includes(apId) ? '★ Remove from Favorites' : '☆ Add to Favorites';
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
    document.querySelector('#filter-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const minRating = parseFloat(document.querySelector('#min-rating').value) || 0;
        const minPrice = parseFloat(document.querySelector('#min-price').value) || 0;
        const maxPrice = parseFloat(document.querySelector('#max-price').value) || Infinity;
        const roomCount = document.querySelector('#room-count').value;

        const filtered = window.amsterdam.filter(ap => {
            const rating = parseFloat(ap.review_scores_rating) || 0;
            const price = parseFloat(ap.price.replace(/[^0-9.]/g, '')) || 0;
            const rooms = parseInt(ap.bedrooms) || 0;
            return rating >= minRating &&
                   price >= minPrice &&
                   price <= maxPrice &&
                   (roomCount === "" || (roomCount === "4" ? rooms >= 4 : rooms === parseInt(roomCount)));
        });

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



