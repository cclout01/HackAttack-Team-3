package com.hackattackt3.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hackattackt3.backend.model.VolunteeringPost;
import com.hackattackt3.backend.service.PositionService;

@RestController
@RequestMapping("/positions")
public class PositionController {

    private final PositionService positionService;

    public PositionController(PositionService positionService) {
        this.positionService = positionService;
    }

    // BE-4: GET /positions - public, with filters
    @GetMapping
    public List<VolunteeringPost> getAllPositions(
        @RequestParam(required = false) String sort,
        @RequestParam(required = false) String location,
        @RequestParam(required = false) String difficulty,
        @RequestParam(required = false) String urgency
    ) {
        // TODO: connect to Firebase and apply filters
        return positionService.getAllPositions(sort, location, difficulty, urgency);
    }

    // Public - get one position
    @GetMapping("/{id}")
    public VolunteeringPost getPositionById(@PathVariable String id) {
        // TODO: connect to Firebase
        return null;
    }

    // BE-5: POST /positions - Organization only
    @PostMapping
    public VolunteeringPost createPosition(@RequestBody VolunteeringPost post) {
        // TODO: save to Firebase
        return post;
    }

    // BE-7: GET /positions/{id}/applicants - Organization owner only
    @GetMapping("/{id}/applicants")
    public List<String> getApplicants(@PathVariable String id) {
        // TODO: verify org ownership and connect to Firebase
        return new ArrayList<>();
    }

    // BE-8: POST /positions/{id}/confirm - Organization only
    @PostMapping("/{id}/confirm")
    public void confirmVolunteer(@PathVariable String id) {
        // TODO: connect to Firebase
    }

    // BE-6: POST /positions/{id}/apply - Volunteer only
    @PostMapping("/{id}/apply")
    public void applyToPosition(@PathVariable String id) {
        // TODO: create application record with status PENDING
    }
}
