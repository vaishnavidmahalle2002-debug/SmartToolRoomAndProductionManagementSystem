package com.example.demo.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.JobOrder;

@Repository("jobOrderRepo")
public class JobOrderRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    // =========================================================
    // ADMIN - CREATE JOB
    // =========================================================

    public boolean addJob(JobOrder job) {

        String sql =
                "INSERT INTO job_order " +
                "(customer_id, worker_id, machine_id, part_name, job_type, " +
                "quantity, required_date, description, additional_requirements, " +
                "material, design_file, status) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        int value = jdbcTemplate.update(

                sql,

                job.getCustomer_id(),
                job.getWorker_id(),
                job.getMachine_id(),
                job.getPart_name(),
                job.getJob_type(),
                job.getQuantity(),
                job.getRequired_date(),
                job.getDescription(),
                job.getAdditional_requirements(),
                job.getMaterial(),
                job.getDesign_file(),
                job.getStatus()
        );

        return value > 0;
    }


    // =========================================================
    // CUSTOMER - CREATE NEW JOB ORDER
    // =========================================================

    public boolean addCustomerJob(JobOrder job) {

        String sql =
                "INSERT INTO job_order " +
                "(customer_id, worker_id, machine_id, part_name, job_type, " +
                "quantity, required_date, description, additional_requirements, " +
                "material, design_file, status) " +
                "VALUES (?, NULL, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        int value = jdbcTemplate.update(

                sql,

                job.getCustomer_id(),
                job.getPart_name(),
                job.getJob_type(),
                job.getQuantity(),
                job.getRequired_date(),
                job.getDescription(),
                job.getAdditional_requirements(),
                job.getMaterial(),
                job.getDesign_file(),
                "Pending"
        );

        return value > 0;
    }


    // =========================================================
    // VIEW ALL JOBS
    // =========================================================

    public List<JobOrder> getAllJobs() {

        String sql =
                "SELECT * FROM job_order " +
                "ORDER BY job_id DESC";

        return jdbcTemplate.query(
                sql,
                new JobOrderRowMapper()
        );
    }


    // =========================================================
    // VIEW JOB BY ID
    // =========================================================

    public JobOrder getJobById(int jobId) {

        String sql =
                "SELECT * FROM job_order " +
                "WHERE job_id=?";

        return jdbcTemplate.queryForObject(

                sql,

                new JobOrderRowMapper(),

                jobId
        );
    }


    // =========================================================
    // UPDATE JOB
    // =========================================================

    public boolean updateJob(JobOrder job) {

        String sql =
                "UPDATE job_order SET " +
                "customer_id=?, " +
                "worker_id=?, " +
                "machine_id=?, " +
                "part_name=?, " +
                "quantity=?, " +
                "material=?, " +
                "design_file=?, " +
                "status=? " +
                "WHERE job_id=?";

        int value = jdbcTemplate.update(

                sql,

                job.getCustomer_id(),
                job.getWorker_id(),
                job.getMachine_id(),
                job.getPart_name(),
                job.getQuantity(),
                job.getMaterial(),
                job.getDesign_file(),
                job.getStatus(),
                job.getJob_id()
        );

        return value > 0;
    }


    // =========================================================
    // DELETE JOB
    // =========================================================

    public boolean deleteJob(int jobId) {

        String sql =
                "DELETE FROM job_order " +
                "WHERE job_id=?";

        int value =
                jdbcTemplate.update(sql, jobId);

        return value > 0;
    }


    // =========================================================
    // ASSIGN WORKER
    // =========================================================

    public int assignWorker(
            int jobId,
            int workerId) {

        String sql =
                "UPDATE job_order " +
                "SET worker_id=? " +
                "WHERE job_id=?";

        return jdbcTemplate.update(
                sql,
                workerId,
                jobId
        );
    }


    // =========================================================
    // ASSIGN MACHINE
    // =========================================================

    public boolean assignMachine(
            int jobId,
            int machineId) {

        String sql =
                "UPDATE job_order " +
                "SET machine_id=? " +
                "WHERE job_id=?";

        int value = jdbcTemplate.update(

                sql,

                machineId,
                jobId
        );

        return value > 0;
    }


    // =========================================================
    // UPLOAD DESIGN
    // =========================================================

    public boolean uploadDesign(
            int jobId,
            String designFile) {

        String sql =
                "UPDATE job_order " +
                "SET design_file=? " +
                "WHERE job_id=?";

        int value = jdbcTemplate.update(

                sql,

                designFile,
                jobId
        );

        return value > 0;
    }


    // =========================================================
    // START JOB
    // =========================================================

    public boolean startJob(int jobId) {

        String sql =
                "UPDATE job_order " +
                "SET status='In Progress' " +
                "WHERE job_id=?";

        int value =
                jdbcTemplate.update(sql, jobId);

        return value > 0;
    }


    // =========================================================
    // COMPLETE JOB
    // =========================================================

    public boolean completeJob(int jobId) {

        String sql =
                "UPDATE job_order " +
                "SET status='Completed' " +
                "WHERE job_id=?";

        int value =
                jdbcTemplate.update(sql, jobId);

        return value > 0;
    }


    // =========================================================
    // VIEW CUSTOMER JOBS
    // =========================================================

    public List<JobOrder> getJobsByCustomer(
            int customerId) {

        String sql =
                "SELECT * FROM job_order " +
                "WHERE customer_id=? " +
                "ORDER BY job_id DESC";

        return jdbcTemplate.query(

                sql,

                new JobOrderRowMapper(),

                customerId
        );
    }


    // =========================================================
    // GET CUSTOMER USER ID BY JOB ID
    // =========================================================

    public Integer getCustomerUserIdByJobId(
            int jobId) {

        String sql =
                "SELECT c.user_id " +
                "FROM job_order j " +
                "JOIN customer c " +
                "ON j.customer_id = c.customer_id " +
                "WHERE j.job_id=?";

        return jdbcTemplate.queryForObject(

                sql,

                Integer.class,

                jobId
        );
    }


    // =========================================================
    // COMMON JOB ORDER ROW MAPPER
    // =========================================================

    private static class JobOrderRowMapper
            implements RowMapper<JobOrder> {

        @Override
        public JobOrder mapRow(
                ResultSet rs,
                int rowNum)
                throws SQLException {

            JobOrder job = new JobOrder();

            job.setJob_id(
                    rs.getInt("job_id")
            );

            job.setCustomer_id(
                    rs.getInt("customer_id")
            );

            // IMPORTANT:
            // worker_id can be NULL
            job.setWorker_id(
                    rs.getObject(
                            "worker_id",
                            Integer.class
                    )
            );

            // IMPORTANT:
            // machine_id can be NULL
            job.setMachine_id(
                    rs.getObject(
                            "machine_id",
                            Integer.class
                    )
            );

            job.setPart_name(
                    rs.getString("part_name")
            );

            job.setJob_type(
                    rs.getString("job_type")
            );

            job.setQuantity(
                    rs.getObject(
                            "quantity",
                            Integer.class
                    )
            );

            job.setRequired_date(
                    rs.getDate("required_date")
            );

            job.setDescription(
                    rs.getString("description")
            );

            job.setAdditional_requirements(
                    rs.getString(
                            "additional_requirements"
                    )
            );

            job.setMaterial(
                    rs.getString("material")
            );

            job.setDesign_file(
                    rs.getString("design_file")
            );

            job.setStatus(
                    rs.getString("status")
            );

            return job;
        }
    }
}