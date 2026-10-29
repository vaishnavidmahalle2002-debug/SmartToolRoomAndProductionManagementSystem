package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Invoice;
import com.example.demo.repository.InvoiceRepository;

@Service("invoiceService")
public class InvoiceService {

    @Autowired
    InvoiceRepository invoiceRepo;


    public double calculateCost(
            double materialCost,
            double machineCost,
            double labourCost) {

        return invoiceRepo.calculateCost(
                materialCost,
                machineCost,
                labourCost);
    }


    public boolean generateInvoice(Invoice invoice) {

        return invoiceRepo.generateInvoice(invoice);
    }


    public List<Invoice> getAllInvoices() {

        return invoiceRepo.getAllInvoices();
    }


    public List<Invoice> getMyInvoices(int userId) {

        return invoiceRepo.getMyInvoices(userId);
    }


    public Invoice getInvoiceById(int invoiceId) {

        return invoiceRepo.getInvoiceById(invoiceId);
    }


    public Invoice getMyInvoiceById(
            int invoiceId,
            int userId) {

        return invoiceRepo.getMyInvoiceById(
                invoiceId,
                userId);
    }


    public Invoice printInvoice(int invoiceId) {

        return invoiceRepo.printInvoice(invoiceId);
    }


    public boolean deleteInvoice(int invoiceId) {

        return invoiceRepo.deleteInvoice(invoiceId);
    }
}