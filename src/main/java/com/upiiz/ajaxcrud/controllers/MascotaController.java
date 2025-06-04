package com.upiiz.ajaxcrud.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MascotaController {

    @GetMapping("/mascota")
    public String mascota() {
        return "mascota";
    }
}
