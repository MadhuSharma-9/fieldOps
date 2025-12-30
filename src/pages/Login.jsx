import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Call the new Django Login function
      await login(formData.username, formData.password);
      navigate("/dashboard"); // Redirect to dashboard on success
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Navbar />

      <section className="relative overflow-hidden flex-1 flex items-center pt-28 md:pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(16,185,129,0.1),transparent_55%),radial-gradient(circle_at_90%_10%,rgba(59,130,246,0.08),transparent_50%),radial-gradient(circle_at_50%_80%,rgba(34,197,94,0.12),transparent_55%)]"></div>

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold shadow-[0_15px_45px_rgba(16,185,129,0.15)]">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Secure workspace access
              </div>
              <div>
                <p className="text-sm tracking-[0.2em] uppercase text-emerald-600 font-semibold">
                  Welcome back
                </p>
                <h1 className="mt-3 text-4xl sm:text-5xl font-black leading-tight text-gray-900">
                  Dive into your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-lime-500">
                    FieldOps
                  </span>{" "}
                  dashboard
                </h1>
                <p className="mt-3 text-lg text-gray-700">
                  Pick up where you left off with saved projects, maps, and
                  real-time operations.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-[0_14px_38px_rgba(15,23,42,0.05)]">
                  <p className="text-sm font-semibold text-emerald-700">
                    Quick access
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Single login for all mission tools.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-[0_14px_38px_rgba(15,23,42,0.05)]">
                  <p className="text-sm font-semibold text-emerald-700">
                    Live insights
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    See updates the moment you sign in.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-200/30 blur-3xl"></div>
              <div className="relative rounded-3xl border border-emerald-50 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.12)] p-8">
                <div className="mb-6 text-center">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-600">
                    Sign in
                  </p>
                  <h2 className="text-2xl font-black text-gray-900 mt-2">
                    Access your mission
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Enter your credentials to continue.
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl text-center font-semibold">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl px-4 py-3 placeholder:text-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl px-4 py-3 placeholder:text-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(16,185,129,0.35)] hover:shadow-[0_22px_60px_rgba(16,185,129,0.45)] transition disabled:opacity-60"
                  >
                    {loading ? "Signing In..." : "Enter workspace"}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-emerald-600 font-semibold hover:text-emerald-700"
                  >
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
