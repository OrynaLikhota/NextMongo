'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Header() {
  const session = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check local storage for authentication
    const token = localStorage.getItem('authToken');
    const userInfo = localStorage.getItem('userInfo');
    
    if (token && userInfo) {
      setIsAuthenticated(true);
      try {
        const user = JSON.parse(userInfo);
        setUserName(user.name || user.email || 'User');
      } catch (err) {
        setUserName('User');
      }
    } else if (session?.data?.user) {
      setIsAuthenticated(true);
      setUserName(session.data.user.name || session.data.user.email || 'User');
    } else {
      setIsAuthenticated(false);
      setUserName('');
    }
  }, [session]);

  console.log('User session:', session);
  
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            My App
          </Link>
          <ul className="flex space-x-6 items-center">
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
            {isAuthenticated ? (
              <>
                <li>
                  <Link href="/profile" className="hover:text-blue-200 transition-colors">
                    Profile
                  </Link>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Welcome, {userName}</span>
                </li>
              </>
            ) : (
              <li>
                <Link href="/signin" className="hover:text-blue-200 transition-colors">
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}