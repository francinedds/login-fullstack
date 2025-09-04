'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { User, Lock } from 'phosphor-react'
import Image from 'next/image';

export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();
    
    async function handleLogin(e) {
    e.preventDefault();
        const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem('token', token);
        router.push('/dashboard');
      } else {
        alert('Credenciais inválidas');
      }

      if (rememberMe) {
        localStorage.setItem("rememberedUser", username);
      } else {
        localStorage.removeItem("rememberedUser");
      }
    }

    useEffect(() => {
      const savedUsername = localStorage.getItem("rememberedUser");
      if (savedUsername) {
        setUsername(savedUsername);
        setRememberMe(true);
      }
    }, []);

    return(
        <div className="min-h-screen flex">
        {/* Lado esquerdo */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-[#1c1e33]">
            <Image src="/undraw_secure-login.svg" alt="Ilustração de login" width={400} height={400} className="object-contain"/>
        </div>
      
        {/* Lado direito */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-[#25273e]">
          <div className="w-full flex flex-col">
            <form onSubmit={handleLogin} className="flex flex-col items-center">
              <h1 className="text-3xl font-semibold mb-4 text-white text-center">Log In</h1>
              <p className="text-white text-center text-sm mb-10">Log in with your account.</p>
      
              {/* Username */}
              <div className="mb-4 relative w-[400px]">
                <User
                  size={20}
                  weight="bold"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  className="w-full pl-10 px-4 py-2 rounded-2xl bg-transparent border border-[#ee3a57] focus:outline-none text-white"
                  placeholder="User"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
      
              {/* Password */}
              <div className="mb-4 relative w-[400px]">
                <Lock
                  size={20}
                  weight="bold"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="password"
                  className="w-full pl-10 px-4 py-2 rounded-2xl bg-transparent border border-[#ee3a57] focus:outline-none text-white"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {/* Checkbox */}
              <div className="mb-6 flex justify-start w-[390px]">
                <label className="relative flex items-center cursor-pointer text-sm text-white">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-4 h-4 border border-[#ee3a57] rounded-sm peer-checked:bg-[#ee3a57] flex items-center justify-center transition">
                    <svg
                      className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-2">Remember me</span>
                </label>
              </div>

              <button type="submit" className="w-[400px] bg-[#ee3a57] hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-xl transition cursor-pointer">Enter</button>
            </form>
          </div>
        </div>
      </div>      
    )
}