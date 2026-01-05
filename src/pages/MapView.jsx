import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { 
    HiArrowLeft, 
    HiOutlineMenuAlt2, 
    HiSearch, 
    HiHome, 
    HiChevronRight, 
    HiUpload, 
    HiTrash, 
    HiCog, 
    HiCheckCircle, 
    HiLocationMarker 
} from 'react-icons/hi';
import Navbar from '../components/Navbar';

// --- IMPORT ASSETS (Direct JSON) ---
import districtData from '../assets/district.json';
import municipalityData from '../assets/municipality.json';

// --- HELPER: Normalize Strings ---
const normalize = (str) => {
    if (!str) return "";
    return str.toString().trim().toLowerCase().replace(/[^a-z0-9]/g, '');
};

// --- CONFIGURATION ---
const NEPAL_BOUNDS = [
    [26.347, 80.058], // Southwest
    [30.447, 88.201]  // Northeast
];

// --- ANIMATION COMPONENT ---
const MapController = ({ focusBounds }) => {
    const map = useMap();
    useEffect(() => {
        if (focusBounds) {
            map.flyToBounds(focusBounds, { 
                padding: [50, 50], 
                duration: 1.2, 
                easeLinearity: 0.25 
            });
        }
    }, [focusBounds, map]);
    return null;
};

