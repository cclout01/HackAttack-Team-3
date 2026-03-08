package com.hackattackt3.backend.service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.hackattackt3.backend.model.Application;
import com.hackattackt3.backend.model.ApplicationStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ApplicationService {

    private static final String COLLECTION = "applications";

    public Application saveApplication(Application application) {
        if (application.getId() == null || application.getId().isEmpty()) {
            application.setId(UUID.randomUUID().toString());
        }

        if (application.getAppliedAt() == null) {
            application.setAppliedAt(LocalDateTime.now().toString());
        }

        if (application.getStatus() == null) {
            application.setStatus(ApplicationStatus.PENDING);
        }

        try {
            Firestore db = FirestoreClient.getFirestore();
            db.collection(COLLECTION)
              .document(application.getId())
              .set(application)
              .get();

            return application;
        } catch (Exception e) {
            throw new RuntimeException("Failed to save application", e);
        }
    }

    public List<Application> getApplicationsByUserId(String userId) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        List<Application> results = new ArrayList<>();

        db.collection(COLLECTION)
                .whereEqualTo("userId", userId)
                .get().get().getDocuments()
                .forEach(doc -> results.add(doc.toObject(Application.class)));

        return results;
    }
}