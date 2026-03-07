package com.hackattackt3.backend.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    // Admin - resetear password
    @PostMapping("/users/{id}/reset-password")
    public void resetPassword(@PathVariable String id) {
        // TODO: conectar con Firebase
    }
}
