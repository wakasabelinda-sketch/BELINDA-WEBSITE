import { useEffect, useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { supabase } from '../../lib/supabase';
import MpesaPaymentModal from './components/MpesaPaymentModal';
import TemplatePreviewModal from './components/TemplatePreviewModal';

interface Template {
  id: string;
  title: string;
  description: string;
  file_url: string;
  price_kes: number;
  preview_image_url: string | null;
  preview_text: string | null;
  is_active: boolean;
  created_at: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  useEffect(() => {
    // SEO meta tags
    document.title = 'Legal Document Templates Kenya | Court-Ready DOCX | Belinda Wakasa';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Download professionally drafted legal document templates for Kenyan courts by Advocate Belinda Wakasa. Court-ready, editable DOCX formats covering property, corporate, and litigation documents. Affordable instant download.'
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute(
        'href',
        `${import.meta.env.VITE_SITE_URL || 'https://example.com'}/templates`
      );
    }

    document.querySelectorAll('script[data-page-schema]').forEach((s) => s.remove());

    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';

    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Legal Document Templates — Belinda Wakasa',
        description:
          'Professionally drafted, court-ready legal document templates for Kenyan courts. Editable DOCX format, instant download.',
        url: `${siteUrl}/templates`,
        provider: {
          '@type': 'LegalService',
          name: 'Belinda Wakasa - Advocate of the High Court',
          url: siteUrl,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Legal Document Templates',
        description: 'Court-ready legal document templates for Kenyan courts by Advocate Belinda Wakasa.',
        url: `${siteUrl}/templates`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'Product',
              name: 'Legal Document Template',
              description: 'Professionally drafted, court-ready legal document template for Kenyan courts.',
              offers: {
                '@type': 'Offer',
                priceCurrency: 'KES',
                availability: 'https://schema.org/InStock',
                seller: {
                  '@type': 'LegalService',
                  name: 'Belinda Wakasa Legal Services',
                  url: siteUrl,
                },
              },
            },
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Templates', item: `${siteUrl}/templates` },
        ],
      },
    ];

    schemas.forEach((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page-schema', 'templates');
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll('script[data-page-schema="templates"]').forEach((s) => s.remove());
    };
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = (template: Template) => {
    setPreviewTemplate(null);
    setSelectedTemplate(template);
  };

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12 bg-gradient-to-br from-charcoal-dark via-charcoal to-charcoal-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6">
              <i className="ri-file-text-line text-gold"></i>
              <span className="text-gold text-sm font-medium">Professional Legal Documents</span>
            </div>
            
            <h1 className="font-serif text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Legal Document <span className="text-gold">Templates</span>
            </h1>
            
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Download professionally drafted legal templates for Kenyan courts. Save time and ensure proper formatting with our ready-to-use documents.
            </p>

            <div className="flex items-center justify-center gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <i className="ri-shield-check-line text-gold"></i>
                <span>Court-Ready Format</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-download-cloud-line text-gold"></i>
                <span>Instant Download</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-price-tag-3-line text-gold"></i>
                <span>Affordable Pricing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
            </div>
          ) : templates.length === 0 ? (
            <div className="text-center py-20">
              <i className="ri-file-list-3-line text-6xl text-charcoal/20 mb-4"></i>
              <h3 className="text-2xl font-serif text-charcoal-dark mb-2">No Templates Available</h3>
              <p className="text-charcoal/60">Check back soon for new legal document templates.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Template Preview */}
                  <div className="h-56 bg-gradient-to-br from-charcoal-dark to-charcoal flex items-center justify-center relative overflow-hidden cursor-pointer" onClick={() => handlePreview(template)}>
                    {/* Mini document preview */}
                    <div className="w-[85%] h-[85%] bg-white rounded-md shadow-lg overflow-hidden relative">
                      <div className="px-4 pt-4 pb-0">
                        <div className="space-y-1.5">
                          <div className="h-2 w-3/4 bg-charcoal/20 rounded-full mx-auto"></div>
                          <div className="h-1.5 w-1/2 bg-charcoal/10 rounded-full mx-auto"></div>
                          <div className="h-px w-full bg-charcoal/5 my-2"></div>
                          <div className="h-1.5 w-full bg-charcoal/8 rounded-full"></div>
                          <div className="h-1.5 w-11/12 bg-charcoal/8 rounded-full"></div>
                          <div className="h-1.5 w-full bg-charcoal/8 rounded-full"></div>
                          <div className="h-1.5 w-3/4 bg-charcoal/8 rounded-full"></div>
                          <div className="h-1.5 w-full bg-charcoal/8 rounded-full"></div>
                          <div className="h-1.5 w-5/6 bg-charcoal/8 rounded-full"></div>
                        </div>
                      </div>
                      {/* Blur overlay on bottom half */}
                      <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-b from-transparent via-white/70 to-white backdrop-blur-[2px] flex items-end justify-center pb-3">
                        <div className="flex items-center gap-1.5 text-charcoal/50">
                          <i className="ri-eye-line text-xs"></i>
                          <span className="text-[10px] font-medium">Click to Preview</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-gold rounded-full">
                      <span className="text-charcoal-dark text-xs font-bold whitespace-nowrap">KES {template.price_kes}</span>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-charcoal-dark mb-3 leading-tight group-hover:text-gold transition-colors">
                      {template.title}
                    </h3>
                    
                    <p className="text-charcoal/70 text-sm leading-relaxed mb-6 line-clamp-3">
                      {template.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-charcoal/60 text-xs">
                        <i className="ri-check-line text-gold"></i>
                        <span>Professionally drafted</span>
                      </div>
                      <div className="flex items-center gap-2 text-charcoal/60 text-xs">
                        <i className="ri-check-line text-gold"></i>
                        <span>Kenyan legal standards</span>
                      </div>
                      <div className="flex items-center gap-2 text-charcoal/60 text-xs">
                        <i className="ri-check-line text-gold"></i>
                        <span>Editable DOCX format</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handlePreview(template)}
                        className="flex-1 px-4 py-3.5 border-2 border-charcoal/15 text-charcoal-dark rounded-lg font-semibold text-sm hover:border-gold hover:text-gold transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                      >
                        <i className="ri-eye-line"></i>
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={() => handlePurchase(template)}
                        className="flex-1 px-4 py-3.5 bg-charcoal-dark text-white rounded-lg font-semibold text-sm hover:bg-gold hover:text-charcoal-dark transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                      >
                        <span>Purchase</span>
                        <i className="ri-arrow-right-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Templates */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-charcoal-dark mb-4">
              Why Choose Our <span className="text-gold">Templates?</span>
            </h2>
            <p className="text-charcoal/70 text-lg max-w-2xl mx-auto">
              Professional legal documents crafted with precision and expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: 'ri-shield-check-line',
                title: 'Court-Ready',
                description: 'All templates meet Kenyan court formatting and legal requirements'
              },
              {
                icon: 'ri-time-line',
                title: 'Save Time',
                description: 'Skip the drafting process with pre-formatted professional documents'
              },
              {
                icon: 'ri-edit-line',
                title: 'Fully Editable',
                description: 'Customize templates to fit your specific case requirements'
              },
              {
                icon: 'ri-money-dollar-circle-line',
                title: 'Affordable',
                description: 'Professional legal documents at a fraction of custom drafting costs'
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:bg-cream transition-colors duration-300"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-gold/10 rounded-full mx-auto mb-4">
                  <i className={`${benefit.icon} text-3xl text-gold`}></i>
                </div>
                <h3 className="font-sans font-semibold text-lg text-charcoal-dark mb-2">
                  {benefit.title}
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-br from-charcoal-dark to-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-white mb-6">
            Need a Custom Legal Document?
          </h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            If you can't find the template you need, I can draft a custom legal document tailored to your specific requirements.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal-dark rounded-lg font-semibold text-base hover:bg-white transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            <span>Request Custom Document</span>
            <i className="ri-arrow-right-line"></i>
          </a>
        </div>
      </section>

      <Footer />

      {/* Template Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onPurchase={() => handlePurchase(previewTemplate)}
        />
      )}

      {/* M-Pesa Payment Modal */}
      {selectedTemplate && (
        <MpesaPaymentModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </div>
  );
}
