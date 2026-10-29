package com.example.demo.repository;

import com.example.demo.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class NotificationRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    // =====================================================
    // CREATE NOTIFICATION
    // =====================================================

    public boolean createNotification(Notification notification) {

        String sql =
                "INSERT INTO notification " +
                "(user_id, type, title, message, reference_id) " +
                "VALUES (?, ?, ?, ?, ?)";

        int result = jdbcTemplate.update(
                sql,
                notification.getUser_id(),
                notification.getType(),
                notification.getTitle(),
                notification.getMessage(),
                notification.getReference_id()
        );

        return result > 0;
    }


    // =====================================================
    // GET LOGGED-IN CUSTOMER NOTIFICATIONS
    // =====================================================

    public List<Notification> getNotificationsByUserId(int userId) {

        String sql =
                "SELECT notification_id, user_id, type, title, " +
                "message, reference_id, is_read, created_date " +
                "FROM notification " +
                "WHERE user_id = ? " +
                "ORDER BY created_date DESC";

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> {

                    Notification notification =
                            new Notification();

                    notification.setNotification_id(
                            rs.getInt("notification_id")
                    );

                    notification.setUser_id(
                            rs.getInt("user_id")
                    );

                    notification.setType(
                            rs.getString("type")
                    );

                    notification.setTitle(
                            rs.getString("title")
                    );

                    notification.setMessage(
                            rs.getString("message")
                    );

                    notification.setReference_id(
                            rs.getObject("reference_id",
                                    Integer.class)
                    );

                    notification.setIs_read(
                            rs.getBoolean("is_read")
                    );

                    notification.setCreated_date(
                            rs.getString("created_date")
                    );

                    return notification;
                },
                userId
        );
    }


    // =====================================================
    // MARK ONE AS READ
    // =====================================================

    public boolean markAsRead(
            int notificationId,
            int userId) {

        String sql =
                "UPDATE notification " +
                "SET is_read = TRUE " +
                "WHERE notification_id = ? " +
                "AND user_id = ?";

        return jdbcTemplate.update(
                sql,
                notificationId,
                userId
        ) > 0;
    }


    // =====================================================
    // MARK ALL AS READ
    // =====================================================

    public boolean markAllAsRead(int userId) {

        String sql =
                "UPDATE notification " +
                "SET is_read = TRUE " +
                "WHERE user_id = ?";

        jdbcTemplate.update(sql, userId);

        return true;
    }
}