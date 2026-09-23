import React, { useState } from 'react';
import { ArrowUpRight, Mail, Linkedin, Github, Send, Check } from 'lucide-react';
import { SectionTitle } from './ui/SectionTitle';
import { Reveal } from './ui/Reveal';
import { SpotlightCard } from './ui/SpotlightCard';
import { profile, services } from '../data/profile.js';
import { sendInquiry } from '../services/api.js';

export function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <SectionTitle 
          number="05" 
          kicker="HOW I CAN HELP" 
          title={<>Build new. Improve<br /><em>what exists.</em></>} 
          description="For founders, software agencies and product teams that need dependable backend capacity." 
        />
        
        <Reveal as="div" stagger className="services-grid">
          {services.map(([title, description], i) => (
            <SpotlightCard className="service" key={title}>
              <span className="service-index">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <ArrowUpRight size={21} />
            </SpotlightCard>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  const initial = { name: '', email: '', company: '', projectType: '', budgetRange: '', message: '', website: '' };
  const [form, setForm] = useState(initial);
  const [state, setState] = useState('idle');
  const [message, setMessage] = useState('');

  async function submit(e) {
    e.preventDefault();
    setState('loading');
    setMessage('');
    try {
      await sendInquiry(form);
      setState('success');
      setMessage('Inquiry sent. Thank you — I will reply soon.');
      setForm(initial);
    } catch (error) {
      setState('error');
      setMessage(error.message);
    }
  }

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section id="contact" className="section contact">
      <div className="container contact-grid">
        <Reveal>
          <SectionTitle 
            number="06" 
            kicker="LET'S CONNECT" 
            title={<>Have a product to build<br />or a backend <em>to improve?</em></>} 
          />
          <p className="contact-intro">
            Tell me what you're working on. I'm available for focused freelance projects, existing team support and remote backend roles.
          </p>
          
          <div className="contact-links">
            <a href={`mailto:${profile.email}`}>
              <Mail size={19} /><span>{profile.email}</span><ArrowUpRight size={19} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={19} /><span>LinkedIn</span><ArrowUpRight size={19} />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github size={19} /><span>GitHub</span><ArrowUpRight size={19} />
            </a>
          </div>
          
          <div className="contact-avail">
            {['Remote roles', 'Contract work', 'Freelance projects', profile.location].map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </Reveal>
        
        <Reveal as="form" className="contact-form" onSubmit={submit}>
          <div className="form-heading">
            <span>PROJECT INQUIRY</span>
            <span>01 / 01</span>
          </div>
          
          <div className="form-row">
            <label>Your name *
              <input name="name" value={form.name} onChange={change} required minLength="2" maxLength="100" placeholder="Your name" />
            </label>
            <label>Email address *
              <input type="email" name="email" value={form.email} onChange={change} required placeholder="you@company.com" />
            </label>
          </div>
          
          <label>Company <span>(optional)</span>
            <input name="company" value={form.company} onChange={change} maxLength="120" placeholder="Company or organization" />
          </label>
          
          <div className="form-row">
            <label>Project type *
              <select name="projectType" value={form.projectType} onChange={change} required>
                <option value="">Select a type</option>
                {['Backend/API Development', 'MERN Application', 'AI Integration', 'Existing Project', 'MVP', 'Other'].map(x => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label>Budget range *
              <select name="budgetRange" value={form.budgetRange} onChange={change} required>
                <option value="">Select a range</option>
                {['Not sure yet', 'Under $1,000', '$1,000–$5,000', '$5,000–$10,000', '$10,000+'].map(x => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
          </div>
          
          <label>What are you building? *
            <textarea name="message" value={form.message} onChange={change} required minLength="20" maxLength="3000" rows="5" placeholder="Tell me about your product, backend challenge or upcoming milestone…" />
          </label>
          
          {/* Honeypot field to catch spam bots */}
          <input className="honeypot" tabIndex="-1" autoComplete="off" aria-hidden="true" name="website" value={form.website} onChange={change} />
          
          <button className="button button-primary submit" disabled={state === 'loading'}>
            {state === 'loading' ? 'Sending…' : 'Send project inquiry'}<Send size={17} />
          </button>
          
          {message && (
            <p className={state === 'success' ? 'form-message success' : 'form-message error'} role="status">
              {state === 'success' ? <Check size={17} /> : null}{message}
            </p>
          )}
          
          <p className="form-footnote">
            Prefer email? Write to <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
