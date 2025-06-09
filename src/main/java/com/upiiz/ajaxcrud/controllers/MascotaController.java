package com.upiiz.ajaxcrud.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@Controller
public class MascotaController {

    @GetMapping("/mascota")
    public String mascota() {
        return "mascota";
    }

    @PostMapping("/v1/api/mascota")
    public ResponseEntity<Map<String,Object>> mascotaPost(@RequestBody Map<String,Object> objetoMascota) {
        //Solo para probar la funcionalidad se envia al front lo mismo
        //1.- Debemos crear un objeto mascota
        //2.- Debemos mandar llamar al servicio -> definido de un repositorio
        return ResponseEntity.ok(objetoMascota);
    }
}
