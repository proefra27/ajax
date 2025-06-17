package com.upiiz.ajaxcrud.controllers;

import com.upiiz.ajaxcrud.models.MascotaModel;
import com.upiiz.ajaxcrud.services.MascotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

@Controller
public class MascotaController {

    @Autowired
    private MascotaService mascotaService;

    @GetMapping("/mascota")
    public String mascota() {
        return "mascota";
    }

    @GetMapping("/v1/api/mascota")
    public ResponseEntity<Map<String,Object>> getAllMascotas() {
        List<MascotaModel> mascotas=mascotaService.findAllMascotas();
        return ResponseEntity.ok(Map.of(
                "estado",1,
                "mensaje","Listado de mascotas",
                "mascotas",mascotas
        ));
    }

    @PostMapping("/v1/api/mascota")
    public ResponseEntity<Map<String,Object>> mascotaPost(@RequestBody Map<String,Object> objetoMascota) {
        MascotaModel mascota = new MascotaModel(
                objetoMascota.get("nombre").toString(),
                Integer.parseInt(objetoMascota.get("edad").toString()),
                Integer.parseInt(objetoMascota.get("raza").toString()),
                objetoMascota.get("observaciones").toString()
        );
        //Esta mascota ya trae su id, que es util para el Front
        MascotaModel mascotaGuardada=mascotaService.save(mascota);
        if(mascotaGuardada!=null)
            return ResponseEntity.ok(Map.of(
                    "estado",1,
                    "mensaje","Mascota guardada correctamente",
                    "mascota", mascotaGuardada
            ));
        else
            return ResponseEntity.ok(Map.of(
                    "estado",0,
                    "mensaje","Error: No se pudo guardar la mascota",
                    "mascota", objetoMascota
            ));
    }

    @PostMapping("/v1/api/mascota/eliminar")
    public ResponseEntity<Map<String,Object>> mascotaDelete(
            @RequestBody Map<String,Object> objetoMascota) {

        int id = Integer.parseInt(objetoMascota.get("id").toString());

        if(mascotaService.delete(id) > 0){
            return ResponseEntity.ok(Map.of(
                    "estado",1,
                    "mensaje","Mascota eliminada"
            ));
        }else {
            return ResponseEntity.ok(Map.of(
                    "estado",0,
                    "mensaje","No se pudo eliminar la mascota"
            ));
        }
    }
}
