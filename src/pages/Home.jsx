import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import {
  HiArrowRight,
  HiMap,
  HiChartBar,
  HiDocumentReport,
  HiGlobeAlt,
  HiUserGroup,
  HiCursorClick,
  HiSparkles,
} from "react-icons/hi";
import bgImage from "../assets/bg.jpg";

const Home = () => {
  const { user } = useAuth();
  const [activeAudience, setActiveAudience] = useState("citizens");
  const [sliderStyle, setSliderStyle] = useState({});
  const tabRefs = useRef({});
  const containerRef = useRef(null);

  const features = [
    {
      icon: HiMap,
      title: "Study / Project Configuration",
      description:
        "Defines research objectives, study areas, target populations, and implementation parameters.",
    },
    {
      icon: HiChartBar,
      title: "Real-time Field Activity Tracking",
      description:
        "Logs and monitors field mobilisation activities in real time, including time and location, to support accurate reporting and accountability.",
    },
    {
      icon: HiDocumentReport,
      title: "Location-based Mapping and Coverage Monitoring",
      description:
        "Visualises field coverage through map-based views and tracks progress across study locations.",
    },
    {
      icon: HiGlobeAlt,
      title: "Field Researcher Assignment Tracking",
      description:
        "Manages mobilisation plans, including enumerator deployment, supervisor assignments, study areas, and allocated time.",
    },
  ];

  const audienceConfigs = {
    citizens: {
      label: "Enumerator view",
      color: "from-emerald-600 to-lime-500",
      description:
        "See your assigned field activities, where data collection is scheduled, and what progress is expected from you.",
      bullets: [
        "View assigned study areas, households, or clusters",
        "Understand daily targets, timelines, and task status at a glance",
        "Record field activity with time and location stamps",
      ],
    },
    officials: {
      label: "Field Supervisor view",
      color: "from-sky-600 to-emerald-500",
      description:
        "Monitor field team deployment, coverage, and progress across assigned study areas.",
      bullets: [
        "Track enumerator activity by location and time",
        "Review progress against plans and timelines",
        "Support verification and supervision in real time",
      ],
    },
    planners: {
      label: "Core Research Team view",
      color: "from-indigo-600 to-sky-500",
      description:
        "Oversee field mobilisation, coverage, and progress across all study locations.",
      bullets: [
        "Monitor field activity and deployment status",
        "Review coverage, timelines, and operational gaps",
        "Access structured, report-ready field summaries",
      ],
    },
  };

  const activeConfig = audienceConfigs[activeAudience];

  // Update slider position when active tab changes or window resizes
  const updateSliderPosition = useCallback(() => {
    const activeTab = tabRefs.current[activeAudience];
    const container = containerRef.current;

    if (activeTab && container) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();

      setSliderStyle({
        left: `${tabRect.left - containerRect.left}px`,
        width: `${tabRect.width}px`,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      });
    }
  }, [activeAudience]);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(updateSliderPosition, 0);

    // Recalculate on window resize
    window.addEventListener("resize", updateSliderPosition);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateSliderPosition);
    };
  }, [updateSliderPosition]);

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
                Bringing structure, transparency
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-lime-400 to-sky-500">
                  and control to field research
                </span>
              </h1>

              <p className="text-base md:text-lg text-gray-700 mb-8 max-w-xl leading-relaxed">
                FieldOps by Anweshan delivers end-to-end visibility and control
                over field mobilisation, ensuring data quality, accountability,
                and timely execution of research operations.
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
                      <p className="text-xs text-gray-500">
                        Tap a ward to inspect active projects.
                      </p>
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
                      style={{
                        filter: "drop-shadow(0 12px 30px rgba(34,197,94,0.22))",
                      }}
                    >
                      <defs>
                        <linearGradient
                          id="nepalGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#34d399"
                            stopOpacity="0.85"
                          />
                          <stop
                            offset="60%"
                            stopColor="#22c55e"
                            stopOpacity="0.8"
                          />
                          <stop
                            offset="100%"
                            stopColor="#0ea5e9"
                            stopOpacity="0.8"
                          />
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
                          <span className="text-emerald-300">
                            Updated 3 min ago
                          </span>
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
              From high-level overviews to ward-level deep dives, FieldOps
              combines map interactions, metrics, and reports into a simple,
              elegant experience.
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
                One platform, different roles.
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-xl">
                Switch between roles to see how FieldOps supports everyone
                involved in fieldwork, from enumerators and field supervisors on
                the ground to the core research team overseeing planning,
                quality, and analysis.
              </p>
            </div>
          </div>

          {/* Tabs with smooth sliding indicator */}
          <div
            ref={containerRef}
            className="relative inline-flex rounded-full bg-white border border-gray-200 p-1 mb-8 shadow-[0_10px_30px_rgba(15,23,42,0.06)] overflow-hidden"
          >
            {/* Sliding background indicator */}
            <div
              className={`absolute top-1 bottom-1 rounded-full bg-gradient-to-r ${activeConfig.color} shadow-[0_4px_12px_rgba(16,185,129,0.3)] z-0`}
              style={sliderStyle}
            />

            {["citizens", "officials", "planners"].map((key) => {
              const config = audienceConfigs[key];
              const isActive = activeAudience === key;
              return (
                <button
                  key={key}
                  ref={(el) => (tabRefs.current[key] = el)}
                  onClick={() => setActiveAudience(key)}
                  className={`relative z-10 px-4 md:px-6 py-1.5 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-white scale-105"
                      : "text-gray-600 hover:text-gray-900 hover:scale-105"
                  }`}
                >
                  <span className="relative flex items-center gap-2 whitespace-nowrap">
                    {key === "citizens" && (
                      <HiUserGroup
                        className={`hidden md:block transition-transform duration-300 ${
                          isActive ? "scale-110" : ""
                        }`}
                      />
                    )}
                    {key === "officials" && (
                      <HiChartBar
                        className={`hidden md:block transition-transform duration-300 ${
                          isActive ? "scale-110" : ""
                        }`}
                      />
                    )}
                    {key === "planners" && (
                      <HiGlobeAlt
                        className={`hidden md:block transition-transform duration-300 ${
                          isActive ? "scale-110" : ""
                        }`}
                      />
                    )}
                    {config.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Content with smooth transitions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            <div
              key={activeAudience}
              className="lg:col-span-2 rounded-3xl border border-gray-200 bg-white/90 shadow-[0_18px_60px_rgba(15,23,42,0.08)] p-6 md:p-8 flex flex-col justify-between transition-all duration-500 ease-out"
              style={{
                animation: "fadeInSlide 0.5s ease-out",
              }}
            >
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 transition-colors duration-300">
                  {activeConfig.label} view
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-5 max-w-xl transition-opacity duration-300">
                  {activeConfig.description}
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {activeConfig.bullets.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 transition-all duration-300"
                      style={{
                        animation: `fadeInLeft 0.4s ease-out ${
                          idx * 0.1
                        }s both`,
                      }}
                    >
                      <span
                        className={`mt-1 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                          activeAudience === "citizens"
                            ? "bg-emerald-500"
                            : activeAudience === "officials"
                            ? "bg-sky-500"
                            : "bg-indigo-500"
                        }`}
                      ></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-[11px] text-gray-500">
                <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 font-semibold transition-all duration-300 hover:bg-emerald-100">
                  <HiCursorClick className="text-emerald-600" />
                  Try switching audiences above
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 transition-all duration-300 hover:bg-slate-200">
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
                  Field activity today
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Field activities with recent updates
                    </p>
                    <p className="text-2xl font-black text-emerald-700">247</p>
                    <p className="text-[11px] text-emerald-700">
                      +32 vs. last week
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div className="rounded-xl bg-white/80 border border-emerald-100 p-3">
                      <p className="font-semibold text-gray-900 mb-1">
                        On-track
                      </p>
                      <p className="text-xl font-black text-emerald-600">71%</p>
                      <p className="text-[10px] text-gray-500 mt-1">
                        Households • Clusters • Study sites
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/80 border border-sky-100 p-3">
                      <p className="font-semibold text-gray-900 mb-1">
                        Needs attntion
                      </p>
                      <p className="text-xl font-black text-sky-600">14%</p>
                      <p className="text-[10px] text-gray-500 mt-1">
                        Delays, access issues, or staffing gaps
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[11px] text-gray-500">
                This is a sample view. In active studies, these figures reflect
                live field activity reported by enumerators and supervisors{" "}
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
              From field activity to informed decisions.{" "}
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              We handle the operational complexity so teams see clear
              assignments, live progress, and reliable field insights that
              support timely decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                step: "01",
                title: "Set up field operations",
                body: "Define studies, locations, field teams, roles, and timelines in a structured workspace designed for research mobilisation.",
              },
              {
                step: "02",
                title: "Deploy and track fieldwork",
                body: "Field activities are logged in real time, linked to locations and assignments, and enriched with time, progress, and supervision details.",
              },
              {
                step: "03",
                title: "Monitor, review, and act",
                body: "Supervisors and research teams monitor coverage, identify gaps, generate reports, and respond quickly as field conditions change.",
              },
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
                  <p className="text-xs font-mono text-gray-400 mb-2">
                    {item.step}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.body}
                  </p>
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
              Field operations data should be clear, shared, and trustworthy.
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              In many research projects, critical field information sits across
              emails, spreadsheets, PDFs, and disconnected tools. This creates
              gaps between clients, research teams, and field staff, making it
              difficult to track progress, verify activities, and ensure
              quality.
            </p>
            <p className="text-sm md:text-base text-gray-600">
              FieldOps was built to close that gap. It creates a shared,
              real-time view of field mobilisation, allowing clients and
              research agencies to see the same information, ask better
              questions, and stay aligned on progress, timelines, and
              responsibilities.
            </p>
            <p className="text-sm md:text-base text-gray-600">
              The experience is designed to support accountability and quality
              at every stage, with clear records, structured workflows, and
              transparent field activity that teams can rely on with confidence.
            </p>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
              <p className="text-xs font-semibold text-emerald-700 mb-1">
                Design principles
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • Field-first design focused on real field workflows and
                  constraints
                </li>
                <li>
                  • Simple, low-burden interfaces that reduce reporting fatigue.
                </li>
                <li>
                  • Clear layouts and readable typography for quick
                  understanding.
                </li>
                <li>
                  • Structured, guided flows that support consistent and
                  accurate field reporting.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 p-5 text-slate-100">
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-400 mb-2">
                Experience snapshot
              </p>
              <p className="text-sm mb-3">
                Navigate field activities, assignments, and coverage without
                friction. Every interaction is designed to be purposeful,
                helping users focus on what matters in the field rather than on
                the tool itself.
              </p>
              <p className="text-xs text-slate-400">
                Live field activity data is layered into the interface in real
                time, allowing teams to monitor progress, verify work, and
                respond quickly as conditions change.
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
              Ready to strengthen how your field operations are managed?{" "}
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-5">
              Whether you are a research organisation, implementing partner, or
              donor-supported programme, we can help you configure FieldOps to
              match your study design, field structure, and operational needs.
            </p>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>
                  Guided demos and hands-on walkthroughs for your teams
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-500"></span>
                <span>
                  Custom project setup, workflows, and reporting views
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-lime-500"></span>
                <span>
                  Structured onboarding for field staff, supervisors, and core
                  research teams
                </span>
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
                This is a demo form for the landing page experience. In a
                production setup, submissions are securely routed to your
                preferred channels.
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
