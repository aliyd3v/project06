let form = document.getElementById("form");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Formaning standart xatti-harakatini to'xtatadi

    // Submit paytida username va password qiymatlarini yangidan olamiz
    let username = document.getElementById("user-name").value;
    let password = document.getElementById("password").value;

    logIn(username, password); // LogIn funksiyasini chaqirish
});

function logIn(username, password) {
    fetch('http://localhost:5050/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password })
    })
        .then(response => response.json())
        .then(response => {
            if (response.success) {

                return window.location.href = "index.html"; // Sahifani o'zgartirish
            } else {
                alert("Login failed: " + response.message);
            }
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
}
