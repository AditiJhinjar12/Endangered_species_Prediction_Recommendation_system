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
  FaMailBulk,
  FaMapMarkerAlt,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaTimes,
  FaDna,
  FaGlobe,
  FaHeartbeat,
  FaDatabase
} from 'react-icons/fa';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ImageWithFallback } from '../components/ImageWithFallback';
import holographicTiger from '../assets/holographic_tiger.png';
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
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-tech-grid">
        {/* Floating background neon gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/6 left-1/5 w-[500px] h-[500px] rounded-full bg-neon-cyan/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/5 right-1/4 w-[450px] h-[450px] rounded-full bg-neon-emerald/5 blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg-darker/40 via-brand-bg-darker/90 to-brand-bg-darker" />
        </div>

        {/* Technical dot pattern overlay */}
        <div className="absolute inset-0 bg-tech-dots opacity-40 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Title and Actions */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-neon-cyan/10 border border-neon-cyan/35 px-4.5 py-1.5 rounded-full text-xs font-semibold text-neon-blue uppercase tracking-widest self-start"
              >
                <FaBrain className="animate-pulse text-neon-cyan text-sm" />
                <span>Predictive Ecological AI Core</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-6.5xl font-extrabold tracking-tight leading-tight text-white"
              >
                Defy Extinction with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-green glow-text-cyan font-mono uppercase tracking-wide">
                  Antigravity AI
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-300 text-sm sm:text-base max-w-xl leading-relaxed"
              >
                Simulate micro-gravity conservation fields, predict endangered species populations using LSTM-driven regression matrices, and receive high-accuracy conservation recommendation templates.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="pt-4 flex flex-col sm:flex-row items-center gap-4"
              >
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center space-x-2.5 bg-gradient-to-r from-neon-blue to-neon-cyan shadow-[0_0_20px_rgba(6,182,212,0.35)] text-black font-extrabold hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] border-none">
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
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-neon-emerald/50 hover:bg-neon-emerald/10 text-neon-emerald hover:text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    Explore Species
                  </Button>
                </button>
              </motion.div>

              {/* Live Technical Metrics */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="pt-6 border-t border-brand-border/30 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] text-gray-400"
              >
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-neon-green animate-ping" />
                  <span>AI CORE: <span className="text-white font-bold">ONLINE</span></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                  <span>GRID CONVERGENCE: <span className="text-white font-bold">94.8%</span></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-neon-blue" />
                  <span>ANTIGRAVITY FIELD: <span className="text-neon-cyan font-bold">SUSPENDED</span></span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Holographic Tiger Centerpiece */}
            <div className="lg:col-span-5 flex items-center justify-center relative min-h-[480px]">
              
              {/* Floating particles background simulating antigravity */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute bottom-10 left-10 w-1.5 h-1.5 rounded-full bg-neon-cyan opacity-60 animate-bounce" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-32 right-12 w-2 h-2 rounded-full bg-neon-green opacity-40 animate-bounce" style={{ animationDuration: '6s' }} />
                <div className="absolute top-20 left-1/3 w-1 h-1 rounded-full bg-neon-blue opacity-50 animate-bounce" style={{ animationDuration: '5s' }} />
              </div>

              {/* Central Hologram Ring */}
              <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center">
                
                {/* Outermost rotating orbit */}
                <div className="absolute inset-0 rounded-full border border-dashed border-neon-cyan/20 animate-spin" style={{ animationDuration: '40s' }} />
                
                {/* Hologram base projector glow */}
                <div className="absolute -bottom-8 w-[240px] h-[40px] bg-neon-cyan/25 blur-xl rounded-full scale-y-[0.3] z-0 animate-pulse pointer-events-none" />
                <div className="absolute -bottom-4 w-[160px] h-[20px] bg-neon-green/30 blur-md rounded-full scale-y-[0.3] z-0 pointer-events-none" />

                {/* Hologram Display Sphere */}
                <div className="absolute w-[300px] h-[300px] rounded-full border border-glass-cyan bg-brand-bg-darker/60 bg-tech-grid shadow-[0_0_35px_rgba(6,182,212,0.15)] flex items-center justify-center overflow-hidden glow-border-cyan">
                  {/* Radar Scanning Line Sweep */}
                  <div className="absolute w-full h-full bg-gradient-to-tr from-neon-cyan/15 to-transparent rounded-full animate-radar pointer-events-none" />
                  
                  {/* Digital circular scales */}
                  <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-neon-green/10 pointer-events-none" />
                  <div className="absolute w-[180px] h-[180px] rounded-full border border-neon-cyan/5 pointer-events-none" />
                </div>

                {/* The Floating Holographic Tiger Asset */}
                <div className="relative z-10 w-[270px] h-[270px] flex items-center justify-center overflow-hidden">
                  <motion.img
                    src={holographicTiger}
                    alt="Floating Holographic Tiger"
                    className="w-[245px] h-[245px] object-contain hologram-flicker animate-float filter drop-shadow-[0_0_20px_rgba(6,182,212,0.7)]"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.95 }}
                    transition={{ duration: 1.2 }}
                  />
                  {/* Holographic glowing scan line running vertically */}
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-bounce opacity-80 pointer-events-none" style={{ animationDuration: '3s' }} />
                </div>

                {/* FLOATING HUD PANEL A: Species telemetry */}
                <div className="absolute -top-4 -left-6 p-3 bg-glass border border-neon-cyan/30 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-float-delayed text-[10px] font-mono w-44 z-20 border-glass-cyan">
                  <div className="flex items-center space-x-1.5 text-neon-blue mb-1 border-b border-neon-cyan/20 pb-1">
                    <FaDna className="text-xs" />
                    <span className="font-bold tracking-wider">SPECIES TELEMETRY</span>
                  </div>
                  <div className="space-y-1 text-gray-300 text-[9px]">
                    <div className="flex justify-between">
                      <span>TAXON:</span>
                      <span className="text-white font-semibold">P. tigris tigris</span>
                    </div>
                    <div className="flex justify-between">
                      <span>STATUS:</span>
                      <span className="text-red-400 font-extrabold">CRITICAL</span>
                    </div>
                    <div className="flex justify-between">
                      <span>NET LINK:</span>
                      <span className="text-neon-green font-semibold">SECURED</span>
                    </div>
                  </div>
                </div>

                {/* FLOATING HUD PANEL B: Forecast & Vector */}
                <div className="absolute -bottom-6 -right-6 p-3 bg-glass border border-neon-green/30 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.15)] animate-float-reversed text-[10px] font-mono w-48 z-20 border-glass-green">
                  <div className="flex items-center space-x-1.5 text-neon-emerald mb-1 border-b border-neon-green/20 pb-1">
                    <FaHeartbeat className="text-xs animate-pulse text-neon-green" />
                    <span className="font-bold tracking-wider">PREDICTIVE DATA</span>
                  </div>
                  <div className="space-y-1 text-gray-300 text-[9px]">
                    <div className="flex justify-between">
                      <span>PROJECTED DECLINE:</span>
                      <span className="text-red-400 font-bold">-7.0% / yr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>RECOVERY TARGET:</span>
                      <span className="text-neon-cyan font-bold">+12.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GRAV CONSTANT:</span>
                      <span className="text-white">0.12G (SUSP)</span>
                    </div>
                  </div>
                </div>

                {/* FLOATING HUD PANEL C: Geolocation Nodes */}
                <div className="absolute top-1/3 -right-12 p-2.5 bg-glass border border-neon-cyan/20 rounded-xl shadow-[0_0_10px_rgba(6,182,212,0.1)] animate-float text-[9px] font-mono w-36 z-20 hidden md:block border-glass-cyan">
                  <div className="flex items-center space-x-1 text-neon-cyan mb-1.5">
                    <FaGlobe />
                    <span className="font-bold">GRID NODE</span>
                  </div>
                  <p className="text-white font-semibold">Sundarbans Sector 4</p>
                  <p className="text-gray-400 mt-0.5">21.9497° N, 89.1833° E</p>
                </div>

              </div>
            </div>

          </div>
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
      <section id="species" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-brand-border/40 text-center relative">
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] rounded-full bg-neon-cyan/5 blur-[80px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-neon-cyan font-mono text-xs tracking-widest uppercase block">BIOMETRIC FIELD INVENTORY</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-mono">Featured Endangered Taxa</h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Biospatial telemetry mapping for critical target organisms across dry grasslands, sub-zero heights, and river deltas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {speciesDataList.map((item) => (
            <Card key={item.id} hoverable={true} className="flex flex-col justify-between text-left h-full border-neon-cyan/15 bg-brand-bg-darker/60 overflow-hidden relative group p-5 rounded-2xl border transition-all duration-300 hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              
              {/* Tech Bracket Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4 relative z-10">
                {/* Image container */}
                <div className="relative h-44 rounded-xl overflow-hidden mb-2 border border-neon-cyan/10">
                  <ImageWithFallback
                    src={item.image}
                    fallbackSrc={item.fallbackImage}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-darker/90 via-transparent to-transparent" />
                  <span className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[8px] font-extrabold uppercase border font-mono tracking-wider ${
                    item.threatLevel === 'Critical'
                      ? 'bg-red-950/80 text-red-400 border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                      : item.threatLevel === 'High'
                      ? 'bg-amber-950/80 text-amber-400 border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                      : 'bg-blue-950/80 text-blue-400 border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                  }`}>
                    {item.threatLevel} Threat
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-neon-blue transition-colors font-mono">{item.name}</h3>
                  <p className="text-xs text-gray-500 italic font-mono">{item.scientificName}</p>
                </div>

                {/* Sub-coordinates/Telemetry indicator */}
                <div className="text-[9px] font-mono text-neon-cyan/60 flex justify-between">
                  <span>NODE: SEC-{item.id.toUpperCase()}</span>
                  <span>SYNC: OK</span>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-[10px] text-gray-400 bg-brand-bg-darker/80 p-2.5 rounded-xl border border-neon-cyan/10">
                  <div>
                    <span className="block text-gray-500 text-[8px] uppercase">Status</span>
                    <span className="font-semibold text-white">{item.status}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 text-[8px] uppercase">Population</span>
                    <span className="font-semibold text-neon-green">{item.population}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-auto relative z-10">
                <Button variant="outline" size="sm" onClick={() => setSelectedSpecies(item)} className="w-full text-center border-neon-cyan/50 hover:bg-neon-cyan/10 text-neon-blue font-mono uppercase tracking-wider text-[10px]">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* AI Prediction Module Section */}
      <section id="prediction" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-brand-border/40 text-center relative">
        <div className="absolute top-1/2 left-0 w-[250px] h-[250px] rounded-full bg-neon-green/5 blur-[90px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-neon-green font-mono text-xs tracking-widest uppercase block">PROJECTION SIMULATION UNIT</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-mono">AI Population Forecasting Module</h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Drag the slider controls to simulate conservation measures and view future projections of species recovery curves instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Simulation controls */}
          <Card hoverable={false} className="lg:col-span-4 border-neon-cyan/25 bg-brand-bg-darker/60 flex flex-col justify-between text-left p-5 rounded-2xl relative border">
            {/* Tech accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-cyan" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-cyan" />

            <div className="space-y-6">
              <div className="flex items-center space-x-2 border-b border-neon-cyan/20 pb-3">
                <FaSlidersH className="text-neon-cyan" />
                <h3 className="font-bold text-white text-sm font-mono uppercase tracking-wider">Model Tuning Matrix</h3>
              </div>

              {/* Slider 1 */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400">PATROL INTENSITY:</span>
                  <span className="text-neon-blue font-bold">{patrolMultiplier}%</span>
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
                  className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
                />
                <p className="text-[9px] text-gray-500 font-mono">Increases anti-poaching vectors and sensor grid density</p>
              </div>

              {/* Info panel */}
              <div className="p-3 bg-brand-bg-darker/90 border border-neon-cyan/15 rounded-xl space-y-2 text-[10px] font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-500">ML CLASSIFIER:</span>
                  <span className="text-white font-bold">LSTMRegressor-v2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">LOSS METRIC:</span>
                  <span className="text-neon-green font-bold">MSE: 0.0142</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">CONFIDENCE:</span>
                  <span className="text-neon-cyan font-bold">94.8% ACCURACY</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-neon-cyan/20">
              <div className="p-3 bg-neon-cyan/5 border border-neon-cyan/20 rounded-xl flex items-center space-x-2.5 text-[10px] text-neon-blue font-mono">
                <FaShieldAlt className="animate-pulse text-neon-cyan" />
                <span>INTERVENTION VECTOR ACTIVE</span>
              </div>
            </div>
          </Card>

          {/* Recharts chart */}
          <Card hoverable={false} className="lg:col-span-8 border-neon-cyan/25 bg-brand-bg-darker/60 flex flex-col justify-between p-5 rounded-2xl relative border">
            {/* Tech accents */}
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-cyan" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-cyan" />

            <div className="flex items-center justify-between border-b border-neon-cyan/20 pb-3 mb-6 font-mono">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">10-Year Species Recovery curve simulation</h4>
              <span className="text-[9px] text-gray-500">[COEFFICIENT INDEX ACTIVE]</span>
            </div>

            {recalcGlow ? (
              <div className="flex-1 flex items-center justify-center min-h-[260px] text-neon-cyan font-mono text-xs animate-pulse">
                &gt; SIMULATING ECOLOGICAL REGRESSION MATRIX...
              </div>
            ) : (
              <div className="flex-1 min-h-[260px] text-xs font-mono">
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.05)" />
                    <XAxis dataKey="year" stroke="#4b5563" tickLine={false} />
                    <YAxis stroke="#4b5563" tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0b1220',
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                        borderRadius: '12px',
                        color: '#fff',
                        fontFamily: 'monospace'
                      }}
                    />
                    <Legend wrapperStyle={{ color: '#9ca3af', paddingTop: 10, fontSize: '10px' }} />
                    <Line type="monotone" dataKey="Baseline" stroke="#f43f5e" strokeWidth={2} strokeDasharray="4 4" name="Baseline (Decline)" dot={false} />
                    <Line type="monotone" dataKey="Predicted" stroke="#00f0ff" strokeWidth={3} name="Simulated Recovery" activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>
        </div>

        {/* Prediction Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            { tag: 'Metrics', title: 'Population Trend', desc: 'Projected 10-year simulated population recovery curves using dynamic parameters.', label: 'Projection', value: '+12.4% Recovery', color: 'text-neon-cyan' },
            { tag: 'Parameters', title: 'AI Accuracy', desc: 'Deep learning LSTM regression network converging with minimal validation loss.', label: 'Accuracy', value: '94.8% Acc.', color: 'text-neon-green' },
            { tag: 'Vulnerability', title: 'Risk Analysis', desc: 'Continuous threat evaluation assessing poaching hotspots and land degradation.', label: 'Poaching Risk', value: 'Reduced 54%', color: 'text-neon-blue' },
            { tag: 'Timeline', title: 'Future Forecast', desc: 'Ecological stabilization timeline mapping the point of species self-sustainment.', label: 'Stabilization', value: 'By 2032', color: 'text-white' }
          ].map((card, index) => (
            <Card key={index} hoverable={true} className="border-neon-cyan/15 bg-brand-bg-darker/60 flex flex-col justify-between text-left p-5 rounded-2xl border transition-all duration-300 hover:border-neon-cyan/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] relative group">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity" />
              
              <div className="space-y-2">
                <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider block">{card.tag}</span>
                <h4 className="font-bold text-white text-sm font-mono uppercase">{card.title}</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neon-cyan/10 font-mono text-[10px] flex justify-between">
                <span className="text-gray-500">{card.label}</span>
                <span className={`${card.color} font-bold`}>{card.value}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Recommendation Module Section */}
      <section id="recommendation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-brand-border/40 text-center relative">
        <div className="absolute top-0 left-1/3 w-[250px] h-[250px] rounded-full bg-neon-green/5 blur-[90px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-neon-green font-mono text-xs tracking-widest uppercase block">DECISION SUPPORT SYNTHESIS</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-mono">Recommended Interventions</h2>
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
            <Card key={idx} hoverable={true} className="flex flex-col text-left space-y-4 border-neon-green/15 bg-brand-bg-darker/60 p-5 rounded-2xl border transition-all duration-300 hover:border-neon-green/45 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] relative group">
              {/* Tech Bracket Corner Accents */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-neon-green opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-neon-green opacity-40 group-hover:opacity-100 transition-opacity" />

              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center text-neon-green">
                  <FaLeaf />
                </div>
                <span className="text-[9px] font-mono text-gray-500">[INT-0{idx+1}]</span>
              </div>
              <h4 className="font-bold text-white text-base tracking-wide font-mono uppercase group-hover:text-neon-green transition-colors">{item.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Analytics Dashboard Preview Section */}
      <section id="analytics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-brand-border/40 text-center relative">
        <div className="absolute bottom-0 right-10 w-[300px] h-[300px] rounded-full bg-neon-blue/5 blur-[100px] pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-neon-blue font-mono text-xs tracking-widest uppercase block">REAL-TIME SENSOR SWARM FEED</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-mono">Analytics Dashboard Telemetry</h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            View regional sensor maps, coordinates, and real-time biological charts in the client environment portal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map Preview */}
          <Card hoverable={false} className="lg:col-span-7 border-neon-cyan/25 bg-brand-bg-darker/60 flex flex-col justify-between text-left p-5 rounded-2xl border relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-cyan" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-cyan" />

            <div>
              <div className="flex items-center justify-between border-b border-neon-cyan/20 pb-3 mb-6">
                <div className="flex items-center space-x-2">
                  <FaMapMarkedAlt className="text-neon-cyan" />
                  <h3 className="font-bold text-white font-mono text-sm uppercase tracking-wider">Sanctuary Hotspot Grid</h3>
                </div>
                <span className="text-[9px] font-mono text-neon-blue">[GIS LIVE GRID]</span>
              </div>

              {/* Advanced SVG radar/sonar map mockup */}
              <div className="relative flex items-center justify-center bg-[#070c14] rounded-xl border border-neon-cyan/15 overflow-hidden p-4">
                <svg className="w-full h-64" viewBox="0 0 400 240">
                  {/* Grid lines */}
                  <line x1="0" y1="40" x2="400" y2="40" stroke="rgba(6, 182, 212, 0.05)" />
                  <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(6, 182, 212, 0.05)" />
                  <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(6, 182, 212, 0.05)" />
                  <line x1="0" y1="160" x2="400" y2="160" stroke="rgba(6, 182, 212, 0.05)" />
                  <line x1="0" y1="200" x2="400" y2="200" stroke="rgba(6, 182, 212, 0.05)" />
                  
                  <line x1="50" y1="0" x2="50" y2="240" stroke="rgba(6, 182, 212, 0.05)" />
                  <line x1="100" y1="0" x2="100" y2="240" stroke="rgba(6, 182, 212, 0.05)" />
                  <line x1="150" y1="0" x2="150" y2="240" stroke="rgba(6, 182, 212, 0.05)" />
                  <line x1="200" y1="0" x2="200" y2="240" stroke="rgba(6, 182, 212, 0.05)" />
                  <line x1="250" y1="0" x2="250" y2="240" stroke="rgba(6, 182, 212, 0.05)" />
                  <line x1="300" y1="0" x2="300" y2="240" stroke="rgba(6, 182, 212, 0.05)" />
                  <line x1="350" y1="0" x2="350" y2="240" stroke="rgba(6, 182, 212, 0.05)" />

                  {/* Sonar Concentric Rings */}
                  <circle cx="200" cy="120" r="100" fill="none" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="1.5" />
                  <circle cx="200" cy="120" r="70" fill="none" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="200" cy="120" r="40" fill="none" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="1" />
                  <circle cx="200" cy="120" r="10" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />

                  {/* Radar Sweeping Sector (Rotates using CSS) */}
                  <g className="animate-radar" style={{ transformOrigin: '200px 120px' }}>
                    <line x1="200" y1="120" x2="200" y2="20" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="1.5" />
                    <path d="M 200 120 L 200 20 A 100 100 0 0 1 270.7 49.3 Z" fill="rgba(6, 182, 212, 0.08)" />
                  </g>

                  {/* Sonar targets / hot points */}
                  {/* Target 1: Poaching threat */}
                  <g>
                    <circle cx="100" cy="90" r="6" fill="none" stroke="#f43f5e" strokeWidth="1.5" className="animate-ping" style={{ transformOrigin: '100px 90px' }} />
                    <circle cx="100" cy="90" r="3" fill="#f43f5e" />
                    <text x="110" y="93" fill="#f43f5e" fontSize="7" className="font-mono font-bold">[!] POACH VECTOR</text>
                  </g>

                  {/* Target 2: Antigravity conservation zone */}
                  <g>
                    <circle cx="250" cy="70" r="6" fill="none" stroke="#00f0ff" strokeWidth="1" className="animate-pulse" />
                    <circle cx="250" cy="70" r="3.5" fill="#00f0ff" />
                    <text x="260" y="73" fill="#00f0ff" fontSize="7" className="font-mono font-bold">ZONE-02 [GRAV_ACTIVE]</text>
                  </g>

                  {/* Target 3: Monitored group */}
                  <g>
                    <circle cx="220" cy="170" r="3" fill="#10b981" />
                    <text x="230" y="173" fill="#10b981" fontSize="7" className="font-mono">TIGER-T04 [STABLE]</text>
                  </g>

                  {/* Sanctuary boundary contours */}
                  <path d="M 40 60 C 120 40, 180 80, 240 50 C 300 20, 320 120, 360 140 C 300 180, 200 160, 140 210 Z" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="1.5" strokeDasharray="4 2" />
                </svg>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center text-xs text-gray-500 font-mono">
              <span>SCAN FREQ: 5.4 GHZ</span>
              <Link to="/dashboard">
                <button className="text-neon-cyan font-bold hover:text-neon-blue flex items-center space-x-1 uppercase text-[10px] tracking-wider transition-colors cursor-pointer">
                  <span>Enter Dashboard Portal</span>
                  <FaChevronRight className="h-3 w-3" />
                </button>
              </Link>
            </div>
          </Card>

          {/* Quick Metrics previews */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6 text-left">
            <Card hoverable={true} className="border-neon-cyan/15 bg-brand-bg-darker/60 flex flex-col justify-between p-5 rounded-2xl border relative group">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold font-mono">Telemetry Ingestion</p>
                  <h4 className="text-2xl font-bold text-neon-blue mt-1 font-mono">12,482 / MIN</h4>
                </div>
                <div className="p-2 bg-neon-cyan/10 text-neon-cyan rounded-lg border border-neon-cyan/20">
                  <FaSatellite />
                </div>
              </div>
              <span className="text-[10px] text-gray-400 mt-4 font-mono">Real-time GCS bio-signals active.</span>
            </Card>

            <Card hoverable={true} className="border-neon-cyan/15 bg-brand-bg-darker/60 flex flex-col justify-between p-5 rounded-2xl border relative group">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold font-mono">Database Nodes Sync</p>
                  <h4 className="text-2xl font-bold text-neon-green mt-1 font-mono">8 SECONDS AGO</h4>
                </div>
                <div className="p-2 bg-neon-green/10 text-neon-green rounded-lg border border-neon-green/20">
                  <FaDatabase />
                </div>
              </div>
              <span className="text-[10px] text-neon-emerald mt-4 font-semibold font-mono">All prediction grids synchronized.</span>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Research / Reports Section */}
      <section id="research" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-brand-border/40 text-center relative">
        <div className="absolute top-1/2 left-0 w-[200px] h-[200px] rounded-full bg-neon-cyan/5 blur-[80px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-neon-cyan font-mono text-xs tracking-widest uppercase block">ACADEMIC KNOWLEDGE BASE</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-mono">Insights & Latest Research</h2>
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
            <Card key={idx} hoverable={true} className="flex flex-col text-left justify-between h-full border-neon-cyan/15 bg-brand-bg-darker/60 p-5 rounded-2xl border transition-all duration-300 hover:border-neon-cyan/45 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] relative group">
              {/* Tech Bracket Corner Accents */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4">
                <span className="text-[9px] font-mono text-neon-blue bg-neon-cyan/10 px-2.5 py-1 rounded-md border border-neon-cyan/25 inline-block">{card.date}</span>
                <h4 className="font-bold text-white text-base tracking-wide font-mono uppercase group-hover:text-neon-blue transition-colors">{card.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">{card.body}</p>
              </div>
              <div className="pt-5 border-t border-neon-cyan/10 mt-6 relative z-10">
                <button className="text-xs text-neon-cyan font-bold hover:text-neon-blue transition-colors font-mono uppercase tracking-wider cursor-pointer">Read Brief Document &gt;</button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* About ESPR-AI Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-brand-border/40 text-center relative overflow-hidden">
        {/* Floating gradient circles for glassmorphism background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-neon-cyan font-mono text-xs tracking-widest uppercase block">SYSTEM CAPABILITY MATRIX</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-mono">About ESPR-AI Platform</h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Developing a System for Endangered Species Population Prediction & Recommendation using Artificial Intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
          {/* Mission Details */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-wide font-mono uppercase">
              AI-Powered Ecological Preservation
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              The ESPR-AI framework is designed to bridge the gap between machine learning and active conservation. By processing multi-spectral satellite imagery, sensor telemetry, and historical climate datasets, our system projects population counts and evaluates habitat suitability coefficients.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Unlike static observation reports, our engine simulates the direct impact of conservation policies—such as increased anti-poaching patrols or forest buffer zones—to provide wildlife officers and governments with actionable, data-backed recommendation templates.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border border-neon-cyan/20 bg-brand-bg-darker/60 p-4 rounded-xl relative group">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="block text-2xl font-extrabold text-neon-cyan font-mono">94.8%</span>
                <span className="block text-[9px] text-gray-500 uppercase tracking-widest font-semibold mt-1 font-mono">Convergence</span>
              </div>
              <div className="border border-neon-green/20 bg-brand-bg-darker/60 p-4 rounded-xl relative group">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-green opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="block text-2xl font-extrabold text-neon-green font-mono">REAL-TIME</span>
                <span className="block text-[9px] text-gray-500 uppercase tracking-widest font-semibold mt-1 font-mono">GIS Telemetry</span>
              </div>
            </div>
          </div>

          {/* Visual Architecture Representation */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/10 to-neon-green/5 rounded-2xl filter blur-xl animate-pulse" />
            <Card hoverable={false} className="border-neon-cyan/20 bg-brand-bg-darker/80 p-8 relative z-10 space-y-6 rounded-2xl border bg-tech-grid">
              {/* Tech Bracket Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-cyan" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-cyan" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-cyan" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-cyan" />

              <h4 className="font-bold text-white border-b border-neon-cyan/25 pb-3 font-mono text-sm uppercase tracking-wide">Platform Architecture</h4>
              
              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-center space-x-3 bg-brand-bg-darker/70 p-3 rounded-lg border border-neon-cyan/15">
                  <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
                  <div className="flex-1">
                    <span className="block text-gray-500 text-[8px] uppercase">Data Source Ingestion</span>
                    <span className="text-white">Satellite GIS + Sound Sensor Swarms</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-brand-bg-darker/70 p-3 rounded-lg border border-neon-cyan/15">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                  <div className="flex-1">
                    <span className="block text-gray-500 text-[8px] uppercase">AI Analytics Engine</span>
                    <span className="text-white">LSTM Neural Net + Random Forest</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-brand-bg-darker/70 p-3 rounded-lg border border-neon-green/15">
                  <div className="w-2 h-2 rounded-full bg-neon-green" />
                  <div className="flex-1">
                    <span className="block text-gray-500 text-[8px] uppercase">Mitigation Synthesis</span>
                    <span className="text-white">Policy Recommendation Templates</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative">
        <div className="absolute top-1/2 left-10 w-[200px] h-[200px] rounded-full bg-neon-cyan/5 blur-[90px] pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-neon-blue font-mono text-xs tracking-widest uppercase block">NODE COORDINATION DESK</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-mono">Sanctuary Network Coordination</h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Reach out to integrate regional sensors, report field observations, or collaborate on conservation models.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          {/* Contact Details */}
          <Card hoverable={false} className="lg:col-span-5 border-neon-cyan/20 bg-brand-bg-darker/60 flex flex-col justify-between p-5 rounded-2xl border relative group">
            {/* Tech accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-cyan" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-cyan" />

            <div className="space-y-6">
              <h3 className="font-bold text-white text-base font-mono uppercase tracking-wider">Platform Node Coordinates</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Our models run synchronized with active ecological nodes situated in key national parks and biosphere grids.
              </p>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-neon-cyan" />
                  <div>
                    <p className="text-gray-500 text-[9px] uppercase">Central Server Node</p>
                    <p className="text-white text-xs">Sundarbans Sector 4, WB, India</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FaMailBulk className="text-neon-cyan" />
                  <div>
                    <p className="text-gray-500 text-[9px] uppercase">Inquiries & Integration</p>
                    <p className="text-white text-xs">integrations@ecopredict.ai</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-neon-cyan/15 flex space-x-4">
              <a href="https://twitter.com" className="p-2 bg-brand-bg-darker/90 border border-neon-cyan/20 hover:bg-neon-cyan hover:text-black text-gray-400 rounded-xl transition-all cursor-pointer"><FaTwitter className="text-sm" /></a>
              <a href="https://linkedin.com" className="p-2 bg-brand-bg-darker/90 border border-neon-cyan/20 hover:bg-neon-cyan hover:text-black text-gray-400 rounded-xl transition-all cursor-pointer"><FaLinkedin className="text-sm" /></a>
              <a href="https://github.com" className="p-2 bg-brand-bg-darker/90 border border-neon-cyan/20 hover:bg-neon-cyan hover:text-black text-gray-400 rounded-xl transition-all cursor-pointer"><FaGithub className="text-sm" /></a>
            </div>
          </Card>

          {/* Contact Form */}
          <Card hoverable={false} className="lg:col-span-7 border-neon-cyan/20 bg-brand-bg-darker/60 p-5 rounded-2xl border relative">
            {/* Tech accents */}
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-cyan" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-cyan" />

            <form className="space-y-4 font-mono text-xs" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block">Your Name</label>
                  <input
                    type="text"
                    placeholder="Ecologist / Researcher"
                    className="block w-full px-3 py-2.5 bg-brand-bg-darker/90 border border-neon-cyan/20 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none transition-all font-sans"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@institution.org"
                    className="block w-full px-3 py-2.5 bg-brand-bg-darker/90 border border-neon-cyan/20 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none transition-all font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block">Message & Sanctuary coordinates</label>
                <textarea
                  rows={4}
                  placeholder="Detail sensory inputs or model collaboration requests..."
                  className="block w-full px-3 py-2.5 bg-brand-bg-darker/90 border border-neon-cyan/20 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none transition-all resize-none font-sans"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full py-3 bg-gradient-to-r from-neon-blue to-neon-cyan text-black font-extrabold border-none shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_25px_rgba(6,182,212,0.45)] uppercase tracking-wider">
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
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-xl bg-brand-bg-darker border border-neon-cyan/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-left space-y-5 bg-tech-grid"
            >
              {/* Tech Bracket Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-cyan" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-cyan" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-cyan" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-cyan" />

              <button
                onClick={() => setSelectedSpecies(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-neon-blue focus:outline-none transition-colors"
              >
                <FaTimes className="text-base" />
              </button>

              <div className="flex items-center space-x-4 border-b border-neon-cyan/20 pb-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-brand-bg border border-neon-cyan/35 p-0.5">
                  <ImageWithFallback
                    src={selectedSpecies.image}
                    fallbackSrc={selectedSpecies.fallbackImage}
                    alt={selectedSpecies.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-mono tracking-wide">{selectedSpecies.name}</h3>
                  <p className="text-xs text-gray-500 italic font-mono">{selectedSpecies.scientificName}</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs leading-relaxed text-gray-300 font-mono">
                <div className="p-3 bg-brand-bg/60 border border-neon-cyan/10 rounded-xl space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-500 uppercase text-[10px]">Primary Habitat:</span> 
                    <span className="text-white text-right">{selectedSpecies.habitat}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500 uppercase text-[10px]">Estimated Population:</span> 
                    <span className="text-neon-green text-right font-semibold">{selectedSpecies.population} remaining</span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="text-gray-500 uppercase text-[10px]">Threat Level:</span> 
                    <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase border ${
                      selectedSpecies.threatLevel === 'Critical'
                        ? 'bg-red-950/60 text-red-400 border-red-500/30'
                        : selectedSpecies.threatLevel === 'High'
                        ? 'bg-amber-950/60 text-amber-400 border-amber-500/30'
                        : 'bg-blue-950/60 text-blue-400 border-blue-500/30'
                    }`}>
                      {selectedSpecies.threatLevel}
                    </span>
                  </p>
                </div>
                
                <div className="border-t border-neon-cyan/15 pt-3">
                  <span className="block text-gray-500 uppercase text-[10px] mb-1 font-semibold">AI Threat Vulnerability Analysis:</span>
                  <p className="text-gray-400 text-xs leading-relaxed font-sans">{selectedSpecies.description}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-neon-cyan/20 flex space-x-3">
                <Link to="/dashboard" className="flex-1">
                  <Button variant="primary" className="w-full py-2 flex items-center justify-center space-x-1.5 text-xs bg-gradient-to-r from-neon-blue to-neon-cyan text-black font-extrabold border-none shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                    <span>Analyze in Dashboard</span>
                    <FaArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
                <Button variant="secondary" onClick={() => setSelectedSpecies(null)} className="px-4 py-2 text-xs border-slate-700 text-gray-300 font-bold hover:bg-slate-800 hover:text-white transition-all">
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
