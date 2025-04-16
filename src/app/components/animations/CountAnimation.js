// src/app/components/animations/CountAnimation.js
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountAnimation({ value, duration = 2, animate = true }) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    if (!animate) {
      setDisplayValue(value);
      return;
    }
    
    let startTime;
    let animationFrameId;
    const startValue = displayValue;
    
    const updateValue = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Use easeOut function for smoother animation
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + easeOutProgress * (value - startValue));
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateValue);
      }
    };
    
    animationFrameId = requestAnimationFrame(updateValue);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [value, duration, animate, displayValue]);
  
  return (
    <motion.span
      key={displayValue}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {displayValue}
    </motion.span>
  );
}