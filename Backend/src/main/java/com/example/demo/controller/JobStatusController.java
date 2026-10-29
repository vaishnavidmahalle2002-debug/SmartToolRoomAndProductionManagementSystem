package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.JobOrder;
import com.example.demo.model.JobStatus;
import com.example.demo.service.JobStatusService;

@RestController
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class JobStatusController {

    @Autowired
    JobStatusService jobStatusService;

    // View Assigned Jobs
    @GetMapping("/viewAssignedJobs")
    public List<JobOrder> getAssignedJobs() {

        return jobStatusService.getAssignedJobs();
    }

    // Update Job Status
    @PutMapping("/updJobStatus")
    public String updateStatus(@RequestBody JobStatus jobStatus) {

        boolean result = jobStatusService.updateStatus(jobStatus);

        return result ? "Job status updated successfully"
                      : "Job status update failed";
    }

    // Mark Job Complete
    @PutMapping("/markComplete/{jobId}")
    public String markComplete(@PathVariable int jobId) {

        boolean result = jobStatusService.markComplete(jobId);

        return result ? "Job marked as completed"
                      : "Unable to complete job";
    }

    // View Status History
    @GetMapping("/jobStatusHistory")
    public List<JobStatus> getJobStatusHistory() {

        return jobStatusService.getJobStatusHistory();
    }
    
 // =====================================================
 // ADMIN - VIEW ALL JOB STATUSES
 // =====================================================

 @GetMapping("/adminJobStatuses")
 public List<JobOrder> getAllJobStatuses() {

     return jobStatusService.getAllJobStatuses();

 }

}