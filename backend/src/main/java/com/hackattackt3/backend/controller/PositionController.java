package com.hackattackt3.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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
    ) throws Exception {
        return positionService.getAllPositions(sort, location, difficulty, urgency);
    }

    // Public - get one position
    @GetMapping("/{id}")
    public VolunteeringPost getPositionById(@PathVariable String id) throws Exception {
        return positionService.getPositionById(id);
    }

    // BE-5: POST /positions - Organization only
    @PostMapping
    public VolunteeringPost createPosition(
        @RequestHeader("Role") String role,
        @RequestBody VolunteeringPost post
    ) throws Exception {
        if (!role.equals("ORGANIZATION")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }
        return positionService.createPosition(post);
    }

    // BE-7: GET /positions/{id}/applicants - Organization owner only
    @GetMapping("/{id}/applicants")
    public List<String> getApplicants(
        @RequestHeader("Role") String role,
        @PathVariable String id
    ) throws Exception {
        if (!role.equals("ORGANIZATION")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }
        return positionService.getApplicants(id);
    }

    // BE-8: POST /positions/{id}/confirm - Organization only
    @PostMapping("/{id}/confirm")
    public void confirmVolunteer(
        @RequestHeader("Role") String role,
        @PathVariable String id
    ) throws Exception {
        if (!role.equals("ORGANIZATION")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }
        positionService.confirmVolunteer(id);
    }

    // BE-6: POST /positions/{id}/apply - Volunteer only
    @PostMapping("/{id}/apply")
    public void applyToPosition(
        @RequestHeader("Role") String role,
        @PathVariable String id
    ) throws Exception {
        if (!role.equals("VOLUNTEER")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }
        positionService.applyToPosition(id, "volunteerId"); // TODO: get real volunteerId
    }
}