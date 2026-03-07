package com.hackattackt3.backend.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    // Volunteer - guardar vacante
    @PostMapping("/{id}/save/{positionId}")
    public void savePosition(@PathVariable String id, @PathVariable String positionId) {
        // TODO: conectar con Firebase
    }
}
