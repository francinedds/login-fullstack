'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, logout, parseJwt } from '@/lib/auth'; 

type FormData = {
  username: string;
  password: string;
};

export default function Dashboard(){
    const [user, setUser] = useState<FormData | null>(null);
    const router = useRouter();

    // Pega o token de autenticação
    useEffect(() => {
        const token = getToken();
        if (!token) return router.push('/login');
    
        fetch('http://localhost:4000/protected', {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
          })
          .then(data => setUser(data.user))
          .catch(() => router.push('/login'));
    }, []);

    useEffect(() => {
        const token = getToken();
        if (!token) return router.push('/login');
    
        const decoded = parseJwt(token);
        if (!decoded || !decoded.username) {
          logout();
          return;
        }
    
        setUser(decoded); // agora `user.username` está disponível
      }, []);

    return(
        <div className='min-h-screen flex flex-col items-center justify-center bg-[#25273e] p-4'>
            <h1 className='text-3xl font-semibold mb-5 text-white text-center'>Dashboard</h1>
            {user ? (
                <>
                    <p> Welcome, {user.username}!</p>
                    <button className='w-50 mt-5 bg-[#ee3a57] hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-xl transition cursor-pointer' onClick={logout}>Log out</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}