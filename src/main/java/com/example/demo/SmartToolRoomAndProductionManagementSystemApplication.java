package com.example.demo;   

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class SmartToolRoomAndProductionManagementSystemApplication
        extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(SmartToolRoomAndProductionManagementSystemApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(SmartToolRoomAndProductionManagementSystemApplication.class, args);
    }
}