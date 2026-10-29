package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.JobOrder;
import com.example.demo.service.JobOrderService;

@RestController
@CrossOrigin(origins = "${app.cors.allowed-origins}",
        allowCredentials = "true"
)
public class JobOrderController {

    @Autowired
    private JobOrderService jobOrderService;


    // =========================================================
    // CUSTOMER - CREATE NEW JOB ORDER
    // =========================================================

    @PostMapping(
            value = "/customer/addJob",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public String addCustomerJob(

            @RequestParam("customerId")
            Integer customerId,

            @RequestParam("partName")
            String partName,

            @RequestParam(value = "jobType", required = false)
            String jobType,

            @RequestParam("quantity")
            Integer quantity,

            @RequestParam("requiredDate")
            String requiredDate,

            @RequestParam(value = "description", required = false)
            String description,

            @RequestParam(
                    value = "additionalRequirements",
                    required = false
            )
            String additionalRequirements,

            @RequestParam(
                    value = "material",
                    required = false
            )
            String material,

            @RequestParam(
                    value = "designFile",
                    required = false
            )
            MultipartFile designFile) {

        try {

            JobOrder job = new JobOrder();

            job.setCustomer_id(customerId);

            // Customer-created jobs are initially unassigned
            job.setWorker_id(null);
            job.setMachine_id(null);

            job.setPart_name(partName);
            job.setJob_type(jobType);
            job.setQuantity(quantity);

            job.setRequired_date(
                    java.sql.Date.valueOf(requiredDate)
            );

            job.setDescription(description);

            job.setAdditional_requirements(
                    additionalRequirements
            );

            job.setMaterial(material);

            if (designFile != null && !designFile.isEmpty()) {

                job.setDesign_file(
                        designFile.getOriginalFilename()
                );

            } else {

                job.setDesign_file(null);
            }

            // Customer jobs always start with Pending
            job.setStatus("Pending");

            boolean result =
                    jobOrderService.addCustomerJob(job);

            if (result) {
                return "Job order submitted successfully";
            }

            return "Job order submission failed";

        } catch (Exception e) {

            e.printStackTrace();

            return "Job order submission failed: "
                    + e.getMessage();
        }
    }


    // =========================================================
    // ADMIN - CREATE JOB
    // =========================================================

    @PostMapping("/addJob")
    public String addJob(@RequestBody JobOrder job) {

        boolean result =
                jobOrderService.addJob(job);

        return result
                ? "Job created successfully"
                : "Job creation failed";
    }


    // =========================================================
    // VIEW ALL JOBS
    // =========================================================

    @GetMapping("/viewallJob")
    public List<JobOrder> getAllJobs() {

        return jobOrderService.getAllJobs();
    }


    // =========================================================
    // VIEW JOB BY ID
    // =========================================================

    @GetMapping("/viewJob/{jobId}")
    public JobOrder getJobById(
            @PathVariable int jobId) {

        return jobOrderService.getJobById(jobId);
    }


    // =========================================================
    // UPDATE JOB
    // =========================================================

    @PutMapping("/updJob")
    public String updateJob(
            @RequestBody JobOrder job) {

        boolean result =
                jobOrderService.updateJob(job);

        return result
                ? "Job updated successfully"
                : "Job update failed";
    }


    // =========================================================
    // DELETE JOB
    // =========================================================

    @DeleteMapping("/delJob/{jobId}")
    public String deleteJob(
            @PathVariable int jobId) {

        boolean result =
                jobOrderService.deleteJob(jobId);

        return result
                ? "Job deleted successfully"
                : "Job deletion failed";
    }


    // =========================================================
    // ASSIGN WORKER
    // =========================================================
    // ADMIN USES THIS TO ASSIGN A WORKER TO A JOB
    //
    // Example:
    // PUT http://localhost:8080/job/assignWorker/5?workerId=2
    // =========================================================

    @PutMapping("/job/assignWorker/{jobId}")
    public String assignWorker(

            @PathVariable int jobId,

            @RequestParam int workerId) {

        boolean result =
                jobOrderService.assignWorker(
                        jobId,
                        workerId
                );

        return result
                ? "Worker assigned successfully"
                : "Worker assignment failed";
    }


    // =========================================================
    // ASSIGN MACHINE
    // =========================================================

    @PutMapping("/job/assignMachine/{jobId}")
    public String assignMachine(

            @PathVariable int jobId,

            @RequestParam int machineId) {

        boolean result =
                jobOrderService.assignMachine(
                        jobId,
                        machineId
                );

        return result
                ? "Machine assigned successfully"
                : "Machine assignment failed";
    }


    // =========================================================
    // UPLOAD DESIGN
    // =========================================================

    @PutMapping("/job/uploadDesign/{jobId}")
    public String uploadDesign(

            @PathVariable int jobId,

            @RequestParam String designFile) {

        boolean result =
                jobOrderService.uploadDesign(
                        jobId,
                        designFile
                );

        return result
                ? "Design uploaded successfully"
                : "Design upload failed";
    }


    // =========================================================
    // START JOB
    // =========================================================

    @PutMapping("/job/start/{jobId}")
    public String startJob(
            @PathVariable int jobId) {

        boolean result =
                jobOrderService.startJob(jobId);

        return result
                ? "Job started successfully"
                : "Job start failed";
    }


    // =========================================================
    // COMPLETE JOB
    // =========================================================

    @PutMapping("/job/complete/{jobId}")
    public String completeJob(
            @PathVariable int jobId) {

        boolean result =
                jobOrderService.completeJob(jobId);

        return result
                ? "Job completed successfully"
                : "Job completion failed";
    }


    // =========================================================
    // VIEW CUSTOMER JOBS
    // =========================================================

    @GetMapping("/viewJobByCustomer/{customerId}")
    public List<JobOrder> getJobsByCustomer(

            @PathVariable int customerId) {

        return jobOrderService.getJobsByCustomer(
                customerId
        );
    }
}