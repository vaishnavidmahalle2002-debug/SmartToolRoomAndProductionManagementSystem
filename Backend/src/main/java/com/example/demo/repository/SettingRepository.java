package com.example.demo.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Settings;

@Repository("settingsRepo")
public class SettingRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    // ===========================
    // View Profile
    // ===========================
    public Settings getProfile(int userId) {

        return jdbcTemplate.queryForObject(

                "SELECT * FROM users WHERE user_id=?",

                new Object[]{userId},

                (rs, rowNum) -> {

                    Settings settings = new Settings();

                    settings.setUserId(rs.getInt("user_id"));
                    settings.setUsername(rs.getString("username"));
                    settings.setEmail(rs.getString("email"));
                    settings.setMobileNo(rs.getString("mobile_no"));

                    return settings;
                });
    }

    // ===========================
    // Update Profile
    // ===========================
    public boolean updateProfile(Settings settings) {

        int value = jdbcTemplate.update(

                "UPDATE users SET username=?, email=?, mobile_no=? WHERE user_id=?",

                settings.getUsername(),
                settings.getEmail(),
                settings.getMobileNo(),
                settings.getUserId());

        return value > 0;
    }

    // ===========================
    // Change Password
    // ===========================
    public boolean changePassword(Settings settings) {

        Integer count = jdbcTemplate.queryForObject(

                "SELECT COUNT(*) FROM users WHERE user_id=? AND password=?",

                Integer.class,

                settings.getUserId(),
                settings.getOldPassword());

        if (count == null || count == 0) {
            return false;
        }

        if (!settings.getNewPassword().equals(settings.getConfirmPassword())) {
            return false;
        }

        int value = jdbcTemplate.update(

                "UPDATE users SET password=? WHERE user_id=?",

                settings.getNewPassword(),
                settings.getUserId());

        return value > 0;
    }

}