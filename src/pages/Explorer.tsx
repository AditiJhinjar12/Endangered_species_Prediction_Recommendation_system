import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaMapMarkerAlt, FaChartLine, FaSearch, FaFilter, FaThLarge, FaList, FaSlidersH } from 'react-icons/fa';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { supabase } from '../supabaseClient';
import { speciesList, mapDbSpeciesToLocal } from '../data/speciesData';

export const Explorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [trendFilter, setTrendFilter] = useState('All');
  const [threatFilter, setThreatFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [species, setSpecies] = useState(speciesList);

  useEffect(() => {
    const fetchDbSpecies = async () => {
      try {
        const { data, error } = await supabase.from('species_data').select('*');
        if (data && data.length > 0 && !error) {
          const mapped = data.map(mapDbSpeciesToLocal);
          setSpecies(mapped);
        }
      } catch (err) {
        console.warn('Failed to load database species, falling back to static list.', err);
      }
    };
    fetchDbSpecies();
  }, []);

  // Collect all unique regions from data dynamically
  const uniqueRegions = ['All', ...Array.from(new Set(species.flatMap(s => s.region)))];
  
  // Filter species
  const filteredSpecies = species.filter(s => {
    const matchesSearch = s.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.region.some(r => r.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          s.countries.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    const matchesRegion = regionFilter === 'All' || s.region.includes(regionFilter);
    const matchesTrend = trendFilter === 'All' || s.trend === trendFilter;
    const matchesThreat = threatFilter === 'All' || s.threatLevel === threatFilter;
    const isPublic = s.isPublished !== false;
    
    return matchesSearch && matchesStatus && matchesRegion && matchesTrend && matchesThreat && isPublic;
  });

  return (
    <DashboardLayout activeTabId="species">
      <div className="space-y-8 text-left">
        {/* Top Header */}
        <div className="border-b border-emerald-950/40 pb-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Species Explorer</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">Discover, filter, and access detailed research logs for all monitored species.</p>
        </div>

        {/* Filters Panel */}
        <Card hoverable={false} className="border-emerald-900/10 p-5 bg-[#020905]/45 backdrop-blur-md">
          <div className="flex flex-col gap-4">
            
            {/* Search Input inside Filters */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-100/40">
                <FaSearch className="h-3.5 w-3.5" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search species by common name, scientific name, or region (e.g. Tiger, Panthera, India)..."
                className="w-full bg-emerald-950/20 border border-emerald-900/30 hover:border-emerald-800/40 focus:border-brand-green/50 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-emerald-100/30 focus:outline-none transition-colors"
              />
            </div>

            {/* Filter selectors grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              {/* Status Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <FaFilter className="text-brand-green/60" />
                  <span>Conservation Status</span>
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full px-3 py-2 bg-[#051109] border border-emerald-900/30 focus:border-brand-green/40 rounded-xl text-xs text-white focus:outline-none focus:ring-0"
                >
                  <option value="All" className="bg-[#051109] text-white">All Statuses</option>
                  <option value="Critically Endangered" className="bg-[#051109] text-white">Critically Endangered</option>
                  <option value="Endangered" className="bg-[#051109] text-white">Endangered</option>
                  <option value="Vulnerable" className="bg-[#051109] text-white">Vulnerable</option>
                  <option value="Near Threatened" className="bg-[#051109] text-white">Near Threatened</option>
                </select>
              </div>

              {/* Region Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-brand-green/60" />
                  <span>Primary Region</span>
                </label>
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="block w-full px-3 py-2 bg-[#051109] border border-emerald-900/30 focus:border-brand-green/40 rounded-xl text-xs text-white focus:outline-none focus:ring-0"
                >
                  {uniqueRegions.map(region => (
                    <option key={region} value={region} className="bg-[#051109] text-white">
                      {region === 'All' ? 'All Regions' : region}
                    </option>
                  ))}
                </select>
              </div>

              {/* Trend Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <FaChartLine className="text-brand-green/60" />
                  <span>Population Trend</span>
                </label>
                <select
                  value={trendFilter}
                  onChange={(e) => setTrendFilter(e.target.value)}
                  className="block w-full px-3 py-2 bg-[#051109] border border-emerald-900/30 focus:border-brand-green/40 rounded-xl text-xs text-white focus:outline-none focus:ring-0"
                >
                  <option value="All" className="bg-[#051109] text-white">All Trends</option>
                  <option value="Increasing" className="bg-[#051109] text-white">Increasing</option>
                  <option value="Stable" className="bg-[#051109] text-white">Stable</option>
                  <option value="Declining" className="bg-[#051109] text-white">Declining</option>
                  <option value="Unknown" className="bg-[#051109] text-white">Unknown</option>
                </select>
              </div>

              {/* Threat Level Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <FaSlidersH className="text-brand-green/60" />
                  <span>Threat Level</span>
                </label>
                <select
                  value={threatFilter}
                  onChange={(e) => setThreatFilter(e.target.value)}
                  className="block w-full px-3 py-2 bg-[#051109] border border-emerald-900/30 focus:border-brand-green/40 rounded-xl text-xs text-white focus:outline-none focus:ring-0"
                >
                  <option value="All" className="bg-[#051109] text-white">All Threat Levels</option>
                  <option value="Critical" className="bg-[#051109] text-white">Critical</option>
                  <option value="High" className="bg-[#051109] text-white">High</option>
                  <option value="Medium" className="bg-[#051109] text-white">Medium</option>
                  <option value="Low" className="bg-[#051109] text-white">Low</option>
                </select>
              </div>

            </div>
          </div>
        </Card>

        {/* Dynamic Count and View Toggle Panel */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-1">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] bg-emerald-950/40 text-brand-green font-extrabold px-2.5 py-1 rounded-md border border-brand-green/20 font-mono uppercase tracking-wider">
              {filteredSpecies.length} {filteredSpecies.length === 1 ? 'Species' : 'Species'} Found
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 bg-[#020905]/45 border border-emerald-950/40 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-brand-green/25 text-brand-green' : 'text-gray-500 hover:text-white hover:bg-emerald-950/10'}`}
              title="Grid View"
            >
              <FaThLarge className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-brand-green/25 text-brand-green' : 'text-gray-500 hover:text-white hover:bg-emerald-950/10'}`}
              title="List View"
            >
              <FaList className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Dynamic List or Grid Rendering */}
        {filteredSpecies.length > 0 ? (
          viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredSpecies.map((species) => (
                <Card
                  key={species.id}
                  className="flex flex-col justify-between h-full border-emerald-900/10 p-0 overflow-hidden relative group text-left"
                >
                  <div>
                    {/* Photo area */}
                    <div className="h-44 w-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020905] via-transparent to-transparent z-10 opacity-70" />
                      <img
                        src={species.image}
                        alt={species.commonName}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      
                      {/* Status badge in photo corner */}
                      <span className={`absolute top-3 right-3 z-20 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        species.status === 'Critically Endangered' ? 'bg-red-950/70 text-red-400 border border-red-900/30' :
                        species.status === 'Endangered' ? 'bg-amber-950/70 text-amber-400 border border-amber-900/30' :
                        species.status === 'Vulnerable' ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-900/30' :
                        'bg-blue-950/70 text-blue-400 border border-blue-900/30'
                      }`}>
                        {species.status}
                      </span>
                    </div>

                    {/* Species descriptions */}
                    <div className="p-5 space-y-4">
                      <div>
                        <h3 className="text-base font-bold text-white leading-tight group-hover:text-brand-green transition-colors">{species.commonName}</h3>
                        <p className="text-[11px] text-gray-400 italic mt-0.5">{species.scientificName}</p>
                      </div>

                      {/* Quick attributes */}
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-emerald-100/50 border-t border-emerald-950/30 pt-3">
                        <div>
                          <span className="block text-gray-500 font-semibold uppercase tracking-wider text-[8px]">Est. Population</span>
                          <span className="font-bold text-white text-xs mt-0.5 font-mono">
                            {species.currentPopulation > 0 ? `~${species.currentPopulation.toLocaleString()}` : 'Unknown'}
                          </span>
                        </div>
                        <div>
                          <span className="block text-gray-500 font-semibold uppercase tracking-wider text-[8px]">Global Trend</span>
                          <span className={`font-bold text-xs mt-0.5 flex items-center gap-1 ${
                            species.trend === 'Increasing' ? 'text-brand-green' : 
                            species.trend === 'Stable' ? 'text-blue-400' : 'text-red-500'
                          }`}>
                            {species.trend === 'Increasing' ? '↑' : species.trend === 'Stable' ? '→' : '↓'} {species.trend}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* View CTA */}
                  <div className="px-5 pb-5 pt-1">
                    <Link to={`/species/${species.id}`} className="block w-full">
                      <Button variant="outline" size="sm" className="w-full text-[11px]">
                        View Research Profile
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredSpecies.map((species) => (
                <Card
                  key={species.id}
                  className="p-4 bg-[#020905]/45 border border-emerald-950/20 hover:border-emerald-800/40 transition-colors flex items-center justify-between gap-4 text-left"
                >
                  <div className="flex items-center gap-4">
                    {/* Thumbnail */}
                    <div className="h-16 w-16 rounded-xl overflow-hidden min-w-[64px] border border-emerald-950/30">
                      <img src={species.image} alt={species.commonName} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-white leading-tight">{species.commonName}</h3>
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider ${
                          species.status === 'Critically Endangered' ? 'bg-red-950/70 text-red-400 border border-red-900/30' :
                          species.status === 'Endangered' ? 'bg-amber-950/70 text-amber-400 border border-amber-900/30' :
                          species.status === 'Vulnerable' ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-900/30' :
                          'bg-blue-950/70 text-blue-400 border border-blue-900/30'
                        }`}>
                          {species.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 italic mt-0.5">{species.scientificName}</p>
                      <div className="flex gap-4 text-[9px] text-gray-500 mt-2 flex-wrap">
                        <span><strong>Region:</strong> {species.region.join(', ')}</span>
                        <span><strong>Habitat:</strong> {species.habitat}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column Metrics & View Button */}
                  <div className="flex items-center gap-6">
                    <div className="text-right text-[10px] hidden md:block">
                      <span className="block text-gray-500 font-semibold uppercase tracking-wider text-[8px]">Est. Population</span>
                      <span className="font-bold text-white mt-0.5 font-mono">
                        {species.currentPopulation > 0 ? `~${species.currentPopulation.toLocaleString()}` : 'Unknown'}
                      </span>
                    </div>
                    <div className="text-right text-[10px] hidden sm:block">
                      <span className="block text-gray-500 font-semibold uppercase tracking-wider text-[8px]">Global Trend</span>
                      <span className={`font-bold mt-0.5 flex items-center gap-1 ${
                        species.trend === 'Increasing' ? 'text-brand-green' : 
                        species.trend === 'Stable' ? 'text-blue-400' : 'text-red-500'
                      }`}>
                        {species.trend === 'Increasing' ? '↑' : species.trend === 'Stable' ? '→' : '↓'} {species.trend}
                      </span>
                    </div>
                    
                    <Link to={`/species/${species.id}`} className="min-w-[120px]">
                      <Button variant="outline" size="sm" className="w-full text-[10px]">
                        View Research
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )
        ) : (
          <Card hoverable={false} className="border-emerald-900/10 p-12 text-center text-gray-400 flex flex-col items-center justify-center space-y-3">
            <FaLeaf className="h-8 w-8 text-emerald-900/40 animate-pulse" />
            <p className="text-sm font-medium">No species found matching your filters.</p>
            <p className="text-[10px] text-gray-500">Try modifying your search or resetting status, region, or trend filters.</p>
            <Button variant="outline" size="sm" className="mt-2 text-xs" onClick={() => {
              setSearchTerm('');
              setStatusFilter('All');
              setRegionFilter('All');
              setTrendFilter('All');
              setThreatFilter('All');
            }}>
              Reset Filters
            </Button>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};
export default Explorer;
