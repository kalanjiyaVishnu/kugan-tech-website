import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getEmailTemplate, EmailType } from "@/app/lib/email-templates";
import { getAutoReplyTemplate } from "@/app/lib/auto-reply-templates";
import { siteConfig } from "@/app/lib/config";

// Configure your SMTP settings here or use environment variables
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, service, message, language } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required fields" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Determine email type based on service selection
        let emailType: EmailType = "inquiry";
        if (service && service !== "General Inquiry" && service !== "استفسار عام") {
            emailType = "service_request";
        } else if (!service || service === "General Inquiry" || service === "استفسار عام") {
            emailType = "contact";
        }

        // Get the appropriate email template for admin notification
        const adminTemplate = getEmailTemplate(emailType, {
            name,
            email,
            phone,
            service,
            message,
        });

        // Send email to admin/company
        const adminMailOptions = {
            from: process.env.SMTP_FROM || `"KuganTech Website" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_TO || siteConfig.contact.email,
            replyTo: email,
            subject: adminTemplate.subject,
            text: adminTemplate.text,
            html: adminTemplate.html,
        };

        await transporter.sendMail(adminMailOptions);

        // Get auto-reply template for customer confirmation
        const autoReplyTemplate = getAutoReplyTemplate({
            name,
            email,
            service,
            language: language || "en",
        });

        // Send auto-reply to the customer
        const customerMailOptions = {
            from: process.env.SMTP_FROM || `"KuganTech" <${process.env.SMTP_USER}>`,
            to: email,
            subject: autoReplyTemplate.subject,
            text: autoReplyTemplate.text,
            html: autoReplyTemplate.html,
        };

        await transporter.sendMail(customerMailOptions);

        return NextResponse.json(
            {
                message: "Email sent successfully",
                type: emailType,
                autoReplySent: true
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { error: "Failed to send email. Please try again later." },
            { status: 500 }
        );
    }
}
