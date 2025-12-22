import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { HiArrowLeft, HiUpload, HiOutlineMenuAlt2, HiSearch, HiDatabase, HiExclamation, HiCheckCircle, HiBan } from 'react-icons/hi';
import Navbar from '../components/Navbar';

// --- HELPERS ---

const getCentroid = (coords) => {
    if (!coords || coords.length === 0) return [26.55, 86.75]; 
    
    let pts = coords[0];
    if (coords.length === 1 && coords[0].length > 1 && Array.isArray(coords[0][0][0])) {
        pts = coords[0][0];
    }
    
    let x = 0, y = 0, n = pts.length;
    pts.forEach(pt => { y += pt[0]; x += pt[1]; });
    return [x / n, y / n];
};

// Aggressive Normalizer
const normalize = (str) => {
    if (!str) return '';
    return str.toLowerCase()
        .replace(/district/g, '')
        .replace(/rural/g, '')
        .replace(/municipality/g, '')
        .replace(/mun/g, '')
        .replace(/rm/g, '')
        .replace(/gaunpalika/g, '')
        .replace(/nagarpalika/g, '')
        .replace(/[^a-z0-9]/g, ''); 
};

const FlyToLocation = ({ coords }) => {
  const map = useMap();
  useEffect(() => { 
      if (coords && Array.isArray(coords) && coords.length === 2 && 
          typeof coords[0] === 'number' && typeof coords[1] === 'number') {
          map.flyTo(coords, 10, { duration: 1.5 });
      }
  }, [coords, map]);
  return null;
};

