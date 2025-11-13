"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState<{name?: string, email?: string} | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const localUser = localStorage.getItem('userInfo');
    if (localUser) {
      try {
        setUserInfo(JSON.parse(localUser));
      } catch (err) {
        console.error('Failed to parse user info');
      }
    } else if (session?.user) {
      setUserInfo({
        name: session.user.name || 'User',
        email: session.user.email || ''
      });
    }
  }, [session]);

  const handleLogout = async () => {
    setLoading(true);
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    sessionStorage.clear();
    
    if (session) {
      await signOut({ redirect: false });
    }
    
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
    
    router.push('/signin');
  };

  if (!userInfo) {
    return (
      <div className="container mx-auto p-4 max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Profile</h1>
          <p className="text-gray-600 mb-4">Please sign in to view your profile.</p>
          <button 
            onClick={() => router.push('/signin')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Profile</h1>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">
              {userInfo.name || 'User'}
            </h2>
            <p className="text-gray-600">{userInfo.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-800 disabled:bg-red-300 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          {loading ? "Signing out..." : "🚪 Log Out"}
        </button>
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => router.push('/')}
            className="text-blue-600 hover:text-blue-800 text-sm underline font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
