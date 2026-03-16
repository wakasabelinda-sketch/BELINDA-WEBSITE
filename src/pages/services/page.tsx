import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

export default function ServicesPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title =
      'Legal Services in Nairobi | Property Law, Corporate Law, Litigation | Belinda Wakasa';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Comprehensive legal services in Nairobi, Kenya including Conveyancing & Property Law, Commercial & Corporate Law, Civil Litigation, Succession & Estate Planning, and Contract Drafting & Review. Expert legal representation by Advocate Belinda Wakasa.'
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute(
        'href',
        `${import.meta.env.VITE_SITE_URL || 'https://example.com'}/services`
      );
    }

    document.querySelectorAll('script[data-page-schema]').forEach((s) => s.remove());

    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';

    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Legal Services',
        provider: {
          '@type': 'LegalService',
          name: 'Belinda Wakasa - Advocate of the High Court',
          url: siteUrl,
          telephone: '+254758913512',
          email: 'wakasabelinda@gmail.com',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Nairobi',
            addressCountry: 'KE',
          },
        },
        areaServed: { '@type': 'Country', name: 'Kenya' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Legal Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Conveyancing & Property Law',
                description:
                  'Property transactions, title searches, property transfers, lease agreements, and land registration services.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Commercial & Corporate Law',
                description:
                  'Company formation, corporate governance, mergers and acquisitions, and regulatory compliance services.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Civil Litigation',
                description:
                  'Legal representation in civil disputes, contractual disagreements, and property disputes.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Succession & Estate Planning',
                description:
                  'Will drafting, trust creation, estate administration, and succession planning services.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Contract Drafting & Review',
                description:
                  'Contract drafting, review, and negotiation services across various sectors.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Legal Consultation',
                description:
                  'Personalized legal advice and ongoing counsel for individuals and businesses.',
              },
            },
          ],
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services` },
        ],
      },
    ];

    schemas.forEach((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page-schema', 'services');
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll('script[data-page-schema="services"]').forEach((s) => s.remove());
    };
  }, []);

  const services = [
    {
      icon: 'ri-scales-3-line',
      title: 'Conveyancing & Property Law',
      description:
        'Navigate property transactions with confidence. Our conveyancing services cover title searches, property transfers, lease agreements, and land registration. We ensure all documentation is accurate and compliant with Kenyan land laws, protecting your investment at every step.',
    },
    {
      icon: 'ri-briefcase-line',
      title: 'Commercial & Corporate Law',
      description:
        "Comprehensive legal support for businesses of all sizes. From company formation and registration to corporate governance, mergers and acquisitions, and regulatory compliance, we provide strategic counsel that helps your business thrive in Kenya's dynamic commercial environment.",
    },
    {
      icon: 'ri-gavel-line',
      title: 'Civil Litigation',
      description:
        "Strong representation in civil disputes. Whether you're facing a contractual disagreement, property dispute, or other civil matter, we provide strategic litigation services aimed at protecting your rights and achieving favorable resolutions through negotiation or court proceedings.",
    },
    {
      icon: 'ri-file-text-line',
      title: 'Succession & Estate Planning',
      description:
        'Plan for the future with confidence. Our estate planning services include will drafting, trust creation, estate administration, and succession planning. We help you protect your assets and ensure your wishes are honored while minimizing potential disputes among beneficiaries.',
    },
    {
      icon: 'ri-quill-pen-line',
      title: 'Contract Drafting & Review',
      description:
        'Protect your interests with well-crafted contracts. We draft, review, and negotiate contracts across various sectors, ensuring clarity, enforceability, and compliance with Kenyan law. From employment agreements to commercial contracts, we safeguard your legal position.',
    },
    {
      icon: 'ri-chat-4-line',
      title: 'Legal Consultation',
      description:
        'Personalized legal advice tailored to your needs. Whether you need guidance on a specific legal issue or ongoing counsel for your business, our consultation services provide clear, practical advice that empowers you to make informed decisions.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-white pt-32 pb-16 px-6 lg:px-12">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <div className="inline-block px-4 py-2 border-2 border-charcoal rounded-full">
              <span className="text-charcoal text-xs font-medium tracking-wide uppercase">
                Our Services
              </span>
            </div>
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-charcoal-dark leading-tight">
              Comprehensive Legal Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Expert representation across multiple practice areas in Kenya
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="bg-cream py-20 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <article
                  key={index}
                  className="group bg-white border border-gray-200 rounded-2xl p-12 hover:bg-charcoal-dark hover:border-charcoal-dark hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div className="w-18 h-18 bg-gradient-to-br from-gold/20 to-charcoal/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-gold group-hover:to-charcoal group-hover:scale-110 transition-all duration-300">
                    <i
                      className={`${service.icon} text-5xl text-charcoal-dark group-hover:text-white transition-colors`}
                    ></i>
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-charcoal-dark mb-4 group-hover:text-white transition-colors leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8 group-hover:text-white/90 transition-colors">
                    {service.description}
                  </p>
                  <button
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center gap-2 text-charcoal font-semibold text-base group-hover:text-gold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    View Details <i className="ri-arrow-right-line"></i>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white py-20 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-charcoal-dark">
              Need Legal Assistance?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Schedule a consultation to discuss your legal needs and discover how we can help you
              achieve your objectives.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-gold text-charcoal-dark rounded-lg font-semibold text-base hover:scale-105 hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Book Consultation
              </button>
              <button
                onClick={() => navigate('/about')}
                className="px-8 py-4 border-2 border-charcoal text-charcoal-dark rounded-lg font-semibold text-base hover:bg-charcoal hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Learn More About Us
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
