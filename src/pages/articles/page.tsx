import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string;
  author: string;
  published_at: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();

    // SEO
    document.title = 'Legal Articles & Insights | Nairobi Law Blog | Belinda Wakasa';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Read expert legal articles and insights by Belinda Wakasa, Advocate of the High Court of Kenya. Covering property law, corporate law, litigation, estate planning, and Kenyan legal updates from Nairobi.'
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${import.meta.env.VITE_SITE_URL || 'https://example.com'}/articles`);
    }

    document.querySelectorAll('script[data-page-schema]').forEach((s) => s.remove());

    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';

    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Legal Insights & Articles by Belinda Wakasa',
        description: 'Expert legal articles covering property law, corporate law, litigation, estate planning, and Kenyan legal updates.',
        url: `${siteUrl}/articles`,
        author: {
          '@type': 'Person',
          name: 'Belinda Wakasa',
          jobTitle: 'Advocate of the High Court of Kenya',
        },
        publisher: {
          '@type': 'LegalService',
          name: 'Belinda Wakasa Legal Services',
          url: siteUrl,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Articles', item: `${siteUrl}/articles` },
        ],
      },
    ];

    schemas.forEach((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page-schema', 'articles');
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll('script[data-page-schema="articles"]').forEach((s) => s.remove());
    };
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, slug, excerpt, cover_image_url, author, published_at')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-charcoal-dark via-charcoal to-charcoal-dark overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="font-serif text-5xl lg:text-6xl text-white mb-6">
            Legal Insights &amp; <span className="text-gold">Articles</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Stay informed with expert legal analysis, case studies, and practical guidance from Belinda Wakasa, Advocate of the High Court of Kenya.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20">
              <i className="ri-article-line text-6xl text-charcoal/30 mb-4"></i>
              <h3 className="font-serif text-2xl text-charcoal-dark mb-2">No Articles Yet</h3>
              <p className="text-charcoal/60">Check back soon for legal insights and updates.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/articles/${article.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  {/* Cover Image */}
                  <div className="relative h-56 overflow-hidden bg-charcoal/5">
                    {article.cover_image_url ? (
                      <img
                        src={article.cover_image_url}
                        alt={article.title}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <i className="ri-article-line text-6xl text-charcoal/20"></i>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/60 via-transparent to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium text-gold uppercase tracking-wider">
                        {article.author}
                      </span>
                      <span className="text-charcoal/30">•</span>
                      <span className="text-xs text-charcoal/60">
                        {formatDate(article.published_at)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl text-charcoal-dark mb-3 group-hover:text-gold transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-charcoal/70 leading-relaxed line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-gold font-medium text-sm group-hover:gap-4 transition-all">
                      Read Article
                      <i className="ri-arrow-right-line"></i>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
