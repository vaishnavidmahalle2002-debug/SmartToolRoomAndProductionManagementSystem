package com.example.demo.model;

import java.sql.Timestamp;

public class Customer {

    private Integer customer_id;
    private Integer user_id;

    private String fullName;
    private String mobileNo;
    private String email;
    private String address;
    private String city;
    private String state;
    private String companyName;
    private String gstNo;
    private String profilePhoto;
    private Timestamp createdDate;

    // Default Constructor
    public Customer() {

    }

    // Parameterized Constructor
    public Customer(Integer customer_id, Integer user_id, String fullName,
                    String mobileNo, String email,
                    String address, String city, String state,
                    String companyName, String gstNo,
                    String profilePhoto, Timestamp createdDate) {

        this.customer_id = customer_id;
        this.user_id = user_id;
        this.fullName = fullName;
        this.mobileNo = mobileNo;
        this.email = email;
        this.address = address;
        this.city = city;
        this.state = state;
        this.companyName = companyName;
        this.gstNo = gstNo;
        this.profilePhoto = profilePhoto;
        this.createdDate = createdDate;
    }

    public Integer getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(Integer customer_id) {
        this.customer_id = customer_id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // New Fields

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getGstNo() {
        return gstNo;
    }

    public void setGstNo(String gstNo) {
        this.gstNo = gstNo;
    }

    public String getProfilePhoto() {
        return profilePhoto;
    }

    public void setProfilePhoto(String profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }

}