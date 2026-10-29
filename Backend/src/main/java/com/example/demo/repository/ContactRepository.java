
package com.example.demo.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Contact;

@Repository
public class ContactRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    // =====================================================
    // SAVE CONTACT MESSAGE
    // =====================================================

    public boolean saveContact(Contact contact) {

        String sql =
            "INSERT INTO contact(full_name,email,subject,message) " +
            "VALUES(?,?,?,?)";

        int result = jdbcTemplate.update(
            sql,
            contact.getFullName(),
            contact.getEmail(),
            contact.getSubject(),
            contact.getMessage()
        );

        return result > 0;
    }


    // =====================================================
    // VIEW ALL CONTACT MESSAGES
    // =====================================================

    public List<Contact> getAllContacts() {

        String sql =
            "SELECT contact_id, full_name, email, subject, message " +
            "FROM contact " +
            "ORDER BY created_at DESC";

        return jdbcTemplate.query(
            sql,
            (rs, rowNum) -> {

                Contact contact = new Contact();

                contact.setContactId(
                    rs.getInt("contact_id")
                );

                contact.setFullName(
                    rs.getString("full_name")
                );

                contact.setEmail(
                    rs.getString("email")
                );

                contact.setSubject(
                    rs.getString("subject")
                );

                contact.setMessage(
                    rs.getString("message")
                );

                return contact;
            }
        );
    }
}

