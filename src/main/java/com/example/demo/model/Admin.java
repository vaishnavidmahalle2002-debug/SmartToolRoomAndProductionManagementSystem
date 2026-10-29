package com.example.demo.model;

public class Admin {

    private int adminId;
    private int userId;
    private String name;
    private String email;
    private String mobile;

    // Default Constructor
    public Admin() {
    }

    // Parameterized Constructor
    public Admin(int adminId, int userId, String name, String email, String mobile) {
        this.adminId = adminId;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
    }

    // Getter and Setter for adminId
    public int getAdminId() {
        return adminId;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }

    // Getter and Setter for userId
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    // Getter and Setter for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter and Setter for email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter and Setter for mobile
    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    @Override
    public String toString() {
        return "Admin{" +
                "adminId=" + adminId +
                ", userId=" + userId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", mobile='" + mobile + '\'' +
                '}';
    }
}