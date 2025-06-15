//  הרשמה והתחברות (usersList, currentUser)
document.querySelector("#register-form").addEventListener("submit", function (e){
    e.preventDefault();

        const usernameInput = document.querySelector("#user-name").value.trim();
        const passwordInput = document.querySelector("#password").value;
        const errorElement = document.querySelector("#error");

        if (passwordInput.length < 8) {
            errorElement.textContent = "Password must be at least 8 characters.";
            return;
        }

        let userListStr = localStorage.getItem("usersList");
        let usersList;

        if (userListStr !== null) {
            usersList = JSON.parse(userListStr);
        }

        else {
            
            usersList = [];
        }

        let userExists = usersList.some(function(user) {
            return user.username === usernameInput;
        });

        if (userExists) {
            errorElement.innerHTML = 'Username already exists. <br> <a href="login.html">Click here to login</a>.';
            return;
        }

        let newUser = {
            username: usernameInput,
            password: passwordInput
        };

        usersList.push(newUser);

        localStorage.setItem("userList", JSON.stringify(usersList));
        localStorage.setItem("currentUser", usernameInput);

        window.location.href = "index.html";
    });
}

const loginForm = document.querySelector("#login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const usernameInput = document.querySelector("#username").value.trim();
        const passwordInput = document.querySelector("#password").value;
        const errorElement = document.querySelector("#error");
    
        let userListStr = localStorage.getItem("usersList");
        let usersList;
    
        if (userListStr !== null) {
            usersList = JSON.parse(userListStr)
        }
        else {
            usersList = [];
        }
    
        let foundUser = usersList.find(function(user){
            return user.username === loginUserName && user.password === passwordInput;
    
        });
    
        if (!foundUser) {
            errorElement.textContent = "Invalid username or password.";
            return;
        }
    
        localStorage.setItem("currentUser", usernameInput);
        window.location.href = "index.html";

    });
}


const nameSpan = document.querySelector("#nbr-user-name");

if (nameSpan) {
    const currentUser = loadFromStorage("currentUser");
    if (!currentUser) {
        if (window.location.pathname !== "/login.html") {
            window.location.href = "login.html";
        }
  }

    else {
        nameSpan.textContent = currentUser;
    }
}


const logoutBtn = document.querySelector("#btn-logout");
if(logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    });
}



