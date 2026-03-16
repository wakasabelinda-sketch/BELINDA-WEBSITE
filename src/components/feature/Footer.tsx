import { Link, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export default function Footer() {
  const navigate = useNavigate();

  // Wrap navigation in a stable callback with error handling
  const handleContactClick = useCallback(() => {
    try {
      navigate('/contact');
    } catch (error) {
      console.error('Navigation to /contact failed:', error);
    }
  }, [navigate]);

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Articles', path: '/articles' },
    { label: 'Templates', path: '/templates' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-cream px-10 py-10">
      <div className="bg-charcoal-dark rounded-3xl px-16 py-20 relative overflow-hidden">
        {/* Background Monogram */}
        <div className="absolute bottom-0 right-0 text-[400px] font-serif font-bold text-white/3 leading-none select-none pointer-events-none">
          BW
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1: Brand & CTA */}
            <div className="lg:col-span-1">
              <h3 className="font-serif text-3xl text-white mb-2">
                Belinda Wakasa
              </h3>
              <p className="text-gold text-base mb-10">
                Advocate of the High Court
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-8">
                Professional legal representation with integrity and excellence across Kenya.
              </p>
              <button
                onClick={handleContactClick}
                className="px-6 py-3 border-2 border-gold text-gold rounded-lg font-medium text-sm hover:bg-gold hover:text-charcoal-dark transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Get in Touch <i className="ri-arrow-right-line ml-2"></i>
              </button>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-white font-sans font-semibold text-lg mb-6">
                Quick Links
              </h4>
              <ul className="space-y-4">
                {quickLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="text-white/70 text-sm hover:text-gold hover:translate-x-1 transition-all duration-300 inline-block cursor-pointer"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Practice Areas */}
            <div>
              <h4 className="text-white font-sans font-semibold text-lg mb-6">
                Practice Areas
              </h4>
              <ul className="space-y-4">
                {[
                  'Property Law',
                  'Corporate Law',
                  'Litigation',
                  'Estate Planning',
                  'Contracts',
                ].map((item) => (
                  <li key={item}>
                    <Link
                      to="/services"
                      className="text-white/70 text-sm hover:text-gold hover:translate-x-1 transition-all duration-300 inline-block cursor-pointer"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h4 className="text-white font-sans font-semibold text-lg mb-4">
                Stay Informed
              </h4>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                Subscribe to receive legal insights and updates directly to your inbox
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-5 py-3.5 bg-charcoal border border-gold/30 rounded-lg text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 bg-gold rounded-full flex items-center justify-center text-charcoal-dark hover:scale-110 hover:rotate-45 transition-all duration-300 cursor-pointer">
                  <i className="ri-arrow-right-line text-lg"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p className="text-white/60 text-sm">
              &copy; {currentYear} Belinda Wakasa. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-gold hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-pointer"
              >
                <i className="ri-linkedin-fill text-2xl"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-gold hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-pointer"
              >
                <i className="ri-twitter-x-fill text-2xl"></i>
              </a>
              <a
                href="mailto:wakasabelinda@gmail.com"
                className="w-10 h-10 flex items-center justify-center text-gold hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-pointer"
              >
                <i className="ri-mail-fill text-2xl"></i>
              </a>
            </div>

            {/* Legal Disclaimer */}
            <p className="text-white/60 text-sm text-center md:text-right max-w-md">
              The information provided on this website does not constitute legal advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
