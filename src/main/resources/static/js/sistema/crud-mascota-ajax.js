//CRUD Usado AJAX
alert('Funciona el archivo de CRUD - AJAX');

function obtenerMascotas() {

}

function guardarMascota(){
    nombre_mascota = document.getElementById("nombre_mascota").value;
    edad_mascota = document.getElementById("edad_mascota").value;
    raza_mascota = document.getElementById("raza_mascota").value;
    observaciones_mascota = document.getElementById("observaciones_mascota").value;
    //Validar de forma simple los campos - EXPRESIONES REGULARES
    if(nombre_mascota && edad_mascota>0 && observaciones_mascota){
        $.ajax({
            url: "/v1/api/mascota",
            contentType:"application/json",
            method:"POST",
            data: JSON.stringify({
                nombre:nombre_mascota,
                edad:edad_mascota,
                raza:raza_mascota,
                observaciones:observaciones_mascota
            }),
            success: function( resultado ) {
                if(resultado.estado==1){
                    //Todo bien
                    let botones ='<button type="button" class="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#editModal" onclick="seleccionarMascotaActualizar('+resultado.mascota.id+');">Edit</button>';
                    botones = botones + ' <button type="button" class="btn btn-danger mb-2" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="seleccionarMascotaEliminar('+resultado.mascota.id+');">Delete</button>\n';

                    $('#example').DataTable().row.add([
                        resultado.mascota.id,
                        resultado.mascota.nombre,
                        resultado.mascota.edad,
                        botones
                    ]).draw();

                    //Nos falta poner el id al Renglon

                    alert(resultado.estado.mensaje);
                }else{
                    //Todo mal
                    alert(estado.mensaje);
                }
            },
            error:function (xhr,error,mensaje) {
                //Se dispara la funcion si no conexion al servidor
                alert("Error de comunicacion: "+error);
            }
        });
    }else{
        alert("Ingresa los datos correctamente")
    }
}

function seleccionarMascotaActualizar() {

}

function actualizarMascota() {

}

function seleccionarMascotaEliminar(){

}

function elemiminarMascota() {

}



