import nodemailer, { Transporter } from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

// Define types for auth configuration
type AuthConfig = {
  user: string | undefined;
} & (
  | {
      type: 'OAuth2';
      clientId: string | undefined;
      clientSecret: string | undefined;
      refreshToken: string | undefined;
      accessToken: string | undefined;
      expires: number;
    }
  | {
      type?: 'basic';
      pass: string | undefined;
    }
);

// Load environment variables from .env file in the root directory
const envPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

// Debug log to check if environment variables are loaded
console.log('Email Config:', {
  user: process.env.EMAIL_USER ? 'Set' : 'Not set',
  pass: process.env.EMAIL_PASSWORD ? 'Set' : 'Not set',
  from: process.env.EMAIL_FROM || 'Using default',
  envPath
});

// Verify required environment variables
const requiredVars = ['EMAIL_USER', 'EMAIL_PASSWORD'];
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars.join(', '));
  console.error('Please check your .env file');
}

// Create email configuration
const emailConfig: any = {
  service: 'gmail'
};

// Use OAuth2 if configured, otherwise fall back to basic auth
if (process.env.OAUTH_CLIENT_ID) {
  emailConfig.auth = {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: process.env.OAUTH_ACCESS_TOKEN,
    expires: 1484314697598,
  };
  console.log('Using OAuth2 authentication');
} else if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  emailConfig.auth = {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  };
  console.log('Using basic authentication');
} else {
  console.warn('No valid email authentication method configured. Emails will not be sent.');
}

let transporter: Transporter;

// Create a test account if in development
if (process.env.NODE_ENV === 'development') {
  const testAccount = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
} else {
  transporter = nodemailer.createTransport(emailConfig);
}

// Verify connection configuration if transporter was created
if (transporter) {
  transporter.verify(function(error, success) {
    if (error) {
      console.error('Error with email configuration:', error);
      console.error('Current config:', {
        service: emailConfig.service,
        auth: emailConfig.auth ? {
          user: emailConfig.auth.user ? '***' : 'Not set',
          type: emailConfig.auth.type || 'basic',
          hasPassword: !!emailConfig.auth.pass,
          hasOAuth: !!(emailConfig.auth.clientId && emailConfig.auth.refreshToken)
        } : 'No auth configured'
      });
    } else {
      console.log('Email server is ready to send messages');
    }
  });
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  preferred_date?: string | null;
  message: string;
}

export async function sendContactFormEmail(formData: ContactFormData) {
  try {
    if (!transporter) {
      console.error('Email transporter not initialized. Check your email configuration.');
      return false;
    }

    if (!process.env.EMAIL_USER) {
      console.error('EMAIL_USER is not configured');
      return false;
    }
    
    if (!process.env.EMAIL_PASSWORD && !process.env.OAUTH_CLIENT_ID) {
      console.error('No authentication method configured. Please set either EMAIL_PASSWORD or OAuth credentials.');
      return false;
    }

    const adminEmail = 'chavananand959@gmail.com';
    const fromEmail = process.env.EMAIL_FROM || `UVCA Contact Form <${process.env.EMAIL_USER}>`;
    
    const mailOptions = {
      from: fromEmail,
      to: adminEmail,
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${formData.service || 'Not specified'}</p>
        ${formData.preferred_date ? `<p><strong>Preferred Date:</strong> ${formData.preferred_date}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
        <hr>
        <p>This is an automated message from the UVCA Contact Form.</p>
      `,
    };

    const info: SentMessageInfo = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
