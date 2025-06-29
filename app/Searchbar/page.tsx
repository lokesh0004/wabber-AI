'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
    return new Promise(resolve =>
      setTimeout(() => resolve(`AI response for: "${q}"`), 1000)
    );
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setTypedResponse('');
    const result: any = await fetchAIResponse(query);
    setFullResponse(result);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const stars = useMemo(() => {
    return [...Array(200)].map((_, i) => {
      const size = Math.random() * 2 + 1;
      const top = `${Math.random() * 100}%`;
      const delay = Math.random() * 5;
      const duration = 10 + Math.random() * 10;
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
    });
  }, []);

  return (
    <div className={`relative min-h-screen transition-colors duration-500 overflow-hidden ${darkMode ? 'bg-black' : 'bg-gray-100'}`}>

      {darkMode && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {stars}
        </div>
      )}

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-6 right-6 z-50 p-2 rounded-full border transition-transform duration-300 
          bg-white/10 border-white/10 hover:scale-110"
      >
        {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
      </button>

      <div className="flex justify-center items-center h-screen relative z-10 px-4">
        <div className="w-full max-w-xl text-center">
          <div className="flex items-center gap-4 px-6 py-4 rounded-full border backdrop-blur-lg
            bg-white/10 border-white/20 shadow-2xl text-white">
            <Search />
            <input
              type="text"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setTypedResponse('');
                setFullResponse('');
                setShowSuggestions(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholderText}
              className="w-full bg-transparent outline-none placeholder-white/50 text-white"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-1.5 rounded-full font-medium text-white shadow-lg"
            >
              Search
            </button>
          </div>

          {typedResponse && (
            <div className="mt-6 bg-white/10 text-white p-6 rounded-xl border border-white/20 backdrop-blur-xl shadow-2xl">
              <h3 className="mb-2 font-bold text-lg">AI Response:</h3>
              <p className="whitespace-pre-line leading-relaxed">{typedResponse}</p>
            </div>
          )}
        </div>
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
          100% { transform: translateX(100vw); opacity: 0; }
        }
        .animate-star {
          animation: blink 2.5s ease-in-out infinite, driftRight linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
