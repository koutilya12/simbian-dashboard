"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WithoutSimbian from './components/sections/WithoutSimbian';
import WithSimbian from './components/sections/WithSimbian';

export default function App() {
  // State to control which section is active
  const [activeSection, setActiveSection] = useState("without"); // "without" or "with"
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Auto transition after a delay when in "without" section
  useEffect(() => {
    let autoTransitionTimer;
    
    if (activeSection === "without" && !isTransitioning) {
      // Set timer to automatically transition after 15 seconds (increased from 8)
      autoTransitionTimer = setTimeout(() => {
        toggleSection("with");
      }, 15000); // 15 seconds delay (increased from 8000)
    }
    
    // Clear the timer when component unmounts or section changes
    return () => {
      if (autoTransitionTimer) {
        clearTimeout(autoTransitionTimer);
      }
    };
  }, [activeSection, isTransitioning]);
  
  // Toggle between sections with transition
  const toggleSection = (newSection) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveSection(newSection);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match this to your longest transition duration
  };
  
  return (
    <div style={{ 
      backgroundColor: '#0f172a', 
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Header */}
      <header style={{ 
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 10,
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ 
            color: 'white', 
            fontSize: '1.5rem', 
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Simbian
          </div>
          
          <nav style={{ 
            display: 'flex',
            gap: '2rem',
            marginLeft: '2rem'
          }}>
            <button style={{ 
              color: '#60a5fa', 
              fontWeight: '500',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}>
              Products
            </button>
            <button style={{ 
              color: '#60a5fa', 
              fontWeight: '500',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}>
              Company
            </button>
            <button style={{ 
              color: '#60a5fa', 
              fontWeight: '500',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}>
              Resources
            </button>
            <button style={{ 
              color: '#60a5fa', 
              fontWeight: '500',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}>
              Blog
            </button>
          </nav>
        </div>
        
        {/* Book a demo button */}
        <button style={{ 
          backgroundColor: 'white', 
          color: '#1e3a8a', 
          padding: '0.625rem 1.25rem', 
          borderRadius: '9999px', 
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          border: 'none',
          fontSize: '0.95rem',
          gap: '0.5rem'
        }}>
          Book a Demo
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </button>
      </header>
      
      {/* Main content container */}
      <main style={{ 
        position: 'relative',
        height: 'calc(100vh - 80px)', // Adjust based on header height
        overflow: 'hidden'
      }}>
        {/* Vertical navigation dots */}
        <div style={{
          position: 'absolute',
          right: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          zIndex: 10
        }}>
          <motion.button
            onClick={() => !isTransitioning && toggleSection("without")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: activeSection === "without" ? 'white' : 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              cursor: isTransitioning ? 'default' : 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={activeSection === "without" ? "#1e3a8a" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={() => !isTransitioning && toggleSection("with")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: activeSection === "with" ? 'white' : 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              cursor: isTransitioning ? 'default' : 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={activeSection === "with" ? "#1e3a8a" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19l-7-7 7-7" />
              <path d="M15 5l7 7-7 7" />
            </svg>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </motion.button>
        </div>
        
        {/* Content sections */}
        <div style={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          position: 'relative'
        }}>
          <AnimatePresence mode="wait">
            {activeSection === "without" ? (
              <motion.div 
                key="without"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: { duration: 0.5 }
                }}
                exit={{ 
                  opacity: 0, 
                  x: '-100vw',
                  transition: { duration: 0.7 }
                }}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
              >
                <WithoutSimbian 
                  onSectionChange={() => toggleSection("with")}
                  isActive={true}
                />
              </motion.div>
            ) : (
              <motion.div
                key="with"
                initial={{ opacity: 0, x: '100vw' }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.7 }
                }}
                exit={{ 
                  opacity: 0,
                  transition: { duration: 0.5 }
                }}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
              >
                <WithSimbian 
                  onSectionChange={() => toggleSection("without")}
                  isActive={true}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}