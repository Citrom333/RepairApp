package com.example.repairingapp.controllers;

import com.example.repairingapp.model.EmailDetails;
import com.example.repairingapp.services.SendEmailService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("sendEmail")
public class SendEmailController {
private final SendEmailService sendEmailService;

    public SendEmailController(SendEmailService sendEmailService) {
        this.sendEmailService = sendEmailService;
    }
    @PostMapping
    public void sendEmail(@RequestBody EmailDetails emailDetails) throws IOException {
        sendEmailService.sendEmail(emailDetails);
    }

}
