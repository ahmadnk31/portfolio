import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

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
    url: 'https://ahmadullahnekzad.com',
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
    canonical: 'https://ahmadullahnekzad.com',
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
          "flex antialiased h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
        )}
      >
        <Sidebar />
        <div className="lg:pl-3 lg:pt-3 bg-transparent flex-1 overflow-y-auto">
          <div className="flex-1 bg-white/90 min-h-screen lg:rounded-tl-2xl border border-transparent lg:border-gray-200/60 lg:shadow-soft overflow-y-auto backdrop-blur-sm relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-50/40 to-indigo-50/40 rounded-full blur-3xl -z-10 transform translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-blue-50/40 to-purple-50/40 rounded-full blur-3xl -z-10 transform -translate-x-1/4 translate-y-1/4"></div>
            
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
