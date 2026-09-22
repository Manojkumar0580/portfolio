import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { Inquiry } from './models/Inquiry.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// API route to handle contact form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, projectType, budgetRange, message } = req.body;
    
    const newInquiry = new Inquiry({
      name,
      email,
      company,
      projectType,
      budgetRange,
      message
    });

    await newInquiry.save();
    console.log('New inquiry saved:', newInquiry.email);
    
    // Send email notification
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `🚀 New Project Inquiry: ${name}`,
        html: `
          <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
            <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0;">
              <h2 style="color: #0f172a; margin: 0;">New Portfolio Inquiry</h2>
              <p style="color: #64748b; margin-top: 5px; font-size: 14px;">You have received a new message from your website.</p>
            </div>
            
            <div style="padding: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; width: 120px;"><strong style="color: #475569;">Name:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong style="color: #475569;">Email:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                    <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong style="color: #475569;">Company:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${company || '<i>Not provided</i>'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong style="color: #475569;">Project Type:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">
                    <span style="background-color: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 13px;">${projectType}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><strong style="color: #475569;">Budget:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #16a34a; font-weight: 600;">${budgetRange}</td>
                </tr>
              </table>
              
              <div style="margin-top: 25px;">
                <strong style="color: #475569; display: block; margin-bottom: 10px;">Message:</strong>
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</div>
              </div>
            </div>
            
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 12px;">
              <p>This email was sent automatically from your portfolio contact form.</p>
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('Email notification sent to', process.env.EMAIL_USER);
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
    }
    
    res.status(201).json({ success: true, message: 'Inquiry saved successfully.' });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).json({ error: 'Failed to save inquiry.' });
  }
});

app.listen(port, () => {
  console.log(`API Server running at http://localhost:${port}`);
});
