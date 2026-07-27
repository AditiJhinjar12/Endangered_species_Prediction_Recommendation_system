import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Loader } from '../components/Loader';
import {
  FaSlidersH,
  FaSkullCrossbones,
  FaTree,
  FaCloudSun,
  FaShieldAlt,
  FaSyncAlt,
  FaBars,
  FaBell,
  FaTint,
  FaWind,
  FaRegClock,
  FaInfoCircle,
  FaMapMarkerAlt
} from 'react-icons/fa';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';

// Mock species telemetry data
interface SpeciesData {
  id: string;
  name: string;
  scientificName: string;
  basePopulation: number;
  baselineDecline: number; // annual rate (e.g. 0.045 = 4.5% decline)
  threatFactors: {
    poaching: number;
    deforestation: number;
    climate: number;
  };
  riskStatus: 'Critical' | 'Endangered' | 'Vulnerable';
  image: string;
}

const speciesList: Record<string, SpeciesData> = {
  tiger: {
    id: 'tiger',
    name: 'Bengal Tiger',
    scientificName: 'Panthera tigris tigris',
    basePopulation: 3890,
    baselineDecline: 0.045,
    threatFactors: { poaching: 78, deforestation: 52, climate: 35 },
    riskStatus: 'Endangered',
    image: 'https://images.unsplash.com/photo-1552410260-0fd9b577afa6?auto=format&fit=crop&q=80&w=400'
  },
  leopard: {
    id: 'leopard',
    name: 'Snow Leopard',
    scientificName: 'Panthera uncia',
    basePopulation: 4500,
    baselineDecline: 0.038,
    threatFactors: { poaching: 42, deforestation: 20, climate: 75 },
    riskStatus: 'Vulnerable',
    image: 'https://images.unsplash.com/photo-1602491453979-02654b527221?auto=format&fit=crop&q=80&w=400'
  },
  elephant: {
    id: 'elephant',
    name: 'Asian Elephant',
    scientificName: 'Elephas maximus',
    basePopulation: 48400,
    baselineDecline: 0.025,
    threatFactors: { poaching: 28, deforestation: 82, climate: 40 },
    riskStatus: 'Endangered',
    image: 'https://images.unsplash.com/photo-1581852013878-2a09ed537700?auto=format&fit=crop&q=80&w=400'
  },
  rhino: {
    id: 'rhino',
    name: 'One-Horned Rhinoceros',
    scientificName: 'Rhinoceros unicornis',
    basePopulation: 3580,
    baselineDecline: 0.018,
    threatFactors: { poaching: 85, deforestation: 44, climate: 22 },
    riskStatus: 'Vulnerable',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
  }
};

// Ecosystem hotspots metadata for map
interface Hotspot {
  id: string;
  name: string;
  species: string;
  threat: string;
  coords: { x: number; y: number };
  status: 'Critical' | 'Alert' | 'Stable';
}

