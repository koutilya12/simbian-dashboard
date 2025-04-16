// src/app/components/ui/Navbar.js
"use client";

import { motion } from 'framer-motion';

export default function Navbar({ onSectionChange, activeSection }) {
  return (
    <nav className="bg-blue-950 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-white font-bold text-xl flex items-center">
            <svg 
              className="w-8 h-8 mr-2" 
              viewBox="0 0 24 24" 
              fill="white"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            Simbian
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <button className="text-white px-3 py-2">Products</button>
          <button className="text-white px-3 py-2">Company</button>
          <button className="text-white px-3 py-2">Resources</button>
          <button className="text-white px-3 py-2">Blog</button>
        </div>

        {/* Demo Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-900 px-4 py-2 rounded-full font-medium flex items-center"
        >
          Book a Demo
          <svg className="w-5 h-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>
    </nav>
  );
}