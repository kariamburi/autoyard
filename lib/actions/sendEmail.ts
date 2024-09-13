"use server";

import nodemailer from 'nodemailer';

export async function sendEmail(
  recipientEmail: string, 
  message: string, 
  adTitle: string, 
  adUrl: string
) {

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // your SMTP host
    port: 465, // or 465 if SSL
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // your email address
      pass: process.env.SMTP_PASS, // your email password
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
    console.log('Email sent:', response);
    return "success";
  } catch (error) {
    console.error('Error sending email:', error);
    return "Failed";
  }
}
