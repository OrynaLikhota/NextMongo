'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Header() {
  const session = useSession()

  console.log('User session:', session);
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            My App
          </Link>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-blue-200 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/movies" className="hover:text-blue-200 transition-colors">
                Movies
              </Link>
            </li>
            <li>
              <Link href="/api/test" className="hover:text-blue-200 transition-colors">
                API Test
              </Link>
            </li>
            <li>
              <Link href="/signin" className="hover:text-blue-200 transition-colors">
                Sign In
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
