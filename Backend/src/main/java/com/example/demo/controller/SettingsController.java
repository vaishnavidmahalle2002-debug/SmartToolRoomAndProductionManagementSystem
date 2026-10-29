package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Settings;
import com.example.demo.service.SettingsService;

@RestController
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class SettingsController {

    @Autowired
    SettingsService settingsService;

    @GetMapping("/viewSettings/{userId}")
    public Settings getProfile(@PathVariable int userId) {

        return settingsService.getProfile(userId);
    }

   
    @PutMapping("/updSettings")
    public String updateProfile(@RequestBody Settings settings) {

        boolean result = settingsService.updateProfile(settings);

        return result
                ? "Profile updated successfully"
                : "Profile update failed";
    }

    
    @PutMapping("/changePasswordSetting")
    public String changePassword(@RequestBody Settings settings) {

        boolean result = settingsService.changePassword(settings);

        return result
                ? "Password changed successfully"
                : "Old password is incorrect or passwords do not match";
    }

}