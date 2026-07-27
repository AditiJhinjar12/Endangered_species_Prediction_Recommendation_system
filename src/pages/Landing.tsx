import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowRight,
  FaShieldAlt,
  FaMapMarkedAlt,
  FaBrain,
  FaSlidersH,
  FaLeaf,
  FaChevronRight,
  FaSatellite,
  FaClipboardList,
  FaMailBulk,
  FaMapMarkerAlt,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaTimes
} from 'react-icons/fa';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ImageWithFallback } from '../components/ImageWithFallback';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

interface SpeciesItem {
  id: string;
  name: string;
  scientificName: string;
  status: string;
  population: string;
  threatLevel: 'Critical' | 'High' | 'Medium';
  image: string;
  fallbackImage: string;
  habitat: string;
  description: string;
}

const speciesDataList: SpeciesItem[] = [
  {
    id: 'tiger',
    name: 'Bengal Tiger',
    scientificName: 'Panthera tigris tigris',
    status: 'Endangered',
    population: '3,890',
    threatLevel: 'High',
    image: 'https://images.unsplash.com/photo-1552410260-0fd9b577afa6?auto=format&fit=crop&q=80&w=800',
    fallbackImage: '/assets/species/tiger.svg',
    habitat: 'Sundarbans Mangroves',
    description: 'Threatened by deforestation, climate-induced sea level rises in the mangroves, and poaching vectors.'
  },
  {
    id: 'leopard',
    name: 'Snow Leopard',
    scientificName: 'Panthera uncia',
    status: 'Vulnerable',
    population: '4,500',
    threatLevel: 'High',
    image: 'https://images.unsplash.com/photo-1602491453979-02654b527221?auto=format&fit=crop&q=80&w=800',
    fallbackImage: '/assets/species/leopard.svg',
    habitat: 'Himalayan High Altitudes',
    description: 'Under severe stress from melting glacier sheets, habitat shrinkage, and retaliatory livestock killings.'
  },
  {
    id: 'elephant',
    name: 'Asian Elephant',
    scientificName: 'Elephas maximus',
    status: 'Endangered',
    population: '48,400',
    threatLevel: 'High',
    image: 'https://images.unsplash.com/photo-1581852013878-2a09ed537700?auto=format&fit=crop&q=80&w=800',
    fallbackImage: '/assets/species/elephant.svg',
    habitat: 'Kaziranga Forest Corridors',
    description: 'Primary threats include agricultural encroachment blocking migration corridors and ivory poaching.'
  },
  {
    id: 'redpanda',
    name: 'Red Panda',
    scientificName: 'Ailurus fulgens',
    status: 'Endangered',
    population: '10,000',
    threatLevel: 'High',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=800',
    fallbackImage: '/assets/species/redpanda.svg',
    habitat: 'Eastern Himalayan Forests',
    description: 'Struggling with high forest fragmentation, bamboo loss, and domestic dog disease transmissions.'
  },
  {
    id: 'rhino',
    name: 'One-Horned Rhinoceros',
    scientificName: 'Rhinoceros unicornis',
    status: 'Vulnerable',
    population: '3,580',
    threatLevel: 'Critical',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    fallbackImage: '/assets/species/rhino.svg',
    habitat: 'Chitwan Alluvial Plains',
    description: 'Recovering slowly from critical poaching pressures and riverbed agricultural encroachments.'
  },
  {
    id: 'turtle',
    name: 'Olive Ridley Turtle',
    scientificName: 'Lepidochelys olivacea',
    status: 'Vulnerable',
    population: '800,000 nests',
    threatLevel: 'Medium',
    image: 'https://images.unsplash.com/photo-1437622368342-7a3d70133ec6?auto=format&fit=crop&q=80&w=800',
    fallbackImage: '/assets/species/turtle.svg',
    habitat: 'Odisha Marine Coasts',
    description: 'Nesting areas face severe shoreline light pollution, tourist litter, and trawler net entanglements.'
  },
  {
    id: 'blackbuck',
    name: 'Blackbuck Antelope',
    scientificName: 'Antilope cervicapra',
    status: 'Least Concern',
    population: '50,000',
    threatLevel: 'Medium',
    image: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=800',
    fallbackImage: '/assets/species/blackbuck.svg',
    habitat: 'Deccan Dry Grasslands',
    description: 'Fenced highways, stray dog packs, and local crop protection conflicts threaten grassland herds.'
  },
  {
    id: 'bustard',
    name: 'Great Indian Bustard',
    scientificName: 'Ardeotis nigriceps',
    status: 'Critically Endangered',
    population: '150',
    threatLevel: 'Critical',
    image: 'https://images.unsplash.com/photo-1579242259633-f82665e561a1?auto=format&fit=crop&q=80&w=800',
    fallbackImage: '/assets/species/bustard.svg',
    habitat: 'Thar Desert Scrublands',
    description: 'Extremely vulnerable to high-voltage power lines collisions and intensive land usage shifts.'
  }
];

