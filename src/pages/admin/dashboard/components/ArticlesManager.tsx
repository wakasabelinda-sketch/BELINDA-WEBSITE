import { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabase';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image_url: string;
  author: string;
  is_published: boolean;
  published_at: string;
  created_at: string;
}

export default function ArticlesManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    cover_image_url: '',
    author: '',
    is_published: false,
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setArticles(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const articleData = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      published_at: formData.is_published ? new Date().toISOString() : null,
    };

    if (editingArticle) {
      const { error } = await supabase
        .from('articles')
        .update(articleData)
        .eq('id', editingArticle.id);

      if (!error) {
        alert('Article updated successfully!');
        resetForm();
        fetchArticles();
      } else {
        alert('Error updating article: ' + error.message);
      }
    } else {
      const { error } = await supabase.from('articles').insert([articleData]);

      if (!error) {
        alert('Article created successfully!');
        resetForm();
        fetchArticles();
      } else {
        alert('Error creating article: ' + error.message);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    const { error } = await supabase.from('articles').delete().eq('id', id);

    if (!error) {
      alert('Article deleted successfully!');
      fetchArticles();
    } else {
      alert('Error deleting article: ' + error.message);
    }
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      content: article.content,
      excerpt: article.excerpt,
      cover_image_url: article.cover_image_url,
      author: article.author,
      is_published: article.is_published,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      cover_image_url: '',
      author: '',
      is_published: false,
    });
    setEditingArticle(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <i className="ri-loader-4-line text-3xl text-amber-500 animate-spin"></i>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-neutral-800">Articles Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors whitespace-nowrap"
        >
          <i className={showForm ? 'ri-close-line' : 'ri-add-line'}></i>
          {showForm ? 'Cancel' : 'New Article'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-bold text-neutral-800 mb-4">
            {editingArticle ? 'Edit Article' : 'Create New Article'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                  placeholder="Article title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                  placeholder="auto-generated-from-title"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                placeholder="Author name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Excerpt *
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
                rows={2}
                maxLength={500}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm resize-none"
                placeholder="Brief summary (max 500 characters)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Content * (Markdown supported)
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                rows={12}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm font-mono resize-none"
                placeholder="Write your article content here... (Markdown supported)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Cover Image URL
              </label>
              <input
                type="url"
                value={formData.cover_image_url}
                onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_published"
                checked={formData.is_published}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                className="w-4 h-4 text-amber-500 border-neutral-300 rounded focus:ring-amber-500"
              />
              <label htmlFor="is_published" className="text-sm font-medium text-neutral-700">
                Publish immediately
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors whitespace-nowrap"
              >
                {editingArticle ? 'Update Article' : 'Create Article'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors whitespace-nowrap"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                    No articles yet. Create your first article!
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-neutral-800">{article.title}</div>
                      <div className="text-xs text-neutral-500">{article.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{article.author}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                          article.is_published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        {article.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {new Date(article.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(article)}
                        className="text-amber-600 hover:text-amber-800 mr-4 whitespace-nowrap"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="text-red-600 hover:text-red-800 whitespace-nowrap"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
