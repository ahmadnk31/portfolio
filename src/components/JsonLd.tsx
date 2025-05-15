"use client";

import { usePathname } from 'next/navigation';
import Script from 'next/script';

interface StructuredDataProps {
  title?: string;
  description?: string;
  image?: string;
  datePublished?: string;
  authorName?: string;
  type?: 'Person' | 'WebSite' | 'Article' | 'BlogPosting';
}

export const JsonLd = ({ 
  title = "Ahmadullah Nekzad - AWS Certified Cloud Architect & Full-Stack Developer",
  description = "Ahmadullah Nekzad is an AWS certified cloud architect and full-stack developer specializing in scalable web applications and cloud solutions.",
  image = "/images/ahmadullah.png",
  datePublished,
  authorName = "Ahmadullah Nekzad",
  type = "WebSite"
}: StructuredDataProps) => {
  const pathname = usePathname();
  const currentUrl = `https://ahmadullahnekzad.com${pathname}`;
  
  // Base structured data for the website
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ahmadullah Nekzad Portfolio",
    "url": "https://ahmadullahnekzad.com",
    "description": "Personal portfolio website of Ahmadullah Nekzad, AWS certified cloud architect and full-stack developer.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ahmadullahnekzad.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  
  // Person data
  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": authorName,
    "jobTitle": "AWS Certified Cloud Architect & Full-Stack Developer",
    "url": "https://ahmadullahnekzad.com",
    "sameAs": [
      "https://twitter.com/ahmadnekzad",
      "https://www.linkedin.com/in/ahmadnekzad/",
      "https://github.com/ahmadnk31"
    ]
  };
  
  // Article/BlogPosting data
  const articleData = {
    "@context": "https://schema.org",
    "@type": type,
    "headline": title,
    "image": [`https://ahmadullahnekzad.com${image}`],
    "datePublished": datePublished,
    "dateModified": datePublished,
    "author": {
      "@type": "Person",
      "name": authorName,
      "url": "https://ahmadullahnekzad.com"
    },
    "publisher": {
      "@type": "Person",
      "name": authorName,
      "url": "https://ahmadullahnekzad.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ahmadullahnekzad.com/favicon-32x32.png"
      }
    },
    "url": currentUrl,
    "description": description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    }
  };
  
  // Determine which data to use based on type
  let jsonLdData;
  
  switch (type) {
    case 'Person':
      jsonLdData = personData;
      break;
    case 'Article':
    case 'BlogPosting':
      jsonLdData = articleData;
      break;
    default:
      jsonLdData = websiteData;
  }
  
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
};
