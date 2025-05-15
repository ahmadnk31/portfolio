import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateVerificationToken, getTokenExpiration } from '@/lib/verification';
import { sendEmail } from '@/lib/aws';

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Check if user has already contacted with a verified email
    const existingVerifiedContact = await prisma.contact.findFirst({
      where: {
        email,
        verified: true
      }
    });

    if (existingVerifiedContact) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Your email is already verified. You can send your message directly.',
          alreadyVerified: true
        }
      );
    }

    // Generate verification token
    const verifyToken = generateVerificationToken();
    const tokenExpires = getTokenExpiration();

    // Create a temporary contact record or update an existing unverified one
    await prisma.contact.upsert({
      where: {
        id: 'temp-' + email.replace(/[^a-zA-Z0-9]/g, ''),
      },
      update: {
        name: name || 'User',
        verifyToken,
        tokenExpires,
        verified: false,
      },
      create: {
        id: 'temp-' + email.replace(/[^a-zA-Z0-9]/g, ''),
        name: name || 'User',
        email,
        message: 'Verification in progress...',
        verifyToken,
        tokenExpires,
      },
    });

    // Send verification email
    const verificationUrl = `${req.nextUrl.origin}/api/contact/verify?token=${verifyToken}`;
    
    await sendEmail({
      to: email,
      subject: "Verify your email address - Ahmadullah Nekzad's Portfolio",
      html: `
        <h1>Email Verification</h1>
        <p>Hi ${name || 'there'},</p>
        <p>Thank you for your interest in contacting me. Please click the link below to verify your email address:</p>
        <p><a href="${verificationUrl}" style="display:inline-block;background-color:#3b82f6;color:white;padding:10px 20px;text-decoration:none;border-radius:4px;">Verify Email Address</a></p>
        <p>Or copy and paste this URL into your browser:</p>
        <p>${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>Ahmadullah Nekzad</p>
      `,
      text: `
        Email Verification
        
        Hi ${name || 'there'},
        
        Thank you for your interest in contacting me. Please click the link below to verify your email address:
        
        ${verificationUrl}
        
        This link will expire in 24 hours.
        
        Best regards,
        Ahmadullah Nekzad
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Verification email has been sent. Please check your inbox.'
    });
  } catch (error) {
    console.error('Error processing verification request:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
