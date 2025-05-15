"use client";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import React, { useState } from "react";
import { IconCheck, IconLoader2, IconAlertTriangle } from "@tabler/icons-react";

export default function VerifyEmailPage() {
  const [email, setEmail] = useState(process.env.NEXT_PUBLIC_AWS_SES_FROM_EMAIL || "");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus("error");
      setMessage("Email address is required");
      return;
    }
    
    try {
      setStatus("loading");
      
      const response = await fetch("/api/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus("success");
        setMessage(data.message);
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to verify email");
      }
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "An unknown error occurred");
      console.error("Error verifying email:", error);
    }
  };

  return (
    <Container>
      <div className="max-w-2xl mx-auto py-12">
        <Heading className="font-black text-3xl md:text-4xl mb-6">
          Verify Email for AWS SES
        </Heading>
        
        <Paragraph className="mb-8">
          Before you can send emails through AWS SES, you need to verify your sender email address.
          Enter the email address you want to use as your sender email address and click &quot;Verify Email&quot;.
          AWS will send a verification email to this address with instructions to complete the process.
        </Paragraph>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your-verified-email@example.com"
                disabled={status === "loading"}
                required
              />
            </div>
            
            {status === "error" && (
              <div className="flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-md">
                <IconAlertTriangle size={20} className="flex-shrink-0 mt-1" />
                <span className="text-sm">{message}</span>
              </div>
            )}
            
            {status === "success" && (
              <div className="flex items-start gap-2 text-green-600 bg-green-50 p-3 rounded-md">
                <IconCheck size={20} className="flex-shrink-0 mt-1" />
                <span className="text-sm">{message}</span>
              </div>
            )}
            
            <button
              type="submit"
              className={`w-full px-4 py-2 rounded-md font-medium flex justify-center items-center gap-2 ${
                status === "loading" 
                  ? "bg-blue-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white transition-colors`}
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <IconLoader2 size={18} className="animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </button>
          </form>
          
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Important Notes:</h3>
            <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
              <li>You must verify both sender and recipient email addresses in sandbox mode</li>
              <li>Check your spam folder if you don&apos;t see the verification email</li>
              <li>For production use, request a sending limit increase from AWS</li>
              <li>Update your .env.local file with the verified email address</li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
