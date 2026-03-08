package com.hackattackt3.backend.utils;

import com.hackattackt3.backend.model.User;
import com.hackattackt3.backend.model.VolunteeringPost;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class ResumeTextGenerator {

    public String generateResumeText(VolunteeringPost position, User user, LocalDate date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM d yyyy");
        String formattedDate = date.format(formatter);

        return "Volunteer — " + position.getOrganizationName() + "\n" +
               "Date: " + formattedDate + "\n" +
               "Location: " + position.getLocation() + "\n" +
               "Duration: " + position.getDuration() + "\n" +
               "Duties: " + position.getDescription() + "\n" +
               "Skills: " + position.getSkillsNeeded();
    }
}