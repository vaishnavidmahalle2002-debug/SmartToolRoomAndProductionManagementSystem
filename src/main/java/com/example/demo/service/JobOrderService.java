package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.JobOrder;
import com.example.demo.repository.JobOrderRepository;

@Service("jobOrderService")
public class JobOrderService {

    @Autowired
    private JobOrderRepository jobOrderRepo;


    // =========================================================
    // ADMIN - CREATE JOB
    // =========================================================

    public boolean addJob(JobOrder job) {

        return jobOrderRepo.addJob(job);
    }


    // =========================================================
    // CUSTOMER - CREATE JOB
    // =========================================================

    public boolean addCustomerJob(JobOrder job) {

        return jobOrderRepo.addCustomerJob(job);
    }


    // =========================================================
    // VIEW ALL JOBS
    // =========================================================

    public List<JobOrder> getAllJobs() {

        return jobOrderRepo.getAllJobs();
    }


    // =========================================================
    // VIEW JOB BY ID
    // =========================================================

    public JobOrder getJobById(int jobId) {

        return jobOrderRepo.getJobById(jobId);
    }


    // =========================================================
    // UPDATE JOB
    // =========================================================

    public boolean updateJob(JobOrder job) {

        return jobOrderRepo.updateJob(job);
    }


    // =========================================================
    // DELETE JOB
    // =========================================================

    public boolean deleteJob(int jobId) {

        return jobOrderRepo.deleteJob(jobId);
    }


    // =========================================================
    // ASSIGN WORKER
    // =========================================================

    public boolean assignWorker(
            int jobId,
            int workerId) {

        return jobOrderRepo.assignWorker(
                jobId,
                workerId
        ) > 0;
    }


    // =========================================================
    // ASSIGN MACHINE
    // =========================================================

    public boolean assignMachine(
            int jobId,
            int machineId) {

        return jobOrderRepo.assignMachine(
                jobId,
                machineId
        );
    }


    // =========================================================
    // UPLOAD DESIGN
    // =========================================================

    public boolean uploadDesign(
            int jobId,
            String designFile) {

        return jobOrderRepo.uploadDesign(
                jobId,
                designFile
        );
    }


    // =========================================================
    // START JOB
    // =========================================================

    public boolean startJob(int jobId) {

        return jobOrderRepo.startJob(jobId);
    }


    // =========================================================
    // COMPLETE JOB
    // =========================================================

    public boolean completeJob(int jobId) {

        return jobOrderRepo.completeJob(jobId);
    }


    // =========================================================
    // CUSTOMER JOBS
    // =========================================================

    public List<JobOrder> getJobsByCustomer(
            int customerId) {

        return jobOrderRepo.getJobsByCustomer(
                customerId
        );
    }
}