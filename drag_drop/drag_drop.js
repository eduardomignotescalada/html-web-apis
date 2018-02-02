
/*
1.- Crea un fichero HTML con un fichero JS asociado
2.- Crea un div contenedor que tenag 3 divs dentro
3.- Pinta los 3 divs para que quepan los tes a la vez a la misma altura y tengan fondo rojo
4.- El primer div será arratrable, comprueba que se puede arrastrar
5.- asigna el evento dragstart al primer div, asócialo con una función llamada empezando
6.- dentro de la función empezando(comenzar) recuerda mandar un dato con el índice "iden" y con el valor del identificativo del primer div (setData)
7.- Haz que cuando se haya entrado en el segundo div saque un mensaje por consola (arrastrando)
8.- Haz que cuando se haya salido del segundo div saque un mensaje por consola
9.- Haz que cuando se pasee sobre el tercer div anule el comportamiento por defecto (arrastrando)
10.- Haz cuando se suelte el arrastrable (drop) en el tercer párrafo, anula el comportamiento por defecto y saca un mensaje por pantalla
11.- En la función anterior saca por pantalla el identificativo del div que se haya mandado en el dragstart
*/


function comenzar(event){

    console.log("Comenzando");
    var data = event.target.id;
    event.dataTransfer.setData("text", data);

    console.log(data);
}

function entrar(event){
    event.preventDefault();
    console.log("Entrando en el div con id", event.target.id);
}

function salir(event){
    event.preventDefault();
    console.log("Saliendo del div con id", event.target.id);

}

function encima(event){
    console.log("Encima del elemento destino");
    event.preventDefault();// La función asociada al "dragover" necesita un preventDefault obligatoriamente.
}

function soltar (event){
    event.preventDefault();

    var data = event.dataTransfer.getData("text");
    var midiv = document.getElementById("col3")
    midiv.innerHTML += "<p>Elemento arrastrado "+ data +"</p>";
    console.log("el div origen es ", data);
}




function init(){
    console.log("DOM cargado");

    var c1 = document.getElementById("col1");
    
    var c2 = document.getElementById("col2");
    var c3 =document.getElementById("col3");
    c1.addEventListener("dragstart", comenzar);
    c2.addEventListener("dragenter", entrar);
    c2.addEventListener("dragleave", salir);
    c3.addEventListener("dragover", encima);
    c3.addEventListener("drop", soltar);

    console.log(c1);


}
document.addEventListener("DOMContentLoaded", init);    