package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Customer;
import com.example.demo.repository.CustomerRepository;

@Service("custService")
public class CustomerService {

    @Autowired
    CustomerRepository custRepo;


    // =====================================================
    // GET ALL CUSTOMERS
    // =====================================================

    public List<Customer> getAllCustomers() {
        return custRepo.getAllCustomers();
    }


    // =====================================================
    // ADD CUSTOMER
    // CHECK DUPLICATE USER_ID BEFORE INSERT
    // =====================================================

    public boolean addCustomer(Customer customer) {

        // Check whether this user is already a customer
        if (custRepo.existsByUserId(customer.getUser_id())) {

            System.out.println(
                "Customer already exists for user_id: "
                + customer.getUser_id()
            );

            return false;
        }

        // Insert new customer
        return custRepo.addCustomer(customer);
    }


    // =====================================================
    // SEARCH CUSTOMER BY CUSTOMER ID
    // =====================================================

    public Customer searchCustomer(int customerId) {
        return custRepo.searchCustomer(customerId);
    }


    // =====================================================
    // UPDATE CUSTOMER
    // =====================================================

    public boolean updateCustomer(Customer customer) {
        return custRepo.updateCustomer(customer);
    }


    // =====================================================
    // DELETE CUSTOMER
    // =====================================================

    public boolean deleteCustomer(int customerId) {
        return custRepo.deleteCustomer(customerId);
    }


    // =====================================================
    // GET CUSTOMER BY USER ID - METHOD 1
    // =====================================================

    public Customer getCustomerByUserId1(int userId) {
        return custRepo.getCustomerByUserId(userId);
    }


    // =====================================================
    // SEARCH CUSTOMER BY USER ID
    // =====================================================

    public Customer searchCustomerByUserId(int userId) {
        return custRepo.searchCustomerByUserId(userId);
    }


    // =====================================================
    // GET CUSTOMER BY USER ID
    // =====================================================

    public Customer getCustomerByUserId(int userId) {
        return custRepo.getCustomerByUserId(userId);
    }

}