import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { supabase } from '../../../lib/supabase';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image_url: string;
  author: string;
  published_at: string;
  document_url: string | null;
}

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        navigate('/articles');
        return;
      }

      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
      navigate('/articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!article) return;

    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';

    // Title & meta description
    document.title = `${article.title} | Belinda Wakasa Legal Articles`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        article.excerpt
          ? article.excerpt.slice(0, 160)
          : `Read "${article.title}" — expert legal insight by Advocate Belinda Wakasa of the High Court of Kenya.`
      );
    }

    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${siteUrl}/articles/${article.slug}`);
    }

    // Remove any previously injected page schemas
    document.querySelectorAll('script[data-page-schema]').forEach((s) => s.remove());

    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt || '',
        url: `${siteUrl}/articles/${article.slug}`,
        datePublished: article.published_at,
        dateModified: article.published_at,
        image: article.cover_image_url || undefined,
        author: {
          '@type': 'Person',
          name: article.author,
          jobTitle: 'Advocate of the High Court of Kenya',
          url: `${siteUrl}/about`,
        },
        publisher: {
          '@type': 'LegalService',
          name: 'Belinda Wakasa Legal Services',
          url: siteUrl,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteUrl}/articles/${article.slug}`,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Articles', item: `${siteUrl}/articles` },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: `${siteUrl}/articles/${article.slug}`,
          },
        ],
      },
    ];

    schemas.forEach((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page-schema', 'article-detail');
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll('script[data-page-schema="article-detail"]').forEach((s) =>
        s.remove()
      );
    };
  }, [article]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <>
      <Navbar />

      {/* Hero Section with Cover Image */}
      <section className="relative pt-32 pb-20 bg-charcoal-dark overflow-hidden">
        {article.cover_image_url && (
          <>
            <div className="absolute inset-0">
              <img
                src={article.cover_image_url}
                alt={article.title}
                className="w-full h-full object-cover object-top opacity-20"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal-dark/80 via-charcoal-dark/90 to-charcoal-dark"></div>
          </>
        )}

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
          {/* Back Button */}
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors mb-8 cursor-pointer"
          >
            <i className="ri-arrow-left-line"></i>
            <span className="text-sm font-medium">Back to Articles</span>
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-gold uppercase tracking-wider">
              {article.author}
            </span>
            <span className="text-white/30">•</span>
            <span className="text-sm text-white/70">
              {formatDate(article.published_at)}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl lg:text-5xl text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-lg text-white/80 leading-relaxed">
              {article.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">
            <div className="article-body font-article text-charcoal/80 max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="font-article text-[22px] font-bold text-charcoal-dark mt-8 mb-4" style={{ lineHeight: '1.15' }}>
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="font-article text-[18px] font-bold text-charcoal-dark mt-8 mb-4" style={{ lineHeight: '1.15' }}>
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-article text-[16px] font-bold text-charcoal-dark mt-6 mb-3" style={{ lineHeight: '1.15' }}>
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="font-article text-[14.67px] text-charcoal/80 mb-4" style={{ lineHeight: '1.15' }}>
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-charcoal-dark">{children}</strong>
                  ),
                  ul: ({ children }) => (
                    <ul className="font-article text-[14.67px] text-charcoal/80 list-disc pl-6 mb-4 space-y-1" style={{ lineHeight: '1.15' }}>
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="font-article text-[14.67px] text-charcoal/80 list-decimal pl-6 mb-4 space-y-1" style={{ lineHeight: '1.15' }}>
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="font-article text-[14.67px] text-charcoal/80 mb-1" style={{ lineHeight: '1.15' }}>
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="font-article text-[14.67px] border-l-4 border-gold pl-4 italic text-charcoal/70 my-4" style={{ lineHeight: '1.15' }}>
                      {children}
                    </blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-gold hover:underline cursor-pointer" rel="nofollow">
                      {children}
                    </a>
                  ),
                  hr: () => (
                    <hr className="my-8 border-t border-charcoal/10" />
                  ),
                  em: ({ children }) => (
                    <span>{children}</span>
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Purchase Full Document Card */}
          {article.document_url && (
            <div className="mt-8 bg-gradient-to-br from-white to-cream border-2 border-gold/30 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row items-center gap-6 p-8">
                <div className="w-16 h-16 flex items-center justify-center bg-gold/10 rounded-2xl shrink-0">
                  <i className="ri-file-word-2-line text-3xl text-gold"></i>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-serif text-xl text-charcoal-dark mb-1">Get the Full In-Depth Document</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">
                    Access the complete, unabridged legal analysis in downloadable Word format — perfect for reference, research, or professional use.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <span className="text-2xl font-bold text-green-600">KES 200</span>
                  <button
                    onClick={() => setShowPurchaseModal(true)}
                    className="px-8 py-3 bg-gold text-charcoal-dark rounded-lg font-semibold hover:bg-gold/90 transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2"
                  >
                    <i className="ri-shopping-cart-2-line"></i>
                    Purchase Document
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="mt-12 bg-white rounded-2xl shadow-sm p-8 flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-gold/70 flex items-center justify-center text-white font-serif text-2xl flex-shrink-0">
              BW
            </div>
            <div>
              <h3 className="font-serif text-xl text-charcoal-dark mb-2">
                {article.author}
              </h3>
              <p className="text-sm text-gold mb-3">Advocate of the High Court of Kenya</p>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                Belinda Wakasa is a distinguished legal practitioner specializing in property law, corporate law, and litigation. With years of experience serving clients across Nairobi and Kenya, she provides expert legal counsel with integrity and excellence.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-br from-charcoal-dark to-charcoal rounded-2xl p-10 text-center">
            <h3 className="font-serif text-2xl text-white mb-3">
              Need Legal Assistance?
            </h3>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Get professional legal advice tailored to your specific situation. Book a consultation today.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-gold text-charcoal-dark rounded-lg font-semibold hover:bg-gold/90 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </article>

      <Footer />

      {/* Purchase Modal */}
      {showPurchaseModal && article.document_url && (
        <DocumentPurchaseModal
          title={article.title}
          onClose={() => setShowPurchaseModal(false)}
        />
      )}
    </>
  );
}

