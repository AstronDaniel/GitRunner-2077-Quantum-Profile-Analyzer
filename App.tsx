
import * as React from 'react';
import { useState } from 'react';
import TerminalInput from './components/TerminalInput';
import Dashboard from './components/Dashboard';
import ComparisonView from './components/ComparisonView';
import LoadingScreen from './components/LoadingScreen';
import IntroScreen from './components/IntroScreen';
import { fetchGithubProfile } from './services/githubService';
import { analyzeProfileWithGemini } from './services/geminiService';
import { AppState } from './types';
import { AlertTriangle, Wifi, Terminal } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    status: 'INTRO',
    mode: 'SINGLE',
    profile: null,
    analysis: null,
    error: null,
    comparison: null
  });

  const handleIntroComplete = () => {
    setState(prev => ({ ...prev, status: 'IDLE' }));
  };

  const handleSearch = async (username: string) => {
    setState(prev => ({ ...prev, status: 'FETCHING_GITHUB', error: null }));
    
    try {
      // 1. Fetch GitHub Data
      const profile = await fetchGithubProfile(username);
      
      setState(prev => ({ ...prev, status: 'ANALYZING_AI' })); // Keep profile in background if needed but not set yet
      
      // 2. Analyze with Gemini
      const analysis = await analyzeProfileWithGemini(profile);

      // Handle Modes
      if (state.mode === 'COMPARE_SEARCH' && state.profile && state.analysis) {
          // We are fetching the second profile
          setState(prev => ({
             ...prev,
             status: 'SUCCESS',
             mode: 'COMPARE_VIEW',
             comparison: { profile, analysis }
          }));
      } else {
          // Single mode or first fetch
          setState({
            status: 'SUCCESS',
            mode: 'SINGLE',
            profile,
            analysis,
            error: null,
            comparison: null
          });
      }
    } catch (err: any) {
      let errorMessage = "UNKNOWN_SYSTEM_FAILURE";
      if (err.message === "TARGET_NOT_FOUND") errorMessage = "TARGET_NOT_FOUND: USER DOES NOT EXIST";
      else if (err.message === "CONNECTION_REFUSED") errorMessage = "CONNECTION_REFUSED: API RATE LIMIT OR NETWORK ERROR";
      else errorMessage = `CRITICAL ERROR: ${err.message}`;
      
      setState(prev => ({ ...prev, status: 'ERROR', error: errorMessage }));
    }
  };

  const handleReset = () => {
    setState({
      status: 'IDLE',
      mode: 'SINGLE',
      profile: null,
      analysis: null,
      error: null,
      comparison: null
    });
  };

  const handleStartComparison = () => {
      setState(prev => ({
          ...prev,
          mode: 'COMPARE_SEARCH',
          status: 'IDLE' // Go back to input screen to search for second user
      }));
  };

  const handleBackToSingle = () => {
      setState(prev => ({
          ...prev,
          mode: 'SINGLE',
          comparison: null
      }));
  };

  if (state.status === 'INTRO') {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen bg-cyber-black text-gray-200 font-mono relative selection:bg-cyber-blue selection:text-black overflow-x-hidden">
      {/* Global CRT Overlay */}
      <div className="crt-overlay z-50"></div>
      
      {/* Dynamic Background with Mech Silhouette */}
      <div className="cyber-bg-container">
        {/* Starfield Layers for 3D depth */}
        <div className="stars"></div>
        <div className="stars2"></div>
        
        <div className="cyber-fog"></div>
        <div className="cyber-grid"></div>
        {/* Giant Mech Silhouette in background */}
        <div className="mech-bg"></div>
        <div className="mech-eyes">
            <div className="mech-eye"></div>
            <div className="mech-eye"></div>
        </div>
        
        <div className="particles">
            <div className="particle" style={{ top: '20%', left: '20%', animation: 'float 4s infinite', background: '#2de2e6' }}></div>
            <div className="particle" style={{ top: '60%', left: '80%', animation: 'float 7s infinite', background: '#bc13fe' }}></div>
            <div className="particle" style={{ top: '40%', left: '40%', animation: 'float 5s infinite', background: '#2de2e6' }}></div>
        </div>
      </div>

      {/* Main Wrapper */}
      <div className="relative z-10 container mx-auto px-4 py-6 flex flex-col min-h-screen">
        
        {/* Header Logo */}
        <header className="flex justify-between items-center mb-4 pb-4 animate-fade-in-up border-b border-white/5 z-50">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity group"
            onClick={handleReset}
          >
            <div className="w-10 h-10 bg-black/50 border border-cyber-blue flex items-center justify-center group-hover:bg-cyber-blue group-hover:text-black transition-colors backdrop-blur-sm shadow-[0_0_15px_rgba(45,226,230,0.2)]">
              <Terminal size={20} />
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-display font-bold tracking-tighter text-white leading-none">
                GIT<span className="text-cyber-blue">RUNNER</span>
              </div>
              <div className="text-[10px] font-tech text-cyber-purple tracking-[0.3em]">SYSTEM_2077</div>
            </div>
          </div>
          <div className="hidden md:flex text-[10px] text-cyber-blue/60 space-x-4 font-mono uppercase tracking-wider bg-black/30 px-4 py-2 rounded border border-white/5 backdrop-blur-sm">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-pulse"></span> NET_UPLINK: ACTIVE</span>
            <span className="flex items-center gap-1"><Wifi size={10} /> PING: 12MS</span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow flex flex-col items-center w-full justify-center relative">
          
          {/* IDLE STATE - Split into Background (Perspective) and Foreground (Input) */}
          {state.status === 'IDLE' && (
            <>
                {/* 3D Perspective Content (Background Layer) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-0 perspective-container pointer-events-none">
                    <div className="perspective-text text-center space-y-8 transform translate-y-12">
                        <h2 className="text-6xl md:text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-500 to-black opacity-20 drop-shadow-[0_0_30px_rgba(45,226,230,0.5)] leading-none">
                           {state.mode === 'COMPARE_SEARCH' ? 'VERSUS MODE' : 'QUANTUM\nANALYZER'}
                        </h2>
                        <div className="max-w-2xl mx-auto text-center">
                            <p className="text-cyber-blue/40 text-lg md:text-2xl font-tech tracking-[0.2em] uppercase animate-breathing">
                                {state.mode === 'COMPARE_SEARCH' 
                                    ? 'Initialize challenger sequence. Select opponent for neural handshake.' 
                                    : 'Initialize deep scan on GitHub targets. Algorithm v2.5 calculates combat power.'
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Foreground Input (Z-Index High) */}
                <div className="w-full max-w-4xl animate-fade-in-up flex flex-col items-center z-50 mt-20">
                    <TerminalInput onSearch={handleSearch} isLoading={false} />
                    
                    {state.mode === 'COMPARE_SEARCH' && (
                        <div className="mt-4 text-cyber-pink font-display animate-pulse">
                            AWAITING CHALLENGER...
                        </div>
                    )}
                    
                    {/* Footer stats for idle */}
                    {state.mode === 'SINGLE' && (
                        <div className="grid grid-cols-3 gap-4 md:gap-12 w-full max-w-2xl mt-16 text-xs font-mono text-center opacity-80">
                            <div className="bg-black/60 border border-cyber-blue/20 p-3 rounded backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                            <div className="text-cyber-blue text-xl font-display font-bold">1.2M+</div>
                            <div className="text-gray-500 tracking-widest">TARGETS</div>
                            </div>
                            <div className="bg-black/60 border border-cyber-purple/20 p-3 rounded backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                            <div className="text-cyber-purple text-xl font-display font-bold">99.9%</div>
                            <div className="text-gray-500 tracking-widest">PRECISION</div>
                            </div>
                            <div className="bg-black/60 border border-cyber-pink/20 p-3 rounded backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                            <div className="text-cyber-pink text-xl font-display font-bold">0.02S</div>
                            <div className="text-gray-500 tracking-widest">LATENCY</div>
                            </div>
                        </div>
                    )}
                </div>
            </>
          )}

          {(state.status === 'FETCHING_GITHUB' || state.status === 'ANALYZING_AI') && (
             <div className="animate-fade-in-up z-50">
                <LoadingScreen message={state.status === 'FETCHING_GITHUB' ? 'ESTABLISHING UPLINK...' : 'COMPILING NEURAL DATA...'} />
             </div>
          )}

          {state.status === 'ERROR' && (
            <div className="border border-red-600/50 bg-red-950/80 p-8 rounded-lg max-w-2xl text-center animate-pulse mt-12 backdrop-blur-md shadow-[0_0_50px_rgba(220,38,38,0.2)] z-50">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h2 className="text-3xl font-display text-red-500 mb-2 tracking-widest">SYSTEM CRITICAL</h2>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-red-900 to-transparent my-4"></div>
              <p className="text-red-300 font-mono mb-8 text-sm tracking-wide">{state.error}</p>
              <button 
                onClick={handleReset}
                className="px-8 py-3 bg-red-600 hover:bg-red-500 text-black font-bold tracking-widest hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all clip-path-button"
              >
                INITIATE REBOOT
              </button>
            </div>
          )}

          {state.status === 'SUCCESS' && state.profile && state.analysis && (
            <div className="w-full max-w-7xl animate-fade-in-up pb-12 z-50">
              {state.mode === 'COMPARE_VIEW' && state.comparison ? (
                   <ComparisonView 
                      p1={{ profile: state.profile, analysis: state.analysis }} 
                      p2={state.comparison} 
                      onBack={handleBackToSingle} 
                   />
              ) : (
                  <>
                    <div className="flex justify-between items-end mb-6 px-4 border-b border-cyber-blue/10 pb-4 bg-black/40 p-4 rounded-t-lg backdrop-blur-sm">
                        <div>
                        <div className="text-[10px] font-tech text-cyber-blue mb-1">CURRENT_SESSION</div>
                        <div className="text-xl font-display text-white">RESULT_MATRIX</div>
                        </div>
                        <button 
                        onClick={handleReset}
                        className="group flex items-center text-xs font-bold text-cyber-blue hover:text-black transition-all px-6 py-2 border border-cyber-blue/30 hover:bg-cyber-blue rounded-sm uppercase tracking-widest"
                        >
                        <span className="mr-2 group-hover:-translate-x-1 transition-transform">{"<<"}</span> 
                        NEW SCAN
                        </button>
                    </div>
                    <Dashboard 
                        profile={state.profile} 
                        analysis={state.analysis} 
                        onCompare={handleStartComparison}
                    />
                  </>
              )}
            </div>
          )}

        </main>

        <footer className="mt-12 text-center text-gray-600 text-[10px] uppercase tracking-[0.3em] pb-4 font-tech relative z-50">
          System Architecture: React // Gemini 2.5 // Tailwind // Recharts
        </footer>
      </div>
    </div>
  );
};

export default App;
