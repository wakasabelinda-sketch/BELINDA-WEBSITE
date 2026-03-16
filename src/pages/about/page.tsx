import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

export default function AboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Set page title
    document.title =
      'About Belinda Wakasa - Advocate of the High Court of Kenya | Professional Biography';

    // Update meta description if it exists
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Learn about Belinda Wakasa, an experienced Advocate of the High Court of Kenya. Discover her professional background, education, practice philosophy, and commitment to delivering exceptional legal services in Nairobi and across Kenya.'
      );
    }

    // Set or update canonical link
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute(
        'href',
        `${import.meta.env.VITE_SITE_URL || 'https://example.com'}/about`
      );
    }

    // Remove any previously injected schema scripts
    document.querySelectorAll('script[data-page-schema]').forEach((s) => s.remove());

    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';

    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Belinda Wakasa',
        jobTitle: 'Advocate of the High Court of Kenya',
        description:
          'Experienced Advocate of the High Court of Kenya providing strategic legal representation in property law, corporate law, litigation, estate planning, and contract services.',
        url: `${siteUrl}/about`,
        email: 'wakasabelinda@gmail.com',
        telephone: '+254758913512',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Nairobi',
          addressCountry: 'KE',
        },
        worksFor: {
          '@type': 'Organization',
          name: 'Daniel and Kenneth Advocates',
        },
        alumniOf: [
          { '@type': 'EducationalOrganization', name: 'University of Nairobi' },
          { '@type': 'EducationalOrganization', name: 'Kenya School of Law' },
        ],
        knowsAbout: [
          'Conveyancing & Property Law',
          'Commercial & Corporate Law',
          'Civil Litigation',
          'Succession & Estate Planning',
          'Contract Drafting & Review',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'About', item: `${siteUrl}/about` },
        ],
      },
    ];

    schemas.forEach((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page-schema', 'about');
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    });

    // Cleanup on unmount
    return () => {
      document.querySelectorAll('script[data-page-schema="about"]').forEach((s) => s.remove());
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-charcoal-dark pt-32 pb-20 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block px-4 py-2 bg-white/10 border border-gold/30 rounded-full">
              <span className="text-gold text-xs font-medium tracking-wide uppercase">
                About Me
              </span>
            </div>
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white">
              Professional Biography
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Dedicated to providing strategic, ethical, and results‑driven legal representation
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="bg-white py-20 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Profile Image */}
              <div className="lg:col-span-1">
                <div className="sticky top-32">
                  <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src="https://static.readdy.ai/image/b92b61a178bbadc2f7e64b37b3c92766/6d13cf5d6318d9344aded042172edd3c.jpeg"
                      alt="Belinda Wakasa - Advocate of the High Court of Kenya"
                      title="Belinda Wakasa - Professional Legal Advocate"
                      className="w-full rounded-2xl shadow-xl object-cover"
                    />
                  </div>
                  <div className="mt-8 p-6 bg-cream rounded-xl">
                    <h3 className="font-serif text-2xl font-bold text-charcoal-dark mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <i className="ri-mail-line text-gold text-xl mt-1"></i>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Email</p>
                          <a
                            href="mailto:wakasabelinda@gmail.com"
                            className="text-charcoal-dark font-medium hover:text-gold transition-colors cursor-pointer"
                          >
                            wakasabelinda@gmail.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <i className="ri-phone-line text-gold text-xl mt-1"></i>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Phone</p>
                          <a
                            href="tel:0758913512"
                            className="text-charcoal-dark font-medium hover:text-gold transition-colors cursor-pointer"
                          >
                            0758913512
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <i className="ri-map-pin-line text-gold text-xl mt-1"></i>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Location</p>
                          <p className="text-charcoal-dark font-medium">Nairobi, Kenya</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Biography */}
                <div>
                  <div className="w-16 h-1 bg-gradient-to-r from-gold to-charcoal mb-6"></div>
                  <h2 className="font-serif text-4xl font-bold text-charcoal-dark mb-6">
                    About Belinda Wakasa
                  </h2>
                  <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                    <p>
                      <strong className="text-charcoal-dark">Belinda Wakasa</strong> is an{' '}
                      <strong className="text-charcoal-dark">Advocate of the High Court of Kenya</strong>{' '}
                      currently practicing at{' '}
                      <strong className="text-charcoal-dark">Daniel and Kenneth Advocates</strong>,
                      where she provides comprehensive legal services to a diverse clientele across
                      Kenya. Her practice encompasses a wide range of legal disciplines, with
                      particular expertise in property law, commercial transactions, civil litigation,
                      and estate planning.
                    </p>
                    <p>
                      With extensive experience in{' '}
                      <strong className="text-charcoal-dark">Conveyancing &amp; Property Law</strong>,
                      <strong className="text-charcoal-dark"> Commercial &amp; Corporate Law</strong>,
                      <strong className="text-charcoal-dark"> Civil Litigation</strong>,{' '}
                      <strong className="text-charcoal-dark">
                        Succession &amp; Estate Planning
                      </strong>
                      , and{' '}
                      <strong className="text-charcoal-dark">Contract Drafting &amp; Review</strong>,
                      Belinda brings a comprehensive understanding of Kenyan legal frameworks to
                      every matter she handles. Her practice serves both individuals and businesses,
                      providing tailored legal solutions that address complex challenges with
                      precision and care.
                    </p>
                    <p>
                      Throughout her career, Belinda has successfully represented clients in
                      high‑stakes property transactions, complex commercial disputes, and sensitive
                      estate planning matters. Her approach is characterized by meticulous attention
                      to detail, thorough legal research, and a deep understanding of her clients’
                      objectives. She believes that effective legal representation goes beyond
                      technical expertise—it requires empathy, clear communication, and a genuine
                      commitment to protecting her clients’ interests.
                    </p>
                  </div>
                </div>

                {/* Education */}
                <div className="bg-cream p-10 rounded-2xl">
                  <h3 className="font-serif text-3xl font-bold text-charcoal-dark mb-6">
                    Education &amp; Qualifications
                  </h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gold/30 to-charcoal/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="ri-graduation-cap-line text-charcoal-dark text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-charcoal-dark text-lg mb-2">
                          Bachelor of Laws (LL.B)
                        </h4>
                        <p className="text-gray-600">University of Nairobi, Kenya</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gold/30 to-charcoal/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="ri-award-line text-charcoal-dark text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-charcoal-dark text-lg mb-2">
                          Postgraduate Diploma in Law
                        </h4>
                        <p className="text-gray-600">Kenya School of Law</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gold/30 to-charcoal/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="ri-scales-3-line text-charcoal-dark text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-charcoal-dark text-lg mb-2">
                          Advocate of the High Court of Kenya
                        </h4>
                        <p className="text-gray-600">Admitted to the Roll of Advocates</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Practice Philosophy */}
                <div>
                  <h3 className="font-serif text-3xl font-bold text-charcoal-dark mb-6">
                    Practice Philosophy
                  </h3>
                  <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                    <p>
                      Belinda&apos;s practice is founded on the belief that every client deserves
                      personalized, strategic legal representation that addresses their unique
                      circumstances and goals. She takes the time to understand the full context of
                      each matter, ensuring that her advice is not only legally sound but also
                      practical and aligned with her clients’ broader objectives.
                    </p>
                    <p>
                      Transparency and communication are central to her approach. Belinda ensures
                      that clients are informed at every stage of their legal journey, explaining
                      complex legal concepts in accessible terms and providing realistic assessments
                      of potential outcomes. This collaborative approach empowers clients to make
                      informed decisions with confidence.
                    </p>
                  </div>
                </div>

                {/* Professional Values */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: 'ri-shield-check-line',
                      title: 'Integrity',
                      description:
                        'Upholding the highest ethical standards in every aspect of legal practice.',
                    },
                    {
                      icon: 'ri-lightbulb-line',
                      title: 'Excellence',
                      description:
                        'Delivering superior legal services through continuous learning and dedication.',
                    },
                    {
                      icon: 'ri-team-line',
                      title: 'Client-Centered',
                      description:
                        'Prioritizing client needs and building lasting relationships based on trust.',
                    },
                    {
                      icon: 'ri-compass-line',
                      title: 'Strategic Thinking',
                      description:
                        'Developing innovative solutions to complex legal challenges.',
                    },
                  ].map((value, index) => (
                    <div
                      key={index}
                      className="p-6 border border-gray-200 rounded-xl hover:border-gold/50 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-gold/20 to-charcoal/20 rounded-full flex items-center justify-center mb-4">
                        <i className={`${value.icon} text-charcoal-dark text-2xl`}></i>
                      </div>
                      <h4 className="font-serif text-xl font-bold text-charcoal-dark mb-3">
                        {value.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="bg-charcoal-dark p-10 rounded-2xl text-center">
                  <h3 className="font-serif text-3xl font-bold text-white mb-4">
                    Let&apos;s Work Together
                  </h3>
                  <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                    Schedule a consultation to discuss how I can help with your legal needs
                  </p>
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-8 py-4 bg-gold text-charcoal-dark rounded-lg font-semibold text-base hover:scale-105 hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 cursor-pointer whitespace-nowrap"
                  >
                    Book Consultation
                  </button>
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
