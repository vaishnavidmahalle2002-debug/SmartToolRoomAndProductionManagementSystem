
package com.example.demo.model;

public class PaymentSummary {

    private double paidAmount;

    private double pendingAmount;

    private double totalInvoiced;

    private double collectionProgress;


    public PaymentSummary() {
    }


    public double getPaidAmount() {

        return paidAmount;

    }


    public void setPaidAmount(
            double paidAmount) {

        this.paidAmount =
                paidAmount;

    }


    public double getPendingAmount() {

        return pendingAmount;

    }


    public void setPendingAmount(
            double pendingAmount) {

        this.pendingAmount =
                pendingAmount;

    }


    public double getTotalInvoiced() {

        return totalInvoiced;

    }


    public void setTotalInvoiced(
            double totalInvoiced) {

        this.totalInvoiced =
                totalInvoiced;

    }


    public double getCollectionProgress() {

        return collectionProgress;

    }


    public void setCollectionProgress(
            double collectionProgress) {

        this.collectionProgress =
                collectionProgress;

    }

}

