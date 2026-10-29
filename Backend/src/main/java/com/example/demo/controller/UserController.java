package com.example.demo.controller;

import java.util.Map;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "${app.cors.allowed-origins}",
	    allowCredentials = "true"
	)
public class UserController {

    @Autowired
    UserService userService;

    // Register
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {

    	if("Admin".equalsIgnoreCase(user.getRole())){
    	    return ResponseEntity.badRequest().body("Admin registration is not allowed.");
    	}
    	
    	if(user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("Customer");
        }

        if(user.getStatus() == null || user.getStatus().isEmpty()) {
            user.setStatus("Active");
        }
        
        try {

            System.out.println("Controller Reached");
           // System.out.println(user);
            System.out.println("Role received = " + user.getRole());
            System.out.println(user);

            boolean b = userService.isRegistered(user);

            if (b) {
                return ResponseEntity.ok("User Registered Successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("User Not Registered");
            }

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

   
 // Login
    
    @PostMapping("/login")
    public ResponseEntity<User> login(
            @RequestBody User user,
            HttpSession session) {

        User loggedInUser =
                userService.login(
                        user.getUsername(),
                        user.getPassword()
                );

        if (loggedInUser != null) {

            session.setAttribute(
                    "userId",
                    loggedInUser.getUser_id()
            );

            session.setAttribute(
                    "username",
                    loggedInUser.getUsername()
            );

            session.setAttribute(
                    "role",
                    loggedInUser.getRole()
            );

            System.out.println(
                    "LOGIN SUCCESS"
            );

            System.out.println(
                    "Session User ID = "
                    + loggedInUser.getUser_id()
            );

            System.out.println(
                    "Session Username = "
                    + loggedInUser.getUsername()
            );

            System.out.println(
                    "Session Role = "
                    + loggedInUser.getRole()
            );

            return ResponseEntity.ok(loggedInUser);
        }

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .build();
    }
    
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out");
    } 
    
    // change the password
    @PostMapping("/changePassword")
    public ResponseEntity<String> changePassword(
    @RequestParam int userId,
    @RequestParam String oldPassword,
    @RequestParam String newPassword)
    {

        boolean b=userService.changePassword(userId, oldPassword, newPassword);

        if(b)
        {
            return ResponseEntity.ok("Password Changed Successfully");
        }

        else
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Old Password Incorrect");
        }

    }
    
    @GetMapping("/sessionUser")
    public User getSessionUser(HttpSession session) {

        Integer userId = (Integer) session.getAttribute("userId");

        if(userId == null){
            return null;
        }

        User user = new User();
        user.setUser_id(userId);
        user.setUsername((String)session.getAttribute("username"));
        user.setRole((String)session.getAttribute("role"));

        return user;
    }
    
 // =====================================================
 // USER ROLE COUNTS
 // =====================================================

 @GetMapping("/userRoleCounts")
 public Map<String, Integer> getUserRoleCounts() {

     return userService.getUserRoleCounts();

 }
 
//=====================================================
//VIEW ALL USERS
//=====================================================

@GetMapping("/allUsers")
public ResponseEntity<List<User>> getAllUsers() {

  try {

      return ResponseEntity.ok(
              userService.getAllUsers()
      );

  } catch (Exception e) {

      e.printStackTrace();

      return ResponseEntity
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .build();
  }
}


//=====================================================
//UPDATE USER STATUS
//=====================================================

@PutMapping("/updateUserStatus/{userId}")
public ResponseEntity<String> updateUserStatus(
      @PathVariable int userId,
      @RequestBody Map<String, String> request) {

  try {

      String status =
              request.get("status");

      if (status == null ||
          status.isEmpty()) {

          return ResponseEntity
                  .badRequest()
                  .body("Status is required.");
      }


      if (!status.equalsIgnoreCase("Active") &&
          !status.equalsIgnoreCase("Inactive")) {

          return ResponseEntity
                  .badRequest()
                  .body("Invalid status.");
      }


      boolean updated =
              userService.updateUserStatus(
                      userId,
                      status
              );


      if (updated) {

          return ResponseEntity.ok(
                  "User status updated successfully."
          );

      }


      return ResponseEntity
              .status(HttpStatus.NOT_FOUND)
              .body("User not found.");

  }
  catch (Exception e) {

      e.printStackTrace();

      return ResponseEntity
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .body("Unable to update user status.");

  }
}
}