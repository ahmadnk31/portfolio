"use strict";

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { SES } = require('@aws-sdk/client-ses');

// Initialize SES client
const sesClient = new SES({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

// Function to verify an email address
async function verifyEmailAddress(email) {
  try {
    console.log(`\nInitiating verification for: ${email}`);
    
    const result = await sesClient.verifyEmailIdentity({
      EmailAddress: email
    });
    
    console.log(`✅ Verification email sent to: ${email}`);
    console.log(`Check your inbox and follow the instructions to complete verification.\n`);
    
    return true;
  } catch (error) {
    console.error(`❌ Failed to verify ${email}:`, error.message);
    return false;
  }
}

// Function to handle the verification process
async function continueWithVerification(senderEmail, notificationEmail) {
  console.log('Verifying the following email addresses:');
  console.log(`1. Sender email: ${senderEmail}`);
  console.log(`2. Recipient email: ${notificationEmail}`);
  
  // Verify both emails
  await verifyEmailAddress(senderEmail);
  
  if (senderEmail !== notificationEmail) {
    await verifyEmailAddress(notificationEmail);
  } else {
    console.log('\nSender and recipient emails are the same, only verifying once.');
  }
}

// Function to verify both sender and recipient emails
async function main() {
  console.log('\n=== AWS SES Email Verification Tool ===\n');
  
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.error('❌ AWS credentials are missing. Please check your .env.local file.');
    process.exit(1);
  }
  
  const senderEmail = process.env.AWS_SES_FROM_EMAIL;
  if (!senderEmail) {
    console.error('❌ AWS_SES_FROM_EMAIL is not defined in your .env.local file.');
    console.log('Please enter the sender email address to verify:');
    // Use readline.promises for more modern async/await approach
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // Promisify the question function
    const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));
    
    try {
      const email = await askQuestion('Sender email: ');
      rl.close();
      
      if (!email || !email.includes('@')) {
        console.error('❌ Invalid email format');
        process.exit(1);
      }
      
      await continueWithVerification(email, email);
    } catch (error) {
      console.error('Error getting email:', error);
      process.exit(1);
    }
    
    return;
  }
  
  const notificationEmail = process.env.NOTIFICATION_EMAIL || senderEmail;
  if (!notificationEmail) {
    console.error('❌ NOTIFICATION_EMAIL is not defined in your .env.local file. Using sender email as notification email.');
  }
  await continueWithVerification(senderEmail, notificationEmail);
  
  console.log('\n=== Important Notes ===');
  console.log('1. Check your inbox (and spam folder) for verification emails from AWS');
  console.log('2. You must click the verification link in each email to complete the process');
  console.log('3. In sandbox mode, you can only send emails to verified addresses');
  console.log('4. For production use, request a sending limit increase from AWS');
  console.log('\nVerification process initiated successfully!');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
