package com.example.demo.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.ReportRepository;

@Service("reportService")
public class ReportService {

    @Autowired
    ReportRepository reportRepo;

    // Customer Report
    public List<Map<String, Object>> getCustomerReport() {

        return reportRepo.getCustomerReport();
    }

    // Worker Report
    public List<Map<String, Object>> getWorkerReport() {

        return reportRepo.getWorkerReport();
    }

    // Machine Report
    public List<Map<String, Object>> getMachineReport() {

        return reportRepo.getMachineReport();
    }

    // Job Report
    public List<Map<String, Object>> getJobReport() {

        return reportRepo.getJobReport();
    }

    // Revenue Report
    public List<Map<String, Object>> getRevenueReport() {

        return reportRepo.getRevenueReport();
    }

}