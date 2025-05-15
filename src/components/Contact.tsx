"use client";
import React, { useState } from "react";
import { IconCheck, IconLoader2, IconSend, IconAlertTriangle } from "@tabler/icons-react";

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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
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
      
      setStatus("success");
      setFormData(defaultFormState);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };
  
  return (
    <form className="form" onSubmit={handleSubmit}>
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
        <div className="mt-4 flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-md">
          <IconAlertTriangle size={20} />
          <span className="text-sm">{errorMessage}</span>
        </div>
      )}
      
      {status === "success" && (
        <div className="mt-4 flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
          <IconCheck size={20} />
          <span className="text-sm">Your message has been sent successfully! I'll get back to you soon.</span>
        </div>
      )}
      
      <button
        className={`w-full px-4 py-3 mt-5 rounded-md font-semibold flex justify-center items-center gap-2 transition-all duration-200 ${
          status === "loading" 
            ? "bg-blue-400 cursor-not-allowed text-white" 
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <IconLoader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <IconSend size={18} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};
