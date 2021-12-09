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
    let allPhotographers = response.photographers;
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
        //Sinon renvoyer vers la page
    else {
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
                this.genereDivTriMedia();
                this.genereArticleMedia();
                this.generePrixProfil();
                this.genereLightbox();
                this.genereModalContact();
            }
            genereArticleProfil() {
                document.querySelector('#profil').setAttribute('aria-label', 'Profil de ' + this.name)
                let articleProfil = document.createElement("article");
                articleProfil.id = "article-profil"
                articleProfil.classList.add('article-profil')
                articleProfil.setAttribute('aria-label', 'Profil de ' + this.name)
                articleProfil.setAttribute('tabindex', '-1')
                articleProfil.setAttribute('aria-controls', 'profil')
                sectionProfil.appendChild(articleProfil);
            }
            genereNameProfil() {
                let nameProfil = document.createElement("h2");
                nameProfil.classList.add('nom-profil');
                nameProfil.setAttribute('aria-label', this.name)
                nameProfil.setAttribute('tabindex', '-1')
                nameProfil.setAttribute('aria-controls', 'profil')
                nameProfil.innerHTML += this.name;
                let articleProfilPhotographe = document.querySelector('#article-profil')
                articleProfilPhotographe.appendChild(nameProfil)
            }
            genereCityProfil() {
                let cityProfil = document.createElement("p");
                cityProfil.classList.add('ville-profil')
                cityProfil.setAttribute('aria-label', this.city + this.country)
                cityProfil.setAttribute('tabindex', '0')
                cityProfil.setAttribute('aria-controls', 'profil')
                cityProfil.innerHTML += this.city + ", " + this.country
                let articleProfilPhotographe = document.querySelector('#article-profil')
                articleProfilPhotographe.appendChild(cityProfil)
            }
            genereCitationProfil() {
                let citationProfil = document.createElement('p')
                citationProfil.classList.add('citation-profil')
                citationProfil.setAttribute('aria-label', this.tagline)
                citationProfil.setAttribute('tabindex', '0')
                citationProfil.setAttribute('aria-controls', 'profil')
                citationProfil.innerHTML += this.tagline
                let articleProfilPhotographe = document.querySelector('#article-profil')
                articleProfilPhotographe.appendChild(citationProfil)
            }
            genereTagsProfil() {
                let tagsProfil = document.createElement('div')
                tagsProfil.classList.add('tags-profil')
                tagsProfil.setAttribute('role', 'naviguation')
                tagsProfil.setAttribute('aria-label', 'Vignettes des médias de' + this.name)
                tagsProfil.setAttribute('tabindex', '0')
                tagsProfil.setAttribute('aria-controls', 'profil')
                for (let i = 0; i < this.tags.length; i++) {
                    const tag = this.tags[i];
                    tagsProfil.innerHTML += `<a role='naviguation' id=${tag} class="tag" href='../index.html'>#${tag}</a>`
                }
                let articleProfilPhotographe = document.querySelector('#article-profil')
                articleProfilPhotographe.appendChild(tagsProfil)
            }
            genereContactProfil() {
                let contactProfil = document.createElement('div')
                contactProfil.classList.add("contact-profil")
                contactProfil.setAttribute('aria-labelledby', 'bouton-form')
                contactProfil.setAttribute('aria-controls', 'profil')
                contactProfil.innerHTML += `<a id="bouton-form" aria-haspopup="true" aria-controls='profil' class='btn-modal' href=''>Contactez-moi</a>`
                sectionProfil.appendChild(contactProfil)
            }
            generePhotoProfil() {
                let cadreProfil = document.createElement("div")
                cadreProfil.classList.add('cadre-image-profil')
                cadreProfil.setAttribute('tabindex', '-1')
                cadreProfil.setAttribute('aria-controls', 'profil')
                sectionProfil.appendChild(cadreProfil)
                let imageProfil = document.createElement('img')
                imageProfil.classList.add('image-profil')
                let sourceImage = "../assets/FishEye_Photos/Sample Photos/Photographers ID Photos/"+this.portrait
                imageProfil.src = sourceImage
                imageProfil.setAttribute('aria-label', 'Portrait de' + this.name)
                imageProfil.setAttribute('tabindex', '0')
                imageProfil.setAttribute('aria-controls', 'profil')
                let cadreImageProfil = document.querySelector('.cadre-image-profil')
                cadreImageProfil.appendChild(imageProfil)
            }
            genereDivTriMedia() {
                let triMedia = document.createElement('nav')
                triMedia.id = 'trieuse'
                triMedia.innerHTML = '<button id="nav-button" aria-haspopup="true" tabindex="0" aria-controls="menu2" class="trier">Trier par<i class="fas fa-angle-up chevron"></i></button>'
                let triCategorie = document.createElement('ul')
                triCategorie.classList.add('tri-categorie')
                triCategorie.setAttribute('role', 'menu2')
                triCategorie.setAttribute('aria-labelledby', 'nav-button')
                triCategorie.innerHTML = `<li class="ligne-un" role="none"><span tabindex="0" role="menuitem" class= "tri-popularite categorie">Popularité</span></li>
                <li class="ligne-deux" role="none"><span tabindex="0" role="menuitem" class= "tri-date categorie">Date</span></li>
                <li class="ligne-trois" role="none"><span tabindex="0" role="menuitem" class= "tri-titre categorie">Titre</span></li>`        
                sectionMedia.appendChild(triMedia)
                triMedia.appendChild(triCategorie)
            }
            genereArticleMedia() {
                let articleMedia = document.createElement('div')
                articleMedia.id = 'article-media'
                sectionMedia.appendChild(articleMedia)
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
            genereLightbox() {
                const mainHtml = document.querySelector('main')
                const lightboxDom = document.createElement('div')
                lightboxDom.id = 'lightbox'
                lightboxDom.classList.add('lightbox')
                lightboxDom.innerHTML = `<button class="lightbox__close"><i class="fas fa-times"></i></button>
                <button class="lightbox__preview"><i class="fas fa-arrow-left"></i></button>
                <button class="lightbox__next"><i class="fas fa-arrow-right"></i></button>
                <div class="lightbox__container">
                <img class"lightbox-photo" src="" alt="">
                <video controls class="lightbox-video" src="" type="video/mp4">
                </video>
                </div>`
                mainHtml.appendChild(lightboxDom)
            }
            genereModalContact() {
                const mainHtml = document.querySelector('main')
                const modalContact = document.createElement('div')
                modalContact.id = 'modal'
                modalContact.classList.add('modal-contact')
                modalContact.setAttribute('aria-hidden', 'true')
                modalContact.setAttribute('role', 'form')
                modalContact.setAttribute('aria-labelledby', 'contact-me')
                modalContact.innerHTML = `<div class="content">
                <div class="modal-body">
                <p class="contact-me">Contactez-moi<button class="modal__close"><i class="fas fa-times modal-close"></i></button></p>
                <p class="nom-contact">${this.name}</p>
                <form name="contact" id="formulaire" action="photographe.html" method="post">
                <div class="formData">
                <label for="first">Prénom</label><br>
                <input class="text-control" type="text" id="first" name="first" placeholder="Votre prénom" aria-required='true'/><br>
                <span id="first-validation"></span>
                </div>
                <div class="formData">
                <label for="last">Nom</label><br>
                <input class="text-control" type="text" id="last" name="last" placeholder="Votre nom" aria-required='true'/><br>
                <span id="last-validation"></span>
                </div>
                <div class="formData">
                <label for="email">Email</label><br>
                <input class="text-control" type="email" id="email" name="email" placeholder="Votre Email" aria-required='true'/><br>
                <span id="email-validation"></span>
                </div>
                <div class="formData">
                <label for="message">Votre message</label><br>
                <textarea class="text-control" type="textarea" id="message" name="message" placeholder="Saisissez votre message" aria-required='true'></textarea><br>
                <span id="message-validation"></span>
                </div>
                <div class="submit">
                <input class="btn-submit" type="submit" id="btn-submit" value="Envoyer"/><br>
                <span id="error-validation"></span>
                </div>
                </form>
                </div>
                </div>`
                mainHtml.appendChild(modalContact)
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
                let articleMedia = document.createElement('article')
                articleMedia.classList.add("cadre-media")
                articleMedia.classList.add("#" + this.tags)
                articleMedia.setAttribute('aria-labelledby', 'media')
                articleMedia.setAttribute('tabindex', '-1')
                articleMedia.setAttribute('aria-controls', 'media')
                articleMediaPhotographe.appendChild(articleMedia)
            }

            genereContenuMedia() {

//--------------------------------------------------------------------------------------//
//             Création des balises qui comporte les medias du photographe              //
//--------------------------------------------------------------------------------------//

                let contenantMedia = document.querySelectorAll('.cadre-media')
                let cadreParent = contenantMedia[index]
                let cadreMedia = document.createElement('a')
                cadreMedia.classList.add('media')
                cadreMedia.setAttribute('aria-label', this.title)
                cadreMedia.setAttribute('tabindex', '0')
                cadreMedia.setAttribute('aria-controls', 'media')
                // si c'est une image
                if (!this.video && this.image != undefined) {
                    // Retourne le lien de l'image
                    let image = this.imageUrlTransfo(this.image)
                    let sourceMediaImage = "../assets/FishEye_Photos/Sample Photos/" + prenom + "/" + image
                    cadreMedia.classList.add('photo')
                    cadreMedia.href = sourceMediaImage
                }
                // si c'est une vidéo
                else {
                    // Retourne le lien de la vidéo
                    let video = this.videoUrlTransfo(this.video)
                    let sourceMediaVideo = "../assets/FishEye_Photos/Sample Photos/" + prenom + "/" + video
                    cadreMedia.classList.add('video')
                    cadreMedia.href = sourceMediaVideo
                }
                cadreMedia.appendChild(this.genereMedia());
                cadreParent.appendChild(cadreMedia)
                cadreParent.appendChild(this.genereCadreInfoMedia());
            }

            genereMedia() {
                
//--------------------------------------------------------------------------------------//
//                             Création des balises Medias                              //
//--------------------------------------------------------------------------------------//

                // si c'est une image 
                if (!this.video && this.image != undefined) {
                    // return juste l'image
                    let image = this.imageUrlTransfo(this.image)
                    let imageMedia = document.createElement('img')
                    imageMedia.classList.add('media-photographe')
                    let sourceMediaImage = "../assets/FishEye_Photos/Sample Photos/" + prenom + "/" + image
                    imageMedia.src = sourceMediaImage
                    imageMedia.setAttribute('aria-label', this.image)
                    imageMedia.dataset.index = this.getIndex(index)
                    imageMedia.setAttribute('alt', this.title)
                    return imageMedia
                }
                // si c'est une vidéo 
                else {
                    // return juste la video
                    let video = this.videoUrlTransfo(this.video)
                    let videoMedia = document.createElement('video')
                    videoMedia.setAttribute("controls", "")
                    videoMedia.classList.add('media-photographe')
                    videoMedia.dataset.index = this.getIndex(index)
                    let sourceMediaVideo = "../assets/FishEye_Photos/Sample Photos/" + prenom + "/" + video
                    videoMedia.src = sourceMediaVideo
                    videoMedia.setAttribute('aria-label', this.video)
                    videoMedia.setAttribute('alt', this.title)
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
                titreMedia.setAttribute('aria-label', this.title)
                titreMedia.setAttribute('tabindex', '0')
                titreMedia.setAttribute('aria-controls', 'media')
                titreMedia.innerHTML = this.title
                divInfo.appendChild(titreMedia)
                divInfo.innerHTML += `<span class="nb-likes" arial-label='${this.likes}' tabindex='0' aria-controls='media'>${this.likes}</span><i class="far fa-heart coeur"></i>`
            }

//--------------------------------------------------------------------------------------//
//        Récupération des url des médias en cours et retrait du caractère ('-')        //
//--------------------------------------------------------------------------------------//
                                
            imageUrlTransfo(url) {
                let urlArray = url.split(' ')
                if (urlArray.join('-')) {
                    return urlArray[0].replace(/-/i, '')
                }
                else {
                    return urlArray[0]
                }
            }

            videoUrlTransfo(url) {
                let urlArray = url.split(' ')
                if (urlArray.join('-')) {
                    return urlArray[0].replace(/-/i, '')
                }
                else {
                    return urlArray[0]
                }
            }

//--------------------------------------------------------------------------------------//
//         Fonction de récupération et d'attribution des parametres data-index          //
//--------------------------------------------------------------------------------------//

            getIndex(index) {
                let toutMedia = document.querySelectorAll(".media-photographe")
                let indexMedia = toutMedia[index]
                return [index]
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
            let wordArray = name.split(' ');
            if (wordArray.join('-')) {
                prenom = wordArray[0].replace(/-/i, ' ')
            }
            else {
                prenom = wordArray[0]
            }
        }
  
//--------------------------------------------------------------------------------------//
//                           Constructeur de la section Media                           //
//--------------------------------------------------------------------------------------//

        const showMedia = (currentMedia) => {
            for (let j = 0; j < currentMedia.length; j++) {
                const media = currentMedia[j];
                const newMedias = new MediasPhotographe(media.id, media.photographerId, media.title, media.image, media.video, media.tags, media.likes, media.date, media.price);
                mediaDuPhotographe.push(newMedias)
                index = [j]
                somme += media.likes
                newMedias.genereCadreMedia();
                newMedias.genereContenuMedia();
                newMedias.genereInfoMedia();
            }
        }

        showMedia(mediaEnCours)

//--------------------------------------------------------------------------------------//
//                      Fonction d'insertion du nb de likes total                       //
//--------------------------------------------------------------------------------------//

        function injectInfoLikes() {
            let cardeInfoProfil = document.querySelector('.info-profil')
            let likesProfil = document.createElement('span')
            likesProfil.classList.add('likes-profil')
            likesProfil.innerHTML = Math.round(somme) + " " + `<i class="far fa-heart coeur-profil"></i>`
            cardeInfoProfil.appendChild(likesProfil)
        }

//--------------------------------------------------------------------------------------//
//                Appel de la fonction d'insertion du nb total de likes                 //
//--------------------------------------------------------------------------------------//
        
        injectInfoLikes();

//--------------------------------------------------------------------------------------//
//                    Ajout du nombre de like si click sur un coeur                     //
//--------------------------------------------------------------------------------------//

        let nombreLikes = function() {
            let iconesCoeur = document.querySelectorAll('.coeur')
            for (let i = 0; i < iconesCoeur.length; i++) {
                const icone = iconesCoeur[i];
                //On écoute le click des icones de coeurs
                icone.addEventListener('click', function(e) {
                    //Si on click sur un coeur on ajoute la class 'bold'
                    //et on incrémente +1 au compteur de likes
                    if (!icone.classList.contains('bold')) {
                        icone.classList.add('bold')
                        console.log(e.target.previousElementSibling)
                        icone.previousElementSibling.innerHTML ++
                        somme ++
                    }
                    //Sinon on retire la classe 'bold'
                    else {
                        icone.classList.remove('bold')
                        icone.previousElementSibling.innerHTML --
                        somme --
                    }
                    //On attache la nouvelle valeur à la page
                    let likesProfil = document.querySelector('.likes-profil')
                    likesProfil.firstChild.textContent = somme
                })
            }
        }

        nombreLikes();

//--------------------------------------------------------------------------------------//
//                        Trieuse des photographes en fonction des tags                 //
//--------------------------------------------------------------------------------------//

        //Appel des éléments du DOM nécessaire
        let tagsLink = document.querySelectorAll('.tag')
        //Écoute du tag clické
        let triTag = function() {
            for (let i = 0; i < tagsLink.length; i++) {
                const tagLink = tagsLink[i];
                tagLink.addEventListener('click', function(e) {
                    //On ajoute ou retire la classe .focus au clic du tag et on vérifie si le tag est présent dans le media
                    tagLink.classList.toggle('focus')
                    let tag = e.currentTarget.id
                    sessionStorage.setItem("tag", tag)
                })
            }
        }

        triTag();

//--------------------------------------------------------------------------------------//
//                      Fonction de tri des médias du photographes                      //
//--------------------------------------------------------------------------------------//

// ---- Affichage de la liste des options de tri -----------------------------------------

        //Appel des éléments du DOM nécessaire
        let navLink = document.querySelector('.trier')
        let triCategorieLink = document.querySelector('.tri-categorie')
        let iconeChevron = document.querySelector('.chevron')
        //Écoute de la balise au click
        let affichageListeTri = () => {
            navLink.addEventListener('click', (e) => {
                triCategorieLink.classList.toggle('visible')
                iconeChevron.classList.toggle('visible')
            })
        }

        affichageListeTri();

// ---- Tri des médias en fonction de la popularité --------------------------------------
        
        //Appel des éléments du DOM nécessaire
        let navDate = document.querySelector('.tri-date')
        let navPopularite = document.querySelector('.tri-popularite')
        let navTitre = document.querySelector('.tri-titre')

        function triMedia() {

            //On créer des images des medias pour les traiter
            let listeMediaLikes = mediaEnCours.map(media => {
                return media
            })
            let listeMediaDate = mediaEnCours.map(media => {
                return media
            })
            let listeMediaTitre = mediaEnCours.map(media => {
                return media
            })
            //Fonction de réorganisation des éléments du tableau (chiffre décroissant)
            listeMediaLikes.sort((a, b) => {
                return b.likes - a.likes
            })
            //Fonction de réorganisation des éléments du tableau (date croissante)
            listeMediaDate.sort((a, b) => {
                return a.date > b.date
            })
            //Fonction de réorganisation des éléments du tableau (ordre alphabétique)
            listeMediaTitre.sort((a, b)  => {
                if (a.title < b.title)
                return -1;
            })
            console.log(listeMediaLikes)
            console.log(listeMediaDate)
            console.log(listeMediaTitre)
            //On écoute la balise popularité au click
            navPopularite.addEventListener('click', (e) => {
                e.preventDefault()
                navPopularite.classList.toggle('active')
                if (navDate.classList.contains('active')) {
                    navDate.classList.remove('active')
                }
                if (navTitre.classList.contains('active')) {
                    navTitre.classList.remove('active')
                }
                if (navPopularite.classList.contains('active')) {
                    document.getElementById('article-media').innerHTML = ""
                    showMedia(listeMediaLikes)
                }
                else {
                    document.getElementById('article-media').innerHTML = ""
                    showMedia(mediaEnCours)
                }
                nombreLikes()
                somme = somme/2
            })
            //On écoute la balise Date au click
            navDate.addEventListener('click', (e) => {
                e.preventDefault()
                navDate.classList.toggle('active')
                if (navPopularite.classList.contains('active')) {
                    navPopularite.classList.remove('active')
                }
                if (navTitre.classList.contains('active')) {
                    navTitre.classList.remove('active')
                }
                if (navDate.classList.contains('active')) {
                    document.getElementById('article-media').innerHTML = ""
                    showMedia(listeMediaDate)
                }
                else {
                    document.getElementById('article-media').innerHTML = ""
                    showMedia(mediaEnCours)
                }
                nombreLikes()
                somme = somme/2
            })
            //On écoute la balise Titre au click
            navTitre.addEventListener('click', (e) => {
                e.preventDefault()
                navTitre.classList.toggle('active')
                if (navPopularite.classList.contains('active')) {
                    navPopularite.classList.remove('active')
                }
                if (navDate.classList.contains('active')) {
                    navDate.classList.remove('active')
                }
                if (navTitre.classList.contains('active')) {
                    document.getElementById('article-media').innerHTML = ""
                    showMedia(listeMediaTitre)
                }
                else {
                    document.getElementById('article-media').innerHTML = ""
                    showMedia(mediaEnCours)
                }
                nombreLikes()
                somme = somme/2
            })
        }

        triMedia()

//--------------------------------------------------------------------------------------//
//               Appel du DOM nécessaire au fonctionnement de la lightbox               //
//--------------------------------------------------------------------------------------//

        const lightbox = document.querySelector("#lightbox")
        const close = document.querySelector(".lightbox__close")
        const preview = document.querySelector(".lightbox__preview")
        const next = document.querySelector(".lightbox__next")
        const links = document.querySelectorAll(".cadre-media a")
        const imageContainer = lightbox.querySelector(".lightbox__container img")
        const videoContainer = lightbox.querySelector(".lightbox-video")

//--------------------------------------------------------------------------------------//
//                       On ajoute l'écouteur clic sur les liens                        //
//--------------------------------------------------------------------------------------//

        let openLightbox = function() {
            for (let i = 0; i < links.length; i++) {
                const link = links[i];
                link.addEventListener("click", function(e) {
                    e.preventDefault()
                    //Si on clic sur une photo on ajoute l'image 
                    //du lien de la photo et on l'insère dans la balise image
                    if (link.classList.contains('photo') == true) {
                        imageContainer.src = this.href
                        let img = this.querySelector('img')
                        mediaIndex = img.dataset.index
                        lightbox.classList.add('show')
                        imageContainer.style.display = "initial"
                    }
                    else {
                        videoContainer.src = this.href
                        let vid = this.querySelector('video')
                        mediaIndex = vid.dataset.index
                        lightbox.classList.add('show')
                        videoContainer.classList.add('show')
                    }
                });
            }
        }

//--------------------------------------------------------------------------------------//
//                         Fonction de fermeture de la lightbox                         //
//--------------------------------------------------------------------------------------//

        function closeLightbox() {
            //On retire la classe show de la lightbox
            imageContainer.style.display = "none"
            videoContainer.classList.remove('show')
            lightbox.classList.remove("show")
        }

        close.addEventListener("click", closeLightbox)
        window.addEventListener('keyup', (e) => {
            if (e.keyCode === 27) {
                closeLightbox()
            }
        })

//--------------------------------------------------------------------------------------//
//                       Fonction de recherche des sources médias                       //
//--------------------------------------------------------------------------------------//

        let getMediaUrl = function(mediaIndex) {
            mediaCible = links[mediaIndex];
            if (mediaCible.classList.contains("photo")) {
                return mediaCible.querySelector('img').src
            }
            else {
                return mediaCible.querySelector('video').src
            }
        };

//--------------------------------------------------------------------------------------//
//                      Fonction de media précédent de la lightbox                      //
//--------------------------------------------------------------------------------------//

        function previewLightbox() {
            //On initialise mediaIndex
            mediaIndex -= 1
            mediaTotal = document.querySelectorAll('.media-photographe')
            //Si mediaIndex est inférieur à 0 alors revenir à la dernière photo
            if (mediaIndex < 0) {
                mediaIndex = mediaTotal.length - 1
            }
            //Appel de la fonction de récupération de l'Url du média à venir
            let mediaUrl = getMediaUrl(mediaIndex)
            //Si le media est une photo on affiche la photo
            if (mediaCible.classList.contains("photo")) {
                imageContainer.src = mediaUrl
                //Si le media précédent était une vidéo on remplace l affichage des balises
                if (imageContainer.style.display = "none") {
                    videoContainer.classList.remove('show')
                    imageContainer.style.display = 'initial'
                }
            }
            //Si le media est une vidéo on affiche la vidéo
            else {
                imageContainer.style.display = "none"
                videoContainer.classList.add('show')
                videoContainer.src = mediaUrl
            }
        }

        preview.addEventListener('click', previewLightbox)
        window.addEventListener('keyup', (e) => {
            if (e.keyCode === 37) {
                previewLightbox()
            }
        })

//--------------------------------------------------------------------------------------//
//                       Fonction de média suivant de la lightbox                       //
//--------------------------------------------------------------------------------------//

            function nextLightbox() {
                //On initialise mediaIndex
                mediaIndex ++
                mediaTotal = document.querySelectorAll('.media-photographe')
                //Si mediaIndex est supérieur à mediaTotal.length alors revenir à la premiere photo
                if (mediaIndex === mediaTotal.length) {
                    mediaIndex = 0
                }
                //Appel de la fonction de récupération de l'Url du média à venir
                let mediaUrl = getMediaUrl(mediaIndex)
                //Si le media est une photo on affiche la photo
                if (mediaCible.classList.contains("photo")) {
                    imageContainer.src = mediaUrl
                    //Si le media précédent était une vidéo on remplace l affichage des balises
                    if (imageContainer.style.display = "none") {
                        videoContainer.classList.remove('show')
                        imageContainer.style.display = 'initial'
                    }
                }
                //Si le media est une vidéo on affiche la vidéo
                else {
                    imageContainer.style.display = "none"
                    videoContainer.classList.add('show')
                    videoContainer.src = mediaUrl
                }
            }

            next.addEventListener('click', nextLightbox)
            window.addEventListener('keyup', (e) => {
                console.log(e.key)
                if (e.keyCode === 39) {
                    nextLightbox()
                }
            })

//--------------------------------------------------------------------------------------//
//            Appel du DOM necéssaire au fonctionnement de la fenêtre modal             //
//--------------------------------------------------------------------------------------//

        const modalDisplay = document.querySelector(".modal-contact")
        const modalBoutonOpen = document.querySelector(".btn-modal")
        const modalBoutonClose = document.querySelector('.modal__close')
        const formData = document.querySelectorAll('.formData')
        const formulaire = document.getElementById('formulaire')
        const firstName = document.getElementById('first')
        const lastName = document.getElementById('last')
        const email = document.getElementById('email')
        const messageZone = document.getElementById('message')
        const modalErreur = document.querySelector('#error-validation')

//--------------------------------------------------------------------------------------//
//                       Fonction d'ouverture de la fenêtre modal                       //
//--------------------------------------------------------------------------------------//

        const focusableForm = 'p, button, label, input, textarea, span'
        let focusables = []

        function openModal(e) {
            e.preventDefault()
            modalDisplay.classList.add('show')
            focusables = Array.from(modalDisplay.querySelectorAll(focusableForm))
            focusables[1].focus()
            modalDisplay.setAttribute('aria-hidden', 'false')
            modalDisplay.setAttribute('aria-modal', 'true')
            verifFormulaire()
            }

//--------------------------------------------------------------------------------------//
//                         Ecoute du formulaire (partie prénom)                         //
//--------------------------------------------------------------------------------------//
        function verifFormulaire() {
            formData[0].addEventListener('input', function(e) {
                //Création d'une variable pour une regex de validation du prénom  
                let firstRegex = /^[a-zA-Z '\-éèêëçäâàù]{2,}$/;
                //Récupération de la balise span
                let firstValidate = document.getElementById('first-validation');
                //Test du champ prénom
                if (firstRegex.test(firstName.value) == false) {
                    //Si le prénom ne respecte pas la regex    
                    firstValidate.style.display = 'block';
                    firstValidate.style.color = 'red';
                    firstValidate.style.fontSize = '13px';
                    firstValidate.innerHTML = "Veuillez entrer deux caractères ou plus dans le champs du prénom.";
                    return false;
                }
                else {
                    //Sinon la regex est valide    
                    firstValidate.style.display = 'none';
                    return true;
                }
            });

//--------------------------------------------------------------------------------------//
//                          Ecoute du formulaire (partie nom)                           //
//--------------------------------------------------------------------------------------//

            formData[1].addEventListener('input', function(e) {
                //Création d'une variable pour une regex de validation du nom 
                let lastRegex = /^[a-zA-Z '\-éèêëçäâàù]{2,}$/;
                //Récupération de la balise span
                let lastValidate = document.getElementById('last-validation');
                //Test du champ nom
                if (lastRegex.test(lastName.value) == false) {
                    //Si le nom ne respecte pas la regex      
                    lastValidate.style.display = 'block';
                    lastValidate.style.color = 'red';
                    lastValidate.style.fontSize = '13px';
                    lastValidate.innerHTML = "Veuillez entrer deux caractères ou plus dans le champs du nom.";
                    return false;
                } 
                else {
                    //Sinon la regex est valide       
                    lastValidate.style.display = 'none';
                    return true;
                }
            });
            
//--------------------------------------------------------------------------------------//
//                         Ecoute du formulaire (partie email)                          //
//--------------------------------------------------------------------------------------//
            
            //Création d'une variable qui vérifie la bonne saisie de l'adresse mail
            var validationEmailRegex = false;
            
            formData[2].addEventListener('input', function(e) {
                //Création d'une variable pour une regex de validation de l'email
                let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                //Récupération de la balise span
                let emailValidate = document.getElementById('email-validation');
                //Test du champ email
                if (emailRegex.test(email.value) == false) {
                    //Si l'adresse ne respecte pas la regex
                    emailValidate.style.display = 'block';
                    emailValidate.style.color = 'red';
                    emailValidate.style.fontSize = '13px';
                    emailValidate.innerHTML = "L'adresse éléctronique n'est pas valide";
                    validationEmailRegex = false;
                    return false;
                } 
                else {
                    //Sinon la regex est valide       
                    emailValidate.style.display = 'none';
                    validationEmailRegex = true;
                    return true;  
                }
            });

//--------------------------------------------------------------------------------------//
//                                                                                      //
//                   TRAITEMENT DES CHAMPS DE SAISIES AU CAS PAR CAS                    //
//                                                                                      //
//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//
//             Ecoute du formulaire dans son ensemble pour valider l'envoi              //
//--------------------------------------------------------------------------------------//

            //Création d'une variable qui définira si les différentes conditions d'envoie au cas par cas sont remplis
            var validationChampsIndividuel = false;
            formulaire.addEventListener('submit', function(e) {
                if (firstName.value.trim().length < 2) {
                    // si moins de 2 caractères saisie dans le champ prénom alors le champ n est pas valide et l envoi est refusé
                    let firstValidate = document.getElementById('first-validation');
                    firstValidate.style.display = 'block';
                    firstValidate.style.color = 'red';
                    firstValidate.style.fontSize = '13px';
                    firstValidate.innerHTML = "Veuillez renseigner votre prénom";
                    e.preventDefault();
                    return validationChampsIndividuel = false;
                }
                else if (lastName.value.trim().length < 2) {
                    // si moins de 2 caractères saisie dans le champ nom alors le champ n est pas valide et l envoi est refusé
                    let lastValidate = document.getElementById('last-validation');
                    lastValidate.style.display = 'block';
                    lastValidate.style.color = 'red';
                    lastValidate.style.fontSize = '13px';
                    lastValidate.innerHTML = "Veuillez renseigner votre nom";
                    e.preventDefault();
                    return validationChampsIndividuel = false;
                }
                else if (!email.value || validationEmailRegex === false) {
                    // si champ email vide ou si la variable validationEmailRegex = false alors le champ n est pas valide et l envoi est refusé
                    let emailValidate = document.getElementById('email-validation');
                    emailValidate.style.display = 'block';
                    emailValidate.style.color = 'red';
                    emailValidate.style.fontSize = '13px';
                    emailValidate.innerHTML = "Veuillez renseigner votre adresse mail";
                    e.preventDefault();
                    return validationChampsIndividuel = false;  
                }
                else if (messageZone.value.trim().length < 2) {
                    // si moins de 2 caractères saisie dans le champ nom alors le champ n est pas valide et l envoi est refusé
                    let messageValidate = document.getElementById('message-validation');
                    messageValidate.style.display = 'block';
                    messageValidate.style.color = 'red';
                    messageValidate.style.fontSize = '13px';
                    messageValidate.innerHTML = "Veuillez écrire un message";
                    e.preventDefault();
                    return validationChampsIndividuel = false;
                }
                else {
                    //sinon les champs sont valides et return true sur la variable validationChampsIndividuel
                    console.log("Prénom:" + firstName.value);
                    console.log("Nom:" +lastName.value);
                    console.log("Mail:" +email.value);
                    console.log("Message:" +messageZone.value);
                    return validationChampsIndividuel = true;
                }
            });

//--------------------------------------------------------------------------------------//
//                                                                                      //
//                     TRAITEMENT DES CHAMPS DE VALIDATION GLOBAUX                      //
//                                                                                      //
//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//
//       Ecoute du formulaire dans sa globalité via l'attribut "name" avant envoi       //
//--------------------------------------------------------------------------------------//

            //Variable qui défini si les conditions globaux ssont respectés
            let validationConditions = false;
            
            document.forms["contact"].addEventListener('submit', function(e) {
                //Variable de message d'erreur
                let erreurPost;
                let inputs = this;
                //Création d'une boucle qui parcours le formulaire
                for (let i = 0; i < inputs.length; i++) {
                    const input = inputs[i];
                    //Si un champ n'a pas de valeur
                    if (!input.value) {
                        erreurPost = "Veuillez renseigner tout les champs"
                        break;
                    }
                }
                if (erreurPost) {
                    modalErreur.innerHTML = erreurPost
                    modalErreur.style.transition = '0.3s'
                    modalErreur.style.color = "#e54858"
                    modalErreur.style.fontSize = '16px'
                    return validationConditions = false
                }
                //Sinon return validationConditions = true
                else {
                    modalErreur.style.display = 'none'
                    return validationConditions = true
                }
            });

//--------------------------------------------------------------------------------------//
//                  Fonction d'envoi du formulaire aprés vérification                   //
//--------------------------------------------------------------------------------------//

            formulaire.addEventListener('submit', function(e) {
                //Si les variables de validations sont true alors le message est envoyé avec message de confirmation
                if ((validationChampsIndividuel === true) && (validationConditions === true)) {
                    e.preventDefault()
                    console.log("Votre message à été envoyé")
                    modalDisplay.classList.remove('show')
                    alert("Votre message à été envoyé !")
                    return true
                }
                else {
                    e.preventDefault()
                    return false
                }
            })
        };

//--------------------------------------------------------------------------------------//
//                      Fonction de fermeture de la fenêtre modal                       //
//--------------------------------------------------------------------------------------//

        function closeModal() {
                modalDisplay.classList.remove('show')
                modalDisplay.setAttribute('aria-hidden', 'true')
                modalDisplay.removeAttribute('aria-modal')
            }

        function focusForm(e) {
            e.preventDefault()
            let indexForm = focusables.findIndex(getFocus => getFocus === modalDisplay.querySelector(':focus'))
            console.log(modalDisplay.querySelector(':focus'))
            if (indexForm < 1) {
                indexForm = 15
            }
            console.log(focusables.length)
            focusables[indexForm].focus()
            if (e.shiftKey == 'Tab') {
                indexForm --
            }
            else {
                indexForm ++
            }
            console.log(indexForm)
            document.querySelector('.submit').addEventListener('keydown', e => {
                e.preventDefault()
                console.log(e.defaultPrevented)
                if (e.shiftKey === true) {
                    console.log('bordel')
                    indexForm = 13
                    focusables[indexForm].focus()
                }
                if (e.shiftKey == false) {
                    indexForm = 1
                    focusables[indexForm].focus()
                }
            })
        }

//--------------------------------------------------------------------------------------//
//            Appel des fonctions qui ouvre la lightbox et la fenêtre modal             //
//--------------------------------------------------------------------------------------//

        modalBoutonOpen.addEventListener('click', openModal)
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 70) {
                openModal(e)
            }
        })

        modalBoutonClose.addEventListener('click', closeModal)
        window.addEventListener('keyup', (e) => {
            if (e.keyCode === 27) {
                closeModal()
            }
            if (e.key === 'Tab' && modalDisplay.classList.contains('show')) {
                focusForm(e)
            }
        })
        openLightbox();
    }
}