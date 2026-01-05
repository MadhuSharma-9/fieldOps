import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Vision = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_60%_80%,rgba(34,197,94,0.08),transparent_32%)]"></div>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-2">
              Our Vision
            </p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              Seamless, trusted field operations for every research team.
            </h1>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl">
              We envision a world where field research operations are easy to coordinate, simple to follow,
              and transparent for everyone involved—from enumerators to principal investigators.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="space-y-6 text-base md:text-lg text-gray-700 leading-relaxed">
            <p>
              At Anweshan, we believe that field research should be accessible, transparent, and efficient.
              Our vision extends beyond just building software—we're creating a foundation for better
              research outcomes through improved coordination, accountability, and data quality.
            </p>
            <p>
              We envision a future where research teams can focus on what matters most: collecting high-quality
              data, making informed decisions, and delivering meaningful insights. FieldOps is designed to
              eliminate the friction that often comes with managing complex field operations, allowing teams
              to operate with confidence and clarity.
            </p>
            <p>
              Our commitment is to build tools that serve the entire research ecosystem—from field staff
              on the ground to project managers and principal investigators. By making field operations
              visible, manageable, and reliable, we're helping to advance research that can make a real
              difference in communities around the world.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Vision;

