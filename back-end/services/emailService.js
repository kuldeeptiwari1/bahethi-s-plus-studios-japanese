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
        reject("Failed to create access token");
      }
      resolve(token);
    });
  });

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

  return transporter;
};

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
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};






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
//       subject: `Order Confirmation #${orderDetails.orderNumber} - Please Save This Email`,
//       html: `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Order Confirmation</title>
//         </head>
//         <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
//           <div style="max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
            
//             <!-- Header -->
//             <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; position: relative;">
//               <div style="background: rgba(255,255,255,0.1); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
//                 <div style="width: 40px; height: 40px; background: #ffffff; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
//                   📦
//                 </div>
//               </div>
//               <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
//                 Order Confirmed!
//               </h1>
//               <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 18px; font-weight: 300;">
//                 Thank you for your order, ${orderDetails.fullName}
//               </p>
//             </div>

//             <!-- Important Notice -->
//             <div style="background: linear-gradient(135deg, #ff6b6b, #ffa500); margin: 30px; border-radius: 15px; padding: 25px; text-align: center; color: #ffffff; position: relative; overflow: hidden;">
//               <div style="position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
//               <div style="position: absolute; bottom: -30px; left: -30px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
//               <div style="position: relative; z-index: 2;">
//                 <h2 style="margin: 0 0 15px; font-size: 24px; font-weight: 700;">
//                   ⚠️ IMPORTANT - SAVE THIS EMAIL
//                 </h2>
//                 <p style="margin: 0; font-size: 16px; font-weight: 500; line-height: 1.5;">
//                   Please show this <strong>Order ID</strong> when you come to pickup your order. Save this email or screenshot the Order ID below.
//                 </p>
//               </div>
//             </div>

//             <!-- Order ID Section -->
//             <div style="margin: 30px; text-align: center;">
//               <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 20px; padding: 30px; position: relative; overflow: hidden;">
//                 <div style="position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
//                 <div style="position: absolute; bottom: -15px; left: -15px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
//                 <div style="position: relative; z-index: 2;">
//                   <h3 style="color: #ffffff; margin: 0 0 15px; font-size: 18px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
//                     Your Order ID
//                   </h3>
//                   <div style="background: rgba(255,255,255,0.2); border: 2px dashed rgba(255,255,255,0.5); border-radius: 15px; padding: 20px; margin: 0 auto; max-width: 300px; backdrop-filter: blur(10px);">
//                     <h2 style="color: #ffffff; margin: 0; font-size: 36px; font-weight: 900; letter-spacing: 2px; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
//                       #${orderDetails.orderNumber}
//                     </h2>
//                   </div>
//                   <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0; font-size: 14px; font-weight: 500;">
//                     Present this ID during pickup
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <!-- Order Details -->
//             <div style="margin: 30px; background: #f8f9ff; border-radius: 20px; padding: 30px; border: 1px solid #e1e5f8;">
//               <h3 style="color: #2d3748; margin: 0 0 25px; font-size: 22px; font-weight: 700; display: flex; align-items: center;">
//                 📋 Order Details
//               </h3>
              
//               <!-- Personal Info -->
//               <div style="background: #ffffff; border-radius: 15px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #667eea;">
//                 <h4 style="color: #4a5568; margin: 0 0 15px; font-size: 16px; font-weight: 600; display: flex; align-items: center;">
//                   👤 Customer Information
//                 </h4>
//                 <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
//                   <p style="margin: 5px 0; color: #2d3748; font-size: 14px;">
//                     <strong style="color: #667eea;">Name:</strong> ${orderDetails.fullName}
//                   </p>
//                   <p style="margin: 5px 0; color: #2d3748; font-size: 14px;">
//                     <strong style="color: #667eea;">Email:</strong> ${orderDetails.email}
//                   </p>
//                   <p style="margin: 5px 0; color: #2d3748; font-size: 14px;">
//                     <strong style="color: #667eea;">Phone:</strong> ${orderDetails.phone}
//                   </p>
//                 </div>
//               </div>

