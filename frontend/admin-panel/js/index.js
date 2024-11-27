let logOut = document.getElementById("logout")

logOut.addEventListener("click", logout)
function logout() {
 



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





let home = document.querySelector("#home")
home.addEventListener("click" , () => {
    window.localStorage.href = "index.html"
})

let products = document.querySelector("#products")
products.addEventListener("click", () => {
    window.location.href = "product.html"

})


let cotigories = document.querySelector("#cotigories")
cotigories.addEventListener("click", () => {
    window.location.href = "cotigories.html"

})

let history = document.querySelector("#history")
history.addEventListener("click", () => {
    window.location.href = "history.html"

})


let order = document.querySelector("#order")
order.addEventListener("click", () => {
    window.location.href = "order.html"

})
