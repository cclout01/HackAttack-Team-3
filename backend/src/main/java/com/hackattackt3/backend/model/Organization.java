package com.hackattackt3.backend.model;

import java.util.List;

public class Organization extends User {
    private String organizationName;
    private String country;
    private String website;
    private String description;
    private String logoUrl;
    private List<String> postedPositions;  //ids of positions posted
    
}
