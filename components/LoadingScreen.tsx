
import * as React from 'react';
import { useEffect, useState } from 'react';

const LoadingScreen: React.FC<{ message: string }> = ({ message }) => {
  const [log, setLog] = useState<string[]>([]);
  
  useEffect(() => {
    const logs = [
      "Initializing connection...",
      "Bypassing firewall...",
      "Accessing GitHub mainframe...",
      "Decrypting user nodes...",
      "Analyzing commit history...",
      "Calculating power coefficient...",
      "Generating neural profile...",
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setLog(prev => [...prev.slice(-4), logs[i]]);
        i++;
      }
    }, 600);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 border border-cyber-green/30 bg-cyber-dark/80 rounded backdrop-blur-sm max-w-xl mx-auto mt-10">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-cyber-green/20 rounded-full"></div>
        <div className="absolute inset-0 border-t-4 border-cyber-green rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-b-4 border-cyber-pink rounded-full animate-spin-slow"></div>
        <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-cyber-cyan animate-pulse">
          LOADING
        </div>
      </div>
      
      <div className="font-display text-2xl text-cyber-green mb-4 animate-pulse">
        {message}
      </div>
      
      <div className="w-full font-mono text-xs text-cyber-cyan/70 bg-black/50 p-4 rounded border border-cyber-cyan/20 h-32 overflow-hidden flex flex-col justify-end">
        {log.map((line, idx) => (
          <div key={idx} className="truncate">
            <span className="text-cyber-pink mr-2">{">"}</span>
            {line}
          </div>
        ))}
        <div className="animate-pulse text-cyber-green">_</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
