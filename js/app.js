//appel du JSON

fetch('assets/json/listeObjets.json')
.then(response => response.json())
.then(essai => console.log(essai));

// Mise en place des photos et profil page index

//Appels des éléments du DOM
const nav = document.getElementById('nav');
const navBar = document.getElementsByClassName('nav-bar'); 
const selectionPhotographes = document.getElementById('selection-photographes');
const cadreProfil = document.getElementsByClassName('cadre-profil');
const cadrePhotographe = document.getElementsByClassName('cadre-photographe');
const cadreLienPhotographe = document.getElementsByClassName('lien-profil');
const cadreFichePhotographe = document.getElementsByClassName('cadre-fiche-photographe');
const cadreTagsPhotographe = document.getElementsByClassName('cadre-tags-photographe');

//Création des différentes variables tags
var tagPortrait = document.createElement('a');
tagPortrait.classList.add('tag');
tagPortrait.classList.add('portrait');
tagPortrait.href = "";
tagPortrait.innerHTML = "#portrait";

var tagEvents = document.createElement('a');
tagEvents.classList.add('tag');
tagEvents.classList.add('events');
tagEvents.href ="";
tagEvents.innerHTML = "#events";

var tagTravel = document.createElement('a');
tagTravel.classList.add('tag');
tagTravel.classList.add('travel');
tagTravel.href ="";
tagTravel.innerHTML = "#travel";

var tagAnimals = document.createElement('a');
tagAnimals.classList.add('tag');
tagAnimals.classList.add('animals');
tagAnimals.href ="";
tagAnimals.innerHTML = "#animals";

var tagSports = document.createElement('a');
tagSports.classList.add('tag');
tagSports.classList.add('sports');
tagSports.href = "";
tagSports.innerHTML = "#sports";

var tagArchitecture = document.createElement('a');
tagArchitecture.classList.add('tag');
tagArchitecture.classList.add('architecture');
tagArchitecture.href ="";
tagArchitecture.innerHTML = "#architecture";

var tagArt = document.createElement('a');
tagArt.classList.add('tag');
tagArt.classList.add('art');
tagArt.href = "";
tagArt.innerHTML = "#art";

var tagFashion = document.createElement('a');
tagFashion.classList.add('tag');
tagFashion.classList.add('fashion');
tagFashion.href ="";
tagFashion.innerHTML = "#fashion";

//Création des différentes balises et de leur contenu
//Nav-Bar
var navTagBar = document.createElement("div");
navTagBar.id = "nav-bar"
navTagBar.classList.add("nav-bar");

//Profil 1
var articleProfil1 = document.createElement("article");
articleProfil1.id = "cadre-profil";
articleProfil1.classList.add('cadre-profil');

var figureProfil1 = document.createElement("figure");
figureProfil1.id = "cadre-photographe";
figureProfil1.classList.add("cadre-photographe");

var divFichePhotographe1 = document.createElement('div');
divFichePhotographe1.id = "cadre-fiche-photographe";
divFichePhotographe1.classList.add("cadre-fiche-photographe");

var divTagsPhotographe1 = document.createElement('div');
divTagsPhotographe1.id = "cadre-tags-photographe";
divTagsPhotographe1.classList.add("cadre-tags-photographe");

var lienProfil1 = document.createElement("a");
lienProfil1.classList.add('lien-profil1');
lienProfil1.classList.add('lien-profil');
lienProfil1.href = "";

var imageProfil1 = document.createElement("img");
imageProfil1.classList.add('photo-profil1');
imageProfil1.src = "/assets/FishEye_Photos/Sample Photos/Mimi/Portrait_Nora.jpg";

var h2Profil1 = document.createElement('h2');
h2Profil1.classList.add('nom-profil1');
h2Profil1.innerHTML = "Mimi Keel";

var villeProfil1 = document.createElement('address');
villeProfil1.classList.add('ville-profil1');
villeProfil1.innerHTML = "London, UK";

