package com.example.demo.controller;

import com.example.demo.model.Notification;
import com.example.demo.service.NotificationService;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NotificationController {

    @Autowired
    private NotificationService notificationService;


    // =====================================================
    // CUSTOMER NOTIFICATIONS
    // =====================================================

    @GetMapping("/myNotifications")
    public List<Notification> getMyNotifications(
            HttpSession session) {

        Object userIdObject =
                session.getAttribute("userId");

        if (userIdObject == null) {
            return List.of();
        }

        int userId =
                Integer.parseInt(
                        userIdObject.toString()
                );

        return notificationService
                .getNotifications(userId);
    }


    // =====================================================
    // MARK ONE AS READ
    // =====================================================


    @PutMapping("/markNotificationRead/{notificationId}")
    public boolean markNotificationRead(
            @PathVariable int notificationId,
            HttpSession session) {

        Object userIdObject =
                session.getAttribute("userId");

        if (userIdObject == null) {
            return false;
        }

        int userId =
                Integer.parseInt(
                        userIdObject.toString()
                );

        return notificationService
                .markAsRead(
                        notificationId,
                        userId
                );
    }


    // =====================================================
    // MARK ALL AS READ
    // =====================================================

  
    @PutMapping("/markAllNotificationsRead")
    public boolean markAllNotificationsRead(
            HttpSession session) {

        Object userIdObject =
                session.getAttribute("userId");

        if (userIdObject == null) {
            return false;
        }

        int userId =
                Integer.parseInt(
                        userIdObject.toString()
                );

        return notificationService
                .markAllAsRead(userId);
    }
}