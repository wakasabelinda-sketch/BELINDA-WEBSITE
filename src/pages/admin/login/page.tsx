import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      navigate('/admin/dashboard');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="ri-shield-keyhole-line text-3xl text-white"></i>
            </div>
            <h1 className="text-2xl font-bold text-neutral-800 mb-2">Admin Login</h1>
            <p className="text-neutral-600 text-sm">Access your content management dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-sm"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-sm"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <i className="ri-error-warning-line text-red-500 text-lg mt-0.5"></i>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-loader-4-line animate-spin"></i>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-neutral-600 hover:text-amber-600 transition-colors inline-flex items-center gap-1"
            >
              <i className="ri-arrow-left-line"></i>
              Back to website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
