import React, { useState, useEffect } from 'react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .portfolio-container {
          font-family: 'Inter', sans-serif;
          line-height: 1.6;
          color: #333;
          overflow-x: hidden;
        }
        
        /* Navbar Styles */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1rem 2rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(20px);
        }
        
        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .navbar.not-scrolled {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .nav-logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${scrolled ? '#2d3748' : '#fff'};
          transition: color 0.3s ease;
          cursor: pointer;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .nav-menu {
          display: flex;
          list-style: none;
          gap: 2rem;
          align-items: center;
        }
        
        .nav-item {
          position: relative;
        }
        
        .nav-link {
          color: ${scrolled ? '#4a5568' : 'rgba(255, 255, 255, 0.9)'};
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .nav-link.active {
          color: #667eea;
          background: ${scrolled ? 'rgba(102, 126, 234, 0.1)' : 'rgba(255, 255, 255, 0.2)'};
        }
        
        .nav-link:hover {
          color: #667eea;
          background: ${scrolled ? 'rgba(102, 126, 234, 0.1)' : 'rgba(255, 255, 255, 0.2)'};
          transform: translateY(-2px);
        }
        
        .mobile-toggle {
          display: none;
          flex-direction: column;
          cursor: pointer;
          padding: 0.5rem;
        }
        
        .hamburger {
          width: 25px;
          height: 3px;
          background: ${scrolled ? '#2d3748' : '#fff'};
          margin: 3px 0;
          transition: all 0.3s ease;
          border-radius: 2px;
        }
        
        .mobile-toggle.active .hamburger:nth-child(1) {
          transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .mobile-toggle.active .hamburger:nth-child(2) {
          opacity: 0;
        }
        
        .mobile-toggle.active .hamburger:nth-child(3) {
          transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .hero-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          position: relative;
          padding-top: 80px;
        }
        
        .hero-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }
        
        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }
        
        .particle:nth-child(1) { width: 4px; height: 4px; left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { width: 6px; height: 6px; left: 20%; animation-delay: 1s; }
        .particle:nth-child(3) { width: 3px; height: 3px; left: 30%; animation-delay: 2s; }
        .particle:nth-child(4) { width: 5px; height: 5px; left: 40%; animation-delay: 3s; }
        .particle:nth-child(5) { width: 4px; height: 4px; left: 50%; animation-delay: 4s; }
        .particle:nth-child(6) { width: 3px; height: 3px; left: 60%; animation-delay: 5s; }
        .particle:nth-child(7) { width: 6px; height: 6px; left: 70%; animation-delay: 6s; }
        .particle:nth-child(8) { width: 4px; height: 4px; left: 80%; animation-delay: 7s; }
        .particle:nth-child(9) { width: 5px; height: 5px; left: 90%; animation-delay: 8s; }
        
        @keyframes float {
          0%, 100% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        
        .hero-content {
          max-width: 800px;
          padding: 2rem;
          animation: fadeInUp 1s ease-out;
          z-index: 2;
          position: relative;
        }
        
        .hero-title {
          font-size: 4rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, #fff, #f0f0f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          from { text-shadow: 0 0 20px rgba(255, 255, 255, 0.2); }
          to { text-shadow: 0 0 30px rgba(255, 255, 255, 0.4); }
        }
        
        .typing-animation {
          display: inline-block;
          border-right: 2px solid #fff;
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 50% { border-color: transparent; }
          51%, 100% { border-color: #fff; }
        }
        
        .hero-subtitle {
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 2rem;
          opacity: 0.9;
          animation: slideInLeft 1s ease-out 0.3s both;
        }
        
        .hero-description {
          font-size: 1.1rem;
          opacity: 0.8;
          margin-bottom: 3rem;
          line-height: 1.8;
          animation: slideInRight 1s ease-out 0.6s both;
        }
        
        .cta-button {
          display: inline-block;
          padding: 1rem 2.5rem;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          animation: bounceIn 1s ease-out 0.9s both;
          position: relative;
          overflow: hidden;
        }
        
        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .cta-button:hover::before {
          left: 100%;
        }
        
        .cta-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .section {
          padding: 5rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(50px);
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 3rem;
          color: #2d3748;
          position: relative;
          animation: scaleIn 0.6s ease-out;
        }
        
        .section-title::after {
          content: '';
          display: block;
          width: 60px;
          height: 4px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          margin: 1rem auto;
          border-radius: 2px;
          animation: expandWidth 0.8s ease-out 0.3s both;
        }
        
        @keyframes expandWidth {
          from { width: 0; }
          to { width: 60px; }
        }
        
        .about-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          align-items: center;
        }
        
        .profile-image {
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 6rem;
          font-weight: bold;
          margin: 0 auto;
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
          animation: pulse 2s ease-in-out infinite;
          transition: transform 0.3s ease;
        }
        
        .profile-image:hover {
          transform: scale(1.05) rotate(5deg);
        }
        
        @keyframes pulse {
          0%, 100% { box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3); }
          50% { box-shadow: 0 25px 50px rgba(102, 126, 234, 0.5); }
        }
        
        .about-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #4a5568;
          animation: slideInRight 0.8s ease-out 0.3s both;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .skill-card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid #f7fafc;
          position: relative;
          overflow: hidden;
          animation: slideInUp 0.6s ease-out forwards;
        }
        
        .skill-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
          transition: left 0.6s;
        }
        
        .skill-card:hover::before {
          left: 100%;
        }
        
        .skill-card:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
        }
        
        .skill-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
          animation: rotateIn 0.6s ease-out;
          transition: transform 0.3s ease;
        }
        
        .skill-card:hover .skill-icon {
          transform: rotate(360deg) scale(1.1);
        }
        
        @keyframes rotateIn {
          from { transform: rotate(-180deg) scale(0); opacity: 0; }
          to { transform: rotate(0deg) scale(1); opacity: 1; }
        }
        
        .skill-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #2d3748;
        }
        
        .skill-description {
          color: #718096;
          font-size: 0.95rem;
        }
        
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2.5rem;
          margin-top: 3rem;
        }
        
        .project-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid #f7fafc;
          animation: fadeInUp 0.6s ease-out forwards;
          position: relative;
        }
        
        .project-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
        }
        
        .project-image {
          height: 200px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 3rem;
          font-weight: bold;
          position: relative;
          overflow: hidden;
        }
        
        .project-image::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: rotate(45deg);
          transition: transform 0.6s;
        }
        
        .project-card:hover .project-image::before {
          transform: rotate(45deg) translate(50%, 50%);
        }
        
        .project-content {
          padding: 2rem;
        }
        
        .project-title {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #2d3748;
        }
        
        .project-description {
          color: #718096;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        .tech-tag {
          background: #edf2f7;
          color: #4a5568;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .tech-tag:hover {
          background: #667eea;
          color: white;
          transform: scale(1.05);
        }
        
        .project-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .project-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #667eea;
          transition: width 0.3s ease;
        }
        
        .project-link:hover::after {
          width: 100%;
        }
        
        .project-link:hover {
          color: #764ba2;
          transform: translateX(5px);
        }
        
        .contact-section {
          background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .contact-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          pointer-events: none;
        }
        
        .contact-content {
          max-width: 600px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        
        .contact-title {
          color: white;
          margin-bottom: 2rem;
        }
        
        .contact-description {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 3rem;
          line-height: 1.8;
          animation: fadeInUp 0.8s ease-out 0.3s both;
        }
        
        .contact-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .contact-item {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          animation: scaleIn 0.6s ease-out forwards;
        }
        
        .contact-item:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-5px);
        }
        
        .contact-item h4 {
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        
        .contact-item a {
          color: #90cdf4;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .contact-item a:hover {
          color: #bee3f8;
        }
        
        /* Animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        /* Mobile Styles */
        @media (max-width: 768px) {
          .nav-menu {
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            height: calc(100vh - 80px);
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: flex-start;
            padding: 2rem;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          
          .nav-menu.active {
            transform: translateX(0);
          }
          
          .nav-link {
            color: #2d3748 !important;
            font-size: 1.2rem;
            padding: 1rem;
            width: 100%;
            text-align: center;
            margin: 0.5rem 0;
          }
          
          .mobile-toggle {
            display: flex;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.2rem;
          }
          
          .about-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .profile-image {
            width: 200px;
            height: 200px;
            font-size: 4rem;
          }
          
          .section {
            padding: 3rem 1rem;
          }
          
          .projects-grid {
            grid-template-columns: 1fr;
          }
          
          .skills-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
          
          .navbar {
            padding: 1rem;
          }
        }
        
        /* Performance optimizations */
        .skill-card, .project-card, .contact-item {
          will-change: transform;
        }
        
        .nav-link, .cta-button, .project-link {
          will-change: transform, background-color;
        }
        
        /* Stagger animations for cards */
        .skill-card:nth-child(1) { animation-delay: 0.1s; }
        .skill-card:nth-child(2) { animation-delay: 0.2s; }
        .skill-card:nth-child(3) { animation-delay: 0.3s; }
        .skill-card:nth-child(4) { animation-delay: 0.4s; }
        
        .project-card:nth-child(1) { animation-delay: 0.1s; }
        .project-card:nth-child(2) { animation-delay: 0.3s; }
        .project-card:nth-child(3) { animation-delay: 0.5s; }
        
        .contact-item:nth-child(1) { animation-delay: 0.1s; }
        .contact-item:nth-child(2) { animation-delay: 0.2s; }
        .contact-item:nth-child(3) { animation-delay: 0.3s; }
        .contact-item:nth-child(4) { animation-delay: 0.4s; }
      `}</style>

      <div className="portfolio-container">
        {/* Navbar */}
        <nav className={`navbar ${scrolled ? 'scrolled' : 'not-scrolled'}`}>
          <div className="nav-container">
            <div className="nav-logo" onClick={() => scrollToSection('home')}>
              Portfolio
            </div>

            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <li className="nav-item">
                <a
                  href="#home"
                  className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#about"
                  className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#skills"
                  className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}
                >
                  Skills
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#projects"
                  className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
                >
                  Projects
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#contact"
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                >
                  Contact
                </a>
              </li>
            </ul>

            <div
              className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="hamburger"></div>
              <div className="hamburger"></div>
              <div className="hamburger"></div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
          <div className="hero-content">
            <h1 className="hero-title">Rohit Verma</h1>
            <p className="hero-subtitle">
              <span className="typing-animation">Full Stack Developer</span>
            </p>
            <p className="hero-description">
              Focused on delivering reliable, scalable, and user-friendly software solutions through modern technologies
            </p>
            <a href="#contact" className="cta-button" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
              Get In Touch
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="profile-image">RV</div>
            <div className="about-text">
              <p>
               I am Rohit Verma, a final-year B.Tech student passionate about building impactful software solutions. I enjoy working on full-stack projects ranging from real-time applications like a Zoom clone to modern UI projects such as a Gemini clone and blog platforms. With hands-on experience in MERN stack, WebRTC, and modern frontend frameworks, I thrive on solving real-world problems through clean, scalable, and user-friendly applications. Always eager to learn and experiment with emerging technologies, I aim to contribute to innovative projects that make a difference.
              </p>
              {/* <p>
                I specialize in React, Node.js, and modern web technologies, always
                staying up-to-date with the latest trends and best practices. When I'm
                not coding, you can find me exploring new technologies, contributing to
                open-source projects, or mentoring aspiring developers.
              </p> */}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section">
          <h2 className="section-title">Skills & Expertise</h2>
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-icon">⚛️</div>
              <h3 className="skill-title">Frontend Development</h3>
              <p className="skill-description">
                React, HTML5, CSS3, Tailwind CSS, Shadcn/UI
              </p>
            </div>
            <div className="skill-card">
              <div className="skill-icon">🔧</div>
              <h3 className="skill-title">Backend Development</h3>
              <p className="skill-description">
                Node.js, Express, REST APIs, WebSockets, Socket.io, MongoDB
              </p>
            </div>
            <div className="skill-card">
              <div className="skill-icon">🎨</div>
              <h3 className="skill-title">Version Control & Tools</h3>
              <p className="skill-description">
                Git, GitHub, Postman, VS Code
              </p>
            </div>
            {/* <div className="skill-card">
              <div className="skill-icon">☁️</div>
              <h3 className="skill-title">Cloud & DevOps</h3>
              <p className="skill-description">
                AWS, Docker, Kubernetes, CI/CD, Git, Linux, Microservices
              </p>
            </div> */}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image">🚀</div>
              <div className="project-content">
                <h3 className="project-title">Zoomify</h3>
                <p className="project-description">
                  I built a Zoom clone that enables seamless real-time video and audio conferencing.
                  It supports features like chat, and screen sharing for smooth collaboration.
                  The project leverages WebRTC, Socket.io, and a scalable backend to deliver a secure meeting experience.
                </p>
                <div className="project-tech">
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Node.js + Express</span>
                  <span className="tech-tag">Socket.io / WebSockets</span>
                  <span className="tech-tag">MongoDB</span>
                </div>
                <a href="https://zoomifyfrontend.onrender.com/" className="project-link">View Project →</a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">📱</div>
              <div className="project-content">
                <h3 className="project-title">Gemini-Clone(chatbot)</h3>
                <p className="project-description">
                  I built a Gemini clone frontend with a clean, modern UI for chatbot interactions.
                  It uses React and Tailwind CSS to replicate Gemini’s smooth layout and responsive design.
                </p>
                <div className="project-tech">
                  <span className="tech-tag">React.js</span>
                  <span className="tech-tag">Tailwind CSS</span>
                  {/* <span className="tech-tag">Socket.io</span>
                  <span className="tech-tag">MongoDB</span> */}
                </div>
                <a href="https://gemini-clone-six-iota.vercel.app/" className="project-link">View Project →</a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">🎯</div>
              <div className="project-content">
                <h3 className="project-title">BlogSphere</h3>
                <p className="project-description">
                  BlogSphere is a simple and elegant blogging platform where users can create, edit, and share posts.
                  It features a clean UI with categories, search, and responsive design for seamless reading.
                  Built with React and a scalable backend, it offers an intuitive experience for writers and readers alike
                </p>
                <div className="project-tech">
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">Tailwind CSS</span>
                  <span className="tech-tag">MongoDB</span>
                  <span className="tech-tag">Shadcn/UI</span>
                </div>
                <a href="#" className="project-link">View Project →</a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section section">
          <div className="contact-content">
            <h2 className="contact-title section-title">Let's Work Together</h2>
            <p className="contact-description">
              I'm always interested in new opportunities and exciting projects.
              Whether you have a project in mind or just want to chat about technology,
              I'd love to hear from you.
            </p>

            <div className="contact-info">
              <div className="contact-item">
                <h4>Email</h4>
                <a href="mailto:rohitv122004@gmail.com">rohitv122004@gmail.com</a>
              </div>
              <div className="contact-item">
                <h4>Phone</h4>
                <a href="">+91 7740003620</a>
              </div>
              <div className="contact-item">
                <h4>LinkedIn</h4>
                <a href="https://www.linkedin.com/in/rohit-verma-753b47290" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/RohitVerma
                </a>
              </div>
              <div className="contact-item">
                <h4>GitHub</h4>
                <a href="https://github.com/RohitVerma-cell" target="_blank" rel="noopener noreferrer">
                  github.com/RohitVerma
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Portfolio;