package com.example.demo.model;

public class Contact {

    private Integer contactId;
    private String fullName;
    private String email;
    private String subject;
    private String message;

    public Contact() {
    }

    public Contact(Integer contactId, String fullName, String email,
                   String subject, String message) {
        this.contactId = contactId;
        this.fullName = fullName;
        this.email = email;
        this.subject = subject;
        this.message = message;
    }

    public Integer getContactId() {
        return contactId;
    }

    public void setContactId(Integer contactId) {
        this.contactId = contactId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}