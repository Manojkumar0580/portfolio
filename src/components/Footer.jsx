import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile.js';

const navItems = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Experience', 'experience'],
  ['Skills', 'skills'],
  ['Projects', 'work'],
  ['Services', 'services'],
  ['Contact', 'contact']
];

export function Footer() {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  };

  return (
    <footer className="footer">
      {show && (
        <button 
          className="back-to-top" 
          onClick={scrollToTop} 
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
      
      <motion.div 
        className="container footer-inner"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <span className="eyebrow">OPEN FOR WHAT'S NEXT</span>
          <h2>Let's build something<br /><em>that works.</em></h2>
          <a className="text-link" href={`mailto:${profile.email}`}>
            {profile.email} <ArrowUpRight size={19} />
          </a>
          <nav className="footer-nav" aria-label="Footer navigation">
            {navItems.map(([label, id]) => (
              <a key={id} href={`/#${id}`}>{label}</a>
            ))}
          </nav>
        </div>
        
        <div className="footer-right">
          <div>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={`mailto:${profile.email}`}>Email ↗</a>
          </div>
          <p>
            © {new Date().getFullYear()} Manoj Kumar<br />
            Built with React, Vite, Express &amp; MongoDB.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
