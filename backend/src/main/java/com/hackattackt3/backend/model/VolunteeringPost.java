package com.hackattackt3.backend.model;

import java.util.List;

public class VolunteeringPost {
    private String id;
    private String organizationId;
    private String title;
    private String description;
    private String country;
    private String stateOrProvince;
    private String startMonth;       // "2025-06"
    private List<String> applicants; // ids of volunteers
    private String status;           // "OPEN" or "CLOSED"
    private String createdAt;
}
