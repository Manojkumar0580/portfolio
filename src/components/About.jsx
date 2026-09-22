import React from 'react';
import { MapPin, Briefcase, FolderGit2, Server, Layers, Check } from 'lucide-react';
import { SectionTitle } from './ui/SectionTitle';
import { Reveal } from './ui/Reveal';
import { profile, metrics, skills } from '../data/profile.js';
import { projects as projectsData } from '../data/projects.js';

export function About() {
  const bring = [
    'Backend-first engineering: clean REST APIs, validation and error handling that hold up in production.',
    'End-to-end MERN delivery — comfortable owning a feature from schema to shipped UI.',
    'Security-conscious by default: JWT, RBAC and payment flows built to be audited, not just to work.',
    'Practical AI integration experience connecting Gemini and Sarvam AI to real product workflows.'
  ];
  
  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <SectionTitle 
          number="01" 
          kicker="THE APPROACH" 
          title={<>Engineering<br /><em>for the real world.</em></>} 
        />
        
        <Reveal className="about-content" delay={0.2}>
          <p className="lead">
            I'm a backend-first developer focused on software that works under real product constraints.
          </p>
          <p>
            At Awwaltech, I currently work full-stack on the Doctar web app and build Node.js services: APIs, access control, payments, real-time communication, database performance and practical AI integrations. My wider project work spans healthcare, travel, legal, wholesale and finance products. I work with frontend developers and product teams to deliver features with tests and clear API contracts.
          </p>
          
          <div className="about-note">
            <span className="note-line" />
            <span><MapPin size={16} /> Based in {profile.location} · Working with remote teams</span>
          </div>
          
          <div className="info-cards">
            <div className="info-card">
              <Briefcase size={20} />
              <strong>{metrics[0][0]}</strong>
              <span>Years of experience</span>
            </div>
            <div className="info-card">
              <FolderGit2 size={20} />
              <strong>{projectsData.length}</strong>
              <span>Projects &amp; codebases</span>
            </div>
            <div className="info-card">
              <Server size={20} />
              <strong>{metrics[1][0]}</strong>
              <span>REST endpoints shipped</span>
            </div>
            <div className="info-card">
              <Layers size={20} />
              <strong>{Object.keys(skills).length}</strong>
              <span>Technology categories</span>
            </div>
          </div>
          
          <div className="bring-list">
            <h3>What I bring to a team</h3>
            <ul>
              {bring.map(b => (
                <li key={b}>
                  <Check size={15} /> {b}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
