"use client";
import React, { useState, useEffect } from "react";
import { IconCheck, IconLoader2, IconSend, IconAlertTriangle, IconMail } from "@tabler/icons-react";

const defaultFormState = {
  name: {
    value: "",
    error: "",
  },
  email: {
    value: "",
    error: "",
  },
  message: {
    value: "",
    error: "",
  },
};

export const Contact = () => {
  const [formData, setFormData] = useState(defaultFormState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "verification">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newFormData = { ...formData };
    
    if (!formData.name.value.trim()) {
      newFormData.name.error = "Name is required";
      isValid = false;
    }
    
    if (!formData.email.value.trim()) {
      newFormData.email.error = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.value)) {
      newFormData.email.error = "Please enter a valid email address";
      isValid = false;
    }
    
    if (!formData.message.value.trim()) {
      newFormData.message.error = "Message is required";
      isValid = false;
    }
    
    setFormData(newFormData);
    return isValid;
  };

  // Check if email is already verified
  const checkEmailVerification = async (email: string) => {
    if (!email) return false;
    
    try {
      setStatus("loading");
      
      const response = await fetch("/api/contact/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: formData.name.value
        }),
      });
      
      const data = await response.json();
      
      if (data.alreadyVerified) {
        setIsVerified(true);
        return true;
      } else {
        setVerificationSent(true);
        setStatus("verification");
        return false;
      }
    } catch (error) {
      console.error("Error checking email verification:", error);
      setErrorMessage("Failed to check email verification status.");
      setStatus("error");
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const email = formData.email.value;
    
    // If email is not verified yet, send verification email
    if (!isVerified && !verificationSent) {
      const isAlreadyVerified = await checkEmailVerification(email);
      
      if (isAlreadyVerified) {
        // User is verified, continue with message submission
        await sendMessage();
      }
      // Otherwise, the verification email has been sent, and status is set to "verification"
      return;
    }
    
    // Email is already verified, send the message
    await sendMessage();
  };
  
  const sendMessage = async () => {
    setStatus("loading");
    setErrorMessage("");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.value,
          email: formData.email.value,
          message: formData.message.value,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }
      
      // If this was detected as a duplicate submission, still show success
      // but we could potentially show a different message
      if (data.duplicateDetected) {
        console.log("Duplicate message detected but handled gracefully");
      }
      
      setStatus("success");
      setFormData(defaultFormState);
      setIsVerified(false);
      setVerificationSent(false);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };
  
  return (
    <form className="form w-full max-w-2xl mx-auto" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="w-full">
          <input
            type="text"
            placeholder="Your Name"
            className={`bg-neutral-100 focus:outline-none focus:ring-2 ${
              formData.name.error ? "ring-2 ring-red-500" : "focus:ring-blue-400"
            } px-4 py-3 rounded-md text-sm text-neutral-700 w-full transition-all duration-200`}
            value={formData.name.value}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: {
                  value: e.target.value,
                  error: "",
                },
              });
            }}
            disabled={status === "loading"}
          />
          {formData.name.error && (
            <p className="text-red-500 text-xs mt-1">{formData.name.error}</p>
          )}
        </div>
        
        <div className="w-full">
          <input
            type="email"
            placeholder="Your email address"
            className={`bg-neutral-100 focus:outline-none focus:ring-2 ${
              formData.email.error ? "ring-2 ring-red-500" : "focus:ring-blue-400"
            } px-4 py-3 rounded-md text-sm text-neutral-700 w-full transition-all duration-200`}
            value={formData.email.value}
            onChange={(e) => {
              setFormData({
                ...formData,
                email: {
                  value: e.target.value,
                  error: "",
                },
              });
            }}
            disabled={status === "loading"}
          />
          {formData.email.error && (
            <p className="text-red-500 text-xs mt-1">{formData.email.error}</p>
          )}
        </div>
      </div>
      <div className="mt-5">
        <textarea
          placeholder="Your Message"
          rows={8}
          className={`bg-neutral-100 focus:outline-none focus:ring-2 ${
            formData.message.error ? "ring-2 ring-red-500" : "focus:ring-blue-400"
          } px-4 py-3 rounded-md text-sm text-neutral-700 w-full transition-all duration-200`}
          value={formData.message.value}
          onChange={(e) => {
            setFormData({
              ...formData,
              message: {
                value: e.target.value,
                error: "",
              },
            });
          }}
          disabled={status === "loading"}
        />
        {formData.message.error && (
          <p className="text-red-500 text-xs mt-1">{formData.message.error}</p>
        )}
      </div>
      
      {status === "error" && (
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 text-red-500 bg-red-50 p-3 rounded-md">
          <IconAlertTriangle size={20} className="flex-shrink-0 mt-1 sm:mt-0" />
          <span className="text-sm">{errorMessage}</span>
        </div>
      )}
      
      {status === "success" && (
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
          <IconCheck size={20} className="flex-shrink-0 mt-1 sm:mt-0" />
          <span className="text-sm">Your message has been sent successfully! I&apos;ll get back to you soon.</span>
        </div>
      )}

      {status === "verification" && (
        <div className="mt-4 flex flex-col gap-2 text-blue-600 bg-blue-50 p-4 rounded-md">
          <div className="flex items-center gap-2">
            <IconMail size={20} className="flex-shrink-0" />
            <span className="font-medium">Verification email sent!</span>
          </div>
          <p className="text-sm text-blue-800 mt-1">
            Please check your inbox at <strong>{formData.email.value}</strong> and click the verification link.
            Once verified, you can return here to send your message.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setFormData({
                ...formData,
                email: { value: "", error: "" }
              });
              setVerificationSent(false);
            }}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium underline mt-2 self-start"
          >
            Use a different email address
          </button>
        </div>
      )}
      
      <button
        className={`w-full md:max-w-xs mx-auto px-4 py-3 mt-5 rounded-md font-semibold flex justify-center items-center gap-2 transition-all duration-200 ${
          status === "loading" 
            ? "bg-blue-400 cursor-not-allowed text-white" 
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        type="submit"
        disabled={status === "loading" || status === "verification"}
      >
        {status === "loading" ? (
          <>
            <IconLoader2 size={18} className="animate-spin" />
            {isVerified ? "Sending..." : "Verifying..."}
          </>
        ) : (
          <>
            <IconSend size={18} />
            {isVerified ? "Send Message" : "Verify & Send"}
          </>
        )}
      </button>
    </form>
  );
};
