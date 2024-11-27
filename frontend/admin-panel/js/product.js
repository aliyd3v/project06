

let home = document.querySelector("#home")
home.addEventListener("click" , () => {
    window.location.href = "index.html"
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
        <div style="margin-top:20px;" class="bg-main-bg flex items-center justify-around mt-6 w-full h-60 rounded-xl mx-auto sm:mr-0 group cursor-pointer lg:mx-auto  transition-all duration-500">
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
    // deletePopUpCloseBtn.addEventListener("click", closePopUp)
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



// create pruduct
const fileTempl = document.getElementById("file-template"),
imageTempl = document.getElementById("image-template"),
empty = document.getElementById("empty");

// use to store pre selected files
let FILES = {};

// check if file is of type image and prepend the initialied
// template to the target element
function addFile(target, file) {
const isImage = file.type.match("image.*"),
  objectURL = URL.createObjectURL(file);

const clone = isImage
  ? imageTempl.content.cloneNode(true)
  : fileTempl.content.cloneNode(true);

clone.querySelector("h1").textContent = file.name;
clone.querySelector("li").id = objectURL;
clone.querySelector(".delete").dataset.target = objectURL;
clone.querySelector(".size").textContent =
  file.size > 1024
    ? file.size > 1048576
      ? Math.round(file.size / 1048576) + "mb"
      : Math.round(file.size / 1024) + "kb"
    : file.size + "b";

isImage &&
  Object.assign(clone.querySelector("img"), {
    src: objectURL,
    alt: file.name
  });

empty.classList.add("hidden");
target.prepend(clone);

FILES[objectURL] = file;
}

const gallery = document.getElementById("gallery"),
overlay = document.getElementById("overlay");

// click the hidden input of type file if the visible button is clicked
// and capture the selected files
const hidden = document.getElementById("hidden-input");
document.getElementById("button").onclick = () => hidden.click();
hidden.onchange = (e) => {
for (const file of e.target.files) {
  addFile(gallery, file);
}
};

// use to check if a file is being dragged
const hasFiles = ({ dataTransfer: { types = [] } }) =>
types.indexOf("Files") > -1;

// use to drag dragenter and dragleave events.
// this is to know if the outermost parent is dragged over
// without issues due to drag events on its children
let counter = 0;

// reset counter and append file to gallery when file is dropped
function dropHandler(ev) {
ev.preventDefault();
for (const file of ev.dataTransfer.files) {
  addFile(gallery, file);
  overlay.classList.remove("draggedover");
  counter = 0;
}
}

// only react to actual files being dragged
function dragEnterHandler(e) {
e.preventDefault();
if (!hasFiles(e)) {
  return;
}
++counter && overlay.classList.add("draggedover");
}

function dragLeaveHandler(e) {
1 > --counter && overlay.classList.remove("draggedover");
}

function dragOverHandler(e) {
if (hasFiles(e)) {
  e.preventDefault();
}
}

// event delegation to caputre delete events
// fron the waste buckets in the file preview cards
gallery.onclick = ({ target }) => {
if (target.classList.contains("delete")) {
  const ou = target.dataset.target;
  document.getElementById(ou).remove(ou);
  gallery.children.length === 1 && empty.classList.remove("hidden");
  delete FILES[ou];
}
};

// print all selected files
document.getElementById("submit").onclick = () => {
alert(`Submitted Files:\n${JSON.stringify(FILES)}`);
console.log(FILES);
};

// clear entire selection
document.getElementById("cancel").onclick = () => {
while (gallery.children.length > 0) {
  gallery.lastChild.remove();
}
FILES = {};
empty.classList.remove("hidden");
gallery.append(empty);
};


// create change lan
let addBtn = document.getElementById("add-btn")
let censelBtn = document.getElementById("cancel-create")
let addDisplay = document.getElementById("add-display")


addBtn.addEventListener("click", ()=>{
  addDisplay.style.display="grid"
  
})

censelBtn.addEventListener("click", ()=>{
  addDisplay.style.display="none"
  
})


let uzCreate = document.getElementById("uz-create")
let ruCreate = document.getElementById("ru-create")
let uzLan = document.getElementById("uz-lan")
let ruLan = document.getElementById("ru-lan")
  



uzLan.addEventListener("click",()=>{
  ruCreate.style.display="none"
  uzCreate.style.display="block"
  uzLan.style.backgroundColor="#222"
  ruLan.style.backgroundColor="black"


})
ruLan.addEventListener("click",()=>{
   ruCreate.style.display="block"
  uzCreate.style.display="none"
   ruLan.style.backgroundColor="#222"
  uzLan.style.backgroundColor="black"
})





