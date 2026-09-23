import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Using spring physics for the trailing effect
  const cursorX = useSpring(0, { stiffness: 300, damping: 28, mass: 0.5 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const updateMousePosition = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive') ||
        target.classList.contains('arch-node')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      animate={{
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
        borderColor: isHovering ? 'rgba(139, 92, 246, 0.8)' : 'rgba(139, 92, 246, 0.4)',
      }}
      transition={{ type: "tween", duration: 0.2 }}
      style={{
        position: 'fixed',
        top: -16, // Center the 32px circle
        left: -16,
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        border: '2px solid rgba(139, 92, 246, 0.4)',
        pointerEvents: 'none', // Critical so it doesn't block clicks
        zIndex: 9999,
        x: cursorX,
        y: cursorY,
        boxShadow: isHovering ? '0 0 15px rgba(139, 92, 246, 0.4)' : 'none'
      }}
    />
  );
}
