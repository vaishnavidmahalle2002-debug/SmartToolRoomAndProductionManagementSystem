package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.DashboardSummary;
import com.example.demo.repository.DashboardSummaryRepository;

@Service
public class DashboardSummaryService {

    @Autowired
    DashboardSummaryRepository repository;


    public DashboardSummary getDashboardSummary() {

        return repository.getDashboardSummary();

    }
}