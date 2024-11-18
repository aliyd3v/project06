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
    
    element.addEventListener("click", ()=>{
        cotigoryEdit.style.display="grid"
    })
});
closeEdit.addEventListener("click", ()=>{
    cotigoryEdit.style.display="none"
})