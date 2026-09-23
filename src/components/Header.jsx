import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Sun, Moon } from 'lucide-react';
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

function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}>
      {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}

export function Header({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const location = useLocation();
  const home = location.pathname === '/';

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!home) return;
    const sections = navItems.map(([, id]) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, [home, location.pathname]);

  const linkHref = (id) => (home ? `#${id}` : `/#${id}`);
  const navCenterRef = useRef(null);
  const [pill, setPill] = useState({ opacity: 0 });

  useEffect(() => {
    const container = navCenterRef.current;
    if (!container) return;
    const activeEl = container.querySelector('a.active');
    if (!activeEl) {
      setPill(p => ({ ...p, opacity: 0 }));
      return;
    }
    const cRect = container.getBoundingClientRect();
    const aRect = activeEl.getBoundingClientRect();
    setPill({
      opacity: 1,
      width: aRect.width,
      transform: `translateX(${aRect.left - cRect.left}px)`
    });
  }, [active, home]);

  return (
    <>
      <header className={scrolled ? 'header scrolled' : 'header'}>
      <div className="container nav">
        <Link className="brand" to="/" aria-label="Manoj Kumar home">
          <img src={profile.portrait} alt="Manoj Kumar" className="brand-mark" style={{ objectFit: 'cover', width: '44px', height: '44px', border: '2px solid rgba(139, 92, 246, 0.4)', padding: '2px', background: '#0f172a' }} />
          <span>MANOJ KUMAR<small>FULL STACK DEVELOPER</small></span>
        </Link>
        <nav className="nav-center" ref={navCenterRef} aria-label="Main navigation">
          <span className="nav-pill" style={pill} aria-hidden="true" />
          {navItems.map(([label, id]) => (
            <a key={id} href={linkHref(id)} className={home && active === id ? 'active' : ''}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <a className="button button-outline nav-contact" href={profile.resume} target="_blank" rel="noreferrer">
            <FileText size={15} /><span>Resume</span>
          </a>
          <button
            className="menu-button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
      <div id="mobile-menu" className={open ? 'mobile-menu open' : 'mobile-menu'} aria-hidden={!open}>
        {navItems.map(([label, id]) => (
          <a
            key={id}
            href={linkHref(id)}
            className={home && active === id ? 'active' : ''}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            {label}
          </a>
        ))}
        <a className="button button-primary nav-contact" href={profile.resume} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
          <FileText size={16} /> Download resume
        </a>
      </div>
    </>
  );
}
