package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.demo.model.Customer;
import com.example.demo.service.CustomerService;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "${app.cors.allowed-origins}",
	    allowedHeaders = "*",
	    allowCredentials = "true",
	    methods = {
	        RequestMethod.GET,
	        RequestMethod.POST,
	        RequestMethod.PUT,
	        RequestMethod.DELETE,
	        RequestMethod.OPTIONS
	    }
	)
public class CustomerController {

    @Autowired
    private CustomerService custService;

    
    @GetMapping("/viewallCustomers")
    public List<Customer> getAllCustomers() {
        return custService.getAllCustomers();
    }

    @PostMapping(
            value = "/addCustomer",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<String> addCustomer(

            @RequestParam(value = "profilePhoto", required = false)
            MultipartFile profilePhoto,

            @RequestParam("user_id")
            Integer userId,

            @RequestParam("fullName")
            String fullName,

            @RequestParam("mobileNo")
            String mobileNo,

            @RequestParam("email")
            String email,

            @RequestParam("address")
            String address,

            @RequestParam("city")
            String city,

            @RequestParam("state")
            String state,

            @RequestParam("companyName")
            String companyName,

            @RequestParam("gstNo")
            String gstNo) {

        try {

            Customer customer = new Customer();

            customer.setUser_id(userId);
            customer.setFullName(fullName);
            customer.setMobileNo(mobileNo);
            customer.setEmail(email);
            customer.setAddress(address);
            customer.setCity(city);
            customer.setState(state);
            customer.setCompanyName(companyName);
            customer.setGstNo(gstNo);

            // Save image filename
            if (profilePhoto != null && !profilePhoto.isEmpty()) {
                customer.setProfilePhoto(profilePhoto.getOriginalFilename());
            } else {
                customer.setProfilePhoto("default.png");
            }

            // Add customer
            boolean result = custService.addCustomer(customer);

            if (result) {
                return ResponseEntity.ok("Customer Added Successfully");
            }

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Customer Not Added");

        } catch (DuplicateKeyException e) {

            // Database unique constraint protection
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Customer already exists for this user.");

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error while adding customer: " + e.getMessage());
        }
    }

    
    @GetMapping("/viewCustomer/{id}")
    public Customer searchCustomer(@PathVariable int id) {
        return custService.searchCustomer(id);
    }

   
    @PutMapping(value = "/updCustomer", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String updateCustomer(

            @RequestParam("customer_id") Integer customerId,
            @RequestParam("user_id") Integer userId,
            @RequestParam("fullName") String fullName,
            @RequestParam("mobileNo") String mobileNo,
            @RequestParam("email") String email,
            @RequestParam("address") String address,
            @RequestParam("city") String city,
            @RequestParam("state") String state,
            @RequestParam("companyName") String companyName,
            @RequestParam("gstNo") String gstNo,
            @RequestParam(value = "profilePhoto", required = false) MultipartFile profilePhoto) {

        Customer customer = new Customer();

        customer.setCustomer_id(customerId);
        customer.setUser_id(userId);
        customer.setFullName(fullName);
        customer.setMobileNo(mobileNo);
        customer.setEmail(email);
        customer.setAddress(address);
        customer.setCity(city);
        customer.setState(state);
        customer.setCompanyName(companyName);
        customer.setGstNo(gstNo);

        if (profilePhoto != null && !profilePhoto.isEmpty()) {
            customer.setProfilePhoto(profilePhoto.getOriginalFilename());
        }

        boolean result = custService.updateCustomer(customer);

        if (result) {
            return "Customer Updated Successfully";
        } else {
            return "Customer Not Updated";
        }
    }

    
    
    @DeleteMapping("/delCustomer/{id}")
    public String deleteCustomer(@PathVariable int id) {

        boolean result = custService.deleteCustomer(id);

        if (result) {
            return "Customer Deleted Successfully";
        } else {
            return "Customer Not Deleted";
        }
    }
    
    
    
    @GetMapping("/customer/user/{userId}")
    public Customer getCustomerByUserId(@PathVariable int userId) {
        return custService.getCustomerByUserId(userId);
    }
    
 // ==========================
 // View Logged-in Customer
 // ==========================

 @GetMapping("/viewMyCustomer/{userId}")
 public Customer viewMyCustomer(
         @PathVariable int userId) {

     return custService.searchCustomerByUserId(userId);
 }
 
//=====================================================
//MY PROFILE
//=====================================================

@GetMapping("/myProfile")
public Customer myProfile(HttpSession session) {

  Object userIdObject =
      session.getAttribute("userId");


  if (userIdObject == null) {

      return null;

  }


  int userId =
      Integer.parseInt(
          userIdObject.toString()
      );


  return custService.getCustomerByUserId(
      userId
  );
}

}