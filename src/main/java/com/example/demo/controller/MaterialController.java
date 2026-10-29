package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Material;
import com.example.demo.service.MaterialService;

@RestController
@CrossOrigin(origins = "${app.cors.allowed-origins}",
    allowCredentials = "true"
)
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    // ============================
    // ADD MATERIAL
    // ============================

    @PostMapping("/addMaterial")
    public String addMaterial(@RequestBody Material material) {

        return materialService.addMaterial(material)
                ? "Material added successfully"
                : "Material not added";
    }

    // ============================
    // VIEW ALL MATERIALS
    // ============================

    @GetMapping("/viewallMaterial")
    public List<Material> getAllMaterial() {

        return materialService.getAllMaterial();
    }

    // ============================
    // VIEW MATERIAL BY ID
    // ============================

    @GetMapping("/viewMaterial/{materialId}")
    public Material getMaterialById(
            @PathVariable int materialId) {

        return materialService.getMaterialById(materialId);
    }

    // ============================
    // UPDATE MATERIAL
    // ============================

    @PutMapping("/updMaterial")
    public String updateMaterial(
            @RequestBody Material material) {

        return materialService.updateMaterial(material)
                ? "Material updated successfully"
                : "Material not updated";
    }

    // ============================
    // DELETE MATERIAL
    // ============================

    @DeleteMapping("/delMaterial/{materialId}")
    public String deleteMaterial(
            @PathVariable int materialId) {

        return materialService.deleteMaterial(materialId)
                ? "Material deleted successfully"
                : "Material not deleted";
    }

    // ============================
    // CONSUME MATERIAL
    // ============================

    @PutMapping("/consumeMaterial/{materialId}")
    public String consumeMaterial(
            @PathVariable int materialId,
            @RequestParam int quantity) {

        return materialService.consumeMaterial(
                materialId, quantity)
                ? "Material consumed successfully"
                : "Insufficient Stock";
    }

    // ============================
    // CHECK STOCK
    // ============================

    @GetMapping("/checkStock/{materialId}")
    public String checkStock(
            @PathVariable int materialId) {

        return materialService.checkStock(materialId);
    }
}