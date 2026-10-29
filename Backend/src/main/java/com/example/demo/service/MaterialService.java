package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Material;
import com.example.demo.repository.MaterialRepository;

@Service
public class MaterialService {

    @Autowired
    private MaterialRepository materialRepository;

    public boolean addMaterial(Material material) {
        return materialRepository.addMaterial(material);
    }

    public List<Material> getAllMaterial() {
        return materialRepository.getAllMaterial();
    }


    public Material getMaterialById(int materialId) {
        return materialRepository.getMaterialById(materialId);
    }

  
    public boolean updateMaterial(Material material) {
        return materialRepository.updateMaterial(material);
    }

    public boolean deleteMaterial(int materialId) {
        return materialRepository.deleteMaterial(materialId);
    }

    
    public boolean consumeMaterial(int materialId, int quantity) {
        return materialRepository.consumeMaterial(materialId, quantity);
    }

    
    public String checkStock(int materialId) {
        return materialRepository.checkStock(materialId);
    }

}