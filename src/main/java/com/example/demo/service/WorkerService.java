package com.example.demo.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Worker;
import com.example.demo.repository.WorkerRepository;

@Service("workerService")
public class WorkerService {

    @Autowired
    private WorkerRepository workerRepo;


    // ============================================================
    // Add Worker
    // ============================================================

    public boolean addWorker(Worker worker) {

        /*
         * userId is NOT required from frontend.
         *
         * Repository automatically:
         *
         * 1. Finds existing user using username/email/mobile.
         * 2. Reuses existing user_id.
         * 3. Checks whether worker already exists.
         * 4. Creates only worker if necessary.
         * 5. Creates users + worker if completely new.
         */

        if (worker == null) {
            return false;
        }

        return workerRepo.addWorker(worker);
    }


    // ============================================================
    // View All Workers
    // ============================================================

    public List<Worker> getAllWorkers() {
        return workerRepo.getAllWorkers();
    }


    // ============================================================
    // View Worker By ID
    // ============================================================

    public Worker getWorkerById(int workerId) {
        return workerRepo.getWorkerById(workerId);
    }


    // ============================================================
    // Update Worker
    // ============================================================

    public boolean updateWorker(Worker worker) {
        return workerRepo.updateWorker(worker);
    }


    // ============================================================
    // Delete Worker
    // ============================================================

    public boolean deleteWorker(int userId) {
        return workerRepo.deleteWorker(userId);
    }


    // ============================================================
    // Assign Skill
    // ============================================================

    public boolean assignSkill(
            int userId,
            String skill) {

        return workerRepo.assignSkill(
                userId,
                skill
        );
    }


    // ============================================================
    // Get Worker By User ID
    // ============================================================

    public Worker getWorkerByUserId(
            int userId) {

        return workerRepo.getWorkerByUserId(
                userId
        );
    }


    // ============================================================
    // Get Assigned Jobs
    // ============================================================

    public List<Map<String, Object>> getAssignedJobs(
            int workerId) {

        return workerRepo.getAssignedJobs(
                workerId
        );
    }


    // ============================================================
    // Count Assigned Jobs
    // ============================================================

    public int getAssignedJobCount(
            int workerId) {

        return workerRepo.getAssignedJobCount(
                workerId
        );
    }


    // ============================================================
    // Count In Progress Jobs
    // ============================================================

    public int getInProgressJobCount(
            int workerId) {

        return workerRepo.getInProgressJobCount(
                workerId
        );
    }


    // ============================================================
    // Count Completed Jobs
    // ============================================================

    public int getCompletedJobCount(
            int workerId) {

        return workerRepo.getCompletedJobCount(
                workerId
        );
    }


    // ============================================================
    // Update Job Status
    // ============================================================

    public boolean updateJobStatus(
            Integer jobId,
            String status) {

        return workerRepo.updateJobStatus(
                jobId,
                status
        );
    }


    // ============================================================
    // Get Worker Jobs
    // ============================================================

    public List<Map<String, Object>> getWorkerJobs(
            int workerId) {

        return workerRepo.getWorkerJobs(
                workerId
        );
    }


    // ============================================================
    // Update Job Status
    // ============================================================

    public boolean updateJobStatus(
            int jobId,
            String status) {

        return workerRepo.updateJobStatus(
                jobId,
                status
        );
    }


    // ============================================================
    // Get Worker Status History
    // ============================================================

    public List<Map<String, Object>> getWorkerStatusHistory(
            int workerId) {

        return workerRepo.getWorkerStatusHistory(
                workerId
        );
    }
}