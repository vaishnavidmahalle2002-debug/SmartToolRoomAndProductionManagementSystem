
package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.PaymentSummary;
import com.example.demo.repository.PaymentSummaryRepository;

@Service
public class PaymentSummaryService {


    @Autowired
    PaymentSummaryRepository repository;


    public PaymentSummary getPaymentSummary() {

        return repository.getPaymentSummary();

    }

}