var p1Profil1 = document.createElement('p');
p1Profil1.classList.add('citation-profil1');
p1Profil1.classList.add('citation-profil');
p1Profil1.innerHTML = "Voir le beau dans le quotidien";

var p2Profil1 = document.createElement('p');
p2Profil1.classList.add('prix-profil1');
p2Profil1.classList.add('prix-profil');
p2Profil1.innerHTML = "400€/jour";

//Profil 2
var articleProfil2 = document.createElement("article");
articleProfil2.id = "cadre-profil";
articleProfil2.classList.add('cadre-profil');

var figureProfil2 = document.createElement("figure");
figureProfil2.id = "cadre-photographe";
figureProfil2.classList.add("cadre-photographe");

var divFichePhotographe2 = document.createElement('div');
divFichePhotographe2.id = "cadre-fiche-photographe";
divFichePhotographe2.classList.add("cadre-fiche-photographe");

var divTagsPhotographe2 = document.createElement('div');
divTagsPhotographe2.id = "cadre-tags-photographe";
divTagsPhotographe2.classList.add("cadre-tags-photographe");

var lienProfil2 = document.createElement("a");
lienProfil2.classList.add('lien-profil2');
lienProfil2.classList.add('lien-profil');
lienProfil2.href = "";

var imageProfil2 = document.createElement("img");
imageProfil2.classList.add('photo-profil2');
imageProfil2.src = "/assets/FishEye_Photos/Sample Photos/Ellie Rose/Architecture_Horseshoe.jpg";

var h2Profil2 = document.createElement('h2');
h2Profil2.classList.add('nom-profil2');
h2Profil2.innerHTML = "Ellie-Rose Wilkens";

var villeProfil2 = document.createElement('address');
villeProfil2.classList.add('ville-profil2');
villeProfil2.innerHTML = "Paris, France";

var p1Profil2 = document.createElement('p');
p1Profil2.classList.add('citation-profil2');
p1Profil2.classList.add('citation-profil');
p1Profil2.innerHTML = "Travail sur des compositions complexes";

var p2Profil2 = document.createElement('p');
p2Profil2.classList.add('prix-profil2');
p2Profil2.classList.add('prix-profil');
p2Profil2.innerHTML = "250€/jour";

//Profil 3
var articleProfil3 = document.createElement("article");
articleProfil3.id = "cadre-profil";
articleProfil3.classList.add('cadre-profil');

var figureProfil3 = document.createElement("figure");
figureProfil3.id = "cadre-photographe";
figureProfil3.classList.add("cadre-photographe");

var divFichePhotographe3 = document.createElement('div');
divFichePhotographe3.id = "cadre-fiche-photographe";
divFichePhotographe3.classList.add("cadre-fiche-photographe");

var divTagsPhotographe3 = document.createElement('div');
divTagsPhotographe3.id = "cadre-tags-photographe";
divTagsPhotographe3.classList.add("cadre-tags-photographe");

var lienProfil3 = document.createElement("a");
lienProfil3.classList.add('lien-profil3');
lienProfil3.classList.add('lien-profil');
lienProfil3.href = "";

var imageProfil3 = document.createElement("img");
imageProfil3.classList.add('photo-profil3');
imageProfil3.src = "/assets/FishEye_Photos/Sample Photos/Tracy/Fashion_Urban_Jungle.jpg";

var h2Profil3 = document.createElement('h2');
h2Profil3.classList.add('nom-profil3');
h2Profil3.innerHTML = "Tracy Galindo";

var villeProfil3 = document.createElement('address');
villeProfil3.classList.add('ville-profil3');
villeProfil3.innerHTML = "Montreal, Canada";

var p1Profil3 = document.createElement('p');
p1Profil3.classList.add('citation-profil3');
p1Profil3.classList.add('citation-profil');
p1Profil3.innerHTML = "Photographe, freelance";

