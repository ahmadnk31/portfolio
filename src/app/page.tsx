import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";
import Image from "next/image";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
        <div className="md:max-w-xl">
          <span className="text-4xl">👋</span>
          <Heading className="font-black text-3xl md:text-4xl">Hello there! I&apos;m Ahmadullah Nekzad</Heading>
          <Paragraph className="max-w-xl mt-4 text-lg">
            I&apos;m a full-stack developer that specializes in{" "}
            <Highlight>cloud solutions</Highlight> and web apps that deliver business value
            and exceptional user experiences
          </Paragraph>
          <Paragraph className="max-w-xl mt-4">
            I&apos;m an AWS certified cloud architect with{" "}
            <Highlight>extensive experience</Highlight> building scalable, secure applications
            using modern tech stacks including Next.js, Prisma, and AWS services.
          </Paragraph>
          
          <div className="flex gap-4 mt-8">
            <a 
              href="/contact" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-all duration-200"
            >
              Get in Touch
            </a>
            <a 
              href="/resume" 
              className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-6 py-3 rounded-md font-medium transition-all duration-200"
            >
              My Resume
            </a>
          </div>
        </div>
        
        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto md:mx-0 mt-6 md:mt-0 overflow-visible">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full"></div>
          <div className="absolute inset-4 bg-blue-600 opacity-10 rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image 
              src="/images/ahmadullah.png" 
              alt="Ahmadullah Nekzad" 
              width={288}
              height={288}
              className="rounded-full w-56 h-56 md:w-72 md:h-72 object-cover border-4 border-white shadow-lg"
              priority
            />
          </div>
        </div>
      </div>
      
      <Heading
        as="h2"
        className="font-black text-xl md:text-2xl mt-24 mb-6"
      >
        What I&apos;ve Been Working On
      </Heading>
      <Products />
      
      <Heading
        as="h2"
        className="font-black text-xl md:text-2xl mt-24 mb-6"
      >
        My Technical Expertise
      </Heading>
      <TechStack />
      
      <div className="mt-24 bg-gradient-to-br from-blue-50 to-neutral-50 p-8 rounded-xl border border-neutral-100">
        <Heading as="h2" className="font-black text-xl md:text-2xl mb-4">
          Let&apos;s Build Something Amazing Together
        </Heading>
        <Paragraph className="mb-6">
          I&apos;m always interested in hearing about new projects and opportunities. 
          If you have a project in mind or just want to chat, feel free to reach out!
        </Paragraph>
        <a 
          href="/contact" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-all duration-200"
        >
          Contact Me
        </a>
      </div>
    </div>
  );
}
