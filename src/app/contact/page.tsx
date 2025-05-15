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
};

export default function ContactPage() {
  return (
    <Container>
      <span className="text-4xl">✉️</span>
      <Heading className="font-black mb-2">Let's Connect</Heading>
      <Paragraph className="mb-4 max-w-xl">
        I'm always interested in discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out through the form below or connect with me on social media.
      </Paragraph>
      
      <div className="flex flex-wrap gap-4 mb-8">
        {socials.map((social) => (
          <Link
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-neutral-100 hover:bg-blue-50 px-4 py-2 rounded-md transition-all duration-200"
          >
            <social.icon size={20} className="text-blue-600" />
            <span className="font-medium text-sm">{social.label}</span>
          </Link>
        ))}
        <Link
          href="mailto:contact@ahmadullah.com"
          className="flex items-center gap-2 bg-neutral-100 hover:bg-blue-50 px-4 py-2 rounded-md transition-all duration-200"
        >
          <span className="text-blue-600">✉️</span>
          <span className="font-medium text-sm">Email Me</span>
        </Link>
      </div>
      
      <div className="bg-gradient-to-br from-blue-50 to-neutral-50 p-6 rounded-lg border border-neutral-200 mb-10">
        <h3 className="font-bold text-lg mb-4 text-gray-800">Get In Touch</h3>
        <Contact />
      </div>
    </Container>
  );
}
