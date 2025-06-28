'use client';
import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      alert("Signed up with Google!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl max-w-md w-full border border-white/20">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-center animate-pulse">
          Create Account 🚀
        </h1>

        <p className="text-sm text-gray-200 text-center mt-2 mb-6">
          Join our community and explore unlimited possibilities
        </p>

        {error && (
          <p className="text-red-500 text-sm bg-white/20 p-2 rounded text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="text-sm text-gray-100">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
              className="mt-1 w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-100">Confirm Password</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transform transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center gap-2 my-6">
          <div className="h-px flex-1 bg-white/30" />
          <p className="text-sm text-white/70">OR</p>
          <div className="h-px flex-1 bg-white/30" />
        </div>

        <button
          onClick={handleGoogleSignUp}
          className="w-full bg-white text-black flex items-center justify-center gap-3 py-2 rounded-xl shadow-md hover:shadow-lg transition"
        >
          <FcGoogle className="text-xl" />
          <span className="font-medium">Sign up with Google</span>
        </button>
      </div>
    </div>
  );
}
