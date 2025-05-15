import { NextRequest, NextResponse } from 'next/server';
import { verifyEmailAddress } from '@/lib/aws';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email address is required' },
        { status: 400 }
      );
    }
    
    const result = await verifyEmailAddress(email);
    
    if (result.success) {
      return NextResponse.json(
        { success: true, message: result.message },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Error in verify-email API route:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process verification request',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