//               <!-- Shipping Address -->
//               <div style="background: #ffffff; border-radius: 15px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #48bb78;">
//                 <h4 style="color: #4a5568; margin: 0 0 15px; font-size: 16px; font-weight: 600; display: flex; align-items: center;">
//                   📍 Shipping Address
//                 </h4>
//                 <div style="color: #2d3748; line-height: 1.6;">
//                   <p style="margin: 5px 0; font-size: 14px;">${orderDetails.address}</p>
//                   <p style="margin: 5px 0; font-size: 14px;">${orderDetails.city}${orderDetails.postalCode ? `, ${orderDetails.postalCode}` : ''}</p>
//                   ${orderDetails.country ? `<p style="margin: 5px 0; font-size: 14px;">${orderDetails.country}</p>` : ''}
//                 </div>
//               </div>

//               ${orderDetails.notes ? `
//               <!-- Additional Notes -->
//               <div style="background: #ffffff; border-radius: 15px; padding: 20px; border-left: 4px solid #ed8936;">
//                 <h4 style="color: #4a5568; margin: 0 0 15px; font-size: 16px; font-weight: 600; display: flex; align-items: center;">
//                   💬 Additional Notes
//                 </h4>
//                 <p style="margin: 0; color: #2d3748; font-size: 14px; font-style: italic; background: #fffaf0; padding: 15px; border-radius: 10px;">
//                   "${orderDetails.notes}"
//                 </p>
//               </div>
//               ` : ''}
//             </div>

//             <!-- Pickup Instructions -->
//             <div style="margin: 30px; background: linear-gradient(135deg, #a8e6cf, #88d8c0); border-radius: 20px; padding: 30px; position: relative; overflow: hidden;">
//               <div style="position: absolute; top: -30px; right: -30px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
//               <h3 style="color: #2d3748; margin: 0 0 20px; font-size: 22px; font-weight: 700; display: flex; align-items: center;">
//                 🏪 Pickup Instructions
//               </h3>
//               <div style="background: rgba(255,255,255,0.7); border-radius: 15px; padding: 20px; backdrop-filter: blur(10px);">
//                 <ul style="margin: 0; padding: 0; list-style: none; color: #2d3748;">
//                   <li style="margin: 10px 0; padding: 10px 0; border-bottom: 1px solid rgba(45,55,72,0.1); font-size: 15px; display: flex; align-items: flex-start;">
//                     <span style="background: #667eea; color: #ffffff; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; margin-right: 15px; flex-shrink: 0;">1</span>
//                     <span><strong>Bring this email</strong> or screenshot the Order ID above</span>
//                   </li>
//                   <li style="margin: 10px 0; padding: 10px 0; border-bottom: 1px solid rgba(45,55,72,0.1); font-size: 15px; display: flex; align-items: flex-start;">
//                     <span style="background: #667eea; color: #ffffff; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; margin-right: 15px; flex-shrink: 0;">2</span>
//                     <span><strong>Show your Order ID</strong> (#${orderDetails.orderNumber}) to our staff</span>
//                   </li>
//                   <li style="margin: 10px 0; padding: 10px 0; border-bottom: 1px solid rgba(45,55,72,0.1); font-size: 15px; display: flex; align-items: flex-start;">
//                     <span style="background: #667eea; color: #ffffff; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; margin-right: 15px; flex-shrink: 0;">3</span>
//                     <span><strong>Provide identification</strong> that matches your order name</span>
//                   </li>
//                   <li style="margin: 10px 0; padding: 10px 0; font-size: 15px; display: flex; align-items: flex-start;">
//                     <span style="background: #667eea; color: #ffffff; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; margin-right: 15px; flex-shrink: 0;">4</span>
//                     <span><strong>Collect your order</strong> and enjoy!</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             <!-- Footer -->
//             <div style="background: #2d3748; padding: 30px; text-align: center; color: #ffffff;">
//               <h4 style="margin: 0 0 15px; font-size: 18px; font-weight: 600;">Thank You for Your Order! 🎉</h4>
//               <p style="margin: 0 0 20px; color: #a0aec0; font-size: 14px; line-height: 1.6;">
//                 We will keep you updated on your order status. If you have any questions, please don't hesitate to contact us.
//               </p>
//               <div style="background: rgba(255,255,255,0.1); border-radius: 10px; padding: 15px; display: inline-block;">
//                 <p style="margin: 0; font-size: 12px; color: #e2e8f0;">
//                   Order placed on: ${new Date().toLocaleDateString('en-US', {
//                     weekday: 'long',
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric'
//                   })}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </body>
//         </html>
//       `
//     };

//     const result = await transporter.sendMail(mailOptions);
//     return result;
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// };