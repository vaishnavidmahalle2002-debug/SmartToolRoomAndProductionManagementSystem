package com.example.demo.controller;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Payment;
import com.example.demo.model.PaymentOrderResponse;
import com.example.demo.model.PaymentSummary;
import com.example.demo.model.PaymentVerificationRequest;
import com.example.demo.service.PaymentService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "${app.cors.allowed-origins}",
    allowCredentials = "true"
)
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    // =====================================================
    // RAZORPAY CONFIGURATION
    // =====================================================

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;


    // =====================================================
    // ADMIN - RECEIVE PAYMENT
    // =====================================================

    @PostMapping("/receivePayment")
    public String receivePayment(@RequestBody Payment payment) {

        boolean result =
                paymentService.receivePayment(payment);

        return result
                ? "Payment received successfully"
                : "Payment failed";
    }


    // =====================================================
    // ADMIN - PAYMENT HISTORY
    // =====================================================

    @GetMapping("/paymentHistory")
    public List<Payment> getAllPayments() {

        return paymentService.getAllPayments();
    }


    // =====================================================
    // ADMIN - VIEW PAYMENT
    // =====================================================

    @GetMapping("/viewPayment/{paymentId}")
    public Payment getPaymentById(
            @PathVariable int paymentId) {

        return paymentService.getPaymentById(paymentId);
    }


    // =====================================================
    // ADMIN - DUE AMOUNT
    // =====================================================

    @GetMapping("/updDuePayment/{invoiceId}")
    public double getDueAmount(
            @PathVariable int invoiceId) {

        return paymentService.getDueAmount(invoiceId);
    }


    // =====================================================
    // ADMIN - DELETE PAYMENT
    // =====================================================

    @DeleteMapping("/delPayment/{paymentId}")
    public String deletePayment(
            @PathVariable int paymentId) {

        boolean result =
                paymentService.deletePayment(paymentId);

        return result
                ? "Payment deleted successfully"
                : "Payment not deleted";
    }


    // =====================================================
    // CUSTOMER - MY PAYMENTS
    // =====================================================

    @GetMapping("/myPayments")
    public List<Payment> getMyPayments(
            HttpSession session) {

        Object userIdObject =
                session.getAttribute("userId");

        if (userIdObject == null) {
            return List.of();
        }

        int userId =
                Integer.parseInt(
                        userIdObject.toString()
                );

        return paymentService.getMyPayments(userId);
    }


    // =====================================================
    // CUSTOMER - VIEW PAYMENT
    // =====================================================

    @GetMapping("/myPayment/{paymentId}")
    public Payment getMyPaymentById(
            @PathVariable int paymentId,
            HttpSession session) {

        Object userIdObject =
                session.getAttribute("userId");

        if (userIdObject == null) {
            return null;
        }

        int userId =
                Integer.parseInt(
                        userIdObject.toString()
                );

        return paymentService.getMyPaymentById(
                paymentId,
                userId
        );
    }


    // =====================================================
    // CUSTOMER - PAYMENT SUMMARY
    // =====================================================

    @GetMapping("/myPaymentSummary")
    public PaymentSummary getPaymentSummary(
            HttpSession session) {

        Object userIdObject =
                session.getAttribute("userId");

        if (userIdObject == null) {

            PaymentSummary empty =
                    new PaymentSummary();

            empty.setPaidAmount(0);
            empty.setPendingAmount(0);
            empty.setTotalInvoiced(0);
            empty.setCollectionProgress(0);

            return empty;
        }

        int userId =
                Integer.parseInt(
                        userIdObject.toString()
                );

        return paymentService.getPaymentSummary(
                userId
        );
    }


    // =====================================================
    // CUSTOMER - CREATE RAZORPAY ORDER
    // =====================================================

    @PostMapping("/createPaymentOrder/{invoiceId}")
    public PaymentOrderResponse createPaymentOrder(
            @PathVariable int invoiceId,
            HttpSession session) throws Exception {

        Object userIdObject =
                session.getAttribute("userId");

        if (userIdObject == null) {
            throw new RuntimeException(
                    "Customer session expired."
            );
        }

        int userId =
                Integer.parseInt(
                        userIdObject.toString()
                );

        // Check invoice ownership
        Payment invoice =
                paymentService.getCustomerInvoiceForPayment(
                        invoiceId,
                        userId
                );

        if (invoice == null) {
            throw new RuntimeException(
                    "Invoice not found or access denied."
            );
        }

        // Get actual due amount from database
        double dueAmount =
                paymentService.getDueAmount(
                        invoiceId
                );

        if (dueAmount <= 0) {
            throw new RuntimeException(
                    "This invoice is already fully paid."
            );
        }

        int amountInPaise =
                (int) Math.round(
                        dueAmount * 100
                );

        // Razorpay client
        RazorpayClient razorpay =
                new RazorpayClient(
                        razorpayKeyId,
                        razorpayKeySecret
                );

        JSONObject options =
                new JSONObject();

        options.put(
                "amount",
                amountInPaise
        );

        options.put(
                "currency",
                "INR"
        );

        options.put(
                "receipt",
                "INV-" + invoiceId
        );

        options.put(
                "partial_payment",
                false
        );

        Order order =
                razorpay.orders.create(
                        options
                );

        return new PaymentOrderResponse(
                order.get("id"),
                amountInPaise,
                "INR",
                invoiceId,
                invoice.getInvoice_no()
        );
    }


    // =====================================================
    // CUSTOMER - VERIFY RAZORPAY PAYMENT
    // =====================================================

    @PostMapping("/verifyCustomerPayment")
    public String verifyCustomerPayment(
            @RequestBody PaymentVerificationRequest request,
            HttpSession session) {

        try {

            Object userIdObject =
                    session.getAttribute("userId");

            if (userIdObject == null) {
                return "SESSION_EXPIRED";
            }

            int userId =
                    Integer.parseInt(
                            userIdObject.toString()
                    );

            // Check invoice ownership
            Payment invoice =
                    paymentService.getCustomerInvoiceForPayment(
                            request.getInvoiceId(),
                            userId
                    );

            if (invoice == null) {
                return "INVOICE_ACCESS_DENIED";
            }

            // Validate required Razorpay values
            if (request.getRazorpayOrderId() == null
                    || request.getRazorpayPaymentId() == null
                    || request.getRazorpaySignature() == null) {

                return "PAYMENT_DATA_MISSING";
            }

            // Generate signature
            String generatedSignature =
                    generateSignature(
                            request.getRazorpayOrderId(),
                            request.getRazorpayPaymentId(),
                            razorpayKeySecret
                    );

            // Verify signature
            if (!generatedSignature.equals(
                    request.getRazorpaySignature())) {

                return "PAYMENT_VERIFICATION_FAILED";
            }

            // Get current due amount
            double dueAmount =
                    paymentService.getDueAmount(
                            request.getInvoiceId()
                    );

            if (dueAmount <= 0) {
                return "INVOICE_ALREADY_PAID";
            }

            // Save payment
            Payment payment =
                    new Payment();

            payment.setInvoice_id(
                    request.getInvoiceId()
            );

            payment.setAmount(
                    dueAmount
            );

            payment.setPayment_method(
                    request.getPaymentMethod()
            );

            payment.setTransaction_reference(
                    request.getRazorpayPaymentId()
            );

            payment.setPayment_status(
                    "SUCCESS"
            );

            payment.setRazorpay_order_id(
                    request.getRazorpayOrderId()
            );

            payment.setRazorpay_payment_id(
                    request.getRazorpayPaymentId()
            );

            payment.setRazorpay_signature(
                    request.getRazorpaySignature()
            );

            boolean saved =
                    paymentService.saveCustomerPayment(
                            payment
                    );

            if (!saved) {
                return "PAYMENT_SAVE_FAILED";
            }

            // Update invoice status
            paymentService.updateInvoicePaymentStatus(
                    request.getInvoiceId(),
                    "PAID"
            );

            return "PAYMENT_SUCCESS";

        } catch (Exception e) {

            e.printStackTrace();

            return "PAYMENT_FAILED";
        }
    }


    // =====================================================
    // RAZORPAY SIGNATURE GENERATION
    // =====================================================

    private String generateSignature(
            String orderId,
            String paymentId,
            String secret) throws Exception {

        String data =
                orderId + "|" + paymentId;

        javax.crypto.Mac mac =
                javax.crypto.Mac.getInstance(
                        "HmacSHA256"
                );

        javax.crypto.spec.SecretKeySpec secretKey =
                new javax.crypto.spec.SecretKeySpec(
                        secret.getBytes(
                                java.nio.charset.StandardCharsets.UTF_8
                        ),
                        "HmacSHA256"
                );

        mac.init(secretKey);

        byte[] hash =
                mac.doFinal(
                        data.getBytes(
                                java.nio.charset.StandardCharsets.UTF_8
                        )
                );

        StringBuilder hex =
                new StringBuilder();

        for (byte b : hash) {

            hex.append(
                    String.format(
                            "%02x",
                            b
                    )
            );
        }

        return hex.toString();
    }
}