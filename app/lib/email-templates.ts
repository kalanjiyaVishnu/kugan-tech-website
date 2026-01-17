// Email templates for different types of inquiries

export type EmailType = "contact" | "service_request" | "inquiry";

interface EmailData {
    name: string;
    email: string;
    phone?: string;
    service?: string;
    message: string;
}

interface EmailTemplate {
    subject: string;
    html: string;
    text: string;
}

export function getEmailTemplate(
    type: EmailType,
    data: EmailData
): EmailTemplate {
    switch (type) {
        case "contact":
            return getContactTemplate(data);
        case "service_request":
            return getServiceRequestTemplate(data);
        case "inquiry":
        default:
            return getInquiryTemplate(data);
    }
}

function getContactTemplate(data: EmailData): EmailTemplate {
    const subject = `New Contact Message from ${data.name} - KuganTech Website`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Message</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="background: linear-gradient(135deg, #0056b3 0%, #003d82 100%); padding: 40px 30px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
          📧 New Contact Message
        </h1>
        <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
          Someone wants to get in touch with KuganTech
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 30px;">
        <div style="background-color: #f8f9fa; border-radius: 10px; padding: 25px; margin-bottom: 25px;">
          <h2 style="margin: 0 0 20px 0; color: #0056b3; font-size: 18px; border-bottom: 2px solid #ff6b00; padding-bottom: 10px;">
            Contact Details
          </h2>
          <table width="100%" cellpadding="8" cellspacing="0">
            <tr>
              <td style="color: #666; width: 100px; vertical-align: top;"><strong>Name:</strong></td>
              <td style="color: #333;">${data.name}</td>
            </tr>
            <tr>
              <td style="color: #666; vertical-align: top;"><strong>Email:</strong></td>
              <td style="color: #333;"><a href="mailto:${data.email}" style="color: #0056b3;">${data.email}</a></td>
            </tr>
            ${data.phone
            ? `
            <tr>
              <td style="color: #666; vertical-align: top;"><strong>Phone:</strong></td>
              <td style="color: #333;"><a href="tel:${data.phone}" style="color: #0056b3;">${data.phone}</a></td>
            </tr>
            `
            : ""
        }
          </table>
        </div>
        <div style="background-color: #fff3e6; border-left: 4px solid #ff6b00; border-radius: 0 10px 10px 0; padding: 25px;">
          <h2 style="margin: 0 0 15px 0; color: #ff6b00; font-size: 18px;">
            💬 Message
          </h2>
          <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background-color: #1a1a1a; padding: 25px 30px; text-align: center;">
        <p style="margin: 0; color: #888; font-size: 12px;">
          This email was sent from the KuganTech website contact form.<br>
          © ${new Date().getFullYear()} Kugan Tech Works. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

    const text = `
New Contact Message from ${data.name}
======================================

Contact Details:
- Name: ${data.name}
- Email: ${data.email}
${data.phone ? `- Phone: ${data.phone}` : ""}

Message:
${data.message}

--
This email was sent from the KuganTech website contact form.
  `.trim();

    return { subject, html, text };
}

