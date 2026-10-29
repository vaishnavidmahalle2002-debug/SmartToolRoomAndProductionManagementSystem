package com.example.demo.repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Customer;

@Repository("custRepo")
public class CustomerRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;


    RowMapper<Customer> customerMapper = new RowMapper<Customer>() {

        @Override
        public Customer mapRow(ResultSet rs, int rowNum) throws SQLException {

            Customer c = new Customer();

            c.setCustomer_id(rs.getInt("customer_id"));
            c.setUser_id(rs.getInt("user_id"));
            c.setFullName(rs.getString("name"));
            c.setMobileNo(rs.getString("mobile"));
            c.setEmail(rs.getString("email"));

            c.setAddress(rs.getString("address"));
            c.setCity(rs.getString("city"));
            c.setState(rs.getString("state"));
            c.setCompanyName(rs.getString("company_name"));
            c.setGstNo(rs.getString("gst_no"));
            c.setProfilePhoto(rs.getString("profile_photo"));
            c.setCreatedDate(rs.getTimestamp("created_date"));

            return c;
        }
    };

    public List<Customer> getAllCustomers() {

        String sql = "SELECT * FROM customer";

        return jdbcTemplate.query(sql, customerMapper);
    }

 // ================================
    // CHECK CUSTOMER ALREADY EXISTS
    // ================================
    public boolean existsByUserId(int userId) {

        String sql = """
                SELECT COUNT(*)
                FROM customer
                WHERE user_id = ?
                """;

        Integer count = jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                userId
        );

        return count != null && count > 0;
    }

   
    public boolean addCustomer(Customer customer) {

        String sql = "INSERT INTO customer(user_id,name,mobile,email,address,city,state,company_name,gst_no,profile_photo) VALUES(?,?,?,?,?,?,?,?,?,?)";

        int value = jdbcTemplate.update(sql, new PreparedStatementSetter() {

            @Override
            public void setValues(PreparedStatement ps) throws SQLException {

                ps.setInt(1, customer.getUser_id());
                ps.setString(2, customer.getFullName());
                ps.setString(3, customer.getMobileNo());
                ps.setString(4, customer.getEmail());
                ps.setString(5, customer.getAddress());
                ps.setString(6, customer.getCity());
                ps.setString(7, customer.getState());
                ps.setString(8, customer.getCompanyName());
                ps.setString(9, customer.getGstNo());
                ps.setString(10, customer.getProfilePhoto());

            }

        });

        return value > 0;
    }

   
    public Customer searchCustomer(int customerId) {

        String sql = "SELECT * FROM customer WHERE customer_id=?";

        List<Customer> list = jdbcTemplate.query(sql, ps -> {

            ps.setInt(1, customerId);

        }, customerMapper);

        return list.isEmpty() ? null : list.get(0);

    }


    public boolean updateCustomer(Customer customer) {

        String sql = "UPDATE customer SET "
                + "name=?,"
                + "mobile=?,"
                + "email=?,"
                + "address=?,"
                + "city=?,"
                + "state=?,"
                + "company_name=?,"
                + "gst_no=?,"
                + "profile_photo=? "
                + "WHERE customer_id=?";

        int value = jdbcTemplate.update(
                sql,
                customer.getFullName(),
                customer.getMobileNo(),
                customer.getEmail(),
                customer.getAddress(),
                customer.getCity(),
                customer.getState(),
                customer.getCompanyName(),
                customer.getGstNo(),
                customer.getProfilePhoto(),
                customer.getCustomer_id());

        return value > 0;

    }


    public boolean deleteCustomer(int customerId) {

        String sql = "DELETE FROM customer WHERE customer_id=?";

        int value = jdbcTemplate.update(sql, customerId);

        return value > 0;

    }
    
    public Customer getCustomerByUserId(int userId) {

        String sql = "SELECT * FROM customer WHERE user_id=?";

        List<Customer> list = jdbcTemplate.query(sql,
                ps -> ps.setInt(1, userId),
                customerMapper);

        return list.isEmpty() ? null : list.get(0);
    }
    
 // ==========================
 // Search Customer By User ID
 // ==========================

 public Customer searchCustomerByUserId(int userId) {

     String sql =
         "SELECT * FROM customer WHERE user_id=?";

     List<Customer> list =
         jdbcTemplate.query(
             sql,
             ps -> {
                 ps.setInt(1, userId);
             },
             customerMapper
         );

     return list.isEmpty()
             ? null
             : list.get(0);
 }

 
//=====================================================
//GET CUSTOMER BY USER ID
//=====================================================

public Customer getCustomerByUserId1(int userId) {

  String sql =
      "SELECT * FROM customer WHERE user_id=?";

  List<Customer> list =
      jdbcTemplate.query(
          sql,
          ps -> {
              ps.setInt(1, userId);
          },
          customerMapper
      );

  if (list.isEmpty()) {
      return null;
  }

  return list.get(0);
}
}