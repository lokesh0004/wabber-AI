'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      alert('Signed up with Google!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex items-center justify-center relative overflow-hidden px-4">

      {/* ✨ Star Field Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 200 }).map((_, i) => {
          const size = Math.random() * 1.2 + 0.4;
          const top = `${Math.random() * 100}%`;
          const left = `${Math.random() * 100}%`;
          const duration = 30 + Math.random() * 20;
          const delay = Math.random() * 10;
          return (
            <div
              key={i}
              className="absolute rounded-full bg-white/30 animate-star"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top,
                left,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* 🧊 Glassmorphic Sign Up Card */}
      <div className="z-10 w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl px-8 py-10 border border-white/20 shadow-xl">
        <h1 className="text-3xl font-extrabold text-center tracking-tight bg-gradient-to-r from-sky-300 via-purple-300 to-pink-300 text-transparent bg-clip-text font-poppins">
          Account To Bnale Motii
        </h1>
        <p className="text-sm text-white/60 text-center mt-1 mb-6">
          Join Webber AI and explore the cosmos 🌠
        </p>

        {error && (
          <p className="text-red-400 bg-white/10 p-2 text-sm rounded mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/10 placeholder-white/40 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/10 placeholder-white/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/10 placeholder-white/40 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-400 to-purple-500 hover:scale-105 transition transform shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center gap-2 my-6">
          <div className="h-px flex-1 bg-white/20" />
          <p className="text-sm text-white/50">or</p>
          <div className="h-px flex-1 bg-white/20" />
        </div>

        <button
          onClick={handleGoogleSignUp}
          className="w-full bg-white text-black flex items-center justify-center gap-3 py-2 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <FcGoogle className="text-xl" />
          <span className="font-medium">Sign up with Google</span>
        </button>
      </div>

      {/* ✨ Star Animation CSS */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.9; }
        }
        @keyframes drift {
          0% { transform: translateX(0); }
          100% { transform: translateX(100vw); }
        }
        .animate-star {
          animation: blink 3s ease-in-out infinite, drift linear infinite;
        }
        .font-poppins {
          font-family: 'Poppins', 'Segoe UI', sans-serif;
        }
      `}</style>
    </div>
  );
}
