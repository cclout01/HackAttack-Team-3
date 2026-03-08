package com.hackattackt3.backend.service;

import com.hackattackt3.backend.model.Application;
import com.hackattackt3.backend.model.ApplicationStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ApplicationService {

    public Application saveApplication(Application application) {
        if (application.getId() == null || application.getId().isEmpty()) {
            application.setId(UUID.randomUUID().toString());
        }

        if (application.getAppliedAt() == null) {
            application.setAppliedAt(LocalDateTime.now());
        }

        if (application.getStatus() == null) {
            application.setStatus(ApplicationStatus.PENDING);
        }

        // Firebase logic goes here later

        return application;
    }
}