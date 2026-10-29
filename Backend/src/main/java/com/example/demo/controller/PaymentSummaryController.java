
package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.PaymentSummary;
import com.example.demo.service.PaymentSummaryService;

@RestController
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class PaymentSummaryController {


    @Autowired
    PaymentSummaryService service;


    @GetMapping("/adminPaymentSummary")
    public PaymentSummary getPaymentSummary() {

        return service.getPaymentSummary();

    }

}

