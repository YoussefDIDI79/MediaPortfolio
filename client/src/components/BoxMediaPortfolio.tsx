import { useState, useEffect, useRef } from 'react';

export default function BoxMediaPortfolio() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const phrases = [
    'CODE. DESIGN. IMPACT.',
    'HACK THE FUTURE.',
    'PIXEL-PERFECT VISION.',
    'DEBUGGING YOUR BRAND.'
  ];

  const typewriterRef = useRef<HTMLSpanElement>(null);
  const progressBarsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Preloader effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const current = phrases[currentPhrase];
      
      if (isDeleting) {
        if (currentChar > 0) {
          setCurrentChar(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentPhrase(prev => (prev + 1) % phrases.length);
        }
      } else {
        if (currentChar < current.length) {
          setCurrentChar(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [currentPhrase, currentChar, isDeleting]);

  // Update typewriter display
  useEffect(() => {
    if (typewriterRef.current) {
      typewriterRef.current.textContent = phrases[currentPhrase].substring(0, currentChar);
    }
  }, [currentChar, currentPhrase, phrases]);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      // Back to top button
      setShowBackToTop(window.scrollY > window.innerHeight);

      // Active section highlighting
      const sections = ['home', 'portfolio', 'services', 'skills', 'team', 'testimonials', 'contact'];
      let current = 'home';
      
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = sectionId;
          }
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Progress bar animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    });

    progressBarsRef.current.forEach(bar => {
      if (bar) observer.observe(bar);
    });

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('ERROR: ALL FIELDS MUST BE COMPLETED');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('ERROR: INVALID EMAIL FORMAT');
      return;
    }

    setFormLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('MESSAGE TRANSMITTED SUCCESSFULLY');
      (e.target as HTMLFormElement).reset();
      setFormLoading(false);
    }, 2000);
  };

  const portfolioItems = [
    {
      title: "E-COMMERCE PLATFORM",
      description: "FULL-STACK SHOPPING SOLUTION WITH PAYMENT INTEGRATION",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      title: "CRYPTO DASHBOARD",
      description: "REAL-TIME TRADING INTERFACE WITH DATA VISUALIZATION",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      title: "MOBILE FITNESS APP",
      description: "WORKOUT TRACKING WITH AI-POWERED RECOMMENDATIONS",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      title: "SaaS ANALYTICS",
      description: "BUSINESS INTELLIGENCE PLATFORM WITH CUSTOM REPORTS",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    }
  ];

  const services = [
    { icon: "</> ", title: "WEB DEVELOPMENT", description: "FULL-STACK SOLUTIONS USING MODERN FRAMEWORKS AND TECHNOLOGIES" },
    { icon: "🎨 ", title: "BRANDING", description: "STRATEGIC BRAND IDENTITY DESIGN THAT RESONATES WITH YOUR AUDIENCE" },
    { icon: "📱 ", title: "UI/UX DESIGN", description: "USER-CENTERED DESIGN THAT ENHANCES DIGITAL EXPERIENCES" },
    { icon: "🔍 ", title: "SEO OPTIMIZATION", description: "SEARCH ENGINE OPTIMIZATION TO BOOST YOUR ONLINE VISIBILITY" },
    { icon: "📢 ", title: "SOCIAL MEDIA", description: "SOCIAL MEDIA STRATEGY AND MANAGEMENT FOR BRAND GROWTH" },
    { icon: "📊 ", title: "DIGITAL MARKETING", description: "COMPREHENSIVE DIGITAL MARKETING CAMPAIGNS FOR MAXIMUM ROI" }
  ];

  const skills = [
    { name: "HTML/CSS", percentage: 95 },
    { name: "JAVASCRIPT", percentage: 90 },
    { name: "REACT", percentage: 85 },
    { name: "NODE.JS", percentage: 80 },
    { name: "FIGMA", percentage: 92 },
    { name: "SEO", percentage: 88 }
  ];

  const team = [
    {
      name: "ALEX CHEN",
      role: "LEAD DEVELOPER",
      bio: "FULL-STACK ENGINEER WITH 8+ YEARS EXPERIENCE IN SCALABLE WEB APPLICATIONS",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "SARAH JOHNSON",
      role: "CREATIVE DIRECTOR",
      bio: "DESIGN VISIONARY SPECIALIZING IN BRAND IDENTITY AND USER EXPERIENCE DESIGN",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "MIKE RODRIGUEZ",
      role: "MARKETING STRATEGIST",
      bio: "DIGITAL MARKETING EXPERT WITH PROVEN TRACK RECORD IN GROWTH STRATEGIES",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    }
  ];

  const testimonials = [
    {
      quote: "BOXMEDIA TRANSFORMED OUR DIGITAL PRESENCE. THEIR TERMINAL-INSPIRED DESIGN APPROACH IS REVOLUTIONARY.",
      author: "JOHN SMITH",
      company: "CEO, TECH INNOVATIONS INC."
    },
    {
      quote: "THE TEAM'S ATTENTION TO DETAIL AND CREATIVE VISION EXCEEDED ALL OUR EXPECTATIONS.",
      author: "EMMA WATSON",
      company: "FOUNDER, CREATIVE SOLUTIONS"
    },
    {
      quote: "PROFESSIONAL, EFFICIENT, AND INNOVATIVE. BOXMEDIA DELIVERS RESULTS THAT MATTER.",
      author: "DAVID BROWN",
      company: "CTO, FUTURE SYSTEMS"
    }
  ];

  return (
    <div className="font-mono">
      
      {/* Preloader */}
      {isLoading && (
        <div className="preloader">
          <div className="loading text-4xl" style={{ color: 'var(--terminal-green)' }}>▓</div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 w-full bg-black dark:bg-white border-b-2 border-white dark:border-black z-50 scanlines">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="text-2xl font-bold tracking-wider">
              <span className="text-white dark:text-black">[</span>
              <span style={{ color: 'var(--terminal-green)' }}>BOX</span>
              <span className="text-white dark:text-black">MEDIA]</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['HOME', 'PORTFOLIO', 'SERVICES', 'SKILLS', 'TEAM', 'TESTIMONIALS', 'CONTACT'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`transition-colors duration-300 uppercase tracking-wider ${
                    activeSection === item.toLowerCase() 
                      ? 'text-green-500' 
                      : 'text-white dark:text-black hover:text-green-500'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <div className="hidden md:flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isDarkMode}
                  onChange={(e) => setIsDarkMode(e.target.checked)}
                />
                <div className="relative">
                  <div className="w-12 h-6 bg-white dark:bg-black border-2 border-white dark:border-black"></div>
                  <div 
                    className={`absolute left-1 top-1 bg-black dark:bg-white w-4 h-4 transition-transform duration-300 ${
                      isDarkMode ? 'transform translate-x-6' : ''
                    }`}
                  ></div>
                </div>
                <span className="ml-3 text-white dark:text-black uppercase tracking-wider">DARK</span>
              </label>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white dark:text-black text-2xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden fixed top-0 left-0 w-full h-full bg-black dark:bg-white transform transition-transform duration-300 z-40 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {['HOME', 'PORTFOLIO', 'SERVICES', 'SKILLS', 'TEAM', 'TESTIMONIALS', 'CONTACT'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-white dark:text-black text-xl uppercase tracking-wider"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-black dark:bg-white text-white dark:text-black scanlines relative">
        <div className="text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-wider">
            <span className="typewriter" ref={typewriterRef}></span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-400 dark:text-gray-600 uppercase tracking-wider">
            DEPLOYING DIGITAL EXCELLENCE SINCE 2020
          </p>
          <button className="pixelated-border bg-black dark:bg-white text-white dark:text-black px-8 py-4 text-lg uppercase tracking-wider hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors duration-300">
            INITIALIZE PROJECT
          </button>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20 bg-white dark:bg-black text-black dark:text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 uppercase tracking-wider">
            [PORTFOLIO.EXE]
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {portfolioItems.map((item, index) => (
              <div key={index} className="pixelated-border bg-white dark:bg-black p-6 glitch" data-text={item.title}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover mb-4 filter grayscale hover:filter-none transition-all duration-300"
                  loading="lazy"
                />
                <h3 className="text-xl font-bold mb-2 uppercase tracking-wider">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                <div className="flex space-x-4">
                  <button className="pixelated-border bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm uppercase tracking-wider hover:bg-green-500 hover:text-black transition-colors duration-300">DEMO</button>
                  <button className="pixelated-border bg-white dark:bg-black text-black dark:text-white px-4 py-2 text-sm uppercase tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300">DETAILS</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-black dark:bg-white text-white dark:text-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 uppercase tracking-wider">
            [SERVICES.DLL]
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="pixelated-border bg-black dark:bg-white p-6 digital-rain">
                <div className="text-4xl mb-4" style={{ color: 'var(--terminal-green)' }}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">{service.title}</h3>
                <p className="text-gray-400 dark:text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 bg-white dark:bg-black text-black dark:text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 uppercase tracking-wider">
            [SKILLS.BAT]
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-bold uppercase tracking-wider">{skill.name}</span>
                  <span className="text-lg font-bold">{skill.percentage}%</span>
                </div>
                <div className="pixelated-border bg-gray-300 dark:bg-gray-700 h-6">
                  <div 
                    ref={el => progressBarsRef.current[index] = el}
                    className="progress-bar bg-black dark:bg-white h-full" 
                    style={{ '--progress-width': `${skill.percentage}%` } as React.CSSProperties}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 bg-black dark:bg-white text-white dark:text-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 uppercase tracking-wider">
            [TEAM.SYS]
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="pixelated-border bg-black dark:bg-white p-6 static-noise text-center">
                <img 
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  className="w-32 h-32 mx-auto mb-4 filter grayscale hover:filter-none transition-all duration-300 rounded-none"
                  loading="lazy"
                />
                <h3 className="text-xl font-bold mb-2 uppercase tracking-wider">{member.name}</h3>
                <p className="mb-4 uppercase tracking-wider" style={{ color: 'var(--terminal-green)' }}>{member.role}</p>
                <p className="text-gray-400 dark:text-gray-600 mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-white dark:text-black hover:text-green-500 transition-colors duration-300">
                    <i className="fab fa-twitter text-xl"></i>
                  </a>
                  <a href="#" className="text-white dark:text-black hover:text-green-500 transition-colors duration-300">
                    <i className="fab fa-linkedin text-xl"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white dark:bg-black text-black dark:text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 uppercase tracking-wider">
            [TESTIMONIALS.LOG]
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="testimonial-carousel relative">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`pixelated-border bg-white dark:bg-black p-8 text-center ${
                    currentTestimonial === index ? 'block' : 'hidden'
                  }`}
                >
                  <p className="text-xl mb-6 italic">"{testimonial.quote}"</p>
                  <div className="text-lg font-bold uppercase tracking-wider">- {testimonial.author}</div>
                  <div className="text-gray-600 dark:text-gray-400 uppercase tracking-wider">{testimonial.company}</div>
                </div>
              ))}
              
              {/* Navigation */}
              <div className="flex justify-center mt-8 space-x-4">
                <button 
                  onClick={() => setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="pixelated-border bg-black dark:bg-white text-white dark:text-black px-4 py-2 hover:bg-green-500 hover:text-black transition-colors duration-300"
                >
                  PREV
                </button>
                <button 
                  onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length)}
                  className="pixelated-border bg-black dark:bg-white text-white dark:text-black px-4 py-2 hover:bg-green-500 hover:text-black transition-colors duration-300"
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-black dark:bg-white text-white dark:text-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 uppercase tracking-wider">
            [CONTACT.INI]
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold mb-6 uppercase tracking-wider">SEND MESSAGE</h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg mb-2 uppercase tracking-wider">NAME:</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="w-full pixelated-border bg-black dark:bg-white text-white dark:text-black p-3 focus:outline-none focus:border-green-500" 
                    placeholder="ENTER YOUR NAME"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg mb-2 uppercase tracking-wider">EMAIL:</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full pixelated-border bg-black dark:bg-white text-white dark:text-black p-3 focus:outline-none focus:border-green-500" 
                    placeholder="ENTER YOUR EMAIL"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-lg mb-2 uppercase tracking-wider">MESSAGE:</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    required 
                    className="w-full pixelated-border bg-black dark:bg-white text-white dark:text-black p-3 focus:outline-none focus:border-green-500 resize-none" 
                    placeholder="ENTER YOUR MESSAGE"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="pixelated-border bg-green-500 text-black px-8 py-3 text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300 w-full"
                  disabled={formLoading}
                >
                  {formLoading ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold mb-6 uppercase tracking-wider">CONTACT INFO</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <i className="fas fa-envelope text-2xl mr-4" style={{ color: 'var(--terminal-green)' }}></i>
                  <div>
                    <div className="text-lg font-bold uppercase tracking-wider">EMAIL</div>
                    <div className="text-gray-400 dark:text-gray-600">INFO@BOXMEDIA.DEV</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone text-2xl mr-4" style={{ color: 'var(--terminal-green)' }}></i>
                  <div>
                    <div className="text-lg font-bold uppercase tracking-wider">PHONE</div>
                    <div className="text-gray-400 dark:text-gray-600">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="fab fa-twitter text-2xl mr-4" style={{ color: 'var(--terminal-green)' }}></i>
                  <div>
                    <div className="text-lg font-bold uppercase tracking-wider">TWITTER</div>
                    <div className="text-gray-400 dark:text-gray-600">@BOXMEDIA_DEV</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="fab fa-linkedin text-2xl mr-4" style={{ color: 'var(--terminal-green)' }}></i>
                  <div>
                    <div className="text-lg font-bold uppercase tracking-wider">LINKEDIN</div>
                    <div className="text-gray-400 dark:text-gray-600">LINKEDIN.COM/COMPANY/BOXMEDIA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white dark:bg-black text-black dark:text-white border-t-2 border-black dark:border-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and Description */}
            <div>
              <div className="text-2xl font-bold mb-4 tracking-wider">
                <span className="text-black dark:text-white">[</span>
                <span style={{ color: 'var(--terminal-green)' }}>BOX</span>
                <span className="text-black dark:text-white">MEDIA]</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wider">DEBUGGING YOUR BRAND FOR THE DIGITAL FUTURE</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4 uppercase tracking-wider">QUICK LINKS</h4>
              <div className="space-y-2">
                {['PORTFOLIO', 'SERVICES', 'TEAM', 'CONTACT'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 uppercase tracking-wider"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-bold mb-4 uppercase tracking-wider">SOCIAL LINKS</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                  <i className="fab fa-linkedin text-2xl"></i>
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                  <i className="fab fa-github text-2xl"></i>
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                  <i className="fab fa-dribbble text-2xl"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-black dark:border-white mt-8 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wider">&copy; 2024 BOXMEDIA. ALL RIGHTS RESERVED. [VERSION 2.1.0]</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button 
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
        onClick={scrollToTop}
      >
        ▲
      </button>
    </div>
  );
}
