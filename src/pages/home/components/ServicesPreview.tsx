
export default function ServicesPreview() {
  const services = [
    {
      icon: 'ri-scales-3-line',
      title: 'Conveyancing & Property Law',
      description:
        'Expert guidance on property transactions, title transfers, and real estate matters in Kenya.',
    },
    {
      icon: 'ri-briefcase-line',
      title: 'Commercial & Corporate Law',
      description:
        'Comprehensive legal support for businesses, from formation to compliance and governance.',
    },
    {
      icon: 'ri-gavel-line',
      title: 'Civil Litigation',
      description:
        'Strategic representation in civil disputes with a focus on achieving favorable outcomes.',
    },
    {
      icon: 'ri-file-text-line',
      title: 'Succession & Estate Planning',
      description:
        'Thoughtful planning and administration of estates to protect your legacy and loved ones.',
    },
    {
      icon: 'ri-quill-pen-line',
      title: 'Contract Drafting & Review',
      description:
        'Meticulous drafting and review of contracts to safeguard your interests and minimize risk.',
    },
    {
      icon: 'ri-chat-4-line',
      title: 'Legal Consultation',
      description:
        'Personalized legal advice tailored to your specific needs and circumstances.',
    },
  ];

  // Simple navigation helper – falls back to window.location if a router isn’t available
  const navigateTo = (path) => {
    try {
      // If a global navigation function exists (e.g., from a routing library), use it
      if (typeof window.REACT_APP_NAVIGATE === 'function') {
        window.REACT_APP_NAVIGATE(path);
      } else {
        // Default behaviour: change the location
        window.location.href = path;
      }
    } catch (err) {
      console.error('Navigation error:', err);
    }
  };

  return (
    <section className="bg-charcoal-dark py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-white/10 border border-gold/30 rounded-full">
            <span className="text-gold text-xs font-medium tracking-wide uppercase">
              Legal Services
            </span>
          </div>
          <h2 className="font-serif text-5xl lg:text-6xl font-bold text-white">
            Areas of Practice
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Comprehensive legal solutions tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-10 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-charcoal/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-gold group-hover:to-charcoal group-hover:scale-110 transition-all duration-300">
                <i
                  className={`${service.icon} text-4xl text-charcoal-dark group-hover:text-white transition-colors`}
                ></i>
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal-dark mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-2 text-charcoal font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer whitespace-nowrap">
                Learn More <i className="ri-arrow-right-line"></i>
              </span>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigateTo('/services')}
            className="px-8 py-4 bg-gold text-charcoal-dark rounded-lg font-semibold text-base hover:scale-105 hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
}
