package com.hackattackt3.backend.service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.hackattackt3.backend.model.SavedPosition;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class SavedPositionService {

    private static final String COLLECTION = "saved_positions";

    // Check if position is already saved
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

    // Save a position
    public SavedPosition savePosition(String userId, String positionId) throws Exception {
        Firestore db = FirestoreClient.getFirestore();

        SavedPosition savedPosition = new SavedPosition();
        savedPosition.setUserId(userId);
        savedPosition.setPositionId(positionId);
        savedPosition.setSavedAt(LocalDateTime.now().toString());

        db.collection(COLLECTION).document().set(savedPosition).get();
        return savedPosition;
    }
}