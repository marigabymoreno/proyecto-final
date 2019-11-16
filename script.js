let caja= document.querySelector("#search-box input[type=search]");
let boton= document.querySelector("#search-box button");
let offset=0;
let resultados= {};

boton.addEventListener("click", searchResultados);



caja.addEventListener("keyup", function(event) {
    if(event.keyCode == 13) { 
        searchResultados();
    }
});

$(window).scroll(function() {
    if ($(window).scrollTop() == $(document).height() - $(window).height())
    {
        searchResultados();
    }
});

function searchResultados(){

    let url = "http://api.giphy.com/v1/gifs/search?api_key=2HJEIkNChX5m54XYAqtjQRkQvLUUxDO1&offset="+offset+"&limit=15&q="+encodeURI(caja.value);
    console.log(url);
    offset = offset + 15;

    fetch(url).then ((response) => response.json()).then((data) => {
         resultados = data.data;
         createInfo();

    });
}

function salvar()
{
    this.setAttribute("class", "liked");   
}

function createInfo() {

    resultados.forEach(resultado => {
        const resultados_title = document.createElement("h2");
        const resultados_midia = document.createElement("img");
        const fav = document.createElement("button");
        fav.innerHTML = "salvar";
        fav.setAttribute("class", "not-liked");

        const icon = document.createElement("i");

        fav.appendChild(icon);

        fav.addEventListener("click", salvar); 

        resultados_title.textContent = resultado.title;
        resultados_midia.src = resultado.images.original.url;
        document.querySelector("#resultados").appendChild(resultados_midia);    
        document.querySelector("#resultados").appendChild(fav);    
    });
}



