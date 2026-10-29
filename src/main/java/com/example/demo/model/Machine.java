package com.example.demo.model;

public class Machine {

    private Integer machine_id;
    private String machine_name;
    private String machine_type;
    private String status;

    public Machine() {
    }

    public Machine(Integer machine_id, String machine_name, String machine_type, String status) {
        this.machine_id = machine_id;
        this.machine_name = machine_name;
        this.machine_type = machine_type;
        this.status = status;
    }

    public Integer getMachine_id() {
        return machine_id;
    }

    public void setMachine_id(Integer machine_id) {
        this.machine_id = machine_id;
    }

    public String getMachine_name() {
        return machine_name;
    }

    public void setMachine_name(String machine_name) {
        this.machine_name = machine_name;
    }

    public String getMachine_type() {
        return machine_type;
    }

    public void setMachine_type(String machine_type) {
        this.machine_type = machine_type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}