const hotspots: Hotspot[] = [
  { id: 'Sector-Alpha', name: 'Sundarbans Mangrove', species: 'Bengal Tiger', threat: 'Deforestation Spikes', coords: { x: 80, y: 160 }, status: 'Alert' },
  { id: 'Sector-Beta', name: 'Himalayan Ridge Grid', species: 'Snow Leopard', threat: 'Climate Warming', coords: { x: 220, y: 70 }, status: 'Stable' },
  { id: 'Sector-Gamma', name: 'Kaziranga Buffer Plain', species: 'Asian Elephant', threat: 'Encroaching Agriculture', coords: { x: 380, y: 130 }, status: 'Critical' },
  { id: 'Sector-Delta', name: 'Chitwan River Basin', species: 'One-Horned Rhino', threat: 'Poaching Activity Area', coords: { x: 180, y: 210 }, status: 'Alert' }
];

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Top header states
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Canopy coverage in Tiger Sector Alpha declined by 4.2%", time: "10 mins ago", unread: true },
    { id: 2, text: "Himalayan Ridge Grid sensor node re-established sync", time: "1 hr ago", unread: true },
    { id: 3, text: "High poaching risk registered at Kaziranga Sector Gamma", time: "4 hrs ago", unread: false }
  ]);

  // Predictor Tab States
  const [selectedSpeciesId, setSelectedSpeciesId] = useState('tiger');
  const [patrolsActive, setPatrolsActive] = useState(true);
  const [corridorsActive, setCorridorsActive] = useState(false);
  const [fundingSlider, setFundingSlider] = useState(50); // 0 to 100
  const [isSimulating, setIsSimulating] = useState(false);

  // Overview Tab States
  const [activeHotspotId, setActiveHotspotId] = useState('Sector-Alpha');
  const [weatherSanctuary, setWeatherSanctuary] = useState('sundarbans');

  const selectedSpecies = speciesList[selectedSpeciesId];
  const activeHotspot = hotspots.find(h => h.id === activeHotspotId) || hotspots[0];

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  // Weather data mapping
  const weatherData: Record<string, { name: string; temp: string; humidity: string; canopy: string; wind: string; cond: string }> = {
    sundarbans: { name: 'Sundarbans Reserve', temp: '31°C', humidity: '84%', canopy: '62%', wind: '14 km/h', cond: 'Heavy Monsoonal Rain' },
    hemis: { name: 'Hemis High Altitude', temp: '-4°C', humidity: '28%', canopy: '11%', wind: '22 km/h', cond: 'Sub-Zero Overcast' },
    kaziranga: { name: 'Kaziranga Grasslands', temp: '26°C', humidity: '78%', canopy: '74%', wind: '9 km/h', cond: 'Humid Haze' },
    chitwan: { name: 'Chitwan Forests', temp: '28°C', humidity: '66%', canopy: '54%', wind: '11 km/h', cond: 'Warm Humidity' }
  };

  const weather = weatherData[weatherSanctuary];

  // Pie chart distribution data
  const pieData = [
    { name: 'Mammals', value: 45, color: '#10b981' },
    { name: 'Birds', value: 25, color: '#34d399' },
    { name: 'Reptiles', value: 15, color: '#047857' },
    { name: 'Amphibians', value: 15, color: '#059669' }
  ];

  // Calculate dynamic intervention score based on toggles
  const calculateInterventionScore = () => {
    let score = fundingSlider * 0.4;
    if (patrolsActive) score += 35;
    if (corridorsActive) score += 25;
    return Math.round(score);
  };

  const interventionScore = calculateInterventionScore();

  // Generate Recharts Line data dynamically
  const generateProjectionData = () => {
    const data = [];
    const years = [2026, 2028, 2030, 2032, 2034, 2036];
    
    let currentBaseline = selectedSpecies.basePopulation;
    let currentPredicted = selectedSpecies.basePopulation;
    
    const baselineDecRate = selectedSpecies.baselineDecline * 2;
    const scoreFraction = interventionScore / 100;
    const predictedDecRate = baselineDecRate * (1 - scoreFraction) - (scoreFraction * 0.035);

    for (const year of years) {
      data.push({
        year: String(year),
        Baseline: Math.round(currentBaseline),
        Predicted: Math.round(currentPredicted)
      });
      
      currentBaseline = currentBaseline * (1 - baselineDecRate);
      currentPredicted = currentPredicted * (1 - predictedDecRate);
    }
    return data;
  };

  const projectionData = generateProjectionData();

  const handleRecalculate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 800);
  };

  // Render sub-sections based on active sidebar tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-fade-in text-left">
            
            {/* Welcome Banner */}
            <Card hoverable={false} className="border-emerald-500/20 bg-gradient-to-r from-brand-card/90 via-emerald-950/20 to-brand-card/90 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-wide">Welcome Back, Lead Conservator</h2>
                <p className="text-gray-400 text-xs md:text-sm mt-1">AI modeling environment synchronized. Species telemetry indices are operational.</p>
              </div>
              <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Active Model Node: Bengal-V4</span>
              </div>
            </Card>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card hoverable className="border-emerald-950/40 bg-brand-card/60">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Endangered Species</p>
                    <h3 className="text-3xl font-extrabold text-white mt-1">1,482</h3>
                  </div>
                  <div className="p-2.5 bg-red-950/40 border border-red-500/20 text-red-400 rounded-lg">
                    <FaSkullCrossbones />
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-4">Red List updates in progress</div>
              </Card>

              <Card hoverable className="border-emerald-950/40 bg-brand-card/60">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Sanctuary Corridors</p>
                    <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">154</h3>
                  </div>
                  <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-lg">
                    <FaTree />
                  </div>
                </div>
                <div className="text-xs text-emerald-500/80 mt-4">+12 new corridors pending</div>
              </Card>

              <Card hoverable className="border-emerald-950/40 bg-brand-card/60">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Average Climate Stress</p>
                    <h3 className="text-3xl font-extrabold text-amber-500 mt-1">Medium</h3>
                  </div>
                  <div className="p-2.5 bg-amber-950/40 border border-amber-500/20 text-amber-400 rounded-lg">
                    <FaCloudSun />
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-4">Canopy temperature anomalies</div>
              </Card>

              <Card hoverable className="border-emerald-950/40 bg-brand-card/60">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">AI Mitigation Rate</p>
                    <h3 className="text-3xl font-extrabold text-teal-400 mt-1">+14.6%</h3>
                  </div>
                  <div className="p-2.5 bg-teal-950/40 border border-teal-500/20 text-teal-400 rounded-lg">
                    <FaShieldAlt />
                  </div>
                </div>
                <div className="text-xs text-teal-500/80 mt-4">Based on applied interventions</div>
              </Card>
            </div>

            {/* Interactive Map & Weather Widget */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* SVG Map Panel */}
              <Card hoverable={false} className="lg:col-span-2 border-emerald-950/60 bg-brand-card/95 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-emerald-950/40 pb-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-emerald-500" />
                      <h3 className="font-bold text-white">Ecological Sanctuary Hotspots</h3>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">interactive vector mapping</span>
                  </div>

                  {/* Stylized vector map */}
                  <div className="relative">
                    <svg className="w-full h-64 bg-[#0a1210] rounded-xl border border-emerald-950/40 overflow-hidden" viewBox="0 0 500 280">
                      {/* Topographical grid lines */}
                      <path d="M -20 120 Q 150 90 280 190 T 520 170" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="6" />
                      <path d="M 120 -25 Q 190 130 290 190" fill="none" stroke="rgba(16, 185, 129, 0.1)" strokeWidth="3" />
                      
                      <line x1="100" y1="0" x2="100" y2="280" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
                      <line x1="200" y1="0" x2="200" y2="280" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
                      <line x1="300" y1="0" x2="300" y2="280" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
                      <line x1="400" y1="0" x2="400" y2="280" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
                      <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
                      <line x1="0" y1="200" x2="500" y2="200" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />

                      {/* Forests representations */}
                      <rect x="40" y="30" width="80" height="70" rx="12" fill="rgba(16, 185, 129, 0.04)" />
                      <rect x="360" y="40" width="90" height="60" rx="12" fill="rgba(16, 185, 129, 0.04)" />
                      <rect x="230" y="190" width="130" height="70" rx="12" fill="rgba(16, 185, 129, 0.04)" />

                      {/* Hotspots */}
                      {hotspots.map((spot) => {
                        const isActive = activeHotspotId === spot.id;
                        const statusColors = {
                          Critical: 'stroke-red-500 fill-red-500',
                          Alert: 'stroke-amber-500 fill-amber-500',
                          Stable: 'stroke-emerald-500 fill-emerald-500'
                        };
                        const colorClass = statusColors[spot.status];

                        return (
                          <g
                            key={spot.id}
                            onClick={() => setActiveHotspotId(spot.id)}
                            className="cursor-pointer group"
                          >
                            {/* Outer pulsing ping */}
                            <circle
                              cx={spot.coords.x}
                              cy={spot.coords.y}
                              r={isActive ? 12 : 8}
                              fill="none"
                              className="animate-ping origin-center"
                              stroke={spot.status === 'Critical' ? '#ef4444' : spot.status === 'Alert' ? '#f59e0b' : '#10b981'}
                              strokeWidth="2"
                              style={{ transformOrigin: `${spot.coords.x}px ${spot.coords.y}px` }}
                            />
                            {/* Center dot */}
                            <circle
                              cx={spot.coords.x}
                              cy={spot.coords.y}
                              r={isActive ? 6 : 4.5}
                              className={`transition-all duration-300 ${colorClass.split(' ')[1]}`}
                            />
                            {/* Label */}
                            <text
                              x={spot.coords.x + 10}
                              y={spot.coords.y + 4}
                              fill={isActive ? '#10b981' : '#9ca3af'}
                              fontSize="9"
                              className="font-mono font-bold transition-colors select-none opacity-60 group-hover:opacity-100"
                            >
                              {spot.id}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* Hotspot details output */}
                <div className="mt-4 p-3.5 bg-brand-bg/50 border border-emerald-950/50 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="text-xs space-y-1">
                    <p className="text-gray-400 font-semibold uppercase tracking-wider">Active Hotspot: <span className="text-white">{activeHotspot.name} ({activeHotspot.id})</span></p>
                    <p className="text-gray-500">Telemetry Target: <span className="text-emerald-400">{activeHotspot.species}</span> | Primary Danger: <span className="text-red-400">{activeHotspot.threat}</span></p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                    activeHotspot.status === 'Critical' 
                      ? 'bg-red-950/40 text-red-400 border-red-500/20' 
                      : activeHotspot.status === 'Alert' 
                      ? 'bg-amber-950/40 text-amber-400 border-amber-500/20' 
                      : 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {activeHotspot.status} Status
                  </span>
                </div>
              </Card>

              {/* Weather & Climate Widget */}
              <Card hoverable={false} className="lg:col-span-1 border-emerald-950/60 bg-brand-card/95 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-emerald-950/40 pb-3">
                    <div className="flex items-center space-x-2">
                      <FaCloudSun className="text-emerald-500" />
                      <h3 className="font-bold text-white">Habitat Climate Grid</h3>
                    </div>
                  </div>

                  {/* Sanctuary selectors */}
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    {[
                      { id: 'sundarbans', label: 'Sundarbans' },
                      { id: 'hemis', label: 'Hemis Ridge' },
                      { id: 'kaziranga', label: 'Kaziranga' },
                      { id: 'chitwan', label: 'Chitwan' }
                    ].map(btn => (
                      <button
                        key={btn.id}
                        onClick={() => setWeatherSanctuary(btn.id)}
                        className={`p-2 rounded-lg font-semibold transition-colors border ${
                          weatherSanctuary === btn.id
                            ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/20'
                            : 'bg-brand-bg/50 text-gray-400 border-transparent hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>

                  {/* Weather Indicators */}
                  <div className="space-y-4 pt-2">
                    <div className="text-center p-4 bg-brand-bg/30 border border-emerald-950/40 rounded-xl relative overflow-hidden">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">{weather.name}</p>
                      <h4 className="text-4xl font-extrabold text-white mt-2">{weather.temp}</h4>
                      <p className="text-xs text-emerald-400 mt-1 font-medium">{weather.cond}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2.5 bg-brand-bg/40 border border-emerald-950/30 rounded-xl">
                        <FaTint className="text-blue-400 mx-auto mb-1.5" />
                        <span className="block text-[10px] text-gray-500 font-semibold">Humidity</span>
                        <span className="block font-bold text-white mt-0.5">{weather.humidity}</span>
                      </div>
                      <div className="p-2.5 bg-brand-bg/40 border border-emerald-950/30 rounded-xl">
                        <FaTree className="text-emerald-500 mx-auto mb-1.5" />
                        <span className="block text-[10px] text-gray-500 font-semibold">Canopy Cover</span>
                        <span className="block font-bold text-white mt-0.5">{weather.canopy}</span>
                      </div>
                      <div className="p-2.5 bg-brand-bg/40 border border-emerald-950/30 rounded-xl">
                        <FaWind className="text-teal-400 mx-auto mb-1.5" />
                        <span className="block text-[10px] text-gray-500 font-semibold">Wind</span>
                        <span className="block font-bold text-white mt-0.5">{weather.wind}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-gray-500 leading-relaxed text-left border-t border-emerald-950/40 pt-4 mt-6">
                  * Meteorological feeds sync directly with climate sensors hourly.
                </div>
              </Card>

            </div>

            {/* Species Distribution & Recent Predictions Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Predictions Table */}
              <Card hoverable={false} className="lg:col-span-2 border-emerald-950/60 bg-brand-card/95 overflow-hidden">
                <div className="flex items-center justify-between border-b border-emerald-950/40 pb-3 mb-6">
                  <h3 className="font-bold text-white">Recent ML Population Forecast runs</h3>
                  <span className="text-[10px] font-mono text-gray-500">logger output</span>
                </div>

                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-emerald-950/60 text-gray-400 uppercase tracking-wider font-semibold">
                        <th className="pb-3 pr-2">Target Species</th>
                        <th className="pb-3 px-2">Model Type</th>
                        <th className="pb-3 px-2 text-center">Confidence</th>
                        <th className="pb-3 px-2 text-center">Horizon</th>
                        <th className="pb-3 pl-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-950/35">
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 pr-2 font-bold text-white">Bengal Tiger</td>
                        <td className="py-3.5 px-2 text-gray-300 font-mono">RandomForestRegressor</td>
                        <td className="py-3.5 px-2 text-center text-emerald-400 font-semibold">96.4%</td>
                        <td className="py-3.5 px-2 text-center text-gray-400">10 Years</td>
                        <td className="py-3.5 pl-2 text-right"><span className="bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-semibold">Completed</span></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 pr-2 font-bold text-white">Snow Leopard</td>
                        <td className="py-3.5 px-2 text-gray-300 font-mono">LSTMNeuralNetwork</td>
                        <td className="py-3.5 px-2 text-center text-emerald-400 font-semibold">94.8%</td>
                        <td className="py-3.5 px-2 text-center text-gray-400">10 Years</td>
                        <td className="py-3.5 pl-2 text-right"><span className="bg-red-950/40 text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-[10px] font-semibold">Alert (Decline)</span></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 pr-2 font-bold text-white">Asian Elephant</td>
                        <td className="py-3.5 px-2 text-gray-300 font-mono">ProphetTimeSeries</td>
                        <td className="py-3.5 px-2 text-center text-emerald-400 font-semibold">91.2%</td>
                        <td className="py-3.5 px-2 text-center text-gray-400">10 Years</td>
                        <td className="py-3.5 pl-2 text-right"><span className="bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-semibold">Completed</span></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 pr-2 font-bold text-white">One-Horned Rhino</td>
                        <td className="py-3.5 px-2 text-gray-300 font-mono">RidgeRegression</td>
                        <td className="py-3.5 px-2 text-center text-amber-400 font-semibold">89.5%</td>
                        <td className="py-3.5 px-2 text-center text-gray-400">10 Years</td>
                        <td className="py-3.5 pl-2 text-right"><span className="bg-amber-950/40 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-semibold">Stable</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Species Distribution Chart */}
              <Card hoverable={false} className="lg:col-span-1 border-emerald-950/60 bg-brand-card/95 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-emerald-950/40 pb-3 mb-6">
                    <h3 className="font-bold text-white">Telemetry Class Ratio</h3>
                    <span className="text-[10px] font-mono text-gray-500">species distribution</span>
                  </div>

                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#111a17',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Pie Chart Legend */}
                <div className="grid grid-cols-2 gap-2 text-left text-xs mt-4 pt-4 border-t border-emerald-950/40 text-gray-400">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.name} ({item.value}%)</span>
                    </div>
                  ))}
                </div>
              </Card>

            </div>

            {/* Recommendations Panel & Activity Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Recommendation Grid */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white tracking-wide">Suggested AI Conservation Policies</h3>
                  <button onClick={() => setActiveTab('recommendations')} className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold">View All Policies →</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Card hoverable className="border-emerald-950/40 bg-brand-card/60 flex flex-col justify-between text-left h-full">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="bg-red-950/50 border border-red-500/20 text-red-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Priority: Critical</span>
                        <span className="text-xs text-gray-500 font-mono">ID: AI-P12</span>
                      </div>
                      <h4 className="font-bold text-white text-base">Autonomous Drone Patrolling</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Deploy thermal-equipped AI drone swarms in high poaching regions to alert ranger units of illegal campfires or movement.
                      </p>
                    </div>
                    <div className="border-t border-emerald-950/30 pt-4 mt-6 flex justify-between items-center text-xs">
                      <span className="text-gray-400">Target: Bengal Tiger</span>
                      <Button variant="primary" size="sm" onClick={() => {
                        setSelectedSpeciesId('tiger');
                        setPatrolsActive(true);
                        setActiveTab('predictor');
                      }}>
                        Simulate
                      </Button>
                    </div>
                  </Card>

                  <Card hoverable className="border-emerald-950/40 bg-brand-card/60 flex flex-col justify-between text-left h-full">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="bg-amber-950/50 border border-amber-500/20 text-amber-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Priority: Medium</span>
                        <span className="text-xs text-gray-500 font-mono">ID: AI-P08</span>
                      </div>
                      <h4 className="font-bold text-white text-base">Community Eco-Insurance</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Subsidize livestock insurance in high-altitude communities to prevent retaliatory killings of leopards when stock is lost.
                      </p>
                    </div>
                    <div className="border-t border-emerald-950/30 pt-4 mt-6 flex justify-between items-center text-xs">
                      <span className="text-gray-400">Target: Snow Leopard</span>
                      <Button variant="primary" size="sm" onClick={() => {
                        setSelectedSpeciesId('leopard');
                        setFundingSlider(85);
                        setActiveTab('predictor');
                      }}>
                        Simulate
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Activity Timeline Widget */}
              <Card hoverable={false} className="lg:col-span-1 border-emerald-950/60 bg-brand-card/95 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-emerald-950/40 pb-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <FaRegClock className="text-emerald-500" />
                      <h3 className="font-bold text-white">System Activity Logs</h3>
                    </div>
                  </div>

                  {/* Vertical Timeline */}
                  <div className="space-y-6 relative text-xs pl-4 border-l border-emerald-950/50 ml-2">
                    <div className="relative">
                      {/* Circle indicator */}
                      <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-brand-card" />
                      <p className="text-[10px] text-emerald-400/80 font-bold uppercase tracking-wider">10:30 AM</p>
                      <p className="text-white font-semibold mt-0.5">Deforest variables ingested</p>
                      <p className="text-gray-500 text-[10px]">Satellite GIS layer scanned Sector Alpha.</p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-brand-card" />
                      <p className="text-[10px] text-emerald-400/80 font-bold uppercase tracking-wider">09:12 AM</p>
                      <p className="text-white font-semibold mt-0.5">LSTM Model retrained</p>
                      <p className="text-gray-500 text-[10px]">retrained model weights for Snow Leopard.</p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-500 border border-brand-card" />
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Yesterday</p>
                      <p className="text-gray-300 font-semibold mt-0.5">Threat Warnings Dispatched</p>
                      <p className="text-gray-500 text-[10px]">Dispatched automatic logs to regional rangers.</p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-500 border border-brand-card" />
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">2 Days Ago</p>
                      <p className="text-gray-300 font-semibold mt-0.5">Recommendations drafted</p>
                      <p className="text-gray-500 text-[10px]">Sector 12 mitigation corridor variables saved.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-emerald-950/40 pt-4">
                  <div className="flex items-center space-x-2 text-[10px] text-emerald-400/80 bg-emerald-950/20 px-2.5 py-1.5 rounded-lg border border-emerald-500/10">
                    <FaInfoCircle />
                    <span>Background workers are active and synced</span>
                  </div>
                </div>
              </Card>

            </div>
          </div>
        );

      case 'predictor':
        return (
          <div className="space-y-8 animate-fade-in text-left">
            {/* Control Board */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Species Selector and sliders */}
              <Card hoverable={false} className="lg:col-span-1 border-emerald-950/60 bg-brand-card/95 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 border-b border-emerald-950/40 pb-3">
                    <FaSlidersH className="text-emerald-500" />
                    <h3 className="font-bold text-white">Simulation Controls</h3>
                  </div>

                  {/* Species Selector */}
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 uppercase font-semibold">Select Target Species</label>
                    <select
                      value={selectedSpeciesId}
                      onChange={(e) => setSelectedSpeciesId(e.target.value)}
                      className="block w-full px-3 py-2.5 bg-brand-bg border border-emerald-950/60 rounded-xl text-sm text-white focus:outline-none"
                    >
                      <option value="tiger">Bengal Tiger (Panthera tigris)</option>
                      <option value="leopard">Snow Leopard (Panthera uncia)</option>
                      <option value="elephant">Asian Elephant (Elephas maximus)</option>
                      <option value="rhino">One-Horned Rhinoceros (R. unicornis)</option>
                    </select>
                  </div>

                  {/* Anti-poaching toggle */}
                  <div className="flex items-center justify-between p-3 bg-brand-bg/50 border border-emerald-950/40 rounded-xl">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Anti-Poaching Patrols</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">Increases forest guards by 40%</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={patrolsActive}
                        onChange={(e) => {
                          setPatrolsActive(e.target.checked);
                          handleRecalculate();
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>

                  {/* Forest corridors toggle */}
                  <div className="flex items-center justify-between p-3 bg-brand-bg/50 border border-emerald-950/40 rounded-xl">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Wildlife Corridors</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">Connects fragmented habitats</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={corridorsActive}
                        onChange={(e) => {
                          setCorridorsActive(e.target.checked);
                          handleRecalculate();
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>

                  {/* Funding Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-400 uppercase">Conservation Budget Allocation</span>
                      <span className="text-emerald-400">{fundingSlider}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={fundingSlider}
                      onChange={(e) => {
                        setFundingSlider(Number(e.target.value));
                        handleRecalculate();
                      }}
                      className="w-full h-1 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-emerald-950/40">
                  <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/20 rounded-xl text-center">
                    <span className="block text-[10px] text-gray-400 uppercase font-semibold">Calculated Protection Score</span>
                    <span className="block text-2xl font-extrabold text-emerald-400 mt-1">{interventionScore}/100</span>
                  </div>
                </div>
              </Card>

              {/* Projections graph */}
              <Card hoverable={false} className="lg:col-span-2 border-emerald-950/60 bg-brand-card/95 flex flex-col">
                <div className="flex justify-between items-center border-b border-emerald-950/40 pb-3 mb-6">
                  <div>
                    <h3 className="font-bold text-white">{selectedSpecies.name} Projections</h3>
                    <p className="text-xs text-gray-500 italic mt-0.5">{selectedSpecies.scientificName}</p>
                  </div>
                  <div className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${
                    selectedSpecies.riskStatus === 'Critical' 
                      ? 'bg-red-950/45 text-red-400 border-red-500/30' 
                      : 'bg-amber-950/45 text-amber-400 border-amber-500/30'
                  }`}>
                    {selectedSpecies.riskStatus}
                  </div>
                </div>

                {isSimulating ? (
                  <div className="flex-1 flex items-center justify-center min-h-[300px]">
                    <Loader size="md" label="Recalculating AI forecasting models..." />
                  </div>
                ) : (
                  <div className="flex-1 min-h-[300px] w-full text-xs">
                    <ResponsiveContainer width="100%" height={320}>
                      <LineChart data={projectionData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(16, 185, 129, 0.05)" />
                        <XAxis dataKey="year" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#111a17',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                        />
                        <Legend wrapperStyle={{ color: '#9ca3af', paddingTop: 10 }} />
                        <Line
                          type="monotone"
                          dataKey="Baseline"
                          stroke="#ef4444"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          name="Historical Baseline (Decline)"
                        />
                        <Line
                          type="monotone"
                          dataKey="Predicted"
                          stroke="#10b981"
                          strokeWidth={3}
                          activeDot={{ r: 8 }}
                          name="AI Predicted (With Interventions)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </Card>

            </div>
          </div>
        );

      case 'recommendations':
        return (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="max-w-3xl space-y-2">
              <h2 className="text-2xl font-bold text-white">AI Policy & Intervention Recommendations</h2>
              <p className="text-sm text-gray-400">
                EcoPredictAI has cross-referenced telemetry alerts with local variables to formulate these recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card hoverable className="border-emerald-950/40 bg-brand-card/60 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="bg-red-950/50 border border-red-500/20 text-red-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Priority: Critical</span>
                    <span className="text-xs text-gray-500 font-mono">ID: AI-P12</span>
                  </div>
                  <h4 className="font-bold text-white text-base">Autonomous Drone Patrolling</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Deploy thermal-equipped AI drone swarms in high poaching regions to alert ranger units of illegal campfires or movement.
                  </p>
                </div>
                <div className="border-t border-emerald-950/30 pt-4 mt-6 flex justify-between items-center text-xs">
                  <span className="text-gray-400">Target: Bengal Tiger</span>
                  <Button variant="primary" size="sm" onClick={() => {
                    setSelectedSpeciesId('tiger');
                    setPatrolsActive(true);
                    setActiveTab('predictor');
                  }}>
                    Simulate
                  </Button>
                </div>
              </Card>

              <Card hoverable className="border-emerald-950/40 bg-brand-card/60 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="bg-amber-950/50 border border-amber-500/20 text-amber-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Priority: Medium</span>
                    <span className="text-xs text-gray-500 font-mono">ID: AI-P08</span>
                  </div>
                  <h4 className="font-bold text-white text-base">Community Eco-Insurance</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Subsidize livestock insurance in high-altitude communities to prevent retaliatory killings of leopards when stock is lost.
                  </p>
                </div>
                <div className="border-t border-emerald-950/30 pt-4 mt-6 flex justify-between items-center text-xs">
                  <span className="text-gray-400">Target: Snow Leopard</span>
                  <Button variant="primary" size="sm" onClick={() => {
                    setSelectedSpeciesId('leopard');
                    setFundingSlider(85);
                    setActiveTab('predictor');
                  }}>
                    Simulate
                  </Button>
                </div>
              </Card>

              <Card hoverable className="border-emerald-950/40 bg-brand-card/60 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Priority: Optimal</span>
                    <span className="text-xs text-gray-500 font-mono">ID: AI-P04</span>
                  </div>
                  <h4 className="font-bold text-white text-base">Agricultural Buffer Zones</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Plant repellent crop barriers (like chili or citrus) on agricultural borders to prevent elephant crop raids and conflicts.
                  </p>
                </div>
                <div className="border-t border-emerald-950/30 pt-4 mt-6 flex justify-between items-center text-xs">
                  <span className="text-gray-400">Target: Asian Elephant</span>
                  <Button variant="primary" size="sm" onClick={() => {
                    setSelectedSpeciesId('elephant');
                    setCorridorsActive(true);
                    setActiveTab('predictor');
                  }}>
                    Simulate
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        );

      case 'habitat':
        return (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Habitat suitability stats */}
              <Card hoverable={false} className="border-emerald-950/60 bg-brand-card/95">
                <h3 className="font-bold text-white border-b border-emerald-950/40 pb-3 mb-6">Threat Factor Analysis</h3>
                <div className="h-[300px] w-full text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Poaching', value: selectedSpecies.threatFactors.poaching },
                        { name: 'Deforestation', value: selectedSpecies.threatFactors.deforestation },
                        { name: 'Climate Stress', value: selectedSpecies.threatFactors.climate }
                      ]}
                      margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(16, 185, 129, 0.05)" />
                      <XAxis dataKey="name" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#111a17',
                          border: '1px solid rgba(16, 185, 129, 0.2)',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Bar dataKey="value" name="Threat Intensity %" radius={[6, 6, 0, 0]}>
                        <Cell fill="#f87171" />
                        <Cell fill="#f59e0b" />
                        <Cell fill="#60a5fa" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Environmental variables feedback */}
              <Card hoverable={false} className="border-emerald-950/60 bg-brand-card/95 p-6 space-y-6">
                <h3 className="font-bold text-white border-b border-emerald-950/40 pb-3">Habitat Variables Metrics</h3>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Deforestation Rate:</span>
                      <span className="text-amber-500 font-semibold">{selectedSpecies.threatFactors.deforestation}% Critical</span>
                    </div>
                    <div className="h-2 w-full bg-emerald-950 rounded-full">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${selectedSpecies.threatFactors.deforestation}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Poaching Incident Frequency:</span>
                      <span className="text-red-400 font-semibold">{selectedSpecies.threatFactors.poaching}% High</span>
                    </div>
                    <div className="h-2 w-full bg-emerald-950 rounded-full">
                      <div className="h-full bg-red-400 rounded-full" style={{ width: `${selectedSpecies.threatFactors.poaching}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Climatic Heat Stress:</span>
                      <span className="text-blue-400 font-semibold">{selectedSpecies.threatFactors.climate}% Stress</span>
                    </div>
                    <div className="h-2 w-full bg-emerald-950 rounded-full">
                      <div className="h-full bg-blue-400 rounded-full" style={{ width: `${selectedSpecies.threatFactors.climate}%` }} />
                    </div>
                  </div>
                </div>

                <div className="pt-4 text-xs text-gray-400 leading-relaxed bg-emerald-950/10 border border-emerald-950/50 p-3 rounded-lg">
                  <strong>Ecologist Recommendation:</strong> To stabilize this species, priorities must shift toward reducing poaching incidents below 30% and implementing local buffer zones.
                </div>
              </Card>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-brand-bg text-white relative">
      
      {/* Mobile Sidebar Toggle Header (Dashboard scope only) */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 text-white shadow-xl focus:outline-none"
        >
          <FaBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar Panel */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
      />

      {/* Main Dashboard Space */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full relative">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between border-b border-emerald-950/40 pb-5 gap-4">
          <div className="text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-white capitalize">
              {activeTab === 'overview' ? 'AI Dashboard Overview' : activeTab}
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              {activeTab === 'overview' && 'System overview and real-time biological alerts.'}
              {activeTab === 'predictor' && 'Simulate population dynamics and conservation policy impacts.'}
              {activeTab === 'recommendations' && 'AI recommendations to optimize biological corridors.'}
              {activeTab === 'habitat' && 'GIS deforestation variables and climate risk indexing.'}
            </p>
          </div>
          
          {/* Sub Header controls: Notification & reload models */}
          <div className="flex items-center space-x-3 self-start md:self-center relative">
            
            {/* Notifications Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-800/30 rounded-xl text-emerald-400 transition-colors focus:outline-none"
              >
                <FaBell className="h-4.5 w-4.5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Float Panel Notifications */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-3 w-80 z-50 bg-[#111a17] border border-emerald-950/60 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-left space-y-3">
                    <div className="flex justify-between items-center border-b border-emerald-950/40 pb-2.5">
                      <span className="text-xs font-bold text-white">System Notifications</span>
                      <button onClick={markAllRead} className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold focus:outline-none">Mark all read</button>
                    </div>

                    <div className="space-y-2.5 divide-y divide-emerald-950/30 max-h-60 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div key={notif.id} className={`pt-2.5 first:pt-0 text-xs flex flex-col space-y-1 ${notif.unread ? 'text-white' : 'text-gray-400'}`}>
                          <div className="flex items-start justify-between">
                            <span className="leading-relaxed">{notif.text}</span>
                            {notif.unread && <span className="w-1.5 h-1.5 min-w-[6px] rounded-full bg-emerald-500 mt-1.5 ml-2" />}
                          </div>
                          <span className="text-[9px] text-gray-500 font-mono">{notif.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRecalculate}
              isLoading={isSimulating}
              className="flex items-center space-x-2"
            >
              <FaSyncAlt className="h-3 w-3" />
              <span>Reload Models</span>
            </Button>
          </div>
        </div>

        {/* Dynamic Inner Tab */}
        {renderContent()}
      </main>
    </div>
  );
};
