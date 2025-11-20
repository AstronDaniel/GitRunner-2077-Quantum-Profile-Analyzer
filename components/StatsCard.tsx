
import * as React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: 'green' | 'pink' | 'cyan' | 'purple';
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon, color = 'green' }) => {
  const colorClasses = {
    green: 'text-cyber-green border-cyber-green/30 shadow-[0_0_15px_rgba(0,255,65,0.1)] hover:border-cyber-green',
    pink: 'text-cyber-pink border-cyber-pink/30 shadow-[0_0_15px_rgba(255,0,153,0.1)] hover:border-cyber-pink',
    cyan: 'text-cyber-cyan border-cyber-cyan/30 shadow-[0_0_15px_rgba(0,243,255,0.1)] hover:border-cyber-cyan',
    purple: 'text-cyber-purple border-cyber-purple/30 shadow-[0_0_15px_rgba(188,19,254,0.1)] hover:border-cyber-purple',
  };

  const bgClasses = {
    green: 'from-cyber-green/5',
    pink: 'from-cyber-pink/5',
    cyan: 'from-cyber-cyan/5',
    purple: 'from-cyber-purple/5',
  };

  return (
    <div className={`relative overflow-hidden border p-4 flex flex-col justify-between min-h-[110px] group transition-all duration-300 bg-gradient-to-br ${bgClasses[color]} to-transparent ${colorClasses[color]}`}>
      {/* Scanline effect inside card */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,rgba(0,0,0,0.2)_1px)] bg-[size:100%_4px] opacity-20 pointer-events-none"></div>

      <div className="absolute top-0 right-0 p-2 opacity-40 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100 duration-300">
        {icon}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70 mb-1">{label}</div>
      
      <div className="flex items-end">
        <div className={`font-display font-bold leading-none break-words w-full ${String(value).length > 10 ? 'text-lg' : 'text-2xl md:text-3xl'}`}>
          {value}
        </div>
      </div>
      
      {/* Decorative corner */}
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-current opacity-50 group-hover:w-6 group-hover:h-6 transition-all"></div>
    </div>
  );
};

export default StatsCard;
