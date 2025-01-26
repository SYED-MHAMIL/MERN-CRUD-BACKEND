"use client"
import express from "express"
import Beneficiary from '../model/baneficary.js'
import Token from "../model/token.js"
import emailjs from "@emailjs/browser";
import { nanoid } from 'nanoid';
//    import nodemailer from 'nodemailer';
//    import sgMail from '@sendgrid/mail';
   import dotenv from 'dotenv';
   const router = express.Router(); 
   dotenv.config();
   const { senderEmail, senderPassword } = process.env;
//    sgMail.setApiKey('lndgyjdbppggpuii');
//    const transporter = nodemailer.createTransport({
//        service: 'Gmail',
//        auth: {
//            user: senderEmail,
//            pass: senderPassword,
//        },
//    });


   router.post('/beneficiaries', async (req, res) => {  
    const { cnic, name, phone, address, purpose,department } = req.body;
    try {
        const newBeneficiary = new Beneficiary({
        cnic,
        name,
        phone,
        address,
        purpose,
        history: [],
      });


      const token = nanoid(8);  
    //   newBeneficiary.token=token     
      history[0].remarks=token 
    //   const newToken
    //    =
        await Token.create({
          token,
          beneficiary: newBeneficiary._id,
          department,
      });

    //   // Prepare email
    //   const mailOption = {
    //       from: senderEmail,
    //       to: newBeneficiary.email,
    //       subject: "Token Details",
    //       html: `
    //           <html>
    //           <body>
    //               <h2>Your Token Details</h2>
    //               <p>Token: ${newToken.token}</p>
    //               <p>Beneficiary ID: ${newToken.beneficiary}</p>
    //               <p>Department: ${newToken.department}</p>
    //           </body>
    //           </html>
    //       `,
    //   };

    //   // Send email
    //   transporter.sendMail(mailOption, (error, info) => {
    //       if (error) {
    //           console.error('Email sending failed:', error);
    //       } else {
    //           console.log('Email sent successfully:', info);
    //       }
    //   });

    // const mailOption = {
    //     to: newBeneficiary.email,
    //     from: 'zain03172666@gmail.com', // Must be a verified sender in SendGrid
    //     subject: "Token Details",
    //     html: `
    //       <html>
    //       <body>
    //         <h2>Your Token Details</h2>
    //         <p>Token: ${newToken.token}</p>
    //         <p>Beneficiary ID: ${newToken.beneficiary}</p>
    //         <p>Department: ${newToken.department}</p>
    //       </body>
    //       </html>
    //     `,
    //   };
      
    //   try {
    //     await sgMail.send(mailOption);
    //     console.log("Email sent successfully");
    //   } catch (error) {
    //     console.error("Error sending email:", error);
    //   }


    // emailjs.send(
    //     "service_9jvi53q",
    //     "template_iytaqnc",
    //     {
    //       from_name: newBeneficiary.name,
    //       to_name: "zain",
    //       from_email: newBeneficiary.email,
    //       to_email: "zain03172666@gmail.com",
    //       token: newBeneficiary.token,
    //       beneficiaryId:newToken.beneficiary
    //     },
    //     "iPOtVxkHJb7k3D85k"
    //   );



      await newBeneficiary.save();
      res.status(201).send('Beneficiary created successfully');
    } catch (error) {
      res.status(500).send('Error creating beneficiary');
    }
  });

  router.get("/beneficiaries/token/:token", async (req, res) => {
    try {
      const { token } = req.params;
  
      // Search for the beneficiary with the token in history
      const beneficiary = await Beneficiary.findOne({
        "history.remarks": token,
      });
  
      if (!beneficiary) {
        return res.status(404).json({ error: "Beneficiary not found." });
      }
  
      res.status(200).json(beneficiary);
    } catch (error) {
      console.error("Error fetching beneficiary details:", error);
      res.status(500).json({ error: "Failed to fetch beneficiary details." });
    }
  });
  
  
  // Add History Record
  router.post('/beneficiaries/:id', async (req, res) => {
    const { department, status, remarks } = req.body;
    try {
      const beneficiary = await Beneficiary.findById(req.params.id);
      if (!beneficiary) return res.status(404).send('Beneficiary not found');
  
      beneficiary.history.push({
        department,
        status,
        remarks,
      });
      await beneficiary.save();
      res.status(200).send('History record added successfully');
    } catch (error) {
      res.status(500).send('Error adding history record');
    }
  });
  
  // Get Beneficiary by CNIC
  router.get('/beneficiaries/cnic/:cnic', async (req, res) => {
    try {
      const beneficiary = await Beneficiary.findOne({ cnic: req.params.cnic });
      if (!beneficiary) return res.status(404).send('Beneficiary not found');
      res.json(beneficiary);
    } catch (error) {
      res.status(500).send('Error fetching beneficiary details');
    }
  });
  
  // Update Status of Specific History Record
  router.put('/beneficiaries/:id/history/:historyId', async (req, res) => {
    const { status, remarks } = req.body;
    try {
      const beneficiary = await Beneficiary.findById(req.params.id);
      if (!beneficiary) return res.status(404).send('Beneficiary not found');
  
      const historyRecord = beneficiary.history.id(req.params.historyId);
      if (!historyRecord) return res.status(404).send('History record not found');
  
      historyRecord.status = status;
      historyRecord.remarks = remarks;
  
      await beneficiary.save();
      res.status(200).send('History record updated successfully');
    } catch (error) {
      res.status(500).send('Error updating history record');
    }
  });
  
  export default router