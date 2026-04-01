const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3500;
// Email logo as base64 data URI for universal email client compatibility (SVG for emails)
const EMAIL_LOGO_SVG_PATH = path.join(__dirname, 'logonz.svg');
const EMAIL_LOGO_BASE64 = fs.readFileSync(EMAIL_LOGO_SVG_PATH).toString('base64');
const EMAIL_LOGO_HTML = `<img src="data:image/svg+xml;base64,${EMAIL_LOGO_BASE64}" alt="NZ Essentials" width="150" height="150" style="width: 150px; height: 150px; max-width: 100%; display: block; margin: 0 auto; border: 0; outline: none; text-decoration: none; object-fit: contain;" />`;

function getEmailLogoAttachments() {
  // No CID attachments needed - logo is inline base64
  return [];
}

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, PNG, and JPG are allowed.'));
    }
  }
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files
app.use(express.static('./'));

// Configure Nodemailer transporter for Hostinger
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.titan.email',
  port: parseInt(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || 'naveen@nzessentials.co.nz',
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verify email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Logo as base64 (embedded for PDF)
const LOGO_BASE64 = 'data:image/png;base64,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';

// Generate PDF from HTML template
async function generateLOAPDF(data) {
  // Read the format.html template
  let htmlTemplate = fs.readFileSync(path.join(__dirname, 'format.html'), 'utf8');
  
  // Replace logo with base64 embedded image
  htmlTemplate = htmlTemplate.replace(
    /src="logonz\.png"/g,
    `src="${LOGO_BASE64}"`
  );
  
  // Replace template variables
  htmlTemplate = htmlTemplate
    .replace(/{{ authorisedPerson }}/g, data.authPerson || '')
    .replace(/{{ jobTitle }}/g, data.jobTitle || '')
    .replace(/{{ registeredName }}/g, data.registeredName || '')
    .replace(/{{ tradingName }}/g, data.tradingName || '')
    .replace(/{{ mainContactName }}/g, data.contactName || '')
    .replace(/{{ mainContactPhone }}/g, data.phone || '')
    .replace(/{{ mainContactEmail }}/g, data.email || '')
    .replace(/{{ interestedInSolar }}/g, data.interestedSolar || 'No')
    .replace(/{{ industryType }}/g, data.industryType || '')
    .replace(/{{ isDecisionMaker }}/g, data.decisionMaker || 'No')
    .replace(/{{ signedDate }}/g, data.date || new Date().toISOString().split('T')[0])
    .replace(/{{ dobSignatory }}/g, data.signatureDate || '')
    .replace(/{{ signatureImage }}/g, data.signature || '');

  // Replace ICP fields
  for (let i = 1; i <= 5; i++) {
    htmlTemplate = htmlTemplate.replace(new RegExp(`{{ vars\\['icp${i}'\\] \\| default\\('Placeholder'\\) }}`, 'g'), data[`icp${i}`] || '');
    htmlTemplate = htmlTemplate.replace(new RegExp(`{{ vars\\['gasIcp${i}'\\] \\| default\\('Placeholder'\\) }}`, 'g'), data[`gasIcp${i}`] || '');
  }

  // Remove Jinja template syntax
  htmlTemplate = htmlTemplate.replace(/{% for i in range\(1, 6\) %}[\s\S]*?{% endfor %}/g, '');

  // Add ICP rows manually
  let icpRows = '';
  for (let i = 1; i <= 5; i++) {
    icpRows += `
      <tr>
        <td class="p-4 font-bold">ICP ${i}:</td>
        <td class="p-4">${data[`icp${i}`] || ''}</td>
        <td class="p-4 font-bold">Gas ICP ${i}:</td>
        <td class="p-4">${data[`gasIcp${i}`] || ''}</td>
      </tr>
    `;
  }
  
  // Insert ICP rows after Supply Address row
  htmlTemplate = htmlTemplate.replace(
    /<tr class="border-t-2 border-black">\s*<td class="p-4 font-bold" colspan="4">Supply Address:<\/td>\s*<\/tr>/,
    `<tr class="border-t-2 border-black"><td class="p-4 font-bold" colspan="4">Supply Address:</td></tr>${icpRows}`
  );

  // Launch Puppeteer to generate PDF
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setContent(htmlTemplate, { waitUntil: 'networkidle0' });
  
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
  });
  
  await browser.close();
  
  return pdfBuffer;
}

