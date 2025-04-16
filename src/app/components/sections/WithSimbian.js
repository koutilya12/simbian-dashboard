"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WithSimbian({ onSectionChange, isActive = false }) {
  // For step-by-step animation
  const [currentStep, setCurrentStep] = useState(-1);
  
  // State for alert card counts that will animate to zero
  const [alertCounts, setAlertCounts] = useState({
    ignored: 75,
    wrongly: 42,
    threats: 18
  });
  
  // Additional state to track if counts have reached zero
  const [reachedZero, setReachedZero] = useState({
    ignored: false,
    wrongly: false,
    threats: false
  });
  
  // Reset progress when becoming active
  useEffect(() => {
    if (isActive) {
      setCurrentStep(0);
      // Reset counts to initial values when component becomes active
      setAlertCounts({
        ignored: 75,
        wrongly: 42,
        threats: 18
      });
      setReachedZero({
        ignored: false,
        wrongly: false,
        threats: false
      });
    } else {
      setCurrentStep(-1);
    }
  }, [isActive]);
  
  // Steps in the flow
  const steps = [
    {
      title: "Triaged & Reported",
      description: "SOC Agent handled investigation and reporting",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Automated Response",
      description: "Incident automatically contained",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: "Comprehensive Analysis",
      description: "AI recognized patterns",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Accurate Detection",
      description: "Zero false positives",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <path d="M22 4L12 14.01l-3-3" />
        </svg>
      )
    },
    {
      title: "24/7 Coverage",
      description: "No analyst fatigue",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      )
    }
  ];
  
  // Advance through steps automatically
  useEffect(() => {
    if (!isActive) return;
    
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, isActive, steps.length]);
  
  // Start countdown animation as soon as component becomes active
  useEffect(() => {
    if (!isActive || currentStep < 0) return;
    
    // Begin countdown for each alert type
    const countdownInterval = setInterval(() => {
      setAlertCounts(prev => {
        const newCounts = { ...prev };
        let allZero = true;
        
        // Calculate reduction rates based on steps completed
        // Faster reduction as more steps complete
        const progressFactor = Math.min(1, (currentStep + 1) / steps.length);
        const ignoredRate = Math.max(1, Math.floor(3 * progressFactor));
        const wronglyRate = Math.max(1, Math.floor(2 * progressFactor));
        const threatsRate = Math.max(1, Math.floor(1.5 * progressFactor));
        
        // Reduce each count by a calculated amount
        if (prev.ignored > 0) {
          newCounts.ignored = Math.max(0, prev.ignored - ignoredRate);
          if (newCounts.ignored === 0 && !reachedZero.ignored) {
            setReachedZero(prev => ({ ...prev, ignored: true }));
          }
          if (newCounts.ignored > 0) allZero = false;
        }
        
        if (prev.wrongly > 0) {
          newCounts.wrongly = Math.max(0, prev.wrongly - wronglyRate);
          if (newCounts.wrongly === 0 && !reachedZero.wrongly) {
            setReachedZero(prev => ({ ...prev, wrongly: true }));
          }
          if (newCounts.wrongly > 0) allZero = false;
        }
        
        if (prev.threats > 0) {
          newCounts.threats = Math.max(0, prev.threats - threatsRate);
          if (newCounts.threats === 0 && !reachedZero.threats) {
            setReachedZero(prev => ({ ...prev, threats: true }));
          }
          if (newCounts.threats > 0) allZero = false;
        }
        
        // Clear interval if all are zero
        if (allZero) {
          clearInterval(countdownInterval);
        }
        
        return newCounts;
      });
    }, 150); // Update every 150ms to make animation visible
    
    return () => clearInterval(countdownInterval);
  }, [currentStep, isActive, steps.length, reachedZero]);
  
  // Icons for the cards
  const Icons = {
    Check: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" />
      </svg>
    ),
    Arrow: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    )
  };
  
  // Solution summaries
  const solutions = [
    {
      title: "Less noise",
      description: "90% of alerts resolved automatically, 24/7",
      icon: (
        <div style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          backgroundColor: 'rgba(59, 130, 246, 0.2)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#10b981'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        </div>
      )
    },
    {
      title: "Holistic insight",
      description: "Correlates alerts to your environment",
      icon: (
        <div style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          backgroundColor: 'rgba(59, 130, 246, 0.2)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#10b981'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="M18 8L12 14l-3-3-5 5" />
          </svg>
        </div>
      )
    },
    {
      title: "Adapts automatically",
      description: "Investigate every alert—no SOAR needed",
      icon: (
        <div style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          backgroundColor: 'rgba(59, 130, 246, 0.2)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#10b981'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>
      )
    }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      exit={{ opacity: 0 }}
      style={{
        height: "100%", 
        width: '100%',
        display: isActive ? 'grid' : 'none', 
        gridTemplateColumns: 'minmax(250px, 1fr) minmax(350px, 2fr)',
        gap: '1.5rem',
        maxHeight: 'calc(100vh - 120px)',
        overflow: 'hidden',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
      }}
    >
      {/* Left Column */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem'
      }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: 'white',
            marginBottom: '0.5rem'
          }}>
            With Simbian
          </h2>
          <div style={{ 
            fontSize: '1.25rem', 
            fontWeight: '400', 
            color: '#bfdbfe'
          }}>
            Relax. Our AI Agents will take it from here.
          </div>
        </motion.div>
        
        {/* Alert Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{
            backgroundColor: 'rgba(59, 130, 246, 0.15)',
            borderRadius: '0.5rem',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            <div style={{ color: 'white', fontWeight: '500' }}>Ignored Alerts</div>
            <motion.div 
              style={{ 
                fontSize: '1.75rem', 
                fontWeight: 'bold', 
                color: reachedZero.ignored ? '#10b981' : 'white'
              }}
            >
              {alertCounts.ignored}
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div style={{
            backgroundColor: 'rgba(59, 130, 246, 0.15)',
            borderRadius: '0.5rem',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            <div style={{ color: 'white', fontWeight: '500' }}>Wrongly Closed</div>
            <motion.div 
              style={{ 
                fontSize: '1.75rem', 
                fontWeight: 'bold', 
                color: reachedZero.wrongly ? '#10b981' : 'white'
              }}
            >
              {alertCounts.wrongly}
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div style={{
            backgroundColor: 'rgba(59, 130, 246, 0.15)',
            borderRadius: '0.5rem',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            <div style={{ color: 'white', fontWeight: '500' }}>Active Threats</div>
            <motion.div 
              style={{ 
                fontSize: '1.75rem', 
                fontWeight: 'bold', 
                color: reachedZero.threats ? '#10b981' : 'white'
              }}
            >
              {alertCounts.threats}
            </motion.div>
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
            marginTop: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            border: 'none',
            fontSize: '1rem'
          }}
        >
          See the problem
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.5rem' }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
      
      {/* Right Column - Horizontal Step Flow */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        position: 'relative',
        height: '100%',
        overflow: 'hidden'
      }}>
        {/* Step progress top section */}
        <div style={{
          position: 'relative',
          width: '100%',
          paddingTop: '1.5rem',
          paddingBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Horizontal connecting line */}
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '0px',
            width: '100%',
            height: '3px',
            backgroundColor: 'rgba(96, 165, 250, 0.2)',
            zIndex: 0
          }}></div>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ 
              width: currentStep < 0 ? 0 : currentStep >= steps.length ? '100%' : `${(currentStep) * 100/(steps.length-1)}%`
            }}
            style={{
              position: 'absolute',
              top: '40px',
              left: '0px',
              height: '3px',
              backgroundColor: '#10b981',
              zIndex: 1
            }}
          ></motion.div>
          
          {/* Step circles */}
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.4 }}
              animate={{ 
                opacity: index <= currentStep ? 1 : 0.4,
                scale: index === currentStep ? 1.1 : 1
              }}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: index <= currentStep ? '#10b981' : '#60a5fa',
                border: '2px solid',
                borderColor: index <= currentStep ? '#10b981' : '#60a5fa',
                zIndex: 2,
                position: 'relative'
              }}
            >
              {index <= currentStep && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Current step content */}
        <AnimatePresence mode="wait">
          {currentStep >= 0 && currentStep < steps.length && (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderRadius: '0.75rem',
                padding: '1.25rem',
                borderLeft: '3px solid #10b981',
                maxWidth: '600px'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem'
              }}>
                <div style={{
                  backgroundColor: '#10b981',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white'
                }}>
                  {steps[currentStep].icon}
                </div>
                <h3 style={{
                  color: 'white',
                  fontSize: '1.25rem',
                  fontWeight: '600'
                }}>
                  {steps[currentStep].title}
                </h3>
              </div>
              <p style={{
                color: '#bfdbfe',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>
                {steps[currentStep].description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Solution cards - show after steps complete */}
        <AnimatePresence>
          {currentStep >= steps.length && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginTop: '1rem'
            }}>
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.15)',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    borderLeft: '3px solid #10b981',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    maxWidth: '600px'
                  }}
                >
                  {solution.icon}
                  <div>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#10b981', marginBottom: '0.25rem' }}>
                      {solution.title}
                    </h4>
                    <p style={{ color: '#bfdbfe', fontSize: '0.875rem' }}>
                      {solution.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}