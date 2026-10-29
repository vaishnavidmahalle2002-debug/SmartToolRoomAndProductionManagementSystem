package com.example.demo.model;

public class MonthlyRevenue {

    private String month;

    private double amount;


    public MonthlyRevenue() {
    }


    public MonthlyRevenue(
            String month,
            double amount) {

        this.month = month;
        this.amount = amount;
    }


    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }


    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}

