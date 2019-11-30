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
    alert("Imagem de id: "+this.id+" foi salva!")  

}

function createInfo() {


    resultados.forEach(resultado => {
        const resultados_midia = document.createElement("img");

        resultados_midia.src = resultado.images.fixed_width
        .url;
        resultados_midia.id = resultado.id;

        resultados_midia.addEventListener("click", salvar)
        document.querySelector("#resultados").appendChild(resultados_midia);  
    
    });
}

// let item = {
// "id" : id,
// "title" : title,
// "url" : url,
// }

// fetch('gifs', {
// metfod: 'post' ,
// headers: {
//     'Accept': 'application/json, text/plain, */*',
//     'Content-Type': 'application/json'
// },
// body: JSON.stringify (item)
// }).then(res => res.json())
//   .then(res => console.log(res));