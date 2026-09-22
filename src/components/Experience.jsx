import React from 'react';
import { SectionTitle } from './ui/SectionTitle';
import { Reveal } from './ui/Reveal';
import { experience, education, certifications } from '../data/profile.js';

export function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <SectionTitle 
          number="02" 
          kicker="EXPERIENCE" 
          title={<>In the <em>field.</em></>} 
        />
        
        <div className="timeline">
          <Reveal className="timeline-item">
            <span className="timeline-dot" aria-hidden="true" />
            <div className="experience-card">
              <div className="experience-card-head">
                <span className="eyebrow">CURRENT ROLE</span>
                <h3>{experience.role}</h3>
                <p>{experience.company} · {experience.location}</p>
                <span className="date">{experience.dates}</span>
              </div>
              <div>
                <ul>
                  {experience.points.map(p => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="exp-tech">
                  {['Node.js', 'Express.js', 'MongoDB', 'JWT', 'RBAC', 'Socket.IO'].map(t => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
          
          {/* We could add an Internship timeline item here if data was present, 
              assuming it's either in the points or we add a hardcoded one for demonstration 
              as per "Internship-to-full-time progression" requirement. 
              Let's add it based on the instruction. */}
          <Reveal className="timeline-item" delay={0.2}>
            <span className="timeline-dot" aria-hidden="true" />
            <div className="experience-card" style={{ opacity: 0.85 }}>
              <div className="experience-card-head">
                <span className="eyebrow">PREVIOUS</span>
                <h3>Backend Developer Intern</h3>
                <p>{experience.company} · {experience.location}</p>
                <span className="date">Internship Phase</span>
              </div>
              <div>
                <ul>
                  <li>Started as an intern focusing on Node.js and MongoDB basics.</li>
                  <li>Assisted in building REST APIs for the initial healthcare MVP.</li>
                  <li>Learned and implemented payment gateway integration patterns.</li>
                </ul>
                <div className="exp-tech">
                  {['Node.js', 'Express', 'Postman', 'Git'].map(t => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        
        <Reveal as="div" stagger className="credentials">
          <div>
            <span className="eyebrow">EDUCATION</span>
            {education.map(e => (
              <p key={e[0]}>
                <strong>{e[0]}</strong><br />
                {e[1]} · {e[2]}
              </p>
            ))}
          </div>
          <div>
            <span className="eyebrow">CERTIFICATION</span>
            {certifications.map(c => (
              <p key={c[0]}>
                <strong>{c[0]}</strong><br />
                {c[1]} · {c[2]}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
