import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  // Smooth scroll to sections when navigating to /about#vision, /about#mission, /about#team
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const section = document.querySelector(hash);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

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
              Built for clear, coordinated field research operations.
            </h1>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
              FieldOps brings together field mobilisation plans, assignments, and real-time activity data
              into a single, structured view. Teams can clearly see who is deployed, where work is happening,
              and how field activities are progressing across locations.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="py-16 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-2">
              Our Vision
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Seamless, trusted field operations for every research team.
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl">
              We envision a world where field research operations are easy to coordinate, simple to follow,
              and transparent for everyone involved—from enumerators to principal investigators.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="py-16 bg-slate-50/70 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-2">
              Our Mission
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Make field operations visible, manageable, and reliable.
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mb-4">
              Our mission is to build field-first tools that reduce coordination friction, improve data
              quality, and give teams the confidence to run complex field work at scale.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-16 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-2">
              Our Team
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Built by researchers, for researchers.
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl">
              FieldOps is developed by a team that combines experience in research, field operations,
              design, and engineering. We work closely with partners to ensure the product reflects real
              on-the-ground needs.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;


