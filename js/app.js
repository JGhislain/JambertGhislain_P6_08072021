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

//--------------------------------------------------------------------------------------//
//                                    APPEL DU JSON                                     //
//--------------------------------------------------------------------------------------//

fetch('assets/json/listeObjets.json')
.then(response => response.json())
.then(response => {
    
    profilsPhotographes(response.photographers)
    allPhotographers = response.photographers;
});

//--------------------------------------------------------------------------------------//
//                                  FONCTIONS D APPEL                                   //
//--------------------------------------------------------------------------------------//


function profilsPhotographes(photographers) {
//      Création variable type array vide pour regrouper les tags des photographes      //
    let allTags = [];
//      Sortir les photographes individuellement et renvoi la fonction d'insertion      //
    for (let i = 0; i < photographers.length; i++) {
        const photographe = photographers[i];
        insertionArticlePhotographe(photographe);
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
}

//--------------------------------------------------------------------------------------//
//                               FONCTIONS DE TRAITEMENT                                //
//--------------------------------------------------------------------------------------//


function navBarTags(tags) {
//                      Création balise div pour tags de la navBar                      //
    let insertionNavBar = document.createElement("div");
        insertionNavBar.id = "nav-bar";
        insertionNavBar.classList.add("nav-bar");
        for (let i = 0; i < tags.length; i++) {
        let tag = tags[i];
        insertionNavBar.innerHTML += `<a id="tag" class="tag ${tag} nav-tag">${tag}</a>`;
    }
    tagsNavBar.push(insertionNavBar.childNodes)
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

    let insertionFigure = document.createElement("a");
    insertionFigure.id = photographe.id;
    insertionFigure.classList.add("lien-profil");
    insertionFigure.href = `html/photographe.html?id=${photographe.id}`
    insertionFigure.innerHTML += `<figure id="cadre-photographe" class="cadre-photographe"></figure>`;

//                       Création balises images des photographes                       //
    let insertionPhoto = document.createElement("img");
    insertionPhoto.classList.add("cadre-photo");
    src =  "assets/FishEye_Photos/Sample Photos/Photographers ID Photos/" + photographe.portrait;
    insertionPhoto.src = src;
    //insertionPhoto.insertAdjacentText('afterbegin', insertionFigure)
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
            let tagsFocus = document.querySelectorAll('a.tag.focus');
            // Mettre à jour les articles des photographes selon les tags selectionnés
            // Pour chaque photographes boucle for photographe.tags
            for (let j = 0; j < tagsPhotoProfil.length; j++) {
                const tagPhoto = tagsPhotoProfil[j];
                searchTags(tagsFocus, tagPhoto, allTags)
            }
                // comparer les tags focus avec les tags du photographe
                    // si true 
                        // afficher le photographe dans le html
                    // sinon 
                        // le cacher
            
            //Récupérer les tags sélectionnés et les comparer avec les tags de chaques photographes
            //Si le photographes ne contients pas les tags sélectionnés alors caché le photographe
            //Sinon l'affiché
        }
    )}
};

function searchTags(tagsFocus, tagsPhotographes, allTags) {
    // comment on comparer les tags sel;ectionné avec les tags du photographe
    // tags selectionné type : ?? tagsFocus: Array de nodes
    // tags type : ?? array<string>
    //let tagsProfil = document.querySelectorAll('a.tag-photographe')
    
    //console.log(tagsProfil)
    for (let i = 0; i < tagsPhotographes.length; i++) {
        const photographerTags = tagsPhotographes[i];
        
        // tagsPhotoProfil.includes(tagPhotographeHtmlElement)
        for (let y = 0; y < tagsFocus.length; y++) {
            const tag = tagsFocus[y];
            
            console.log('photographerTags.innerHTML == tag.innerHTML', photographerTags.innerHTML == tag.innerHTML); // #fsdj
            if(photographerTags.innerHTML == tag.innerHTML){
                // on a trouvais quelque chose
                //Si tag n' a plus la class .focus alors retirer la class focus à photographerTags
                photographerTags.classList.add('focus')
                console.log(tag.innerHTML); // #fsdj
                console.log(photographerTags.classList.contains('focus'))
                console.log(photographerTags)
                console.log('photographerTags.classList.contains(focus) == false', photographerTags.classList.contains('focus') == false)
                console.log('------------------')
                if ((photographerTags.innerHTML != tag.innerHTML) && (photographerTags.classList.contains('focus') == true && tag.classList.contains('focus') == false)) {
                    photographerTags.classList.remove('focus')
                }
                else{
                    console.log(photographerTags)
                }
            }
            //photographerTags.parentNode.parentNode.style.display = "none"
        }

//Vérifier si des tags sont focus à l'intérieur de l'article du photographe
//Si aucuns photographersTags n'est focus 
        //alors cacher l'article des photographes
        //Sinon ne rien faire


        //let hasTagClass = 
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