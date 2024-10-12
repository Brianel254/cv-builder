import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-4">Welcome to CV Builder</h1>
      <p className="text-xl mb-8">Create your professional CV with ease</p>
      <Link href="/add" passHref>
        <Button size="lg">
          Get Started
        </Button>
      </Link>
    </div>
  );
}