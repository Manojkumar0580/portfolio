import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { Inquiry } from '../models/Inquiry.js';

// Cache the MongoDB connection so we don't open a new one per request in Serverless
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState;
    console.log('MongoDB connected for Serverless Function');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    await connectDB();

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
    
    return res.status(201).json({ success: true, message: 'Inquiry saved successfully.' });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    return res.status(500).json({ error: 'Failed to save inquiry.' });
  }
}
