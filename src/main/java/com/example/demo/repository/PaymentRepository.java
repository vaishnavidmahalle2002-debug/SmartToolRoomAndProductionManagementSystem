package com.example.demo.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Payment;
import com.example.demo.model.PaymentSummary;

@Repository("paymentRepo")
public class PaymentRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;


 // =====================================================
 // ADMIN - RECEIVE PAYMENT
 // =====================================================

 public boolean receivePayment(Payment payment) {

     int value = jdbcTemplate.update(
             "INSERT INTO payment(invoice_id, amount) VALUES(?, ?)",
             payment.getInvoice_id(),
             payment.getAmount()
     );

     if (value <= 0) {
         return false;
     }

     // Check remaining amount after this payment
     double remainingAmount =
             getDueAmount(payment.getInvoice_id());

     // Update invoice payment status
     if (remainingAmount <= 0) {

         jdbcTemplate.update(
                 "UPDATE invoice " +
                 "SET payment_status = 'PAID' " +
                 "WHERE invoice_id = ?",
                 payment.getInvoice_id()
         );

     } else {

         // Check whether any successful payment exists
         Double paidAmount = jdbcTemplate.queryForObject(
                 "SELECT IFNULL(SUM(amount), 0) " +
                 "FROM payment " +
                 "WHERE invoice_id = ? " +
                 "AND UPPER(COALESCE(payment_status,'SUCCESS')) " +
                 "IN ('SUCCESS','PAID','COMPLETED','SUCCESSFUL','CAPTURED')",
                 Double.class,
                 payment.getInvoice_id()
         );

         if (paidAmount != null && paidAmount > 0) {

             jdbcTemplate.update(
                     "UPDATE invoice " +
                     "SET payment_status = 'PARTIAL' " +
                     "WHERE invoice_id = ?",
                     payment.getInvoice_id()
             );

         } else {

             jdbcTemplate.update(
                     "UPDATE invoice " +
                     "SET payment_status = 'PENDING' " +
                     "WHERE invoice_id = ?",
                     payment.getInvoice_id()
             );
         }
     }

     return true;
 }

    // =====================================================
    // ADMIN - PAYMENT HISTORY
    // =====================================================

    public List<Payment> getAllPayments() {

        return jdbcTemplate.query(

                "SELECT * FROM payment",

                new RowMapper<Payment>() {

                    @Override
                    public Payment mapRow(
                            ResultSet rs,
                            int rowNum)
                            throws SQLException {

                        Payment payment =
                                new Payment();

                        payment.setPayment_id(
                                rs.getInt("payment_id")
                        );

                        payment.setInvoice_id(
                                rs.getInt("invoice_id")
                        );

                        payment.setAmount(
                                rs.getDouble("amount")
                        );

                        return payment;
                    }
                }
        );
    }


    // =====================================================
    // ADMIN - VIEW PAYMENT
    // =====================================================

    public Payment getPaymentById(
            int paymentId) {

        return jdbcTemplate.queryForObject(

                "SELECT * FROM payment WHERE payment_id=?",

                new Object[]{paymentId},

                (rs, rowNum) -> {

                    Payment payment =
                            new Payment();

                    payment.setPayment_id(
                            rs.getInt("payment_id")
                    );

                    payment.setInvoice_id(
                            rs.getInt("invoice_id")
                    );

                    payment.setAmount(
                            rs.getDouble("amount")
                    );

                    return payment;
                }
        );
    }


    // =====================================================
    // ADMIN - DUE AMOUNT
    // =====================================================

    public double getDueAmount(
            int invoiceId) {

        Double invoiceAmount =
                jdbcTemplate.queryForObject(

                        "SELECT amount FROM invoice WHERE invoice_id=?",

                        Double.class,
                        invoiceId
                );

        Double paidAmount =
                jdbcTemplate.queryForObject(

                        "SELECT IFNULL(SUM(amount),0) " +
                        "FROM payment " +
                        "WHERE invoice_id=? " +
                        "AND UPPER(COALESCE(payment_status,'SUCCESS')) " +
                        "IN ('SUCCESS','PAID','COMPLETED','SUCCESSFUL','CAPTURED')",

                        Double.class,
                        invoiceId
                );

        if (invoiceAmount == null) {
            return 0;
        }

        if (paidAmount == null) {
            paidAmount = 0.0;
        }

        return Math.max(
                invoiceAmount - paidAmount,
                0
        );
    }


 // =====================================================
 // ADMIN - DELETE PAYMENT
 // =====================================================

 public boolean deletePayment(int paymentId) {

     // First get invoice ID
     Integer invoiceId = jdbcTemplate.queryForObject(
             "SELECT invoice_id " +
             "FROM payment " +
             "WHERE payment_id = ?",
             Integer.class,
             paymentId
     );

     if (invoiceId == null) {
         return false;
     }

     // Delete payment
     int value = jdbcTemplate.update(
             "DELETE FROM payment WHERE payment_id = ?",
             paymentId
     );

     if (value <= 0) {
         return false;
     }

     // Recalculate remaining amount
     double remainingAmount =
             getDueAmount(invoiceId);

     if (remainingAmount <= 0) {

         jdbcTemplate.update(
                 "UPDATE invoice " +
                 "SET payment_status = 'PAID' " +
                 "WHERE invoice_id = ?",
                 invoiceId
         );

     } else {

         Double paidAmount = jdbcTemplate.queryForObject(
                 "SELECT IFNULL(SUM(amount), 0) " +
                 "FROM payment " +
                 "WHERE invoice_id = ? " +
                 "AND UPPER(COALESCE(payment_status,'SUCCESS')) " +
                 "IN ('SUCCESS','PAID','COMPLETED','SUCCESSFUL','CAPTURED')",
                 Double.class,
                 invoiceId
         );

         if (paidAmount != null && paidAmount > 0) {

             jdbcTemplate.update(
                     "UPDATE invoice " +
                     "SET payment_status = 'PARTIAL' " +
                     "WHERE invoice_id = ?",
                     invoiceId
             );

         } else {

             jdbcTemplate.update(
                     "UPDATE invoice " +
                     "SET payment_status = 'PENDING' " +
                     "WHERE invoice_id = ?",
                     invoiceId
             );
         }
     }

     return true;
 }

    // =====================================================
    // CUSTOMER - GET INVOICE FOR PAYMENT
    // =====================================================

    public Payment getCustomerInvoiceForPayment(
            int invoiceId,
            int userId) {

        String sql =
                "SELECT " +
                "i.invoice_id, " +
                "i.invoice_no, " +
                "i.amount, " +
                "i.payment_status " +
                "FROM invoice i " +
                "INNER JOIN job_order j " +
                "ON i.job_id = j.job_id " +
                "INNER JOIN customer c " +
                "ON j.customer_id = c.customer_id " +
                "WHERE i.invoice_id = ? " +
                "AND c.user_id = ?";

        List<Payment> result =
                jdbcTemplate.query(

                        sql,

                        new Object[]{
                                invoiceId,
                                userId
                        },

                        (rs, rowNum) -> {

                            Payment payment =
                                    new Payment();

                            payment.setInvoice_id(
                                    rs.getInt(
                                            "invoice_id"
                                    )
                            );

                            payment.setInvoice_no(
                                    rs.getString(
                                            "invoice_no"
                                    )
                            );

                            payment.setInvoice_amount(
                                    rs.getDouble(
                                            "amount"
                                    )
                            );

                            payment.setPayment_status(
                                    rs.getString(
                                            "payment_status"
                                    )
                            );

                            return payment;
                        }
                );

        if (result.isEmpty()) {
            return null;
        }

        return result.get(0);
    }


    // =====================================================
    // CUSTOMER - SAVE RAZORPAY PAYMENT
    // =====================================================

    public boolean saveCustomerPayment(
            Payment payment) {

        int value =
                jdbcTemplate.update(

                        "INSERT INTO payment (" +
                        "invoice_id, " +
                        "amount, " +
                        "payment_method, " +
                        "transaction_reference, " +
                        "payment_status, " +
                        "razorpay_order_id, " +
                        "razorpay_payment_id, " +
                        "razorpay_signature" +
                        ") VALUES (?, ?, ?, ?, ?, ?, ?, ?)",

                        payment.getInvoice_id(),
                        payment.getAmount(),
                        payment.getPayment_method(),
                        payment.getTransaction_reference(),
                        "SUCCESS",
                        payment.getRazorpay_order_id(),
                        payment.getRazorpay_payment_id(),
                        payment.getRazorpay_signature()
                );

        return value > 0;
    }


    // =====================================================
    // CUSTOMER - MY PAYMENTS
    // =====================================================

    public List<Payment> getMyPayments(
            int userId) {

        String sql =
                "SELECT " +
                "p.payment_id, " +
                "p.invoice_id, " +
                "p.amount, " +
                "p.payment_date, " +
                "p.payment_method, " +
                "p.transaction_reference, " +
                "p.payment_status, " +
                "i.invoice_no, " +
                "i.amount AS invoice_amount, " +
                "i.job_id " +
                "FROM payment p " +
                "INNER JOIN invoice i " +
                "ON p.invoice_id = i.invoice_id " +
                "INNER JOIN job_order j " +
                "ON i.job_id = j.job_id " +
                "INNER JOIN customer c " +
                "ON j.customer_id = c.customer_id " +
                "WHERE c.user_id = ? " +
                "ORDER BY p.payment_id DESC";

        return jdbcTemplate.query(

                sql,

                new Object[]{userId},

                (rs, rowNum) -> {

                    Payment payment =
                            new Payment();

                    payment.setPayment_id(
                            rs.getInt("payment_id")
                    );

                    payment.setInvoice_id(
                            rs.getInt("invoice_id")
                    );

                    payment.setJob_id(
                            rs.getInt("job_id")
                    );

                    payment.setInvoice_no(
                            rs.getString("invoice_no")
                    );

                    payment.setAmount(
                            rs.getDouble("amount")
                    );

                    payment.setInvoice_amount(
                            rs.getDouble(
                                    "invoice_amount"
                            )
                    );

                    payment.setPayment_date(
                            rs.getTimestamp(
                                    "payment_date"
                            ) != null
                                    ? rs.getTimestamp(
                                            "payment_date"
                                      ).toString()
                                    : null
                    );

                    payment.setPayment_method(
                            rs.getString(
                                    "payment_method"
                            )
                    );

                    payment.setTransaction_reference(
                            rs.getString(
                                    "transaction_reference"
                            )
                    );

                    payment.setPayment_status(
                            rs.getString(
                                    "payment_status"
                            )
                    );

                    double remaining =
                            getDueAmount(
                                    payment.getInvoice_id()
                            );

                    payment.setRemaining_amount(
                            remaining
                    );

                    return payment;
                }
        );
    }


    // =====================================================
    // CUSTOMER - VIEW PAYMENT BY ID
    // =====================================================

    public Payment getMyPaymentById(
            int paymentId,
            int userId) {

        String sql =
                "SELECT " +
                "p.payment_id, " +
                "p.invoice_id, " +
                "p.amount, " +
                "p.payment_date, " +
                "p.payment_method, " +
                "p.transaction_reference, " +
                "p.payment_status, " +
                "i.invoice_no, " +
                "i.amount AS invoice_amount, " +
                "i.job_id " +
                "FROM payment p " +
                "INNER JOIN invoice i " +
                "ON p.invoice_id = i.invoice_id " +
                "INNER JOIN job_order j " +
                "ON i.job_id = j.job_id " +
                "INNER JOIN customer c " +
                "ON j.customer_id = c.customer_id " +
                "WHERE p.payment_id = ? " +
                "AND c.user_id = ?";

        List<Payment> result =
                jdbcTemplate.query(

                        sql,

                        new Object[]{
                                paymentId,
                                userId
                        },

                        (rs, rowNum) -> {

                            Payment payment =
                                    new Payment();

                            payment.setPayment_id(
                                    rs.getInt(
                                            "payment_id"
                                    )
                            );

                            payment.setInvoice_id(
                                    rs.getInt(
                                            "invoice_id"
                                    )
                            );

                            payment.setJob_id(
                                    rs.getInt(
                                            "job_id"
                                    )
                            );

                            payment.setInvoice_no(
                                    rs.getString(
                                            "invoice_no"
                                    )
                            );

                            payment.setAmount(
                                    rs.getDouble(
                                            "amount"
                                    )
                            );

                            payment.setInvoice_amount(
                                    rs.getDouble(
                                            "invoice_amount"
                                    )
                            );

                            payment.setPayment_date(
                                    rs.getTimestamp(
                                            "payment_date"
                                    ) != null
                                            ? rs.getTimestamp(
                                                    "payment_date"
                                              ).toString()
                                            : null
                            );

                            payment.setPayment_method(
                                    rs.getString(
                                            "payment_method"
                                    )
                            );

                            payment.setTransaction_reference(
                                    rs.getString(
                                            "transaction_reference"
                                    )
                            );

                            payment.setPayment_status(
                                    rs.getString(
                                            "payment_status"
                                    )
                            );

                            payment.setRemaining_amount(
                                    getDueAmount(
                                            payment.getInvoice_id()
                                    )
                            );

                            return payment;
                        }
                );

        if (result.isEmpty()) {
            return null;
        }

        return result.get(0);
    }


    // =====================================================
    // CUSTOMER - PAYMENT SUMMARY
    // =====================================================

    public PaymentSummary getPaymentSummary(
            int userId) {

        String sql =
                "SELECT " +

                "COALESCE((" +
                "SELECT SUM(p.amount) " +
                "FROM payment p " +
                "INNER JOIN invoice i " +
                "ON p.invoice_id = i.invoice_id " +
                "INNER JOIN job_order j " +
                "ON i.job_id = j.job_id " +
                "INNER JOIN customer c " +
                "ON j.customer_id = c.customer_id " +
                "WHERE c.user_id = ? " +
                "AND UPPER(COALESCE(p.payment_status,'SUCCESS')) " +
                "IN ('SUCCESS','PAID','COMPLETED','SUCCESSFUL','CAPTURED')" +
                "),0) AS total_paid, " +

                "COALESCE((" +
                "SELECT SUM(i.amount) " +
                "FROM invoice i " +
                "INNER JOIN job_order j " +
                "ON i.job_id = j.job_id " +
                "INNER JOIN customer c " +
                "ON j.customer_id = c.customer_id " +
                "WHERE c.user_id = ?" +
                "),0) AS total_invoice";

        return jdbcTemplate.queryForObject(

                sql,

                new Object[]{
                        userId,
                        userId
                },

                (rs, rowNum) -> {

                    PaymentSummary summary =
                            new PaymentSummary();

                    double totalPaid =
                            rs.getDouble(
                                    "total_paid"
                            );

                    double totalInvoice =
                            rs.getDouble(
                                    "total_invoice"
                            );

                    double pendingAmount =
                            Math.max(
                                    totalInvoice
                                            - totalPaid,
                                    0
                            );

                    double progress = 0;

                    if (totalInvoice > 0) {

                        progress =
                                (totalPaid
                                        / totalInvoice)
                                        * 100;
                    }

                    summary.setPaidAmount(
                            totalPaid
                    );

                    summary.setPendingAmount(
                            pendingAmount
                    );

                    summary.setTotalInvoiced(
                            totalInvoice
                    );

                    summary.setCollectionProgress(
                            progress
                    );

                    return summary;
                }
        );
    }


    // =====================================================
    // UPDATE INVOICE PAYMENT STATUS
    // =====================================================

    public void updateInvoicePaymentStatus(
            int invoiceId,
            String status) {

        jdbcTemplate.update(

                "UPDATE invoice " +
                "SET payment_status = ? " +
                "WHERE invoice_id = ?",

                status,
                invoiceId
        );
    }
}