package com.hackattackt3.backend.model;

import java.util.List;

public class Organization extends User {
    private String organizationName;
    private String country;
    private String website;
    private String description;
    private String logoUrl;
    private List<String> postedPositions;

    public String getOrganizationName() { return organizationName; }
    public void setOrganizationName(String organizationName) { this.organizationName = organizationName; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public List<String> getPostedPositions() { return postedPositions; }
    public void setPostedPositions(List<String> postedPositions) { this.postedPositions = postedPositions; }
}