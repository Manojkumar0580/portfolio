import React from 'react';
import { Reveal } from './Reveal';

export function SectionTitle({ number, kicker, title, description }) {
  return (
    <Reveal className="section-heading">
      <span className="heading-watermark" aria-hidden="true">{number.split('.')[0]}</span>
      <span className="eyebrow">{number} / {kicker}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </Reveal>
  );
}
