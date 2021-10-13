/* // ---- construction lightbox Element HTML ------------------------------------------------------------
    buildDom(url) {
        const lightboxDom = document.createElement('div')
        lightboxDom.classList.add('lightbox')
        lightboxDom.innerHTML = `<button class="lightbox__close"><i class="fas fa-times"></i></button>
        <button class="lightbox__preview"><i class="fas fa-arrow-left"></i></button>
        <button class="lightbox__next"><i class="fas fa-arrow-right"></i></button>
        <div class="lightbox__container">
        <img src="${url}">
        </div>`
        return lightboxDom
    } */

const lightbox = document.querySelector("#lightbox")
const close = document.querySelector(".lightbox__close")
const preview = document.querySelector(".lightbox__preview")
const next = document.querySelector(".lightbox__next")
const imgListe = document.getElementById('liste')
const links = document.querySelectorAll(".liste a")
const image = lightbox.querySelector(".lightbox__container img")

//--------------------------------------------------------------------------------------//
//                       On ajoute l'écouteur clic sur les liens                        //
//--------------------------------------------------------------------------------------//
let index;

let openLightbox = function() {
    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        link.addEventListener("click", function(e) {
            e.preventDefault()
            // ---- On ajoute l'image du lien cliqué dans la lightbox --------------------------------
            image.src = this.href
            //definir index 
            let img = this.querySelector('img');
            index = img.dataset.index
            console.log(this.querySelector('img'));
            console.log(img);
            console.log(index);

            // ---- on affiche la lightbox -----------------------------------------------------------
            lightbox.classList.add("show")
        });
    }
    // ---- On active le bouton close --------------------------------------------------------
    closeLightbox()
    // ---- On active le bouton preview ------------------------------------------------------
    previewLightbox()
    // ---- On active le bouton next ------------------------------------------------------
    nextLightbox()
};


// ---- On ferme la lightbox lorsque qu'on click sur le bouton close ---------------------
let closeLightbox = function() {
    close.addEventListener("click", function(){
        // ---- On retire la fenêtre lightbox ----------------------------------------------------
        lightbox.classList.remove("show")
    })
};

let getImageUrl = function(index) {
    allMedia = document.querySelectorAll(".media")
    let media = allMedia[index];
    console.log(index)
    return media.querySelector("img").src;
}

// ---- On va à la photo précédente lorsqu'on click sur le bouton preview ----------------
let previewLightbox = function() {
    preview.addEventListener("click", function(){
        // ---- On affiche l'image précédente ----------------------------------------------------
        index -= 1
        imgTotal = document.querySelectorAll('.liste img')
        // si index < 0 
        if (index < 0) {
            // index = nombre image total
            index = imgTotal.length - 1
        }

            
        let imgUrl = getImageUrl(index)

        
        //Afficher l image précédente dans la lightbox
            //Cibler l'img du lightbox container
            //Changer la source de mon image par la source de mon image précédente
        image.src = imgUrl

    })
};
// ---- On va à la photo suivante lorsqu'on click sur le bouton next ---------------------
let nextLightbox = function() {
    next.addEventListener("click", function(){
        // ---- On affiche l'image suivante ----------------------------------------------------
        index ++
        imgTotal = document.querySelectorAll('.liste img')
        console.log(index)
        console.log(imgTotal)
        // si index > nombreTotal d'image
        if (index == imgTotal.length) {
            // index = 0
            index = 0
        }
        let imgSrc = getImageUrl(index)
        image.src = imgSrc
    })
};

// ---- On active la fonction d'écoute du click sur les photos ---------------------------
openLightbox();
