
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Terminal, Shield, Cpu, Zap } from 'lucide-react';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [showButton, setShowButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const bootSequence = [
    "INITIALIZING GIT_RUNNER KERNEL v20.77...",
    "CHECKING BIOMETRICS... [BYPASSED]",
    "ALLOCATING NEURAL MEMORY... 2048TB OK",
    "LOADING GITHUB PROTOCOLS... OK",
    "CONNECTING TO SATELLITE LINK... SECURE",
    "DECRYPTING USER DATABASE...",
    "COMPILING GLOBAL RANKING ALGORITHMS...",
    "SYSTEM INTEGRITY: 100%",
    "READY FOR INPUT."
  ];

  useEffect(() => {
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < bootSequence.length) {
        setLines(prev => [...prev, bootSequence[lineIndex]]);
        lineIndex++;
        // Auto scroll
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 500);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-cyber-black z-[100] flex flex-col items-center justify-center font-mono text-sm md:text-base overflow-hidden">
      {/* Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none z-20"></div>
      
      <div className="relative z-30 w-full max-w-2xl p-8 border-x border-cyber-green/20 h-[60vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-cyber-green/40 pb-2 mb-4 text-cyber-green/60 text-xs tracking-widest">
          <span>BOOT_SEQUENCE.EXE</span>
          <span>MEM: 64GB</span>
        </div>

        {/* Terminal Text */}
        <div ref={containerRef} className="flex-grow overflow-y-auto space-y-2 scrollbar-hide">
          {lines.map((line, i) => (
            <div key={i} className={`${i === lines.length - 1 ? 'text-white' : 'text-cyber-green'} font-mono`}>
              <span className="mr-2 opacity-50">[{new Date().toLocaleTimeString()}]</span>
              <span className="mr-2">{">"}</span>
              {line}
            </div>
          ))}
          <div className="animate-pulse text-cyber-green mt-2">_</div>
        </div>
      </div>

      {/* Action Area */}
      <div className="relative z-30 h-32 flex flex-col items-center justify-center">
        {showButton && (
          <div className="animate-fade-in-up flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-green via-white to-cyber-cyan mb-6 drop-shadow-[0_0_15px_rgba(0,255,65,0.8)]">
              GIT_RUNNER
            </h1>
            
            <button 
              onClick={onComplete}
              className="group relative px-12 py-4 bg-cyber-green/10 overflow-hidden border border-cyber-green hover:bg-cyber-green/20 transition-all duration-300"
            >
              <div className="absolute inset-0 w-1 bg-cyber-green group-hover:w-full transition-all duration-300 opacity-20"></div>
              <span className="relative flex items-center gap-3 text-cyber-green font-display tracking-[0.2em] group-hover:text-white group-hover:font-bold transition-colors">
                <Zap size={18} /> INITIALIZE SYSTEM
              </span>
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyber-green"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyber-green"></div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroScreen;
