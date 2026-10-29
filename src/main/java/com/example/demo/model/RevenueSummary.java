
package com.example.demo.model;

import java.util.List;
import java.util.*;

public class RevenueSummary {

    private double totalRevenue;
    private double paidRevenue;
    private double pendingRevenue;

    private double comparisonPercentage;

    private List<MonthlyRevenue> monthlyRevenue;


    public RevenueSummary() {
    }


    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }


    public double getPaidRevenue() {
        return paidRevenue;
    }

    public void setPaidRevenue(double paidRevenue) {
        this.paidRevenue = paidRevenue;
    }


    public double getPendingRevenue() {
        return pendingRevenue;
    }

    public void setPendingRevenue(double pendingRevenue) {
        this.pendingRevenue = pendingRevenue;
    }


    public double getComparisonPercentage() {
        return comparisonPercentage;
    }

    public void setComparisonPercentage(
            double comparisonPercentage) {

        this.comparisonPercentage =
                comparisonPercentage;
    }


    public List<MonthlyRevenue> getMonthlyRevenue() {
        return monthlyRevenue;
    }

    public void setMonthlyRevenue(
            List<MonthlyRevenue> monthlyRevenue) {

        this.monthlyRevenue =
                monthlyRevenue;
    }
}

