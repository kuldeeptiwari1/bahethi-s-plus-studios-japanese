// import nodemailer from 'nodemailer';
// import { google } from 'googleapis';

// const OAuth2 = google.auth.OAuth2;

// const createTransporter = async () => {
//   const oauth2Client = new OAuth2(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     process.env.REDIRECT_URI
//   );

//   oauth2Client.setCredentials({
//     refresh_token: process.env.REFRESH_TOKEN
//   });

//   const accessToken = await new Promise((resolve, reject) => {
//     oauth2Client.getAccessToken((err, token) => {
//       if (err) {
//         reject("Failed to create access token");
//       }
//       resolve(token);
//     });
//   });

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: process.env.USER_EMAIL,
//       accessToken,
//       clientId: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       refreshToken: process.env.REFRESH_TOKEN
//     }
//   });

//   return transporter;
// };

// export const sendOrderConfirmationEmail = async (orderDetails) => {
//   try {
//     const transporter = await createTransporter();

//     const mailOptions = {
//       from: process.env.USER_EMAIL,
//       to: orderDetails.email,
//       subject: `Order Confirmation #${orderDetails.orderNumber}`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h1 style="color: #333; text-align: center;">Order Confirmation</h1>
//           <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
//             <h2 style="color: #0066cc;">Order #${orderDetails.orderNumber}</h2>
//             <p>Dear ${orderDetails.fullName},</p>
//             <p>Thank you for your order. We have received your order details and will process it soon.</p>
            
//             <h3>Order Details:</h3>
//             <ul style="list-style: none; padding: 0;">
//               <li><strong>Name:</strong> ${orderDetails.fullName}</li>
//               <li><strong>Email:</strong> ${orderDetails.email}</li>
//               <li><strong>Phone:</strong> ${orderDetails.phone}</li>
//               <li><strong>Shipping Address:</strong></li>
//               <li>${orderDetails.address}</li>
//               <li>${orderDetails.city}, ${orderDetails.postalCode}</li>
//               <li>${orderDetails.country}</li>
//             </ul>
            
//             ${orderDetails.notes ? `<p><strong>Additional Notes:</strong><br>${orderDetails.notes}</p>` : ''}
            
//             <p style="margin-top: 20px;">We will keep you updated on your order status.</p>
//           </div>
//           <p style="text-align: center; color: #666; margin-top: 20px;">
//             If you have any questions, please don't hesitate to contact us.
//           </p>
//         </div>
//       `
//     };

//     const result = await transporter.sendMail(mailOptions);
//     return result;
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// };





import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        console.error("Failed to create access token:", err);
        reject("Failed to create access token");
      }
      resolve(token);
    });
  });

  // FIXED: Changed createTransporter to createTransport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.USER_EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    }
  });

  // Verify the transporter configuration
  await transporter.verify();

  return transporter;
};

// Export both function names for compatibility
export const sendOrderConfirmationEmail = async (orderDetails) => {
  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: orderDetails.email,
      subject: `Order Confirmation #${orderDetails.orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">Order Confirmation</h1>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
            <h2 style="color: #0066cc;">Order #${orderDetails.orderNumber}</h2>
            <p>Dear ${orderDetails.fullName},</p>
            <p>Thank you for your order. We have received your order details and will process it soon.</p>
            
            <h3>Order Details:</h3>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Name:</strong> ${orderDetails.fullName}</li>
              <li><strong>Email:</strong> ${orderDetails.email}</li>
              <li><strong>Phone:</strong> ${orderDetails.phone}</li>
              <li><strong>Shipping Address:</strong></li>
              <li>${orderDetails.address}</li>
              <li>${orderDetails.city}, ${orderDetails.postalCode}</li>
              <li>${orderDetails.country}</li>
            </ul>
            
            ${orderDetails.notes ? `<p><strong>Additional Notes:</strong><br>${orderDetails.notes}</p>` : ''}
            
            <p style="margin-top: 20px;">We will keep you updated on your order status.</p>
          </div>
          <p style="text-align: center; color: #666; margin-top: 20px;">
            If you have any questions, please don't hesitate to contact us.
          </p>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${orderDetails.email}`);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Export the function with the name expected by orderController
export const sendEmailToUser = async (userEmail, orderNumber, userName) => {
  const orderDetails = {
    email: userEmail,
    orderNumber: orderNumber,
    fullName: userName,
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    notes: ''
  };
  
  return await sendOrderConfirmationEmail(orderDetails);
};
