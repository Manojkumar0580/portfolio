import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SectionTitle } from './ui/SectionTitle';
import { Reveal } from './ui/Reveal';
import { projects } from '../data/projects.js';
import { motion, AnimatePresence } from 'framer-motion';

const filters = ['All', 'Backend', 'Healthcare', 'AI', 'Real-Time', 'Payments'];

function ProjectCard({ project: p }) {
  const number = String(projects.indexOf(p) + 1).padStart(2, '0');
  const glyph = p.title === 'DOCTAR' ? '✚' : p.title === 'DOCTAR AI' ? '✳' : p.title === 'JOBROOMS' ? '⌘' : '◈';
  
  return (
    <motion.article 
      className={`project-card editorial-card art-${p.slug}`}
      whileHover={{ y: -6, borderColor: 'rgba(14, 165, 233, 0.4)', boxShadow: '0 0 0 1px rgba(14,165,233,.1),0 20px 40px -20px rgba(14,165,233,.2)' }}
    >
      <div className="card-top">
        <span className="project-index">PROJECT {number} / {String(projects.length).padStart(2, '0')}</span>
        <span className="project-status"><i />{p.status}</span>
      </div>
      
      <div className="project-art" aria-hidden="true">
        <div className="art-lines" />
        <span className="art-glyph">{glyph}</span>
        <span className="art-label">
          {p.currentWeb ? 'CURRENT / FULL-STACK' : p.slug === 'doctar-ai' ? 'AI / HEALTHCARE' : p.slug === 'jobrooms' ? 'PRIVATE / BACKEND' : 'API / PERFORMANCE'}
        </span>
      </div>
      
      <div className="card-content">
        <span className="eyebrow">{p.category}</span>
        <h3>{p.title}</h3>
        <p>{p.summary}</p>
        
        <div className="project-meta">
          {p.metric && <span>{p.metric}</span>}
          <span>{p.role}</span>
        </div>
        
        <div className="tag-row">
          {p.tech.slice(0, 4).map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
        
        <div className="card-actions">
          <Link to={`/projects/${p.slug}`}>
            Explore case study <ArrowUpRight size={17} />
          </Link>
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noreferrer">
              Live site <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectRow({ project: p }) {
  return (
    <Link className="project-row" to={`/projects/${p.slug}`}>
      <span className="row-index">{String(projects.indexOf(p) + 1).padStart(2, '0')}</span>
      <div className="row-main">
        <span className="eyebrow">{p.category}</span>
        <h3>{p.title}</h3>
        <p>{p.summary}</p>
        <div className="row-tags">{p.tech.slice(0, 3).join(' / ')}</div>
      </div>
      <ArrowUpRight className="row-arrow" size={21} />
    </Link>
  );
}

export function Work() {
  const [filter, setFilter] = useState('All');
  
  const shown = filter === 'All' ? projects : projects.filter(p => p.filters.includes(filter));
  const featured = shown.filter(p => p.featured);
  const other = shown.filter(p => !p.featured);

  return (
    <section id="work" className="section work">
      <div className="container">
        <div className="work-head">
          <SectionTitle 
            number="04" 
            kicker="SELECTED WORK" 
            title={<>Proof in the <em>products.</em></>} 
            description="Production systems, real contributions and a wider range of product work." 
          />
          <span className="work-count">{String(projects.length).padStart(2, '0')} PROJECTS</span>
        </div>
        
        <div className="filters" role="group" aria-label="Filter projects">
          {filters.map(f => (
            <button 
              key={f} 
              className={filter === f ? 'filter active' : 'filter'} 
              onClick={() => setFilter(f)} 
              aria-pressed={filter === f}
            >
              {f}
            </button>
          ))}
        </div>
        
        <AnimatePresence mode="popLayout">
          {featured.length > 0 && (
            <motion.div
              key="featured"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="work-subheading">
                <span>FEATURED CASE STUDIES</span>
                <span>{String(featured.length).padStart(2, '0')} SYSTEMS</span>
              </div>
              <Reveal as="div" stagger className="featured-grid">
                {featured.map(p => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </Reveal>
            </motion.div>
          )}
          
          {other.length > 0 && (
            <motion.div
              key="other"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="work-subheading more-heading">
                <span>MORE PROJECT WORK</span>
                <span>{String(other.length).padStart(2, '0')} SYSTEMS</span>
              </div>
              <Reveal as="div" stagger className="more-work-grid">
                {other.map(p => (
                  <ProjectRow key={p.slug} project={p} />
                ))}
              </Reveal>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
