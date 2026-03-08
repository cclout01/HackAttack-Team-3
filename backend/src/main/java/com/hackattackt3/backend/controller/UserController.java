package com.hackattackt3.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.hackattackt3.backend.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Volunteer only - save a position
    @PostMapping("/{id}/save/{positionId}")
    public void savePosition(
        @RequestHeader("Role") String role,
        @PathVariable String id,
        @PathVariable String positionId
    ) {
        if (!role.equals("VOLUNTEER")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }
        userService.savePosition(id, positionId);
    }
}
