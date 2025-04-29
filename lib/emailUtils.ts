import nodemailer from 'nodemailer';

interface ContactData {
  name: string | FormDataEntryValue | null;
  email: string | FormDataEntryValue | null;
  phone: string | FormDataEntryValue | null;
  subject: string | FormDataEntryValue | null;
  message: string | FormDataEntryValue | null;
}

export async function sendAdminNotification(contactData: ContactData) {
  try {
    const response = await fetch('/api/admin-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        subject: contactData.subject,
        message: contactData.message
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to send admin notification');
    }
    
    return result;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    throw error;
  }
} 