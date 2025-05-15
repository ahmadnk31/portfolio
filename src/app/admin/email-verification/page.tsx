"use client";

import React, { useState, useEffect } from 'react';
import { IconRefresh, IconCheck, IconX, IconClock } from '@tabler/icons-react';
import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';

type VerificationStatus = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  tokenExpires: string | null;
  verifyToken: string | null;
  expired: boolean;
};

type VerificationData = {
  pendingCount: number;
  verifiedCount: number;
  pendingVerifications: VerificationStatus[];
};

export default function VerificationStatusPage() {
  const [data, setData] = useState<VerificationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/contact/verification-status');
      
      if (!response.ok) {
        throw new Error('Failed to fetch verification status');
      }
      
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      console.error('Error fetching verification status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Container>
      <div className="py-8">
        <div className="flex items-center justify-between mb-6">
          <Heading className="font-black text-2xl md:text-3xl">Email Verification Status</Heading>
          <button 
            onClick={fetchData}
            className="flex items-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-md transition-colors"
          >
            <IconRefresh size={18} />
            Refresh
          </button>
        </div>
        
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading verification data...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        {data && !loading && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-md">
                <p className="text-sm text-blue-600 font-medium">Pending Verifications</p>
                <p className="text-2xl font-bold text-blue-800">{data.pendingCount}</p>
              </div>
              <div className="bg-green-50 border border-green-100 p-4 rounded-md">
                <p className="text-sm text-green-600 font-medium">Verified Contacts</p>
                <p className="text-2xl font-bold text-green-800">{data.verifiedCount}</p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-medium">Pending Verifications</h3>
              </div>
              
              {data.pendingVerifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>No pending verifications</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-left text-sm text-gray-500">
                      <tr>
                        <th className="px-4 py-3 font-medium">Name</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Requested</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Expires</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.pendingVerifications.map(verification => (
                        <tr key={verification.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm">{verification.name}</td>
                          <td className="px-4 py-3 text-sm">{verification.email}</td>
                          <td className="px-4 py-3 text-sm">{formatDate(verification.createdAt)}</td>
                          <td className="px-4 py-3">
                            {verification.expired ? (
                              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-red-50 text-red-700">
                                <IconX size={12} /> Expired
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-yellow-50 text-yellow-700">
                                <IconClock size={12} /> Pending
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {verification.tokenExpires ? formatDate(verification.tokenExpires) : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
