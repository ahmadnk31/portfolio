import Link from 'next/link';
import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-8">
          <span className="text-8xl">🔍</span>
        </div>
        
        <Heading className="font-black text-3xl mb-4">Page Not Found</Heading>
        
        <Paragraph className="max-w-xl mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </Paragraph>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-all duration-200"
          >
            Back to Home
          </Link>
          
          <Link 
            href="/blog" 
            className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-6 py-3 rounded-md font-medium transition-all duration-200"
          >
            Read My Blog
          </Link>
        </div>
      </div>
    </Container>
  );
}
