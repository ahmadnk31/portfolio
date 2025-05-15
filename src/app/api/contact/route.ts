import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/aws";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Validate form input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Check if email is verified
    const existingContact = await prisma.contact.findFirst({
      where: {
        email,
        verified: true,
      },
    });

    if (!existingContact) {
      return NextResponse.json(
        { error: "Please verify your email address first" },
        { status: 403 }
      );
    }

    // Save contact message to database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        message,
        verified: true, // This message is from a verified email
      },
    });

    // Send notification email
    await sendEmail({
      to: process.env.AWS_SES_FROM_EMAIL!,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      text: `
        New Contact Form Submission
        --------------------------
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    // Send confirmation email to the user
    await sendEmail({
      to: email,
      subject: "Thank you for contacting Ahmadullah Nekzad",
      html: `
        <h1>Thank you for your message!</h1>
        <p>Hi ${name},</p>
        <p>I have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Ahmadullah Nekzad</p>
      `,
      text: `
        Thank you for your message!
        
        Hi ${name},
        
        I have received your message and will get back to you as soon as possible.
        
        Best regards,
        Ahmadullah Nekzad
      `,
    });

    return NextResponse.json({ success: true, id: contact.id });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}
