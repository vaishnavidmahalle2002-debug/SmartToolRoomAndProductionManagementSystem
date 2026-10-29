package com.example.demo.repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.User;

@Repository("userRepo")
public class UserRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    // Register
    public boolean isRegistered(User user) {
    	System.out.println("repo==========="+user);

		/*
		 * if(user.getRole() == null) { user.setRole("Customer"); }
		 * 
		 * if(user.getStatus() == null) { user.setStatus("Active"); }
		 */

        String sql = "INSERT INTO users(full_name,email,mobile_no,username,password,role,status) VALUES(?,?,?,?,?,?,?)";

        int value = jdbcTemplate.update(sql, new PreparedStatementSetter() {

            @Override
            public void setValues(PreparedStatement ps) throws SQLException {

                ps.setString(1, user.getFullName());
                ps.setString(2, user.getEmail());
                ps.setString(3, user.getMobileNo());
                ps.setString(4, user.getUsername());
                ps.setString(5, user.getPassword());
                ps.setString(6, user.getRole());
                ps.setString(7, user.getStatus());
            }
        });

        return value > 0;
    }

    // Login
    public User login(String username, String password) {

        List<User> userList = jdbcTemplate.query(
                "SELECT * FROM users WHERE username=? AND password=? AND status='Active'",
                new Object[] { username, password },

                new RowMapper<User>() {

                    @Override
                    public User mapRow(ResultSet rs, int rowNum) throws SQLException {

                        User usr = new User();

                        usr.setUser_id(rs.getInt("user_id"));
                        usr.setFullName(rs.getString("full_name"));
                        usr.setEmail(rs.getString("email"));
                        usr.setMobileNo(rs.getString("mobile_no"));
                        usr.setUsername(rs.getString("username"));
                        usr.setPassword(rs.getString("password"));
                        usr.setRole(rs.getString("role"));
                        usr.setStatus(rs.getString("status"));

                        return usr;
                    }
                });

        return userList.isEmpty() ? null : userList.get(0);
    }
    
    //change password
    public boolean changePassword(int userId,String oldPassword,String newPassword)
    {
        String sql="update users set password=? where user_id=? and password=?";

        int value=jdbcTemplate.update(sql,newPassword,userId,oldPassword);

        return value>0;
    }
    
 // =====================================================
 // USER ROLE COUNTS
 // =====================================================

 public Map<String, Integer> getUserRoleCounts() {

     String sql = """
             SELECT role, COUNT(*) AS total
             FROM users
             GROUP BY role
             """;

     List<Map<String, Object>> rows =
             jdbcTemplate.queryForList(sql);

     Map<String, Integer> counts =
             new HashMap<>();

     // Default values
     counts.put("Admin", 0);
     counts.put("Worker", 0);
     counts.put("Customer", 0);

     for (Map<String, Object> row : rows) {

         String role =
                 String.valueOf(
                         row.get("role")
                 );

         int total =
                 ((Number) row.get("total"))
                         .intValue();

         counts.put(role, total);
     }

     return counts;
 }
 
//=====================================================
//GET ALL USERS
//=====================================================

public List<User> getAllUsers() {

  String sql = """
          SELECT
              user_id,
              full_name,
              email,
              mobile_no,
              username,
              role,
              status
          FROM users
          ORDER BY user_id DESC
          """;


  return jdbcTemplate.query(
          sql,
          new RowMapper<User>() {

              @Override
              public User mapRow(
                      ResultSet rs,
                      int rowNum)
                      throws SQLException {

                  User user =
                          new User();


                  user.setUser_id(
                          rs.getInt("user_id")
                  );


                  user.setFullName(
                          rs.getString("full_name")
                  );


                  user.setEmail(
                          rs.getString("email")
                  );


                  user.setMobileNo(
                          rs.getString("mobile_no")
                  );


                  user.setUsername(
                          rs.getString("username")
                  );


                  user.setRole(
                          rs.getString("role")
                  );


                  user.setStatus(
                          rs.getString("status")
                  );


                  return user;

              }

          }
  );

}


//=====================================================
//UPDATE USER STATUS
//=====================================================

public boolean updateUserStatus(
      int userId,
      String status) {

  String sql =
          "UPDATE users SET status=? WHERE user_id=?";


  int value =
          jdbcTemplate.update(
                  sql,
                  status,
                  userId
          );


  return value > 0;

}
}