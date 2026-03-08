package com.hackattackt3.backend.service;

import org.springframework.stereotype.Service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class AdminService {

    private static final String COLLECTION = "users";

    // Admin only - reset user password
    public void resetPassword(String userId) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION).document(userId).update("password", "RESET_REQUIRED").get();
    }
}
