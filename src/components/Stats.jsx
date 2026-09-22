import React from 'react';
import { Briefcase, FolderGit2, Server, Sparkles } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { metrics } from '../data/profile.js';

const statIcons = [Briefcase, FolderGit2, Server, Sparkles];

export function Stats() {
  return (
    <div className="stats">
      <Reveal as="div" stagger className="container stats-grid">
        {metrics.map(([value, label], i) => {
          const Icon = statIcons[i % statIcons.length];
          return (
            <div className="stat-card" key={value}>
              <Icon className="stat-icon" />
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          );
        })}
      </Reveal>
    </div>
  );
}

export function Marquee() {
  const items = [
    'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 
    'JWT Auth', 'Razorpay', 'AWS S3', 'Socket.IO', 
    'React.js', 'AI Integrations'
  ];
  const track = [...items, ...items];
  
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {track.map((t, i) => (
          <span key={i}>{t}<i /></span>
        ))}
      </div>
    </div>
  );
}
