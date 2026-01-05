import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import team member images
import manishGautamImg from '../assets/team/manish-gautam.jpg';
import dharmaGautamImg from '../assets/team/dharma-gautam.jpg';
import nirajPoudyalImg from '../assets/team/niraj-poudyal.jpg';
import binodKumarSahImg from '../assets/team/Binod Kumar Sah.jpg';
import bhogendraRajDotelImg from '../assets/team/Bhogendra Raj Dotel.jpg';
import kaushalJoshiImg from '../assets/team/Kaushal Joshi.jpg';
import sanjuMaharjanImg from '../assets/team/Sanju Maharjan.jpg';
import palisthaBajracharyaImg from '../assets/team/Palistha Bajracharya.jpg';
import shankerDevKattelImg from '../assets/team/Shanker Dev Kattel.jpg';
import surendraKoiralaImg from '../assets/team/Surendra Koirala.jpg';
import sabitraAcharyaImg from '../assets/team/Sabitra Acharya.jpg';
import manishaBudhathokiImg from '../assets/team/Manisha Budhathoki.jpg';
import suruchiShahiImg from '../assets/team/Suruchi Shahi.jpg';
import lunivaShakyaImg from '../assets/team/Luniva Shakya.jpg';
import shreyaShresthaImg from '../assets/team/Shreya Shrestha.jpg';

// Team Card Component
const TeamCard = ({ member }) => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white/80 shadow-[0_14px_38px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_22px_60px_rgba(15,23,42,0.12)] transition-all duration-300">
      <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 bg-gradient-to-b from-emerald-50/80 via-transparent to-transparent transition-opacity duration-300"></div>
      
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-emerald-50 to-sky-50">
        {member.image && !imageError ? (
          <img
            src={member.image}
            alt={`${member.name} - ${member.role}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-emerald-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="relative p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">
          {member.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {member.role}
        </p>
      </div>
    </div>
  );
};

const Team = () => {
  const teamMembers = [
    {
      name: "Manish Gautam",
      role: "Managing Director",
      image: manishGautamImg
    },
    {
      name: "Dharma Gautam",
      role: "Director",
      image: dharmaGautamImg
    },
    {
      name: "Dr. Niraj Poudyal",
      role: "Senior Research Advisor",
      image: nirajPoudyalImg
    },
    {
      name: "Dr. Binod Kumar Sah",
      role: "Senior Research Advisor",
      image: binodKumarSahImg
    },
    {
      name: "Bhogendra Raj Dotel",
      role: "Senior Health Systems Adviser",
      image: bhogendraRajDotelImg
    },
    {
      name: "Kaushal Joshi",
      role: "Lead Graphic Communications Advisor",
      image: kaushalJoshiImg
    },
    {
      name: "Sanju Maharjan",
      role: "Programme Manager",
      image: sanjuMaharjanImg
    },
    {
      name: "Palistha Bajracharya",
      role: "Operations Manager",
      image: palisthaBajracharyaImg
    },
    {
      name: "Shanker Dev Kattel",
      role: "Health and Wellness Research Specialist",
      image: shankerDevKattelImg
    },
    {
      name: "Surendra Koirala",
      role: "Business Development Officer",
      image: surendraKoiralaImg
    },
    {
      name: "Sabitra Acharya",
      role: "Finance Officer",
      image: sabitraAcharyaImg
    },
    {
      name: "Manisha Budhathoki",
      role: "Research Officer",
      image: manishaBudhathokiImg
    },
    {
      name: "Suruchi Shahi",
      role: "Team Member",
      image: suruchiShahiImg
    },
    {
      name: "Luniva Shakya",
      role: "Team Member",
      image: lunivaShakyaImg
    },
    {
      name: "Shreya Shrestha",
      role: "Team Member",
      image: shreyaShresthaImg
    },
    {
      name: "Krishna Khadka",
      role: "Team Member",
      image: null // Image not found in assets/team folder
    },
    {
      name: "Richa Acharya",
      role: "Team Member",
      image: null // Image not found in assets/team folder
    },
    {
      name: "Prakriti Maharjan",
      role: "Team Member",
      image: null // Image not found in assets/team folder
    },
    {
      name: "Anil Paudel",
      role: "Team Member",
      image: null // Image not found in assets/team folder
    },
    {
      name: "Ganesh Rana Magar",
      role: "Team Member",
      image: null // Image not found in assets/team folder
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_60%_80%,rgba(34,197,94,0.08),transparent_32%)]"></div>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-2">
              Our Team
            </p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              Built by researchers, for researchers.
            </h1>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl">
              FieldOps is developed by a team that combines experience in research, field operations,
              design, and engineering. We work closely with partners to ensure the product reflects real
              on-the-ground needs.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;

