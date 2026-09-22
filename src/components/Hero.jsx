import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowRight, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile, metrics } from '../data/profile.js';

export function Hero() {
  const areas = ['Node.js Backend Developer', 'MERN Stack Developer', 'Full-Stack Developer'];
  const [area, setArea] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setArea(i => (i + 1) % areas.length), 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const node = heroRef.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = e => {
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width * 100).toFixed(1)}%`);
      node.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height * 100).toFixed(1)}%`);
    };
    node.addEventListener('mousemove', onMove);
    return () => node.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-spotlight" aria-hidden="true" />
      
      <div className="container hero-inner">
        <motion.div 
          className="hero-copy"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="availability">
            <span className="live-dot" /> Open to opportunities · Available for freelance &amp; remote work
          </div>
          
          <p className="eyebrow hero-label">HI, I'M MANOJ KUMAR <span>—</span> {profile.location.toUpperCase()}</p>
          
          <h1>
            Backend systems<br />built by a <br className="mobile-only" />
            <span className="hero-rotator">
              <AnimatePresence mode="wait">
                <motion.em
                  key={area}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {areas[area]}
                </motion.em>
              </AnimatePresence>
            </span>
          </h1>
          
          <p className="hero-description">
            With {metrics[0][0]} in production backend engineering, I design and ship scalable Node.js APIs, secure authentication, payment workflows, real-time communication, and practical AI integrations.
          </p>
          
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              View my work <ArrowUpRight size={18} />
            </a>
            <a className="button button-outline" href={profile.resume} target="_blank" rel="noreferrer">
              Download resume <FileText size={16} />
            </a>
            <a className="button button-ghost" href="#contact">
              Contact me <ArrowRight size={18} />
            </a>
          </div>
          
          <div className="hero-social">
            <a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
            <a href={`mailto:${profile.email}`}><Mail size={16} /> Email</a>
          </div>
        </motion.div>
        
        <motion.div 
          className="hero-visual" 
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="window-bar">
            <i /><i /><i />
            <span>server.js</span>
            <div className="window-bar-avatar">
              <img src={profile.portrait} alt="" width="56" height="56" loading="lazy" />
            </div>
          </div>
          <div className="code-block">
            <div><span className="ln">01</span><span className="kw">const</span> engineer = {'{'}</div>
            <div><span className="ln">02</span>&nbsp;&nbsp;name: <span className="str">'Manoj Kumar'</span>,</div>
            <div><span className="ln">03</span>&nbsp;&nbsp;role: <span className="str">'Node.js Backend Developer'</span>,</div>
            <div><span className="ln">04</span>&nbsp;&nbsp;experience: <span className="str">'{metrics[0][0]} years'</span>,</div>
            <div><span className="ln">05</span>&nbsp;&nbsp;stack: [<span className="str">'Express'</span>, <span className="str">'MongoDB'</span>, <span className="str">'React'</span>],</div>
            <div><span className="ln">06</span>&nbsp;&nbsp;<span className="fn">ship</span>: () =&gt; <span className="kw">true</span></div>
            <div><span className="ln">07</span>{'}'}; <span className="cm">// building Doctar right now</span></div>
          </div>
          <div className="hero-stack-strip">
            {['Node.js', 'Express.js', 'MongoDB', 'React.js', 'JWT', 'Razorpay'].map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
      
      <div className="container hero-bottom">
        <span>SCROLL TO EXPLORE</span>
        <span>{profile.location.toUpperCase()} · REMOTE WORLDWIDE</span>
      </div>
    </section>
  );
}
