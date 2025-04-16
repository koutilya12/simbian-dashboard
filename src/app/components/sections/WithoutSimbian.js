"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AlertCard from '../ui/AlertCard'; // Make sure this path is correct

export default function WithoutSimbian({ onSectionChange, isActive = true }) {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [activeThreatsCount, setActiveThreatsCount] = useState(5);

  // Listen for falling icons to increment Active Threats count
  useEffect(() => {
    const handleIconDrop = (event) => {
      if (isActive) {
        // Add a slight delay to match the animation timing
        setTimeout(() => {
          setActiveThreatsCount(prev => prev + 1);
        }, 1800); // Slightly before the animation completes
      }
    };

    window.addEventListener('iconDrop', handleIconDrop);

    return () => {
      window.removeEventListener('iconDrop', handleIconDrop);
    };
  }, [isActive]);

  // Problem statements that cycle through
  const problemStatements = [
    {
      title: "Wasting valuable analyst time",
      description: "Wasting valuable analyst time on false positives"
    },
    {
      title: "Processing one alert at a time",
      description: "Processing one alert at a time, missing the big picture"
    },
    {
      title: "More time fixing SOAR automation",
      description: "More time fixing SOAR automation, less time on real threats"
    }
  ];

  // Cycle through problem statements every few seconds
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCurrentProblemIndex((prev) =>
        prev === problemStatements.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isActive, problemStatements.length]);

  // SVG Icons for the cards
  const Icons = {
    Ignored: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11.46 3.06a.75.75 0 011.08 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.75 2.75 0 00-3.89 0l-8.69 8.69a.75.75 0 001.06 1.06l8.69-8.69z" />
        <path d="M12 5.328l8.579 8.579a2.25 2.25 0 01.659 1.591v4.752a2.25 2.25 0 01-2.25 2.25h-14a2.25 2.25 0 01-2.25-2.25v-4.752a2.25 2.25 0 01.659-1.591L12 5.328z" />
      </svg>
    ),
    Wrongly: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    Threat: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    )
  };

  // SVG Icons for the problem statements
  const ProblemIcons = {
    Wasting: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    Processing: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="9" x2="15" y2="15" />
        <line x1="15" y1="9" x2="9" y2="15" />
      </svg>
    ),
    MoreTime: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    )
  };

  // Additional problem statement component
  const AskingSupervisor = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{
        backgroundColor: 'rgba(30, 58, 138, 0.3)',
        borderRadius: '0.75rem',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5rem'
      }}
    >
      <div style={{
        backgroundColor: '#1e3a8a',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '1rem',
        marginBottom: "2rem"
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
      <div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: 'white' }}>
          Asking Supervisor
        </h3>
        <p style={{ color: '#bfdbfe', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          The analyst is in training and needs some help...
        </p>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
      style={{
        width: '100%', // Full width container
        display: isActive ? 'flex' : 'none', // Using flex layout
        justifyContent: 'space-between', // Changed to space-between to separate the columns
        maxHeight: 'calc(100vh - 100px)',
        overflow: 'hidden',
        padding: '0 2rem'
      }}
    >
      {/* Left Column - Problem Statements */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
        width: '35%', // Set specific width for left column
        marginLeft: '10%', // Push from left edge
        marginTop: "5rem"
      }}>
        {/* Asking Supervisor card */}
        {AskingSupervisor}

        {/* Problem card - Wasting valuable analyst time */}
        <motion.div
          style={{
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            borderRadius: '0.75rem',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div style={{
            backgroundColor: '#dc2626',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '1rem',
            flexShrink: 0
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: '1rem', fontWeight: '400', color: 'white' }}>
              Wasting valuable analyst time on false positives
            </p>
          </div>
        </motion.div>

        {/* Problem card - Processing one alert at a time */}
        <motion.div
          style={{
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            borderRadius: '0.75rem',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div style={{
            backgroundColor: '#dc2626',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '1rem',
            flexShrink: 0
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="12" x="3" y="6" rx="2" />
              <line x1="3" x2="21" y1="12" y2="12" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: '1rem', fontWeight: '400', color: 'white' }}>
              Processing one alert at a time, missing the big picture
            </p>
          </div>
        </motion.div>

        {/* Problem card - More time fixing */}
        <motion.div
          style={{
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            borderRadius: '0.75rem',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div style={{
            backgroundColor: '#dc2626',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '1rem',
            flexShrink: 0
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="6" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: '1rem', fontWeight: '400', color: 'white' }}>
              More time fixing SOAR automation, less time on real threats
            </p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSectionChange}
          style={{
            backgroundColor: 'white',
            color: '#1e3a8a',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            fontWeight: '600',
            alignSelf: 'flex-start',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            border: 'none',
            fontSize: '1rem',
            marginTop: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          Book a Demo
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.5rem' }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Right Column - Alert Cards */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        maxHeight: '100%',
        position: 'relative',
        width: '35%', // Set specific width for right column
        marginRight: '5%' // Add space from right edge
      }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem',
            }}>
              Without Simbian
            </h2>
            <div style={{
              fontSize: '1.25rem',
              fontWeight: '400',
              color: '#bfdbfe',
              marginBottom: '1.5rem'
            }}>
              If this sounds all too familiar, you might want to...
            </div>
          </motion.div>
          {/* Alert Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AlertCard
              title="Ignored Alerts"
              count={200}
              cardColor="blue"
              icon={Icons.Ignored}
              increaseThreatCount={true}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <AlertCard
              title="Wrongly Closed"
              count={35}
              cardColor="blue"
              icon={Icons.Wrongly}
              increaseThreatCount={true}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <AlertCard
              title="Active Threats"
              count={activeThreatsCount}
              cardColor="red"
              icon={Icons.Threat}
            />
          </motion.div>
        </div>
    </motion.div>
  );
}