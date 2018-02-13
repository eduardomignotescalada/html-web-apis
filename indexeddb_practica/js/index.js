var db;
function init(){
    console.log("Dom cargado");
    $.getJSON("http://www.mocky.io/v2/5a54ae822d00005f235b1cd2", function(data){
        var data = data;
        console.log(data);

        //1.- CREACION DE LA BBDD
        var solicitud = indexedDB.open("miBase", 1);
        solicitud.onsuccess = function(event){
            db = event.target.result;
            cogeDatos();
        }

        //2.- CREACION DEL ALMACEN (almacen llamado "miBase" con un campo clave llamado "id" el cual es incremental)
        solicitud.onupgradeneeded = function(event){
            var db = event.target.result;
            var almacen = db.createObjectStore("libros", { keyPath: "id", autoIncrement:true });

            // Se usa transaction.oncomplete para asegurarse que la creación del almacén 
            // haya finalizado antes de añadir los datos en el.
            almacen.transaction.oncomplete = function(event) {
                // Guarda los datos en el almacén recién creado.
                var libroAlmancen = db.transaction("libros", "readwrite").objectStore("libros");
                for (var dato of data) {
                libroAlmancen.add({titulo: dato.titulo, autor: dato.autor});
                }
                
            }   
        }
    });
}

function cogeDatos(){
    //----------------------------------------------------------------------
    var transaccion = db.transaction(["libros"], "readonly");                // Definimos el tipo de transacción, en este caso es "readwrite"
    var almacen = transaccion.objectStore("libros");                         // Seleccionamos el almacen al cual agregaremos objetos
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
        zonadatos.innerHTML +=`
        <tr>
            <th scope="row">${item.id}</th>
            <td>${item.titulo}</td>
            <td>${item.autor}</td>
        </tr>`;
    }
}
window.addEventListener("load", init);