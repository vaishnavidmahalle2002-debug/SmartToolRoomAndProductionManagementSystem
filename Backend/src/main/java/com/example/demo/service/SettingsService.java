package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Settings;
import com.example.demo.repository.SettingRepository;

@Service("settingsService")
public class SettingsService {

    @Autowired
    SettingRepository settingsRepo;

    // View Profile
    public Settings getProfile(int userId) {

        return settingsRepo.getProfile(userId);
    }

    // Update Profile
    public boolean updateProfile(Settings settings) {

        return settingsRepo.updateProfile(settings);
    }

    // Change Password
    public boolean changePassword(Settings settings) {

        return settingsRepo.changePassword(settings);
    }

}