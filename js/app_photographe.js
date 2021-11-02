//--------------------------------------------------------------------------------------//
//                            Récupération de l'ID de l'URL                             //
//--------------------------------------------------------------------------------------//

const params = new URLSearchParams(location.search)
console.log((location.search))
var numbId = (location.search).match(/\d/g);
numbId = numbId.join("")
console.log(numbId)

//--------------------------------------------------------------------------------------//
//               Récupération des médias et des profils des photographes                //
//--------------------------------------------------------------------------------------//


fetch('../assets/json/listeObjets.json')
.then(response => response.json())
.then(response => {
    let allMedia = response.media;
    console.log(allMedia)
    let allPhotographers = response.photographers;
    console.log(allPhotographers)
    compareId(allPhotographers, allMedia)
});

const sectionProfil = document.querySelector('#profil')
const sectionMedia = document.querySelector('#media')

//--------------------------------------------------------------------------------------//
//                       Fonction de construction de la page HTML                       //
//--------------------------------------------------------------------------------------//

let nomPhotographe
let mediaEnCours = []
let photographeEnCours;
let idPhotographe = false;
let idMedia = false;


function compareId(allPhotographers, allMedia) {
    //Je vérifie que l'ID de la barre URL correspond à un ID photographe
    for (let i = 0; i < allPhotographers.length; i++) {
        const photographe = allPhotographers[i];
        //Si l'ID Url à une correspondance avec un ID photographe
        if(numbId == photographe.id) {
            //Alors récupérer les informations necessaires à la construction de la page
            photographeEnCours = photographe
            nomPhotographe = photographe.name
            idPhotographe = true
        }
    }
    //Je vérifie que l'Id Url correspond à un ID Media
    for (let j = 0; j < allMedia.length; j++) {
        const media = allMedia[j];
        //Si l'ID Url à une correspondance avec un ID Media
        if(numbId == media.photographerId){
            //Alors récupérer les informations nécessaire à la construction de la page
            mediaEnCours.push(media)
            idMedia = true
        }
    }

    //Si idPhotographe et idMedia = true
    if((idPhotographe && idMedia) === false){
        //Alors construire la page HTML (revoie vers une nouvelle fonction ou écrire le code à la suite?)
        alert("Le photographe n'existe pas")
    }
        //Sinon renvoyer vers l'index
    else{
        console.log(photographeEnCours)
        console.log(mediaEnCours)
        
//--------------------------------------------------------------------------------------//
//                   Fabricateur qui classe les infos du photographe                    //
//--------------------------------------------------------------------------------------//

        class ProfilPhotographe {
            constructor(city, country, id, name, portrait, price, tagline, tags) {
                this.city = city;
                this.country = country;
                this.id = id;
                this.name = name;
                this.portrait = portrait;
                this.price = price;
                this.tagline = tagline;
                this.tags = tags;

                this.genereArticleProfil();
                this.genereNameProfil();
                this.genereCityProfil();
                this.genereCitationProfil();
                this.genereTagsProfil();
                this.genereContactProfil();
                this.generePhotoProfil();
                this.generePrixProfil();
                this.genereDivTriMedia();
                this.genereArticleMedia();
                this.genereLightbox();
            }
            genereArticleProfil() {
                let articleProfil = document.createElement("article");
                articleProfil.id = "article-profil"
                articleProfil.classList.add('article-profil')
                sectionProfil.appendChild(articleProfil);
            }
            genereNameProfil() {
                let nameProfil = document.createElement("h2");
                nameProfil.classList.add('nom-profil');
                nameProfil.innerHTML += this.name;
                let articleProfilPhotographe = document.querySelector('#article-profil')
                articleProfilPhotographe.appendChild(nameProfil)
            }
            genereCityProfil() {
                let cityProfil = document.createElement("p");
                cityProfil.classList.add('ville-profil')
                cityProfil.innerHTML += this.city + ", " + this.country
                let articleProfilPhotographe = document.querySelector('#article-profil')
                articleProfilPhotographe.appendChild(cityProfil)
            }
            genereCitationProfil() {
                let citationProfil = document.createElement('p')
                citationProfil.classList.add('citation-profil')
                citationProfil.innerHTML += this.tagline
                let articleProfilPhotographe = document.querySelector('#article-profil')
                articleProfilPhotographe.appendChild(citationProfil)
            }
            genereTagsProfil() {
                let tagsProfil = document.createElement('div')
                tagsProfil.classList.add('tags-profil')
                for (let i = 0; i < this.tags.length; i++) {
                    const tag = this.tags[i];
                    tagsProfil.innerHTML += `<a class="tag">#${tag}</a>`
                }
                let articleProfilPhotographe = document.querySelector('#article-profil')
                articleProfilPhotographe.appendChild(tagsProfil)
            }
            genereContactProfil() {
                let contactProfil = document.createElement('div')
                contactProfil.classList.add("contact-profil")
                contactProfil.innerHTML += "contactez-moi"
                sectionProfil.appendChild(contactProfil)
            }
            generePhotoProfil() {
                let cadreProfil = document.createElement("div")
                cadreProfil.classList.add('cadre-image-profil')
                sectionProfil.appendChild(cadreProfil)
                let imageProfil = document.createElement('img')
                imageProfil.classList.add('image-profil')
                let sourceImage = "../assets/FishEye_Photos/Sample Photos/Photographers ID Photos/"+this.portrait
                imageProfil.src = sourceImage
                let cadreImageProfil = document.querySelector('.cadre-image-profil')
                cadreImageProfil.appendChild(imageProfil)
            }
            generePrixProfil() {
                let infoProfil = document.createElement('div')
                infoProfil.classList.add('info-profil')
                sectionProfil.appendChild(infoProfil)
                let prixProfil = document.createElement('span')
                prixProfil.classList.add('prix-profil')
                prixProfil.innerHTML = this.price+"€" + " / jour"
                let cardeInfoProfil = document.querySelector('.info-profil')
                cardeInfoProfil.appendChild(prixProfil)
            }
            genereDivTriMedia() {
                let triMedia = document.createElement('div')
                triMedia.id = 'trieuse'
                triMedia.innerHTML = 'Trier par' + `<i class="fas fa-angle-up chevron"></i>
                <p class= "tri-popularite">Popularité</p>
                <p class= "tri-date">Date</p>
                <p class= "tri-titre">Titre</p>`              
                sectionMedia.appendChild(triMedia)
            }
            genereArticleMedia() {
                let articleMedia = document.createElement('article')
                articleMedia.id = 'article-media'
                sectionMedia.appendChild(articleMedia)
            }
            genereLightbox() {
                const mainHtml = document.querySelector('main')
                const lightboxDom = document.createElement('div')
                lightboxDom.id = 'lightbox'
                lightboxDom.classList.add('lightbox')
                lightboxDom.innerHTML = `<button class="lightbox__close"><i class="fas fa-times"></i></button>
                <button class="lightbox__preview"><i class="fas fa-arrow-left"></i></button>
                <button class="lightbox__next"><i class="fas fa-arrow-right"></i></button>
                <div class="lightbox__container">
                <img src="" alt="">
                <video controls>
                <source src="" type="video/mp4">
                </div>`
                mainHtml.appendChild(lightboxDom)
            }
        }
//--------------------------------------------------------------------------------------//
//                   Fabricateur qui classe les médias du photographe                   //
//--------------------------------------------------------------------------------------//

        class MediasPhotographe {
            constructor(id, photographerId, title, image, video, tags, likes, date, price) {
                this.id = id;
                this.photographerId = photographerId;
                this.title = title;
                this.image = image;
                this.video = video;
                this.tags = tags;
                this.likes = likes;
                this.date = date;
                this.price = price;
            }

            genereCadreMedia() {
                let articleMediaPhotographe = document.querySelector('#article-media')
                let cadreMedia = document.createElement('div')
                cadreMedia.classList.add("cadre-media")
                articleMediaPhotographe.appendChild(cadreMedia)
            }

            genereContenuMedia() {

                
//--------------------------------------------------------------------------------------//
//        Récupération des url des médias en cours et retrait du caractère ('-')        //
//--------------------------------------------------------------------------------------//

                let image;
                let video;

                function imageUrlTransfo(url) {
                    let urlArray = url.split(' ')
                    if (urlArray.join('-')) {
                        return image = urlArray[0].replace(/-/i, '')
                    }
                    else {
                        return image = urlArray[0]
                    }
                }

                function videoUrlTransfo(url) {
                    let urlArray = url.split(' ')
                    if (urlArray.join('-')) {
                        return video = urlArray[0].replace(/-/i, '')
                    }
                    else {
                        return video = urlArray[0]
                    }
                }

//--------------------------------------------------------------------------------------//
//             Création des balises qui comporte les medias du photographe              //
//--------------------------------------------------------------------------------------//

                let contenantMedia = document.querySelectorAll('.cadre-media')
                let cadreParent = contenantMedia[index]
                let cadreMedia = document.createElement('a')
                cadreMedia.classList.add('media')
                // si c'est une image
                if (!this.video && this.image != undefined) {
                    imageUrlTransfo(this.image)
                    // Retourne le lien de l'image
                    let sourceMediaImage = "../assets/FishEye_Photos/Sample Photos/" + prenom + "/" + image
                    cadreMedia.href = sourceMediaImage
                }
                // si c'est une vidéo
                else {
                    // Retourne le lien de la vidéo
                    videoUrlTransfo(this.video)
                    let sourceMediaVideo = "../assets/FishEye_Photos/Sample Photos/" + prenom + "/" + video
                    cadreMedia.href = sourceMediaVideo
                }
                cadreMedia.appendChild(this.genereMedia());
                cadreParent.appendChild(cadreMedia)
                cadreParent.appendChild(this.genereCadreInfoMedia());
            }

            genereMedia() {
//--------------------------------------------------------------------------------------//
//        Récupération des url des médias en cours et retrait du caractère ('-')        //
//--------------------------------------------------------------------------------------//
                
                let image;
                let video;
                
                function imageUrlTransfo(url) {
                    let urlArray = url.split(' ')
                    if (urlArray.join('-')) {
                        return image = urlArray[0].replace(/-/i, '')
                    }
                    else {
                        return image = urlArray[0]
                    }
                }

                function videoUrlTransfo(url) {
                    let urlArray = url.split(' ')
                    if (urlArray.join('-')) {
                        return video = urlArray[0].replace(/-/i, '')
                    }
                    else {
                        return video = urlArray[0]
                    }
                }
//--------------------------------------------------------------------------------------//
//         Fonction de récupération et d'attribution des parametres data-index          //
//--------------------------------------------------------------------------------------//

                function getIndex(index) {
                    let toutMedia = document.querySelectorAll(".media-photographe")
                    let indexMedia = toutMedia[index]
                    return [index]
                }
                
//--------------------------------------------------------------------------------------//
//                             Création des balises Medias                              //
//--------------------------------------------------------------------------------------//

                // si c'est une image 
                if (!this.video && this.image != undefined) {
                    // return juste l'image
                    imageUrlTransfo(this.image)
                    let imageMedia = document.createElement('img')
                    imageMedia.classList.add('media-photographe')
                    let sourceMediaImage = "../assets/FishEye_Photos/Sample Photos/" + prenom + "/" + image
                    imageMedia.src = sourceMediaImage
                    imageMedia.dataset.index = getIndex(index)
                    return imageMedia
                }
                // si c'est une vidéo 
                else {
                    // return juste la video
                    videoUrlTransfo(this.video)
                    let videoMedia = document.createElement('video')
                    videoMedia.classList.add('media-photographe')
                    videoMedia.dataset.index = getIndex(index)
                    let sourceMediaVideo = "../assets/FishEye_Photos/Sample Photos/" + prenom + "/" + video
                    videoMedia.src = sourceMediaVideo
                    return videoMedia
                }
            }

            genereCadreInfoMedia() {

//--------------------------------------------------------------------------------------//
//                         Création des balises info des médias                         //
//--------------------------------------------------------------------------------------//

                if ((this.image != undefined) || (this.video != undefined)) {
                    let infoMedia = document.createElement('div')
                    infoMedia.classList.add('info-media')
                    return infoMedia
                }
                else {
                    return console.log("il n y a pas de média")
                }
            }

            genereInfoMedia() {

                let infoMedia = document.querySelectorAll('.info-media')
                let divInfo = infoMedia[index]
                let titreMedia = document.createElement('h3')
                titreMedia.classList.add('titre-media')
                titreMedia.innerHTML = this.title
                let tagMedia = document.createElement('p')
                tagMedia.classList.add('tag-media')
                tagMedia.innerHTML = "#" + this.tags
                let likesMedia = document.createElement('span')
                likesMedia.classList.add('likes-media')
                likesMedia.innerHTML = this.likes
                /*                 let iconeCoeur = document.createElement('i')
                iconeCoeur.classList.add('far fa-heart coeur') */
                let dateMedia = document.createElement('p')
                dateMedia.classList.add('date-media')
                dateMedia.innerHTML = this.date
                let prixMedia = document.createElement('span')
                prixMedia.classList.add('prix-media')
                prixMedia.innerHTML = this.price + "€"
                divInfo.innerHTML += `<i class="far fa-heart coeur"></i>`
                divInfo.appendChild(titreMedia)
                divInfo.appendChild(tagMedia)
                divInfo.appendChild(likesMedia)
                //divInfo.appendChild(iconeCoeur)
                divInfo.appendChild(dateMedia)
                divInfo.appendChild(prixMedia)
            }
        }
        
//--------------------------------------------------------------------------------------//
//                           Constructeur de la partie Profil                           //
//--------------------------------------------------------------------------------------//

        const profil = photographeEnCours;
        const newProfil = new ProfilPhotographe(profil.city, profil.country, profil.id, profil.name, profil.portrait, profil.price, profil.tagline, profil.tags);
        
        let mediaDuPhotographe = [];
        let prenom;
        let index;
        let somme = 0;

//--------------------------------------------------------------------------------------//
//              Appel et Fonction de récupération du prénom du photographe              //
//--------------------------------------------------------------------------------------//

        recupPrenom(nomPhotographe);

        function recupPrenom(name) {
            console.log(name)
            let wordArray = name.split(' ');
            console.log(wordArray[0])
            if (wordArray.join('-')) {
                prenom = wordArray[0].replace(/-/i, ' ')
            }
            else {
                prenom = wordArray[0]
            }
        }

//--------------------------------------------------------------------------------------//
//                      Fonction d'insertion du nb de likes total                       //
//--------------------------------------------------------------------------------------//

        function injectInfoLikes() {
            let cardeInfoProfil = document.querySelector('.info-profil')
            let likesProfil = document.createElement('span')
            likesProfil.classList.add('likes-profil')
            likesProfil.innerHTML = somme + " " + `<i class="far fa-heart coeur"></i>`
            cardeInfoProfil.appendChild(likesProfil)
        }
        
//--------------------------------------------------------------------------------------//
//                           Constructeur de la section Media                           //
//--------------------------------------------------------------------------------------//

        for (let j = 0; j < mediaEnCours.length; j++) {
            const media = mediaEnCours[j];
            const newMedias = new MediasPhotographe(media.id, media.photographerId, media.title, media.image, media.video, media.tags, media.likes, media.date, media.price);
            mediaDuPhotographe.push(newMedias)
            index = [j]
            somme += media.likes
            newMedias.genereCadreMedia();
            newMedias.genereContenuMedia();
            newMedias.genereInfoMedia();
            //newMedias.genereVideoMedia();
        }

//--------------------------------------------------------------------------------------//
//                Appel de la fonction d'insertion du nb total de likes                 //
//--------------------------------------------------------------------------------------//
        
        injectInfoLikes();
        console.log(somme)

//--------------------------------------------------------------------------------------//
//               Appel du DOM nécessaire au fonctionnement de la lightbox               //
//--------------------------------------------------------------------------------------//

        const lightbox = document.querySelector("#lightbox")
        const close = document.querySelector(".lightbox__close")
        const preview = document.querySelector(".lightbox__preview")
        const next = document.querySelector(".lightbox__next")
        const links = document.querySelectorAll(".cadre-media a")
        const imageContainer = lightbox.querySelector(".lightbox__container img")

        console.log(links)
    }
}