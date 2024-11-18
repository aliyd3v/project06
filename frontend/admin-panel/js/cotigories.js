document.addEventListener("DOMContentLoaded", function () {
    // Ma'lumotlar ro'yxati
    const data = Array.from({ length: 15 }, (_, i) => ({
        title: `Face Cream ${i + 1}`,
        price: `$${100 + i}`,
        description: `Lorem ipsum dolor sit amet ${i + 1}`,
        image: "https://pagedone.io/asset/uploads/1700726158.png",
    }));

    const itemsPerPage = 5;
    const dataContainer = document.getElementById("data-container");
    const paginationContainer = document.getElementById("pagination");

    // Sahifadagi ma'lumotlarni ko'rsatish
    function displayItems(page = 1) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsToShow = data.slice(startIndex, endIndex);

        dataContainer.innerHTML = itemsToShow
            .map(
                (item) => `
        <div style="margin-top:20px;" class=" flex items-center justify-around mt-6 w-full h-60 rounded-xl mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-main-bg transition-all duration-500">
          <div class="rounded-xl">
            <img src="${item.image}" alt="face cream image" class="w-full h-52 aspect-square object-cover">
          </div>
          <div class="w-[70%] h-52">
            <div class="flex items-center justify-between">
              <h6 class="font-semibold text-xl leading-8 text-white transition-all duration-500 group-hover:text-indigo-600">
                ${item.title}
              </h6>
              <h6 class="font-semibold text-xl leading-8 text-indigo-600">
                ${item.price}
              </h6>
            </div>
            <div class="mt-3">
              <ul class="list-none overflow-scroll h-32 w-[300px]">
                <li class="mt-2 font-normal text-sm leading-6 text-gray-500">${item.description}</li>
              </ul>
            </div>
            <div class="flex gap-3 ml-[600px]">
              <div class="button bg-green-600">
                <div class="button-wrapper">
                  <div class="text">Edit</div>
                  <span class="icon"><i class="fa-solid fa-pen"></i></span>
                </div>
              </div>
              <div class="button bg-red-600 open-del-pop">
                <div class="button-wrapper">
                  <div class="text">Del</div>
                  <span class="icon"><i class="fa-solid fa-trash"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
            )
            .join("");

        // "Delete popup" tugmachalariga event listener qo'shish
        const openDelButtons = document.querySelectorAll(".open-del-pop");
        const deletePopUp = document.querySelector("#del-popup");
        const deletePopUpCloseBtn = document.querySelector("#del-popup");
        const deleteCancelBtn = document.querySelector("#del-canceling");
        const delPruduct = document.querySelector("#del-pruduct")
        const closePop = document.querySelector("#close-del-popup");

    deleteCancelBtn.addEventListener("click", closePopUp)
    deletePopUpCloseBtn.addEventListener("click", closePopUp)
    closePop.addEventListener("click", closePopUp)
    delPruduct.addEventListener("click", closePopUp)





            function closePopUp () {
                deletePopUp.style.display="none"
            }

        openDelButtons.forEach((button) => {
            button.addEventListener("click", () => {
                console.log("Delete button clicked");
                deletePopUp.style.display = "grid"
            });
        });
    }

    // Sahifalashni sozlash
    function setupPagination(totalItems, itemsPerPage) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        paginationContainer.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement("li");
            pageItem.textContent = i;
            pageItem.classList.add("page-item");
            if (i === 1) pageItem.classList.add("active");

            pageItem.addEventListener("click", () => {
                document.querySelector(".pagination .active")?.classList.remove("active");
                pageItem.classList.add("active");
                displayItems(i);
            });

            paginationContainer.appendChild(pageItem);
        }
    }

    // Sahifalash komponentini joylashtirish
    paginationContainer.classList.add("pagination", "flex", "list-none");
    displayItems();
    setupPagination(data.length, itemsPerPage);
});
