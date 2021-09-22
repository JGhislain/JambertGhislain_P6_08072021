const params = new URLSearchParams(location.search)
console.log((location.search))

fetch('/assets/json/listeObjets.json')
.then(response => response.json())
.then(response => {
    
    //profilsPhotographes(response.photographers)
    allMedia = response.media;
    console.log(allMedia)
});