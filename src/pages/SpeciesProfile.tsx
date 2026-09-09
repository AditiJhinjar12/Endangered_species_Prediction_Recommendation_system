import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaGlobe, FaArrowLeft, FaDatabase, FaInfoCircle, FaBrain, FaRegCalendarAlt } from 'react-icons/fa';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { supabase } from '../supabaseClient';
import { speciesList } from '../data/speciesData';

export const SpeciesProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const initialSpecies = speciesList.find(s => s.id === id);
  const [species, setSpecies] = useState(initialSpecies);

  useEffect(() => {
    if (initialSpecies) {
      setSpecies(initialSpecies);
      
      const fetchDbImage = async () => {
        try {
          const { data, error } = await supabase
            .from('species_data')
            .select('image')
            .eq('id', id)
            .single();
            
          if (data && data.image && !error) {
            setSpecies(prev => prev ? { ...prev, image: data.image } : prev);
          }
        } catch (err) {
          console.warn('Failed to load database image for species profile, using static image.', err);
        }
      };
      fetchDbImage();
    }
  }, [id, initialSpecies]);

  if (!species) {
    return (
      <DashboardLayout activeTabId="species">
        <div className="space-y-6 text-left">
          <Link to="/species" className="inline-flex items-center space-x-2 text-xs font-semibold text-brand-green hover:underline">
            <FaArrowLeft />
            <span>Back to Explorer</span>
          </Link>
          <Card hoverable={false} className="border-red-900/10 p-12 text-center text-gray-400 flex flex-col items-center justify-center space-y-4">
            <FaInfoCircle className="h-10 w-10 text-red-500/50" />
            <h3 className="text-base font-bold text-white">Unable to load research data.</h3>
            <p className="text-xs text-gray-500">The species id "{id}" could not be found in our database index.</p>
            <Button variant="outline" size="sm" onClick={() => navigate('/species')}>
              Back to Explorer
            </Button>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeTabId="species">
      <div className="space-y-8 text-left">
        
        {/* Navigation back link */}
        <div>
          <Link to="/species" className="inline-flex items-center space-x-2 text-xs font-semibold text-brand-green hover:underline">
            <FaArrowLeft />
            <span>Back to Species Explorer</span>
          </Link>
        </div>

        {/* Species Header Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Photo Banner */}
          <div className="lg:col-span-1 relative rounded-2xl overflow-hidden border border-emerald-900/10 h-72 lg:h-80 shadow-md">
            <div className="absolute inset-0 bg-gradient-to-t from-[#020905] via-transparent to-transparent z-10 opacity-60" />
            <img
              src={species.image}
              alt={species.commonName}
              className="w-full h-full object-cover"
            />
            <span className={`absolute top-4 right-4 z-20 text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider ${
              species.status === 'Critically Endangered' ? 'bg-red-950/80 text-red-400 border border-red-900/30' :
              species.status === 'Endangered' ? 'bg-amber-950/80 text-amber-400 border border-amber-900/30' :
              species.status === 'Vulnerable' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-900/30' :
              'bg-blue-950/80 text-blue-400 border border-blue-900/30'
            }`}>
              {species.status}
            </span>
          </div>

          {/* Core Overview details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">{species.commonName}</h1>
              <p className="text-sm text-brand-green italic font-medium mt-1">{species.scientificName}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-emerald-950/20 border border-emerald-900/10 rounded-xl">
                <span className="block text-[9px] text-gray-500 uppercase tracking-wider font-semibold">Population</span>
                <span className="block text-xl font-bold text-white mt-1 font-mono">~{species.currentPopulation.toLocaleString()}</span>
              </div>

              <div className="p-4 bg-emerald-950/20 border border-emerald-900/10 rounded-xl">
                <span className="block text-[9px] text-gray-500 uppercase tracking-wider font-semibold">Trend</span>
                <span className={`block text-xl font-bold mt-1 uppercase text-left ${
                  species.trend === 'Increasing' ? 'text-brand-green' : 
                  species.trend === 'Stable' ? 'text-blue-400' : 'text-red-500'
                }`}>
                  {species.trend}
                </span>
              </div>

              <div className="p-4 bg-emerald-950/20 border border-emerald-900/10 rounded-xl">
                <span className="block text-[9px] text-gray-500 uppercase tracking-wider font-semibold">Status</span>
                <span className="block text-xl font-bold text-white mt-1 uppercase">{species.status}</span>
              </div>

              <div className="p-4 bg-emerald-950/20 border border-emerald-900/10 rounded-xl">
                <span className="block text-[9px] text-gray-500 uppercase tracking-wider font-semibold">Records Used</span>
                <span className="block text-xl font-bold text-white mt-1 font-mono">{species.recordsUsed}</span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-brand-green mt-0.5 h-4 w-4" />
                <div>
                  <span className="font-semibold text-gray-400">Primary Region: </span>
                  <span className="text-white">{species.region.join(' • ')}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaGlobe className="text-brand-green mt-0.5 h-4 w-4" />
                <div>
                  <span className="font-semibold text-gray-400">Habitat Type: </span>
                  <span className="text-white">{species.habitat}</span>
                </div>
              </div>
            </div>

            {/* Quick Flow Actions */}
            <div className="flex flex-wrap gap-4 pt-3">
              <Link to={`/predictions?species=${species.id}`}>
                <Button variant="primary" size="sm" className="flex items-center gap-2">
                  <FaBrain className="text-xs" />
                  <span>Run ML Prediction</span>
                </Button>
              </Link>
              <Link to={`/recommendations?species=${species.id}`}>
                <Button variant="outline" size="sm">
                  <span>View AI Recommendations</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Charts & Threats Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recharts Population History */}
          <Card hoverable={false} className="border-emerald-900/10 p-6 flex flex-col justify-between">
            <div>
              <div className="border-b border-emerald-950/40 pb-3 mb-5">
                <h3 className="font-bold text-white">Historical Population (2016-2026)</h3>
                <p className="text-[10px] text-gray-500 mt-0.5 font-medium">Validated census history tracking</p>
              </div>

              <div className="h-64 w-full text-xs font-mono">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={species.populationHistory} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#052e16/10" opacity={0.15} />
                    <XAxis dataKey="year" stroke="#4b5563" />
                    <YAxis stroke="#4b5563" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#020905',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        borderRadius: '8px',
                        color: '#ecfdf5'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="population"
                      stroke="#10b981"
                      strokeWidth={3}
                      activeDot={{ r: 7 }}
                      name="Population"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          {/* Threat severity indices */}
          <Card hoverable={false} className="border-emerald-900/10 p-6 flex flex-col justify-between">
            <div>
              <div className="border-b border-emerald-950/40 pb-3 mb-5">
                <h3 className="font-bold text-white">Threat Factor Severity Indices</h3>
                <p className="text-[10px] text-gray-500 mt-0.5 font-medium">Empirical research indicators</p>
              </div>

              <div className="space-y-5">
                {species.threats.map((threat, index) => (
                  <div key={index} className="space-y-1.5 text-xs text-left">
                    <div className="flex justify-between font-semibold">
                      <span className="text-white">{threat.name}</span>
                      <span className="text-brand-green font-mono">{threat.severity}%</span>
                    </div>
                    <div className="h-2 w-full bg-emerald-950/40 border border-emerald-900/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-green rounded-full transition-all duration-500"
                        style={{ width: `${threat.severity}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Data Provenance Badge panel */}
        <div className="bg-emerald-950/20 border border-emerald-900/25 rounded-xl p-5 md:p-6 shadow-sm backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Data Provenance:</span>
              {species.dataSources.map((source, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-emerald-950/60 border border-emerald-900/40 text-brand-green rounded-lg font-semibold flex items-center gap-1.5"
                >
                  <FaDatabase className="text-[10px]" />
                  <span>{source}</span>
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-gray-400">
              <FaRegCalendarAlt className="text-brand-green" />
              <span>Last Sync Update: <strong className="text-white font-mono">{species.lastUpdated}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default SpeciesProfile;
