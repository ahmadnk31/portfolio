import { Contact } from "@/components/Contact";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Metadata } from "next";
import Image from "next/image";
import { socials } from "@/constants/socials";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Ahmadullah Nekzad",
  description:
    "Get in touch with Ahmadullah Nekzad - AWS Certified Cloud Architect and Full Stack Developer specializing in cloud solutions and web applications.",
  keywords: [
    'Contact Ahmadullah Nekzad', 
    'Hire AWS Cloud Architect', 
    'Full-Stack Developer Contact', 
    'Cloud Solutions Consultant',
    'Web Development Services'
  ],
  openGraph: {
    title: "Contact | Ahmadullah Nekzad",
    description: "Get in touch with Ahmadullah Nekzad - AWS Certified Cloud Architect and Full Stack Developer specializing in cloud solutions and web applications.",
    url: 'https://ahmadullah.dev/contact',
    type: 'website',
    images: [
      {
        url: '/images/ahmadullah.png',
        width: 800,
        height: 600,
        alt: 'Contact Ahmadullah Nekzad'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact Ahmadullah Nekzad",
    description: "Get in touch for cloud architecture and web development services.",
    images: ['/images/ahmadullah.png'],
  },
};

export default function ContactPage() {
  return (
    <Container>
      <div className="relative">
        {/* Background decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -z-10"></div>
        
        <div className="mb-12">
          <span className="inline-block p-3 bg-blue-50 text-blue-600 rounded-xl mb-4">✉️</span>
          <Heading className="font-black text-3xl md:text-4xl mb-4">Let&apos;s Connect</Heading>
          <Paragraph className="mb-4 max-w-xl text-lg">
            I&apos;m always interested in discussing new projects, creative ideas, or opportunities to be part 
            of your vision. Feel free to reach out!
          </Paragraph>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h3 className="font-semibold text-xl mb-4">Connect with me</h3>
            <div className="space-y-3 mb-8">
              <Link
                href="mailto:contact@ahmadullah.com"
                className="flex items-center gap-3 p-4 bg-white hover:bg-blue-50 border border-gray-100 rounded-lg shadow-sm transition-all duration-200"
              >
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-sm text-gray-500">Email</span>
                  <span className="font-medium">nikzadahmadullah@gmail.com</span>
                </div>
              </Link>
            </div>
            
            <h3 className="font-semibold text-xl mb-4">Follow me</h3>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center w-12 h-12 bg-white hover:bg-blue-50 border border-gray-200 rounded-full shadow-sm transition-all duration-200"
                >
                  <social.icon size={22} className="text-blue-600" />
                </Link>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="font-semibold text-xl mb-6">Send me a message</h3>
            <Contact />
          </div>
        </div>
      </div>
    </Container>
  );
}
