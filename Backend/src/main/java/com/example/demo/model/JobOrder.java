package com.example.demo.model;

import java.sql.Date;

public class JobOrder {

private Integer job_id;
private Integer customer_id;
private Integer worker_id;
private Integer machine_id;
private String part_name;
private String job_type;
private Integer quantity;
private Date required_date;
private String description;
private String additional_requirements;
private String material;
private String design_file;
private String status;


// =====================================================
// DEFAULT CONSTRUCTOR
// =====================================================

public JobOrder() {
}


// =====================================================
// PARAMETERIZED CONSTRUCTOR
// =====================================================

public JobOrder(
        Integer job_id,
        Integer customer_id,
        Integer worker_id,
        Integer machine_id,
        String part_name,
        String job_type,
        Integer quantity,
        Date required_date,
        String description,
        String additional_requirements,
        String material,
        String design_file,
        String status) {

    this.job_id = job_id;
    this.customer_id = customer_id;
    this.worker_id = worker_id;
    this.machine_id = machine_id;
    this.part_name = part_name;
    this.job_type = job_type;
    this.quantity = quantity;
    this.required_date = required_date;
    this.description = description;
    this.additional_requirements = additional_requirements;
    this.material = material;
    this.design_file = design_file;
    this.status = status;
}


// =====================================================
// GETTERS AND SETTERS
// =====================================================

public Integer getJob_id() {
    return job_id;
}

public void setJob_id(Integer job_id) {
    this.job_id = job_id;
}


public Integer getCustomer_id() {
    return customer_id;
}

public void setCustomer_id(Integer customer_id) {
    this.customer_id = customer_id;
}


public Integer getWorker_id() {
    return worker_id;
}

public void setWorker_id(Integer worker_id) {
    this.worker_id = worker_id;
}


public Integer getMachine_id() {
    return machine_id;
}

public void setMachine_id(Integer machine_id) {
    this.machine_id = machine_id;
}


public String getPart_name() {
    return part_name;
}

public void setPart_name(String part_name) {
    this.part_name = part_name;
}


public String getJob_type() {
    return job_type;
}

public void setJob_type(String job_type) {
    this.job_type = job_type;
}


public Integer getQuantity() {
    return quantity;
}

public void setQuantity(Integer quantity) {
    this.quantity = quantity;
}


public Date getRequired_date() {
    return required_date;
}

public void setRequired_date(Date required_date) {
    this.required_date = required_date;
}


public String getDescription() {
    return description;
}

public void setDescription(String description) {
    this.description = description;
}


public String getAdditional_requirements() {
    return additional_requirements;
}

public void setAdditional_requirements(
        String additional_requirements) {

    this.additional_requirements =
            additional_requirements;
}


public String getMaterial() {
    return material;
}

public void setMaterial(String material) {
    this.material = material;
}


public String getDesign_file() {
    return design_file;
}

public void setDesign_file(String design_file) {
    this.design_file = design_file;
}


public String getStatus() {
    return status;
}

public void setStatus(String status) {
    this.status = status;
}


// =====================================================
// TO STRING
// =====================================================

@Override
public String toString() {

    return "JobOrder{" +
            "job_id=" + job_id +
            ", customer_id=" + customer_id +
            ", worker_id=" + worker_id +
            ", machine_id=" + machine_id +
            ", part_name='" + part_name + '\'' +
            ", job_type='" + job_type + '\'' +
            ", quantity=" + quantity +
            ", required_date=" + required_date +
            ", description='" + description + '\'' +
            ", additional_requirements='" +
            additional_requirements + '\'' +
            ", material='" + material + '\'' +
            ", design_file='" + design_file + '\'' +
            ", status='" + status + '\'' +
            '}';
}


}
