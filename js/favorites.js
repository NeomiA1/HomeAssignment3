document.addEventListener("DOMContentLoaded", () => {
  const username = loadFromStorage("currentUser");
  if (!username) {
    alert("You must be logged in to view favorites.");
    window.location.href = "index.html";
    return;
  }
  
  const favorites = loadFromStorage(`${username}_favorites`) || [];
  const container = document.getElementById("favorites-list");

  if (favorites.length === 0) {
    container.innerHTML = `<p id="no-favorites">You have no favorite apartments.</p>`;
    return;
  }

  favorites.forEach((favId, index) => {
    const listing = amsterdam.find(ap => ap.listing_id === favId);
    if (!listing) return;

    const card = document.createElement("div");
    card.className = "favorite-card";

    card.innerHTML = `
      <img src="${listing.picture_url}" alt="${listing.name}" />
      <div class="favorite-info">
        <h3>${listing.name}</h3>
        <p>${listing.description}</p>
        <p><strong>Price:</strong> $${listing.price} per night</p>
      </div>
      <button class="remove-button">Remove from Favorites</button>
    `;

    card.querySelector(".remove-button").addEventListener("click", () => {
      favorites.splice(index, 1);
      saveToStorage(`${username}_favorites`, favorites);
      location.reload();
    });

    container.appendChild(card);
  });
});
