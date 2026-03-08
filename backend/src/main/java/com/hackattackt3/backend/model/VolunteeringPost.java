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

    private String urgency;          // "high", "medium", "low"
    private String difficulty;       // "easy", "medium", "hard"
    private List<String> skills;     // skills required for the position
    private String duration;         
    private int volunteerCount;      // how many volunteers are needed
    private String expiryDate;       // limit date for application
    private String donationUrl;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getOrganizationId() { return organizationId; }
    public void setOrganizationId(String organizationId) { this.organizationId = organizationId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getStateOrProvince() { return stateOrProvince; }
    public void setStateOrProvince(String stateOrProvince) { this.stateOrProvince = stateOrProvince; }

    public String getStartMonth() { return startMonth; }
    public void setStartMonth(String startMonth) { this.startMonth = startMonth; }

    public List<String> getApplicants() { return applicants; }
    public void setApplicants(List<String> applicants) { this.applicants = applicants; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getUrgency() { return urgency; }
    public void setUrgency(String urgency) { this.urgency = urgency; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public int getVolunteerCount() { return volunteerCount; }
    public void setVolunteerCount(int volunteerCount) { this.volunteerCount = volunteerCount; }

    public String getExpiryDate() { return expiryDate; }
    public void setExpiryDate(String expiryDate) { this.expiryDate = expiryDate; }

    public String getDonationUrl() { return donationUrl; }
    public void setDonationUrl(String donationUrl) { this.donationUrl = donationUrl; }
}
