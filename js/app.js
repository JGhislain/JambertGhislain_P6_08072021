//Appels des éléments du DOM
const nav = document.getElementById('nav');
const navBar = document.getElementsByClassName('nav-bar'); 
const selectionPhotographes = document.getElementById('selection-photographes');
const cadreProfil = document.getElementsByClassName('cadre-profil');
const cadreProfilPhotographe = document.getElementById('cadre-profil');
const cadrePhotographe = document.getElementsByClassName('cadre-photographe');
const cadreLienPhotographe = document.getElementsByClassName('lien-profil');
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

function profilsPhotographes(photographers) {
    for (let i = 0; i < photographers.length; i++) {
        let photographe = photographers[i];
        insertionArticle = contenuArticle(photographe);
    }
    
    let allTags = [];
    for (let i = 0; i < photographers.length; i++) {
        let photographe = photographers[i];
        for (let j = 0; j < photographe.tags.length; j++) {
            const tag = photographe.tags[j];
            allTags.push(tag);
        }
    }
    allTags = [...new Set(allTags)];
    NavBarTags(allTags);

     let portraitsProfil = [];
    for (let i = 0; i < photographers.length; i++) {
        let photographe = photographers[i];
        let portrait = photographe.portrait;
        portraitsProfil.push(portrait);
    }
    console.log(portraitsProfil);
    photosProfilIndex(portraitsProfil); 

    let identifiantsProfil = [];
    for (let i = 0; i < photographers.length; i++) {
        const photographe = photographers[i];
        const id = photographe.id;
        identifiantsProfil.push(id);
    }
    console.log(identifiantsProfil);
    insertionIdentifiantProfil(identifiantsProfil);

    let tagsProfil = [];
    for (let i = 0; i < photographers.length; i++) {
        const photographe = photographers[i];
        const soloTag = photographe.tags;
        tagsProfil.push(soloTag);
    }
    console.log(tagsProfil);
    insertionTagsProfil(tagsProfil);
};


function NavBarTags(tags) {
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
    <a class="lien-profil" href="">
    
    </a>
    </figure>
    <h2 class="nom-profil">${photographe.name}</h2>
    <div id="cadre-fiche-photographe" class="cadre-fiche-photographe">
    <address class="ville-profil">${photographe.city + " " + photographe.country}</address>
    <p class="citation-profil">${photographe.tagline}</p>
    <p class="prix-profil">${photographe.price}€</p>
    </div>
    `;
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
        imageProfil.classList.add("cadre-profil");
        imagePhotographe.push(imageProfil);
        imageProfil.src = src;
        cadre.appendChild(imageProfil);
        console.log(imagePhotographe);
        console.log(cadrePhotographe);
        console.log(imageProfil);
        console.log(cadre);
    }
};

/* function photosProfilIndex(portraits) {
    let imagePhotographe = [];
    let cadrePhotographe = [];
    let imageProfil;
    for (let i = 0; i < portraits.length; i++) {
        let portrait = portraits[i];
        src =  "assets/FishEye_Photos/Sample Photos/Photographers ID Photos/" + portrait;
        console.log(src);
        let imageProfil = document.createElement("img");
        imageProfil.classList.add("cadre-profil");
        imageProfil.src = src;
        imagePhotographe.push(imageProfil);
        for (let i = 0; i < cadreLienPhotographe.length; i++) {
            const cadre = cadreLienPhotographe[i];
            cadrePhotographe.push(cadre);
            cadre.appendChild(imageProfil);
        }
    }
    console.log(imagePhotographe);
    console.log(cadrePhotographe);
}; */

function insertionIdentifiantProfil(idProfil) {
    cadreLienPhotographe[0].id = idProfil[0];
    cadreLienPhotographe[1].id = idProfil[1];
    cadreLienPhotographe[2].id = idProfil[2];
    cadreLienPhotographe[3].id = idProfil[3];
    cadreLienPhotographe[4].id = idProfil[4];
    cadreLienPhotographe[5].id = idProfil[5];
};

function insertionTagsProfil(tags) {
    let tagPerso = [];

    for (let i = 0; i < cadreProfil.length; i+=2) {
        const encart = cadreProfil[i];
        let insertionTags = document.createElement("div");
        insertionTags.id = "cadre-tags-photographe";
        insertionTags.classList.add("cadre-tags-photographe");
        for (let j = 0; j < tags.length; j++) {
            const tag = tags[j];
            insertionTags.innerHTML += `<a class="tag">${tag}</a>`
        }        
        encart.appendChild(insertionTags);
        console.log(encart);
    }
};


/* function photosProfilIndex(portraits) {
    let imagePhotographe = [];
    for (let i = 0; i < portraits.length; i++) {
        let portrait = portraits[i];
        src =  "assets/FishEye_Photos/Sample Photos/Photographers ID Photos/" + portrait;
        console.log(src);
        let imageProfil = document.createElement("img");
        imageProfil.classList.add("cadre-profil");
        imageProfil.src = src;
        imagePhotographe.push(imageProfil);
    }
    console.log(imagePhotographe);
    afficherPhotographe(imagePhotographe);
    function afficherPhotographe(imagePhotographe) {
        let allCadre = [];
        for (let i = 0; i < cadreLienPhotographe.length; i++) {
            const cadre = cadreLienPhotographe[i];
            allCadre.push(cadre);
            console.log(cadre)
        }
        allCadre.innerHTML += imagePhotographe;
    }
}; */







/*
cadreTagsPhotographe[5].appendChild(tagTravel.cloneNode([true]));
cadreTagsPhotographe[5].appendChild(tagArchitecture.cloneNode([true]));
 */
//var photographes = JSON.parse("/assets/json/listeObjets.json");

//console.log(photographes);

/* Dois je créer des classes objets et des constructors ?

class photographers {
    constructor(name, id, city, country, tags,tagline, price, portrait) {
        this.name = name;
        this.id = id;
        this.city = city;
        this.country = country;
        this.tags = tags;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
    }
    attributionPhotoCreateur() {
        portrait = this.portrait + (url local photo)
        console.log(portrait)
    }
};

var photographes = new photographers("Mimi Keel", 243, "London", "UK", ["portrait", "events", "travel", "animals"], "Voir le beau dans le quotidien", 400, "MimiKeel.jpg");

etc..

*/
//définir photographes sur DOM

//Ecoute du clic et renvoi vers la page perso du photographes

//Défilement de la page et affichage du bouton retour

//Ecoute du clic et retour haut de page