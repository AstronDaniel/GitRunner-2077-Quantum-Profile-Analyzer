
import * as React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface SkillData {
  subject: string;
  A: number;
  fullMark: number;
}

interface CyberRadarProps {
  skills: {
    coding: number;
    logic: number;
    creativity: number;
    speed: number;
    collaboration: number;
    resilience: number;
  };
}

const CyberRadar: React.FC<CyberRadarProps> = ({ skills }) => {
  const data: SkillData[] = [
    { subject: 'CODING', A: skills.coding, fullMark: 100 },
    { subject: 'LOGIC', A: skills.logic, fullMark: 100 },
    { subject: 'CREATIVITY', A: skills.creativity, fullMark: 100 },
    { subject: 'SPEED', A: skills.speed, fullMark: 100 },
    { subject: 'COLLAB', A: skills.collaboration, fullMark: 100 },
    { subject: 'WILLPOWER', A: skills.resilience, fullMark: 100 },
  ];

  return (
    <div className="w-full h-64 sm:h-80 relative">
      {/* Grid overlay for aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none rounded-full opacity-50"></div>
      
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#0a3a1a" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#00ff41', fontSize: 10, fontFamily: 'Fira Code' }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#00f3ff"
            strokeWidth={2}
            fill="#00f3ff"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CyberRadar;