var p2Profil3 = document.createElement('p');
p2Profil3.classList.add('prix-profil3');
p2Profil3.classList.add('prix-profil');
p2Profil3.innerHTML = "500€/jour";

//Profil 4
var articleProfil4 = document.createElement("article");
articleProfil4.id = "cadre-profil";
articleProfil4.classList.add('cadre-profil');

var figureProfil4 = document.createElement("figure");
figureProfil4.id = "cadre-photographe";
figureProfil4.classList.add("cadre-photographe");

var divFichePhotographe4 = document.createElement('div');
divFichePhotographe4.id = "cadre-fiche-photographe";
divFichePhotographe4.classList.add("cadre-fiche-photographe");

var divTagsPhotographe4 = document.createElement('div');
divTagsPhotographe4.id = "cadre-tags-photographe";
divTagsPhotographe4.classList.add("cadre-tags-photographe");

var lienProfil4 = document.createElement("a");
lienProfil4.classList.add('lien-profil4');
lienProfil4.classList.add('lien-profil');
lienProfil4.href = "";

var imageProfil4 = document.createElement("img");
imageProfil4.classList.add('photo-profil4');
imageProfil4.src = "/assets/FishEye_Photos/Sample Photos/Nabeel/Travel_Outdoor_Baths.jpg";

var h2Profil4 = document.createElement('h2');
h2Profil4.classList.add('nom-profil4');
h2Profil4.innerHTML = "Nabeel Bradford";

var villeProfil4 = document.createElement('address');
villeProfil4.classList.add('ville-profil4');
villeProfil4.innerHTML = "Mexico City, Mexico";

var p1Profil4 = document.createElement('p');
p1Profil4.classList.add('citation-profil4');
p1Profil4.classList.add('citation-profil');
p1Profil4.innerHTML = "Je vais toujours de l'avant";

var p2Profil4 = document.createElement('p');
p2Profil4.classList.add('prix-profil4');
p2Profil4.classList.add('prix-profil');
p2Profil4.innerHTML = "350€/jour";

//Profil 5
var articleProfil5 = document.createElement("article");
articleProfil5.id = "cadre-profil";
articleProfil5.classList.add('cadre-profil');

var figureProfil5 = document.createElement("figure");
figureProfil5.id = "cadre-photographe";
figureProfil5.classList.add("cadre-photographe");

var divFichePhotographe5 = document.createElement('div');
divFichePhotographe5.id = "cadre-fiche-photographe";
divFichePhotographe5.classList.add("cadre-fiche-photographe");

var divTagsPhotographe5 = document.createElement('div');
divTagsPhotographe5.id = "cadre-tags-photographe";
divTagsPhotographe5.classList.add("cadre-tags-photographe");

var lienProfil5 = document.createElement("a");
lienProfil5.classList.add('lien-profil5');
lienProfil5.classList.add('lien-profil');
lienProfil5.href = "";

var imageProfil5 = document.createElement("img");
imageProfil5.classList.add('photo-profil5');
imageProfil5.src = "/assets/FishEye_Photos/Sample Photos/Rhode/Fashion_Melody_Red_on_Stripes.jpg";

var h2Profil5 = document.createElement('h2');
h2Profil5.classList.add('nom-profil5');
h2Profil5.innerHTML = "Rhode Dubois";

var villeProfil5 = document.createElement('address');
villeProfil5.classList.add('ville-profil5');
villeProfil5.innerHTML = "Mexico City, Mexico";

var p1Profil5 = document.createElement('p');
p1Profil5.classList.add('citation-profil5');
p1Profil5.classList.add('citation-profil');
p1Profil5.innerHTML = "Créatrice de souvenirs";

var p2Profil5 = document.createElement('p');
p2Profil5.classList.add('prix-profil5');
p2Profil5.classList.add('prix-profil');
p2Profil5.innerHTML = "375€/jour";

