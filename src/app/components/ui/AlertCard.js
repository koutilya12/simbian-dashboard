"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AlertCard({ title, count, cardColor, icon, showAlerts = true, animate = true, increaseThreatCount = false }) {
  const [currentCount, setCurrentCount] = useState(count);
  const [alerts, setAlerts] = useState([]);
  const [shake, setShake] = useState(false);
  const [glow, setGlow] = useState(false);
  const [dummyAlerts, setDummyAlerts] = useState([]);

  // Define a set of reusable SVG icons
  const svgIcons = [
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
    </svg>,
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>,
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>,
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ];

  // Initialize icons state with a full row (5 icons) for first two cards only, empty for Active Threats
  const initialIcons = title !== "Active Threats" ? Array.from({ length: 5 }, (_, index) => ({
    id: `initial-${index}-${Date.now()}-${Math.random()}`,
    icon: svgIcons[index % svgIcons.length],
    sourceCard: title,
    timestamp: new Date().getTime(),
    positionIndex: index,
    isInitial: true
  })) : [];

  const [icons, setIcons] = useState(initialIcons);

  // Sample alert messages
  const alertTypes = {
    "Ignored Alerts": [
      "Phishing Email Detected", 
      "Suspicious Login Attempt", 
      "Potential Malware", 
      "Unusual Network Activity",
      "Unrecognized Device"
    ],
    "Wrongly Closed": [
      "False Positive Confirmed", 
      "Analyst Error", 
      "Miscategorized Alert", 
      "Investigation Incomplete",
      "Premature Closure"
    ],
    "Active Threats": [
      "Data Exfiltration Attempt", 
      "Ransomware Detected", 
      "Privilege Escalation", 
      "Zero-day Exploit",
      "APT Activity"
    ]
  };

  // Generate random alert
  const generateAlert = () => {
    const alertMessages = alertTypes[title] || alertTypes["Ignored Alerts"];
    const randomAlert = alertMessages[Math.floor(Math.random() * alertMessages.length)];
    const id = Date.now();
    
    return {
      id,
      message: randomAlert,
      timestamp: new Date().toLocaleTimeString()
    };
  };

  // Generate an icon for the Active Threats card
  const generateIcon = () => {
    const randomIcon = svgIcons[Math.floor(Math.random() * svgIcons.length)];
    
    return {
      id: Date.now(),
      icon: randomIcon,
      sourceCard: title,
      timestamp: new Date().getTime()
    };
  };

  // Add new alerts periodically for Active Threats only
  useEffect(() => {
    if (!animate) return;
    
    const alertInterval = setInterval(() => {
      if (!showAlerts) return;
      
      // For Active Threats card only: add alerts and update visuals
      if (title === "Active Threats") {
        const newAlert = generateAlert();
        
        setAlerts(prev => {
          const updated = [newAlert, ...prev].slice(0, 3);
          return updated;
        });
        
        // Add dummy alert for visual effect
        setDummyAlerts(prev => {
          const updated = [newAlert, ...prev].slice(0, 1);
          return updated;
        });
        
        // Trigger shake and glow animations for the whole card
        setShake(true);
        setGlow(true);
        setTimeout(() => {
          setShake(false);
          setGlow(false);
        }, 500);
        
        // Add a new icon to the Active Threats icon row
        const newIcon = generateIcon();
        setIcons(prev => {
          const updatedIcons = [...prev, newIcon].slice(-5);
          return updatedIcons;
        });
      }
      
      // For other cards: only increment counter, no visual updates or dropping icons
      else {
        setCurrentCount(prev => prev + 1);
        
        // Just dispatch the event to increment threat count without creating falling icons
        if (increaseThreatCount) {
          const event = new CustomEvent('iconDrop', { 
            detail: { 
              source: title,
              icon: svgIcons[Math.floor(Math.random() * svgIcons.length)],
              id: Date.now(),
              timestamp: new Date().getTime() 
            } 
          });
          window.dispatchEvent(event);
        }
      }
      
    }, title === "Active Threats" ? 7000 : title === "Wrongly Closed" ? 5000 : 4000);
    return () => clearInterval(alertInterval);
  }, [title, animate, showAlerts, increaseThreatCount]);

  // Listen for icons being dropped (only in Active Threats card)
  useEffect(() => {
    if (title !== "Active Threats") return;
    
    const handleIconDrop = (event) => {
      const { icon, id, source } = event.detail;
      
      // Trigger red glow effect
      setGlow(true);
      setTimeout(() => setGlow(false), 500);
      
      // Add new icon
      setIcons(prev => {
        const existingIndex = prev.findIndex(item => item.id === id);
        if (existingIndex >= 0) return prev;
        
        const newIcon = {
          id,
          icon,
          source,
          received: new Date().getTime()
        };
        
        // Only keep max 5 icons
        return [...prev, newIcon].slice(-5);
      });
    };
    
    window.addEventListener('iconDrop', handleIconDrop);
    return () => window.removeEventListener('iconDrop', handleIconDrop);
  }, [title]);

  // Determine card styles based on cardColor
  const bgColor = "rgba(16, 23, 42, 0.7)";
  const borderColor = cardColor === "red" ? "rgba(248, 113, 113, 0.3)" : "rgba(30, 64, 175, 0.2)";
  const textColor = cardColor === "red" ? "rgb(248, 113, 113)" : "rgb(96, 165, 250)";

  // Create boxed icons for each card
  const getIconRow = () => {
    // For Ignored Alerts and Wrongly Closed: Use static flexbox layout with no animations
    if (title !== "Active Threats") {
      return (
        <div className="icon-row" style={{ 
          display: 'flex',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '0.35rem',
          borderRadius: '0.5rem',
          gap: '0.25rem',
          marginTop: '0.5rem',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}>
          {icons.map((iconData, index) => (
            <div 
              key={`icon-${index}-${iconData.id}`}
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                flexShrink: 0
              }}
            >
              {iconData.icon}
            </div>
          ))}
        </div>
      );
    }

    // For Active Threats: Use compact fixed positions
    return (
      <div className="icon-row" style={{ 
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: '0.35rem',
        borderRadius: '0.5rem',
        marginTop: '0.5rem',
        height: '32px',
        overflow: 'hidden'
      }}>
        {icons.map((iconData, index) => {
          // Move icons to extreme left with no gap
          const positions = [
            5,   // First icon - almost at the edge
            30,  // Second icon
            55,  // Third icon
            80,  // Fourth icon
            105  // Fifth icon
          ];
          
          // Use position from the pre-defined array
          const xPosition = positions[index];

          return (
            <motion.div 
              key={`icon-${index}-${iconData.id}`}
              initial={{ 
                x: xPosition, 
                y: 0,    // Start at position, no dropping animation
                opacity: 1, 
                scale: 1 
              }}
              animate={{ 
                x: xPosition, 
                y: 0, 
                opacity: 1, 
                scale: 1 
              }}
              transition={{ 
                duration: 0.3,
                type: "spring", 
                stiffness: 100
              }}
              style={{
                position: 'absolute',
                width: '24px',
                height: '24px',
                display: 'flex', /* This ensures content is visible */
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                top: '4px',
                left: 0
              }}
            >
              {iconData.icon} {/* Uncommented this line to display the icons */}
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <motion.div 
      animate={{ 
        scale: shake ? 1.03 : 1,
        boxShadow: glow ? (cardColor === "red" ? '0 0 15px rgba(255, 0, 0, 0.7)' : '0 0 15px rgba(59, 130, 246, 0.7)') : '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
      transition={{ type: "spring", stiffness: 500, damping: 10 }}
      style={{ 
        backgroundColor: bgColor,
        borderRadius: '0.75rem',
        padding: '1rem',
        border: `1px solid ${borderColor}`,
        overflow: 'hidden',
        position: 'relative',
        minHeight: '120px',
        maxHeight: '125px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '70%',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            marginRight: '0.5rem', 
            color: textColor,
            display: 'flex', /* Added to ensure icon visibility */
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {icon}
          </div>
          <div style={{ fontSize: '1rem', fontWeight: '500', color: 'white' }}>
            {title}
          </div>
        </div>
        <motion.div 
          key={title === "Active Threats" ? count : currentCount}
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ 
            fontSize: '2rem', 
            fontWeight: '700',
            color: 'white'
          }}
        >
          {title === "Active Threats" ? count : currentCount}
        </motion.div>
      </div>
      
      {/* Alert icons row */}
      {getIconRow()}
      
      {/* Only render alerts and animations for Active Threats card */}
      {title === "Active Threats" && (
        <>
          {/* Dropping dummy alerts animation */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            overflow: 'visible',
            zIndex: 10
          }}>
            {dummyAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ 
                  y: -20, 
                  x: '50%',
                  opacity: 1,
                  scale: 1
                }}
                animate={{ 
                  y: 50,
                  x: '50%',
                  opacity: 0,
                  scale: 0.8
                }}
                transition={{ 
                  duration: 1,
                  ease: "easeOut"
                }}
                style={{
                  position: 'absolute',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '0.75rem',
                  whiteSpace: 'nowrap',
                  transform: 'translateX(-50%)'
                }}
              >
                {alert.message}
              </motion.div>
            ))}
          </div>
        </>
      )}
      
    </motion.div>
  );
}