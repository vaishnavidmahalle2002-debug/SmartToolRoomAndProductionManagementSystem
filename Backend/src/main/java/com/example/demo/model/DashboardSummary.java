package com.example.demo.model;

public class DashboardSummary {

    private int totalCustomers;
    private int totalWorkers;
    private int totalMachines;
    private int totalMaterials;

    private int totalJobs;
    private int pendingJobs;
    private int progressJobs;
    private int completedJobs;

    private int activeWorkers;
    private int availableMachines;
    private int lowStockMaterials;


    public DashboardSummary() {
    }


    public int getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(int totalCustomers) {
        this.totalCustomers = totalCustomers;
    }


    public int getTotalWorkers() {
        return totalWorkers;
    }

    public void setTotalWorkers(int totalWorkers) {
        this.totalWorkers = totalWorkers;
    }


    public int getTotalMachines() {
        return totalMachines;
    }

    public void setTotalMachines(int totalMachines) {
        this.totalMachines = totalMachines;
    }


    public int getTotalMaterials() {
        return totalMaterials;
    }

    public void setTotalMaterials(int totalMaterials) {
        this.totalMaterials = totalMaterials;
    }


    public int getTotalJobs() {
        return totalJobs;
    }

    public void setTotalJobs(int totalJobs) {
        this.totalJobs = totalJobs;
    }


    public int getPendingJobs() {
        return pendingJobs;
    }

    public void setPendingJobs(int pendingJobs) {
        this.pendingJobs = pendingJobs;
    }


    public int getProgressJobs() {
        return progressJobs;
    }

    public void setProgressJobs(int progressJobs) {
        this.progressJobs = progressJobs;
    }


    public int getCompletedJobs() {
        return completedJobs;
    }

    public void setCompletedJobs(int completedJobs) {
        this.completedJobs = completedJobs;
    }


    public int getActiveWorkers() {
        return activeWorkers;
    }

    public void setActiveWorkers(int activeWorkers) {
        this.activeWorkers = activeWorkers;
    }


    public int getAvailableMachines() {
        return availableMachines;
    }

    public void setAvailableMachines(int availableMachines) {
        this.availableMachines = availableMachines;
    }


    public int getLowStockMaterials() {
        return lowStockMaterials;
    }

    public void setLowStockMaterials(int lowStockMaterials) {
        this.lowStockMaterials = lowStockMaterials;
    }
}