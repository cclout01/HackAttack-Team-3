package com.hackattackt3.backend.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import com.hackattackt3.backend.model.Application;
import com.hackattackt3.backend.model.SavedPosition;
import com.hackattackt3.backend.service.ApplicationService;
import com.hackattackt3.backend.service.PositionService;
import com.hackattackt3.backend.service.SavedPositionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserController {

    private final SavedPositionService savedPositionService;
    private final PositionService positionService;
    private final ApplicationService applicationService;

    public UserController(SavedPositionService savedPositionService,
                          PositionService positionService,
                          ApplicationService applicationService) {
        this.savedPositionService = savedPositionService;
        this.positionService = positionService;
        this.applicationService = applicationService;
    }

    @PostMapping("/{id}/save/{positionId}")
    public ResponseEntity<SavedPosition> savePosition(
        @PathVariable String id,
        @PathVariable String positionId
    ) throws Exception {

        if (positionService.getPositionById(positionId) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Position not found");
        }

        if (savedPositionService.isAlreadySaved(id, positionId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                "You have already saved this position");
        }

        SavedPosition saved = savedPositionService.savePosition(id, positionId);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/{id}/saved")
    public List<SavedPosition> getSavedPositions(@PathVariable String id) throws Exception {
        return savedPositionService.getSavedPositionsByUserId(id);
    }

    @GetMapping("/{id}/applied")
    public List<Application> getAppliedPositions(@PathVariable String id) throws Exception {
        return applicationService.getApplicationsByUserId(id);
    }
}