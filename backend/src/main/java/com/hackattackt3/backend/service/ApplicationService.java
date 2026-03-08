package com.hackattackt3.backend.service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
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

        try {
            Firestore db = FirestoreClient.getFirestore();
            db.collection("applications")
              .document(application.getId())
              .set(application);

            return application;
        } catch (Exception e) {
            throw new RuntimeException("Failed to save application", e);
        }
    }
}