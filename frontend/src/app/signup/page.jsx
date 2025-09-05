'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUp(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
    
          const data = await response.json();
          if (response.ok) {
            setMessage(data.message);
            alert(data.message || 'Registration completed successfully!');
            setTimeout(() => {
              router.push('/login');
            }, 2000);
            } else {
                setMessage(data.message || 'Error registering user!');
                alert(data.message || 'Error registering user!');
            }
            } catch (error) {
                setMessage('Error connecting to server!');
                alert('Error connecting to server!');
            }
        };

   return (
    <div className="min-h-screen flex">
        {/* Lado esquerdo */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-[#1c1e33]">
            <Image src="/undraw_access-account.svg" alt="Ilustração de login" width={350} height={350} className="object-contain"/>
        </div>

        {/* Lado direito */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-[#25273e]">
            <div className="w-full flex flex-col items-center">
                <h1 className="text-3xl font-semibold mb-4 text-white text-center">Sign Up</h1>
                <p className="text-white text-center text-sm mb-10">Please sign up to continue.</p>

                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <div className="mb-4 relative w-[400px]">
                    <input
                        className="w-full px-4 py-2 rounded-2xl bg-transparent border border-[#ee3a57] focus:outline-none text-white text-sm"
                        type="text"
                        placeholder="Type a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    </div>
                    <div className="mb-4 relative w-[400px]">
                    <input
                        className="w-full px-4 py-2 rounded-2xl bg-transparent border border-[#ee3a57] focus:outline-none text-white text-sm"
                        type="password"
                        placeholder="Type a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </div>

                    <button className="w-[400px] mb-2 bg-[#ee3a57] hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-xl transition cursor-pointer" type="submit">Sign up</button>
                    <p className="text-sm text-white text-center mt-4">
                        Already have an account?{' '}
                        <Link href="/login">
                            <span className="text-[#ee3a57] hover:underline cursor-pointer">Log in</span>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
   )
}