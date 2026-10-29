package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Payment;
import com.example.demo.model.PaymentSummary;
import com.example.demo.repository.PaymentRepository;

@Service("paymentService")
public class PaymentService {

    @Autowired
    PaymentRepository paymentRepo;


    // =====================================================
    // ADMIN - RECEIVE PAYMENT
    // =====================================================

    public boolean receivePayment(
            Payment payment) {

        return paymentRepo.receivePayment(
                payment
        );
    }


    // =====================================================
    // ADMIN - PAYMENT HISTORY
    // =====================================================

    public List<Payment> getAllPayments() {

        return paymentRepo.getAllPayments();
    }


    // =====================================================
    // ADMIN - VIEW PAYMENT
    // =====================================================

    public Payment getPaymentById(
            int paymentId) {

        return paymentRepo.getPaymentById(
                paymentId
        );
    }


    // =====================================================
    // ADMIN - DUE AMOUNT
    // =====================================================

    public double getDueAmount(
            int invoiceId) {

        return paymentRepo.getDueAmount(
                invoiceId
        );
    }


    // =====================================================
    // ADMIN - DELETE PAYMENT
    // =====================================================

    public boolean deletePayment(
            int paymentId) {

        return paymentRepo.deletePayment(
                paymentId
        );
    }


    // =====================================================
    // CUSTOMER - INVOICE FOR PAYMENT
    // =====================================================

    public Payment getCustomerInvoiceForPayment(
            int invoiceId,
            int userId) {

        return paymentRepo.getCustomerInvoiceForPayment(
                invoiceId,
                userId
        );
    }


    // =====================================================
    // CUSTOMER - SAVE PAYMENT
    // =====================================================

    public boolean saveCustomerPayment(
            Payment payment) {

        return paymentRepo.saveCustomerPayment(
                payment
        );
    }


    // =====================================================
    // CUSTOMER - MY PAYMENTS
    // =====================================================

    public List<Payment> getMyPayments(
            int userId) {

        return paymentRepo.getMyPayments(
                userId
        );
    }


    // =====================================================
    // CUSTOMER - VIEW PAYMENT
    // =====================================================

    public Payment getMyPaymentById(
            int paymentId,
            int userId) {

        return paymentRepo.getMyPaymentById(
                paymentId,
                userId
        );
    }


    // =====================================================
    // CUSTOMER - PAYMENT SUMMARY
    // =====================================================

    public PaymentSummary getPaymentSummary(
            int userId) {

        return paymentRepo.getPaymentSummary(
                userId
        );
    }


    // =====================================================
    // UPDATE INVOICE PAYMENT STATUS
    // =====================================================

    public void updateInvoicePaymentStatus(
            int invoiceId,
            String status) {

        paymentRepo.updateInvoicePaymentStatus(
                invoiceId,
                status
        );
    }
}