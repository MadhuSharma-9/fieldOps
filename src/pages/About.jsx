import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const pillars = [
    {
      title: 'Clarity',
      body: 'Make field mobilisation plans, assignments, and progress easy to understand at a glance for research teams and supervisors..'
    },
    {
      title: 'Trust',
      body: 'Rely on clearly defined roles, time and location stamps, and consistent field records so decisions are based on verifiable information.'
    },
    {
      title: 'Momentum',
      body: 'Keep field teams aligned through real-time updates, timely alerts, and clear visibility of ongoing field activities.'
    }
  ];

  const stats = [
    { label: 'Municipal focus', value: 'All 7 provinces' },
    { label: 'Granularity', value: 'Ward-level' },
    { label: 'Live refresh', value: 'Minutes, not weeks' }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_60%_80%,rgba(34,197,94,0.08),transparent_32%)]"></div>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-3">
              About FieldOps by Anweshan
            </p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              ABOUT FIELDOPS BY ANWESHAN
              Building a clear, shared view of field research operations.
            </h1>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
              We bring together field mobilisation plans, assignments, and real-time activity data into a single, structured view. The goal is simple: research teams should clearly see who is deployed, where work is happening, and how field activities are progressing across study locations
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {stats.map(item => (
                <div key={item.label} className="rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-600 mb-1">{item.label}</p>
                  <p className="text-lg font-bold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-emerald-50 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6 shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-emerald-600 text-white font-black flex items-center justify-center shadow-[0_12px_30px_rgba(16,185,129,0.35)]">
                  PM
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">FieldOps by Anweshan team</p>
                  <p className="text-xs text-gray-500">Product, research, and field operations partners</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                We work closely with research organisations, implementing partners, and field teams to ensure field operations are well coordinated and easy to manage. Every release is shaped by practical field experience and continuous feedback from enumerators, supervisors, and research managers.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                <div className="rounded-xl border border-emerald-100 bg-white p-3">
                  <p className="font-semibold text-gray-900 mb-1">Design principles</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Field-first workflows</li>
                    <li>Simple, low-burden interfaces</li>
                    <li>Clear roles and permissions</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-sky-100 bg-white p-3">
                  <p className="font-semibold text-gray-900 mb-1">Delivery</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Real-time activity status</li>
                    <li>Report-ready data exports</li>
                    <li>Location-based tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 bg-slate-50/70">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-2">
              What guides us
            </p>
            <h2 className="text-3xl font-black text-gray-900">Three pillars of the experience.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map(pillar => (
              <div key={pillar.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.06)]">
                <p className="text-sm font-semibold text-emerald-700 mb-2">{pillar.title}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-sky-50 shadow-[0_20px_60px_rgba(15,23,42,0.07)]">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-2">
            Work with us
          </p>
          <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
            Want to strengthen how field research operations are managed?
          </h3>
          <p className="text-sm md:text-base text-gray-700 mb-6 max-w-2xl mx-auto">
            We work with research organisations and implementing partners to tailor FieldOps to their study needs, including project setup, field structures, and onboarding for field teams.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pb-8">
            <a
              href="mailto:contact@projectmap.com"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 text-white text-sm font-semibold shadow-[0_18px_45px_rgba(16,185,129,0.35)] hover:shadow-[0_22px_60px_rgba(16,185,129,0.45)] transition"
            >
              Email the team
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-emerald-100 bg-white/80 text-sm font-semibold text-emerald-800 hover:border-emerald-200 hover:bg-emerald-50 transition"
            >
              Explore the experience
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
