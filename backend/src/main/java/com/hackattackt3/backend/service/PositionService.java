package com.hackattackt3.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.hackattackt3.backend.model.VolunteeringPost;

@Service
public class PositionService {

    private static final String COLLECTION = "positions";

    // BE-4: get all positions with filters
    public List<VolunteeringPost> getAllPositions(String sort, String location, String difficulty, String urgency) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        List<VolunteeringPost> positions = new ArrayList<>();
        db.collection(COLLECTION).get().get().getDocuments()
            .forEach(doc -> positions.add(doc.toObject(VolunteeringPost.class)));
        return positions;
    }

    // get one position by id
    public VolunteeringPost getPositionById(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        return db.collection(COLLECTION).document(id).get().get().toObject(VolunteeringPost.class);
    }

    // BE-5: create a new position
    public VolunteeringPost createPosition(VolunteeringPost post) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        if (post.getId() == null || post.getId().isEmpty()) {
            post.setId(UUID.randomUUID().toString());
        }
        db.collection(COLLECTION).document(post.getId()).set(post).get();
        return post;
    }

    // BE-7: get applicants for a position
    public List<String> getApplicants(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        VolunteeringPost post = db.collection(COLLECTION).document(id).get().get().toObject(VolunteeringPost.class);
        return post != null ? post.getApplicants() : new ArrayList<>();
    }

    // BE-8: confirm a volunteer
    public void confirmVolunteer(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION).document(id).update("status", "CONFIRMED").get();
    }

    // BE-6: apply to a position
    public void applyToPosition(String positionId, String volunteerId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        VolunteeringPost post = db.collection(COLLECTION).document(positionId).get().get().toObject(VolunteeringPost.class);
        if (post != null) {
            List<String> applicants = post.getApplicants() != null ? post.getApplicants() : new ArrayList<>();
            applicants.add(volunteerId);
            db.collection(COLLECTION).document(positionId).update("applicants", applicants).get();
        }
    }
}
