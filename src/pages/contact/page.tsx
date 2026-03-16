import { useEffect, useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    document.title = 'Contact Belinda Wakasa - Book Legal Consultation in Nairobi, Kenya';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Contact Advocate Belinda Wakasa for professional legal services in Nairobi, Kenya. Schedule a consultation for property law, corporate law, litigation, estate planning, and contract services. Email: wakasabelinda@gmail.com, Phone: 0758913512'
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute(
        'href',
        `${import.meta.env.VITE_SITE_URL || 'https://example.com'}/contact`
      );
    }

    document.querySelectorAll('script[data-page-schema]').forEach((s) => s.remove());

    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';

    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Belinda Wakasa',
        description:
          'Contact Advocate Belinda Wakasa for professional legal services in Nairobi, Kenya.',
        url: `${siteUrl}/contact`,
        mainEntity: {
          '@type': 'LegalService',
          name: 'Belinda Wakasa - Advocate of the High Court',
          telephone: '+254758913512',
          email: 'wakasabelinda@gmail.com',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Nairobi',
            addressCountry: 'KE',
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '09:00',
              closes: '17:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Saturday',
              opens: '00:00',
              closes: '00:00',
            },
          ],
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteUrl}/contact` },
        ],
      },
    ];

    schemas.forEach((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page-schema', 'contact');
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll('script[data-page-schema="contact"]').forEach((s) => s.remove());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client‑side validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.message) {
      setSubmitStatus('error');
      return;
    }

    if (formData.message.length > 500) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      }).toString();

      const response = await fetch('https://readdy.ai/api/form/d69cjltt1k61917cm5v0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ fullName: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-charcoal-dark py-20 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block px-4 py-2 bg-white/10 border border-gold/30 rounded-full">
              <span className="text-gold text-xs font-medium tracking-wide uppercase">
                Get in Touch
              </span>
            </div>
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white">
              Contact Us
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Schedule a consultation or reach out with your legal inquiries
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column - Form */}
            <div className="bg-cream px-8 lg:px-20 py-20">
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-charcoal-dark mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-600 text-base mb-12">
                Fill out the form and we&apos;ll respond within 24 hours
              </p>

              <form
                id="contact-form"
                data-readdy-form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-charcoal-dark text-sm font-bold mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-4 border-2 border-charcoal/20 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-charcoal-dark text-sm font-bold mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-4 border-2 border-charcoal/20 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-charcoal-dark text-sm font-bold mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0700000000"
                    className="w-full px-4 py-4 border-2 border-charcoal/20 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-charcoal-dark text-sm font-bold mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your legal needs..."
                    rows={6}
                    maxLength={500}
                    className="w-full px-4 py-4 border-2 border-charcoal/20 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                    required
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-2">
                    {formData.message.length}/500 characters
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-charcoal-dark text-white rounded-lg font-semibold text-base hover:bg-charcoal hover:scale-[1.02] transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm font-medium">
                      Thank you! Your message has been sent successfully. We&apos;ll get back to you
                      within 24 hours.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm font-medium">
                      Sorry, there was an error sending your message. Please try again or contact
                      us directly.
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Right Column - Contact Info */}
            <div className="bg-charcoal-dark px-8 lg:px-20 py-20 text-white">
              <div className="w-16 h-1 bg-gradient-to-r from-gold to-charcoal mb-8"></div>
              <h3 className="font-serif text-4xl font-bold mb-12">
                Contact Information
              </h3>

              <div className="space-y-10">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-mail-line text-gold text-2xl"></i>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-2">Email Address</p>
                    <a
                      href="mailto:wakasabelinda@gmail.com"
                      className="text-white text-lg font-medium hover:text-gold transition-colors cursor-pointer"
                    >
                      wakasabelinda@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-phone-line text-gold text-2xl"></i>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-2">Phone Number</p>
                    <a
                      href="tel:0758913512"
                      className="text-white text-lg font-medium hover:text-gold transition-colors cursor-pointer"
                    >
                      0758913512
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-map-pin-line text-gold text-2xl"></i>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-2">Office Location</p>
                    <p className="text-white text-lg font-medium">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-16 rounded-2xl overflow-hidden border-2 border-gold/30 h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.277444357954!2d36.8119!3d-1.2864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d6e984b6b1%3A0x7d2d38d0e507fbcb!2sNairobi%20CBD%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1718000000000!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Belinda Wakasa Law Office - Nairobi, Kenya"
                ></iframe>
              </div>

              {/* Office Hours */}
              <div className="mt-12 p-6 bg-charcoal rounded-xl border border-gold/20">
                <h4 className="font-serif text-xl font-bold text-white mb-4">
                  Office Hours
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Monday - Friday</span>
                    <span className="text-white font-medium">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Saturday</span>
                    <span className="text-white font-medium">By Appointment</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Sunday</span>
                    <span className="text-white font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
