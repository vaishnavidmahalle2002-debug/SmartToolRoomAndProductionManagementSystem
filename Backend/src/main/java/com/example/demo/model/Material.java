package com.example.demo.model;

public class Material {

    private Integer materialId;
    private String materialName;
    private String materialType;
    private String unit;
    private Integer quantity;
    private Double unitPrice;
    private String supplierName;
    private Integer minimumStock;

    public Material() {
    }

    public Material(Integer materialId, String materialName, String materialType,
                    String unit, Integer quantity, Double unitPrice,
                    String supplierName, Integer minimumStock) {
        this.materialId = materialId;
        this.materialName = materialName;
        this.materialType = materialType;
        this.unit = unit;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.supplierName = supplierName;
        this.minimumStock = minimumStock;
    }

    public Integer getMaterialId() {
        return materialId;
    }

    public void setMaterialId(Integer materialId) {
        this.materialId = materialId;
    }

    public String getMaterialName() {
        return materialName;
    }

    public void setMaterialName(String materialName) {
        this.materialName = materialName;
    }

    public String getMaterialType() {
        return materialType;
    }

    public void setMaterialType(String materialType) {
        this.materialType = materialType;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public Integer getMinimumStock() {
        return minimumStock;
    }

    public void setMinimumStock(Integer minimumStock) {
        this.minimumStock = minimumStock;
    }

    @Override
    public String toString() {
        return "Material{" +
                "materialId=" + materialId +
                ", materialName='" + materialName + '\'' +
                ", materialType='" + materialType + '\'' +
                ", unit='" + unit + '\'' +
                ", quantity=" + quantity +
                ", unitPrice=" + unitPrice +
                ", supplierName='" + supplierName + '\'' +
                ", minimumStock=" + minimumStock +
                '}';
    }
}