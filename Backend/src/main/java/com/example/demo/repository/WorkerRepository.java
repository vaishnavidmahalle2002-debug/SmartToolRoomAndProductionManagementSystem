package com.example.demo.repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Worker;

@Repository
public class WorkerRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;


    // ============================================================
    // Check Worker Already Exists By user_id
    // ============================================================

    public boolean existsByUserId(int userId) {

        String sql = """
            SELECT COUNT(*)
            FROM worker
            WHERE user_id = ?
            """;

        Integer count = jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                userId
        );

        return count != null && count > 0;
    }


    private Integer findExistingUserId(Worker worker) {

        // 1. First try username
        if (worker.getUsername() != null &&
            !worker.getUsername().trim().isEmpty()) {

            String sql =
                "SELECT user_id FROM users WHERE username = ? LIMIT 1";

            List<Integer> ids = jdbcTemplate.query(
                sql,
                (rs, rowNum) -> rs.getInt("user_id"),
                worker.getUsername().trim()
            );

            if (!ids.isEmpty()) {
                return ids.get(0);
            }
        }

        // 2. Then try email
        if (worker.getEmail() != null &&
            !worker.getEmail().trim().isEmpty()) {

            String sql =
                "SELECT user_id FROM users WHERE email = ? LIMIT 1";

            List<Integer> ids = jdbcTemplate.query(
                sql,
                (rs, rowNum) -> rs.getInt("user_id"),
                worker.getEmail().trim()
            );

            if (!ids.isEmpty()) {
                return ids.get(0);
            }
        }

        // 3. Finally try mobile
        if (worker.getMobileNo() != null &&
            !worker.getMobileNo().trim().isEmpty()) {

            String sql =
                "SELECT user_id FROM users WHERE mobile_no = ? LIMIT 1";

            List<Integer> ids = jdbcTemplate.query(
                sql,
                (rs, rowNum) -> rs.getInt("user_id"),
                worker.getMobileNo().trim()
            );

            if (!ids.isEmpty()) {
                return ids.get(0);
            }
        }

        return null;
    }
    // ============================================================
    // Add Worker
    // ============================================================

    public boolean addWorker(Worker worker) {

        /*
         * STEP 1:
         * Check whether this person is already registered
         * in the users table.
         */

        Integer existingUserId = findExistingUserId(worker);


        // ========================================================
        // CASE 1:
        // User already exists
        // ========================================================

        if (existingUserId != null) {

            System.out.println(
                    "Existing user found. Reusing user_id: "
                    + existingUserId
            );

            /*
             * Check whether this existing user already has
             * a worker record.
             */

            if (existsByUserId(existingUserId)) {
                return false;
            }


            /*
             * Existing user but no worker record.
             *
             * Therefore create only the worker record.
             */

            String workerSql =
                    "INSERT INTO worker(user_id,name,skill,salary) " +
                    "VALUES(?,?,?,?)";

            try {

                int workerResult = jdbcTemplate.update(
                        workerSql,
                        existingUserId,
                        worker.getFullName(),
                        worker.getSkill(),
                        worker.getSalary()
                );

                return workerResult > 0;

            } catch (DuplicateKeyException e) {
                return false;
            }
        }


        // ========================================================
        // CASE 2:
        // User does NOT exist
        // =================================================
        String userSql =
                "INSERT INTO users(" +
                "full_name," +
                "email," +
                "mobile_no," +
                "username," +
                "password," +
                "role," +
                "status" +
                ") VALUES(?,?,?,?,?,?,?)";


        KeyHolder keyHolder = new GeneratedKeyHolder();


        int userResult;

        try {

            userResult = jdbcTemplate.update(
                    connection -> {

                        PreparedStatement ps =
                                connection.prepareStatement(
                                        userSql,
                                        Statement.RETURN_GENERATED_KEYS
                                );

                        ps.setString(
                                1,
                                worker.getFullName()
                        );

                        ps.setString(
                                2,
                                worker.getEmail()
                        );

                        ps.setString(
                                3,
                                worker.getMobileNo()
                        );

                        ps.setString(
                                4,
                                worker.getUsername()
                        );

                        ps.setString(
                                5,
                                worker.getPassword()
                        );

                        /*
                         * We intentionally use Worker here,
                         * because this method is specifically
                         * adding a worker.
                         */
                        ps.setString(
                                6,
                                "Worker"
                        );

                        ps.setString(
                                7,
                                worker.getStatus() != null
                                        ? worker.getStatus()
                                        : "Active"
                        );

                        return ps;
                    },
                    keyHolder
            );

        } catch (DuplicateKeyException e) {

         return false;
        }


        if (userResult <= 0 || keyHolder.getKey() == null) {
            return false;
        }


        int newUserId =
                keyHolder.getKey().intValue();


        // ========================================================
        // Insert Worker Using Newly Created user_id
        // ========================================================

        String workerSql =
                "INSERT INTO worker(user_id,name,skill,salary) " +
                "VALUES(?,?,?,?)";


        try {

            int workerResult = jdbcTemplate.update(
                    workerSql,
                    newUserId,
                    worker.getFullName(),
                    worker.getSkill(),
                    worker.getSalary()
            );

            return workerResult > 0;

        }  catch (Exception e) {
            e.printStackTrace();

            return false;
        }
    }


    // ============================================================
    // View All Workers
    // ============================================================

    public List<Worker> getAllWorkers() {

        String sql =
                "SELECT w.worker_id, " +
                "u.user_id, " +
                "u.full_name, " +
                "u.email, " +
                "u.mobile_no, " +
                "u.username, " +
                "u.password, " +
                "u.role, " +
                "u.status, " +
                "w.skill, " +
                "w.salary, " +
                "w.profile_photo " +
                "FROM users u " +
                "INNER JOIN worker w " +
                "ON u.user_id = w.user_id";

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> {

                    Worker worker = new Worker();

                    worker.setWorkerId(
                            rs.getInt("worker_id")
                    );

                    worker.setUserId(
                            rs.getInt("user_id")
                    );

                    worker.setFullName(
                            rs.getString("full_name")
                    );

                    worker.setEmail(
                            rs.getString("email")
                    );

                    worker.setMobileNo(
                            rs.getString("mobile_no")
                    );

                    worker.setUsername(
                            rs.getString("username")
                    );

                    worker.setPassword(
                            rs.getString("password")
                    );

                    worker.setRole(
                            rs.getString("role")
                    );

                    worker.setStatus(
                            rs.getString("status")
                    );

                    worker.setSkill(
                            rs.getString("skill")
                    );

                    worker.setSalary(
                            rs.getDouble("salary")
                    );

                    worker.setProfilePhoto(
                            rs.getString("profile_photo")
                    );

                    return worker;
                }
        );
    }


    // ============================================================
    // View Worker By ID
    // ============================================================

    public Worker getWorkerById(int workerId) {

        String sql =
                "SELECT w.worker_id, " +
                "u.user_id, " +
                "u.full_name, " +
                "u.email, " +
                "u.mobile_no, " +
                "u.username, " +
                "u.password, " +
                "u.role, " +
                "u.status, " +
                "w.skill, " +
                "w.salary, " +
                "w.profile_photo " +
                "FROM users u " +
                "INNER JOIN worker w " +
                "ON u.user_id = w.user_id " +
                "WHERE w.worker_id=?";

        return jdbcTemplate.queryForObject(
                sql,
                new Object[]{workerId},
                (rs, rowNum) -> {

                    Worker worker = new Worker();

                    worker.setWorkerId(
                            rs.getInt("worker_id")
                    );

                    worker.setUserId(
                            rs.getInt("user_id")
                    );

                    worker.setFullName(
                            rs.getString("full_name")
                    );

                    worker.setEmail(
                            rs.getString("email")
                    );

                    worker.setMobileNo(
                            rs.getString("mobile_no")
                    );

                    worker.setUsername(
                            rs.getString("username")
                    );

                    worker.setPassword(
                            rs.getString("password")
                    );

                    worker.setRole(
                            rs.getString("role")
                    );

                    worker.setStatus(
                            rs.getString("status")
                    );

                    worker.setSkill(
                            rs.getString("skill")
                    );

                    worker.setSalary(
                            rs.getDouble("salary")
                    );

                    worker.setProfilePhoto(
                            rs.getString("profile_photo")
                    );

                    return worker;
                }
        );
    }


    // ============================================================
    // Update Worker
    // ============================================================

    public boolean updateWorker(Worker worker) {

        String userSql =
                "UPDATE users SET " +
                "full_name=?, " +
                "email=?, " +
                "mobile_no=?, " +
                "username=?, " +
                "password=?, " +
                "status=? " +
                "WHERE user_id=?";

        int userResult = jdbcTemplate.update(
                userSql,
                worker.getFullName(),
                worker.getEmail(),
                worker.getMobileNo(),
                worker.getUsername(),
                worker.getPassword(),
                worker.getStatus(),
                worker.getUserId()
        );


        String workerSql =
                "UPDATE worker SET " +
                "name=?, " +
                "skill=?, " +
                "salary=? " +
                "WHERE user_id=?";

        int workerResult = jdbcTemplate.update(
                workerSql,
                worker.getFullName(),
                worker.getSkill(),
                worker.getSalary(),
                worker.getUserId()
        );


        return userResult > 0 && workerResult > 0;
    }


    // ============================================================
    // Delete Worker
    // ============================================================

    public boolean deleteWorker(int userId) {

        jdbcTemplate.update(
                "DELETE FROM worker WHERE user_id=?",
                userId
        );

        int result = jdbcTemplate.update(
                "DELETE FROM users WHERE user_id=?",
                userId
        );

        return result > 0;
    }


    // ============================================================
    // Assign Skill
    // ============================================================

    public boolean assignSkill(
            int userId,
            String skill) {

        int result = jdbcTemplate.update(
                "UPDATE worker SET skill=? WHERE user_id=?",
                skill,
                userId
        );

        return result > 0;
    }


    // ============================================================
    // Get Worker By User ID
    // ============================================================

    public Worker getWorkerByUserId(int userId) {

        String sql =
                "SELECT w.worker_id, " +
                "u.user_id, " +
                "u.full_name, " +
                "u.email, " +
                "u.mobile_no, " +
                "u.username, " +
                "u.password, " +
                "u.role, " +
                "u.status, " +
                "w.skill, " +
                "w.salary, " +
                "w.profile_photo " +
                "FROM users u " +
                "INNER JOIN worker w " +
                "ON u.user_id = w.user_id " +
                "WHERE u.user_id = ?";


        return jdbcTemplate.queryForObject(
                sql,
                new Object[]{userId},
                (rs, rowNum) -> {

                    Worker worker = new Worker();

                    worker.setWorkerId(
                            rs.getInt("worker_id")
                    );

                    worker.setUserId(
                            rs.getInt("user_id")
                    );

                    worker.setFullName(
                            rs.getString("full_name")
                    );

                    worker.setEmail(
                            rs.getString("email")
                    );

                    worker.setMobileNo(
                            rs.getString("mobile_no")
                    );

                    worker.setUsername(
                            rs.getString("username")
                    );

                    worker.setPassword(
                            rs.getString("password")
                    );

                    worker.setRole(
                            rs.getString("role")
                    );

                    worker.setStatus(
                            rs.getString("status")
                    );

                    worker.setSkill(
                            rs.getString("skill")
                    );

                    worker.setSalary(
                            rs.getDouble("salary")
                    );

                    worker.setProfilePhoto(
                            rs.getString("profile_photo")
                    );

                    return worker;
                }
        );
    }


    // ============================================================
    // Get Assigned Jobs For Worker
    // ============================================================

    public List<Map<String, Object>> getAssignedJobs(
            int workerId) {

        String sql =
                "SELECT job_id, " +
                "customer_id, " +
                "worker_id, " +
                "machine_id, " +
                "part_name, " +
                "quantity, " +
                "material, " +
                "design_file, " +
                "status " +
                "FROM job_order " +
                "WHERE worker_id = ?";

        return jdbcTemplate.queryForList(
                sql,
                workerId
        );
    }


    // ============================================================
    // Count Assigned Jobs
    // ============================================================

    public int getAssignedJobCount(
            int workerId) {

        String sql =
                "SELECT COUNT(*) " +
                "FROM job_order " +
                "WHERE worker_id = ?";

        return jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                workerId
        );
    }


    // ============================================================
    // Count In Progress Jobs
    // ============================================================

    public int getInProgressJobCount(
            int workerId) {

        String sql =
                "SELECT COUNT(*) " +
                "FROM job_order " +
                "WHERE worker_id = ? " +
                "AND status = 'In Progress'";

        return jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                workerId
        );
    }


    // ============================================================
    // Count Completed Jobs
    // ============================================================

    public int getCompletedJobCount(
            int workerId) {

        String sql =
                "SELECT COUNT(*) " +
                "FROM job_order " +
                "WHERE worker_id = ? " +
                "AND status = 'Completed'";

        return jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                workerId
        );
    }


    // ============================================================
    // Update Job Status
    // ============================================================

    public boolean updateJobStatus(
            Integer jobId,
            String status) {

        int result = jdbcTemplate.update(
                "UPDATE job_order SET status=? WHERE job_id=?",
                status,
                jobId
        );

        if (result > 0) {

            jdbcTemplate.update(
                    "INSERT INTO job_status_history(job_id,status) " +
                    "VALUES(?,?)",
                    jobId,
                    status
            );

            return true;
        }

        return false;
    }


    // ============================================================
    // Get Jobs Assigned To Worker
    // ============================================================

    public List<Map<String, Object>> getWorkerJobs(
            int workerId) {

        String sql =
                "SELECT jo.job_id, " +
                "jo.part_name, " +
                "jo.quantity, " +
                "jo.material, " +
                "jo.status, " +
                "jo.customer_id, " +
                "jo.machine_id " +
                "FROM job_order jo " +
                "WHERE jo.worker_id = ? " +
                "ORDER BY jo.job_id DESC";

        return jdbcTemplate.queryForList(
                sql,
                workerId
        );
    }


    // ============================================================
    // Update Job Status
    // ============================================================

    public boolean updateJobStatus(
            int jobId,
            String status) {

        String sql =
                "UPDATE job_order " +
                "SET status = ? " +
                "WHERE job_id = ?";

        int result = jdbcTemplate.update(
                sql,
                status,
                jobId
        );

        if (result > 0) {

            String historySql =
                    "INSERT INTO job_status_history(job_id,status) " +
                    "VALUES(?,?)";

            jdbcTemplate.update(
                    historySql,
                    jobId,
                    status
            );

            return true;
        }

        return false;
    }


    // ============================================================
    // Get Status History For Logged-In Worker
    // ============================================================

    public List<Map<String, Object>> getWorkerStatusHistory(
            int workerId) {

        String sql =
                "SELECT " +
                "jsh.id, " +
                "jsh.job_id, " +
                "jsh.status, " +
                "jo.part_name, " +
                "jo.quantity, " +
                "jo.material, " +
                "jo.machine_id " +
                "FROM job_status_history jsh " +
                "INNER JOIN job_order jo " +
                "ON jsh.job_id = jo.job_id " +
                "WHERE jo.worker_id = ? " +
                "ORDER BY jsh.id DESC";

        return jdbcTemplate.queryForList(
                sql,
                workerId
        );
    }
}