package com.example.demo.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.JobOrder;
import com.example.demo.model.JobStatus;

@Repository("jobStatusRepo")
public class JobStatusRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    // View Assigned Jobs
    public List<JobOrder> getAssignedJobs() {

        return jdbcTemplate.query(

                "SELECT * FROM job_order WHERE status='Assigned'",

                new RowMapper<JobOrder>() {

                    @Override
                    public JobOrder mapRow(ResultSet rs, int rowNum) throws SQLException {

                        JobOrder job = new JobOrder();

                        job.setJob_id(rs.getInt("job_id"));
                        job.setCustomer_id(rs.getInt("customer_id"));
                        Integer workerId = (Integer) rs.getObject("worker_id");
                        job.setWorker_id(workerId);

                        Integer machineId = (Integer) rs.getObject("machine_id");
                        job.setMachine_id(machineId);
                        job.setPart_name(rs.getString("part_name"));
                        job.setQuantity(rs.getInt("quantity"));
                        job.setMaterial(rs.getString("material"));
                        job.setDesign_file(rs.getString("design_file"));
                        job.setStatus(rs.getString("status"));

                        return job;
                    }

                });

    }

    // Update Status
    public boolean updateStatus(JobStatus jobStatus) {

        // Update latest status in job_order table
        int updateJob = jdbcTemplate.update(

                "UPDATE job_order SET status=? WHERE job_id=?",

                jobStatus.getStatus(),
                jobStatus.getJob_id());

        // Save history
        int insertHistory = jdbcTemplate.update(

                "INSERT INTO job_status_history(job_id,status) VALUES(?,?)",

                jobStatus.getJob_id(),
                jobStatus.getStatus());

        return updateJob > 0 && insertHistory > 0;
    }
    
    

    // Mark Complete
    public boolean markComplete(int jobId) {

        // Update job_order
        int updateJob = jdbcTemplate.update(

                "UPDATE job_order SET status='Completed' WHERE job_id=?",

                jobId);

        // Save history
        int insertHistory = jdbcTemplate.update(

                "INSERT INTO job_status_history(job_id,status) VALUES(?,?)",

                jobId,
                "Completed");

        return updateJob > 0 && insertHistory > 0;
    }

    // View Status History
    public List<JobStatus> getJobStatusHistory() {

        return jdbcTemplate.query(

                "SELECT * FROM job_status_history",

                new RowMapper<JobStatus>() {

                    @Override
                    public JobStatus mapRow(ResultSet rs, int rowNum) throws SQLException {

                        JobStatus status = new JobStatus();

                        status.setId(rs.getInt("id"));
                        status.setJob_id(rs.getInt("job_id"));
                        status.setStatus(rs.getString("status"));

                        return status;
                    }

                });

    }
    
 // =====================================================
 // ADMIN - VIEW ALL JOB STATUSES
 // =====================================================

 public List<JobOrder> getAllJobStatuses() {

     return jdbcTemplate.query(

         "SELECT * FROM job_order ORDER BY job_id DESC",

         new RowMapper<JobOrder>() {

             @Override
             public JobOrder mapRow(ResultSet rs, int rowNum)
                     throws SQLException {

                 JobOrder job = new JobOrder();

                 job.setJob_id(rs.getInt("job_id"));
                 job.setCustomer_id(rs.getInt("customer_id"));
                 Integer workerId = (Integer) rs.getObject("worker_id");
                 job.setWorker_id(workerId);

                 Integer machineId = (Integer) rs.getObject("machine_id");
                 job.setMachine_id(machineId);
                 job.setPart_name(rs.getString("part_name"));
                 job.setQuantity(rs.getInt("quantity"));
                 job.setMaterial(rs.getString("material"));
                 job.setDesign_file(rs.getString("design_file"));
                 job.setStatus(rs.getString("status"));

                 return job;
             }
         }
     );
 }
 
 public Integer getCustomerUserIdByJobId(int jobId) {

	    String sql =
	            "SELECT c.user_id " +
	            "FROM job_order j " +
	            "JOIN customer c ON j.customer_id = c.customer_id " +
	            "WHERE j.job_id = ?";

	    return jdbcTemplate.queryForObject(
	            sql,
	            Integer.class,
	            jobId
	    );
	}

}




