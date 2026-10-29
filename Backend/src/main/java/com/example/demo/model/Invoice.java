package com.example.demo.model;

public class Invoice {

    private Integer invoice_id;
    private Integer job_id;

    private String invoice_no;
    private String invoice_date;
    private String due_date;

    private Double subtotal;
    private Double discount;
    private Double tax;
    private Double amount;

    private String payment_status;
    private String payment_method;
    private String notes;

    public Invoice() {
    }

    public Integer getInvoice_id() {
        return invoice_id;
    }

    public void setInvoice_id(Integer invoice_id) {
        this.invoice_id = invoice_id;
    }

    public Integer getJob_id() {
        return job_id;
    }

    public void setJob_id(Integer job_id) {
        this.job_id = job_id;
    }

    public String getInvoice_no() {
        return invoice_no;
    }

    public void setInvoice_no(String invoice_no) {
        this.invoice_no = invoice_no;
    }

    public String getInvoice_date() {
        return invoice_date;
    }

    public void setInvoice_date(String invoice_date) {
        this.invoice_date = invoice_date;
    }

    public String getDue_date() {
        return due_date;
    }

    public void setDue_date(String due_date) {
        this.due_date = due_date;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public Double getTax() {
        return tax;
    }

    public void setTax(Double tax) {
        this.tax = tax;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getPayment_status() {
        return payment_status;
    }

    public void setPayment_status(String payment_status) {
        this.payment_status = payment_status;
    }

    public String getPayment_method() {
        return payment_method;
    }

    public void setPayment_method(String payment_method) {
        this.payment_method = payment_method;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    @Override
    public String toString() {

        return "Invoice{" +
                "invoice_id=" + invoice_id +
                ", job_id=" + job_id +
                ", invoice_no='" + invoice_no + '\'' +
                ", invoice_date='" + invoice_date + '\'' +
                ", due_date='" + due_date + '\'' +
                ", subtotal=" + subtotal +
                ", discount=" + discount +
                ", tax=" + tax +
                ", amount=" + amount +
                ", payment_status='" + payment_status + '\'' +
                ", payment_method='" + payment_method + '\'' +
                ", notes='" + notes + '\'' +
                '}';
    }
}