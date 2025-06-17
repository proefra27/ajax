//CRUD Usado AJAX
//Variables globales
let idMascotaEliminar=0;

function obtenerMascotas() {
    $.ajax({
        method:"GET",
        url: "/v1/api/mascota",
        data: {},
        success: function( resultado ) {
            if(resultado.estado===1){
                let tabla=$('#example').DataTable();
                mascotas = resultado.mascotas;

                mascotas.forEach(mascota =>{
                    let botones ='<button type="button" class="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#editModal" onclick="seleccionarMascotaActualizar('+mascota.id+');">Edit</button>';
                    botones = botones + ' <button type="button" class="btn btn-danger mb-2" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="seleccionarMascotaEliminar('+mascota.id+');">Delete</button>\n';
                    tabla.row.add([
                        mascota.id,
                        mascota.nombre,
                        mascota.edad,
                        botones
                    ]).node().id='renglon_'+mascota.id;
                    tabla.draw()
                })
            }
        },
        error:function (xhr,error,mensaje){

        }
    });
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
                    let botones ='<button type="button" class="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#editModal" onclick="seleccionarMascotaActualizar('+resultado.mascota.id+');">Edit</button>';
                    botones = botones + ' <button type="button" class="btn btn-danger mb-2" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="seleccionarMascotaEliminar('+resultado.mascota.id+');">Delete</button>\n';

                    let tabla = $('#example').DataTable();
                    tabla.row.add([
                        resultado.mascota.id,
                        resultado.mascota.nombre,
                        resultado.mascota.edad,
                        botones
                    ]).node().id='renglon_'+resultado.mascota.id;

                    tabla.draw()
                    //Ocultar la Modal JQuery
                    $('#basicModal').hide()
                    alert(resultado.mensaje);
                }else{
                    //Todo mal
                    alert(resultado.mensaje);
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

function seleccionarMascotaActualizar(id) {

}

function actualizarMascota() {

}

function seleccionarMascotaEliminar(id){
    let datosMascota=$('#example').DataTable().row('#renglon_'+id).data()
    $('#nombre_eliminar').text(datosMascota[1]+' :(')
    idMascotaEliminar=id
}

function eliminarMascota() {
    $.ajax({
        method: "POST",
        url: "/v1/api/mascota/eliminar",
        contentType:"application/json",
        data:JSON.stringify({
            id:idMascotaEliminar,
        }),
        success: function( resultado ) {
            if(resultado.estado===1){
                //Eliminar el renglon del DataTable
                $('#example').DataTable().row('#renglon_'+idMascotaEliminar).remove().draw();
                alert(resultado.mensaje);
            }else{
                alert(resultado.mensaje)
            }
        },
        error:function (xhr,error,mensaje){
            alert("Error de comunicacion "+error)
        }
    });
}



