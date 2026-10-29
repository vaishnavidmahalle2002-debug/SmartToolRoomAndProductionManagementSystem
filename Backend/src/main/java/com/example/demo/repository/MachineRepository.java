package com.example.demo.repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Machine;

@Repository("machineRepo")
public class MachineRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    // Add Machine
    public boolean addMachine(Machine machine) {

        int value = jdbcTemplate.update(
                "insert into machine(machine_name,machine_type,status) values(?,?,?)",
                new PreparedStatementSetter() {

                    @Override
                    public void setValues(PreparedStatement ps) throws SQLException {

                        ps.setString(1, machine.getMachine_name());
                        ps.setString(2, machine.getMachine_type());
                        ps.setString(3, machine.getStatus());

                    }
                });

        return value > 0;
    }

    // View All Machines
    public List<Machine> getAllMachines() {

        return jdbcTemplate.query("select * from machine",

                new RowMapper<Machine>() {

                    @Override
                    public Machine mapRow(ResultSet rs, int rowNum) throws SQLException {

                        Machine machine = new Machine();

                        machine.setMachine_id(rs.getInt("machine_id"));
                        machine.setMachine_name(rs.getString("machine_name"));
                        machine.setMachine_type(rs.getString("machine_type"));
                        machine.setStatus(rs.getString("status"));

                        return machine;
                    }

                });

    }

    // View Machine By Id
    public Machine getMachineById(int machineId) {

        return jdbcTemplate.queryForObject(

                "select * from machine where machine_id=?",

                new Object[] { machineId },

                (rs, rowNum) -> {

                    Machine machine = new Machine();

                    machine.setMachine_id(rs.getInt("machine_id"));
                    machine.setMachine_name(rs.getString("machine_name"));
                    machine.setMachine_type(rs.getString("machine_type"));
                    machine.setStatus(rs.getString("status"));

                    return machine;

                });

    }

    // Update Machine
    public boolean updateMachine(Machine machine) {

        int value = jdbcTemplate.update(

                "update machine set machine_name=?,machine_type=?,status=? where machine_id=?",

                machine.getMachine_name(),

                machine.getMachine_type(),

                machine.getStatus(),

                machine.getMachine_id());

        return value > 0;

    }

    // Delete Machine
    public boolean deleteMachine(int machineId) {

        int value = jdbcTemplate.update(

                "delete from machine where machine_id=?",

                machineId);

        return value > 0;

    }

    // Track Machine Status
    public boolean updateMachineStatus(int machineId, String status) {

        int value = jdbcTemplate.update(

                "update machine set status=? where machine_id=?",

                status,

                machineId);

        return value > 0;

    }

    // Machine Maintenance
    public boolean machineMaintenance(int machineId) {

        int value = jdbcTemplate.update(

                "update machine set status='Maintenance' where machine_id=?",

                machineId);

        return value > 0;

    }

}