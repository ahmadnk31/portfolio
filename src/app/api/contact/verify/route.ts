import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isTokenExpired } from '@/lib/verification';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return new Response(
        getHtmlResponse({
          title: 'Invalid Token',
          message: 'No verification token provided. Please check the link and try again.',
          success: false,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }

    // Find contact with this token
    const contact = await prisma.contact.findFirst({
      where: {
        verifyToken: token,
      },
    });

    if (!contact) {
      return new Response(
        getHtmlResponse({
          title: 'Invalid Token',
          message: 'The verification token is invalid. Please request a new verification email.',
          success: false,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }

    // Check if token is expired
    if (isTokenExpired(contact.tokenExpires)) {
      return new Response(
        getHtmlResponse({
          title: 'Token Expired',
          message: 'The verification link has expired. Please request a new verification email.',
          success: false,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }

    // Update contact to verified
    await prisma.contact.update({
      where: {
        id: contact.id,
      },
      data: {
        verified: true,
        verifyToken: null, // Clear token after verification
        tokenExpires: null, // Clear expiry after verification
      },
    });

    // Return success HTML page
    return new Response(
      getHtmlResponse({
        title: 'Email Verified',
        message: 'Your email has been successfully verified. You can now return to the contact page and send your message.',
        success: true,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  } catch (error) {
    console.error('Error verifying email:', error);
    
    return new Response(
      getHtmlResponse({
        title: 'Verification Error',
        message: 'An error occurred during verification. Please try again later.',
        success: false,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  }
}

function getHtmlResponse({ title, message, success }: { title: string; message: string; success: boolean }) {
  const bgColor = success ? '#e6f7ee' : '#fee2e2';
  const textColor = success ? '#047857' : '#dc2626';
  const borderColor = success ? '#a7f3d0' : '#fecaca';
  const iconName = success ? 'check-circle' : 'x-circle';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Ahmadullah Nekzad</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
    .header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .message-box {
      background-color: ${bgColor};
      border: 1px solid ${borderColor};
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      color: ${textColor};
    }
    .icon {
      display: block;
      margin: 0 auto 1rem;
      width: 64px;
      height: 64px;
    }
    .message {
      text-align: center;
      font-size: 1.1rem;
    }
    .button {
      background-color: #3b82f6;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
    }
    .button-container {
      text-align: center;
      margin-top: 2rem;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${title}</h1>
  </div>
  <div class="message-box">
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      ${success ? 
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />' : 
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />'
      }
    </svg>
    <p class="message">${message}</p>
  </div>
  <div class="button-container">
    <a href="/contact" class="button">Return to Contact Page</a>
  </div>
</body>
</html>
  `;
}
