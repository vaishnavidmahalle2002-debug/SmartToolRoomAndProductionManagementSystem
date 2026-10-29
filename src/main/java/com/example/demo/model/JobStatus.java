package com.example.demo.model;

public class JobStatus {

    private Integer id;
    private Integer job_id;
    private String status;

    // Default Constructor
    public JobStatus() {
    }

    // Parameterized Constructor
    public JobStatus(Integer id, Integer job_id, String status) {
        this.id = id;
        this.job_id = job_id;
        this.status = status;
    }

    // Getter and Setter for id
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    // Getter and Setter for job_id
    public Integer getJob_id() {
        return job_id;
    }

    public void setJob_id(Integer job_id) {
        this.job_id = job_id;
    }

    // Getter and Setter for status
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "JobStatus{" +
                "id=" + id +
                ", job_id=" + job_id +
                ", status='" + status + '\'' +
                '}';
    }
}