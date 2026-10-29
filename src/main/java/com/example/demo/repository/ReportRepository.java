package com.example.demo.repository;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository("reportRepo")
public class ReportRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    // ================= CUSTOMER REPORT =================
    public List<Map<String, Object>> getCustomerReport() {

        String sql = "SELECT * FROM customer";

        return jdbcTemplate.queryForList(sql);
    }

    // ================= WORKER REPORT =================
    public List<Map<String, Object>> getWorkerReport() {

        String sql = "SELECT * FROM worker";

        return jdbcTemplate.queryForList(sql);
    }

    // ================= MACHINE REPORT =================
    public List<Map<String, Object>> getMachineReport() {

        String sql = "SELECT * FROM machine";

        return jdbcTemplate.queryForList(sql);
    }

    // ================= JOB REPORT =================
    public List<Map<String, Object>> getJobReport() {

        String sql = "SELECT * FROM job_order";

        return jdbcTemplate.queryForList(sql);
    }

    // ================= REVENUE REPORT =================
    public List<Map<String, Object>> getRevenueReport() {

        String sql =
                "SELECT i.invoice_id, " +
                "i.job_id, " +
                "i.amount AS invoice_amount, " +
                "IFNULL(SUM(p.amount),0) AS paid_amount, " +
                "(i.amount - IFNULL(SUM(p.amount),0)) AS due_amount " +
                "FROM invoice i " +
                "LEFT JOIN payment p ON i.invoice_id = p.invoice_id " +
                "GROUP BY i.invoice_id, i.job_id, i.amount";

        return jdbcTemplate.queryForList(sql);
    }

}