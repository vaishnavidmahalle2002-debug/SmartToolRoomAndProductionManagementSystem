package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.ReportService;

@RestController
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class ReportController {

    @Autowired
    ReportService reportService;

    
    @GetMapping("/reportCustomer")
    public List<Map<String, Object>> getCustomerReport() {

        return reportService.getCustomerReport();
    }

   
    @GetMapping("/reportWorker")
    public List<Map<String, Object>> getWorkerReport() {

        return reportService.getWorkerReport();
    }

   
    @GetMapping("/reportMachine")
    public List<Map<String, Object>> getMachineReport() {

        return reportService.getMachineReport();
    }

   
    @GetMapping("/reportjob")
    public List<Map<String, Object>> getJobReport() {

        return reportService.getJobReport();
    }

   
    @GetMapping("/reportRevenue")
    public List<Map<String, Object>> getRevenueReport() {

        return reportService.getRevenueReport();
    }

}