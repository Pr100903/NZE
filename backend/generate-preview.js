const fs = require('fs');
const path = require('path');

// Read SVG logo and convert to base64
const logoPath = path.join(process.cwd(), 'logonz.svg');
const logoBase64 = fs.readFileSync(logoPath).toString('base64');
const logoHtml = `<img src="data:image/svg+xml;base64,${logoBase64}" alt="NZ Essentials" width="150" height="150" style="width: 150px; height: 150px; max-width: 100%; display: block; margin: 0 auto; border: 0; outline: none; text-decoration: none; object-fit: contain;" />`;

const previewHtml = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Email Preview</title></head>
<body style="margin: 0; padding: 20px; background: #333;">
  <h2 style="color: #fff; text-align: center;">Customer Email Preview</h2>
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 30px;">
    <div style="text-align: center; margin-bottom: 30px;">${logoHtml}</div>
    <h2 style="color: #ffe413;">Thank You for Joining NZ Essentials!</h2>
    <p>Dear John Smith,</p>
    <p>Thank you for submitting your Letter of Authority.</p>
    <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; border: 1px solid #ffe413; margin: 20px 0;">
      <h3 style="color: #ffe413; margin-top: 0;">What Happens Next?</h3>
      <ul style="color: #ccc;"><li>Our team will review your submission</li><li>We will analyze your energy requirements</li><li>You will receive customized proposals</li></ul>
    </div>
    <p style="margin-top: 20px;">Best regards,<br><strong style="color: #ffe413;">NZ Essentials Team</strong></p>
  </div>
  <h2 style="color: #fff; text-align: center; margin-top: 40px;">Admin Email Preview</h2>
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 30px;">
    <div style="text-align: center; margin-bottom: 30px;">${logoHtml}</div>
    <h2 style="color: #ffe413; margin-bottom: 20px;">LOA Submission</h2>
    <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; border: 1px solid #333;">
      <p><strong style="color: #ffe413;">Name:</strong> John Smith</p>
      <p><strong style="color: #ffe413;">Company:</strong> Acme Corp Ltd</p>
      <p><strong style="color: #ffe413;">Email:</strong> john@acme.co.nz</p>
    </div>
  </div>
</body>
</html>`;

fs.mkdirSync(path.join(process.cwd(), 'preview'), { recursive: true });
fs.writeFileSync(path.join(process.cwd(), 'preview', 'email-preview.html'), previewHtml);
console.log('Preview generated at: backend/preview/email-preview.html');
