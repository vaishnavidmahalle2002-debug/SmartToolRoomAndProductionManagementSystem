
package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Contact;
import com.example.demo.service.ContactService;

@RestController
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class ContactController {

    @Autowired
    ContactService service;


    // =====================================================
    // SAVE CONTACT MESSAGE
    // =====================================================

    @PostMapping("/contact")
    public ResponseEntity<String> saveContact(
            @RequestBody Contact contact) {

        System.out.println(
            "===== CONTACT API CALLED ====="
        );

        boolean result =
            service.saveContact(contact);

        if (result) {

            return ResponseEntity.ok(
                "Message Sent Successfully"
            );

        } else {

            return ResponseEntity.badRequest()
                    .body(
                        "Unable to Send Message"
                    );
        }
    }


    // =====================================================
    // VIEW ALL CONTACT MESSAGES
    // =====================================================

    @GetMapping("/viewAllContacts")
    public ResponseEntity<List<Contact>>
            getAllContacts() {

        System.out.println(
            "===== VIEW ALL CONTACTS API CALLED ====="
        );

        List<Contact> contacts =
            service.getAllContacts();

        return ResponseEntity.ok(
            contacts
        );
    }

}