//Profil 6
var articleProfil6 = document.createElement("article");
articleProfil6.id = "cadre-profil";
articleProfil6.classList.add('cadre-profil');

var figureProfil6 = document.createElement("figure");
figureProfil6.id = "cadre-photographe";
figureProfil6.classList.add("cadre-photographe");

var divFichePhotographe6 = document.createElement('div');
divFichePhotographe6.id = "cadre-fiche-photographe";
divFichePhotographe6.classList.add("cadre-fiche-photographe");

var divTagsPhotographe6 = document.createElement('div');
divTagsPhotographe6.id = "cadre-tags-photographe";
divTagsPhotographe6.classList.add("cadre-tags-photographe");

var lienProfil6 = document.createElement("a");
lienProfil6.classList.add('lien-profil6');
lienProfil6.classList.add('lien-profil');
lienProfil6.href = "";

var imageProfil6 = document.createElement("img");
imageProfil6.classList.add('photo-profil6');
imageProfil6.src = "/assets/FishEye_Photos/Sample Photos/Marcel/Travel_Tower.jpg";

var h2Profil6 = document.createElement('h2');
h2Profil6.classList.add('nom-profil6');
h2Profil6.innerHTML = "Marcel Nikolic";

var villeProfil6 = document.createElement('address');
villeProfil6.classList.add('ville-profil6');
villeProfil6.innerHTML = "Berlin, Germany";

var p1Profil6 = document.createElement('p');
p1Profil6.classList.add('citation-profil6');
p1Profil6.classList.add('citation-profil');
p1Profil6.innerHTML = "Toujours à la recherche de LA photo";

var p2Profil6 = document.createElement('p');
p2Profil6.classList.add('prix-profil6');
p2Profil6.classList.add('prix-profil');
p2Profil6.innerHTML = "300€/jour";

//Intégration des différentes balises
//Nav-Bar
nav.appendChild(navTagBar);
navBar[0].appendChild(tagPortrait.cloneNode([true]));
navBar[0].appendChild(tagArt.cloneNode([true]));
navBar[0].appendChild(tagFashion.cloneNode([true]));
navBar[0].appendChild(tagArchitecture.cloneNode([true]));
navBar[0].appendChild(tagTravel.cloneNode([true]));
navBar[0].appendChild(tagSports.cloneNode([true]));
navBar[0].appendChild(tagAnimals.cloneNode([true]));
navBar[0].appendChild(tagEvents.cloneNode([true]));

//Profil 1
selectionPhotographes.appendChild(articleProfil1);
cadreProfil[0].appendChild(figureProfil1);
cadreProfil[0].appendChild(divFichePhotographe1);
cadreProfil[0].appendChild(divTagsPhotographe1);
cadrePhotographe[0].appendChild(lienProfil1);
cadreLienPhotographe[0].appendChild(imageProfil1);
cadrePhotographe[0].appendChild(h2Profil1);
cadreFichePhotographe[0].appendChild(villeProfil1);
cadreFichePhotographe[0].appendChild(p1Profil1);
cadreFichePhotographe[0].appendChild(p2Profil1);
cadreTagsPhotographe[0].appendChild(tagPortrait.cloneNode([true]));
cadreTagsPhotographe[0].appendChild(tagEvents.cloneNode([true]));
cadreTagsPhotographe[0].appendChild(tagTravel.cloneNode([true]));
cadreTagsPhotographe[0].appendChild(tagAnimals.cloneNode([true]));


//Profil 2
selectionPhotographes.appendChild(articleProfil2);
cadreProfil[1].appendChild(figureProfil2);
cadreProfil[1].appendChild(divFichePhotographe2);
cadreProfil[1].appendChild(divTagsPhotographe2);
cadrePhotographe[1].appendChild(lienProfil2);
cadreLienPhotographe[1].appendChild(imageProfil2);
cadrePhotographe[1].appendChild(h2Profil2);
cadreFichePhotographe[1].appendChild(villeProfil2);
cadreFichePhotographe[1].appendChild(p1Profil2);
cadreFichePhotographe[1].appendChild(p2Profil2);
cadreTagsPhotographe[1].appendChild(tagSports.cloneNode([true]));
cadreTagsPhotographe[1].appendChild(tagArchitecture.cloneNode([true]));