function DocumentPurchaseModal({ title, onClose }: { title: string; onClose: () => void }) {
  const [copied, setCopied] = useState<'phone' | 'email' | null>(null);

  const copyToClipboard = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi Belinda, I would like to purchase the full document: "${title}" (KES 200). I will send the M-Pesa payment and share the transaction code with you.`
    );
    window.open(`https://wa.me/254758913512?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Document Purchase Request: ${title}`);
    const body = encodeURIComponent(
      `Hi Belinda,\n\nI would like to purchase the full in-depth document:\n\nDocument: ${title}\nPrice: KES 200\n\nI will send the M-Pesa payment to your Pochi La Biashara (0758913512) and share the transaction code with you.\n\nThank you.`
    );
    window.open(`mailto:belindawakasa@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-charcoal-dark to-charcoal px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-gold rounded-full">
                <i className="ri-file-word-2-line text-charcoal-dark text-lg"></i>
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">Purchase Document</h3>
                <p className="text-white/60 text-xs">M-Pesa Payment — KES 200</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer">
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Document Info */}
          <div className="flex items-center gap-4 p-4 bg-cream rounded-xl mb-6">
            <div className="w-12 h-12 flex items-center justify-center bg-charcoal-dark/10 rounded-lg shrink-0">
              <i className="ri-file-word-2-line text-2xl text-charcoal-dark"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-charcoal-dark line-clamp-2">{title}</p>
              <p className="text-xs text-charcoal/60">Full In-Depth Legal Analysis (.docx)</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-bold text-green-600">KES 200</p>
            </div>
          </div>

          {/* Payment Steps */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-gold/10 rounded-full shrink-0 mt-0.5">
                <span className="text-sm font-bold text-gold">1</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-charcoal-dark mb-2">Send M-Pesa Payment</h4>
                <p className="text-xs text-charcoal/60 mb-3">
                  Send <strong className="text-green-600">KES 200</strong> to Belinda&apos;s Pochi La Biashara:
                </p>
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <i className="ri-smartphone-line text-green-600"></i>
                  <span className="text-sm font-bold text-green-700 flex-1">0758913512</span>
                  <button
                    onClick={() => copyToClipboard('0758913512', 'phone')}
                    className="px-3 py-1.5 bg-white border border-green-300 rounded-md text-xs font-medium text-green-700 hover:bg-green-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {copied === 'phone' ? (
                      <><i className="ri-check-line"></i> Copied</>
                    ) : (
                      <><i className="ri-file-copy-line"></i> Copy</>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-gold/10 rounded-full shrink-0 mt-0.5">
                <span className="text-sm font-bold text-gold">2</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-charcoal-dark mb-2">Request Your Document</h4>
                <p className="text-xs text-charcoal/60 mb-3">
                  Share your M-Pesa transaction code via WhatsApp or email to receive the full document:
                </p>

                <button
                  onClick={handleWhatsApp}
                  className="w-full mb-2 px-4 py-3 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <i className="ri-whatsapp-line text-lg"></i>
                  <span>Message on WhatsApp</span>
                </button>

                <button
                  onClick={handleEmail}
                  className="w-full px-4 py-3 bg-charcoal-dark text-white rounded-lg text-sm font-semibold hover:bg-gold hover:text-charcoal-dark transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <i className="ri-mail-line text-lg"></i>
                  <span>Send Email Request</span>
                </button>

                <div className="flex items-center gap-2 p-3 bg-cream border border-charcoal/10 rounded-lg mt-3">
                  <i className="ri-mail-line text-charcoal/60"></i>
                  <span className="text-xs text-charcoal/70 flex-1">belindawakasa@gmail.com</span>
                  <button
                    onClick={() => copyToClipboard('belindawakasa@gmail.com', 'email')}
                    className="px-2 py-1 text-xs text-charcoal/60 hover:text-charcoal transition-colors cursor-pointer"
                  >
                    {copied === 'email' ? (
                      <i className="ri-check-line"></i>
                    ) : (
                      <i className="ri-file-copy-line"></i>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="flex items-start gap-3 p-4 bg-gold/5 border border-gold/20 rounded-xl">
            <i className="ri-information-line text-gold text-lg shrink-0 mt-0.5"></i>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              <strong className="text-charcoal-dark">Important:</strong> Include your M-Pesa transaction code when contacting Belinda. You will receive the full Word document within a few hours during business hours.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-cream/50 border-t border-charcoal/5">
          <div className="flex items-center justify-center gap-2 text-xs text-charcoal/40">
            <i className="ri-shield-check-line"></i>
            <span>Secure M-Pesa Payment &bull; Pochi La Biashara</span>
          </div>
        </div>
      </div>
    </div>
  );
}
