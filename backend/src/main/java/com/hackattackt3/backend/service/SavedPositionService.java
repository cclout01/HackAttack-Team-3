package com.hackattackt3.backend.service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.hackattackt3.backend.model.SavedPosition;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class SavedPositionService {

    private static final String COLLECTION = "saved_positions";

    public boolean isAlreadySaved(String userId, String positionId) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        List<SavedPosition> results = new ArrayList<>();

        db.collection(COLLECTION)
                .whereEqualTo("userId", userId)
                .whereEqualTo("positionId", positionId)
                .get().get().getDocuments()
                .forEach(doc -> results.add(doc.toObject(SavedPosition.class)));

        return !results.isEmpty();
    }

    public SavedPosition savePosition(String userId, String positionId) throws Exception {
        Firestore db = FirestoreClient.getFirestore();

        SavedPosition savedPosition = new SavedPosition();
        savedPosition.setId(UUID.randomUUID().toString());
        savedPosition.setUserId(userId);
        savedPosition.setPositionId(positionId);
        savedPosition.setSavedAt(LocalDateTime.now().toString());

        db.collection(COLLECTION)
                .document(savedPosition.getId())
                .set(savedPosition)
                .get();

        return savedPosition;
    }

    public List<SavedPosition> getSavedPositionsByUserId(String userId) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        List<SavedPosition> results = new ArrayList<>();

        db.collection(COLLECTION)
                .whereEqualTo("userId", userId)
                .get().get().getDocuments()
                .forEach(doc -> results.add(doc.toObject(SavedPosition.class)));

        return results;
    }
}