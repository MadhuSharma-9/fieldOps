import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Mission = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-32 bg-slate-50/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_60%_80%,rgba(34,197,94,0.08),transparent_32%)]"></div>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-2">
              Our Mission
            </p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              Make field operations visible, manageable, and reliable.
            </h1>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mb-4">
              Our mission is to build field-first tools that reduce coordination friction, improve data
              quality, and give teams the confidence to run complex field work at scale.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="space-y-6 text-base md:text-lg text-gray-700 leading-relaxed">
            <p>
              FieldOps by Anweshan is built with a clear mission: to transform how research teams manage
              field operations. We understand the challenges that come with coordinating fieldwork—from
              tracking enumerator assignments to monitoring coverage and ensuring data quality.
            </p>
            <p>
              Our mission centers on three core principles:
            </p>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <strong className="text-gray-900">Visibility:</strong> Provide real-time insights into
                field activities, deployment status, and progress across all study locations.
              </li>
              <li>
                <strong className="text-gray-900">Manageability:</strong> Simplify complex field operations
                through structured workflows, clear assignments, and intuitive interfaces that reduce
                administrative burden.
              </li>
              <li>
                <strong className="text-gray-900">Reliability:</strong> Ensure data quality and accountability
                through transparent tracking, verification mechanisms, and comprehensive reporting.
              </li>
            </ul>
            <p>
              By focusing on these principles, we're helping research organizations deliver better outcomes
              while reducing the operational complexity that often accompanies large-scale field studies.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Mission;

