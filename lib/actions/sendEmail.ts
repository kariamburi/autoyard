"use server";


import axios from 'axios';
import nodemailer from 'nodemailer';
export async function sendemail(recipientEmail: string, phoneNumber:string, message:string,adTitle: string, adUrl:string) {
 
   
  let transporter = nodemailer.createTransport({
    host: 'mail.autoyard.co.ke', // your SMTP host
    port: 465, // or 465 if SSL
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'support@autoyard.co.ke', // your email address
      pass: 'KmPE+_0yZpCaiT/Y', // your email password
    },
  });

  // Compose the email
  let mailOptions = {
    from: '"Autoyard Support" <support@autoyard.co.ke>', // sender address
    to: recipientEmail, // recipient email
    subject: 'New Inquiry on Your Ad', // subject line
    text: `You have a new inquiry on your ad titled "${adTitle}".\n\nMessage: ${message}\n\nView the ad here: ${adUrl}`, // plain text body
    html: `<p>You have a new inquiry on your ad titled "<b>${adTitle}</b>".</p><p>Message: ${message}</p><p><a href="${adUrl}">View the ad</a></p>`, // HTML body
  };
  
  try {
    // Send the email
    const response = await transporter.sendMail(mailOptions);
   // console.log(response);
    return "success";
   // res.status(200).json({ message: 'Email and SMS sent successfully' });
  } catch (error) {
    console.error('Error sending email or SMS: ', error);
   // res.status(500).json({ error: 'Failed to send email or SMS' });
    return "Failed";
     
  }



      

}
