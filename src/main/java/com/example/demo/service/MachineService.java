package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Machine;
import com.example.demo.repository.MachineRepository;

@Service("machineService")
public class MachineService {

    @Autowired
    MachineRepository machineRepo;

    public boolean addMachine(Machine machine) {
        return machineRepo.addMachine(machine);
    }

    public List<Machine> getAllMachines() {
        return machineRepo.getAllMachines();
    }

    public Machine getMachineById(int machineId) {
        return machineRepo.getMachineById(machineId);
    }

    public boolean updateMachine(Machine machine) {
        return machineRepo.updateMachine(machine);
    }

    public boolean deleteMachine(int machineId) {
        return machineRepo.deleteMachine(machineId);
    }

    public boolean updateMachineStatus(int machineId, String status) {
        return machineRepo.updateMachineStatus(machineId, status);
    }

    public boolean machineMaintenance(int machineId) {
        return machineRepo.machineMaintenance(machineId);
    }

}