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

// ============================================
// PRE-LOAD ALL ASSETS AT STARTUP (ONE TIME)
// ============================================

// Pre-load email logo (logonz2.png for email body)
const EMAIL_LOGO_PNG_PATH = path.join(__dirname, 'logonz2.png');
const EMAIL_LOGO_CID = 'nzessentials-logo@nze';
const EMAIL_LOGO_HTML = `<img src="cid:${EMAIL_LOGO_CID}" alt="NZ Essentials" width="150" height="60" style="width: 150px; height: 60px; max-width: 100%; display: block; margin: 0 auto; border: 0; outline: none; text-decoration: none; object-fit: contain;" />`;
const PDF_LOGO_BASE64 = 'data:image/png;base64,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';
const EMAIL_LOGO_BASE64_STRING = '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';
const EMAIL_LOGO_BUFFER = Buffer.from(EMAIL_LOGO_BASE64_STRING, 'base64');

// Pre-load PDF logo (logonz.png for PDF generation)
// Pre-load HTML template once
const HTML_TEMPLATE_RAW = fs.readFileSync(path.join(__dirname, 'format.html'), 'utf8');
// Pre-replace logo in template (static replacement done once)
const HTML_TEMPLATE = HTML_TEMPLATE_RAW.replace(/src="logonz\.png"/g, `src="${PDF_LOGO_BASE64}"`);

// Pre-compiled email logo attachment (reused for every email)
const EMAIL_LOGO_ATTACHMENT = {
  filename: 'logo.png',
  content: EMAIL_LOGO_BUFFER,
  cid: EMAIL_LOGO_CID
};

function getEmailLogoAttachments() {
  return [EMAIL_LOGO_ATTACHMENT];
}

// ============================================
// PERSISTENT BROWSER INSTANCE (HUGE SPEEDUP)
// ============================================
let browserInstance = null;

async function getBrowser() {
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
  }
  return browserInstance;
}

// Graceful shutdown
process.on('SIGINT', async () => {
  if (browserInstance) await browserInstance.close();
  process.exit();
});
process.on('SIGTERM', async () => {
  if (browserInstance) await browserInstance.close();
  process.exit();
});

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

// Configure Nodemailer transporter for Hostinger (with connection pooling)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.titan.email',
  port: parseInt(process.env.SMTP_PORT) || 465,
  secure: true,
  pool: true, // Use connection pooling for faster subsequent emails
  maxConnections: 5,
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

// Generate PDF from HTML template (OPTIMIZED - uses pre-loaded template & persistent browser)
async function generateLOAPDF(data) {
  // Start with pre-loaded template (no file I/O)
  let htmlTemplate = HTML_TEMPLATE;
  
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

  // Use persistent browser instance (no cold start - HUGE speedup)
  const browser = await getBrowser();
  const page = await browser.newPage();
  
  try {
    await page.setContent(htmlTemplate, { waitUntil: 'domcontentloaded' }); // Faster than networkidle0
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
    });
    
    return pdfBuffer;
  } finally {
    await page.close(); // Close page but keep browser running
  }
}

// LOA Form submission endpoint (Join Us page) - OPTIMIZED
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

    // Generate PDF (uses persistent browser - fast)
    const pdfBuffer = await generateLOAPDF(data);
    const fileName = `NZE-LOA-${data.authPerson.replace(/\s+/g, '_')}-${Date.now()}.pdf`;

    // Pre-build shared attachment array (reused for both emails)
    const pdfAttachment = {
      filename: fileName,
      content: pdfBuffer,
      contentType: 'application/pdf'
    };
    const attachments = [pdfAttachment, EMAIL_LOGO_ATTACHMENT];

    // Admin email content
    const adminEmailHtml = `
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

    // Customer confirmation email content
    const customerEmailHtml = `
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
    `;

    const fromEmail = `"NZ Essentials" <${process.env.EMAIL_USER || 'naveen@nzessentials.co.nz'}>`;

    // SEND BOTH EMAILS IN PARALLEL (much faster than sequential)
    await Promise.all([
      transporter.sendMail({
        from: fromEmail,
        to: data.email,
        subject: 'NZ Essentials - Your Letter of Authority',
        html: customerEmailHtml,
        attachments
      }),
      transporter.sendMail({
        from: fromEmail,
        to: process.env.ADMIN_EMAIL || 'yadav.vipin95@outlook.com',
        subject: `New LOA Submission - ${data.authPerson} (${data.registeredName})`,
        html: adminEmailHtml,
        attachments
      })
    ]);

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
