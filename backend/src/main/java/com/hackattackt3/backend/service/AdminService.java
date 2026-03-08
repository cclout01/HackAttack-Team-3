package com.hackattackt3.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class AdminService {

    private static final String COLLECTION = "users";

    public void resetPassword(String userId) throws Exception {
        Firestore db = FirestoreClient.getFirestore();

        DocumentReference userRef = db.collection(COLLECTION).document(userId);
        DocumentSnapshot snapshot = userRef.get().get();

        if (!snapshot.exists()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        userRef.update("password", "RESET_REQUIRED").get();
    }
}