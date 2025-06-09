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
                alert(resultado);
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



