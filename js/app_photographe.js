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


fetch('/assets/json/listeObjets.json')
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
        //Fabricateur d'insertion des éléments HTML et des objets
        
        //Fabricateur qui classe les infos du photographe
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
                let prixProfil = document.createElement('p')
                prixProfil.classList.add('prix-profil')
                prixProfil.innerHTML = this.price+"€"
                let cardeInfoProfil = document.querySelector('.info-profil')
                cardeInfoProfil.appendChild(prixProfil)
            }
            genereDivTriMedia() {
                let triMedia = document.createElement('div')
                triMedia.id = 'trieuse'
                triMedia.innerHTML = 'Trier par'
                sectionMedia.appendChild(triMedia)
            }
            genereArticleMedia() {
                let articleMedia = document.createElement('article')
                articleMedia.id = 'article-media'
                sectionMedia.appendChild(articleMedia)
            }
        }
        //Fabricateur qui classe les médias du photographe
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

                //Récupération des url des médias en cours et retrait du caractère ('-')
                
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
                
                // Création des balises qui comporte les medias du photographe
                let articleMediaPhotographe = document.querySelector('#article-media')
                let cadreMedia = document.createElement('a')
                cadreMedia.classList.add("cadre-media")
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
                cadreMedia.appendChild(this.genereImageMedia());
                articleMediaPhotographe.appendChild(cadreMedia)
            }

            genereImageMedia() {
                
                //Récupération des url des médias en cours et retrait du caractère ('-')
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

                // si c'est une image 
                if (!this.video && this.image != undefined) {
                    // return juste l'image
                    imageUrlTransfo(this.image)
                    let imageMedia = document.createElement('img')
                    imageMedia.classList.add('media-photographe')
                    let sourceMediaImage = "../assets/FishEye_Photos/Sample Photos/" + prenom + "/" + image
                    imageMedia.src = sourceMediaImage
                    return imageMedia
                }
                // si c'est une vidéo 
                else {
                    // return juste la video
                    videoUrlTransfo(this.video)
                    let videoMedia = document.createElement('video')
                    videoMedia.classList.add('media-photographe')
                    
                    let sourceMediaVideo = "../assets/FishEye_Photos/Sample Photos/" + prenom + "/" + video
                    videoMedia.src = sourceMediaVideo
                    return videoMedia
                }
            }
        }
    
        const profil = photographeEnCours;
        const newProfil = new ProfilPhotographe(profil.city, profil.country, profil.id, profil.name, profil.portrait, profil.price, profil.tagline, profil.tags);
        newProfil.genereArticleProfil();
        newProfil.genereNameProfil();
        newProfil.genereCityProfil();
        newProfil.genereCitationProfil();
        newProfil.genereTagsProfil();
        newProfil.genereContactProfil();
        newProfil.generePhotoProfil();
        newProfil.generePrixProfil();
        newProfil.genereDivTriMedia();
        newProfil.genereArticleMedia();
        
        let mediaDuPhotographe = [];
        let prenom;
//--------------------------------------------------------------------------------------//
//                  Fonction de récupération du prénom du photographe                   //
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
        
        for (let j = 0; j < mediaEnCours.length; j++) {
            const media = mediaEnCours[j];
            const newMedias = new MediasPhotographe(media.id, media.photographerId, media.title, media.image, media.video, media.tags, media.likes, media.date, media.price);
            mediaDuPhotographe.push(newMedias)
            newMedias.genereCadreMedia();
            // newMedias.genereImageMedia();
            //newMedias.genereVideoMedia();
        }
    }
}