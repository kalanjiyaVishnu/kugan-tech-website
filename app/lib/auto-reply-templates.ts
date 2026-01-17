// Auto-reply email templates sent to customers

interface AutoReplyData {
    name: string;
    email: string;
    service?: string;
    language?: string;
}

interface AutoReplyTemplate {
    subject: string;
    html: string;
    text: string;
}

const translations = {
    en: {
        subject: "Thank you for contacting KuganTech!",
        greeting: "Dear",
        thankYou: "Thank you for reaching out to us!",
        received: "We have received your message and our team will review it shortly.",
        serviceInterest: "Your inquiry regarding",
        noted: "has been noted and assigned to our specialist team.",
        response: "You can expect a response within",
        businessDays: "1-2 business days",
        questions: "If you have any urgent questions, please don't hesitate to call us at",
        appreciation: "We appreciate your interest in KuganTech and look forward to serving you.",
        bestRegards: "Best Regards",
        team: "The KuganTech Team",
        footer: "This is an automated response. Please do not reply to this email.",
        copyright: "All rights reserved.",
    },
    ar: {
        subject: "شكراً لتواصلك مع كوجان تك!",
        greeting: "عزيزي",
        thankYou: "شكراً لتواصلك معنا!",
        received: "لقد تلقينا رسالتك وسيقوم فريقنا بمراجعتها قريباً.",
        serviceInterest: "استفسارك بخصوص",
        noted: "تمت ملاحظته وتحويله إلى فريقنا المتخصص.",
        response: "يمكنك توقع الرد خلال",
        businessDays: "يوم أو يومي عمل",
        questions: "إذا كانت لديك أي أسئلة عاجلة، لا تتردد في الاتصال بنا على",
        appreciation: "نقدر اهتمامك بكوجان تك ونتطلع لخدمتك.",
        bestRegards: "مع أطيب التحيات",
        team: "فريق كوجان تك",
        footer: "هذا رد آلي. يرجى عدم الرد على هذا البريد الإلكتروني.",
        copyright: "جميع الحقوق محفوظة.",
    },
};

export function getAutoReplyTemplate(data: AutoReplyData): AutoReplyTemplate {
    const lang = data.language === "ar" ? "ar" : "en";
    const t = translations[lang];
    const isRTL = lang === "ar";
    const direction = isRTL ? "rtl" : "ltr";
    const textAlign = isRTL ? "right" : "left";

    const subject = t.subject;

    const html = `
<!DOCTYPE html>
<html lang="${lang}" dir="${direction}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: ${isRTL ? "'Segoe UI', Tahoma, Arial, sans-serif" : "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}; background-color: #f4f4f4; direction: ${direction};">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #0056b3 0%, #003d82 100%); padding: 40px 30px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
          ⚙️ Kugan Tech Works
        </h1>
        <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
          Precision Engineering & Sourcing
        </p>
      </td>
    </tr>
    
    <!-- Main Content -->
    <tr>
      <td style="padding: 40px 30px; text-align: ${textAlign};">
        <h2 style="margin: 0 0 20px 0; color: #0056b3; font-size: 24px;">
          ${t.greeting} ${data.name},
        </h2>
        
        <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">
          ${t.thankYou}
        </p>
        
        <p style="margin: 0 0 20px 0; color: #555; font-size: 15px; line-height: 1.6;">
          ${t.received}
        </p>
        
        ${data.service && data.service !== "General Inquiry" ? `
        <div style="background-color: #fff3e6; border-${isRTL ? "right" : "left"}: 4px solid #ff6b00; border-radius: ${isRTL ? "10px 0 0 10px" : "0 10px 10px 0"}; padding: 20px; margin: 25px 0;">
          <p style="margin: 0; color: #333; font-size: 15px;">
            <strong>${t.serviceInterest}:</strong> ${data.service}<br>
            ${t.noted}
          </p>
        </div>
        ` : ""}
        
        <div style="background-color: #e6f3ff; border-radius: 10px; padding: 20px; margin: 25px 0;">
          <p style="margin: 0; color: #0056b3; font-size: 15px;">
            ⏱️ ${t.response} <strong>${t.businessDays}</strong>
          </p>
        </div>
        
        <p style="margin: 0 0 20px 0; color: #555; font-size: 15px; line-height: 1.6;">
          ${t.questions} <a href="tel:+919790525321" style="color: #0056b3; text-decoration: none; font-weight: 600;">+91 9790525321</a>
        </p>
        
        <p style="margin: 30px 0 0 0; color: #333; font-size: 15px; line-height: 1.6;">
          ${t.appreciation}
        </p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
          <p style="margin: 0; color: #333; font-size: 15px;">
            ${t.bestRegards},<br>
            <strong style="color: #0056b3;">${t.team}</strong>
          </p>
        </div>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td style="background-color: #1a1a1a; padding: 25px 30px; text-align: center;">
        <p style="margin: 0 0 10px 0; color: #888; font-size: 12px;">
          ${t.footer}
        </p>
        <p style="margin: 0; color: #666; font-size: 11px;">
          © ${new Date().getFullYear()} Kugan Tech Works. ${t.copyright}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

    const text = `
${t.greeting} ${data.name},

${t.thankYou}

${t.received}

${data.service && data.service !== "General Inquiry" ? `${t.serviceInterest}: ${data.service}\n${t.noted}\n` : ""}

${t.response} ${t.businessDays}.

${t.questions} +91 9790525321

${t.appreciation}

${t.bestRegards},
${t.team}

--
${t.footer}
© ${new Date().getFullYear()} Kugan Tech Works. ${t.copyright}
  `.trim();

    return { subject, html, text };
}
