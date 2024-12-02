// Navigatsiya tugmalari uchun hodisalar
document.querySelector("#home").addEventListener("click", () => {
    window.location.href = "index.html";
});

document.querySelector("#products").addEventListener("click", () => {
    window.location.href = "product.html";
});

document.querySelector("#history").addEventListener("click", () => {
    window.location.href = "history.html";
});

document.querySelector("#order").addEventListener("click", () => {
    window.location.href = "order.html";
});

// Kategoriya qo'shish modal oynasi
const addCategoryModal = document.querySelector("#cotigory-add");
const categoryAddBtn = document.querySelector(".catygoryAddBtn");
const closeAddBtn = document.querySelector("#closeAdd");

categoryAddBtn.addEventListener("click", () => {
    addCategoryModal.style.display = "grid";
});

closeAddBtn.addEventListener("click", () => {
    addCategoryModal.style.display = "none";
});

// O'chirish modal oynasini sozlash
// function initializeDeleteButtons() {
//     const deleteButtons = document.querySelectorAll(".del-cotigory");
//     const deleteModal = document.querySelector("#cotigory-del");
//     const cancelDeleteBtn = document.querySelector("#del-canceling");
//     const confirmDeleteBtn = document.querySelector("#del-product");

//     deleteButtons.forEach((button) => {
//         button.addEventListener("click", function () {
//             deleteModal.style.display = "grid";
//             const parentElement = this.closest(".w-full");
//             const id = parentElement?.getAttribute("data-id");

//             // Tasdiqlash tugmasi uchun handler
//             confirmDeleteBtn.addEventListener("click",()=>{
//                 deleteCategory(id);
//                 deleteModal.style.display = "none";
//             })
//         });
//     });

//     // Bekor qilish tugmasi uchun handler
//     cancelDeleteBtn.addEventListener("click", () => {
//         deleteModal.style.display = "none";
//     });
// }
    

// API orqali kategoriya o'chirish
function deleteCategory(id) {
    fetch(`http://192.168.0.118:5050/category/${id}/delete`, {
        method: "POST",
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.success) {
                alert("Element muvaffaqiyatli o'chirildi!");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                alert("Xatolik: " + response.error.message);
            }
        })
        .catch((error) => {
            alert("Xatolik: " + error.message);
        });
}

// Kategoriyalarni yaratish funksiyasi
function createProduct(array) {
    const productContainer = document.querySelector("#pruduct-container");
    const categoryCount = document.querySelector("#cotygory-length");

    categoryCount.textContent = array.length;

    array.forEach((item) => {
        const product = document.createElement("div");
        product.classList.add(
            "w-full",
            "gap-7",
            "rounded-xl",
            "flex",
            "items-center",
            "p-4",
            "col-span-2",
            "bg-black",
            "justify-between"
        );
        product.setAttribute("data-id", item._id);

        product.innerHTML = `
            <div class="flex items-center">
                <div class="w-32 h-32 rounded-full overflow-hidden">
                    <img class="w-full" src="" alt="Mahsulot rasm">
                </div>
                <div class="w-[300px]">
                    <h1 class="text-white text-3xl ">${item.name}</h1>
                    <p class="text-[#999] text-xl">Maxsulotlar: ${item.meals.length}</p>
                </div>
            </div>
            <div class="flex gap-3">
                <div class="button bg-green-600 edit-cotigory">
                    <div class="button-wrapper">
                        <div class="text">Edit</div>
                        <span class="icon"><i class="fa-solid fa-pen"></i></span>
                    </div>
                </div>
                <div class="button bg-red-600 del-cotigory">
                    <div class="button-wrapper">
                        <div class="text">Del</div>
                        <span class="icon"><i class="fa-solid fa-trash"></i></span>
                    </div>
                </div>
            </div>
        `;

        productContainer.appendChild(product);
    });

    // initializeDeleteButtons();
    initializeEditButtons();
}

// API orqali kategoriyalarni olish
function getCategories() {
    fetch("http://192.168.0.118:5050/category")
        .then((response) => response.json())
        .then((response) => {
            if (response.success) {
                createProduct(response.data.categories);
            }
        })
        .catch((error) => {
            console.error("Fetch Error:", error.message);
        });
}

// Kategoriya qo'shish
document.querySelector("#confirmAdd").addEventListener("click", () => {
    const formElement = document.querySelector("#formData");
    const formData = new FormData(formElement);

    fetch("http://192.168.0.118:5050/category/create", {
        method: "POST",
        body: formData,
        
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.success) {
                alert("Category successfully created!");
                createProduct(response.data.categories);
            } else {
                alert("Error: " + response.error.message);
            }
        })
        .catch((error) => {
            alert("Fetch Error: " + error.message);
        });
});

// Rasmni yuklash va oldindan ko'rish
// document.querySelector("#imageUpload").addEventListener("change", (event) => {
//     const file = event.target.files[0];
//     const previewImage = document.querySelector("#previewImage");

//     if (file) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             previewImage.src = e.target.result;
//             previewImage.style.display = "block";
//         };
//         reader.readAsDataURL(file);
//     } else {
//         previewImage.src = "";
//         previewImage.style.display = "none";
//     }
// });

// Edit tugmalar uchun hodisalar
function initializeEditButtons() {
    const editButtons = document.querySelectorAll(".edit-cotigory");
    const editModal = document.querySelector(".cotigory-edit");
    const closeEditBtn = document.querySelector("#closeEdit");

    editButtons.forEach((button) => {
        button.addEventListener("click", () => {
            editModal.style.display = "grid";
        });
    });

    closeEditBtn.addEventListener("click", () => {
        editModal.style.display = "none";
    });
}

// Sahifani boshlang'ich sozlash
getCategories();
