
import { useEffect, useRef, useState } from 'react';

const localStats = [
  { icon: 'ri-map-pin-line', value: 'Nairobi CBD', label: 'Office Location' },
  { icon: 'ri-time-line', value: 'Mon–Fri', label: '9:00 AM – 5:00 PM' },
  { icon: 'ri-phone-line', value: '0758913512', label: 'Direct Line' },
  { icon: 'ri-star-fill', value: '5-Star', label: 'Client Rated' },
];

const serviceAreas = [
  'Nairobi CBD',
  'Westlands',
  'Karen',
  'Kilimani',
  'Lavington',
  'Kileleshwa',
  'Upperhill',
  'Parklands',
  'Langata',
  'Runda',
  'Muthaiga',
  'Gigiri',
];

export default function LocalPresenceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream py-24 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block px-4 py-2 bg-charcoal-dark/5 border border-gold/30 rounded-full mb-6">
            <span className="text-gold text-xs font-medium tracking-wide uppercase">
              <i className="ri-map-pin-2-fill mr-2"></i>
              Serving Nairobi &amp; Beyond
            </span>
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-charcoal-dark mb-4">
            Find Us in Nairobi
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Conveniently located in Nairobi, providing trusted legal services across Kenya. Visit our office or connect with us on Google.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {/* Google Map Embed */}
          <div
            className={`lg:col-span-3 rounded-2xl overflow-hidden shadow-xl border border-gold/10 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="w-full h-[460px]">
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
          </div>

          {/* Right Info Panel */}
          <div
            className={`lg:col-span-2 flex flex-col gap-6 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {/* Google Business Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gold/10 flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-charcoal-dark rounded-xl flex items-center justify-center">
                  <i className="ri-google-fill text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-charcoal-dark">
                    Google Business Profile
                  </h3>
                  <p className="text-gray-500 text-xs">Verified Legal Practice</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center">
                    <i className="ri-building-2-line text-gold text-sm"></i>
                  </div>
                  <div>
                    <p className="text-charcoal-dark text-sm font-medium">Belinda Wakasa</p>
                    <p className="text-gray-500 text-xs">Advocate of the High Court</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center">
                    <i className="ri-map-pin-line text-gold text-sm"></i>
                  </div>
                  <p className="text-gray-600 text-sm">Nairobi CBD, Nairobi, Kenya</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center">
                    <i className="ri-time-line text-gold text-sm"></i>
                  </div>
                  <p className="text-gray-600 text-sm">Mon–Fri: 9:00 AM – 5:00 PM</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center">
                    <i className="ri-star-fill text-gold text-sm"></i>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-gold text-sm"></i>
                    ))}
                    <span className="text-gray-500 text-xs ml-1">Client Rated</span>
                  </div>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/Belinda+Wakasa+Advocate+Nairobi+Kenya"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-charcoal-dark text-white rounded-xl font-semibold text-sm hover:bg-charcoal transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-google-fill text-base"></i>
                View on Google
              </a>
            </div>

            {/* Quick Contact Card */}
            <div className="bg-charcoal-dark rounded-2xl p-8 shadow-lg">
              <h4 className="font-serif text-lg font-bold text-white mb-4">Quick Contact</h4>
              <div className="space-y-3">
                <a
                  href="tel:0758913512"
                  className="flex items-center gap-3 text-white/80 hover:text-gold transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <i className="ri-phone-line text-gold text-sm"></i>
                  </div>
                  <span className="text-sm">0758913512</span>
                </a>
                <a
                  href="mailto:wakasabelinda@gmail.com"
                  className="flex items-center gap-3 text-white/80 hover:text-gold transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <i className="ri-mail-line text-gold text-sm"></i>
                  </div>
                  <span className="text-sm">wakasabelinda@gmail.com</span>
                </a>
                <a
                  href="https://wa.me/254758913512"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="flex items-center gap-3 text-white/80 hover:text-gold transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <i className="ri-whatsapp-line text-gold text-sm"></i>
                  </div>
                  <span className="text-sm">WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {localStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-md border border-gold/5 hover:border-gold/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className={`${stat.icon} text-gold text-xl`}></i>
              </div>
              <p className="font-serif text-xl font-bold text-charcoal-dark">{stat.value}</p>
              <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Service Areas */}
        <div
          className={`transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="font-serif text-2xl font-bold text-charcoal-dark text-center mb-8">
            Areas We Serve in Nairobi
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map((area, index) => (
              <span
                key={index}
                className="px-5 py-2.5 bg-white border border-gold/15 rounded-full text-sm text-charcoal-dark font-medium hover:bg-gold/10 hover:border-gold/30 transition-all duration-300 cursor-default"
              >
                <i className="ri-map-pin-2-line text-gold mr-1.5 text-xs"></i>
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
