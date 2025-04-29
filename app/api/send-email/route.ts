import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@/supabase/config';

export async function POST(request: Request) {
  try {
    const { to, subject, message, messageId } = await request.json();
    
    // Validate input
    if (!to || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: message,
    });
    
    // Update message status in database if messageId is provided
    if (messageId) {
      const supabase = createClient();
      await supabase
        .from('contact_submissions')
        .update({ 
          replied: true, 
          replied_at: new Date().toISOString() 
        })
        .eq('id', messageId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 