const MapView = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [project, setProject] = useState(null);
  const [mapData, setMapData] = useState([]); 
  const [selectedSheet, setSelectedSheet] = useState('All'); 
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedLocation, setFocusedLocation] = useState(null);

  const [wardGeoJson, setWardGeoJson] = useState(null);

  // --- 1. LOAD DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) { navigate('/login'); return; }
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const projectRes = await axios.get(`https://fieldopsbackend.onrender.com/api/projects/${projectId}/`, config);
        setProject(projectRes.data);
        fetchFacilities();
      } catch (err) { navigate('/dashboard'); }
    };
    fetchData();

    // Load Local Map File
    fetch('/wardlevel.json')
      .then(res => {
          if(!res.ok) throw new Error("wardlevel.json not found");
          return res.json();
      })
      .then(data => {
        console.log(`Loaded Map GeoJSON: ${data.features.length} regions.`);
        setWardGeoJson(data);
      })
      .catch(e => console.error("Map Load Error:", e));

  }, [projectId]);

  const fetchFacilities = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const res = await axios.get(`https://fieldopsbackend.onrender.com/api/projects/${projectId}/facilities/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMapData(res.data);
    } catch (err) { console.error(err); }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('project_id', projectId);
    
    alert("Uploading... Please wait.");
    
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post('https://fieldopsbackend.onrender.com/api/process-file/', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      });
      alert(response.data.message);
      fetchFacilities();
    } catch (error) { 
        alert("Upload failed. See console.");
    } finally {
        if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // --- 2. FILTER LOGIC ---
  const availableSheets = useMemo(() => {
      const sheets = [...new Set(mapData.map(d => d.sheet_name).filter(Boolean))];
      return sheets.sort();
  }, [mapData]);

  const sheetData = useMemo(() => {
      if (selectedSheet === 'All') return mapData;
      return mapData.filter(d => d.sheet_name === selectedSheet);
  }, [mapData, selectedSheet]);

  const filteredList = sheetData.filter(row => 
    row.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.municipality?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- 3. ROBUST MATCHING LOGIC (District Fallback) ---
  const { aggregatedData, unmappedCount } = useMemo(() => {
      if (!wardGeoJson || sheetData.length === 0) return { aggregatedData: [], unmappedCount: 0 };
      
      const groups = [];
      const matchedFacilityIds = new Set();
      const districtCenters = {}; 

      // STEP A: Prepare Map Data & District Centers
      wardGeoJson.features.forEach(feature => {
          const p = feature.properties;
          const districtName = p.DISTRICT || p.District || "Unknown";
          const center = getCentroid(feature.geometry.coordinates);

          if (!districtCenters[normalize(districtName)]) {
              districtCenters[normalize(districtName)] = { lat: 0, lng: 0, count: 0, name: districtName };
          }
          const d = districtCenters[normalize(districtName)];
          d.lat += center[0];
          d.lng += center[1];
          d.count++;
      });

      Object.keys(districtCenters).forEach(k => {
          districtCenters[k].lat /= districtCenters[k].count;
          districtCenters[k].lng /= districtCenters[k].count;
      });

      // STEP B: Try MUNICIPALITY Matching (Tier 1)
      wardGeoJson.features.forEach(feature => {
          const p = feature.properties;
          const muniNameRaw = p.GaPa_Na_Ek || p.GaPa_Name || p.FIRST_GaPa || p.Muni_Name || p.LOCAL_LEVEL_NAME || p.NAME;
          if (!muniNameRaw) return;

          const muniNameNorm = normalize(muniNameRaw);
          
          const matches = sheetData.filter(f => {
              if (matchedFacilityIds.has(f.id)) return false; 
              const fMuniNorm = normalize(f.municipality);
              return fMuniNorm.includes(muniNameNorm) || muniNameNorm.includes(fMuniNorm);
          });

          if (matches.length > 0) {
              const center = getCentroid(feature.geometry.coordinates);
              matches.forEach(m => matchedFacilityIds.add(m.id));

              groups.push({
                  id: p.OBJECTID || Math.random(),
                  name: muniNameRaw,
                  coords: center,
                  count: matches.length,
                  facilities: matches,
                  type: 'municipality'
              });
          }
      });

      // STEP C: Try DISTRICT Matching (Tier 2 - Fallback)
      const leftovers = sheetData.filter(f => !matchedFacilityIds.has(f.id));
      
      const districtGroups = {};
      leftovers.forEach(f => {
          // Fallback to Saptari if no district info found
          let fDistrict = f.extra_data?.['District'] || f.extra_data?.['district'] || "Saptari"; 
          const fDistNorm = normalize(fDistrict);

          if (districtCenters[fDistNorm]) {
              if (!districtGroups[fDistNorm]) districtGroups[fDistNorm] = [];
              districtGroups[fDistNorm].push(f);
              matchedFacilityIds.add(f.id);
          }
      });

      Object.keys(districtGroups).forEach(distKey => {
          const centerInfo = districtCenters[distKey];
          groups.push({
              id: `dist-${distKey}`,
              name: `${centerInfo.name} District (General Area)`,
              coords: [centerInfo.lat, centerInfo.lng],
              count: districtGroups[distKey].length,
              facilities: districtGroups[distKey],
              type: 'district' 
          });
      });

      const unmapped = sheetData.length - matchedFacilityIds.size;
      return { aggregatedData: groups, unmappedCount: unmapped };
  }, [wardGeoJson, sheetData]);

  const handleFacilityClick = (row) => {
      if (row.latitude && row.longitude) {
          setFocusedLocation([row.latitude, row.longitude]);
      } else {
          const group = aggregatedData.find(g => g.facilities.some(f => f.id === row.id));
          if(group) {
              setFocusedLocation(group.coords);
          } else {
              alert(`Could not map "${row.municipality}".`);
          }
      }
  };

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col overflow-hidden">
      {/* UPDATE: Added CSS for pulsation */}
      <style>{`
        @keyframes pulse-green {
          0% { opacity: 1; stroke-width: 2px; }
          50% { opacity: 0.5; stroke-width: 8px; }
          100% { opacity: 1; stroke-width: 2px; }
        }
        .pulsating-circle {
          animation: pulse-green 1.5s infinite;
          transform-origin: center;
          transform-box: fill-box;
        }
      `}</style>
      
      <Navbar />
      <div className="flex-grow relative w-full h-full pt-20">
        
        {/* MAP */}
        <MapContainer center={[28.39, 84.12]} zoom={7} className="h-full w-full bg-gray-100">
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          <FlyToLocation coords={focusedLocation} />
          
          {wardGeoJson && <GeoJSON data={wardGeoJson} style={{ fillColor: 'transparent', color: '#ec4899', weight: 0.8, opacity: 0.6 }} />}
          
          {aggregatedData.map((group) => (
             <CircleMarker 
                key={group.id} 
                center={group.coords} 
                // UPDATE: Radius made small (was 12, now 6)
                radius={group.type === 'district' ? 6 : 6} 
                pathOptions={{ 
                  color: '#fff', 
                  // UPDATE: Changed Color to Green (#22c55e) if district
                  fillColor: group.type === 'district' ? '#22c55e' : '#2563eb', 
                  fillOpacity: 0.9,
                  weight: 2,
                  // UPDATE: Added class for pulsation
                  className: group.type === 'district' ? 'pulsating-circle' : ''
                }}
             >
               <Popup className="custom-popup min-w-[250px] max-h-[300px] overflow-y-auto shadow-xl rounded-lg">
                 <div className="text-gray-900">
                   <h3 className={`font-bold text-lg mb-2 border-b pb-2 sticky top-0 bg-white ${group.type === 'district' ? 'text-green-600' : 'text-blue-700'}`}>
                       {group.name}
                       <span className="ml-2 inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">{group.count}</span>
                   </h3>
                   {group.type === 'district' && <div className="text-xs text-amber-600 bg-amber-50 p-2 mb-2 rounded border border-amber-100 font-bold">⚠️ Exact Municipality not found. Showing in District Center.</div>}
                   
                   <div className="space-y-2">
                       {group.facilities.map(f => (
                           <div key={f.id} className="bg-slate-50 p-2 rounded border border-slate-100 hover:bg-slate-100">
                               <strong className="block text-sm text-slate-800">{f.name}</strong>
                               <div className="flex justify-between mt-1 items-center">
                                   <span className="text-[10px] text-slate-500">{f.sheet_name}</span>
                                   <span className="text-[10px] bg-slate-200 px-1 rounded text-slate-600">{f.municipality}</span>
                               </div>
                           </div>
                       ))}
                   </div>
                 </div>
               </Popup>
             </CircleMarker>
          ))}
        </MapContainer>

        {/* SIDEBAR */}
        <div className={`absolute top-0 left-0 h-full w-96 bg-white shadow-2xl transition-transform duration-300 z-[999] flex flex-col border-r border-gray-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
           <div className="p-4 border-b border-gray-100 bg-white">
              <div className="flex items-center gap-2 mb-3">
                 <button onClick={() => navigate('/dashboard')} className="p-1 text-gray-400 hover:text-gray-900 transition"><HiArrowLeft /></button>
                 <h2 className="font-bold text-gray-800 truncate">{project?.title}</h2>
              </div>
              <div className="mb-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dataset</label>
                  <select value={selectedSheet} onChange={(e) => setSelectedSheet(e.target.value)} className="w-full mt-1 p-2 bg-gray-50 border border-gray-200 rounded text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition">
                      <option value="All">All Datasets</option>
                      {availableSheets.map(sheet => <option key={sheet} value={sheet}>{sheet}</option>)}
                  </select>
              </div>
              <div className="flex gap-2">
                  <button onClick={() => fileInputRef.current.click()} className="flex-1 py-2 bg-slate-800 text-white text-xs font-bold rounded shadow hover:bg-slate-900 transition flex justify-center gap-2 items-center"><HiUpload /> Upload Data</button>
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
              </div>
           </div>

           <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
             <div className="relative">
               <HiSearch className="absolute left-3 top-2.5 text-gray-400" />
               <input type="text" placeholder="Search locations..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded outline-none focus:border-blue-500 bg-white" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
             </div>
             <div className="mt-2 text-xs text-gray-500 flex justify-between px-1 items-center">
                <span>{filteredList.length} Records</span>
                {unmappedCount > 0 && (
                    <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-bold" title="Facilities with mismatched municipality names">
                        <HiExclamation /> {unmappedCount} Unmapped
                    </span>
                )}
             </div>
           </div>

           <div className="flex-1 overflow-y-auto bg-slate-50 p-3 space-y-2">
               {filteredList.map((row) => {
                  const group = aggregatedData.find(g => g.facilities.some(f => f.id === row.id));
                  const isMapped = !!group;
                  const isDistrictFallback = group?.type === 'district';

                  return (
                    <div 
                        key={row.id} 
                        onClick={() => handleFacilityClick(row)} 
                        className={`p-3 rounded-lg border shadow-sm cursor-pointer transition group ${isMapped ? 'bg-white border-gray-200 hover:border-blue-400' : 'bg-gray-50 border-gray-200 opacity-70'}`}
                    >
                        <h3 className="text-sm font-bold text-gray-800 mb-1 group-hover:text-blue-700">{row.name}</h3>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full truncate max-w-[150px]">{row.municipality}</span>
                            <div className="flex items-center gap-2">
                                {isDistrictFallback && <HiExclamation className="text-green-500" title="Mapped via District (Approx)" />}
                                {!isMapped && <HiBan className="text-gray-400" title="Not mapped" />}
                                {isMapped && !isDistrictFallback && <HiCheckCircle className="text-emerald-500" title="Exact Match" />}
                            </div>
                        </div>
                    </div>
                  );
               })}
           </div>
        </div>
        
        {!sidebarOpen && <button onClick={() => setSidebarOpen(true)} className="absolute top-4 left-4 z-[900] p-3 bg-white text-gray-700 rounded-lg shadow-lg border border-gray-100 hover:bg-gray-50"><HiOutlineMenuAlt2 size={24} /></button>}
      </div>
    </div>
  );
};

export default MapView;