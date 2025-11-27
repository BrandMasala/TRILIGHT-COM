import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import Logo from '@/assets/images/logos/TT.png';
import HamburgerIcon from '@/assets/images/icons/hamburger.png?url';
import './Navbar.css';

const Header = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };


  useEffect(() => {
    // Manage body class for sidebar layout
    if (!isCollapsed) {
      document.body.classList.add('sidebar-expanded');
    } else {
      document.body.classList.remove('sidebar-expanded');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('sidebar-expanded');
    };
  }, [isCollapsed]);

  // Throttle function to limit how often a function can be called
  const throttle = (callback, delay) => {
    let lastCall = 0;
    return function(...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return callback(...args);
    };
  };

  // Create a memoized scroll handler with useCallback
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Track if page is scrolled for blur effect
    setIsScrolled(currentScrollY > 50);
    
    // Always show navbar when scrolling up, hide when scrolling down
    if (currentScrollY < 10) {
      setIsNavbarVisible(true);
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up - always show navbar with blur
      setIsNavbarVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
      // Scrolling down - hide navbar
      setIsNavbarVisible(false);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    // Apply throttling to the scroll handler (16ms ≈ 60fps)
    const throttledHandleScroll = throttle(handleScroll, 16);
    
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [handleScroll]);

  // Handle click outside sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isCollapsed && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target) &&
          menuButtonRef.current &&
          !menuButtonRef.current.contains(event.target)) {
        setIsCollapsed(true);
      }
    };

    if (!isCollapsed) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isCollapsed]);

  return (
    <>
      {/* Full Background Blur Backdrop */}
      <div 
        className={`navbar-backdrop ${isScrolled && isNavbarVisible ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* SOBHA Logo at Top of Page */}
      <div 
        className={`top-logo ${isNavbarVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <img 
          src={Logo} 
          alt="RiseWith9" 
          className="sobha-logo" 
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width="150"
          height="50"
        />
      </div>

      {/* Hamburger Menu Button */}
      <button 
        ref={menuButtonRef}
        className={`menu-button ${isNavbarVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <motion.img 
          src={HamburgerIcon} 
          alt="Menu" 
          className="hamburger-image"
          loading="eager"
          width="24"
          height="24"
          animate={{
            rotate: !isCollapsed ? 90 : 0
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        />
      </button>

      {/* Sidebar - Hidden by default */}
      {!isCollapsed && (
        <aside 
          ref={sidebarRef}
          className="sidebar"
        >
          {/* Navigation */}
          <nav className="sidebar-nav">
            <ul className="sidebar-nav-list">
              <li>
                <a
                  href="#hero"
                  className="sidebar-nav-link"
                  title="HOME"
                  onClick={() => {
                    setIsCollapsed(true);
                    const element = document.querySelector('#hero');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <span className="nav-text">HOME</span>
                </a>
              </li>
              <li>
                
                <button
                  className="sidebar-nav-link w-full text-left"
                  title="DISCOVER"
                  onClick={() => {
                    setIsDiscoverOpen((o) => !o);
                    if (location.pathname !== '/discover') navigate('/discover');
                  }}
                >
                  <span className="nav-text">DISCOVER</span>
                </button>
                {isDiscoverOpen && (
                  <ul>
                    {[
                      { id: 'discover-hero', text: 'Overview' },
                      { id: 'discover-stats', text: 'Stats' },
                      { id: 'philosophy', text: 'Philosophy' },
                      { id: 'gallery', text: 'Visionaries' },
                      { id: 'timeline', text: 'Timeline' },
                    ].map((sub) => (
                      <li key={sub.id}>
                        <button
                          className="sidebar-nav-link w-full text-left pl-8"
                          title={sub.text}
                          onClick={() => {
                            setIsCollapsed(true);
                            if (location.pathname !== '/discover') {
                              navigate('/discover');
                              setTimeout(() => {
                                const el = document.getElementById(sub.id);
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                              }, 100);
                            } else {
                              const el = document.getElementById(sub.id);
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                        >
                          <span className="nav-text">{sub.text}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              {[
                
                { href: "#design-ethos", text: "DESIGN ETHOS" },
                { href: "#stories", text: "STORIES WE’VE BUILT" },
                { href: "#newsletter", text: "NEWSLETTER" },
                { href: "#contact", text: "CONTACT US" }
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="sidebar-nav-link"
                    title={item.text}
                    onClick={() => {
                      setIsCollapsed(true);
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <span className="nav-text">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
            {/* Social Media Icons */}
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Facebook">
                <Facebook size={15} />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <Instagram size={15} />
              </a>
              <a href="#" className="social-icon" aria-label="Youtube">
                <Youtube size={15} />
              </a>
            </div>
          </nav>
        </aside>
      )}
    </>
  );
};

export default Header;
