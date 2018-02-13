var db;
function init (){
 //----------------------------------------------------------------------
    var zonadatos = document.getElementById("zonadatos");
    var boton = document.getElementById("grabar");
    boton.addEventListener("click", agregaObjeto);
 //----------------------------------------------------------------------

    //1.- CREACION DE LA BBDD
    var solicitud = indexedDB.open("miBase", 1);
    solicitud.onsuccess = function(event){
        db = event.target.result;
        cogeDatos();
    }

    //2.- CREACION DEL ALMACEN (almacen llamado "peliculas" con un campo clave llamado "clave")
    solicitud.onupgradeneeded = function(event){
        var db = event.target.result;
        var almacen = db.createObjectStore("peliculas", {keyPath: "clave"});
    }
}


function agregaObjeto(){
 //----------------------------------------------------------------------
    var clave =document.getElementById("clave").value;
    var titulo =document.getElementById("titulo").value;
    var fecha =document.getElementById("fecha").value;
 //----------------------------------------------------------------------

    //3.- AGREGAMOS OBJETOS
//----------------------------------------------------------------------
    var transaccion = db.transaction(["peliculas"], "readwrite");               // Definimos el tipo de transacción, en este caso es "readwrite"
    var almacen = transaccion.objectStore("peliculas");                         // Seleccionamos el almacen al cual agregaremos objetos
//----------------------------------------------------------------------
    var agregar = almacen.add({clave: clave, titulo: titulo, fecha: fecha});    //Pasamos los datos da cada campo del formulario y lo agrega a la BBDD

    document.getElementById("clave").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("fecha").value = "";
}

function cogeDatos(){
//----------------------------------------------------------------------
    var transaccion = db.transaction(["peliculas"], "readonly");                // Definimos el tipo de transacción, en este caso es "readwrite"
    var almacen = transaccion.objectStore("peliculas");                         // Seleccionamos el almacen al cual agregaremos objetos
//----------------------------------------------------------------------
    var datos=[];    
    almacen.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        //console.log(cursor.value);
        if (cursor) {
            //console.log(cursor.value);
            datos.push(cursor.value);
            //console.log(datos);
            cursor.continue();
        }
        else {
            //alert("No more entries!");
            mostrarDatos(datos);
        }
    };  
    
}

function mostrarDatos(datos){
    var zonadatos=document.getElementById("zonadatos");
    for (let item of datos){
        zonadatos.innerHTML +=`<div>${item.clave} - ${item.titulo} - ${item.fecha}</div>`;
    }
}

window.addEventListener("load", init);