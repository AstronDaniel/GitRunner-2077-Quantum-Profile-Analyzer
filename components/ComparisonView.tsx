
import * as React from 'react';
import { GithubProfile, AnalysisResult } from '../types';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import TiltCard from './TiltCard';
import { Trophy, Zap, Shield, Skull, Sword } from 'lucide-react';

interface ComparisonViewProps {
  p1: { profile: GithubProfile; analysis: AnalysisResult };
  p2: { profile: GithubProfile; analysis: AnalysisResult };
  onBack: () => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ p1, p2, onBack }) => {
  // Prepare Radar Data
  const data = [
    { subject: 'CODE', A: p1.analysis.skills.coding, B: p2.analysis.skills.coding, fullMark: 100 },
    { subject: 'LOGIC', A: p1.analysis.skills.logic, B: p2.analysis.skills.logic, fullMark: 100 },
    { subject: 'CREATE', A: p1.analysis.skills.creativity, B: p2.analysis.skills.creativity, fullMark: 100 },
    { subject: 'SPEED', A: p1.analysis.skills.speed, B: p2.analysis.skills.speed, fullMark: 100 },
    { subject: 'COLLAB', A: p1.analysis.skills.collaboration, B: p2.analysis.skills.collaboration, fullMark: 100 },
    { subject: 'WILL', A: p1.analysis.skills.resilience, B: p2.analysis.skills.resilience, fullMark: 100 },
  ];

  // Determine Winner
  const winner = p1.analysis.powerLevel > p2.analysis.powerLevel ? p1.profile.login : p2.profile.login;
  const diff = Math.abs(p1.analysis.powerLevel - p2.analysis.powerLevel);

  return (
    <div className="w-full max-w-7xl mx-auto text-white relative z-20 pb-20">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-8 px-4">
        <button onClick={onBack} className="text-cyber-blue font-mono hover:underline">{"< BACK TO SINGLE"}</button>
        <div className="text-2xl font-display italic tracking-widest text-cyber-yellow animate-pulse">VERSUS PROTOCOL ACTIVE</div>
      </div>

      {/* HEAD TO HEAD BANNER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12 relative">
        
        {/* PLAYER 1 */}
        <TiltCard className="w-full md:w-1/3 animate-vs-slide-left" intensity={15}>
          <div className="bg-cyber-dark/80 border-2 border-cyber-blue p-6 relative overflow-hidden rounded-lg shadow-[0_0_30px_rgba(45,226,230,0.3)] group">
            <div className="absolute inset-0 bg-cyber-blue/5 group-hover:bg-cyber-blue/10 transition-colors"></div>
            <div className="flex flex-col items-center relative z-10 tilt-depth-10">
              <img src={p1.profile.avatar_url} className="w-32 h-32 rounded-full border-4 border-cyber-blue shadow-lg mb-4" alt="P1" />
              <h2 className="text-3xl font-display font-bold text-cyber-blue">{p1.profile.login}</h2>
              <div className="text-sm font-mono text-gray-400">{p1.analysis.archetype}</div>
              <div className="mt-4 text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(45,226,230,0.8)]">
                {p1.analysis.powerLevel}
              </div>
            </div>
            {winner === p1.profile.login && (
              <div className="absolute top-2 right-2 text-cyber-yellow animate-bounce tilt-depth-30">
                <Trophy size={32} />
              </div>
            )}
          </div>
        </TiltCard>

        {/* VS BADGE */}
        <div className="relative z-20 animate-vs-clash opacity-0 flex flex-col items-center">
           <div className="text-7xl font-black font-display italic text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] transform -skew-x-12">
             VS
           </div>
           <div className="text-xs font-mono text-gray-500 mt-2">DIFFERENTIAL: {diff}</div>
        </div>

        {/* PLAYER 2 */}
        <TiltCard className="w-full md:w-1/3 animate-vs-slide-right" intensity={15}>
          <div className="bg-cyber-dark/80 border-2 border-cyber-pink p-6 relative overflow-hidden rounded-lg shadow-[0_0_30px_rgba(255,0,153,0.3)] group">
             <div className="absolute inset-0 bg-cyber-pink/5 group-hover:bg-cyber-pink/10 transition-colors"></div>
             <div className="flex flex-col items-center relative z-10 tilt-depth-10">
              <img src={p2.profile.avatar_url} className="w-32 h-32 rounded-full border-4 border-cyber-pink shadow-lg mb-4" alt="P2" />
              <h2 className="text-3xl font-display font-bold text-cyber-pink">{p2.profile.login}</h2>
              <div className="text-sm font-mono text-gray-400">{p2.analysis.archetype}</div>
              <div className="mt-4 text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(255,0,153,0.8)]">
                {p2.analysis.powerLevel}
              </div>
            </div>
            {winner === p2.profile.login && (
              <div className="absolute top-2 right-2 text-cyber-yellow animate-bounce tilt-depth-30">
                <Trophy size={32} />
              </div>
            )}
          </div>
        </TiltCard>
      </div>

      {/* SHARED RADAR CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
         <TiltCard className="w-full h-[400px] bg-black/60 border border-gray-800 p-4 rounded-lg" intensity={5}>
            <h3 className="text-center font-display text-gray-400 mb-4">NEURAL OVERLAY</h3>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10, fontFamily: 'Orbitron' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name={p1.profile.login} dataKey="A" stroke="#2de2e6" strokeWidth={3} fill="#2de2e6" fillOpacity={0.3} />
                <Radar name={p2.profile.login} dataKey="B" stroke="#ff0099" strokeWidth={3} fill="#ff0099" fillOpacity={0.3} />
                <Legend wrapperStyle={{ fontFamily: 'Fira Code', fontSize: '12px', paddingTop: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
         </TiltCard>

         <div className="flex flex-col gap-4">
             {/* Comparison Bars */}
             <div className="bg-black/60 border border-gray-800 p-6 rounded-lg h-full flex flex-col justify-center">
                <h3 className="text-center font-display text-gray-400 mb-6">METRIC CLASH</h3>
                
                <MetricBar label="Total Followers" val1={p1.profile.followers} val2={p2.profile.followers} color1="bg-cyber-blue" color2="bg-cyber-pink" />
                <MetricBar label="Public Repos" val1={p1.profile.public_repos} val2={p2.profile.public_repos} color1="bg-cyber-blue" color2="bg-cyber-pink" />
                <MetricBar label="Efficiency" val1={p1.analysis.hackEfficiency} val2={p2.analysis.hackEfficiency} unit="%" color1="bg-cyber-blue" color2="bg-cyber-pink" />
                <MetricBar label="Consistency" val1={p1.analysis.consistencyScore} val2={p2.analysis.consistencyScore} unit="%" color1="bg-cyber-blue" color2="bg-cyber-pink" />

             </div>
         </div>
      </div>
      
      {/* Skills / Augs Summary */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-t-4 border-cyber-blue bg-black/40 p-6">
             <h4 className="text-cyber-blue font-display mb-4 flex items-center gap-2"><Shield /> {p1.profile.login} Advantages</h4>
             <ul className="space-y-2">
                {p1.analysis.strengths.map((s, i) => (
                    <li key={i} className="text-xs font-mono text-gray-300 flex items-center gap-2">
                        <span className="w-1 h-1 bg-cyber-blue"></span> {s}
                    </li>
                ))}
             </ul>
          </div>
          <div className="border-t-4 border-cyber-pink bg-black/40 p-6">
             <h4 className="text-cyber-pink font-display mb-4 flex items-center gap-2"><Sword /> {p2.profile.login} Advantages</h4>
             <ul className="space-y-2">
                {p2.analysis.strengths.map((s, i) => (
                    <li key={i} className="text-xs font-mono text-gray-300 flex items-center gap-2">
                        <span className="w-1 h-1 bg-cyber-pink"></span> {s}
                    </li>
                ))}
             </ul>
          </div>
       </div>
    </div>
  );
};

const MetricBar = ({ label, val1, val2, unit = '', color1, color2 }: any) => {
    const total = val1 + val2;
    const p1Pct = total === 0 ? 50 : (val1 / total) * 100;
    const p2Pct = total === 0 ? 50 : (val2 / total) * 100;

    return (
        <div className="mb-6">
            <div className="flex justify-between text-xs font-mono text-gray-500 mb-1 uppercase">
                <span>{val1}{unit}</span>
                <span>{label}</span>
                <span>{val2}{unit}</span>
            </div>
            <div className="h-3 bg-gray-900 flex rounded-full overflow-hidden">
                <div className={`h-full ${color1} transition-all duration-1000`} style={{ width: `${p1Pct}%` }}></div>
                <div className="w-1 bg-black"></div>
                <div className={`h-full ${color2} transition-all duration-1000`} style={{ width: `${p2Pct}%` }}></div>
            </div>
        </div>
    );
};

export default ComparisonView;
