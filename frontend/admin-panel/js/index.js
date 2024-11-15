let logOut = document.getElementById("logout")

logOut.addEventListener("click", logout)
function logout() {
    console.log("salom");



    fetch('http://192.168.0.118:5050/logout',
        {
            method: "GET"
        }
    )

        .then(response => response.json())


        .then(response => {
            if (response.success) {
                alert("Bye!")
                return window.location.href = "logIn.html"
            }
        })
        .catch(err => {
            console.log(err);

        })
}


let cotigoris = document.querySelector("#cotigories")

cotigoris.addEventListener("click", ()=>{
    window.location.href="cotigories.html"

})