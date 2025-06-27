'use client';

import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun } from 'lucide-react';

const SearchBar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState('');
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [fullResponse, setFullResponse] = useState('');
  const [typedResponse, setTypedResponse] = useState('');

  const placeholders = [
    'Search anything...',
    'Ask me anything...',
    'Your smart AI awaits...',
    'Explore the unknown...'
  ];

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

  const fetchAIResponse = async (q: string) => {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q }),
    });
    const data = await res.json();
    return data.result || 'No response';
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setTypedResponse('');
    const result = await fetchAIResponse(query);
    setFullResponse(result);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`relative h-[200vh] transition-colors duration-500 overflow-hidden
      ${darkMode
        ? 'bg-black'
        : 'bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 animate-bgSlow'}`}>

      {darkMode && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(520)].map((_, i) => {
            const size = Math.random() * 1.5 + 1;
            const top = `${Math.random() * 100}%`;
            const delay = Math.random() * 10;
            const duration = 15 + Math.random() * 10;
            return (
              <div
                key={i}
                className="absolute bg-white/30 rounded-full animate-star"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top,
                  left: '-5%',
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {!darkMode && (
        <>
          <div className="absolute w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-40 top-40 left-10 animate-blob" />
          <div className="absolute w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-40 bottom-20 right-10 animate-blob animation-delay-2" />
          <div className="absolute w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30 top-[60%] left-[40%] animate-blob animation-delay-4" />
        </>
      )}

      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-6 right-6 z-50 p-2 rounded-full transition-transform duration-300 border
          ${darkMode
            ? 'bg-white/10 border-white/10 hover:scale-110'
            : 'bg-white shadow-md border-gray-200 hover:scale-110 hover:shadow-lg'}`}
      >
        {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
      </button>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-full max-w-xl px-4 text-center">
        <div className={`relative flex items-center gap-4 px-5 py-3 rounded-full backdrop-blur-xl transition-all
          ${darkMode
            ? 'bg-white/10 border border-white/10 shadow-[0_4px_30px_rgba(255,255,255,0.1)]'
            : 'bg-white/90 border border-gray-200 shadow-xl hover:shadow-2xl'}`}>
          <Search className={`${darkMode ? 'text-white' : 'text-purple-500'} opacity-90`} size={22} />

          <input
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setTypedResponse('');
              setFullResponse('');
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholderText}
            className={`w-full bg-transparent outline-none placeholder-gray-400 text-base tracking-wide
              ${darkMode ? 'text-white' : 'text-gray-800'}`}
          />

          <button
            onClick={handleSearch}
            className={`px-4 py-1.5 rounded-full font-medium text-sm transition-all shadow-md
              ${darkMode
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white shadow-lg'}`}
          >
            Search
          </button>

          {showSuggestions && query && (
            <div className="absolute top-full left-0 mt-3 w-full z-50 text-left animate-fadeInUp">
              <div className={`backdrop-blur-xl rounded-xl shadow-xl overflow-hidden border
                ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white/95 border-gray-200'}`}>
                {[
                  { title: `Search for “${query}”`, subtitle: 'Web results for this query' },
                  { title: `Ask AI: “${query}”`, subtitle: 'Smart answer by AI' },
                  { title: `Learn: “${query}”`, subtitle: 'Explore knowledge and facts' }
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`px-5 py-3 transition-all cursor-pointer border-b last:border-none group
                      ${darkMode 
                        ? 'hover:bg-white/10 border-white/10 text-white' 
                        : 'hover:bg-purple-50/80 border-gray-200 text-gray-800'}`}
                  >
                    <div>
                      <p className="font-semibold text-sm leading-snug">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className={`mt-2 text-[11px] italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Data may be inaccurate as this is an AI-powered chatbot.
        </p>

        {typedResponse && (
          <div className="mt-8 max-w-2xl mx-auto px-6 animate-fadeIn">
            <div className={`relative p-5 rounded-2xl border backdrop-blur-md transition-all duration-500 group
              ${darkMode
                ? 'bg-white/5 border-white/10 text-white shadow-[0_8px_30px_rgba(255,255,255,0.05)]'
                : 'bg-white border-gray-200 text-gray-800 shadow-xl hover:shadow-2xl'}`}>
              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: 'linear-gradient(135deg, #e0c3fc, #8ec5fc)' }} />
              <div className="flex items-center gap-2 mb-3 z-10 relative">
                <span className="text-xs font-semibold tracking-wider uppercase opacity-60">AI Response</span>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              </div>
              <div className="whitespace-pre-line text-base leading-relaxed relative z-10 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent">
                <span>{typedResponse}</span>
                <span className="animate-pulse inline-block w-1 h-4 bg-purple-400 ml-1 rounded-sm" />
              </div>
            </div>
          </div>
        )}
      </div>

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
        @keyframes bgSlowMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes blob {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-star {
          animation: blink 3s ease-in-out infinite, driftRight linear infinite;
        }
        .animate-bgSlow {
          background-size: 300% 300%;
          animation: bgSlowMove 40s ease infinite;
        }
        .animate-blob {
          animation: blob 15s infinite ease-in-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
