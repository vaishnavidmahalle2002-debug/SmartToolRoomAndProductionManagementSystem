package com.example.demo.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Material;

@Repository
public class MaterialRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

   
    public boolean addMaterial(Material material) {

        String sql = "INSERT INTO material(material_name, quantity, material_type, unit, unit_price, supplier_name, minimum_stock) VALUES(?,?,?,?,?,?,?)";

        int rows = jdbcTemplate.update(sql,
                material.getMaterialName(),
                material.getQuantity(),
                material.getMaterialType(),
                material.getUnit(),
                material.getUnitPrice(),
                material.getSupplierName(),
                material.getMinimumStock());

        return rows > 0;
    }

    // ==========================
    // View All Materials
    // ==========================
    public List<Material> getAllMaterial() {

        String sql = "SELECT * FROM material";

        return jdbcTemplate.query(sql, new RowMapper<Material>() {

            @Override
            public Material mapRow(ResultSet rs, int rowNum) throws SQLException {

                Material material = new Material();

                material.setMaterialId(rs.getInt("material_id"));
                material.setMaterialName(rs.getString("material_name"));
                material.setQuantity(rs.getInt("quantity"));
                material.setMaterialType(rs.getString("material_type"));
                material.setUnit(rs.getString("unit"));
                material.setUnitPrice(rs.getDouble("unit_price"));
                material.setSupplierName(rs.getString("supplier_name"));
                material.setMinimumStock(rs.getInt("minimum_stock"));

                return material;
            }
        });
    }

    // ==========================
    // View Material By Id
    // ==========================
    public Material getMaterialById(int materialId) {

        String sql = "SELECT * FROM material WHERE material_id=?";

        return jdbcTemplate.queryForObject(sql,

                new Object[] { materialId },

                new RowMapper<Material>() {

                    @Override
                    public Material mapRow(ResultSet rs, int rowNum) throws SQLException {

                        Material material = new Material();

                        material.setMaterialId(rs.getInt("material_id"));
                        material.setMaterialName(rs.getString("material_name"));
                        material.setQuantity(rs.getInt("quantity"));
                        material.setMaterialType(rs.getString("material_type"));
                        material.setUnit(rs.getString("unit"));
                        material.setUnitPrice(rs.getDouble("unit_price"));
                        material.setSupplierName(rs.getString("supplier_name"));
                        material.setMinimumStock(rs.getInt("minimum_stock"));

                        return material;
                    }
                });
    }

    // ==========================
    // Update Material
    // ==========================
    public boolean updateMaterial(Material material) {

        String sql = "UPDATE material SET material_name=?, quantity=?, material_type=?, unit=?, unit_price=?, supplier_name=?, minimum_stock=? WHERE material_id=?";

        int rows = jdbcTemplate.update(sql,

                material.getMaterialName(),
                material.getQuantity(),
                material.getMaterialType(),
                material.getUnit(),
                material.getUnitPrice(),
                material.getSupplierName(),
                material.getMinimumStock(),
                material.getMaterialId());

        return rows > 0;
    }

    // ==========================
    // Delete Material
    // ==========================
    public boolean deleteMaterial(int materialId) {

        String sql = "DELETE FROM material WHERE material_id=?";

        int rows = jdbcTemplate.update(sql, materialId);

        return rows > 0;
    }

    // ==========================
    // Consume Material
    // ==========================
    public boolean consumeMaterial(int materialId, int consumeQty) {

        Integer available = jdbcTemplate.queryForObject(

                "SELECT quantity FROM material WHERE material_id=?",

                Integer.class,

                materialId);

        if (available == null || available < consumeQty) {
            return false;
        }

        int rows = jdbcTemplate.update(

                "UPDATE material SET quantity = quantity - ? WHERE material_id=?",

                consumeQty,

                materialId);

        return rows > 0;
    }

    // ==========================
    // Check Stock
    // ==========================
    public String checkStock(int materialId) {

        Material material = getMaterialById(materialId);

        if (material.getQuantity() <= material.getMinimumStock()) {
            return "Low Stock";
        }

        return "Stock Available";
    }

}