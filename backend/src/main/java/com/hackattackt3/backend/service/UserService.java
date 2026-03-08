package com.hackattackt3.backend.service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.hackattackt3.backend.model.Volunteer;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private static final String COLLECTION = "users";

    // Volunteer only - save a position
    public void savePosition(String userId, String positionId) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        Volunteer volunteer = db.collection(COLLECTION).document(userId).get().get().toObject(Volunteer.class);
        if (volunteer != null) {
            List<String> savedPosts = volunteer.getSavedPosts() != null ? volunteer.getSavedPosts() : new ArrayList<>();
            savedPosts.add(positionId);
            db.collection(COLLECTION).document(userId).update("savedPosts", savedPosts).get();
        }
    }
}