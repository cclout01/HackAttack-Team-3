package com.hackattackt3.backend.model;

import java.util.List;

public class Volunteer extends User {
    private String firstName;
    private String lastName;
    private String country;
    private String bio;
    private String profilePicture;
    private List<String> skills;
    private List<String> savedPosts;
    private List<String> appliedPosts;

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getProfilePicture() { return profilePicture; }
    public void setProfilePicture(String profilePicture) { this.profilePicture = profilePicture; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }

    public List<String> getSavedPosts() { return savedPosts; }
    public void setSavedPosts(List<String> savedPosts) { this.savedPosts = savedPosts; }

    public List<String> getAppliedPosts() { return appliedPosts; }
    public void setAppliedPosts(List<String> appliedPosts) { this.appliedPosts = appliedPosts; }
}
    

