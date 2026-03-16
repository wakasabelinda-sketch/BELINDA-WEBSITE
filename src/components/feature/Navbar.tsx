import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ---------------------------------------------------------------------------
  // Scroll handling – robust with a try/catch and cleanup
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      try {
        setScrolled(window.scrollY > 50);
      } catch (e) {
        console.error('Error while handling scroll:', e);
      }
    };

    // Guard against environments where `window` might be undefined (e.g., SSR)
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }

    // Cleanup
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Articles', path: '/articles' },
    { name: 'Templates', path: '/templates' },
    { name: 'Contact', path: '/contact' },
  ];

  // ---------------------------------------------------------------------------
  // Helper to navigate safely
  // ---------------------------------------------------------------------------
  const safeNavigate = (path) => {
    try {
      navigate(path);
    } catch (e) {
      console.error(`Navigation to "${path}" failed:`, e);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <img
              src="https://static.readdy.ai/image/b92b61a178bbadc2f7e64b37b3c92766/297bbd7d6ed9d2ffbd3feb3e8c1f1114.png"
              alt="Belinda Wakasa Logo"
              className="h-12 w-12 object-contain"
            />
            <span
              className={`font-serif text-2xl font-semibold transition-colors ${
                scrolled ? 'text-charcoal-dark' : 'text-white'
              }`}
            >
              Belinda Wakasa
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => safeNavigate(link.path)}
                className={`text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  location.pathname === link.path
                    ? 'text-gold border-b-2 border-gold pb-1'
                    : scrolled
                    ? 'text-charcoal-dark hover:text-gold'
                    : 'text-white/90 hover:text-gold'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => safeNavigate('/contact')}
            className={`hidden lg:block px-6 py-3 border-2 rounded-lg font-semibold text-sm transition-all duration-300 cursor-pointer whitespace-nowrap ${
              scrolled
                ? 'border-charcoal text-charcoal hover:bg-charcoal hover:text-white'
                : 'border-gold/70 text-gold hover:bg-gold hover:text-charcoal-dark'
            }`}
          >
            Book Consultation
          </button>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden w-8 h-8 flex items-center justify-center cursor-pointer ${
              scrolled ? 'text-charcoal-dark' : 'text-white'
            }`}
          >
            <i className="ri-menu-line text-2xl"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}
