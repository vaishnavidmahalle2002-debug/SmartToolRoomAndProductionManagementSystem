package com.example.demo.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.demo.model.DashboardSummary;

@Repository
public class DashboardSummaryRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;


    public DashboardSummary getDashboardSummary() {

        DashboardSummary summary =
                new DashboardSummary();


        /* =================================================
           TOTAL CUSTOMERS
        ================================================= */

        Integer customers =
                jdbcTemplate.queryForObject(
                    "SELECT COUNT(*) FROM customer",
                    Integer.class
                );

        summary.setTotalCustomers(
                customers != null ? customers : 0
        );


        /* =================================================
           TOTAL WORKERS
        ================================================= */

        Integer workers =
                jdbcTemplate.queryForObject(
                    "SELECT COUNT(*) FROM worker",
                    Integer.class
                );

        summary.setTotalWorkers(
                workers != null ? workers : 0
        );


        /* =================================================
           TOTAL MACHINES
        ================================================= */

        Integer machines =
                jdbcTemplate.queryForObject(
                    "SELECT COUNT(*) FROM machine",
                    Integer.class
                );

        summary.setTotalMachines(
                machines != null ? machines : 0
        );


        /* =================================================
           TOTAL MATERIALS
        ================================================= */

        Integer materials =
                jdbcTemplate.queryForObject(
                    "SELECT COUNT(*) FROM material",
                    Integer.class
                );

        summary.setTotalMaterials(
                materials != null ? materials : 0
        );


        /* =================================================
           TOTAL JOBS
        ================================================= */

        Integer jobs =
                jdbcTemplate.queryForObject(
                    "SELECT COUNT(*) FROM job_order",
                    Integer.class
                );

        summary.setTotalJobs(
                jobs != null ? jobs : 0
        );


        /* =================================================
           PENDING JOBS
        ================================================= */

        Integer pending =
                jdbcTemplate.queryForObject(
                    """
                    SELECT COUNT(*)
                    FROM job_order
                    WHERE LOWER(TRIM(status)) = 'pending'
                    """,
                    Integer.class
                );

        summary.setPendingJobs(
                pending != null ? pending : 0
        );


        /* =================================================
           IN PROGRESS JOBS
        ================================================= */

        Integer progress =
                jdbcTemplate.queryForObject(
                    """
                    SELECT COUNT(*)
                    FROM job_order
                    WHERE LOWER(TRIM(status)) = 'in progress'
                    """,
                    Integer.class
                );

        summary.setProgressJobs(
                progress != null ? progress : 0
        );


        /* =================================================
           COMPLETED JOBS
        ================================================= */

        Integer completed =
                jdbcTemplate.queryForObject(
                    """
                    SELECT COUNT(*)
                    FROM job_order
                    WHERE LOWER(TRIM(status)) = 'completed'
                    """,
                    Integer.class
                );

        summary.setCompletedJobs(
                completed != null ? completed : 0
        );


        /* =================================================
           ACTIVE WORKERS
           
           IMPORTANT:
           This assumes worker table has a status column.
        ================================================= */

        try {

            Integer activeWorkers =
                    jdbcTemplate.queryForObject(
                        """
                        SELECT COUNT(*)
                        FROM worker
                        WHERE LOWER(TRIM(status)) = 'active'
                        """,
                        Integer.class
                    );

            summary.setActiveWorkers(
                    activeWorkers != null
                    ? activeWorkers
                    : 0
            );

        } catch (Exception e) {

            summary.setActiveWorkers(0);

        }


        /* =================================================
           AVAILABLE MACHINES
           
           This assumes machine table has a status column.
        ================================================= */

        try {

            Integer availableMachines =
                    jdbcTemplate.queryForObject(
                        """
                        SELECT COUNT(*)
                        FROM machine
                        WHERE LOWER(TRIM(status)) = 'available'
                        """,
                        Integer.class
                    );

            summary.setAvailableMachines(
                    availableMachines != null
                    ? availableMachines
                    : 0
            );

        } catch (Exception e) {

            summary.setAvailableMachines(0);

        }


        /* =================================================
           LOW STOCK MATERIALS
           
           IMPORTANT:
           Adjust column names if your material table
           uses different names.
        ================================================= */

        try {

            Integer lowStock =
                    jdbcTemplate.queryForObject(
                        """
                        SELECT COUNT(*)
                        FROM material
                        WHERE quantity <= 10
                        """,
                        Integer.class
                    );

            summary.setLowStockMaterials(
                    lowStock != null
                    ? lowStock
                    : 0
            );

        } catch (Exception e) {

            summary.setLowStockMaterials(0);

        }


        return summary;
    }
}