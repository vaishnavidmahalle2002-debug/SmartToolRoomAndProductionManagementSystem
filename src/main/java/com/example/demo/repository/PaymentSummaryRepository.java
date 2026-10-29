
package com.example.demo.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.demo.model.PaymentSummary;

@Repository
public class PaymentSummaryRepository {


    @Autowired
    JdbcTemplate jdbcTemplate;


    public PaymentSummary getPaymentSummary() {


        PaymentSummary summary =
                new PaymentSummary();


        /* ================================================
           TOTAL INVOICED
        ================================================ */

        Double totalInvoiced =
                jdbcTemplate.queryForObject(

                    "SELECT COALESCE(SUM(amount),0) " +
                    "FROM invoice",

                    Double.class
                );


        /* ================================================
           PAID AMOUNT
        ================================================ */

        Double paidAmount =
                jdbcTemplate.queryForObject(

                    "SELECT COALESCE(SUM(amount),0) " +
                    "FROM payment",

                    Double.class
                );


        double total =
                totalInvoiced != null
                ? totalInvoiced
                : 0;


        double paid =
                paidAmount != null
                ? paidAmount
                : 0;


        /* ================================================
           PENDING AMOUNT
        ================================================ */

        double pending =
                total - paid;


        /*
         * Prevent negative pending amount
         * in case payment amount exceeds invoice amount.
         */

        if (pending < 0) {

            pending = 0;

        }


        /* ================================================
           COLLECTION PROGRESS
        ================================================ */

        double progress = 0;


        if (total > 0) {

            progress =
                (paid / total) * 100;

        }


        /*
         * Keep progress between 0 and 100.
         */

        if (progress > 100) {

            progress = 100;

        }


        /* ================================================
           SET VALUES
        ================================================ */

        summary.setTotalInvoiced(
                total
        );


        summary.setPaidAmount(
                paid
        );


        summary.setPendingAmount(
                pending
        );


        summary.setCollectionProgress(
                progress
        );


        return summary;

    }

}

