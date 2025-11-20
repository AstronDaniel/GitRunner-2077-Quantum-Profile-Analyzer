
import * as React from 'react';
import { useState, useEffect } from 'react';
import { ChevronRight, Disc, Activity, Wifi, Lock, Zap } from 'lucide-react';

interface TerminalInputProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

const TerminalInput: React.FC<TerminalInputProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [randomCoords, setRandomCoords] = useState('34.88.12');

  // Effect to generate random tech-looking coordinates
  useEffect(() => {
    const interval = setInterval(() => {
      setRandomCoords(`${Math.floor(Math.random() * 99)}.${Math.floor(Math.random() * 99)}.${Math.floor(Math.random() * 99)}`);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-16 relative z-20 group">
      
      {/* Animated background glow behind input */}
      <div className={`absolute -inset-10 bg-cyber-green/20 blur-3xl rounded-full transition-opacity duration-700 ${isFocused ? 'opacity-100' : 'opacity-0'}`}></div>

      {/* Top Decorations */}
      <div className="flex justify-between items-end mb-2 px-4">
        <div className="flex items-center gap-2 text-[10px] font-tech text-cyber-cyan/70 tracking-widest uppercase">
           <Wifi size={12} className={isFocused ? 'animate-pulse text-cyber-green' : ''} />
           <span>Signal: Strong</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-tech text-cyber-pink/70 tracking-[0.2em] uppercase">
           <span className="animate-pulse">Target_Lock: {isFocused ? 'ENGAGED' : 'STANDBY'}</span>
           <span>Coords: [{randomCoords}]</span>
        </div>
      </div>

      {/* Main Input Container */}
      <form 
        onSubmit={handleSubmit}
        className="relative"
      >
        {/* Rotating Borders (pseudo-3d effect) */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-cyber-green to-transparent rounded-lg opacity-20"></div>
        <div className={`absolute -inset-0.5 rounded-lg bg-gradient-to-r from-cyber-green via-cyber-cyan to-cyber-pink opacity-0 transition-opacity duration-300 ${isFocused ? 'opacity-100 blur-sm' : ''}`}></div>

        <div className="relative bg-black/80 backdrop-blur-md border border-cyber-green/30 clip-path-tech p-1 shadow-2xl">
           
           <div className="flex items-stretch h-20">
              
              {/* Left Status Module */}
              <div className="w-16 flex flex-col items-center justify-center border-r border-cyber-green/20 bg-cyber-green/5 gap-2">
                <Disc size={20} className={`text-cyber-green ${isLoading ? 'animate-spin' : isFocused ? 'animate-spin-slow' : ''}`} />
                <div className="h-8 w-1 bg-cyber-green/20 relative overflow-hidden rounded-full">
                   <div className="absolute bottom-0 left-0 w-full bg-cyber-green animate-pulse" style={{ height: '60%' }}></div>
                </div>
              </div>

              {/* Input Field */}
              <div className="flex-1 relative flex flex-col justify-center px-6">
                <label className="text-[10px] text-cyber-green/50 font-mono mb-1 flex items-center gap-2 uppercase tracking-widest">
                   {isFocused && <Activity size={10} className="animate-pulse"/>}
                   Enter Github User Identity
                </label>
                <div className="flex items-center">
                  <span className="text-cyber-green text-2xl mr-2 font-display">{">"}</span>
                  <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      disabled={isLoading}
                      className="w-full bg-transparent border-none outline-none text-white font-display text-3xl tracking-wide placeholder-gray-800 uppercase selection:bg-cyber-pink selection:text-white"
                      placeholder="USERNAME"
                      autoFocus
                      spellCheck={false}
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="pr-2 py-2 flex items-center">
                <button 
                    type="submit" 
                    disabled={isLoading || !input}
                    className={`
                      h-full px-8 font-display font-bold tracking-wider transition-all duration-300 clip-path-button flex items-center gap-2 uppercase text-sm
                      ${isLoading 
                        ? 'bg-cyber-dark text-gray-500 cursor-not-allowed border border-gray-800' 
                        : input 
                          ? 'bg-cyber-green text-black hover:bg-cyber-cyan hover:scale-105 hover:shadow-[0_0_20px_rgba(0,243,255,0.6)]' 
                          : 'bg-cyber-dark/50 text-gray-500 border border-cyber-green/30 hover:border-cyber-green hover:text-cyber-green'}
                    `}
                >
                  {isLoading ? (
                    <>SCANNING...</>
                  ) : (
                    <>
                      <span className="hidden sm:inline">INITIATE</span>
                      <Zap size={18} className={input ? "fill-current" : ""} />
                    </>
                  )}
                </button>
              </div>
           </div>

           {/* Bottom Progress Bar Decoration */}
           <div className="absolute bottom-0 left-0 w-full h-1 bg-cyber-dark flex">
              <div className="h-full bg-cyber-green w-[10%]"></div>
              <div className="h-full bg-transparent w-[2%]"></div>
              <div className={`h-full bg-cyber-cyan transition-all duration-1000 ${isFocused ? 'w-[60%]' : 'w-[20%]'}`}></div>
              <div className="h-full bg-transparent w-[2%]"></div>
              <div className="h-full bg-cyber-pink w-[10%] ml-auto"></div>
           </div>
        </div>

        {/* Decorative HUD Lines underneath */}
        <div className="absolute -bottom-6 left-4 right-4 flex justify-between text-[10px] font-mono text-cyber-green/30">
           <span className="flex items-center gap-1">
             <div className="w-2 h-2 bg-cyber-green/50 rounded-full"></div>
             SECURE CONNECTION
           </span>
           <span className="tracking-[0.5em]">////////////////</span>
           <span>V.2.5.0</span>
        </div>
      </form>
    </div>
  );
};

export default TerminalInput;
