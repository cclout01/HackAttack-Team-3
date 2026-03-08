package com.hackattackt3.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hackattackt3.backend.model.VolunteeringPost;

@Service
public class PositionService {

    // BE-4: get all positions with filters
    public List<VolunteeringPost> getAllPositions(String sort, String location, String difficulty, String urgency) {
        // TODO: connect to Firebase and apply filters
        return new ArrayList<>();
    }

    // get one position by id
    public VolunteeringPost getPositionById(String id) {
        // TODO: connect to Firebase
        return null;
    }

    // BE-5: create a new position
    public VolunteeringPost createPosition(VolunteeringPost post) {
        // TODO: save to Firebase
        return post;
    }

    // BE-7: get applicants for a position
    public List<String> getApplicants(String id) {
        // TODO: connect to Firebase
        return new ArrayList<>();
    }

    // BE-8: confirm a volunteer
    public void confirmVolunteer(String id) {
        // TODO: connect to Firebase
    }

    // BE-6: apply to a position
    public void applyToPosition(String id) {
        // TODO: create application record with status PENDING
    }
}
