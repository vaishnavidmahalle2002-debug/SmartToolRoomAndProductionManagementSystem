package com.example.demo.model;

public class User {

	private Integer user_id;
	private String fullName;
	private String email;
	private String mobileNo;
	private String username;
	private String password;
	private String role;
	private String status = "Active";

	// Default Constructor
	public User() {
	}

	// Parameterized Constructor
	public User(Integer user_id, String fullName, String email, String mobileNo, String username, String password,
			String role, String status) {
		this.user_id = user_id;
		this.fullName = fullName;
		this.email = email;
		this.mobileNo = mobileNo;
		this.username = username;
		this.password = password;
		this.role = role;
		this.status = status;
	}

	// Getter and Setter for user_id
	public Integer getUser_id() {
		return user_id;
	}

	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}

	// Getter and Setter for fullName
	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	// Getter and Setter for email
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	// Getter and Setter for mobileNo
	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	// Getter and Setter for username
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	// Getter and Setter for password
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	// Getter and Setter for role
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	// Getter and Setter for status
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	// toString() Method
	@Override
	public String toString() {
		return "User{" + "user_id=" + user_id + ", fullName='" + fullName + '\'' + ", email='" + email + '\''
				+ ", mobileNo='" + mobileNo + '\'' + ", username='" + username + '\'' + ", password='" + password + '\''
				+ ", role='" + role + '\'' + ", status='" + status + '\'' + '}';
	}
}