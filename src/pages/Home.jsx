import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { 
  HiArrowRight, 
  HiMap, 
  HiChartBar, 
  HiDocumentReport, 
  HiGlobeAlt,
  HiUserGroup,
  HiCursorClick,
  HiSparkles
} from 'react-icons/hi';
import bgImage from '../assets/bg.jpg';

const Home = () => {
  const { user } = useAuth();
  const [activeAudience, setActiveAudience] = useState('citizens');

  const features = [
    {
      icon: HiMap,
      title: 'Interactive Ward Maps',
      description: 'Pan, zoom, and explore granular infrastructure data for every ward in Nepal with a map-first experience.'
    },
    {
      icon: HiChartBar,
      title: 'Live Project Insights',
      description: 'Track budgets, timelines, and completion rates with visual dashboards that update as data changes.'
    },
    {
      icon: HiDocumentReport,
      title: 'Smart Reporting',
      description: 'Generate rich municipal summaries and export-ready reports in a few clicks for meetings and audits.'
    },
    {
      icon: HiGlobeAlt,
      title: 'Transparency for Everyone',
      description: 'Give citizens and decision-makers a shared, trusted view of how infrastructure is evolving across regions.'
    }
  ];

  const audienceConfigs = {
    citizens: {
      label: 'Clients',
      color: 'from-emerald-600 to-lime-500',
      description:
        'See what is being built in your ward, how far along projects are, and where investments are going.',
      bullets: [
        'Search by ward, municipality, or project type',
        'Understand timelines and current status at a glance',
        'Share public project views with your community'
      ]
    },
    officials: {
      label: 'Municipal Officials',
      color: 'from-sky-600 to-emerald-500',
      description:
        'Coordinate projects, defend budgets, and communicate progress with a single, visual source of truth.',
      bullets: [
        'Monitor project pipelines across all wards',
        'Export reports for council or ministry reviews',
        'Identify stalled or at-risk projects early'
      ]
    },
    planners: {
      label: 'Planners & NGOs',
      color: 'from-indigo-600 to-sky-500',
      description:
        'Overlay infrastructure data with impact and risk to plan smarter interventions that matter.',
      bullets: [
        'Layer multiple datasets for deeper insights',
        'Spot underserved regions in seconds',
        'Collaborate across institutions with shared views'
      ]
    }
  };

  const activeConfig = audienceConfigs[activeAudience];

  return (
    <div className="min-h-screen font-sans text-gray-900 bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-28 md:pt-32 lg:pt-36 pb-20">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
        <div className="absolute inset-0 bg-white/92"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(16,185,129,0.1),transparent_55%),radial-gradient(circle_at_90%_10%,rgba(59,130,246,0.08),transparent_50%),radial-gradient(circle_at_50%_80%,rgba(34,197,94,0.12),transparent_55%)]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy + CTAs */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 mb-5 leading-tight">
                Make Nepal&apos;s Projects
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-lime-400 to-sky-500">
                  visible, searchable, and alive.
                </span>
              </h1>

              <p className="text-base md:text-lg text-gray-700 mb-8 max-w-xl leading-relaxed">
                Project Map turns complex municipal datasets into an intuitive, map-first experience. 
                See every project, track progress in real-time, and communicate impact with confidence.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 text-white text-sm font-semibold shadow-[0_18px_45px_rgba(16,185,129,0.35)] hover:shadow-[0_22px_55px_rgba(16,185,129,0.45)] transition-all"
                  >
                    Open Your Dashboard
                    <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/map"
                      className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 text-white text-sm font-semibold shadow-[0_18px_45px_rgba(16,185,129,0.35)] hover:shadow-[0_22px_55px_rgba(16,185,129,0.45)] transition-all"
                    >
                      Explore Live Map
                      <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/register"
                      className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-emerald-100 bg-white/70 text-sm font-semibold text-emerald-800 hover:border-emerald-200 hover:bg-emerald-50 transition-all"
                    >
                      Create Free Account
                    </Link>
                  </>
                )}
              </div>

              <div className="h-3" />
            </div>

            {/* Right: Interactive map preview card */}
            <div className="relative">
              <div className="absolute -top-10 -right-6 w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400/20 to-sky-400/10 blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-tr from-emerald-300/30 to-lime-400/10 blur-3xl"></div>

              <div className="relative group">
                <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-r from-emerald-500/20 via-lime-400/10 to-sky-400/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>

                <div className="relative overflow-hidden rounded-3xl bg-white/90 border border-emerald-50 shadow-[0_24px_70px_rgba(15,23,42,0.15)] backdrop-blur-xl p-5 md:p-6 lg:p-8 space-y-5 transform group-hover:-translate-y-1 group-hover:shadow-[0_32px_90px_rgba(15,23,42,0.2)] transition-all duration-500">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600">
                        Real-time view
                      </p>
                      <p className="text-xs text-gray-500">Tap a ward to inspect active projects.</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                      <HiMap className="text-emerald-500" />
                      Map Preview
                    </span>
                  </div>

                  {/* Faux map layout with Nepal silhouette and soft pulses */}
                  <div className="relative h-60 md:h-64 rounded-2xl bg-slate-950 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_0_0,#22c55e,transparent_45%),radial-gradient(circle_at_100%_0,#0ea5e9,transparent_45%),radial-gradient(circle_at_0_100%,#a3e635,transparent_45%)] opacity-60"></div>
                    <div className="absolute inset-0 mix-blend-screen opacity-70">
                      <div className="absolute inset-[14%] border border-white/10 rounded-2xl"></div>
                      <div className="absolute inset-[24%] border border-white/10 rounded-2xl"></div>
                      <div className="absolute inset-[34%] border border-white/10 rounded-2xl"></div>
                      <div className="absolute inset-[44%] border border-white/10 rounded-2xl"></div>
                    </div>

                    {/* Stylized Nepal outline */}
                    <svg
                      viewBox="0 0 500 200"
                      className="absolute inset-0 scale-[1.05] translate-y-1 opacity-75"
                      style={{ filter: 'drop-shadow(0 12px 30px rgba(34,197,94,0.22))' }}
                    >
                      <defs>
                        <linearGradient id="nepalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#34d399" stopOpacity="0.85" />
                          <stop offset="60%" stopColor="#22c55e" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M30 118 L94 108 L152 126 L210 104 L264 112 L310 96 L360 110 L418 100 L470 120 L482 136 L426 150 L362 144 L306 156 L252 140 L198 152 L144 134 L90 146 L36 134 Z"
                        fill="url(#nepalGradient)"
                        stroke="rgba(255,255,255,0.35)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    {/* Interactive-looking pins */}
                    <div className="absolute inset-0">
                      <div className="absolute left-[18%] top-[30%]">
                        <div className="absolute -inset-5 rounded-full bg-emerald-400/14 animate-pulse"></div>
                        <div className="animate-ping rounded-full h-8 w-8 bg-emerald-400/40"></div>
                        <div className="absolute inset-1 rounded-full bg-emerald-400 flex items-center justify-center text-[10px] font-bold text-white">
                          Ward 12
                        </div>
                      </div>
                      <div className="absolute right-[18%] top-[50%]">
                        <div className="absolute -inset-5 rounded-full bg-sky-400/14 animate-pulse"></div>
                        <div className="animate-ping rounded-full h-8 w-8 bg-sky-400/40"></div>
                        <div className="absolute inset-1 rounded-full bg-sky-500 flex items-center justify-center text-[10px] font-bold text-white">
                          Ward 4
                        </div>
                      </div>
                      <div className="absolute left-[35%] bottom-[16%]">
                        <div className="absolute -inset-5 rounded-full bg-lime-400/14 animate-pulse"></div>
                        <div className="animate-ping rounded-full h-7 w-7 bg-lime-400/40"></div>
                        <div className="absolute inset-1 rounded-full bg-lime-500 flex items-center justify-center text-[9px] font-bold text-white">
                          Ward 8
                        </div>
                      </div>

                      {/* Gentle outer rings for a cleaner pulse */}
                      <div className="absolute right-[34%] top-[32%] h-20 w-20 rounded-full bg-emerald-400/10 border border-emerald-200/30 animate-ping"></div>
                      <div className="absolute left-[50%] bottom-[20%] h-14 w-14 rounded-full bg-sky-400/10 border border-sky-200/30 animate-ping"></div>
                    </div>

                    {/* Stats overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-3">
                      <div className="flex-1 min-w-[120px] rounded-xl bg-slate-900/80 border border-white/10 px-3 py-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-300 mb-1">
                          Nepal Health Post and centers
                        </p>
                        <p className="text-xs text-slate-100 font-semibold mb-1">
                          132 active projects
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>72% on track</span>
                          <span className="text-emerald-300">Updated 3 min ago</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 w-32">
                        <div className="rounded-lg bg-emerald-500/90 text-[10px] text-white px-2 py-1.5">
                          <p className="font-semibold">Immunization</p>
                          <p>Ward 4 • 84% complete</p>
                        </div>
                        <div className="rounded-lg bg-sky-500/90 text-[10px] text-white px-2 py-1.5">
                          <p className="font-semibold">Health facilities</p>
                          <p>Ward 12 • 43% complete</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom meta */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-gray-500">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Live sync with municipal datasets
                    </div>
                    <div className="flex items-center gap-2">
                      <HiCursorClick className="text-emerald-500" />
                      Hover & click interactions inside the full app
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-2">
                Core capabilities
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                Everything you need to see the full picture.
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-600 max-w-xl">
              From high-level overviews to ward-level deep dives, Project Map combines map interactions, 
              metrics, and reports into a simple, elegant experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white/80 px-5 py-6 shadow-[0_14px_38px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_22px_60px_rgba(15,23,42,0.12)] transition-all"
                >
                  <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 bg-gradient-to-b from-emerald-50/80 via-transparent to-transparent transition-opacity"></div>
                  <div className="relative">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-lime-500 text-white shadow-[0_12px_30px_rgba(16,185,129,0.45)]">
                      <IconComponent className="text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <button className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                      Learn more
                      <HiArrowRight className="text-[11px] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTERACTIVE AUDIENCE SWITCHER */}
      <section className="py-20 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-2">
                Built for everyone
              </p>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
                One platform, different experiences.
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-xl">
                Switch between audiences to see how Project Map adapts to different needs, 
                from everyday citizens to municipal planners.
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="inline-flex rounded-full bg-white border border-gray-200 p-1 mb-8 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            {['citizens', 'officials', 'planners'].map(key => {
              const config = audienceConfigs[key];
              const isActive = activeAudience === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveAudience(key)}
                  className={`relative px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundImage: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`
                        }
                      : undefined
                  }
                >
                  {isActive && (
                    <span
                      className={`absolute inset-0 -z-10 rounded-full bg-gradient-to-r ${config.color}`}
                    ></span>
                  )}
                  <span className="relative flex items-center gap-2">
                    {key === 'citizens' && <HiUserGroup className="hidden md:block" />}
                    {key === 'officials' && <HiChartBar className="hidden md:block" />}
                    {key === 'planners' && <HiGlobeAlt className="hidden md:block" />}
                    {config.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            <div className="lg:col-span-2 rounded-3xl border border-gray-200 bg-white/90 shadow-[0_18px_60px_rgba(15,23,42,0.08)] p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {activeConfig.label} view
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-5 max-w-xl">
                  {activeConfig.description}
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {activeConfig.bullets.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-[11px] text-gray-500">
                <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 font-semibold">
                  <HiCursorClick className="text-emerald-600" />
                  Try switching audiences above
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
                  No data entry needed to explore the demo
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5 md:p-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-2">
                  Live snapshot
                </p>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Sample activity today
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Projects with recent updates</p>
                    <p className="text-2xl font-black text-emerald-700">247</p>
                    <p className="text-[11px] text-emerald-700">+32 vs. last week</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div className="rounded-xl bg-white/80 border border-emerald-100 p-3">
                      <p className="font-semibold text-gray-900 mb-1">On-track</p>
                      <p className="text-xl font-black text-emerald-600">71%</p>
                      <p className="text-[10px] text-gray-500 mt-1">Roads • Schools • Health</p>
                    </div>
                    <div className="rounded-xl bg-white/80 border border-sky-100 p-3">
                      <p className="font-semibold text-gray-900 mb-1">At risk</p>
                      <p className="text-xl font-black text-sky-600">14%</p>
                      <p className="text-[10px] text-gray-500 mt-1">Delays & funding gaps</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[11px] text-gray-500">
                This is a sample view. In your workspace, these numbers are driven by live municipal datasets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-2">
              Simple, opinionated flow
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-3">
              From raw data to clear decisions.
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              We take care of the complexity: you see clean maps, clear trends, and transparent progress
              that anyone can understand.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                step: '01',
                title: 'Connect municipal sources',
                body: 'We ingest infrastructure records from municipalities and standardized templates, cleaning and normalizing them automatically.'
              },
              {
                step: '02',
                title: 'Map and enrich projects',
                body: 'Each project is geocoded, attached to a ward, and enriched with metadata like type, budget, and progress.'
              },
              {
                step: '03',
                title: 'Share live, visual stories',
                body: 'Stakeholders explore data on the map, generate reports, and track how projects change over time.'
              }
            ].map((item, idx) => (
              <div
                key={item.step}
                className="relative overflow-hidden rounded-2xl border border-gray-100 bg-slate-50/60 px-6 py-7 shadow-[0_14px_38px_rgba(15,23,42,0.04)]"
              >
                <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-200/70 to-lime-200/60 opacity-60"></div>
                <div className="relative">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 border border-emerald-100 text-[11px] font-semibold text-emerald-700">
                    <span className="text-[10px] tracking-[0.25em] uppercase">
                      Step {idx + 1}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-gray-400 mb-2">{item.step}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-slate-50/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-2">
              Why we built this
            </p>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-4">
              Projects data should feel be easily accessible.
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              Municipal data is often trapped in PDFs, spreadsheets, or internal systems. 
              We designed Project Map to make that information understandable at a glance, 
              whether you&apos;re a citizen, a journalist, or a decision-maker.
            </p>
            <p className="text-sm md:text-base text-gray-600">
              The experience is inspired by the best consumer apps: fluid interactions, 
              a clean visual language, and thoughtful defaults that keep you in flow as you explore.
            </p>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
              <p className="text-xs font-semibold text-emerald-700 mb-1">Design principles</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Map-first navigation for spatial understanding.</li>
                <li>• Gentle animation and gradients to guide focus.</li>
                <li>• Clean typography and whitespace for legibility.</li>
                <li>• Clear, opinionated flows for non-technical users.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 p-5 text-slate-100">
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-400 mb-2">
                Experience snapshot
              </p>
              <p className="text-sm mb-3">
                Hover, click, and zoom through projects without ever feeling lost. 
                Each interaction is designed to feel smooth and intentional.
              </p>
              <p className="text-xs text-slate-400">
                The live app layers real datasets on top of this UI, letting you explore Nepal&apos;s infrastructure story in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-2">
              Talk to us
            </p>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-4">
              Ready to design your own view of Nepal?
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-5">
              Whether you&apos;re a municipality, an NGO, or a civic tech team, 
              we can help you craft a tailor-made experience on top of Project Map.
            </p>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Guided demos and design workshops for your team.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-500"></span>
                <span>Custom layers, datasets, and integrations.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-lime-500"></span>
                <span>Dedicated onboarding for municipal staff.</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6 md:p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2.5 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Municipality / NGO / Team"
                    className="w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2.5 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Work email
                </label>
                <input
                  type="email"
                  placeholder="you@example.org"
                  className="w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2.5 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  What would you like to explore?
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us a bit about your use case or the experience you want to design…"
                  className="w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2.5 text-sm resize-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(16,185,129,0.45)] hover:shadow-[0_22px_70px_rgba(16,185,129,0.55)] transition-all"
              >
                Send message (UI only)
              </button>

              <p className="text-[11px] text-gray-500">
                This is a demo form for the landing page experience. In a production setup, 
                submissions are securely routed to your preferred channels.
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
