package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Worker;
import com.example.demo.service.WorkerService;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "${app.cors.allowed-origins}",
	    allowCredentials = "true"
	)
public class WorkerController {

    @Autowired
    WorkerService workerService;


    @PostMapping("/addWorker")
    public String addWorker(@RequestBody Worker worker) {

        boolean result = workerService.addWorker(worker);

        if (result) {
            return "Worker added successfully";
        } else {
            return "Worker not added";
        }
    }
    

    @GetMapping("/viewallWorkers")
    public List<Worker> getAllWorkers() {

        return workerService.getAllWorkers();
    }


    @GetMapping("/viewWorker/{workerId}")
    public Worker getWorkerById(@PathVariable int workerId) {

        return workerService.getWorkerById(workerId);
    }


    @PutMapping("/updWorker")
    public String updateWorker(@RequestBody Worker worker) {

        boolean result = workerService.updateWorker(worker);

        if (result) {
            return "Worker updated successfully";
        } else {
            return "Worker not updated";
        }
    }

   

    @DeleteMapping("/deleWorker/{userId}")
    public String deleteWorker(@PathVariable int userId) {

        boolean result = workerService.deleteWorker(userId);

        if (result) {
            return "Worker deleted successfully";
        } else {
            return "Worker not deleted";
        }
    }


    @PutMapping("/skillWorker/skill/{userId}")
    public String assignSkill(@PathVariable int userId,
                              @RequestParam String skill) {

        boolean result = workerService.assignSkill(userId, skill);

        if (result) {
            return "Skill assigned successfully";
        } else {
            return "Skill not assigned";
        }
    }

    @GetMapping("/currentWorker")
    public Worker getCurrentWorker(HttpSession session) {

        Integer userId = (Integer) session.getAttribute("userId");

        if (userId == null) {
            return null;
        }

        return workerService.getWorkerByUserId(userId);
    }
    
    @GetMapping("/workerJobs")
    public List<Map<String, Object>> getWorkerJobs(HttpSession session) {

        Integer userId = (Integer) session.getAttribute("userId");

        if (userId == null) {
            throw new RuntimeException("Worker not logged in");
        }

        Worker worker = workerService.getWorkerByUserId(userId);

        return workerService.getAssignedJobs(worker.getWorkerId());
    }
    
    @PutMapping("/workerJobStatus/{jobId}")
    public String updateWorkerJobStatus(
            @PathVariable int jobId,
            @RequestParam String status,
            HttpSession session) {

        Integer userId = (Integer) session.getAttribute("userId");

        if (userId == null) {
            return "Worker not logged in";
        }

        boolean result =
            workerService.updateJobStatus(jobId, status);

        if (result) {
            return "Job status updated successfully";
        }

        return "Job status not updated";
    }
    
 

 @GetMapping("/workerJobs/{workerId}")
 public List<Map<String, Object>> getWorkerJobs(
         @PathVariable int workerId) {

     return workerService.getWorkerJobs(workerId);
 }


 
 @PutMapping("/updateJobStatus")
 public String updateJobStatus(
         @RequestParam int jobId,
         @RequestParam String status) {

     boolean result =
             workerService.updateJobStatus(jobId, status);

     if (result) {
         return "Job status updated successfully";
     }

     return "Job status not updated";
 }
 
//======================================================
//Worker Status History
//======================================================

@GetMapping("/workerStatusHistory")
public List<Map<String, Object>> getWorkerStatusHistory(
      HttpSession session) {

  Integer userId =
          (Integer) session.getAttribute("userId");

  if (userId == null) {

      throw new RuntimeException(
              "Worker not logged in"
      );
  }

  Worker worker =
          workerService.getWorkerByUserId(userId);

  return workerService.getWorkerStatusHistory(
          worker.getWorkerId()
  );
}
}