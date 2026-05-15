import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = "onboarding@resend.dev";
const BRAND_COLOR = "#003d29";

// ─── OTP Email ────────────────────────────────────────────────────────────────

export const sendOtpEmail = async (email: string, otp: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: "Your OTP for Garden Shop Registration",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: ${BRAND_COLOR};">Welcome to Garden Shop!</h2>
          <p>Your One-Time Password (OTP) for account registration is:</p>
          <div style="background-color: #f4f4f5; padding: 16px; text-align: center; border-radius: 8px; margin: 24px 0;">
            <h1 style="color: ${BRAND_COLOR}; font-size: 32px; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP will expire in 20 minutes.</p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 32px;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

// ─── Password Reset Email ─────────────────────────────────────────────────────

export const sendPasswordResetEmail = async (
  email: string,
  resetUrl: string
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: ${BRAND_COLOR};">Password Reset Request</h2>
          <p>Hello,</p>
          <p>You have requested to reset your password. Click the button below to reset it.</p>
          <p><strong>This link will expire in 10 minutes.</strong></p>
          <div style="margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: ${BRAND_COLOR}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>Or copy and paste this link in your browser:</p>
          <p style="word-break: break-all; color: #666;">${resetUrl}</p>
          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            If you did not request a password reset, please ignore this email.
          </p>
        </div>
      `,
    });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

// ─── Order Confirmation Email ─────────────────────────────────────────────────

export interface OrderConfirmationItem {
  name: string;
  quantity: number;
  price: number;
}

export interface OrderConfirmationData {
  orderId: string;
  orderDetailsUrl: string;
  customerName: string;
  items: OrderConfirmationItem[];
  subtotal: number;
  deliveryFee: number;
  promoDiscount: number;
  taxes: number;
  totalPrice: number;
  paymentMethod: string;
  deliveryAddress: {
    full_name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export const sendOrderConfirmationEmail = async (
  email: string,
  data: OrderConfirmationData
) => {
  const {
    orderId,
    orderDetailsUrl,
    customerName,
    items,
    subtotal,
    deliveryFee,
    promoDiscount,
    taxes,
    totalPrice,
    paymentMethod,
    deliveryAddress,
  } = data;

  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${item.name}</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`
    )
    .join("");

  const addressLine = [
    deliveryAddress.street,
    deliveryAddress.city,
    deliveryAddress.state,
    deliveryAddress.zip,
    deliveryAddress.country,
  ]
    .filter(Boolean)
    .join(", ");

  try {
    const { data: resendData, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: `Order Confirmed – ${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background-color: ${BRAND_COLOR}; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Order Confirmed! 🎉</h1>
          </div>

          <div style="background-color: #f9f9f9; padding: 24px; border: 1px solid #eee; border-top: none;">
            <p style="margin: 0 0 8px;">Hi <strong>${customerName}</strong>,</p>
            <p style="margin: 0 0 24px; color: #555;">
              Thank you for your order. We've received it and will process it shortly.
            </p>

            <!-- Order ID -->
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
              <p style="margin: 0; font-size: 13px; color: #6b7280;">Order ID</p>
              <p style="margin: 4px 0 0; font-size: 18px; font-weight: bold; color: ${BRAND_COLOR};">${orderId}</p>
            </div>

            <!-- Items Table -->
            <h3 style="margin: 0 0 12px; font-size: 16px;">Order Summary</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <thead>
                <tr style="background-color: #f3f4f6;">
                  <th style="padding: 10px; text-align: left; font-size: 13px;">Item</th>
                  <th style="padding: 10px; text-align: center; font-size: 13px;">Qty</th>
                  <th style="padding: 10px; text-align: right; font-size: 13px;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <!-- Price Breakdown -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 6px 0; color: #555;">Subtotal</td>
                <td style="padding: 6px 0; text-align: right;">$${subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #555;">Delivery Fee</td>
                <td style="padding: 6px 0; text-align: right;">$${deliveryFee.toFixed(2)}</td>
              </tr>
              ${promoDiscount > 0
          ? `<tr>
                  <td style="padding: 6px 0; color: #16a34a;">Promo Discount</td>
                  <td style="padding: 6px 0; text-align: right; color: #16a34a;">-$${promoDiscount.toFixed(2)}</td>
                </tr>`
          : ""
        }
              <tr>
                <td style="padding: 6px 0; color: #555;">Taxes</td>
                <td style="padding: 6px 0; text-align: right;">$${taxes.toFixed(2)}</td>
              </tr>
              <tr style="border-top: 2px solid #e5e7eb;">
                <td style="padding: 12px 0 0; font-weight: bold; font-size: 16px;">Total</td>
                <td style="padding: 12px 0 0; text-align: right; font-weight: bold; font-size: 16px; color: ${BRAND_COLOR};">$${totalPrice.toFixed(2)}</td>
              </tr>
            </table>

            <!-- Delivery & Payment -->
            <div style="display: flex; gap: 16px; margin-bottom: 24px;">
              <div style="flex: 1; background: white; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px;">
                <p style="margin: 0 0 4px; font-size: 13px; color: #6b7280;">Delivery Address</p>
                <p style="margin: 0; font-size: 14px;">${deliveryAddress.full_name}</p>
                <p style="margin: 4px 0 0; font-size: 13px; color: #555;">${addressLine}</p>
              </div>
              <div style="flex: 1; background: white; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px;">
                <p style="margin: 0 0 4px; font-size: 13px; color: #6b7280;">Payment Method</p>
                <p style="margin: 0; font-size: 14px; font-weight: bold;">${paymentMethod === "COD" ? "Cash on Delivery" : "Stripe"}</p>
              </div>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 24px 0 8px;">
              <a href="${orderDetailsUrl}"
                style="background-color: ${BRAND_COLOR}; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; display: inline-block; font-size: 15px; font-weight: bold; letter-spacing: 0.5px;">
                View Order Details
              </a>
            </div>

            <p style="color: #6b7280; font-size: 13px; text-align: center; margin: 8px 0 0;">
              If you have any questions, please contact our support team.
            </p>
          </div>

          <div style="background-color: ${BRAND_COLOR}; padding: 16px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="color: rgba(255,255,255,0.7); font-size: 12px; margin: 0;">© Garden Shop. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    if (error) return { success: false, error };
    return { success: true, data: resendData };
  } catch (error) {
    return { success: false, error };
  }
};

// ─── Contact Us Email ─────────────────────────────────────────────────────────

export interface ContactUsData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (data: ContactUsData) => {
  try {
    const { data: resendData, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: data.email,
      subject: `Contact Form Inquiry: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: ${BRAND_COLOR};">New Contact Form Submission</h2>
          <p><strong>From:</strong> ${data.firstName} ${data.lastName} (${data.email})</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <div style="background-color: #f9f9f9; padding: 16px; border-radius: 8px; margin-top: 16px;">
            <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
          </div>
        </div>
      `,
    });

    if (error) return { success: false, error };
    return { success: true, data: resendData };
  } catch (error) {
    return { success: false, error };
  }
};
