package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Invoice;
import com.example.demo.service.InvoiceService;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "${app.cors.allowed-origins}",
        allowCredentials = "true"
)
public class InvoiceController {

    @Autowired
    InvoiceService invoiceService;


    // =====================================================
    // ADMIN - CALCULATE TOTAL
    // =====================================================

    @GetMapping("/invoiceCalculate")
    public double calculateCost(
            @RequestParam double materialCost,
            @RequestParam double machineCost,
            @RequestParam double labourCost) {

        return invoiceService.calculateCost(
                materialCost,
                machineCost,
                labourCost);
    }


    // =====================================================
    // ADMIN - GENERATE INVOICE
    // =====================================================

    @PostMapping("/invoiceGenerate")
    public String generateInvoice(
            @RequestBody Invoice invoice) {

        boolean result =
                invoiceService.generateInvoice(invoice);

        return result
                ? "Invoice generated successfully"
                : "Invoice generation failed";
    }


    // =====================================================
    // ADMIN - VIEW ALL INVOICES
    // =====================================================

    @GetMapping("/viewallInvoice")
    public List<Invoice> getAllInvoices() {

        return invoiceService.getAllInvoices();
    }


    // =====================================================
    // CUSTOMER - VIEW MY INVOICES
    // =====================================================

    @GetMapping("/myInvoices")
    public List<Invoice> getMyInvoices(HttpSession session) {

        Object userIdObject = session.getAttribute("userId");


        if (userIdObject == null) {
            System.out.println("ERROR: userId is NULL in session");
            return List.of();
        }

        int userId = Integer.parseInt(userIdObject.toString());

        System.out.println("Loading invoices for userId = " + userId);

        List<Invoice> result =
                invoiceService.getMyInvoices(userId);

        System.out.println("Invoices found = " + result.size());

        return result;
    }


    // =====================================================
    // ADMIN - VIEW INVOICE
    // =====================================================

    @GetMapping("/viewInvoice/{invoiceId}")
    public Invoice getInvoiceById(
            @PathVariable int invoiceId) {

        return invoiceService.getInvoiceById(
                invoiceId);
    }


    // =====================================================
    // CUSTOMER - VIEW OWN INVOICE
    // =====================================================

    @GetMapping("/myInvoice/{invoiceId}")
    public Invoice getMyInvoiceById(
            @PathVariable int invoiceId,
            HttpSession session) {

        Object userIdObject =
                session.getAttribute("userId");

        if (userIdObject == null) {

            return null;
        }

        int userId =
                Integer.parseInt(
                        userIdObject.toString());

        return invoiceService.getMyInvoiceById(
                invoiceId,
                userId);
    }


    // =====================================================
    // PRINT INVOICE
    // =====================================================

    @GetMapping("/printInvoice/{invoiceId}")
    public Invoice printInvoice(
            @PathVariable int invoiceId) {

        return invoiceService.printInvoice(
                invoiceId);
    }


    // =====================================================
    // ADMIN - DELETE INVOICE
    // =====================================================

    @DeleteMapping("/delInvoice/{invoiceId}")
    public String deleteInvoice(
            @PathVariable int invoiceId) {

        boolean result =
                invoiceService.deleteInvoice(
                        invoiceId);

        return result
                ? "Invoice deleted successfully"
                : "Invoice deletion failed";
    }
}