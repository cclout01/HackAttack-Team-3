package com.hackattackt3.backend.controller;

import com.hackattackt3.backend.model.SavedPosition;
import com.hackattackt3.backend.service.SavedPositionService;
import com.hackattackt3.backend.service.PositionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/users")
public class SavedPositionController {

    private final SavedPositionService savedPositionService;
    private final PositionService positionService;

    public SavedPositionController(SavedPositionService savedPositionService, 
                                   PositionService positionService) {
        this.savedPositionService = savedPositionService;
        this.positionService = positionService;
    }

    @PostMapping("/{id}/save/{positionId}")
    public ResponseEntity<SavedPosition> savePosition(
        @PathVariable String id,
        @PathVariable String positionId
    ) throws Exception {

        // Check VOLUNTEER role
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getAuthorities().stream()
                .noneMatch(a -> a.getAuthority().equals("VOLUNTEER"))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }

        // Check logged in user matches ID in URL
        String loggedInUserId = auth.getName();
        if (!loggedInUserId.equals(id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                "You cannot save positions for another user");
        }

        // Check position exists
        if (positionService.getPositionById(positionId) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Position not found");
        }

        // Check if already saved
        if (savedPositionService.isAlreadySaved(id, positionId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                "You have already saved this position");
        }

        // Save and return
        SavedPosition saved = savedPositionService.savePosition(id, positionId);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}