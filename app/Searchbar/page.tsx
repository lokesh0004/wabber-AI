'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Mic, Moon, Sun, ClipboardList, HelpCircle, Loader2 } from 'lucide-react';

const SearchBar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState('');
  const [query, setQuery] = useState('');
  const [fullResponse, setFullResponse] = useState('');
  const [typedResponse, setTypedResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const placeholders = [
    'Search anything...',
    'Ask me anything...',
    'Your smart AI awaits...',
    'Explore the unknown...',
  ];

  const stars = useMemo(() =>
    [...Array(200)].map((_, i) => ({
      id: i,
      size: Math.random() * 1.5 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 20 + Math.random() * 10,
      delay: Math.random() * 5,
    }))
  , []);

  useEffect(() => {
    let char = 0;
    let timeout: NodeJS.Timeout;
    const type = () => {
      if (char <= placeholders[placeholderIndex].length) {
        setPlaceholderText(placeholders[placeholderIndex].slice(0, char));
        char++;
        timeout = setTimeout(type, 70);
      } else {
        setTimeout(() => setPlaceholderIndex(i => (i + 1) % placeholders.length), 2000);
      }
    };
    type();
    return () => clearTimeout(timeout);
  }, [placeholderIndex]);

  const fetchAIResponse = async (q: string) => {
    setIsLoading(true);
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q }),
    });
    const data = await res.json();
    setIsLoading(false);
    return data.result || 'No response';
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setFullResponse('');
    setTypedResponse('');
    setIsLoading(true);
    const result = await fetchAIResponse(query);
    setFullResponse(result);
    setIsLoading(false);
  };

  const startListening = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (e: any) => setQuery(e.results[0][0].transcript);
    recognition.start();
  };

  return (
    <div className={`${darkMode ? 'bg-black' : 'bg-white'} relative min-h-screen overflow-hidden transition-all`}>
      {/* Branding */}
      <h1 className="fixed top-6 left-6 z-50 text-xl sm:text-2xl font-extrabold tracking-tight
         bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text
         drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)] animate-gradientText">
        Webber AI
      </h1>

      {/* Dark Mode Background */}
      {darkMode && (
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] opacity-80 animate-aurora" />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {stars.map(star => (
              <div
                key={star.id}
                className="absolute bg-white/30 rounded-full animate-star"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  top: star.top,
                  left: star.left,
                  animationDuration: `${star.duration}s`,
                  animationDelay: `${star.delay}s`,
                }}
              />
            ))}
            {/* Orbit rings */}
            <div className="absolute w-[300px] h-[300px] border-[1.5px] border-cyan-400/30 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow" />
            <div className="absolute w-[450px] h-[450px] border-[1px] border-purple-500/20 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slower" />
            {/* Meteors */}
            <div className="absolute w-1 h-1 bg-white rounded-full top-[40%] left-[10%] animate-meteor" />
            <div className="absolute w-1 h-1 bg-white rounded-full top-[10%] left-[80%] animate-meteor2" />
          </div>
        </>
      )}

      {/* Light Mode Background */}
      {!darkMode && (
        <div className="absolute inset-0 overflow-hidden animate-bgSlow pastel-gradient">
          <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-pink-200 opacity-40 blur-3xl rounded-full animate-floatX" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[300px] h-[300px] bg-purple-200 opacity-40 blur-2xl rounded-full animate-floatY" />
          <div className="absolute top-[30%] left-[35%] w-[500px] h-[500px] bg-blue-200 opacity-30 blur-2xl rounded-full animate-blob" />
        </div>
      )}

      {/* Toggle & Help */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-white/10 border-white/10 hover:scale-110 transition"
        >
          {darkMode ? <Sun className="text-yellow-300" /> : <Moon className="text-gray-800" />}
        </button>
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="p-2 rounded-full bg-white/10 border-white/10 hover:scale-110 transition"
        >
          <HelpCircle className="text-white" />
        </button>
      </div>

      {/* Help Popup */}
      {showHelp && (
        <div className="fixed top-20 right-6 bg-white/10 backdrop-blur-md text-white p-4 rounded-xl shadow-xl z-50 border-white/20 text-sm w-64">
          <h3 className="font-semibold mb-2">Shortcuts</h3>
          <ul className="space-y-1">
            <li><kbd className="bg-white/20 px-1">Enter</kbd> — Search</li>
            <li><kbd className="bg-white/20 px-1">🎙️</kbd> — Voice Input</li>
            <li><kbd className="bg-white/20 px-1">📋</kbd> — Copy Answer</li>
          </ul>
        </div>
      )}

      {/* Search Bar */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 w-full max-w-xl px-4">
        <div className={`flex items-center gap-4 px-5 py-3 rounded-full backdrop-blur-xl shadow-lg border
          ${darkMode ? 'bg-white/10 border-white/10 text-white neon-glow' : 'bg-white/90 border-gray-200 text-gray-800'}`}>
          <Search size={22} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder={placeholderText}
            className="w-full bg-transparent outline-none placeholder-gray-400 text-base tracking-wide"
          />
          <Mic className="cursor-pointer hover:scale-110" onClick={startListening} />
          <button
            onClick={handleSearch}
            className="px-4 py-1.5 rounded-full font-medium text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
          >
            Search
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center mt-8">
            <Loader2 className="animate-spin text-purple-400" size={32} />
          </div>
        )}

        {typedResponse && (
          <div className="mt-8 bg-white/5 backdrop-blur-md p-5 rounded-xl shadow-lg border-white/10 text-white relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs opacity-60">AI Response</span>
              <ClipboardList onClick={() => navigator.clipboard.writeText(typedResponse)} className="cursor-pointer text-green-400" size={16} />
            </div>
            <pre className="whitespace-pre-line max-h-64 overflow-y-auto">{typedResponse}</pre>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        /* keyframes & classes for animations here */
      `}</style>
    </div>
  );
};

export default SearchBar;
