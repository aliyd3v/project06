let home = document.querySelector("#home");
home.addEventListener("click", () => {
    window.location.href = "index.html"; // To'g'irlandi
});

let products = document.querySelector("#products");
products.addEventListener("click", () => {
    window.location.href = "product.html";
});

let categories = document.querySelector("#categories"); // "cotigories" noto'g'ri yozilgan edi
categories.addEventListener("click", () => {
    window.location.href = "categories.html"; // Fayl nomi ham "cotigories" emas, "categories" deb faraz qilindi
});

let history = document.querySelector("#history");
history.addEventListener("click", () => {
    window.location.href = "history.html";
});

let order = document.querySelector("#order");
order.addEventListener("click", () => {
    window.location.href = "order.html";
});

let addCotigory = document.querySelector("#cotigory-add")
let catygoryAddBtn = document.querySelector(".catygoryAddBtn")
let closeAdd = document.querySelector("#closeAdd");

catygoryAddBtn.addEventListener("click", () => {
    addCotigory.style.display = "grid"
})
closeAdd.addEventListener("click", () => {
    addCotigory.style.display = "none"; // Elementni yashirish
});












function initializeDeleteButtons() {
    let delCotigoryBtn = document.querySelectorAll(".del-cotigory");
    let cotigoryDel = document.querySelector("#cotigory-del");
    let delCanceling = document.querySelector("#del-canceling");
    let confirmDel = document.querySelector("#del-pruduct"); // Confirm tugmasi

    // Har bir delete tugmasiga klik hodisasini biriktirish
    delCotigoryBtn.forEach((element) => {
        element.addEventListener("click", function () {
            cotigoryDel.style.display = "grid"; // Bir xil elementni ko'rsatish

            // `this` orqali tegishli elementni olish
            let parentProduct = this.closest(".w-full"); // "product" elementini topish
            if (parentProduct) {
                let id = parentProduct.getAttribute("data-id"); // "data-id" atributini olish


                // Confirm tugmasi bosilganda tasdiqlash funksiyasini chaqirish
                confirmDel.onclick = () => ConfirmFunk(id); // ConfirmFunk'ni ID bilan chaqirish
            } else {
                console.error("Parent product not found!");
            }
        });
    });

    // Cancel tugmasini ishlatish
    delCanceling.addEventListener("click", () => {
        cotigoryDel.style.display = "none"; // Elementni yashirish
    });
}

// Delete'ni tasdiqlovchi funksiya
function ConfirmFunk(id) {
    fetch(`http://192.168.0.118:5050/category/${id}/delete`, {
        method: "POST",
    })
        .then(response => response.json())
        .then(response => {
            if (response.success) {

                window.location.href = "cotigories.html";
            } else {
                alert("Delete failed: " + response.error.message);
            }
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
}

// Tugmalarni sozlash
initializeDeleteButtons();




// Dinamik ravishda yaratilgan tugmachalar uchun ishlaydi
function createProduct(array) {
    let productContainer = document.querySelector("#pruduct-container");
    let cotygoryLength = document.querySelector("#cotygory-length")
    cotygoryLength.textContent = array.length

    array.forEach((item) => {
        // Yangi mahsulot blokini yaratish
        let product = document.createElement("div");

        // Klasslarni qo'shish
        product.classList.add(
            "w-full",
            "gap-7",
            "rounded-xl",
            "flex",
            "items-center",
            "p-4",
            "col-span-2",
            "bg-black",
            'justify-between',
        );
        product.setAttribute("data-id", item._id);

        // Dinamik tarkibni qo'shish
        product.innerHTML = `
                      
                <div class="flex items-center">
                        <div class="w-32 h-32 rounded-full overflow-hidden">
                            <img class="w-full" src="" alt="Mahsulot rasm">
                        </div>


                        <div class="w-[300px]">
                            <h1 class="text-white text-3xl ">${item.name} </h1>
                            <p class="elementId">${item._id}</p>
                            <p class="text-[#999] text-xl">Maxsulotlar: ${item.meals.length}</p>
                        </div>


                    </div>

                    <div class="flex gap-3 ">
                        <div class="button bg-green-600 edit-cotigory">
                            <div class="button-wrapper">
                                <div class="text">Edit</div>
                                <span class="icon"><i class="fa-solid fa-pen"></i></span>
                            </div>
                        </div>
                        <div class="button bg-red-600 del-cotigory">
                            <div class="button-wrapper ">
                                <div class="text">Del</div>
                                <span class="icon"><i class="fa-solid fa-trash"></i></span>
                            </div>
                        </div>
                    </div>
        ;
    `;

        // Elementni konteynerga qo'shish
        productContainer.appendChild(product);
    });

    // Har safar yangi tugmalar yaratilgandan keyin ularni sozlash
    initializeDeleteButtons();
    initializeEditButtons();
    // Bu funksiyani kerakli joyda chaqirishingiz mumkin
}

// API orqali kategoriya ma'lumotlarini olish
function getCatigories() {
    fetch("http://192.168.0.118:5050/category")
        .then((response) => response.json())
        .then((response) => {
            if (response.success) {
                createProduct(response.data.categories);
            }
        })
        .catch((err) => {
            console.error("Fetch Error:", err.message || err);
        });

}

// Boshlanishda API chaqirish
getCatigories();


let confirmAdd = document.querySelector("#confirmAdd")
let formElement = document.querySelector("#formData");

confirmAdd.addEventListener("click", () => {
    // Form elementidan FormData obyektini yarating
    const formData = new FormData(formElement);

    fetch("http://192.168.0.118:5050/category/create", {
        method: "POST",
        body: formData, // FormData obyektini yuborish
    })
    .then((response) => response.json())
    .then((response) => {
        if (response.success) {
            alert("Category successfully created!");
            createProduct(response.data.categories); // Yangi kategoriya qo'shish
        } else {
            console.error("Error:", response.error.message);
            alert("Error: " + response.error.message);
        }
    })
    .catch((err) => {
        console.error("Fetch Error:", err.message || err);
        alert("Fetch Error: " + err.message);
    });
});



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



// Barcha edit tugmachalar uchun hodisani sozlash
function initializeEditButtons() {
    let editBtnCotigory = document.querySelectorAll(".edit-cotigory");
    let cotigoryEdit = document.querySelector(".cotigory-edit");
    let closeEdit = document.querySelector("#closeEdit");

    // Har bir tugmaga klik hodisasini biriktirish
    editBtnCotigory.forEach((element) => {
        element.addEventListener("click", () => {
            cotigoryEdit.style.display = "grid"; // Bir xil elementni ko'rsatish
        });
    });
    // Close tugmasini ishlatish
    if (closeEdit) {
        closeEdit.addEventListener("click", () => {
            cotigoryEdit.style.display = "none"; // Elementni yashirish
        });
    }


}



















