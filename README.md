# Ahmadullah Nekzad - Portfolio Website

A modern portfolio website based on the Sidefolio template, built with Next.js, TailwindCSS, Prisma, and AWS services.

## Features

- Responsive design optimized for all devices
- Modern UI with animations using Framer Motion
- Blog with MDX support
- Contact form with email verification
- AWS SES integration for sending emails
- AWS S3 integration for file uploads
- Prisma ORM for database management

## Email Verification System

The contact form implements a secure email verification flow:

1. **Verification Process**:
   - When a user submits the contact form, their email is verified first
   - A unique verification token is generated and stored in the database
   - A verification email is sent to the user's email address
   - After verification, the user can send their message

2. **Protection Against Spam**:
   - Ensures users provide valid email addresses
   - Prevents spam by requiring email verification
   - Tracks verified contacts in the database

3. **Management Features**:
   - Admin page to monitor verification status
   - Utility scripts for verifying sender emails
   - API endpoints for managing verifications

## Setup

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- AWS account with SES and S3 access

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables from `.env.example`
4. Set up the database: `npx prisma migrate dev`
5. Verify SES email addresses: `node scripts/verify-emails.js`
6. Start the development server: `npm run dev`

## Built with
- Next.js
- TailwindCSS
- Framer motion
- MDX
- Prisma
- AWS SDK

Based on [Aceternity UI](https://ui.aceternity.com/templates/sidefolio) template