export const Landing: React.FC = () => {
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesItem | null>(null);
  
  // Interactive prediction variables on landing page
  const [patrolMultiplier, setPatrolMultiplier] = useState(50);
  const [recalcGlow, setRecalcGlow] = useState(false);

  // Read URL Hash on mount to support smooth scrolls from other pages
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, []);

  const handleRecalc = () => {
    setRecalcGlow(true);
    setTimeout(() => setRecalcGlow(false), 600);
  };

  // Generate dynamic line chart projection for landing demo
  const getDynamicTrendData = () => {
    const years = [2026, 2028, 2030, 2032, 2034, 2036];
    let baselineVal = 3500;
    let predictedVal = 3500;
    
    const factor = patrolMultiplier / 100;
    const data = [];

    for (const year of years) {
      data.push({
        year: String(year),
        Baseline: Math.round(baselineVal),
        Predicted: Math.round(predictedVal)
      });
      baselineVal *= 0.93; // 7% decline every 2 years
      // At multiplier 100, predicted value gains 3% every 2 years.
      predictedVal *= (0.93 + (factor * 0.1));
    }
    return data;
  };

  const trendData = getDynamicTrendData();

  return (
    <div className="bg-brand-bg text-white relative" id="home">
      
      {/* Parallax Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Forest background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1920"
            alt="Forest Canopy"
            className="w-full h-full object-cover opacity-35 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/10 via-brand-bg/60 to-brand-bg" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-transparent to-brand-bg" />
        </div>

        {/* Floating AI Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-lime-600/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-emerald-950/40 border border-emerald-500/20 px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-400"
          >
            <FaBrain className="animate-pulse" />
            <span>AI-Driven Predictive Wildlife Ecology</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none max-w-4xl mx-auto"
          >
            Protect Endangered Species with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-lime-300">
              Artificial Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Predict future wildlife populations using AI-driven analytics and conservation recommendations. Simulate ecological variables to mitigate threat indicators.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/dashboard">
              <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center space-x-2">
                <span>Get Started</span>
                <FaArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <button
              onClick={() => {
                const spec = document.getElementById('species');
                if (spec) spec.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto"
            >
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Species
              </Button>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Statistics Grid Section */}
      <section className="relative z-10 bg-brand-card/30 border-y border-brand-border/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            {[
              { value: '1,482', label: 'Total Species Monitored', color: 'text-white' },
              { value: '340', label: 'Critically Endangered', color: 'text-red-400' },
              { value: '154', label: 'Protected Habitats', color: 'text-emerald-400' },
              { value: '94.8%', label: 'Prediction Accuracy', color: 'text-lime-400' },
              { value: '85+', label: 'Conservation Projects', color: 'text-blue-400' }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-1.5 border-r last:border-0 border-brand-border/30">
                <div className={`text-2xl sm:text-3xl font-extrabold ${stat.color}`}>{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest font-semibold px-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Species Section */}
      <section id="species" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-brand-border/40 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Featured Endangered Species</h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Biospatial telemetry mapping for critical target organisms across dry grasslands, sub-zero heights, and river deltas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {speciesDataList.map((item) => (
            <Card key={item.id} className="flex flex-col justify-between text-left h-full border-brand-border/60 bg-brand-card/50 overflow-hidden relative group">
              <div className="space-y-4">
                {/* Image container */}
                <div className="relative h-44 rounded-xl overflow-hidden mb-2">
                  <ImageWithFallback
                    src={item.image}
                    fallbackSrc={item.fallbackImage}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-card/90 via-transparent to-transparent" />
                  <span className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase border ${
                    item.threatLevel === 'Critical'
                      ? 'bg-red-950/60 text-red-400 border-red-500/30'
                      : 'bg-amber-950/60 text-amber-400 border-amber-500/30'
                  }`}>
                    {item.threatLevel} Threat
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white tracking-wide">{item.name}</h3>
                  <p className="text-xs text-gray-500 italic">{item.scientificName}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-[10px] text-gray-400 bg-brand-bg/40 p-2.5 rounded-xl border border-brand-border/40">
                  <div>
                    <span className="block text-gray-500 text-[8px] uppercase">Status</span>
                    <span className="font-semibold text-white">{item.status}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 text-[8px] uppercase">Population</span>
                    <span className="font-semibold text-white">{item.population}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button variant="outline" size="sm" onClick={() => setSelectedSpecies(item)} className="w-full text-center">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* AI Prediction Module Section */}
      <section id="prediction" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-brand-border/40 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">AI Population Forecasting Module</h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Drag the slider controls to simulate conservation measures and view future projections of species recovery curves instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Simulation controls */}
          <Card hoverable={false} className="lg:col-span-4 border-brand-border/60 bg-brand-card/95 flex flex-col justify-between text-left">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 border-b border-brand-border/40 pb-3">
                <FaSlidersH className="text-emerald-500" />
                <h3 className="font-bold text-white text-base">Model Simulation Controls</h3>
              </div>

              {/* Slider 1 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-400">Patrol intensity & guards</span>
                  <span className="text-emerald-400">{patrolMultiplier}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={patrolMultiplier}
                  onChange={(e) => {
                    setPatrolMultiplier(Number(e.target.value));
                    handleRecalc();
                  }}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Info panel */}
              <div className="p-3 bg-brand-bg/50 border border-brand-border/40 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Active ML Classifier:</span>
                  <span className="text-white font-mono">LSTMRegressor-v2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Model Convergence:</span>
                  <span className="text-emerald-400 font-mono">94.8% accuracy</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-brand-border/40">
              <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl flex items-center space-x-2.5 text-xs text-emerald-400">
                <FaShieldAlt className="animate-pulse" />
                <span>Intervention parameters actively update the chart</span>
              </div>
            </div>
          </Card>

          {/* Recharts chart */}
          <Card hoverable={false} className="lg:col-span-8 border-brand-border/60 bg-brand-card/95 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-brand-border/40 pb-3 mb-6">
              <h4 className="font-bold text-white text-sm sm:text-base">10-Year Species Recovery curve simulation</h4>
              <span className="text-[10px] font-mono text-gray-500">values indexed in real-time</span>
            </div>

            {recalcGlow ? (
              <div className="flex-1 flex items-center justify-center min-h-[260px] text-emerald-400 font-semibold text-xs animate-pulse">
                Running regression matrix simulations...
              </div>
            ) : (
              <div className="flex-1 min-h-[260px] text-xs">
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.02)" />
                    <XAxis dataKey="year" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Legend wrapperStyle={{ color: '#9ca3af', paddingTop: 10 }} />
                    <Line type="monotone" dataKey="Baseline" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" name="Baseline (Decline)" />
                    <Line type="monotone" dataKey="Predicted" stroke="#10b981" strokeWidth={3} name="AI Simulated Prediction" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>
        </div>

        {/* Prediction Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <Card hoverable className="border-brand-border/60 bg-brand-card/50 flex flex-col justify-between text-left p-5">
            <div className="space-y-2">
              <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Metrics</span>
              <h4 className="font-bold text-white text-sm">Population Trend</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Projected 10-year simulated population recovery curves using dynamic intervention parameters.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brand-border/30 text-emerald-400 font-semibold text-xs flex justify-between">
              <span>Projection</span>
              <span>+12.4% Recovery</span>
            </div>
          </Card>

          <Card hoverable className="border-brand-border/60 bg-brand-card/50 flex flex-col justify-between text-left p-5">
            <div className="space-y-2">
              <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Parameters</span>
              <h4 className="font-bold text-white text-sm">AI Accuracy</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Deep learning LSTM regression network converging with minimal validation loss.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brand-border/30 text-emerald-400 font-semibold text-xs flex justify-between">
              <span>Model Confidence</span>
              <span>94.8% Acc.</span>
            </div>
          </Card>

          <Card hoverable className="border-brand-border/60 bg-brand-card/50 flex flex-col justify-between text-left p-5">
            <div className="space-y-2">
              <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Vulnerability</span>
              <h4 className="font-bold text-white text-sm">Risk Analysis</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Continuous threat evaluation assessing poaching hotspots, climate warming, and land degradation.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brand-border/30 text-emerald-400 font-semibold text-xs flex justify-between">
              <span>Poaching Risk</span>
              <span>Reduced 54%</span>
            </div>
          </Card>

          <Card hoverable className="border-brand-border/60 bg-brand-card/50 flex flex-col justify-between text-left p-5">
            <div className="space-y-2">
              <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Timeline</span>
              <h4 className="font-bold text-white text-sm">Future Forecast</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Ecological stabilization timeline mapping the point of species self-sustainment.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brand-border/30 text-emerald-400 font-semibold text-xs flex justify-between">
              <span>Stabilization</span>
              <span>By 2032</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Recommendation Module Section */}
      <section id="recommendation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-brand-border/40 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">AI Recommended Conservation Interventions</h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Specific, policy-grade intervention templates developed by the recommendation engine based on local threat telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Habitat Corridor Protection', desc: 'Secure land links between wildlife zones to mitigate human-wildlife encounters and safeguard paths.' },
            { title: 'Genomics Breeding Programs', desc: 'Synthesize genetic diversity matrices to coordinate relocation schedules and combat inbreeding.' },
            { title: 'Afforestation & Forest Restoration', desc: 'Use satellite GIS deforest indices to replant indigenous bamboo and canopy cover.' },
            { title: 'Anti-Poaching Patrolling', desc: 'Deploy thermal-imaging swarm drones and set up patrol routes using poaching likelihood arrays.' },
            { title: 'Climate Change Adaptation', desc: 'Locate high-altitude ecosystems suitable as long-term micro-climate refuges.' },
            { title: 'Community Bio-Awareness', desc: 'Set up local buffer zone livestock insurance schemes to reduce retaliatory killings.' }
          ].map((item, idx) => (
            <Card key={idx} className="flex flex-col text-left space-y-4 border-brand-border/60 bg-brand-card/60">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/45 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                <FaLeaf />
              </div>
              <h4 className="font-bold text-white text-base tracking-wide">{item.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Analytics Dashboard Preview Section */}
      <section id="analytics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-brand-border/40 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Analytics Dashboard Telemetry Preview</h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            View regional sensor maps, coordinates, and real-time biological charts in the client environment portal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map Preview */}
          <Card hoverable={false} className="lg:col-span-7 border-brand-border/60 bg-brand-card/95 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between border-b border-brand-border/40 pb-3 mb-6">
                <div className="flex items-center space-x-2">
                  <FaMapMarkedAlt className="text-emerald-500" />
                  <h3 className="font-bold text-white">Sanctuary Hotspot Grid</h3>
                </div>
                <span className="text-[10px] font-mono text-gray-500">GIS preview map</span>
              </div>

              {/* Minimal SVG map mockup */}
              <div className="relative">
                <svg className="w-full h-56 bg-[#0a1210] rounded-xl border border-brand-border/40" viewBox="0 0 400 200">
                  <path d="M -10 90 Q 150 70 280 150 T 420 130" fill="none" stroke="rgba(16, 185, 129, 0.12)" strokeWidth="4" />
                  <circle cx="100" cy="110" r="5" fill="#ef4444" className="animate-pulse" />
                  <circle cx="280" cy="80" r="5" fill="#fbbf24" className="animate-pulse" />
                  <circle cx="180" cy="140" r="5" fill="#10b981" />
                  <text x="112" y="113" fill="#9ca3af" fontSize="8" className="font-mono">Zone-01 [ALERT]</text>
                  <text x="292" y="83" fill="#9ca3af" fontSize="8" className="font-mono">Zone-04 [STABLE]</text>
                </svg>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center text-xs text-gray-400">
              <span>Synchronized: 3 Core Zones</span>
              <Link to="/dashboard">
                <button className="text-emerald-400 font-semibold hover:text-emerald-300 flex items-center space-x-1">
                  <span>Enter Dashboard Portal</span>
                  <FaChevronRight className="h-3 w-3" />
                </button>
              </Link>
            </div>
          </Card>

          {/* Quick Metrics previews */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6 text-left">
            <Card hoverable className="border-brand-border/60 bg-brand-card/60 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Sensor Ingestion</p>
                  <h4 className="text-2xl font-bold text-white mt-1">12,482 / min</h4>
                </div>
                <div className="p-2 bg-emerald-950/50 text-emerald-400 rounded-lg border border-emerald-800/30">
                  <FaSatellite />
                </div>
              </div>
              <span className="text-[10px] text-gray-500 mt-4">Real-time GCS bio-signals active.</span>
            </Card>

            <Card hoverable className="border-brand-border/60 bg-brand-card/60 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Model Evaluations</p>
                  <h4 className="text-2xl font-bold text-white mt-1">Ready</h4>
                </div>
                <div className="p-2 bg-emerald-950/50 text-emerald-400 rounded-lg border border-emerald-800/30">
                  <FaClipboardList />
                </div>
              </div>
              <span className="text-[10px] text-emerald-400 mt-4 font-semibold">10-Year projections calculated.</span>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Research / Reports Section */}
      <section id="research" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-brand-border/40 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Platform Insights & Latest Research</h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Academic research briefs and artificial intelligence insight updates for biospatial monitoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { date: 'Jul 24, 2026', title: 'LSTM population regression modeling', body: 'Researching neural net stability when processing sparse field observations and telemetry.' },
            { date: 'Jul 18, 2026', title: 'Deforestation tracking with GIS satellites', body: 'Utilizing Sentinel imagery layers to calculate canopy loss correlations against local elephant populations.' },
            { date: 'Jul 10, 2026', title: 'Acoustic swarm telemetry', body: 'Analyzing the deployment of forest edge microphone arrays to detect gunshot waveforms using classification models.' }
          ].map((card, idx) => (
            <Card key={idx} className="flex flex-col text-left justify-between h-full border-brand-border/60 bg-brand-card/60">
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded border border-emerald-500/20">{card.date}</span>
                <h4 className="font-bold text-white text-base tracking-wide pt-1">{card.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{card.body}</p>
              </div>
              <div className="pt-6 border-t border-brand-border/30 mt-6">
                <button className="text-xs text-emerald-400 font-semibold hover:text-emerald-300">Read Brief Document →</button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* About ESPR-AI Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-brand-border/40 text-center relative overflow-hidden">
        {/* Floating gradient circles for glassmorphism background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">About ESPR-AI Platform</h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Developing a System for Endangered Species Population Prediction & Recommendation using Artificial Intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
          {/* Mission Details */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-wide">
              AI-Powered Ecological Preservation
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              The ESPR-AI framework is designed to bridge the gap between machine learning and active conservation. By processing multi-spectral satellite imagery, sensor telemetry, and historical climate datasets, our system projects population counts and evaluates habitat suitability coefficients.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Unlike static observation reports, our engine simulates the direct impact of conservation policies—such as increased anti-poaching patrols or forest buffer zones—to provide wildlife officers and governments with actionable, data-backed recommendation templates.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border border-brand-border/60 bg-brand-card/30 p-4 rounded-xl">
                <span className="block text-2xl font-extrabold text-emerald-400">94.8%</span>
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest font-semibold mt-1">Convergence</span>
              </div>
              <div className="border border-brand-border/60 bg-brand-card/30 p-4 rounded-xl">
                <span className="block text-2xl font-extrabold text-lime-400">Real-Time</span>
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest font-semibold mt-1">GIS Telemetry</span>
              </div>
            </div>
          </div>

          {/* Visual Architecture Representation */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-lime-500/5 rounded-2xl filter blur-xl animate-pulse" />
            <Card hoverable={false} className="border-brand-border/60 bg-brand-card/80 p-8 relative z-10 space-y-6">
              <h4 className="font-bold text-white border-b border-brand-border/40 pb-3">Platform Architecture</h4>
              
              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-center space-x-3 bg-brand-bg/40 p-3 rounded-lg border border-brand-border/30">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <div className="flex-1">
                    <span className="block text-gray-400 text-[9px] uppercase">Data Source Ingestion</span>
                    <span className="text-white">Satellite GIS + Sound Sensor Swarms</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-brand-bg/40 p-3 rounded-lg border border-brand-border/30">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <div className="flex-1">
                    <span className="block text-gray-400 text-[9px] uppercase">AI Analytics Engine</span>
                    <span className="text-white">LSTM Neural Net + Random Forest</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-brand-bg/40 p-3 rounded-lg border border-brand-border/30">
                  <div className="w-2.5 h-2.5 rounded-full bg-lime-500" />
                  <div className="flex-1">
                    <span className="block text-gray-400 text-[9px] uppercase">Mitigation Synthesis</span>
                    <span className="text-white">Policy Recommendation Templates</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Sanctuary Network Coordination</h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Reach out to integrate regional sensors, report field observations, or collaborate on conservation models.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          {/* Contact Details */}
          <Card hoverable={false} className="lg:col-span-5 border-brand-border/60 bg-brand-card/95 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-bold text-white text-lg">Platform Node Coordinates</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Our models run synchronized with active ecological nodes situated in key national parks and biosphere grids.
              </p>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-emerald-500" />
                  <div>
                    <p className="text-gray-500 text-[10px] uppercase">Central Server Node</p>
                    <p className="text-white">Sundarbans Sector 4, WB, India</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FaMailBulk className="text-emerald-500" />
                  <div>
                    <p className="text-gray-500 text-[10px] uppercase">Inquiries & Integration</p>
                    <p className="text-white">integrations@ecopredict.ai</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-brand-border/40 flex space-x-4">
              <a href="https://twitter.com" className="p-2 bg-slate-800 hover:bg-emerald-600 text-gray-400 hover:text-white rounded-xl transition-all cursor-pointer"><FaTwitter /></a>
              <a href="https://linkedin.com" className="p-2 bg-slate-800 hover:bg-emerald-600 text-gray-400 hover:text-white rounded-xl transition-all cursor-pointer"><FaLinkedin /></a>
              <a href="https://github.com" className="p-2 bg-slate-800 hover:bg-emerald-600 text-gray-400 hover:text-white rounded-xl transition-all cursor-pointer"><FaGithub /></a>
            </div>
          </Card>

          {/* Contact Form */}
          <Card hoverable={false} className="lg:col-span-7 border-brand-border/60 bg-brand-card/95">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Your Name</label>
                  <input
                    type="text"
                    placeholder="Ecologist / Researcher"
                    className="block w-full px-3 py-2 bg-brand-bg border border-brand-border/60 focus:border-emerald-500 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@institution.org"
                    className="block w-full px-3 py-2 bg-brand-bg border border-brand-border/60 focus:border-emerald-500 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Message & Sanctuary coordinates</label>
                <textarea
                  rows={4}
                  placeholder="Detail sensory inputs or model collaboration requests..."
                  className="block w-full px-3 py-2 bg-brand-bg border border-brand-border/60 focus:border-emerald-500 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full py-2.5">
                Send Integration Request
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Species Details Modal Dialog */}
      <AnimatePresence>
        {selectedSpecies && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSpecies(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-xl bg-brand-card border border-brand-border/80 rounded-2xl p-6 shadow-2xl text-left space-y-4"
            >
              <button
                onClick={() => setSelectedSpecies(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
              >
                <FaTimes />
              </button>

              <div className="flex items-center space-x-4 border-b border-brand-border/40 pb-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-brand-bg">
                  <ImageWithFallback
                    src={selectedSpecies.image}
                    fallbackSrc={selectedSpecies.fallbackImage}
                    alt={selectedSpecies.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedSpecies.name}</h3>
                  <p className="text-xs text-gray-400 italic">{selectedSpecies.scientificName}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-gray-300">
                <p><strong>Primary Habitat:</strong> {selectedSpecies.habitat}</p>
                <p><strong>Estimated Population:</strong> {selectedSpecies.population} remaining</p>
                <p><strong>Current Threat Level:</strong> <span className="text-red-400 font-semibold">{selectedSpecies.threatLevel}</span></p>
                <p className="border-t border-brand-border/30 pt-3 text-gray-400">{selectedSpecies.description}</p>
              </div>

              <div className="pt-4 border-t border-brand-border/40 flex space-x-3">
                <Link to="/dashboard" className="flex-1">
                  <Button variant="primary" className="w-full py-2 flex items-center justify-center space-x-1 text-xs">
                    <span>Analyze in Dashboard</span>
                    <FaArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
                <Button variant="secondary" onClick={() => setSelectedSpecies(null)} className="px-4 py-2 text-xs">
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
