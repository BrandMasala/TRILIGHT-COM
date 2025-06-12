import React from 'react';
import { usePlay } from '../contexts/Play';

export const Timeline = ({ isVisible }) => {
  const { setShowTimeline } = usePlay();

  if (!isVisible) return null;

  return (
    <div className="timeline-overlay">
      <div className="timeline-content">
        <button 
          className="absolute top-4 right-4 text-white hover:text-teal-400 transition-colors"
          onClick={() => setShowTimeline(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="teal-glow">Architecture is not just design,</span><br />
            <span className="text-teal-400">it's devotion.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">– Sanjeev Reddy, Sanjay Gulabani</p>
        </div>

        <div className="mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            <span className="section-title">Our Journey</span>
          </h2>
          
          <div className="timeline-container relative ml-4 md:ml-0 mt-16">
            <div className="timeline-line absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full"></div>
            
            <div className="flex md:justify-between items-start relative mb-24">
              <div className="hidden md:block md:w-5/12"></div>
              <div className="timeline-dot absolute left-0 md:left-1/2 transform -translate-x-1/2 z-10"></div>
              <div className="pl-8 md:pl-0 md:w-5/12">
                <div className="timeline-item">
                  <h3 className="text-3xl font-bold mb-3 text-teal-400">2015</h3>
                  <h4 className="text-2xl font-semibold mb-4 text-white">TRILIGHT was born from a dream</h4>
                  <p className="text-gray-300">What began as a conversation over coffee transformed into a manifesto for redefining luxury real estate. Sanjay and Sanjeev, with backgrounds in architecture and urban planning, set forth to create spaces that speak to the soul.</p>
                </div>
              </div>
            </div>
            
            <div className="flex md:justify-between items-start flex-row-reverse md:flex-row relative mb-24">
              <div className="pl-8 md:pl-0 md:w-5/12 md:text-right">
                <div className="timeline-item">
                  <h3 className="text-3xl font-bold mb-3 text-teal-400">2018</h3>
                  <h4 className="text-2xl font-semibold mb-4 text-white">Launched our first luxury township</h4>
                  <p className="text-gray-300">TRILIGHT Horizon, our debut project, redefined what luxury living could be. With thoughtful architecture that respected both the land and its inhabitants, we created more than homes—we crafted sanctuaries.</p>
                </div>
              </div>
              <div className="timeline-dot absolute left-0 md:left-1/2 transform -translate-x-1/2 z-10"></div>
              <div className="hidden md:block md:w-5/12"></div>
            </div>
            
            <div className="flex md:justify-between items-start relative">
              <div className="hidden md:block md:w-5/12"></div>
              <div className="timeline-dot absolute left-0 md:left-1/2 transform -translate-x-1/2 z-10"></div>
              <div className="pl-8 md:pl-0 md:w-5/12">
                <div className="timeline-item">
                  <h3 className="text-3xl font-bold mb-3 text-teal-400">2023</h3>
                  <h4 className="text-2xl font-semibold mb-4 text-white">International recognition</h4>
                  <p className="text-gray-300">After expanding to three countries and completing over twenty signature developments, TRILIGHT was honored with the Global Architectural Excellence Award, cementing our philosophy that architecture must serve both aesthetics and humanity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 