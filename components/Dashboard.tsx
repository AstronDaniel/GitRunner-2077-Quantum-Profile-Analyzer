
import * as React from 'react';
import { useState } from 'react';
import { GithubProfile, AnalysisResult } from '../types';
import CyberRadar from './RadarChart';
import StatsCard from './StatsCard';
import TiltCard from './TiltCard';
import { Zap, Activity, Users, GitBranch, Database, Trophy, Cpu, MapPin, Calendar, Lock, Hash, Eye, Code, Shield, Hexagon, Swords } from 'lucide-react';

interface DashboardProps {
  profile: GithubProfile;
  analysis: AnalysisResult;
  onCompare: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, analysis, onCompare }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'gear'>('stats');
  
  const joinDate = new Date(profile.created_at).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  });

  // Simulating a contribution heatmap
  const renderHeatmap = () => {
    const blocks = [];
    for (let i = 0; i < 52; i++) {
      const intensity = Math.random() > 0.7 ? 'bg-cyber-blue' : Math.random() > 0.4 ? 'bg-cyber-purple' : 'bg-cyber-dark border border-white/10';
      const opacity = Math.random() * 0.8 + 0.2;
      blocks.push(
        <div key={i} className={`w-1 h-4 md:w-2 md:h-6 rounded-sm ${intensity}`} style={{ opacity }}></div>
      );
    }
    return blocks;
  };

  return (
    <div className="w-full animate-fade-in-up relative bg-cyber-black/90 p-2 md:p-6 border-y border-cyber-blue/30 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(45,226,230,0.1)]">
      
      {/* Scanner Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="w-full h-2 bg-cyber-blue/30 shadow-[0_0_20px_rgba(45,226,230,0.5)] animate-scanline absolute top-0 left-0 blur-sm"></div>
      </div>

      {/* Interactive Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 relative z-10">
        <button 
          onClick={() => setActiveTab('stats')}
          className={`px-6 py-2 font-display text-sm tracking-widest uppercase transition-all duration-300 border-b-2 ${activeTab === 'stats' ? 'text-cyber-blue border-cyber-blue shadow-[0_10px_20px_-10px_rgba(45,226,230,0.5)]' : 'text-gray-600 border-transparent hover:text-gray-300'}`}
        >
          Neural Stats
        </button>
        <button 
          onClick={() => setActiveTab('gear')}
          className={`px-6 py-2 font-display text-sm tracking-widest uppercase transition-all duration-300 border-b-2 ${activeTab === 'gear' ? 'text-cyber-purple border-cyber-purple shadow-[0_10px_20px_-10px_rgba(188,19,254,0.5)]' : 'text-gray-600 border-transparent hover:text-gray-300'}`}
        >
          Cybernetics
        </button>
        <button 
            onClick={onCompare}
            className="ml-4 px-6 py-2 font-display text-sm tracking-widest uppercase transition-all duration-300 border border-cyber-pink text-cyber-pink hover:bg-cyber-pink hover:text-white shadow-[0_0_15px_rgba(255,0,153,0.2)] flex items-center gap-2"
        >
            <Swords size={16} /> Compare Protocol
        </button>
      </div>

      {/* Top Profile Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 relative z-10">
        
        {/* Profile ID Card (TILT ENABLED) */}
        <div className="lg:col-span-4">
            <TiltCard intensity={5} className="h-full">
                <div className="bg-gradient-to-b from-black/80 to-cyber-dark border border-cyber-blue/30 p-6 relative flex flex-col items-center group hover:border-cyber-blue/60 transition-colors duration-500 h-full tilt-card-inner">
                    {/* Holographic corner accents */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-cyber-blue"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-cyber-blue"></div>

                    <div className="relative mb-6 cursor-pointer tilt-depth-20">
                        <div className="absolute -inset-4 border border-cyber-blue/20 rounded-full animate-spin-slow group-hover:border-cyber-purple transition-colors"></div>
                        <div className="absolute -inset-2 border border-cyber-purple/20 rounded-full animate-spin-reverse"></div>
                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-cyber-blue shadow-[0_0_30px_rgba(45,226,230,0.3)] relative z-10 group-hover:scale-105 transition-transform duration-300">
                            <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-0 right-0 bg-black border border-cyber-purple text-cyber-purple text-[10px] font-bold px-2 py-0.5 rounded-full z-20 shadow-[0_0_10px_rgba(188,19,254,0.5)]">
                            LVL.{Math.floor(analysis.powerLevel / 100)}
                        </div>
                    </div>

                    <h2 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-cyber-blue transition-colors tilt-depth-10">{profile.name || profile.login}</h2>
                    <div className="text-cyber-purple font-mono text-xs mb-6 flex items-center gap-2">
                        <Lock size={10} /> ID: {profile.id.toString(16).toUpperCase()}
                    </div>

                    <div className="w-full grid grid-cols-2 gap-4 text-xs font-mono text-gray-400 mb-4">
                        <div className="bg-white/5 p-2 border-l-2 border-cyber-blue">
                            <div className="flex items-center gap-1 mb-1 text-cyber-blue"><MapPin size={10}/> SECTOR</div>
                            <div className="truncate text-white">{profile.location || 'UNKNOWN'}</div>
                        </div>
                        <div className="bg-white/5 p-2 border-l-2 border-cyber-purple">
                            <div className="flex items-center gap-1 mb-1 text-cyber-purple"><Calendar size={10}/> UPTIME</div>
                            <div className="text-white">{joinDate}</div>
                        </div>
                    </div>
                </div>
            </TiltCard>
        </div>

        {/* Main Content Switching */}
        <div className="lg:col-span-8 flex flex-col gap-6">
           
           {/* Combat Power Banner */}
           <TiltCard intensity={5} className="w-full">
            <div className="relative bg-black/60 border border-cyber-pink/30 p-6 flex flex-col md:flex-row items-center justify-between overflow-hidden min-h-[160px] tilt-card-inner">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(255,0,153,0.1),transparent_70%)]"></div>
                {/* Animated Background grid inside banner */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,153,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,153,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                <div className="relative z-10 text-center md:text-left mb-4 md:mb-0 tilt-depth-20">
                    <div className="text-cyber-pink font-mono text-xs tracking-[0.4em] mb-2 uppercase flex items-center gap-2">
                        <Trophy size={12} /> Combat Power
                    </div>
                    <div className="text-6xl md:text-7xl font-display font-black text-white drop-shadow-[0_0_10px_rgba(255,0,153,0.6)] glitch-text" data-text={analysis.powerLevel}>
                        {analysis.powerLevel.toLocaleString()}
                    </div>
                </div>

                <div className="relative z-10 flex flex-col items-center md:items-end tilt-depth-10">
                    <div className="text-right mb-2">
                        <span className="inline-block bg-cyber-pink/10 border border-cyber-pink text-cyber-pink px-4 py-1 rounded-sm text-sm font-display font-bold tracking-wider shadow-[0_0_15px_rgba(255,0,153,0.2)]">
                        {analysis.archetype.toUpperCase()}
                        </span>
                    </div>
                    <div className="text-gray-400 font-mono text-xs max-w-[200px] text-center md:text-right">
                        {analysis.globalRank}
                    </div>
                </div>
            </div>
           </TiltCard>

            {/* Content based on Tab */}
            {activeTab === 'stats' ? (
                <>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <StatsCard label="Efficiency" value={`${analysis.hackEfficiency}%`} color="cyan" icon={<Zap size={16} />} />
                        <StatsCard label="Consistency" value={`${analysis.consistencyScore}%`} color="green" icon={<Activity size={16} />} />
                        <StatsCard label="Total Repos" value={profile.public_repos} color="purple" icon={<GitBranch size={16} />} />
                        <StatsCard label="Network" value={profile.followers} color="pink" icon={<Users size={16} />} />
                    </div>

                    {/* Heatmap Visual */}
                    <div className="w-full bg-black/40 border border-white/10 p-2 flex gap-1 items-center overflow-hidden h-10">
                        <div className="text-[10px] text-gray-500 font-mono mr-2 shrink-0">ACTIVITY_STREAM:</div>
                        {renderHeatmap()}
                    </div>
                </>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                    {analysis.augmentations.map((aug, idx) => (
                        <div key={idx} className={`
                            bg-black/60 border p-4 flex flex-col gap-2 relative overflow-hidden group transition-all hover:scale-105
                            ${aug.rarity === 'legendary' ? 'border-cyber-yellow/50 shadow-[0_0_15px_rgba(252,238,10,0.1)]' : 
                              aug.rarity === 'rare' ? 'border-cyber-purple/50' : 'border-cyber-blue/30'}
                        `}>
                            <div className={`
                                absolute top-0 right-0 text-[10px] font-bold uppercase px-2 py-0.5
                                ${aug.rarity === 'legendary' ? 'bg-cyber-yellow text-black' : 
                                  aug.rarity === 'rare' ? 'bg-cyber-purple text-white' : 'bg-cyber-blue text-black'}
                            `}>
                                {aug.rarity}
                            </div>
                            <Hexagon size={24} className={aug.rarity === 'legendary' ? 'text-cyber-yellow' : aug.rarity === 'rare' ? 'text-cyber-purple' : 'text-cyber-blue'} />
                            <h3 className="font-display text-sm text-white font-bold">{aug.name}</h3>
                            <p className="text-xs text-gray-400 font-mono leading-relaxed">{aug.desc}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>

      {/* Lower Section: Radar & Languages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Left: Radar Chart */}
        <div className="lg:col-span-5 h-full">
           <TiltCard intensity={8} className="h-full">
            <div className="bg-black/60 border border-cyber-blue/30 p-4 rounded relative h-full tilt-card-inner">
                <div className="absolute top-0 left-0 bg-cyber-blue/20 px-3 py-1 text-[10px] text-cyber-blue font-mono">NEURAL_DIAGRAM</div>
                <CyberRadar skills={analysis.skills} />
            </div>
           </TiltCard>
        </div>

        {/* Center: Languages (Syntax Core) */}
        <div className="lg:col-span-4 bg-black/60 border border-cyber-purple/30 p-6 flex flex-col relative">
            <div className="absolute top-0 right-0 bg-cyber-purple/20 px-3 py-1 text-[10px] text-cyber-purple font-mono">SYNTAX_CORE</div>
            <div className="mt-4 space-y-4 flex-grow flex flex-col justify-center">
                {analysis.languages.map((lang, i) => (
                    <div key={i} className="group">
                        <div className="flex justify-between text-xs font-display mb-1">
                            <span className="text-white group-hover:text-cyber-purple transition-colors">{lang.name.toUpperCase()}</span>
                            <span className="text-gray-500">{lang.percent}%</span>
                        </div>
                        <div className="h-2 bg-gray-800 w-full overflow-hidden relative">
                            <div 
                                className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple absolute top-0 left-0 transition-all duration-1000" 
                                style={{ width: `${lang.percent}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Right: Text Analysis */}
        <div className="lg:col-span-3 bg-black/60 border border-cyber-yellow/30 p-6 flex flex-col justify-between relative">
           <div className="absolute top-0 right-0 bg-cyber-yellow/20 px-3 py-1 text-[10px] text-cyber-yellow font-mono">PSYCH_EVAL</div>
           
           <div className="mb-6 mt-4">
              <p className="font-mono text-xs md:text-sm text-gray-300 leading-relaxed border-l-2 border-cyber-yellow pl-4 py-1 italic">
                "{analysis.analysis}"
              </p>
           </div>

           <div className="space-y-4 mt-auto">
             <div>
               <h4 className="text-cyber-green text-[10px] uppercase font-bold mb-1 border-b border-cyber-green/20 pb-1 flex items-center gap-2"><Shield size={10}/> Optimized</h4>
               <ul className="space-y-1">
                 {analysis.strengths.slice(0,2).map((s, i) => (
                   <li key={i} className="text-[10px] text-gray-400 flex items-center"><Hash size={8} className="mr-1 text-cyber-green"/> {s}</li>
                 ))}
               </ul>
             </div>
             <div>
               <h4 className="text-cyber-pink text-[10px] uppercase font-bold mb-1 border-b border-cyber-pink/20 pb-1 flex items-center gap-2"><AlertTriangle size={10}/> Vulnerable</h4>
               <ul className="space-y-1">
                 {analysis.weaknesses.slice(0,2).map((w, i) => (
                   <li key={i} className="text-[10px] text-gray-400 flex items-center"><Eye size={8} className="mr-1 text-cyber-pink"/> {w}</li>
                 ))}
               </ul>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// Helper icon for text analysis
const AlertTriangle = ({ size, className }: { size: number, className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

export default Dashboard;
