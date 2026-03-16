import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import ArticlesManager from './components/ArticlesManager';
import TemplatesManager from './components/TemplatesManager';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'articles' | 'templates'>('articles');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/admin/login');
    } else {
      setUser(user);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-4xl text-amber-500 animate-spin"></i>
          <p className="text-neutral-600 mt-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <i className="ri-dashboard-line text-xl text-white"></i>
              </div>
              <div>
                <h1 className="text-lg font-bold text-neutral-800">Admin Dashboard</h1>
                <p className="text-xs text-neutral-500">Content Management System</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-neutral-600">
                <i className="ri-user-line"></i>
                <span>{user?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:text-amber-600 transition-colors whitespace-nowrap"
              >
                <i className="ri-logout-box-line"></i>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-6 py-3 text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'articles'
                  ? 'text-amber-600 border-b-2 border-amber-600'
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
            >
              <i className="ri-article-line mr-2"></i>
              Articles
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-6 py-3 text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'templates'
                  ? 'text-amber-600 border-b-2 border-amber-600'
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
            >
              <i className="ri-file-text-line mr-2"></i>
              Templates
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'articles' ? <ArticlesManager /> : <TemplatesManager />}
      </main>
    </div>
  );
}
