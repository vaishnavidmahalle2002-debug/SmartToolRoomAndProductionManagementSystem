package com.example.demo.service;

import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import java.util.*;


@Service("userService")
public class UserService {

	@Autowired
	UserRepository userRepo;
	
	// register
	public boolean isRegistered(User user)
	{
		return userRepo.isRegistered(user);
	}
	
	//login
	public User login(String username, String password)
	{
		return userRepo.login(username, password);
	}
	
	//change password
	public boolean changePassword(int userId,String oldPassword,String newPassword)
	{
	    return userRepo.changePassword(userId, oldPassword, newPassword);
	}
	
	// =====================================================
	// USER ROLE COUNTS
	// =====================================================

	public Map<String, Integer> getUserRoleCounts() {

	    return userRepo.getUserRoleCounts();

	}
	
	// =====================================================
	// GET ALL USERS
	// =====================================================

	public List<User> getAllUsers() {

	    return userRepo.getAllUsers();

	}


	// =====================================================
	// UPDATE USER STATUS
	// =====================================================

	public boolean updateUserStatus(
	        int userId,
	        String status) {

	    return userRepo.updateUserStatus(
	            userId,
	            status
	    );

	}
}
