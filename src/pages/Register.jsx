import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(formData.username, formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.username?.[0] || "Failed to create account.";
      setError(msg);
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
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold shadow-[0_15px_45px_rgba(16,185,129,0.15)]">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Create your FieldOps ID
              </div>
              <div>
                <p className="text-sm tracking-[0.2em] uppercase text-emerald-600 font-semibold">
                  Get started
                </p>
                <h1 className="mt-3 text-4xl sm:text-5xl font-black leading-tight text-gray-900">
                  Build, deploy, and coordinate in one place
                </h1>
                <p className="mt-3 text-lg text-gray-700">
                  Your account unlocks shared maps, live telemetry, and
                  mission-ready workflows. Sign up in seconds.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-[0_14px_38px_rgba(15,23,42,0.05)]">
                  <p className="text-sm font-semibold text-emerald-700">
                    Team spaces
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Collaborate with roles & permissions.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-[0_14px_38px_rgba(15,23,42,0.05)]">
                  <p className="text-sm font-semibold text-emerald-700">
                    Real-time view
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Live situational updates on every map.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-[0_14px_38px_rgba(15,23,42,0.05)]">
                  <p className="text-sm font-semibold text-emerald-700">
                    Secure by default
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Encrypted API access and safe storage.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-200/30 blur-3xl"></div>
              <div className="relative bg-white/90 border border-emerald-50 rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl p-8">
                <div className="mb-6 text-center">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-600">
                    Create account
                  </p>
                  <h2 className="text-2xl font-black text-gray-900 mt-2">
                    Join FieldOps
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Takes less than a minute.
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-xl border border-red-100 bg-red-50 text-red-700 text-sm font-semibold text-center">
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
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                      placeholder="Pick a username"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
                      Work email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                      placeholder="you@example.org"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
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
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                      placeholder="Create a password"
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
                    {loading ? "Creating account…" : "Create account"}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Log in
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

export default Register;
