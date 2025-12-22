import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData.username, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.username?.[0] || 'Failed to create account.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <div className="relative overflow-hidden pt-24 pb-16 md:pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.12),transparent_35%),radial-gradient(circle_at_85%_0%,rgba(59,130,246,0.1),transparent_32%),radial-gradient(circle_at_60%_80%,rgba(132,204,22,0.14),transparent_36%)]"></div>
        <div className="max-w-xl mx-auto px-6 relative z-10">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-200/40 via-white to-sky-200/30 blur-xl"></div>
            <div className="relative bg-white/90 border border-emerald-50 rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl p-8">
              <div className="mb-6 text-center">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-600">
                  Get started
                </p>
                <h2 className="text-2xl font-black text-gray-900 mt-2">Create your account</h2>
                <p className="text-sm text-gray-600 mt-1">Takes less than a minute.</p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl border border-red-100 bg-red-50 text-red-700 text-sm font-semibold text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Username</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                    placeholder="Pick a username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Work email</label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                    placeholder="you@example.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
                  <input
                    type="password"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(16,185,129,0.35)] hover:shadow-[0_22px_60px_rgba(16,185,129,0.45)] transition disabled:opacity-60"
                >
                  {loading ? 'Creating account…' : 'Create account'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-emerald-700 hover:text-emerald-800">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;