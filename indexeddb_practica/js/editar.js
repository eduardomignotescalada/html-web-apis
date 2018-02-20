
function selecionaElemento(dataId){
    getData(dataId);
    function getData(dataId) {
        //----------------------------------------------------------------------
        var transaccion = db.transaction(["libros"], "readwrite");                // Definimos el tipo de transacción, en este caso es "readonly"
        var almacen = transaccion.objectStore("libros");                         // Seleccionamos el almacen al cual agregaremos objetos
        //----------------------------------------------------------------------
        
        
        //----------------------------------------------------------------------
        // report on the success of the transaction completing, when everything is done
        transaccion.oncomplete = function(event) {
        console.log("en oncomplete");
        };

        transaccion.onerror = function(event) {
        console.log("en onerror");
        };
        //----------------------------------------------------------------------


        //----------------------------------------------------------------------
        // create an object store on the transaction
        //var almacen = transaccion.objectStore("libros"); // esta linea es innecesaria

        // Make a request to get a record by key from the object store
        var solicitudAlmacen = almacen.get(parseInt(dataId));
        //----------------------------------------------------------------------



        solicitudAlmacen.onsuccess = function(event) {
        // report the success of our request
        console.log(solicitudAlmacen);
        
        var elDato = solicitudAlmacen.result;
        document.getElementById("elDato").innerHTML=`
        <div>
            
            <h2>Título</h2>
            <div>${elDato.titulo}</div>
            <h2>Autor</h2>
            <div>${elDato.autor}</div>
        </div>
        `;

        console.log(elDato);
        };

        solicitudAlmacen.onfaileure = function(event) {
            // report the success of our request
            console.log("Fallo");
    
            };

    };

    editar.classList.toggle("d-none");
    

}

