//APPELS DES ÉLÉMENTS DU  DOM
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
const baliseClassTag = document.getElementsByClassName('tag');
const baliseIdTag = document.getElementById("tag");

//APPEL DU JSON

fetch('assets/json/listeObjets.json')
.then(response => response.json())
.then(response => {
    console.log(response);
    profilsPhotographes(response.photographers)
});

//FONCTIONS D APPEL

function profilsPhotographes(photographers) {
//      Création variable type array vide pour regrouper les tags des photographes      //
    let allTags = [];
//      Sortir les photographes individuellement et renvoi la fonction d'insertion      //
    for (let i = 0; i < photographers.length; i++) {
        const photographe = photographers[i];
        insertionArticle = insertionArticlePhotographe(photographe);
        for (let j = 0; j < photographe.tags.length; j++) {
            const tag = photographe.tags[j];
            allTags.push(tag)
        }
    }
//  Boucle dans la variable, regroupe les éléments du tableau et supprime les doublons  //
    allTags = [...new Set(allTags)];
    console.log(allTags);
//      Renvoi vers la fonction d'insertion des tags dans la barre de naviguation       //
    navBarTags(allTags);
    selecTag();
}

//FONCTIONS DE TRAITEMENT

function navBarTags(tags) {
//                      Création balise div pour tags de la navBar                      //
    let insertionNavBar = document.createElement("div");
        insertionNavBar.id = "nav-bar";
        insertionNavBar.classList.add("nav-bar");
        for (let i = 0; i < tags.length; i++) {
        let tag = tags[i];
        insertionNavBar.innerHTML += `<a id="tag" class="tag ${tag}">${tag}</a>`;
    }
//                                Insertion de la balise                                //
    nav.appendChild(insertionNavBar);
};

function insertionArticlePhotographe(photographe) {
//                       Création balises article des photographes                       //
    let articleProfil = document.createElement("article");
    articleProfil.id = "cadre-profil";
    articleProfil.classList.add("cadre-profil");
    selectionPhotographes.appendChild(articleProfil);
//                       Création balises figure des photographes                       //
    let insertionFigure = document.createElement("figure");
    insertionFigure.id = "cadre-photographe";
    insertionFigure.classList.add("cadre-photographe");
    insertionFigure.innerHTML += `<a id="${photographe.id}" class="lien-profil" href=""></a>`;
//                       Création balises images des photographes                       //
    let insertionPhoto = document.createElement("img");
    insertionPhoto.classList.add("cadre-photo");
    src =  "assets/FishEye_Photos/Sample Photos/Photographers ID Photos/" + photographe.portrait;
    insertionPhoto.src = src;
//               Création balises titre des photographes  (ctrl+shift+p)                //
    let insertionH2 = document.createElement("h2");
    insertionH2.classList.add("nom-profil");
    insertionH2.innerHTML += photographe.name;
//                  Création balises div pour détails des photographes                  //
    let insertionFiche = document.createElement("div");
    insertionFiche.id = "cadre-fiche-photographe";
    insertionFiche.classList.add("cadre-fiche-photographe");
    insertionFiche.innerHTML += `<address class="ville-profil">${photographe.city + " " + photographe.country}</address>
    <p class="citation-profil">${photographe.tagline}</p>
    <p class="prix-profil">${photographe.price}€</p>`;
//                   Création balises div pour tags des photographes                    //
    let insertionTags = document.createElement("div");
    insertionTags.id = "cadre-tags-photographe";
    insertionTags.classList.add("cadre-tags-photographe");
    for (let j = 0; j < photographe.tags.length; j++) {
        const tag = photographe.tags[j];
        insertionTags.innerHTML += `<a id="tag" class="tag ${tag} tag-photographe">${tag}</a>`;
    }

//                          Insertion des différentes balises                           //
    articleProfil.appendChild(insertionFigure);
    insertionFigure.appendChild(insertionPhoto);
    articleProfil.appendChild(insertionH2);
    articleProfil.appendChild(insertionFiche);
    articleProfil.appendChild(insertionTags);
};

//FONCTION D'ÉCOUTE DES TAGS

function selecTag() {
//Lorsque je clique sur un tag ajoute la classe .focus
    for (let i = 0; i < baliseClassTag.length; i++) {
        const lien = baliseClassTag[i];
        lien.addEventListener("click", function(e) {
            e.preventDefault;
            this.classList.toggle("focus")
            let tagsFocus = document.querySelectorAll('a.tag.focus');
            let tagsPhotographe = document.querySelectorAll('a.tag-photographe');
            console.log(tagsFocus)
//Si .focus afficher que les articles du photographes en fonction du tag focus
        for (let j = 0; j < tagsPhotographe.length; j++) {
            const tagPhoto = tagsPhotographe[j];
            photographeTag(tagsFocus, tagPhoto)
            }
        }
    )}
};

function photographeTag(tagsFocus, tagPhoto) {
    if(tagPhoto.innerHTML != tagsFocus.innerHTML) {
        let article = tagPhoto.parentNode.parentNode
        article.classList.add('invisible');
    }
}
