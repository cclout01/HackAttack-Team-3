package com.hackattackt3.backend.utils;

import com.hackattackt3.backend.model.Volunteer;
import com.hackattackt3.backend.model.VolunteeringPost;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class ResumeTextGenerator {

    public String generateResumeText(VolunteeringPost position, Volunteer volunteer, String date) {
        
        String fullName = volunteer.getFirstName() + " " + volunteer.getLastName();
        String location = position.getStateOrProvince() + ", " + position.getCountry();
        
        List<String> skillsList = position.getSkills();
        String skills = (skillsList != null && !skillsList.isEmpty()) 
            ? String.join(", ", skillsList) 
            : "N/A";

        return "Volunteer — " + position.getTitle() + "\n" +
               "Volunteer Name: " + fullName + "\n" +
               "Date: " + date + "\n" +
               "Location: " + location + "\n" +
               "Duration: " + position.getDuration() + "\n" +
               "Duties: " + position.getDescription() + "\n" +
               "Skills: " + skills;
    }
}