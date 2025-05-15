import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import "./fix-overflow.css"; // Add the overflow fix CSS
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { IOSFix } from "@/components/IOSFix";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Ahmadullah Nekzad - AWS Certified Cloud Architect & Full-Stack Developer",
  description: 
    "Ahmadullah Nekzad is an AWS certified cloud architect and full-stack developer specializing in scalable web applications and cloud solutions.",
  metadataBase: new URL('https://ahmadullahnekzad.com'),
  authors: [{ name: 'Ahmadullah Nekzad' }],
  creator: 'Ahmadullah Nekzad',
  publisher: 'Ahmadullah Nekzad',
  keywords: [
    'AWS Certified Cloud Architect', 
    'Full-Stack Developer', 
    'Web Development', 
    'Cloud Architecture', 
    'JavaScript', 
    'TypeScript', 
    'React', 
    'Next.js'
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: 'https://ahmadullah.dev',
    title: 'Ahmadullah Nekzad - AWS Certified Cloud Architect & Full-Stack Developer',
    description: 'Ahmadullah Nekzad is an AWS certified cloud architect and full-stack developer specializing in scalable web applications and cloud solutions.',
    siteName: 'Ahmadullah Nekzad',
    images: [
      {
        url: '/images/ahmadullah.png',
        width: 800,
        height: 600,
        alt: 'Ahmadullah Nekzad'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmadullah Nekzad - AWS Certified Cloud Architect & Full-Stack Developer',
    description: 'AWS certified cloud architect and full-stack developer specializing in scalable web applications.',
    images: ['/images/ahmadullah.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: 'google-site-verification-code', // Replace with your actual Google verification code when you have it
  },
  alternates: {
    canonical: 'https://ahmadullah.dev',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <JsonLd />
      </head>
      <body
        className={twMerge(
          inter.className,
          "flex flex-col lg:flex-row antialiased min-h-[100dvh]  bg-gradient-to-br relative from-gray-50 to-gray-100"
        )}
      >
        <IOSFix />
        <Sidebar />
        <div className="lg:pl-3 lg:pt-3 bg-transparent flex-1 w-full  overflow-y-auto">
          
            
            {children}
            <Footer />
          
        </div>
      </body>
    </html>
  );
}
