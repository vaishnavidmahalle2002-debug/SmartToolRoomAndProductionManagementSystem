package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Machine;
import com.example.demo.service.MachineService;

@RestController
@CrossOrigin(origins = "${app.cors.allowed-origins}",
	    allowCredentials = "true"
	)
public class MachineController {

    @Autowired
    MachineService machineService;

    // Add Machine
    @PostMapping("/addMachine")
    public String addMachine(@RequestBody Machine machine) {

        return machineService.addMachine(machine)
                ? "Machine added successfully"
                : "Machine not added";
    }

    // View All Machines
    @GetMapping("/viewallMachines")
    public List<Machine> getAllMachines() {

        return machineService.getAllMachines();
    }

    // View Machine By Id
    @GetMapping("/viewMachine/{machineId}")
    public Machine getMachineById(@PathVariable int machineId) {

        return machineService.getMachineById(machineId);
    }

    // Update Machine
    @PutMapping("/updMachine")
    public String updateMachine(@RequestBody Machine machine) {

        return machineService.updateMachine(machine)
                ? "Machine updated successfully"
                : "Machine not updated";
    }

    // Delete Machine
    @DeleteMapping("/delmMachine/{machineId}")
    public String deleteMachine(@PathVariable int machineId) {

        return machineService.deleteMachine(machineId)
                ? "Machine deleted successfully"
                : "Machine not deleted";
    }

    // Track Machine Status
    @PutMapping("/trackStatus/{machineId}")
    public String updateMachineStatus(@PathVariable int machineId,
                                      @RequestParam String status) {

        return machineService.updateMachineStatus(machineId, status)
                ? "Machine status updated successfully"
                : "Machine status not updated";
    }

    // Machine Maintenance
    @PutMapping("/machineMaintenance/{machineId}")
    public String machineMaintenance(@PathVariable int machineId) {

        return machineService.machineMaintenance(machineId)
                ? "Machine sent for maintenance"
                : "Operation failed";
    }

}