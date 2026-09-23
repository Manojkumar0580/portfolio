import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowRight, FileText, Github, Linkedin, Mail, Smartphone, Server, Database, Layers, Activity, CreditCard, Cloud, Shield, GitBranch, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile, metrics } from '../data/profile.js';

export function Hero() {
  const areas = ['Node.js Developer', 'MERN Stack Developer', 'Full-Stack Developer'];
  const [area, setArea] = useState(0);
  const heroRef = useRef(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeLog, setActiveLog] = useState(null);

  const nodeLogs = {
    Client: { time: "[REQ]", type: "200", text: "GET /api/v1/dashboard from Mobile Client", color: "log-success" },
    Auth: { time: "[SEC]", type: "OK", text: "JWT Signature verified for user_id=4091", color: "log-info" },
    MongoDB: { time: "[DB]", type: "200", text: "Index scan completed in 14ms (1240 docs)", color: "log-success" },
    AWS: { time: "[CLOUD]", type: "INFO", text: "S3 Bucket sync completed successfully", color: "log-info" },
    Redis: { time: "[CACHE]", type: "HIT", text: "Session token retrieved (2ms)", color: "log-info" },
    Payments: { time: "[PAY]", type: "200", text: "Stripe Webhook: charge.succeeded verified", color: "log-success" },
    "CI/CD": { time: "[GIT]", type: "OK", text: "Deploy preview built successfully in 45s", color: "log-info" },
    Sockets: { time: "[WS]", type: "INFO", text: "Client connected to namespace /chat", color: "log-info" }
  };

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
      const xPercent = (e.clientX - rect.left) / rect.width;
      const yPercent = (e.clientY - rect.top) / rect.height;
      node.style.setProperty('--mx', `${(xPercent * 100).toFixed(1)}%`);
      node.style.setProperty('--my', `${(yPercent * 100).toFixed(1)}%`);
      setMousePos({ x: xPercent - 0.5, y: yPercent - 0.5 });
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
          className="hero-visual architecture-visual" 
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="orbital-wrapper">
            <div className="orbital-container">
            {/* Center Node */}
            <div className="orbit-center">
              <motion.div 
                className="orbit-pulse"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Server size={32} color="#8b5cf6" />
              <span>API Gateway</span>
            </div>

            {/* Orbit Ring */}
            <div className="orbit-ring">
              
              {/* Orbiting Nodes (8 total) */}
              <div className="orbit-node node-1" onMouseEnter={() => setActiveLog(nodeLogs['Client'])} onMouseLeave={() => setActiveLog(null)}>
                <motion.div animate={{ x: [0, 3, -2, 0], y: [0, -4, 2, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="orbit-icon-wrap client-glow">
                    <Smartphone size={20} color="#60a5fa" />
                  </div>
                  <span>Client</span>
                </motion.div>
              </div>
              
              <div className="orbit-node node-2" onMouseEnter={() => setActiveLog(nodeLogs['Auth'])} onMouseLeave={() => setActiveLog(null)}>
                <motion.div animate={{ x: [0, -3, 4, 0], y: [0, 2, -3, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="orbit-icon-wrap auth-glow">
                    <Shield size={20} color="#ec4899" />
                  </div>
                  <span>Auth</span>
                </motion.div>
              </div>
              
              <div className="orbit-node node-3" onMouseEnter={() => setActiveLog(nodeLogs['MongoDB'])} onMouseLeave={() => setActiveLog(null)}>
                <motion.div animate={{ x: [0, 4, 2, 0], y: [0, -3, 4, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="orbit-icon-wrap db-glow">
                    <Database size={20} color="#10b981" />
                  </div>
                  <span>MongoDB</span>
                </motion.div>
              </div>
              
              <div className="orbit-node node-4" onMouseEnter={() => setActiveLog(nodeLogs['AWS'])} onMouseLeave={() => setActiveLog(null)}>
                <motion.div animate={{ x: [0, -4, 3, 0], y: [0, 4, -2, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="orbit-icon-wrap cloud-glow">
                    <Cloud size={20} color="#0ea5e9" />
                  </div>
                  <span>AWS</span>
                </motion.div>
              </div>

              <div className="orbit-node node-5" onMouseEnter={() => setActiveLog(nodeLogs['Redis'])} onMouseLeave={() => setActiveLog(null)}>
                <motion.div animate={{ x: [0, 2, -4, 0], y: [0, -4, -1, 0] }} transition={{ duration: 3.9, repeat: Infinity, ease: "easeInOut" }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="orbit-icon-wrap cache-glow">
                    <Layers size={20} color="#ef4444" />
                  </div>
                  <span>Redis</span>
                </motion.div>
              </div>
              
              <div className="orbit-node node-6" onMouseEnter={() => setActiveLog(nodeLogs['Payments'])} onMouseLeave={() => setActiveLog(null)}>
                <motion.div animate={{ x: [0, -3, 2, 0], y: [0, 3, 4, 0] }} transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut" }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="orbit-icon-wrap pay-glow">
                    <CreditCard size={20} color="#f59e0b" />
                  </div>
                  <span>Payments</span>
                </motion.div>
              </div>

              <div className="orbit-node node-7" onMouseEnter={() => setActiveLog(nodeLogs['CI/CD'])} onMouseLeave={() => setActiveLog(null)}>
                <motion.div animate={{ x: [0, 4, -2, 0], y: [0, -2, -4, 0] }} transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="orbit-icon-wrap git-glow">
                    <GitBranch size={20} color="#f97316" />
                  </div>
                  <span>CI/CD</span>
                </motion.div>
              </div>

              <div className="orbit-node node-8" onMouseEnter={() => setActiveLog(nodeLogs['Sockets'])} onMouseLeave={() => setActiveLog(null)}>
                <motion.div animate={{ x: [0, -4, 3, 0], y: [0, -4, 2, 0] }} transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut" }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="orbit-icon-wrap ws-glow">
                    <Zap size={20} color="#eab308" />
                  </div>
                  <span>Sockets</span>
                </motion.div>
              </div>
            </div>
            
            {/* Data particles flying to center */}
            <svg className="orbit-particles" viewBox="0 0 200 200">
              <motion.circle r="3" fill="#60a5fa" animate={{ cx: [20, 100], cy: [100, 100], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
              <motion.circle r="3" fill="#10b981" animate={{ cx: [180, 100], cy: [100, 100], opacity: [0, 1, 0] }} transition={{ duration: 1.5, delay: 0.7, repeat: Infinity, ease: "linear" }} />
              <motion.circle r="3" fill="#ef4444" animate={{ cx: [100, 100], cy: [20, 100], opacity: [0, 1, 0] }} transition={{ duration: 1.5, delay: 0.3, repeat: Infinity, ease: "linear" }} />
              <motion.circle r="3" fill="#f59e0b" animate={{ cx: [100, 100], cy: [180, 100], opacity: [0, 1, 0] }} transition={{ duration: 1.5, delay: 1.1, repeat: Infinity, ease: "linear" }} />
              <motion.circle r="3" fill="#ec4899" animate={{ cx: [45, 100], cy: [45, 100], opacity: [0, 1, 0] }} transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, ease: "linear" }} />
              <motion.circle r="3" fill="#0ea5e9" animate={{ cx: [155, 100], cy: [155, 100], opacity: [0, 1, 0] }} transition={{ duration: 1.5, delay: 0.9, repeat: Infinity, ease: "linear" }} />
            </svg>
          </div>
          </div>
          
          <div className="arch-logs" style={{ height: '150px', display: 'flex', flexDirection: 'column' }}>
            <div className="arch-logs-header">
              <Activity size={12} color="#8b5cf6" /> Server Terminal
            </div>
            {activeLog ? (
              <motion.div className="arch-log-line" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <span className="log-time">{activeLog.time}</span> <span className={activeLog.color}>{activeLog.type}</span> {activeLog.text}
              </motion.div>
            ) : (
              <>
                <motion.div className="arch-log-line" animate={{ opacity: [0.5, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <span className="log-time">[API]</span> <span className="log-info">INFO</span> System initialized properly
                </motion.div>
                <motion.div className="arch-log-line" animate={{ opacity: [0.5, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}>
                  <span className="log-time">[DB]</span> <span className="log-success">200</span> Database connection established
                </motion.div>
                <motion.div className="arch-log-line" animate={{ opacity: [0.5, 1] }} transition={{ repeat: Infinity, duration: 2.5, delay: 1.2 }}>
                  <span className="log-time">[CACHE]</span> <span className="log-info">HIT</span> Redis cluster ready
                </motion.div>
              </>
            )}
          </div>
          
          <div className="hero-stack-strip">
            {['Microservices', 'REST APIs', 'WebSockets', 'Node.js', 'MongoDB', 'Redis'].map(t => (
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