const MapView = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();

    // --- STATE ---
    const [project, setProject] = useState(null);
    const [facilities, setFacilities] = useState([]);
    
    // View State
    const [viewMode, setViewMode] = useState('national'); // 'national' | 'district' | 'municipality'
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedMuni, setSelectedMuni] = useState(null);
    const [mapFocusBounds, setMapFocusBounds] = useState(null);

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fileInputRef = useRef(null);

    // --- 1. INITIAL LOAD ---
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        // Fetch Project
        axios.get(`https://fieldopsbackend.onrender.com/api/projects/${projectId}/`, config)
             .then(res => setProject(res.data))
             .catch(() => navigate('/dashboard'));

        // Fetch Facilities
        axios.get(`https://fieldopsbackend.onrender.com/api/projects/${projectId}/facilities/`, config)
             .then(res => setFacilities(res.data))
             .catch(() => navigate('/dashboard'));

        setMapFocusBounds(L.latLngBounds(NEPAL_BOUNDS));
    }, [projectId, navigate]);

    // --- 2. MAP DATA LOGIC (Memoized) ---
    const displayedGeoJson = useMemo(() => {
        if (viewMode === 'national') {
            return districtData;
        } 
        else if (viewMode === 'district' || viewMode === 'municipality') {
            return {
                ...municipalityData,
                features: municipalityData.features.filter(f => 
                    normalize(f.properties.DISTRICT) === normalize(selectedDistrict)
                )
            };
        }
        return null;
    }, [viewMode, selectedDistrict]);

    // --- 3. FILTER LOGIC (Robust) ---
    const filteredFacilities = useMemo(() => {
        let data = facilities;
        
        // FILTER BY DISTRICT
        if (selectedDistrict) {
            const searchDist = normalize(selectedDistrict);
            data = data.filter(f => {
                const possibleValues = [
                    f.district, f.District, f.extra_data?.District, f.extra_data?.district, f.district_name
                ];
                return possibleValues.some(val => val && (normalize(val) === searchDist || normalize(val).includes(searchDist)));
            });
        }

        // FILTER BY MUNICIPALITY
        if (selectedMuni) {
            const searchMuni = normalize(selectedMuni);
            data = data.filter(f => {
                const possibleValues = [
                    f.municipality, f.Municipality, f.palika, f.extra_data?.Municipality
                ];
                return possibleValues.some(val => val && normalize(val).includes(searchMuni));
            });
        }

        // FILTER BY SEARCH TERM
        if (searchTerm) {
            data = data.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        return data;
    }, [facilities, selectedDistrict, selectedMuni, searchTerm]);

    // --- 4. NAVIGATION HANDLERS ---
    const enterDistrictView = useCallback((distName, bounds = null) => {
        if (!bounds) {
            const tempFeatures = municipalityData.features.filter(f => 
                normalize(f.properties.DISTRICT) === normalize(distName)
            );
            if (tempFeatures.length > 0) {
                 const tempLayer = L.geoJSON({ type: "FeatureCollection", features: tempFeatures });
                 bounds = tempLayer.getBounds();
            }
        }
        if (bounds) setMapFocusBounds(bounds);
        setSelectedDistrict(distName);
        setSelectedMuni(null);
        setViewMode('district');
        setSidebarOpen(true);
    }, []);

    const enterNationalView = useCallback(() => {
        setSelectedDistrict(null);
        setSelectedMuni(null);
        setViewMode('national');
        setMapFocusBounds(L.latLngBounds(NEPAL_BOUNDS));
    }, []);

    // --- 5. MAP INTERACTION ---
    const handleFeatureClick = (feature, layer) => {
        const p = feature.properties;

        if (viewMode === 'national') {
            const clickedDistName = p.DIST_EN; 
            if (clickedDistName) enterDistrictView(clickedDistName, layer.getBounds());
        }
        else if (viewMode === 'district' || viewMode === 'municipality') {
            const clickedMuniName = p.NAME;
            if (clickedMuniName) {
                setSelectedMuni(clickedMuniName);
                setMapFocusBounds(layer.getBounds()); 
                setViewMode('municipality');
                setSidebarOpen(true);
            }
        }
    };

    // --- 6. UPLOAD LOGIC ---
    const handleUploadClick = () => fileInputRef.current.click();

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('access_token');
            const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };

            await axios.post(`https://fieldopsbackend.onrender.com/api/projects/${projectId}/import-facilities/`, formData, config);
            
            // Refresh data
            const res = await axios.get(`https://fieldopsbackend.onrender.com/api/projects/${projectId}/facilities/`, config);
            setFacilities(res.data);
            alert("Data uploaded successfully!");
        } catch (err) {
            console.error(err);
            alert("Upload failed. Please check file format.");
        }
    };

    // --- 7. STYLE HELPERS ---
    const getGeoStyle = (feature) => {
        const p = feature.properties;
        const isSelectedMuni = viewMode === 'municipality' && selectedMuni && normalize(p.NAME) === normalize(selectedMuni);

        return { 
            color: isSelectedMuni ? '#be185d' : '#ec4899',   
            weight: isSelectedMuni ? 3 : 1, 
            fillColor: isSelectedMuni ? '#be185d' : '#ec4899', 
            fillOpacity: isSelectedMuni ? 0.3 : 0.1, 
        };
    };

    const onEachFeature = (feature, layer) => {
        const p = feature.properties;
        let label = (viewMode === 'national') ? p.DIST_EN : p.NAME;

        if (label) {
            layer.bindTooltip(label.toString(), { 
                permanent: true, direction: 'center', className: 'map-label-small' 
            });
        }
        layer.on({ click: (e) => { L.DomEvent.stopPropagation(e); handleFeatureClick(feature, e.target); } });
    };

    // --- 8. RENDER SIDEBAR ---
    const renderSidebar = () => (
        // Added 'flex flex-col' and 'h-full' to ensure proper layout
        <div className={`h-full bg-white shadow-2xl border-l border-gray-200 transition-all duration-300 flex flex-col z-20 ${sidebarOpen ? 'w-96' : 'w-0'}`}>
            
            {/* HEADER - Fixed Height */}
            <div className="p-5 border-b border-gray-100 bg-white min-w-96 flex-shrink-0">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col gap-1 w-full">
                        <h2 className="font-bold text-xl text-gray-800 truncate" title={project?.name}>
                            {project ? project.name : 'Loading Project...'}
                        </h2>
                        
                        <div className="flex items-center flex-wrap gap-1 text-xs font-semibold text-gray-500 mt-1">
                            <span onClick={enterNationalView} className="cursor-pointer hover:text-pink-600 hover:underline flex items-center gap-1">
                                <HiHome className="mb-0.5" /> Nepal
                            </span>
                            
                            {selectedDistrict && (
                                <>
                                    <HiChevronRight className="text-gray-400" />
                                    <span 
                                        onClick={() => enterDistrictView(selectedDistrict)}
                                        className={`cursor-pointer ${!selectedMuni ? 'text-pink-600' : 'hover:text-pink-600 hover:underline'}`}
                                    >
                                        {selectedDistrict}
                                    </span>
                                </>
                            )}
                            
                            {selectedMuni && (
                                <>
                                    <HiChevronRight className="text-gray-400" />
                                    <span className="text-pink-600 truncate max-w-[120px]">
                                        {selectedMuni}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 p-1">
                        <HiArrowLeft size={20} />
                    </button>
                </div>

                {/* TOOLBAR */}
                <div className="flex gap-2 mb-4">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept=".csv,.xlsx,.xls,.json" />
                    <button onClick={handleUploadClick} className="flex-1 flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white py-2 px-3 rounded-lg text-xs font-semibold transition shadow-sm">
                        <HiUpload size={14} /> Upload Data
                    </button>
                    <button className="flex items-center justify-center p-2 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 rounded-lg transition border border-gray-200" title="Delete Dataset">
                        <HiTrash size={16} />
                    </button>
                    <button className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition border border-gray-200" title="Settings">
                        <HiCog size={16} />
                    </button>
                </div>
                
                {/* SEARCH */}
                <div className="relative">
                    <HiSearch className="absolute left-3 top-2.5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search facilities..." 
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                </div>
            </div>

            {/* SCROLLABLE LIST - ADDED 'min-h-0' TO FIX SCROLLING */}
            <div className="flex-1 overflow-y-auto min-h-0 p-4 space-y-3 min-w-96 bg-gray-50 custom-scrollbar">
                <div className="flex justify-between items-center mb-2 px-1">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Data Points
                    </span>
                    <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-bold">
                        {filteredFacilities.length}
                    </span>
                </div>

                {filteredFacilities.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-xl">
                        <HiLocationMarker size={30} className="mb-2 opacity-20" />
                        No facilities found.
                    </div>
                ) : (
                    filteredFacilities.map(f => (
                        <div key={f.id} className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:border-pink-400 hover:shadow-md transition cursor-pointer group">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-sm text-gray-800 group-hover:text-pink-600 transition line-clamp-1">
                                    {f.name}
                                </h4>
                                <HiCheckCircle className="text-green-500 flex-shrink-0 ml-2" title="Verified" />
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1">
                                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md border border-gray-100">
                                    {f.municipality || 'Unknown Muni'}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    return (
        <div className="h-screen w-full flex flex-col overflow-hidden bg-gray-50">
            <style>{`
                @keyframes pulse-green { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.8; } 100% { transform: scale(1); opacity: 1; } }
                path.pulsating-circle { animation: pulse-green 2s infinite; transform-origin: center; transform-box: fill-box; }
                .map-label-small { background: transparent; border: none; box-shadow: none; font-weight: 700; font-size: 9px; color: #1e293b; text-shadow: 1px 1px 0 #fff; }
                
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
            `}</style>

            <Navbar />

            <div className="flex-grow relative flex pt-20">
                <div className="flex-grow h-full relative z-0">
                    <MapContainer 
                        center={[28.39, 84.12]} 
                        zoom={7} 
                        preferCanvas={true} 
                        className="h-full w-full bg-slate-100"
                    >
                        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                        <MapController focusBounds={mapFocusBounds} />

                        {displayedGeoJson && (
                            <GeoJSON 
                                key={viewMode + (selectedDistrict || '')} 
                                data={displayedGeoJson} 
                                style={getGeoStyle} 
                                onEachFeature={onEachFeature} 
                            />
                        )}

                        {filteredFacilities.map(f => (
                            (f.latitude && f.longitude) ? (
                                <CircleMarker 
                                    key={f.id} 
                                    center={[f.latitude, f.longitude]} 
                                    radius={5} 
                                    pathOptions={{ color: '#15803d', fillColor: '#22c55e', fillOpacity: 1, className: 'pulsating-circle' }}
                                >
                                    <Popup>
                                        <div className="text-xs">
                                            <strong className="block text-sm mb-1">{f.name}</strong>
                                            <span className="text-gray-500">{f.municipality}</span>
                                        </div>
                                    </Popup>
                                </CircleMarker>
                            ) : null
                        ))}
                    </MapContainer>
                </div>

                {renderSidebar()}

                {!sidebarOpen && (
                    <button 
                        onClick={() => setSidebarOpen(true)} 
                        className="absolute top-24 right-4 z-[500] bg-white p-2.5 rounded-lg shadow-lg border border-gray-200 text-pink-600 hover:bg-pink-50 transition duration-200"
                    >
                        <HiOutlineMenuAlt2 size={24} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default MapView;