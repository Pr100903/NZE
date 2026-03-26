# Form Integration Guide

## Setup Instructions

### 1. **React App Setup** (Already Done)
The ContactForm component in your React app is now integrated with the backend form server.

**Files Modified:**
- `src/components/ContactForm.jsx` - Updated to call the backend API
- `src/services/formApi.js` - Created API service for form submissions
- `.env` - Added API URL configuration

### 2. **Backend Server Setup**

You have two options:

#### Option A: Run the separate Node.js backend server
The backend folder contains a complete Node.js backend server that handles:
- Form submissions
- PDF generation
- Email sending

**Steps:**
1. Navigate to the backend folder:
   ```bash
   cd c:\Users\Prachi\OneDrive\Desktop\NZE\backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the form folder with your email credentials:
   ```
   PORT=3000
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   RECIPIENT_EMAIL=recipient@example.com
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000`

#### Option B: Integrate backend with React app (Recommended)
The backend folder is already set up as a separate server. To run both together:

1. Backend server files are in `backend/` folder
2. Update `package.json` in root to handle both React and backend if needed
3. Use a tool like `concurrently` to run both servers

### 3. **Environment Configuration**

The `.env` file in your React app root should have:
```
REACT_APP_API_URL=http://localhost:3000/api
```

If you deploy to production, update this URL to your production backend.

### 4. **Testing the Integration**

1. **Start the backend server** (from backend folder):
   ```bash
   npm start
   ```

2. **Start the React app** (from main project folder):
   ```bash
   npm start
   ```

3. **Fill out the form** and click "Submit Data"
   - The form will send data to the Node.js server
   - A PDF will be generated
   - An email will be sent to the configured recipient

### 5. **API Endpoints**

The form server provides these endpoints:

- **POST `/api/submit-form`**
  - Accepts form data and signature
  - Generates PDF
  - Sends email notification
  - Returns: `{ success: true, message: "..." }`

- **POST `/api/generate-pdf`**
  - Generates PDF from form data
  - Returns: PDF file blob

### 6. **Troubleshooting**

**"Failed to submit form" error:**
- Make sure the Node.js server is running on port 3000
- Check that CORS is enabled (it is by default)
- Verify the API URL in `.env` matches your server

**Email not sending:**
- Verify email credentials in `.env`
- For Gmail, use an "App Password", not your regular password
- Enable "Less secure app access" if using Gmail

**PDF not generating:**
- Make sure pdfkit is installed: `npm install pdfkit`
- Check Node.js backend logs for errors

### 7. **Customization**

**Form Field Mapping:**
If you add new fields to the form in React, update:
1. `ContactForm.jsx` - Add to formData state
2. `formApi.js` - Add to submissionData object
3. `/backend/server.js` - Add to PDF generation and email template

**Email Template:**
Edit `/backend/server.js` to customize the email content in the sendMail section

**PDF Format:**
Edit `/backend/server.js` to customize the PDF layout in the generatePDF function

## File Structure
```
NZE/
├── src/
│   ├── components/ContactForm.jsx (Updated)
│   ├── services/
│   │   └── formApi.js (New)
│   └── pages/ContactPage.jsx
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   └── .gitignore
├── .env (Created)
└── package.json
```

## Next Steps

1. Start the backend server: `npm start` (in backend/ folder)
2. Start the React app: `npm start` (in main project folder)
3. Test the form submission
4. Configure email and other settings as needed
