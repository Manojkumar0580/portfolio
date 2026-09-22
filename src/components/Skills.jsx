import React from 'react';
import { Server, Database, ShieldCheck, Plug, Sparkles, GitBranch, Code2 } from 'lucide-react';
import { SectionTitle } from './ui/SectionTitle';
import { Reveal } from './ui/Reveal';
import { skills } from '../data/profile.js';
import { motion } from 'framer-motion';

const skillIcons = { 
  Backend: Server, 
  Data: Database, 
  Security: ShieldCheck, 
  Integrations: Plug, 
  AI: Sparkles, 
  Delivery: GitBranch, 
  Frontend: Code2 
};

export function Skills() {
  return (
    <section id="skills" className="section stack">
      <div className="container">
        <SectionTitle 
          number="03" 
          kicker="TOOLKIT" 
          title={<>The stack behind<br /><em>the systems.</em></>} 
          description="Organized by where each technology sits in a real product — from the API layer to delivery." 
        />
        
        <Reveal as="div" stagger className="skills-grid">
          {Object.entries(skills).map(([group, items]) => {
            const Icon = skillIcons[group] || Code2;
            const isBackend = group === 'Backend';
            
            return (
              <motion.div 
                className={isBackend ? 'skill-card emphasis' : 'skill-card'} 
                key={group}
                whileHover={{ y: -4, borderColor: isBackend ? '#0ea5e9' : '#1e293b' }}
              >
                <div className="skill-card-head">
                  <span className="icon-wrap">
                    <Icon size={18} />
                  </span>
                  <h3>{group}</h3>
                </div>
                <div>
                  {items.map(item => (
                    <motion.span 
                      key={item}
                      whileHover={{ y: -2, borderColor: '#0ea5e9', color: '#0ea5e9' }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
