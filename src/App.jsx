import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee, Stats } from './components/Stats';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Lifecycle } from './components/Lifecycle';
import { Work } from './components/Work';
import { Services, Contact } from './components/ServicesContact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/ui/CustomCursor';

import { profile } from './data/profile.js';

const ProjectDetails = lazy(() => import('./pages/ProjectDetails.jsx'));

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('theme') || 'dark';
  });
  
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'light' ? '#f8fafc' : '#020617');
    }
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme]);
  
  return [theme, () => setTheme(t => t === 'light' ? 'dark' : 'light')];
}

function Home() {
  return (
    <>
      <Helmet>
        <title>Manoj Kumar — Node.js Backend & Full-Stack Developer</title>
        <meta name="description" content="Manoj Kumar builds production Node.js APIs, MERN applications, real-time systems, payments and practical AI integrations. Available for freelance and remote work." />
        <link rel="canonical" href={import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') || 'https://manoj-portfolio.example.com'} />
        <meta property="og:title" content="Manoj Kumar — Node.js Backend & Full-Stack Developer" />
        <meta property="og:description" content="Manoj Kumar builds production Node.js APIs, MERN applications, real-time systems, payments and practical AI integrations. Available for freelance and remote work." />
        {/* We can add JSON-LD here for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Manoj Kumar",
            "jobTitle": "Backend Developer",
            "description": "Node.js Backend Developer & MERN Stack Developer",
            "url": import.meta.env.VITE_SITE_URL || "https://manoj-portfolio.example.com"
          })}
        </script>
      </Helmet>
      
      <Hero />
      <Marquee />
      <Stats />
      <About />
      <Experience />
      <Skills />
      <Lifecycle />
      <Work />
      <Services />
      <Contact />
    </>
  );
}

function NotFound() {
  return (
    <section className="not-found container">
      <span className="eyebrow">404 / PAGE NOT FOUND</span>
      <h1>That route isn't<br /><em>in the system.</em></h1>
      <p>The page you requested does not exist.</p>
      <Link className="button button-primary" to="/">
        Back to home <ArrowRight size={18} />
      </Link>
    </section>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => document.querySelector(location.hash)?.scrollIntoView(), 80);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);
  
  return (
    <>
      <CustomCursor />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Suspense fallback={<div className="route-loading">Loading project…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
