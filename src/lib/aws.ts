import { SES } from '@aws-sdk/client-ses';
import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

// Initialize SES client
export const sesClient = new SES({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

// Initialize S3 client
export const s3Client = new S3({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

// Send email using SES
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
}) {
  const params = {
    Source: process.env.AWS_SES_FROM_EMAIL!,
    Destination: {
      ToAddresses: Array.isArray(to) ? to : [to],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: text,
          Charset: 'UTF-8',
        },
        Html: {
          Data: html,
          Charset: 'UTF-8',
        },
      },
    },
  };
  try {
    // Verify environment variables are properly loaded
    if (!process.env.AWS_SES_FROM_EMAIL) {
      throw new Error('AWS_SES_FROM_EMAIL is not defined in environment variables');
    }
    
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      throw new Error('AWS credentials are not properly configured');
    }
    
    console.log('Attempting to send email from:', process.env.AWS_SES_FROM_EMAIL);
    console.log('To:', Array.isArray(to) ? to.join(', ') : to);
    
    const result = await sesClient.sendEmail(params);
    console.log('Email sent successfully, message ID:', result.MessageId);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Upload file to S3
export async function uploadToS3(
  file: Buffer,
  fileName: string,
  contentType: string
) {
  try {
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: fileName,
        Body: file,
        ContentType: contentType,
      },
    });

    const result = await upload.done();
    return result.Location;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
}

// Get image URL from S3
export function getS3URL(key: string) {
  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

// Verify an email address with SES
export async function verifyEmailAddress(emailAddress: string) {
  try {
    console.log(`Attempting to verify email address: ${emailAddress}`);
    
    const result = await sesClient.verifyEmailIdentity({
      EmailAddress: emailAddress
    });
    
    console.log(`Verification initiated for: ${emailAddress}`);
    console.log(`Verification result:`, result);
    
    return {
      success: true,
      message: `Verification email has been sent to ${emailAddress}. Please check your inbox and follow the instructions to complete verification.`
    };
  } catch (error) {
    console.error('Error verifying email address:', error);
    return {
      success: false,
      message: `Failed to verify email address: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error
    };
  }
}
