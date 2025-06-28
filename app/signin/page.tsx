'use client';
import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signed in!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      alert("Signed in with Google!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1c2c] to-[#928DAB] flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl max-w-md w-full border border-white/20">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent text-center animate-pulse">
          Sign In 🙏
        </h1>

        <p className="text-sm text-gray-200 text-center mt-2 mb-6">
          Sign in to continue to your dashboard
        </p>

        {error && (
          <p className="text-red-500 text-sm bg-white/20 p-2 rounded text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleEmailSignIn} className="space-y-5">
          <div>
            <label className="text-sm text-gray-100">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-100">Password</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transform transition duration-200"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center gap-2 my-6">
          <div className="h-px flex-1 bg-white/30" />
          <p className="text-sm text-white/70">OR</p>
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
    </div>
  );
}
