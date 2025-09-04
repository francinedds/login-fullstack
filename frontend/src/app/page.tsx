'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import '@/styles/globals.css'

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/signup');
  }, []);
  
  return null;
}
