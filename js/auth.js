// פעולות ראשוניות בהרצת עמוד
document.addEventListener("DOMContentLoaded", () => {
    showUserName();
    logoutBtnHandler();
});

// הרשמה
const registerForm = document.querySelector("#register-form");
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.querySelector("#user-name").value.trim();
        const password = document.querySelector("#password").value;
        const errorEl = document.querySelector("#error");

        if (password.length < 8) {
            errorEl.textContent = "Password must be at least 8 characters.";
            return;
        }

        const users = loadFromStorage("usersList") || [];
        const userExists = users.some(u => u.username === username);

        if (userExists) {
            errorEl.innerHTML = 'Username already exists. <br> <a href="login.html">Click here to login</a>.';
            return;
        }

        users.push({ username, password });
        saveToStorage("usersList", users);
        saveToStorage("currentUser", username);
        window.location.href = "index.html";
    });
}

// התחברות
const loginForm = document.querySelector("#login-form");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.querySelector("#username").value.trim();
        const password = document.querySelector("#password").value;
        const errorEl = document.querySelector("#error");

        const users = loadFromStorage("usersList") || [];
        const validUser = users.find(u => u.username === username && u.password === password);

        if (!validUser) {
            errorEl.textContent = "Invalid username or password.";
            return;
        }

        saveToStorage("currentUser", username);
        window.location.href = "index.html";
    });
}

// הצגת שם משתמש
function showUserName() {
    const span = document.querySelector("#nbr-user-name");
    const user = loadFromStorage("currentUser");
    if (span && user) {
        span.textContent = `Welcome, ${user}`;
    }
}

// כפתור יציאה
function logoutBtnHandler() {
    const logoutBtn = document.querySelector("#btn-logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            window.location.href = "login.html";
        });
    }
}
