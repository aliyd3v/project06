

// let home = document.querySelector("#home")
// home.addEventListener("click" , () => {
//     window.localStorage.href = "index.html"
// })

// let products = document.querySelector("#products")
// products.addEventListener("click", () => {
//     window.location.href = "product.html"

// })


// let cotigories = document.querySelector("#cotigories")
// cotigories.addEventListener("click", () => {
//     window.location.href = "cotigories.html"

// })

// let history = document.querySelector("#history")
// history.addEventListener("click", () => {
//     window.location.href = "history.html"

// })


// let order = document.querySelector("#order")
// order.addEventListener("click", () => {
//     window.location.href = "order.html"

// })




document.getElementById("imageUpload").addEventListener("change", function (event) {
    const file = event.target.files[0]; // Yuklangan faylni oling
    const previewImage = document.getElementById("previewImage");

    if (file) {
        const reader = new FileReader(); // FileReader obyektini yarating

        // Faylni yuklash muvaffaqiyatli bo'lganda ishlatiladigan funksiya
        reader.onload = function (e) {
            previewImage.src = e.target.result; // Rasmni <img> tagiga qo'ying
            previewImage.style.display = "block"; // Img ko'rsatiladi
        };

        reader.readAsDataURL(file); // Faylni o'qib boshlash
    } else {
        previewImage.src = ""; // Agar hech narsa yuklanmagan bo'lsa, img-ni tozalang
        previewImage.style.display = "none"; // Imgni yashiring
    }
});




// btn
let editCotigory = document.querySelectorAll(".edit-cotigory")
let closeEdit = document.querySelector("#closeEdit")
let cotigoryEdit = document.querySelector("#cotigory-edit")

editCotigory.forEach(element => {

    element.addEventListener("click", (event) => {
        if (event.target.closest(".edit-cotigory")) {
            cotigoryEdit.style.display = "grid";
        }
    })
});
closeEdit.addEventListener("click", () => {
    cotigoryEdit.style.display = "none"
})




// map
function getCatigories() {
    // {
    //     "success": true,
    //     "error": false,
    //     "data": {
    //         "message": "Getting all categories successful.",
    //         "categories": [
    //             {
    //                 "_id": "673735a85cdf672f91c6b499",
    //                 "name": "Salad",
    //                 "meals": [],
    //                 "__v": 0
    //             }
    //         ]
    //     }
    // }
    const response = fetch('http://localhost:5050/category')
        .then(response => {
            return response.json();
        })
        .then(response => {
            if (response.success) {
                return createProduct(response.data.categories)
            }
        })
        .catch(err => {
            if (!response.success) {
                // Agar status muvaffaqiyatli bo'lmasa, xatoni qaytaramiz
                if (response.status === 403) {
                    // window.location.href = "logIn.html";
                    alert("403")
                }
                throw new Error(`Server Error: ${response.status}`);
            }
            console.error("Fetch Error:", err.message || err);
        }).finally(() => {

        })
}


const createProduct = function (array) {
    for (let i = 0; i < array.length; i++) {
        // Yangi mahsulot bloki yaratish
        let product = document.createElement("div");

        // Klasslarni qo'shish
        product.classList.add(
            "w-full",
            "gap-7",
            "h-40",
            "rounded-xl",
            "flex",
            "items-center",
            "p-4",
            "col-span-2",
            "bg-black"
        );

        // Dinamik tarkibni qo'shish
        product.innerHTML = `
          <div class="w-32 h-32 rounded-full overflow-hidden">
            <img class="w-full" src="" alt="Mahsulot rasm">
          </div>
          <div>
            <h1 class="text-white text-3xl">${array[i].name}</h1>
            <p class="text-[#777] text-xl">Maxsulotlar:</p>
          </div>
          <div class="flex gap-3 ml-[600px]">
            <div class="button bg-green-600 edit-cotigory">
              <div class="button-wrapper">
                <div class="text">Edit</div>
                <span class="icon"><i class="fa-solid fa-pen"></i></span>
              </div>
            </div>
          </div>
        `;

        // Yaratilgan mahsulotni konteynerga qo'shish
        productContainer.appendChild(product);
    }
}

// Dinamik ravishda massivni xaritalash
const ingredients = getCatigories(); // Bu funksiyani massivni qaytaradigan qilib ishlating


let productContainer = document.querySelector("#pruduct-container");


