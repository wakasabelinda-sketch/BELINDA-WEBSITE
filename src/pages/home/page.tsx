import { useEffect } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import HeroSection from './components/HeroSection';
import BioSection from './components/BioSection';
import ServicesPreview from './components/ServicesPreview';
import TestimonialsSection from './components/TestimonialsSection';
import LocalPresenceSection from './components/LocalPresenceSection';
import CTASection from './components/CTASection';

export default function HomePage() {
  useEffect(() => {
    document.title = 'Nairobi Legal Services | Belinda Wakasa - Advocate of the High Court of Kenya';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Belinda Wakasa is an Advocate of the High Court of Kenya providing strategic, ethical, and results-driven legal representation in Nairobi. Specializing in Conveyancing & Property Law, Commercial & Corporate Law, Civil Litigation, Succession & Estate Planning, and Contract Drafting & Review.'
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${import.meta.env.VITE_SITE_URL || 'https://example.com'}/`);
    }

    document.querySelectorAll('script[data-page-schema]').forEach((s) => s.remove());

    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';

    const schemaData = [
      {
        '@context': 'https://schema.org',
        '@type': 'LegalService',
        name: 'Belinda Wakasa - Advocate of the High Court',
        description:
          'Professional legal services in Nairobi, Kenya specializing in property law, corporate law, litigation, estate planning, and contract drafting.',
        url: siteUrl,
        telephone: '+254758913512',
        email: 'wakasabelinda@gmail.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Nairobi CBD',
          addressLocality: 'Nairobi',
          addressRegion: 'Nairobi County',
          addressCountry: 'KE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '-1.286389',
          longitude: '36.817223',
        },
        priceRange: '$$',
        areaServed: { '@type': 'Country', name: 'Kenya' },
        founder: {
          '@type': 'Person',
          name: 'Belinda Wakasa',
          jobTitle: 'Advocate of the High Court of Kenya',
          worksFor: { '@type': 'Organization', name: 'Daniel and Kenneth Advocates' },
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '17:00',
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Belinda Wakasa Legal Services',
        url: siteUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/articles?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ];

    schemaData.forEach((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page-schema', 'home');
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll('script[data-page-schema="home"]').forEach((s) => s.remove());
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <BioSection />
        <ServicesPreview />
        <TestimonialsSection />
        <LocalPresenceSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
