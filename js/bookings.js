//  הוספה/ביטול השכרות, לפי currentUser
const currentUser = loadFromStorage("currentUser");
document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("currentUser");
  if (!username) {
    alert("You must be logged in to view bookings.");
    window.location.href = "index.html";
    return;
  }

  const bookings = JSON.parse(localStorage.getItem(`${username}_bookings`)) || [];
  const futureList = document.getElementById("future-list");
  const pastList = document.getElementById("past-list");
  const today = new Date().toISOString().split("T")[0];

  if (bookings.length === 0) {
    futureList.innerHTML = `<p id="no-bookings">No bookings found.</p>`;
    pastList.innerHTML = `<p id="no-bookings">No bookings found.</p>`;
    return;
  }

  bookings.forEach((booking, index) => {
    const listing = amsterdam.find(ap => ap.listing_id === booking.listingId);
    if (!listing) return;

    const card = document.createElement("div");
    card.className = "booking-card";
    card.innerHTML = `
      <img src="${listing.picture_url}" alt="${listing.name}" />
      <div class="booking-info">
        <h3>${listing.name}</h3>
        <p>${listing.description}</p>
        <p><strong>From:</strong> ${booking.startDate}</p>
        <p><strong>To:</strong> ${booking.endDate}</p>
      </div>
    `;

    const isFuture = booking.startDate >= today;
    const list = isFuture ? futureList : pastList;

    if (isFuture) {
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel Booking";
      cancelBtn.className = "cancel-button";
      cancelBtn.addEventListener("click", () => {
        bookings.splice(index, 1);
        localStorage.setItem(`${username}_bookings`, JSON.stringify(bookings));
        location.reload();
      });
      card.appendChild(cancelBtn);
    }

    list.appendChild(card);
  });

  document.querySelectorAll(".tab-button").forEach(button => {
    button.addEventListener("click", () => {
      const target = button.dataset.target;

      document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
      button.classList.add("active");

      document.querySelectorAll(".tab-section").forEach(section => section.classList.remove("active"));
      document.getElementById(`${target}-bookings`).classList.add("active");
    });
  });
});

if (!currentUser) {
    window.location.href = "login.html";
}