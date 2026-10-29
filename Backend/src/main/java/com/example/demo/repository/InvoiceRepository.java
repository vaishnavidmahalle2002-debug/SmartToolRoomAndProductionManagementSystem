package com.example.demo.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.sql.PreparedStatement;

import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Invoice;

@Repository("invoiceRepo")
public class InvoiceRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;


    // =====================================================
    // CALCULATE TOTAL COST
    // =====================================================

    public double calculateCost(
            double materialCost,
            double machineCost,
            double labourCost) {

        return materialCost + machineCost + labourCost;
    }


    // =====================================================
    // GENERATE INVOICE
    // EXISTING ADMIN FUNCTION - KEEP
    // =====================================================

    public boolean generateInvoice(Invoice invoice) {

        String sql =
            "INSERT INTO invoice " +
            "(job_id, amount, invoice_no, invoice_date, due_date, subtotal, discount, tax, payment_status) " +
            "VALUES (?, ?, NULL, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 10 DAY), ?, 0.00, 0.00, 'PENDING')";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        int value = jdbcTemplate.update(connection -> {

            PreparedStatement ps = connection.prepareStatement(
                sql,
                new String[] { "invoice_id" }
            );

            ps.setInt(1, invoice.getJob_id());
            ps.setDouble(2, invoice.getAmount());
            ps.setDouble(3, invoice.getAmount());

            return ps;

        }, keyHolder);

        if (value <= 0) {
            return false;
        }

        Number generatedId = keyHolder.getKey();

        if (generatedId == null) {
            return false;
        }

        int invoiceId = generatedId.intValue();

        String invoiceNo = "INV-" + String.format("%05d", invoiceId);

        jdbcTemplate.update(
            "UPDATE invoice SET invoice_no=? WHERE invoice_id=?",
            invoiceNo,
            invoiceId
        );

        return true;
    }
    // =====================================================
    // VIEW ALL INVOICES
    // ADMIN DASHBOARD
    // =====================================================

    public List<Invoice> getAllInvoices() {

        String sql =
                "SELECT invoice_id, job_id, invoice_no, " +
                "invoice_date, due_date, subtotal, discount, " +
                "tax, amount, payment_status, payment_method, notes " +
                "FROM invoice " +
                "ORDER BY invoice_id DESC";

        return jdbcTemplate.query(
                sql,
                invoiceRowMapper
        );
    }


    // =====================================================
    // CUSTOMER - MY INVOICES
    // =====================================================

    public List<Invoice> getMyInvoices(int userId) {

        String sql =
                "SELECT i.invoice_id, " +
                "i.job_id, " +
                "i.invoice_no, " +
                "i.invoice_date, " +
                "i.due_date, " +
                "i.subtotal, " +
                "i.discount, " +
                "i.tax, " +
                "i.amount, " +
                "i.payment_status, " +
                "i.payment_method, " +
                "i.notes " +

                "FROM invoice i " +

                "INNER JOIN job_order j " +
                "ON i.job_id = j.job_id " +

                "INNER JOIN customer c " +
                "ON j.customer_id = c.customer_id " +

                "WHERE c.user_id = ? " +

                "ORDER BY i.invoice_id DESC";

        return jdbcTemplate.query(
                sql,
                invoiceRowMapper,
                userId
        );
    }


    // =====================================================
    // VIEW INVOICE BY ID
    // =====================================================

    public Invoice getInvoiceById(int invoiceId) {

        return jdbcTemplate.queryForObject(

                "SELECT invoice_id, job_id, invoice_no, " +
                "invoice_date, due_date, subtotal, discount, " +
                "tax, amount, payment_status, payment_method, notes " +
                "FROM invoice " +
                "WHERE invoice_id=?",

                invoiceRowMapper,

                invoiceId
        );
    }


    // =====================================================
    // CUSTOMER - VIEW OWN INVOICE
    // SECURITY CHECK
    // =====================================================

    public Invoice getMyInvoiceById(
            int invoiceId,
            int userId) {

        String sql =
                "SELECT i.invoice_id, " +
                "i.job_id, " +
                "i.invoice_no, " +
                "i.invoice_date, " +
                "i.due_date, " +
                "i.subtotal, " +
                "i.discount, " +
                "i.tax, " +
                "i.amount, " +
                "i.payment_status, " +
                "i.payment_method, " +
                "i.notes " +

                "FROM invoice i " +

                "INNER JOIN job_order j " +
                "ON i.job_id = j.job_id " +

                "INNER JOIN customer c " +
                "ON j.customer_id = c.customer_id " +

                "WHERE i.invoice_id = ? " +
                "AND c.user_id = ?";

        return jdbcTemplate.queryForObject(
                sql,
                invoiceRowMapper,
                invoiceId,
                userId
        );
    }


    // =====================================================
    // PRINT INVOICE
    // EXISTING ADMIN FUNCTION
    // =====================================================

    public Invoice printInvoice(int invoiceId) {

        return getInvoiceById(invoiceId);
    }


    // =====================================================
    // DELETE INVOICE
    // EXISTING ADMIN FUNCTION
    // =====================================================

    public boolean deleteInvoice(int invoiceId) {

        int value = jdbcTemplate.update(
                "DELETE FROM invoice WHERE invoice_id=?",
                invoiceId
        );

        return value > 0;
    }


    // =====================================================
    // ROW MAPPER
    // =====================================================

    private RowMapper<Invoice> invoiceRowMapper =
            new RowMapper<Invoice>() {

        @Override
        public Invoice mapRow(
                ResultSet rs,
                int rowNum)
                throws SQLException {

            Invoice invoice = new Invoice();

            invoice.setInvoice_id(
                    rs.getInt("invoice_id"));

            invoice.setJob_id(
                    rs.getInt("job_id"));

            invoice.setInvoice_no(
                    rs.getString("invoice_no"));

            invoice.setInvoice_date(
                    rs.getString("invoice_date"));

            invoice.setDue_date(
                    rs.getString("due_date"));

            invoice.setSubtotal(
                    rs.getDouble("subtotal"));

            invoice.setDiscount(
                    rs.getDouble("discount"));

            invoice.setTax(
                    rs.getDouble("tax"));

            invoice.setAmount(
                    rs.getDouble("amount"));

            invoice.setPayment_status(
                    rs.getString("payment_status"));

            invoice.setPayment_method(
                    rs.getString("payment_method"));

            invoice.setNotes(
                    rs.getString("notes"));

            return invoice;
        }
    };
}