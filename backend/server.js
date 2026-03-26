const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from current directory
app.use(express.static('./'));

// Configure Nodemailer transporter
// Using Gmail as example - update with your email credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

// Generate PDF from form data
function generatePDF(data) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks = [];

      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        resolve(pdfBuffer);
      });

      // PDF content
      doc.fontSize(18).text('NZ Essentials - Application Form', { align: 'center' });
      doc.moveDown();

      doc.fontSize(12);
      doc.text(`Name of Authorised Person: ${data.authPerson || '-'}`);
      doc.text(`Job Title: ${data.jobTitle || '-'}`);
      doc.text(`Registered Name of the Entity: ${data.registeredName || '-'}`);
      doc.text(`Trading Name: ${data.tradingName || '-'}`);
      doc.text(`Main Contact Name: ${data.contactName || '-'}`);
      doc.text(`Phone Number: ${data.phone || '-'}`);
      doc.text(`Email Address: ${data.email || '-'}`);
      doc.moveDown();
      doc.text(`Submission Date: ${new Date().toLocaleString()}`);

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

// Main form submission endpoint
app.post('/api/submit-form', async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.authPerson || !data.jobTitle || !data.registeredName || !data.phone || !data.email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Generate PDF
    const pdfBuffer = await generatePDF(data);

    // Prepare email content
    const emailContent = `
      <h2>NZ Essentials Application Form Submission</h2>
      <p><strong>Name of Authorised Person:</strong> ${data.authPerson}</p>
      <p><strong>Job Title:</strong> ${data.jobTitle}</p>
      <p><strong>Registered Name of the Entity:</strong> ${data.registeredName}</p>
      <p><strong>Trading Name:</strong> ${data.tradingName || 'N/A'}</p>
      <p><strong>Main Contact Name:</strong> ${data.contactName || 'N/A'}</p>
      <p><strong>Phone Number:</strong> ${data.phone}</p>
      <p><strong>Email Address:</strong> ${data.email}</p>
      <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
    `;

    // Send email to form submitter
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: data.email,
      subject: 'NZ Essentials - Application Form Received',
      html: `
        <h2>Thank you for your submission!</h2>
        ${emailContent}
        <p>Please find your application form attached.</p>
      `,
      attachments: [
        {
          filename: 'application-form.pdf',
          content: pdfBuffer
        }
      ]
    });

    // Send email to your account (ADMIN_EMAIL)
    if (process.env.ADMIN_EMAIL) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER || 'your-email@gmail.com',
        to: process.env.ADMIN_EMAIL,
        subject: 'New NZ Essentials Application Form Submission',
        html: `
          <h2>New Application Submission</h2>
          ${emailContent}
        `,
        attachments: [
          {
            filename: 'application-form.pdf',
            content: pdfBuffer
          }
        ]
      });
    } else {
      console.warn('ADMIN_EMAIL not configured. Set it in .env to receive submission notifications.');
    }

    res.json({
      success: true,
      message: 'Application submitted successfully. Email sent to ' + data.email
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Submission failed: ' + error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`NZ Essentials server running on http://localhost:${PORT}`);
  console.log('Form available at http://localhost:' + PORT + '/form.html');
  console.log('');
  console.log('SETUP INSTRUCTIONS:');
  console.log('1. Create a .env file with:');
  console.log('   EMAIL_USER=your-gmail@gmail.com');
  console.log('   EMAIL_PASSWORD=your-app-password');
  console.log('   ADMIN_EMAIL=admin@example.com (optional)');
  console.log('');
  console.log('2. For Gmail: Use an App Password (not your regular password)');
  console.log('   Get it from: https://myaccount.google.com/apppasswords');
});