function getServiceRequestTemplate(data: EmailData): EmailTemplate {
    const subject = `Service Request: ${data.service} - ${data.name}`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Service Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="background: linear-gradient(135deg, #ff6b00 0%, #cc5500 100%); padding: 40px 30px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
          🛠️ Service Request
        </h1>
        <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
          A client is interested in your services
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 30px;">
        <div style="background-color: #fff3e6; border-radius: 10px; padding: 20px; margin-bottom: 25px; text-align: center;">
          <p style="margin: 0 0 5px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Service Requested</p>
          <h2 style="margin: 0; color: #ff6b00; font-size: 24px;">${data.service}</h2>
        </div>
        <div style="background-color: #f8f9fa; border-radius: 10px; padding: 25px; margin-bottom: 25px;">
          <h2 style="margin: 0 0 20px 0; color: #0056b3; font-size: 18px; border-bottom: 2px solid #0056b3; padding-bottom: 10px;">
            Client Information
          </h2>
          <table width="100%" cellpadding="8" cellspacing="0">
            <tr>
              <td style="color: #666; width: 100px; vertical-align: top;"><strong>Name:</strong></td>
              <td style="color: #333;">${data.name}</td>
            </tr>
            <tr>
              <td style="color: #666; vertical-align: top;"><strong>Email:</strong></td>
              <td style="color: #333;"><a href="mailto:${data.email}" style="color: #0056b3;">${data.email}</a></td>
            </tr>
            ${data.phone
            ? `
            <tr>
              <td style="color: #666; vertical-align: top;"><strong>Phone:</strong></td>
              <td style="color: #333;"><a href="tel:${data.phone}" style="color: #0056b3;">${data.phone}</a></td>
            </tr>
            `
            : ""
        }
          </table>
        </div>
        <div style="background-color: #e6f3ff; border-left: 4px solid #0056b3; border-radius: 0 10px 10px 0; padding: 25px;">
          <h2 style="margin: 0 0 15px 0; color: #0056b3; font-size: 18px;">
            📝 Project Details
          </h2>
          <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>
        <div style="margin-top: 30px; padding: 20px; background-color: #f0fff4; border-radius: 10px; text-align: center;">
          <p style="margin: 0; color: #2d7a4e; font-size: 14px;">
            <strong>💡 Tip:</strong> Respond within 24 hours for the best client experience!
          </p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background-color: #1a1a1a; padding: 25px 30px; text-align: center;">
        <p style="margin: 0; color: #888; font-size: 12px;">
          This service request was submitted via the KuganTech website.<br>
          © ${new Date().getFullYear()} Kugan Tech Works. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

    const text = `
Service Request: ${data.service}
======================================

Service Requested: ${data.service}

Client Information:
- Name: ${data.name}
- Email: ${data.email}
${data.phone ? `- Phone: ${data.phone}` : ""}

Project Details:
${data.message}

--
This service request was submitted via the KuganTech website.
  `.trim();

    return { subject, html, text };
}

function getInquiryTemplate(data: EmailData): EmailTemplate {
    const subject = `General Inquiry from ${data.name} - KuganTech Website`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>General Inquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="background: linear-gradient(135deg, #0056b3 0%, #ff6b00 100%); padding: 40px 30px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
          ❓ General Inquiry
        </h1>
        <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
          New inquiry from the KuganTech website
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 30px;">
        ${data.service && data.service !== "General Inquiry"
            ? `
        <div style="background-color: #e6f3ff; border-radius: 10px; padding: 15px 20px; margin-bottom: 25px; display: inline-block;">
          <p style="margin: 0; color: #0056b3; font-size: 14px;">
            <strong>Interest Area:</strong> ${data.service}
          </p>
        </div>
        `
            : ""
        }
        <div style="background-color: #f8f9fa; border-radius: 10px; padding: 25px; margin-bottom: 25px;">
          <h2 style="margin: 0 0 20px 0; color: #0056b3; font-size: 18px; border-bottom: 2px solid #ff6b00; padding-bottom: 10px;">
            Sender Information
          </h2>
          <table width="100%" cellpadding="8" cellspacing="0">
            <tr>
              <td style="color: #666; width: 100px; vertical-align: top;"><strong>Name:</strong></td>
              <td style="color: #333;">${data.name}</td>
            </tr>
            <tr>
              <td style="color: #666; vertical-align: top;"><strong>Email:</strong></td>
              <td style="color: #333;"><a href="mailto:${data.email}" style="color: #0056b3;">${data.email}</a></td>
            </tr>
            ${data.phone
            ? `
            <tr>
              <td style="color: #666; vertical-align: top;"><strong>Phone:</strong></td>
              <td style="color: #333;"><a href="tel:${data.phone}" style="color: #0056b3;">${data.phone}</a></td>
            </tr>
            `
            : ""
        }
          </table>
        </div>
        <div style="background-color: #f8f8f8; border-left: 4px solid #666; border-radius: 0 10px 10px 0; padding: 25px;">
          <h2 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">
            📨 Inquiry Message
          </h2>
          <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background-color: #1a1a1a; padding: 25px 30px; text-align: center;">
        <p style="margin: 0; color: #888; font-size: 12px;">
          This inquiry was submitted via the KuganTech website.<br>
          © ${new Date().getFullYear()} Kugan Tech Works. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

    const text = `
General Inquiry from ${data.name}
======================================

${data.service && data.service !== "General Inquiry" ? `Interest Area: ${data.service}\n` : ""}
Sender Information:
- Name: ${data.name}
- Email: ${data.email}
${data.phone ? `- Phone: ${data.phone}` : ""}

Inquiry Message:
${data.message}

--
This inquiry was submitted via the KuganTech website.
  `.trim();

    return { subject, html, text };
}
