window.addEventListener('DOMContentLoaded', () => {
    logoutBtnHandler();
    // checkIfLoggedIn();
    appendApartmentCards(amsterdam);
    showUserName();
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

function addApartmentCard(apId, apURL, apName, apDescription, apPic){
    const listingSection = document.querySelector('#listing');
    const cardDiv = createElement('div', 'card');
    cardDiv.id = apId; // for easy access later for renting
    
    const id = createElement('p', 'card-id', ApartmentID,{apId});
    const cardTitle = createElement('h3', 'card-title', apName);
    const cardDescription = createElement('p', 'card-description');
    cardDescription.innerHTML = apDescription;
    const cardImage = createElement('img', 'card-image');
    cardImage.src = apPic;
    const URL = createElement('a', 'url', 'View Details');
    URL.href = apURL;
    cardDiv.append(id, cardTitle, cardDescription, cardImage, URL);
    listingSection.appendChild(cardDiv);
}

function appendApartmentCards(amsterdam) {
    amsterdam.forEach(apartment => {
        addApartmentCard(
            apartment.listing_id,
            apartment.listing_url,
            apartment.name,
            apartment.description,
            apartment.picture_url
        );
        
    });
}