//Appels des éléments du DOM
const nav = document.getElementById('nav');
const navBar = document.getElementsByClassName('nav-bar'); 
const selectionPhotographes = document.getElementById('selection-photographes');
const cadreProfil = document.getElementsByClassName('cadre-profil');
const cadreProfilPhotographe = document.getElementById('cadre-profil');
const cadrePhotographe = document.getElementsByClassName('cadre-photographe');
const cadreLienPhotographe = document.getElementsByClassName('lien-profil');
const cadreIdLienPhotographe = document.getElementById('lien-profil');
const cadreImagePhotographe = document.getElementsByClassName('photo-profil');
const cadreFichePhotographe = document.getElementsByClassName('cadre-fiche-photographe');
const cadreTagsPhotographe = document.getElementsByClassName('cadre-tags-photographe');
const typeTagsPhotographe = document.getElementsByClassName('tag');

//appel du JSON

fetch('assets/json/listeObjets.json')
.then(response => response.json())
.then(response => {
    console.log(response);
    profilsPhotographes(response.photographers)
});

//fonction d'appel

function profilsPhotographes(photographers) {
    let allTags = [];
    let portraitsProfil = [];
    let identifiantsProfil = [];
    let tagsProfil = [];
    let photographes = [];
    for (let i = 0; i < photographers.length; i++) {
        const photographe = photographers[i];
        const portrait = photographe.portrait;
        const idPhotographe = photographe.id;
        const soloTag = photographe.tags;
        photographes.push(photographe);
        portraitsProfil.push(portrait);
        identifiantsProfil.push(idPhotographe);
        tagsProfil.push(soloTag);
        insertionArticle = contenuArticle(photographe);
        for (let j = 0; j < photographe.tags.length; j++) {
            const tag = photographe.tags[j];
            allTags.push(tag)
        }
    }
    allTags = [...new Set(allTags)];
    console.log(allTags);
    console.log(portraitsProfil);
    console.log(identifiantsProfil);
    console.log(tagsProfil);
    navBarTags(allTags);
    photosProfilIndex(portraitsProfil);
    insertionTagsProfil(tagsProfil, photographes);
}

//fonction de traitement

function navBarTags(tags) {
    let insertionNavBar = document.createElement("div");
        insertionNavBar.id = "nav-bar";
        insertionNavBar.classList.add("nav-bar");
        for (let i = 0; i < tags.length; i++) {
        let tag = tags[i];
        insertionNavBar.innerHTML += `<a class="tag">${tag}</a>`;
    }
    nav.appendChild(insertionNavBar);
};

function contenuArticle(photographe) {
    let articleProfil = document.createElement("article");
    articleProfil.id = "cadre-profil";
    articleProfil.classList.add("cadre-profil");
    articleProfil.innerHTML = `<figure id="cadre-photographe" class"cadre-photographe">
    <a id="lien-profil" class="lien-profil" href="">
    </a>
    </figure>
    <h2 class="nom-profil">${photographe.name}</h2>
    <div id="cadre-fiche-photographe" class="cadre-fiche-photographe">
    <address class="ville-profil">${photographe.city + " " + photographe.country}</address>
    <p class="citation-profil">${photographe.tagline}</p>
    <p class="prix-profil">${photographe.price}€</p>
    </div>`;
    selectionPhotographes.appendChild(articleProfil);
};

function photosProfilIndex(portraits) {
    let imagePhotographe = [];
    let cadrePhotographe = [];
    let imageProfil;
    let cadre;
    let sources = [];
    for (let i = 0; i < portraits.length; i++) {
        let portrait = portraits[i];
        src =  "assets/FishEye_Photos/Sample Photos/Photographers ID Photos/" + portrait;
        sources.push(src);
        console.log(src);
    }
    for (let i = 0; i < cadreLienPhotographe.length; i++) {
        cadre = cadreLienPhotographe[i];
        cadrePhotographe.push(cadre);
        imageProfil = document.createElement("img");
        imageProfil.classList.add("cadre-photo");
        imagePhotographe.push(imageProfil);
        imageProfil.src = src;
        cadre.appendChild(imageProfil);
        console.log(imagePhotographe);
        console.log(cadrePhotographe);
        console.log(imageProfil);
        console.log(cadre);
    }
};
function insertionTagsProfil(tags, photographes) {
    for (let i = 0; i < cadreProfil.length; i++) {
        const encart = cadreProfil[i];
        let insertionTags = document.createElement("div");
        insertionTags.id = "cadre-tags-photographe";
        insertionTags.classList.add("cadre-tags-photographe");
        for (let j = 0; j < tags.length; j++) {
            const tag = tags[j];
            insertionTags.innerHTML += `<a class="tag">${tag}</a>`;
        }
        encart.appendChild(insertionTags);
        console.log(encart);
    }
};