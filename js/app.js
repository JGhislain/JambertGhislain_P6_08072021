//--------------------------------------------------------------------------------------//
//                             APPELS DES ÉLÉMENTS DU  DOM                              //
//--------------------------------------------------------------------------------------//

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

let tagsPhotoProfil = []
let tagsNavBar = [];
let listePhotographes

//--------------------------------------------------------------------------------------//
//                                    APPEL DU JSON                                     //
//--------------------------------------------------------------------------------------//

fetch('assets/json/listeObjets.json')
.then(response => response.json())
.then(response => {
    
    profilsPhotographes(response.photographers)
    allTagsPhotographes(response.photographers)
    allPhotographers = response.photographers;
});

//--------------------------------------------------------------------------------------//
//                                  FONCTIONS D APPEL                                   //
//--------------------------------------------------------------------------------------//


function profilsPhotographes(photographers) {
//      Sortir les photographes individuellement et renvoi la fonction d'insertion      //
    for (let i = 0; i < photographers.length; i++) {
        const photographe = photographers[i];
        insertionArticlePhotographe(photographe);
    }
    console.log(photographers)
    listePhotographes = photographers
}

function allTagsPhotographes(photographers) {
    //      Création variable type array vide pour regrouper les tags des photographes      //
        let allTags = [];
    //      Sortir les photographes individuellement et renvoi la fonction d'insertion      //
        for (let i = 0; i < photographers.length; i++) {
            const photographe = photographers[i];
            for (let j = 0; j < photographe.tags.length; j++) {
                const tag = photographe.tags[j];
                allTags.push(tag)
            }
        }
    //  Boucle dans la variable, regroupe les éléments du tableau et supprime les doublons  //
        allTags = [...new Set(allTags)];
        
    //      Renvoi vers la fonction d'insertion des tags dans la barre de naviguation       //
        navBarTags(allTags);
        TagsSelection(tagsPhotoProfil, allTags);
        tagStorage()
    }

//--------------------------------------------------------------------------------------//
//                               FONCTIONS DE TRAITEMENT                                //
//--------------------------------------------------------------------------------------//


function navBarTags(tags) {
//                      Création balise div pour tags de la navBar                      //
    let insertionNavBar = document.createElement("div");
        insertionNavBar.id = "nav-bar";
        insertionNavBar.classList.add("nav-bar");
        insertionNavBar.setAttribute("role", "naviguation")
        insertionNavBar.setAttribute('tabindex', '-1')
        insertionNavBar.setAttribute('aria-labelledby', 'nav')
        for (let i = 0; i < tags.length; i++) {
        let tag = tags[i];
        insertionNavBar.innerHTML += `<a role='naviguation' id=${tag} href="" class="tag nav-tag">${tag}</a>`;
    }
    tagsNavBar.push(insertionNavBar.childNodes)
//                                Insertion de la balise                                //
    nav.appendChild(insertionNavBar);
};

function insertionArticlePhotographe(photographe) {
//                       Création balises article des photographes                       //
    let articleProfil = document.createElement("article");
    articleProfil.id = photographe.name;
    articleProfil.setAttribute('tabindex', '-1')
    articleProfil.classList.add("cadre-profil");
    selectionPhotographes.appendChild(articleProfil);
//                       Création balises figure des photographes                       //

    let insertionFigure = document.createElement("a");
    insertionFigure.id = photographe.id;
    insertionFigure.classList.add("lien-profil");
    insertionFigure.setAttribute('aria-label', articleProfil.id)
    insertionFigure.href = `html/photographe.html?id=${photographe.id}`
    insertionFigure.innerHTML += `<figure id="cadre-photographe" class="cadre-photographe"></figure>`;

//                       Création balises images des photographes                       //
    let insertionPhoto = document.createElement("img");
    insertionPhoto.classList.add("cadre-photo");
    src =  "assets/FishEye_Photos/Sample Photos/Photographers ID Photos/" + photographe.portrait;
    insertionPhoto.src = src;
//               Création balises titre des photographes  (ctrl+shift+p)                //
    let insertionH2 = document.createElement("h2");
    insertionH2.classList.add("nom-profil");
    insertionH2.setAttribute('aria-controls', articleProfil)
    insertionH2.setAttribute('tabindex', '-1')
    insertionH2.innerHTML += photographe.name;
//                  Création balises div pour détails des photographes                  //
    let insertionFiche = document.createElement("div");
    insertionFiche.id = "cadre-fiche-photographe";
    insertionFiche.setAttribute('aria-controls', articleProfil)
    insertionFiche.setAttribute('tabindex', '-1')
    insertionFiche.classList.add("cadre-fiche-photographe");
    insertionFiche.innerHTML += `<address aria-controls=${insertionFiche} tabindex='0' class="ville-profil">${photographe.city + " " + photographe.country}</address>
    <p aria-controls=${insertionFiche} tabindex='0' class="citation-profil">${photographe.tagline}</p>
    <p aria-controls=${insertionFiche} tabindex='0' class="prix-profil">${photographe.price}€</p>`;
//                   Création balises div pour tags des photographes                    //
    let insertionTags = document.createElement("div");
    insertionTags.id = "cadre-tags-photographe";
    insertionTags.classList.add("cadre-tags-photographe");
    insertionTags.setAttribute('role', 'naviguation')
    insertionTags.setAttribute('aria-controls', articleProfil)
    for (let j = 0; j < photographe.tags.length; j++) {
        const tag = photographe.tags[j];
        insertionTags.innerHTML += `<a id="tag" href="" class="tag ${tag} tag-photographe">${tag}</a>`;
    }
    tagsPhotoProfil.push(insertionTags.childNodes)

//                          Insertion des différentes balises                           //
    articleProfil.appendChild(insertionFigure);
    insertionFigure.appendChild(insertionPhoto);
    articleProfil.appendChild(insertionH2);
    articleProfil.appendChild(insertionFiche);
    articleProfil.appendChild(insertionTags);
};

