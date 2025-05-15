"use client";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import React, { useState, useRef } from "react";
import { IconLoader2, IconCheck, IconAlertTriangle, IconPhoto, IconUpload } from "@tabler/icons-react";
import Image from "next/image";

export default function NewArticle() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    published: false,
  });
  
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    setFormData({
      ...formData,
      slug,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.content) {
      setStatus("error");
      setErrorMessage("Title, slug, and content are required");
      return;
    }
    
    setStatus("loading");
    setErrorMessage("");
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("slug", formData.slug);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("published", formData.published.toString());
      
      if (image) {
        formDataToSend.append("image", image);
      }
      
      const response = await fetch("/api/articles", {
        method: "POST",
        body: formDataToSend,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to create article");
      }
      
      setStatus("success");
      // Reset form
      setFormData({
        title: "",
        slug: "",
        description: "",
        content: "",
        published: false,
      });
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };
  
  return (
    <Container>
      <Heading className="font-black mb-6">Create New Article</Heading>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            onBlur={generateSlug}
            className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-3 rounded-md text-sm text-neutral-700 w-full"
          />
        </div>
        
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
            Slug *
          </label>
          <input
            type="text"
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-3 rounded-md text-sm text-neutral-700 w-full"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-3 rounded-md text-sm text-neutral-700 w-full"
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={10}
            className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-3 rounded-md text-sm text-neutral-700 w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Featured Image
          </label>
          
          <div 
            className={`border-2 border-dashed rounded-lg p-6 text-center ${imagePreview ? 'border-blue-400' : 'border-gray-300 hover:border-gray-400'} cursor-pointer`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
              {imagePreview ? (
              <div className="relative">
                <Image 
                  src={imagePreview} 
                  alt="Preview" 
                  width={400}
                  height={240}
                  className="max-h-60 w-auto mx-auto rounded object-contain"
                  unoptimized // This is needed for blob/data URLs
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImage(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100"
                >
                  <span className="text-xs">×</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <IconPhoto size={36} className="mx-auto text-gray-400" />
                <p className="text-sm text-gray-500">
                  Click to upload an image or drag and drop
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-400 rounded"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
            Publish article immediately
          </label>
        </div>
        
        {status === "error" && (
          <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-md">
            <IconAlertTriangle size={20} />
            <span className="text-sm">{errorMessage}</span>
          </div>
        )}
        
        {status === "success" && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
            <IconCheck size={20} />
            <span className="text-sm">Article created successfully!</span>
          </div>
        )}
        
        <div>
          <button
            type="submit"
            disabled={status === "loading"}
            className={`px-4 py-3 rounded-md font-semibold flex justify-center items-center gap-2 transition-all duration-200 ${
              status === "loading" 
                ? "bg-blue-400 cursor-not-allowed text-white" 
                : "bg-blue-600 hover:bg-blue-700 text-white"
            } w-full md:w-auto`}
          >
            {status === "loading" ? (
              <>
                <IconLoader2 size={18} className="animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <IconUpload size={18} />
                Create Article
              </>
            )}
          </button>
        </div>
      </form>
    </Container>
  );
}
