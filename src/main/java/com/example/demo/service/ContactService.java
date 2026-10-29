
package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Contact;
import com.example.demo.repository.ContactRepository;

@Service
public class ContactService {

    @Autowired
    ContactRepository repository;


    // =====================================================
    // SAVE CONTACT MESSAGE
    // =====================================================

    public boolean saveContact(Contact contact) {

        return repository.saveContact(contact);

    }


    // =====================================================
    // GET ALL CONTACT MESSAGES
    // =====================================================

    public List<Contact> getAllContacts() {

        return repository.getAllContacts();

    }

}

