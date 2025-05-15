import { prisma } from '@/lib/prisma';
import { isTokenExpired } from '@/lib/verification';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // This endpoint should be protected in production
    // Simple authentication check - in a real app, you would use a more secure method
    // like JWT tokens or session cookies
    const hasAuth = req.headers.get('Authorization');
    
    // For client-side validation, check the referer to ensure it's from an admin page
    const referer = req.headers.get('referer') || '';
    const isFromAdminPage = referer.includes('/admin/');
    
    if (!isFromAdminPage) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized access' }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    // Get all verification attempts
    const pendingVerifications = await prisma.contact.findMany({
      where: {
        verified: false,
        verifyToken: {
          not: null,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        tokenExpires: true,
        verifyToken: true,
      },
    });

    // Process verification statuses
    const verifications = pendingVerifications.map(verification => ({
      ...verification,
      expired: isTokenExpired(verification.tokenExpires),
      tokenExpires: verification.tokenExpires?.toISOString(),
      createdAt: verification.createdAt.toISOString(),
    }));

    // Get verified contacts count
    const verifiedContactsCount = await prisma.contact.count({
      where: {
        verified: true,
      },
    });

    return NextResponse.json({
      pendingCount: pendingVerifications.length,
      verifiedCount: verifiedContactsCount,
      pendingVerifications: verifications,
    });
  } catch (error) {
    console.error('Error fetching verification status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch verification status' },
      { status: 500 }
    );
  }
}
