import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { HiPlus, HiFolder, HiClock, HiArrowRight, HiX } from 'react-icons/hi';

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '' });

  // 1. Fetch Projects on Load
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('access_token');
      // If no token, kick them out
      if (!token) { navigate('/login'); return; }

      const res = await axios.get('https://fieldopsbackend.onrender.com/api/projects/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
      // Optional: if token invalid, logout
    } finally {
      setLoading(false);
    }
  };

  // 2. Create New Project
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://127.0.0.1:8000/api/projects/', {
        title: newProject.title,
        description: newProject.description
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setIsModalOpen(false);
      setNewProject({ title: '', description: '' });
      fetchProjects(); // Refresh list
    } catch (err) {
      alert("Error creating project");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-10">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Projects</h1>
            <p className="text-gray-500 mt-2">Manage your datasets and visualizations.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 transition transform hover:-translate-y-1"
          >
            <HiPlus className="text-xl" /> Create New
          </button>
        </div>

        {/* Project Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading your workspace...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create Card (Alternative) */}
            <div 
              onClick={() => setIsModalOpen(true)}
              className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition group min-h-[200px]"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-emerald-600 group-hover:text-white transition mb-3">
                <HiPlus className="text-2xl" />
              </div>
              <h3 className="font-bold text-gray-500 group-hover:text-emerald-600">Create New Project</h3>
            </div>

            {/* Existing Projects */}
            {projects.map((proj) => (
              <div key={proj.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition group flex flex-col justify-between min-h-[200px]">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                      <HiFolder className="text-2xl" />
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                      {proj.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition">{proj.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{proj.description}</p>
                </div>
                
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl flex justify-between items-center">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <HiClock /> Updated recently
                  </span>
                  <button 
                    onClick={() => navigate(`/project/${proj.id}`)}
                    className="text-sm font-bold text-gray-900 flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Open Map <HiArrowRight className="text-emerald-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-8 relative animate-fade-in-up">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><HiX size={24} /></button>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Start New Project</h2>
            <form onSubmit={handleCreate} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Project Name</label>
                <input autoFocus className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none" placeholder="e.g. Saptari Health Audit 2025" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                <textarea className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none" rows="3" placeholder="What is this dataset about?" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 transition mt-2">Create Project</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;