//--------------------------------------------------------------------------------------//
//                              FONCTION D'ÉCOUTE DES TAGS                              //
//--------------------------------------------------------------------------------------//


function TagsSelection(tagsPhotoProfil, allTags) {
    
    for (let i = 0; i < baliseClassTag.length; i++) {
        const lien = baliseClassTag[i];
        //Lorsque je clique sur un tag ajoute la classe .focus
        lien.addEventListener("click", function(e) {
            e.preventDefault;
            this.classList.toggle("focus")
            let tag = e.currentTarget.id
            if (this.classList.contains('focus')) {
                    const filterPhotographers = allPhotographers.filter(ph => {
                        return ph.tags.includes(tag)
                })
                console.log(filterPhotographers)
                document.getElementById("selection-photographes").innerHTML = ""
                profilsPhotographes(filterPhotographers)
            }
            else {
                document.getElementById("selection-photographes").innerHTML = ""
                profilsPhotographes(allPhotographers)
            }
        }
    )}
};

//--------------------------------------------------------------------------------------//
//           Fonction de tags si activé sur la page de profil du photographe            //
//--------------------------------------------------------------------------------------//


function tagStorage() {
    console.log(listePhotographes)
    let tagStorage =sessionStorage.getItem("tag")
    console.log(tagStorage)
    if (tagStorage != null) {
        const filterStorage = listePhotographes.filter(ph => {
            return ph.tags.includes(tagStorage)
        })
        for (let i = 0; i < baliseClassTag.length; i++) {
            const lien = baliseClassTag[i];
            console.log(lien.id)
            if (lien.id == tagStorage) {
                lien.classList.toggle('focus')
            }
        }
        document.getElementById("selection-photographes").innerHTML = ""
        profilsPhotographes(filterStorage)
        sessionStorage.clear()
        }
}


//--------------------------------------------------------------------------------------//
//                             FONCTION D'ECOUTE DU SCROLL                              //
//--------------------------------------------------------------------------------------//

//                      fonction de la valeur du scroll de la page                      //
let scrollYPage =  function() {
    return window.scrollY
}
let retourIndex = document.querySelector('#retour-index')
let rectangleIndex = retourIndex.getBoundingClientRect()
// ---- Obtenir la largeur de l'élément retour-index par défaut --------------------------
let widthIndex = rectangleIndex.width
// ---- Obtenir la position de l'élément par rapport à la hauteur de la fenêtre ----------
let topPage = rectangleIndex.top + scrollYPage()
// ---- Creation d'une fausse balise pour ne pas casser la structure de la page ----------
let fauxRectangle = document.createElement('div')
fauxRectangle.style.width = widthIndex + 'px'
fauxRectangle.style.height = rectangleIndex.height + 'px'
//       Fonction onScroll qui permet l affichage fixe ou non de l'élément retour       //
// ---- Lorsque l'on scroll --------------------------------------------------------------
let onScroll = function () {
    // ---- detection de la class 'fixe' -----------------------------------------------------
    let hasScrollClass = retourIndex.classList.contains('fixe')
    // ---- si le menu sort de l'écran et qu'il n'a pas la class 'fixe' ----------------------
    if (scrollYPage() > topPage && !hasScrollClass) {
        // ---- alors il devient fixe ------------------------------------------------------------
        retourIndex.classList.remove('retour-index')
        retourIndex.classList.add('fixe')
        retourIndex.getElementsByClassName.width = widthIndex + 'px'
        retourIndex.parentNode.insertBefore(fauxRectangle, retourIndex)
        // ---- sinon il revient à sa place ------------------------------------------------------
    } else if (scrollYPage() < topPage && hasScrollClass) {
        retourIndex.classList.remove('fixe')
        retourIndex.classList.add('retour-index')
        retourIndex.parentNode.removeChild(fauxRectangle)
    }
}
// Fonction onResize permet l'ajust du contenu en fonction de la largeur de la fenêtre  //
let onResize = function() {
    // ---- Deconstruction de ce qui à été fait dans la fct onScroll -------------------------
    // ---- Attribution de la valeur par défaut de la largeur de l'élément -------------------
    retourIndex.style.width = "182px"
    retourIndex.classList.remove('fixe')
    fauxRectangle.style.display = 'none'
    // ---- recalcul de la position des éléments ---------------------------------------------
    rectangleIndex = retourIndex.getBoundingClientRect()
    topPage = rectangleIndex.top + scrollYPage()
    // ---- Reattribution des valeurs du fauxRectangle ---------------------------------------
    fauxRectangle.style.width = widthIndex + 'px'
    fauxRectangle.style.height = rectangleIndex.height + 'px'
    fauxRectangle.style.display = "block"
    // ---- Retourne la fonction onScroll une fois le réajustement terminée ------------------
    onScroll()
}
//          Ecoute du scroll de la fenêtre et du redimensionnement de la page           //
window.addEventListener('scroll', onScroll)
window.addEventListener('resize', onResize)

//window.scrollTo({top: 0, behavior: 'smooth'});

