'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { Loader2 } from 'lucide-react';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/Searchbar');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/Searchbar');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Glowing Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(100)].map((_, i) => {
          const size = Math.random() * 1.5 + 1;
          const top = `${Math.random() * 100}%`;
          const left = `${Math.random() * 100}%`;
          const duration = 20 + Math.random() * 10;
          const delay = Math.random() * 5;
          return (
            <div
              key={i}
              className="absolute bg-white/20 rounded-full animate-star"
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

      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-2xl shadow-2xl">
        <h1 className="text-center text-4xl font-extrabold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text animate-glow">
          Webber AI
        </h1>

        <p className="text-center text-sm text-white/60 mt-2 mb-6">
          Sign in to your cosmic journey ✨
        </p>

        {error && (
          <p className="text-red-400 text-sm bg-white/10 rounded p-2 mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleEmailSignIn} className="space-y-5">
          <div>
            <label className="text-sm text-white/80">Email</label>
            <input
              type="email"
              required
              className="mt-1 w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-white/80">Password</label>
            <input
              type="password"
              required
              className="mt-1 w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold py-2 rounded-xl hover:opacity-90 shadow-md transition"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin mx-auto" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-white/30" />
          <p className="text-sm text-white/50">or</p>
          <div className="h-px flex-1 bg-white/30" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white text-black flex items-center justify-center gap-3 py-2 rounded-xl shadow-md hover:shadow-lg transition"
        >
          <FcGoogle className="text-xl" />
          <span className="font-medium">Sign in with Google</span>
        </button>
      </div>

      {/* Styles for star animation */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.9; }
        }
        @keyframes driftRight {
          0% { transform: translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(100vw); opacity: 0; }
        }
        .animate-star {
          animation: blink 3s ease-in-out infinite, driftRight linear infinite;
        }
        .animate-glow {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.4), 0 0 20px rgba(173, 216, 230, 0.4);
        }
      `}</style>
    </div>
  );
}
