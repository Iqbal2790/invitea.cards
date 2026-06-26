import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn('Warning: RESEND_API_KEY is not defined in .env.local');
}

export const resend = new Resend(resendApiKey || 'dummy_key');
