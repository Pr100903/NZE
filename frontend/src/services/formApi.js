// API service for form submissions
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const submitForm = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/submit-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const result = await response.json();
    return {
      success: true,
      data: result,
      message: result.message || 'Form submitted successfully!',
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      error: error.message,
      message: error.message || 'Failed to submit form. Please try again.',
    };
  }
};

export const generatePDF = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/generate-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`PDF generation failed: ${response.statusText}`);
    }

    const blob = await response.blob();
    return {
      success: true,
      data: blob,
    };
  } catch (error) {
    console.error('PDF generation error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};
