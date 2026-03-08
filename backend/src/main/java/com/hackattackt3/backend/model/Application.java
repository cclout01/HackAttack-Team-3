package com.hackattackt3.backend.model;

public class Application {
    private String id;
    private String userId;
    private String positionId;
    private String appliedAt;
    private ApplicationStatus status;

    public Application() {
    }

    public Application(String id, String userId, String positionId, String appliedAt, ApplicationStatus status) {
        this.id = id;
        this.userId = userId;
        this.positionId = positionId;
        this.appliedAt = appliedAt;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPositionId() {
        return positionId;
    }

    public void setPositionId(String positionId) {
        this.positionId = positionId;
    }

    public String getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(String appliedAt) {
        this.appliedAt = appliedAt;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
}