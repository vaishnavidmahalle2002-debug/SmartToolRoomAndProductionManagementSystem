package com.example.demo.model;

public class PaymentOrderResponse {

    private String orderId;
    private int amount;
    private String currency;
    private int invoiceId;
    private String invoiceNo;

    public PaymentOrderResponse() {
    }

    public PaymentOrderResponse(
            String orderId,
            int amount,
            String currency,
            int invoiceId,
            String invoiceNo) {

        this.orderId = orderId;
        this.amount = amount;
        this.currency = currency;
        this.invoiceId = invoiceId;
        this.invoiceNo = invoiceNo;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public int getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(int invoiceId) {
        this.invoiceId = invoiceId;
    }

    public String getInvoiceNo() {
        return invoiceNo;
    }

    public void setInvoiceNo(String invoiceNo) {
        this.invoiceNo = invoiceNo;
    }
}