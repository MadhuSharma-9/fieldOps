import React from 'react';
import { Link } from 'react-router-dom';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/#features' }, // Using hash for same-page anchor
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/#contact' }
  ];

  const socialLinks = [
    { 
      icon: FaFacebook, 
      url: 'https://facebook.com', 
      label: 'Facebook',
      color: 'hover:text-blue-600' // Facebook blue on hover
    },
    { 
      icon: FaTwitter, 
      url: 'https://twitter.com', 
      label: 'Twitter',
      color: 'hover:text-blue-400' // Twitter blue on hover
    },
    { 
      icon: FaLinkedin, 
      url: 'https://linkedin.com', 
      label: 'LinkedIn',
      color: 'hover:text-blue-700' // LinkedIn blue on hover
    },
    { 
      icon: FaInstagram, 
      url: 'https://instagram.com', 
      label: 'Instagram',
      color: 'hover:text-pink-600' // Instagram pink on hover
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-200 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        
        {/* Main Footer Content - Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Column 1: Company Logo & About Us */}
          <div className="space-y-4">
            {/* Company Logo Placeholder */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-lime-500 rounded-lg flex items-center justify-center shadow-[0_10px_30px_rgba(16,185,129,0.25)]">
                <span className="text-white font-black text-xl">PM</span>
              </div>
              <span className="text-2xl font-black tracking-tighter">
                Project <span className="text-emerald-700">Map</span>
              </span>
            </div>
            
            {/* About Us Blurb */}
            <p className="text-gray-700 text-sm leading-relaxed max-w-xs">
              A next-generation platform bridging the gap between municipal data and public transparency. 
              Explore projects, ward by ward, with real-time infrastructure insights.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-600 hover:text-emerald-700 transition-colors text-sm block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social Media Icons */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg tracking-wide uppercase">
              Follow Us
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                // Extract the icon component from the social object
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`text-gray-600 ${social.color} transition-colors text-2xl`}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
            
            {/* Contact Information */}
            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <HiMail className="text-emerald-600" />
                <span>contact@projectmap.com</span>
              </div>
              <div className="flex items-center gap-2">
                <HiPhone className="text-emerald-600" />
                <span>+977 1-234-5678</span>
              </div>
              <div className="flex items-center gap-2">
                <HiLocationMarker className="text-emerald-600" />
                <span>Kathmandu, Nepal</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>
              © {currentYear} Project Map. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-emerald-700 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-emerald-700 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

