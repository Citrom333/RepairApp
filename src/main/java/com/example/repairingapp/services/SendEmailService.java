package com.example.repairingapp.services;

import com.sendgrid.*;
import org.springframework.stereotype.Service;
import com.example.repairingapp.model.EmailDetails;
import java.io.IOException;
@Service
public class SendEmailService {


    public static void sendEmail(EmailDetails emailDetails) throws IOException {

        Email from = new Email("citrom333@gmail.com");
        String subject = emailDetails.getSubject();
        Email to = new Email(emailDetails.getAddress());
        Content content = new Content("text/plain", emailDetails.getContent());
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {

            throw ex;
        }
    }

}

