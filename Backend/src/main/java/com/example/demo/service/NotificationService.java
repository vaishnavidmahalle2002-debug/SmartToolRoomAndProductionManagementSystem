package com.example.demo.service;

import com.example.demo.model.Notification;
import com.example.demo.repository.NotificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;


    public boolean createNotification(
            int userId,
            String type,
            String title,
            String message,
            Integer referenceId) {

        Notification notification =
                new Notification();

        notification.setUser_id(userId);
        notification.setType(type);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setReference_id(referenceId);

        return notificationRepository
                .createNotification(notification);
    }


    public List<Notification> getNotifications(
            int userId) {

        return notificationRepository
                .getNotificationsByUserId(userId);
    }


    public boolean markAsRead(
            int notificationId,
            int userId) {

        return notificationRepository
                .markAsRead(notificationId, userId);
    }


    public boolean markAllAsRead(int userId) {

        return notificationRepository
                .markAllAsRead(userId);
    }
}