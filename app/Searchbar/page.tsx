'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Mic, Moon, Sun, ClipboardList, HelpCircle, Loader2 } from 'lucide-react';

const SearchBar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState('');
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [fullResponse, setFullResponse] = useState('');
  const [typedResponse, setTypedResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [showHelp, setShowHelp] = useState(false);

  const placeholders = [
    'Search anything...',
    'Ask me anything...',
    'Your smart AI awaits...',
    'Explore the unknown...',
  ];

  const stars = useMemo(() => {
    return [...Array(200)].map((_, i) => {
      const size = Math.random() * 1.5 + 1;
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const duration = 20 + Math.random() * 10;
      const delay = Math.random() * 5;
      return { id: i, size, top, left, duration, delay };
    });
  }, []);

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

  useEffect(() => {
    let i = 0;
    let timeout: NodeJS.Timeout;
    const type = () => {
      if (i <= fullResponse.length) {
        setTypedResponse(fullResponse.slice(0, i));
        i++;
        timeout = setTimeout(type, 20);
      }
    };
    if (fullResponse) type();
    return () => clearTimeout(timeout);
  }, [fullResponse]);

  useEffect(() => {
    const saved = localStorage.getItem('queryHistory');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

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
    setTypedResponse('');
    setFullResponse('');
    setIsLoading(true);
    const result = await fetchAIResponse(query);
    setFullResponse(result);
    setHistory(prev => {
      const updated = [query, ...prev.slice(0, 4)];
      localStorage.setItem('queryHistory', JSON.stringify(updated));
      return updated;
    });
    setShowSuggestions(false);
  };

  const startListening = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
    };
    recognition.start();
  };

  return (
    <div className={`${darkMode ? 'bg-black' : 'bg-white'} relative min-h-screen overflow-hidden transition-all font-[General Sans]`}>

      {/* Branding */}
      <h1 className={`fixed top-6 left-6 z-50 text-[1.3rem] sm:text-2xl font-semibold tracking-tight
        bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 text-transparent bg-clip-text
        drop-shadow-[0_1px_4px_rgba(0,255,255,0.15)]`}>
        Webber AI 
      </h1>

      {/* Dark Mode Background */}
      {darkMode && (
        <>
          <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] opacity-80 animate-aurora" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.015)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {stars.map(star => (
              <div key={star.id} className="absolute bg-white/30 rounded-full animate-star"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  top: star.top,
                  left: star.left,
                  animationDuration: `${star.duration}s`,
                  animationDelay: `${star.delay}s`,
                }} />
            ))}
          </div>
        </>
      )}

      {/* Light Mode Background */}
      {!darkMode && (
        <div className="absolute inset-0 z-0 overflow-hidden animate-bgSlow pastel-gradient">
          <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-pink-200 opacity-40 blur-3xl rounded-full animate-floatX" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[300px] h-[300px] bg-purple-200 opacity-40 blur-2xl rounded-full animate-floatY" />
          <div className="absolute top-[30%] left-[35%] w-[500px] h-[500px] bg-blue-200 opacity-30 blur-2xl rounded-full animate-blob" />
        </div>
      )}

      {/* Toggle and Help */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-white/10 border border-white/10 hover:scale-110 transition">
          {darkMode ? <Sun className="text-yellow-300" /> : <Moon className="text-gray-800" />}
        </button>
        <button onClick={() => setShowHelp(!showHelp)} className="p-2 rounded-full bg-white/10 border border-white/10 hover:scale-110 transition">
          <HelpCircle className="text-white" />
        </button>
      </div>

      {showHelp && (
        <div className="fixed top-20 right-6 bg-white/10 backdrop-blur-md text-white p-4 rounded-xl shadow-xl z-50 border border-white/20 text-sm w-64">
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
        <div className={`flex items-center gap-4 px-5 py-3 rounded-full backdrop-blur-xl transition shadow-lg border
          ${darkMode ? 'bg-white/10 border-white/10 text-white neon-glow' : 'bg-white/90 border-gray-200 text-gray-800'}`}>
          <Search size={22} />
          <input
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setTypedResponse('');
              setFullResponse('');
              setShowSuggestions(true);
            }}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder={placeholderText}
            className="w-full bg-transparent outline-none placeholder-gray-400 text-base tracking-wide"
          />
          <Mic className="cursor-pointer hover:scale-110" onClick={startListening} />
          <button
            onClick={handleSearch}
            className="px-4 py-1.5 rounded-full font-medium text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 shadow-md"
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
          <div className="mt-8 bg-white/5 backdrop-blur-md p-5 rounded-xl shadow-lg border border-white/10 text-white relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs opacity-60">AI Response</span>
              <ClipboardList onClick={() => navigator.clipboard.writeText(typedResponse)} className="cursor-pointer text-green-400" size={16} />
            </div>
            <pre className="whitespace-pre-line max-h-64 overflow-y-auto">{typedResponse}</pre>
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.9; }
        }
        @keyframes driftRight {
          0% { transform: translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(110vw); opacity: 0; }
        }
        @keyframes aurora {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-star {
          animation: blink 3s ease-in-out infinite, driftRight linear infinite;
        }
        .animate-aurora {
          background-size: 300% 300%;
          animation: aurora 60s ease infinite;
        }
        .neon-glow {
          box-shadow: 0 0 8px rgba(0, 200, 255, 0.6), 0 0 16px rgba(100, 255, 255, 0.3);
        }
        @keyframes floatX {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(30px); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-40px); }
        }
        @keyframes blob {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-floatX { animation: floatX 40s ease-in-out infinite; }
        .animate-floatY { animation: floatY 50s ease-in-out infinite; }
        .animate-blob { animation: blob 60s ease-in-out infinite; }
        .animate-bgSlow {
          background: conic-gradient(from 180deg, #fdfbfb, #a1c4fd, #c2e9fb, #fbc2eb, #fdfbfb);
          background-size: 300% 300%;
          animation: aurora 90s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
