'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';

export default function LandingPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [avatar, setAvatar] = useState<string | null>(null);

  const features = [
    {
      icon: '🤖',
      title: lang === 'en' ? 'Smart Answers' : 'स्मार्ट उत्तर',
      desc:
        lang === 'en'
          ? 'Powered by AI for accurate insights.'
          : 'सटीक उत्तरों के लिए एआई द्वारा संचालित।',
    },
    {
      icon: '🔒',
      title: lang === 'en' ? 'Secure & Private' : 'सुरक्षित और निजी',
      desc:
        lang === 'en'
          ? 'Your data stays encrypted.'
          : 'आपका डेटा एन्क्रिप्टेड रहता है।',
    },
    {
      icon: '⚡',
      title: lang === 'en' ? 'Lightning Speed' : 'बिजली जैसी गति',
      desc:
        lang === 'en'
          ? 'Instant responses every time.'
          : 'हर बार त्वरित उत्तर।',
    },
  ];

  const testimonials = [
    {
      name: 'Alex',
      text:
        lang === 'en'
          ? '“Webber AI transformed my workflow!”'
          : '“Webber AI ने मेरा कार्यप्रवाह बदल दिया!”',
    },
    {
      name: 'Priya',
      text:
        lang === 'en'
          ? '“So intuitive and fast!”'
          : '“बहुत सहज और तेज़ है!”',
    },
    {
      name: 'Rahul',
      text:
        lang === 'en'
          ? '“Amazing design and support.”'
          : '“कमाल का डिज़ाइन और समर्थन।”',
    },
  ];

  const [ti, setTi] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setTi((ti + 1) % testimonials.length), 5000);
    return () => clearTimeout(t);
  }, [ti, testimonials.length]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.play().catch(() => null);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[url('/stars.png')] bg-cover bg-center mix-blend-screen"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 30, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 bg-[url('/clouds.png')] bg-cover bg-center opacity-20"
          animate={{ x: [0, -50, 0] }}
          transition={{ duration: 60, repeat: Infinity }}
        />
      </div>

      <audio ref={audioRef} src="/voice-intro.mp3" hidden />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6"
      >
        <FaRobot className="text-4xl text-cyan-300 animate-pulse" />
        <h1 className="mt-4 text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
         Webber AI ❤
        </h1>
        <p className="mt-4 text-lg text-gray-200 text-center max-w-lg">
          {lang === 'en'
            ? 'Your intelligent AI assistant — always ready to answer, guide, and empower.'
            : 'आपका बुद्धिमान एआई सहायक — जो हमेशा उत्तर देने, मार्गदर्शन करने और सशक्त बनाने के लिए तैयार है।'}
        </p>

        {/* Language Toggle */}
        <div className="mt-6 flex items-center space-x-4">
          {['en', 'hi'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l as any)}
              className={`px-3 py-1 rounded ${
                lang === l ? 'bg-white' : 'bg-white/30'
              } text-black transition`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 flex space-x-6">
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/signin"
            className="bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 rounded-xl font-semibold shadow-lg"
          >
            {lang === 'en' ? 'Sign In' : 'साइन इन करें'}
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/signup"
            className="bg-gradient-to-r from-pink-400 to-red-500 px-6 py-3 rounded-xl font-semibold shadow-lg"
          >
            {lang === 'en' ? 'Sign Up' : 'साइन अप करें'}
          </motion.a>
        </div>

        <p className="mt-4 text-sm text-gray-400">
          {lang === 'en'
            ? 'Get started for free — no card required'
            : 'बिना कार्ड के मुफ्त में शुरू करें'}
        </p>

        {/* Avatar Upload */}
        <div className="mt-8">
          <label className="flex items-center space-x-2 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              {avatar ? (
                <img
                  src={avatar}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                '📸'
              )}
            </div>
            <span className="text-gray-300">
              {lang === 'en' ? 'Upload Avatar' : 'अपना अवतार अपलोड करें'}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setAvatar(URL.createObjectURL(file));
              }}
              className="hidden"
            />
          </label>
        </div>
      </motion.div>

      {/* Feature Highlights */}
      <section className="relative z-10 bg-white/10 backdrop-blur-lg py-16 px-6">
        <h2 className="text-center text-2xl font-bold mb-8">
          {lang === 'en' ? 'Core Features' : 'मुख्य विशेषताएँ'}
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="w-60 bg-white/20 rounded-xl p-6 shadow-lg text-center"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-16 px-6">
        <h2 className="text-center text-2xl font-bold mb-8">
          {lang === 'en' ? 'What users say' : 'उपयोगकर्ताओं की राय'}
        </h2>
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={ti}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-md text-center bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
              <p className="italic">"{testimonials[ti].text}"</p>
              <p className="mt-4 font-semibold">— {testimonials[ti].name}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
