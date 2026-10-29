package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.JobOrder;
import com.example.demo.model.JobStatus;
import com.example.demo.repository.JobStatusRepository;

@Service("jobStatusService")
public class JobStatusService {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private JobStatusRepository jobStatusRepo;


    // =====================================================
    // VIEW ASSIGNED JOBS
    // =====================================================

    public List<JobOrder> getAssignedJobs() {

        return jobStatusRepo.getAssignedJobs();
    }


    // =====================================================
    // UPDATE JOB STATUS
    // =====================================================

    public boolean updateStatus(JobStatus jobStatus) {

        // Update status first
        boolean updated =
                jobStatusRepo.updateStatus(jobStatus);

        // If status updated successfully,
        // create customer notification
        if (updated) {

            Integer customerUserId =
                    jobStatusRepo.getCustomerUserIdByJobId(
                            jobStatus.getJob_id()
                    );

            if (customerUserId != null) {

                notificationService.createNotification(

                        customerUserId,

                        "JOB_STATUS",

                        "Order status updated",

                        "Your order #"
                                + jobStatus.getJob_id()
                                + " status has been updated to "
                                + jobStatus.getStatus()
                                + ".",

                        jobStatus.getJob_id()
                );
            }
        }

        return updated;
    }


    // =====================================================
    // MARK JOB COMPLETE
    // =====================================================

    public boolean markComplete(int jobId) {

        return jobStatusRepo.markComplete(jobId);
    }


    // =====================================================
    // VIEW STATUS HISTORY
    // =====================================================

    public List<JobStatus> getJobStatusHistory() {

        return jobStatusRepo.getJobStatusHistory();
    }


    // =====================================================
    // ADMIN - VIEW ALL JOB STATUSES
    // =====================================================

    public List<JobOrder> getAllJobStatuses() {

        return jobStatusRepo.getAllJobStatuses();
    }
}