//--------------------------------------------------------------------------------------//
//                            Récupération de l'ID de l'URL                             //
//--------------------------------------------------------------------------------------//

const params = new URLSearchParams(location.search)
console.log((location.search))
var numb = (location.search).match(/\d/g);
numb = numb.join("")
console.log(numb)

//--------------------------------------------------------------------------------------//
//               Récupération des médias et des profils des photographes                //
//--------------------------------------------------------------------------------------//


fetch('/assets/json/listeObjets.json')
.then(response => response.json())
.then(response => {
    let allMedia = response.media;
    console.log(allMedia)
    let allPhotographers = response.photographers;
    console.log(allPhotographers)
    searchUrlId(allPhotographers, allMedia)
});

//--------------------------------------------------------------------------------------//
//                       Fonction de construction de la page HTML                       //
//--------------------------------------------------------------------------------------//

let nomPhotographe;
let villePhotographe;
let citationPhotographe;
let tagsPhotographe = [];
let portraitPhotographe;
let prixPhotographe;
let titrePhoto = []
let photos = []
let tagPhoto = []
let likesPhoto = []
let idPhotographe = false;
let idMedia = false;

function searchUrlId(allPhotographers, allMedia) {
    //Je vérifie que l'ID de la barre URL correspond à un ID photographe
    for (let i = 0; i < allPhotographers.length; i++) {
        const photographe = allPhotographers[i];
        console.log(photographe)
        //Si l'ID Url à une correspondance avec un ID photographe
        if(numb == photographe.id) {
            //Alors récupérer les informations necessaires à la construction de la page
            console.log(photographe.name +" coucou")
            nomPhotographe = photographe.name;
            villePhotographe = photographe.city
            citationPhotographe = photographe.tagline
            tagsPhotographe.push(photographe.tags)
            portraitPhotographe = photographe.portrait
            prixPhotographe = photographe.price
            idPhotographe = true
        }
    }
    //Je vérifie que l'Id Url correspond à un ID Media
    for (let j = 0; j < allMedia.length; j++) {
        const media = allMedia[j];
        //Si l'ID Url à une correspondance avec un ID Media
        if(numb == media.photographerId){
            //Alors récupérer les informations nécessaire à la construction de la page
            console.log(media.title + " titre de la photos")
            titrePhoto.push(media.title)
            photos.push(media.image + media.video)
            tagPhoto.push(media.tags)
            likesPhoto.push(media.likes)
            idMedia = true
        }
    }

    //Si idPhotographe et idMedia = true
    if((idPhotographe && idMedia) === true){
        //Alors construire la page HTML
        console.log(photos)
        console.log(nomPhotographe)
    }
        //Sinon renvoyer vers l'index
        else{
            alert("Le photographe n'existe pas")
        }
}