// LOA Form submission endpoint (Join Us page)
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
    const pdfBuffer = await generateLOAPDF(data);
    const fileName = `NZE-LOA-${data.authPerson.replace(/\s+/g, '_')}-${Date.now()}.pdf`;

    // Email content
    const emailContent = `
      <div style="font-family: 'Anek Latin', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 30px;">
        <div style="text-align: center; margin-bottom: 30px;">
          ${EMAIL_LOGO_HTML}
        </div>
        <h2 style="color: #ffe413; margin-bottom: 20px;">Letter of Authority Submission</h2>
        <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; border: 1px solid #333;">
          <p><strong style="color: #ffe413;">Name of Authorised Person:</strong> ${data.authPerson}</p>
          <p><strong style="color: #ffe413;">Job Title:</strong> ${data.jobTitle}</p>
          <p><strong style="color: #ffe413;">Registered Name of Entity:</strong> ${data.registeredName}</p>
          <p><strong style="color: #ffe413;">Trading Name:</strong> ${data.tradingName || 'N/A'}</p>
          <p><strong style="color: #ffe413;">Main Contact Name:</strong> ${data.contactName || 'N/A'}</p>
          <p><strong style="color: #ffe413;">Phone Number:</strong> ${data.phone}</p>
          <p><strong style="color: #ffe413;">Email Address:</strong> ${data.email}</p>
          <p><strong style="color: #ffe413;">Interested in Solar:</strong> ${data.interestedSolar || 'No'}</p>
          <p><strong style="color: #ffe413;">Industry Type:</strong> ${data.industryType || 'N/A'}</p>
          <p><strong style="color: #ffe413;">Submission Date:</strong> ${new Date().toLocaleString('en-NZ')}</p>
        </div>
        <p style="margin-top: 20px; color: #888;">Please find the signed Letter of Authority attached.</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; text-align: center; color: #666;">
          <p>NZ Essentials | Empowering Kiwi Businesses</p>
          <p>info@nzessentials.co.nz</p>
        </div>
      </div>
    `;

    // Send email to the person who filled the form
    await transporter.sendMail({
      from: `"NZ Essentials" <${process.env.EMAIL_USER || 'naveen@nzessentials.co.nz'}>`,
      to: data.email,
      subject: 'NZ Essentials - Your Letter of Authority',
      html: `
        <div style="font-family: 'Anek Latin', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 30px;">
          <div style="text-align: center; margin-bottom: 30px;">
            ${EMAIL_LOGO_HTML}
          </div>
          <h2 style="color: #ffe413;">Thank You for Joining NZ Essentials!</h2>
          <p>Dear ${data.authPerson},</p>
          <p>Thank you for submitting your Letter of Authority. We have received your application and will begin working on finding you the best energy rates.</p>
          <p>Please find your signed LOA document attached for your records.</p>
          <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; border: 1px solid #ffe413; margin: 20px 0;">
            <h3 style="color: #ffe413; margin-top: 0;">What Happens Next?</h3>
            <ul style="color: #ccc;">
              <li>Our team will review your submission</li>
              <li>We'll analyze your energy requirements</li>
              <li>You'll receive customized proposals very soon</li>
            </ul>
          </div>
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p style="margin-top: 20px;">Best regards,<br><strong style="color: #ffe413;">NZ Essentials Team</strong></p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; text-align: center; color: #666;">
            <p>NZ Essentials | Empowering Kiwi Businesses</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: fileName,
          content: pdfBuffer,
          contentType: 'application/pdf'
        },
        ...getEmailLogoAttachments()
      ]
    });

    // Send email to admin (yadav.vipin95@outlook.com)
    await transporter.sendMail({
      from: `"NZ Essentials" <${process.env.EMAIL_USER || 'naveen@nzessentials.co.nz'}>`,
      to: process.env.ADMIN_EMAIL || 'yadav.vipin95@outlook.com',
      subject: `New LOA Submission - ${data.authPerson} (${data.registeredName})`,
      html: emailContent,
      attachments: [
        {
          filename: fileName,
          content: pdfBuffer,
          contentType: 'application/pdf'
        },
        ...getEmailLogoAttachments()
      ]
    });

    res.json({
      success: true,
      message: 'Application submitted successfully! Check your email for confirmation.'
    });

  } catch (error) {
    console.error('LOA Form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Submission failed: ' + error.message
    });
  }
});

// Contact form endpoint (with optional file upload)
app.post('/api/contact', upload.single('powerBill'), async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const file = req.file;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone are required'
      });
    }

    // Prepare attachments - include logo for email
    const attachments = [...getEmailLogoAttachments()];
    if (file) {
      attachments.push({
        filename: file.originalname,
        content: file.buffer,
        contentType: file.mimetype
      });
    }

    // Email content for admin
    const adminEmailContent = `
      <div style="font-family: 'Anek Latin', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 30px;">
        <div style="text-align: center; margin-bottom: 30px;">
          ${EMAIL_LOGO_HTML}
        </div>
        <h2 style="color: #ffe413; margin-bottom: 20px;">New Contact Form Submission</h2>
        <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; border: 1px solid #333;">
          <p><strong style="color: #ffe413;">Name:</strong> ${name}</p>
          <p><strong style="color: #ffe413;">Email:</strong> ${email}</p>
          <p><strong style="color: #ffe413;">Phone:</strong> +64 ${phone}</p>
          <p><strong style="color: #ffe413;">Power Bill Attached:</strong> ${file ? 'Yes (' + file.originalname + ')' : 'No'}</p>
          <p><strong style="color: #ffe413;">Submission Date:</strong> ${new Date().toLocaleString('en-NZ')}</p>
        </div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; text-align: center; color: #666;">
          <p>NZ Essentials Contact System</p>
        </div>
      </div>
    `;

    // Send notification email to admin ONLY
    await transporter.sendMail({
      from: `"NZ Essentials Website" <${process.env.EMAIL_USER || 'naveen@nzessentials.co.nz'}>`,
      to: process.env.ADMIN_EMAIL || 'yadav.vipin95@outlook.com',
      subject: `New Contact: ${name} - NZ Essentials`,
      html: adminEmailContent,
      attachments: attachments
    });

    res.json({
      success: true,
      message: 'Thank you! We will be in touch shortly.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('========================================');
  console.log('   NZ Essentials Backend Server');
  console.log('========================================');
  console.log(`Server running on port ${PORT}`);
  console.log('');
  console.log('Endpoints:');
  console.log(`  POST /api/submit-form  - LOA Form (Join Us)`);
  console.log(`  POST /api/contact      - Contact Form`);
  console.log(`  GET  /api/health       - Health Check`);
  console.log('');
});
