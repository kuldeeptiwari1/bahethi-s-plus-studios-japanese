import { google } from "googleapis";

// Gmail OAuth2 configuration
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const REDIRECT_URI = process.env.REDIRECT_URI;
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
export const USER_EMAIL = process.env.USER_EMAIL || 'your-email@gmail.com';

// Create OAuth2 client
export const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