//Profil 3
selectionPhotographes.appendChild(articleProfil3);
cadreProfil[2].appendChild(figureProfil3);
cadreProfil[2].appendChild(divFichePhotographe3);
cadreProfil[2].appendChild(divTagsPhotographe3);
cadrePhotographe[2].appendChild(lienProfil3);
cadreLienPhotographe[2].appendChild(imageProfil3);
cadrePhotographe[2].appendChild(h2Profil3);
cadreFichePhotographe[2].appendChild(villeProfil3);
cadreFichePhotographe[2].appendChild(p1Profil3);
cadreFichePhotographe[2].appendChild(p2Profil3);
cadreTagsPhotographe[2].appendChild(tagArt.cloneNode([true]));
cadreTagsPhotographe[2].appendChild(tagFashion.cloneNode([true]));
cadreTagsPhotographe[2].appendChild(tagEvents.cloneNode([true]));

//Profil 4
selectionPhotographes.appendChild(articleProfil4);
cadreProfil[3].appendChild(figureProfil4);
cadreProfil[3].appendChild(divFichePhotographe4);
cadreProfil[3].appendChild(divTagsPhotographe4);
cadrePhotographe[3].appendChild(lienProfil4);
cadreLienPhotographe[3].appendChild(imageProfil4);
cadrePhotographe[3].appendChild(h2Profil4);
cadreFichePhotographe[3].appendChild(villeProfil4);
cadreFichePhotographe[3].appendChild(p1Profil4);
cadreFichePhotographe[3].appendChild(p2Profil4);
cadreTagsPhotographe[3].appendChild(tagTravel.cloneNode([true]));
cadreTagsPhotographe[3].appendChild(tagPortrait.cloneNode([true]));

//Profil 5
selectionPhotographes.appendChild(articleProfil5);
cadreProfil[4].appendChild(figureProfil5);
cadreProfil[4].appendChild(divFichePhotographe5);
cadreProfil[4].appendChild(divTagsPhotographe5);
cadrePhotographe[4].appendChild(lienProfil5);
cadreLienPhotographe[4].appendChild(imageProfil5);
cadrePhotographe[4].appendChild(h2Profil5);
cadreFichePhotographe[4].appendChild(villeProfil5);
cadreFichePhotographe[4].appendChild(p1Profil5);
cadreFichePhotographe[4].appendChild(p2Profil5);
cadreTagsPhotographe[4].appendChild(tagSports.cloneNode([true]));
cadreTagsPhotographe[4].appendChild(tagFashion.cloneNode([true]));
cadreTagsPhotographe[4].appendChild(tagEvents.cloneNode([true]));
cadreTagsPhotographe[4].appendChild(tagAnimals.cloneNode([true]));

//Profil 6
selectionPhotographes.appendChild(articleProfil6);
cadreProfil[5].appendChild(figureProfil6);
cadreProfil[5].appendChild(divFichePhotographe6);
cadreProfil[5].appendChild(divTagsPhotographe6);
cadrePhotographe[5].appendChild(lienProfil6);
cadreLienPhotographe[5].appendChild(imageProfil6);
cadrePhotographe[5].appendChild(h2Profil6);
cadreFichePhotographe[5].appendChild(villeProfil6);
cadreFichePhotographe[5].appendChild(p1Profil6);
cadreFichePhotographe[5].appendChild(p2Profil6);
cadreTagsPhotographe[5].appendChild(tagTravel.cloneNode([true]));
cadreTagsPhotographe[5].appendChild(tagArchitecture.cloneNode([true]));

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