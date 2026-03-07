package com.hackattackt3.backend.service;

import com.hackattackt3.backend.model.Application;
import org.springframework.stereotype.Service;

@Service
public class ApplicationService {

    public String saveApplication(Application application) {
        // Firebase logic goes here
        return "Application saved";
    }
}