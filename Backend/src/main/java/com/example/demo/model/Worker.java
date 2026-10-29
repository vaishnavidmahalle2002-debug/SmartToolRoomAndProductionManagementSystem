package com.example.demo.model;

public class Worker {

	private Integer workerId;
	private Integer userId;

	private String fullName;
	private String email;
	private String mobileNo;
	private String username;
	private String password;
	private String role;
	private String status;

	private String skill;
	private double salary;
	private String profilePhoto;

	public Worker() {

	}

	public Worker(Integer workerId, Integer userId, String fullName, String email, String mobileNo, String username,
			String password, String role, String status, String skill, double salary, String profilePhoto) {
		this.workerId = workerId;
		this.userId = userId;
		this.fullName = fullName;
		this.email = email;
		this.mobileNo = mobileNo;
		this.username = username;
		this.password = password;
		this.role = role;
		this.status = status;
		this.skill = skill;
		this.salary = salary;
		this.profilePhoto = profilePhoto;

	}

	public Integer getWorkerId() {
		return workerId;
	}

	public void setWorkerId(Integer workerId) {
		this.workerId = workerId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
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

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getSkill() {
		return skill;
	}

	public void setSkill(String skill) {
		this.skill = skill;
	}

	public double getSalary() {
		return salary;
	}

	public void setSalary(double salary) {
		this.salary = salary;
	}

	public String getProfilePhoto() {
		return profilePhoto;
	}

	public void setProfilePhoto(String profilePhoto) {
		this.profilePhoto = profilePhoto;
	}

}