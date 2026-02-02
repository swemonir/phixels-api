import nodemailer from 'nodemailer';
import config from '../../config';

// Email configuration interface
export interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    path?: string;
    content?: string | Buffer;
  }>;
}

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: config.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(config.SMTP_PORT || '587'),
    secure: config.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: config.NODE_MILER_USER,
      pass: config.NODE_MILER_PASS,
    },
  });
};

// Main email sending function
export const SendMail = async (options: EmailOptions): Promise<boolean> => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: options.from || config.NODE_MILER_USER,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      cc: options.cc ? (Array.isArray(options.cc) ? options.cc.join(', ') : options.cc) : undefined,
      bcc: options.bcc ? (Array.isArray(options.bcc) ? options.bcc.join(', ') : options.bcc) : undefined,
      attachments: options.attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Generate formal HTML email template
export const getFormalEmailHtml = (subject: string, text: string, details?: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 40px auto;
                background: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
            }
            .content {
                padding: 40px 30px;
            }
            .content h2 {
                color: #667eea;
                margin-top: 0;
                font-size: 20px;
            }
            .content p {
                margin: 15px 0;
                color: #555;
            }
            .details-section {
                background: #f9f9f9;
                padding: 20px;
                border-left: 4px solid #667eea;
                margin: 20px 0;
                border-radius: 4px;
            }
            .details-section h3 {
                margin-top: 0;
                color: #667eea;
                font-size: 16px;
            }
            .footer {
                background: #f9f9f9;
                padding: 20px;
                text-align: center;
                color: #666;
                font-size: 12px;
                border-top: 1px solid #e0e0e0;
            }
            .footer p {
                margin: 5px 0;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Phixels.io</h1>
            </div>
            <div class="content">
                <h2>${subject}</h2>
                <p>${text}</p>
                ${details ? `
                    <div class="details-section">
                        <h3>Additional Details</h3>
                        <p>${details}</p>
                    </div>
                ` : ''}
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Phixels.io. All rights reserved.</p>
                <p>This is an automated email. Please do not reply to this message.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Generate formal plain text email template
export const getFormalEmailText = (subject: string, text: string, details?: string): string => {
  return `
${subject}

${text}

${details ? `Additional Details:\n${details}` : ''}

---
© ${new Date().getFullYear()} Phixels.io. All rights reserved.
This is an automated email. Please do not reply to this message.
  `;
};
