import React from 'react';
import { motion } from 'framer-motion';

export function Reveal({ as = 'div', className = '', stagger = false, children, delay = 0, ...rest }) {
  const Tag = motion[as] || motion.div;
  
  if (stagger) {
    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: delay }
      }
    };
    
    const item = {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
    };
    
    return (
      <Tag
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        className={className}
        {...rest}
      >
        {React.Children.map(children, child => (
          <motion.div variants={item}>{child}</motion.div>
        ))}
      </Tag>
    );
  }

  return (
    <Tag
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
