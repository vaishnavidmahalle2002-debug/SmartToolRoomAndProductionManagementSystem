package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.DashboardSummary;
import com.example.demo.service.DashboardSummaryService;

@RestController
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class DashboardSummaryController {


    @Autowired
    DashboardSummaryService service;


    @GetMapping("/adminDashboardSummary")
    public DashboardSummary getDashboardSummary() {

        return service.getDashboardSummary();

    }

}