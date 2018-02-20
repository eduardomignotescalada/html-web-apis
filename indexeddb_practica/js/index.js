var db;
var datosAMostrar;
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
    var transaccion = db.transaction(["libros"], "readonly");                // Definimos el tipo de transacción, en este caso es "readonly"
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
            //console.log(datos);
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
            <td><button onclick="editarDato('editar-${item.id}', '${item.id}')" id='editar-${item.id}'data-id='${item.id}' class='btn btn-warning'>Editar</button></td>
            <td><button onclick="mostrarDatoParticular('mostrar-${item.id}')" id='mostrar-${item.id}'data-id='${item.id}' class='btn btn-primary'>Mostrar</button></td>
            <td><button id='borrar-${item.id}'data-id='${item.id}' class='btn btn-danger'>Borrar</button></td>
        </tr>`;
    }
    var numDatos=datos.length;
    var numTotalPaginas=Math.round(numDatos/10);
    console.log(numTotalPaginas);
    datosAMostrar = datos;
}



function mostrarDatoParticular(id){
    window.history.pushState(null, null, `${id}.html`);
    let volver = document.getElementById("volver");
    volver.classList.toggle("d-none");
    console.log(datosAMostrar);
    var botonMostrar = document.getElementById(id).parentElement;
    let fila = botonMostrar.parentElement;
    console.log(fila);
    zonadatos.innerHTML="";
    zonadatos.innerHTML=`${fila.innerHTML}`;

}

function veAtras(){
    volver.classList.toggle("d-none");
    //Sección contenidoCabecera on/off
    //contenidoCabecera.classList.toggle("d-none");

    //Sección contenido on/off
    contenido.classList.toggle("d-none");

    
    //Sección editar on/off
    //editarCabecera.classList.toggle("d-none");

    //Sección editar on/off
    editar.classList.toggle("d-none");

    window.history.back();
    mostrarDatos(datosAMostrar);
}

function editarDato(id, dataId){
    window.history.pushState(null, null, `${id}.html`);
    volver.classList.toggle("d-none");
    
    //Sección contenidoCabecera on/off
    //let contenidoCabecera = document.getElementById("contenidoCabecera");
    //contenidoCabecera.classList.toggle("d-none");
    
    //Sección contenido on/off
    var contenido = document.getElementById("contenido");
    contenido.classList.toggle("d-none");

    //Sección editarCabecera on/off
    //let editarCabecera = document.getElementById("editarCabecera");
    //editarCabecera.classList.toggle("d-none");
    
    //Sección editar on/off
    let editar = document.getElementById("editar");
    //editar.classList.toggle("d-none");
    

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("editar").innerHTML = this.responseText;
            $.getScript("js/editar.js")
                .done(function(script, textStatus) {
                    console.log(textStatus);
                    console.log(dataId);
                    selecionaElemento(dataId);
                })
                .fail(function(jqxhr, settings, exception) {
                    $("div.log").text("Triggered ajaxError handler.");
                });

        }
    };
    xhttp.open("GET", "editar.html", true);
    xhttp.send();
    

}



window.addEventListener("load", init);