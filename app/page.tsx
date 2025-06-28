"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex items-center justify-center p-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="max-w-2xl text-center bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl relative z-10"
      >
        <div className="flex justify-center mb-4">
          <FaRobot className="text-4xl text-cyan-300 animate-pulse" />
        </div>

        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
          Webber AI
        </h1>

        <p className="mt-4 text-gray-200 text-lg">
          Your intelligent AI assistant — always ready to answer, guide, and empower.
          Experience the future of conversation.
        </p>

        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/signin"
              className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition-all hover:opacity-90"
            >
              Sign In
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/signup"
              className="inline-block bg-gradient-to-r from-pink-400 to-red-500 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition-all hover:opacity-90"
            >
              Sign Up
            </Link>
          </motion.div>
        </div>

        <p className="text-sm text-gray-400 mt-4">
          Get started for free — no card required
        </p>
      </motion.div>
    </div>
  );
}
