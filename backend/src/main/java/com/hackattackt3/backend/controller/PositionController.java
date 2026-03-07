package com.hackattackt3.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackattackt3.backend.model.VolunteeringPost;

@RestController
@RequestMapping("/positions")
public class PositionController {

    // post for all positions (public)
    @GetMapping
    public List<VolunteeringPost> getAllPositions() {
        return null; // TODO: connect to firebase 
    }

    // position by id (public)
    @GetMapping("/{id}")
    public VolunteeringPost getPositionById(@PathVariable String id) {
        return null; // TODO: connect to firebase
    }

    // creat post (public)
    @PostMapping
    public VolunteeringPost createPosition(@RequestBody VolunteeringPost post) {
        return null; // TODO: conectar con Firebase
    }

    // Organization - ver aplicantes
    @GetMapping("/{id}/applicants")
    public List<String> getApplicants(@PathVariable String id) {
        return null; // TODO: conectar con Firebase
    }

    // Organization - confirmar voluntario
    @PostMapping("/{id}/confirm")
    public void confirmVolunteer(@PathVariable String id) {
        // TODO: conectar con Firebase
    }

    // Volunteer - aplicar a vacante
    @PostMapping("/{id}/apply")
    public void applyToPosition(@PathVariable String id) {
        // TODO: conectar con Firebase
    }
}
