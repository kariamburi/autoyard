import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { recipientEmail, phoneNumber, message, adTitle, adUrl } = req.body;

    // Nodemailer transporter configuration
    let transporter = nodemailer.createTransport({
      host: 'mail.autoyard.co.ke', // your SMTP host
      port: 587, // or 465 if SSL
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'support@autoyard.co.ke', // your email address
        pass: 'your-email-password', // your email password
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
      await transporter.sendMail(mailOptions);

      // Send SMS notification
      const smsMessage = `New inquiry on your ad "${adTitle}": ${message}`;
      const smsUrl = `http://107.20.199.106/sms/1/text/query?username=Ezeshatrans&password=5050Martin.com&from=Ezesha&text=${encodeURIComponent(
        smsMessage
      )}&to=${phoneNumber}`;

      const smsResponse = await fetch(smsUrl);

      if (!smsResponse.ok) {
        console.error('Failed to send SMS');
      }

      res.status(200).json({ message: 'Email and SMS sent successfully' });
    } catch (error) {
      console.error('Error sending email or SMS: ', error);
      res.status(500).json({ error: 'Failed to send email or SMS' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
