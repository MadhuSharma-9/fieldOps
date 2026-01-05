import React, { useState, useMemo } from 'react';
import { HiArrowLeft, HiSearch, HiHome, HiChevronRight } from 'react-icons/hi';

const MapSidebar = ({ 
    isOpen, 
    setIsOpen, 
    viewMode, 
    selectedDistrict, 
    selectedMuni, 
    facilities, 
    onNavigate 
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Internal filter for the Search Bar
    const displayedFacilities = useMemo(() => {
        if (!searchTerm) return facilities;
        return facilities.filter(f => 
            f.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [facilities, searchTerm]);

    return (
        <div className={`h-full bg-white shadow-2xl border-l border-gray-200 transition-all duration-300 flex flex-col z-20 ${isOpen ? 'w-96' : 'w-0'}`}>
            
            {/* --- HEADER & BREADCRUMBS --- */}
            <div className="p-4 border-b border-gray-100 bg-white min-w-96">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-bold text-lg text-gray-800">Map Explorer</h2>
                        
                        {/* Interactive Breadcrumb */}
                        <div className="flex items-center flex-wrap gap-1 text-xs font-semibold text-gray-500">
                            <span 
                                onClick={() => onNavigate('national')} 
                                className="cursor-pointer hover:text-pink-600 hover:underline flex items-center gap-1"
                            >
                                <HiHome className="mb-0.5" /> Nepal
                            </span>
                            
                            {selectedDistrict && (
                                <>
                                    <HiChevronRight className="text-gray-400" />
                                    <span 
                                        onClick={() => onNavigate('district', selectedDistrict)}
                                        className={`cursor-pointer ${!selectedMuni ? 'text-pink-600' : 'hover:text-pink-600 hover:underline'}`}
                                    >
                                        {selectedDistrict}
                                    </span>
                                </>
                            )}
                            
                            {selectedMuni && (
                                <>
                                    <HiChevronRight className="text-gray-400" />
                                    <span className="text-pink-600">
                                        {selectedMuni}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400">
                        <HiArrowLeft />
                    </button>
                </div>
                
                {/* Search Input */}
                <div className="relative">
                    <HiSearch className="absolute left-3 top-2.5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search facilities in this area..." 
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm outline-none focus:border-pink-500 transition" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                </div>
            </div>

            {/* --- FACILITY LIST --- */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2 min-w-96 bg-gray-50">
                <div className="bg-pink-50 px-4 py-2 border-b border-pink-100 mb-2 rounded flex justify-between items-center">
                    <span className="text-xs font-bold text-pink-800">
                        {displayedFacilities.length} Facilities Found
                    </span>
                </div>
                
                {displayedFacilities.length === 0 ? (
                    <div className="text-center p-4 text-gray-400 text-sm">
                        No facilities found here.
                    </div>
                ) : (
                    displayedFacilities.map(f => (
                        <div key={f.id} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:border-pink-400 cursor-pointer mb-2 group">
                            <h4 className="font-bold text-sm text-gray-800 group-hover:text-pink-600 transition">
                                {f.name}
                            </h4>
                            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full mt-1 inline-block">
                                {f.municipality}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MapSidebar;