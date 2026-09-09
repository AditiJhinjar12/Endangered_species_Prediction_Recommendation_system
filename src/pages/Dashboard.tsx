import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaRegClock, FaShieldAlt } from 'react-icons/fa';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/Card';
import { speciesList } from '../data/speciesData';

export const Dashboard: React.FC = () => {
  
  // Aggregate Tiger, Leopard, and Rhino populations for the comparative trend chart
  const getComparativeTrendData = () => {
    const years = [2016, 2018, 2020, 2022, 2024, 2026];
    return years.map(year => {
      const tiger = speciesList.find(s => s.id === 'tiger')?.populationHistory.find(h => h.year === year)?.population || 0;
      const leopard = speciesList.find(s => s.id === 'leopard')?.populationHistory.find(h => h.year === year)?.population || 0;
      const rhino = speciesList.find(s => s.id === 'rhino')?.populationHistory.find(h => h.year === year)?.population || 0;

      return {
        year: String(year),
        'Bengal Tiger': tiger,
        'Snow Leopard': leopard,
        'Indian Rhino': rhino
      };
    });
  };

  const trendData = getComparativeTrendData();

  // Status distribution bar chart data
  const statusDistributionData = [
    { name: 'Critical', Count: 8, fill: '#ef4444' },
    { name: 'Endangered', Count: 45, fill: '#f59e0b' },
    { name: 'Vulnerable', Count: 67, fill: '#10b981' }
  ];

  return (
    <DashboardLayout activeTabId="dashboard">
      <div className="space-y-8 text-left">
        {/* Top Header */}
        <div className="border-b border-emerald-950/40 pb-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Research Overview</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">Platform overview, telemetry health metrics, and historical dataset trends.</p>
        </div>

        {/* Stats Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card hoverable={false} className="border-emerald-900/10 p-5 bg-[#020905]/45 backdrop-blur-md">
            <span className="block text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Monitored Species</span>
            <span className="block text-3xl font-extrabold text-white mt-1 font-mono">120+</span>
            <span className="text-[10px] text-brand-green font-medium block mt-1">Global IUCN Indices</span>
          </Card>

          <Card hoverable={false} className="border-emerald-900/10 p-5 bg-[#020905]/45 backdrop-blur-md">
            <span className="block text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Critical Species</span>
            <span className="block text-3xl font-extrabold text-red-500 mt-1 font-mono">08</span>
            <span className="text-[10px] text-red-400/75 font-medium block mt-1">High risk factor warnings</span>
          </Card>

          <Card hoverable={false} className="border-emerald-900/10 p-5 bg-[#020905]/45 backdrop-blur-md">
            <span className="block text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Research Records</span>
            <span className="block text-3xl font-extrabold text-white mt-1 font-mono">1,248</span>
            <span className="text-[10px] text-brand-green font-medium block mt-1">Total synchronized rows</span>
          </Card>

          <Card hoverable={false} className="border-emerald-900/10 p-5 bg-[#020905]/45 backdrop-blur-md">
            <span className="block text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Model Confidence</span>
            <span className="block text-3xl font-extrabold text-brand-green mt-1 font-mono">94.8%</span>
            <span className="text-[10px] text-brand-green font-medium block mt-1">LSTM cross-validation score</span>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Comparative LineChart */}
          <div className="lg:col-span-2">
            <Card hoverable={false} className="border-emerald-900/10 p-6 h-full flex flex-col justify-between">
              <div>
                <div className="border-b border-emerald-950/40 pb-3 mb-6">
                  <h3 className="font-bold text-white text-sm">Comparative Population Trends</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5 font-medium">Historical populations plotted on a shared vertical scale</p>
                </div>

                <div className="h-64 w-full text-xs font-mono">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData} margin={{ top: 10, right: 15, left: -25, bottom: 5 }}>
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
                      <Legend />
                      <Line type="monotone" dataKey="Bengal Tiger" stroke="#10b981" strokeWidth={2.5} activeDot={{ r: 5 }} />
                      <Line type="monotone" dataKey="Snow Leopard" stroke="#3b82f6" strokeWidth={2.5} activeDot={{ r: 5 }} />
                      <Line type="monotone" dataKey="Indian Rhino" stroke="#f59e0b" strokeWidth={2.5} activeDot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </div>

          {/* Bar Chart Species Distribution */}
          <div className="lg:col-span-1">
            <Card hoverable={false} className="border-emerald-900/10 p-6 h-full flex flex-col justify-between">
              <div>
                <div className="border-b border-emerald-950/40 pb-3 mb-6">
                  <h3 className="font-bold text-white text-sm">Distribution by Status</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5 font-medium">Total categorized monitored species</p>
                </div>

                <div className="h-64 w-full text-xs font-mono">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusDistributionData} margin={{ top: 10, right: 5, left: -25, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#052e16/10" opacity={0.15} />
                      <XAxis dataKey="name" stroke="#4b5563" />
                      <YAxis stroke="#4b5563" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#020905',
                          border: '1px solid rgba(16, 185, 129, 0.2)',
                          borderRadius: '8px',
                          color: '#ecfdf5'
                        }}
                        cursor={{ fill: 'rgba(16, 185, 129, 0.05)' }}
                      />
                      <Bar dataKey="Count" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </div>

        </div>

        {/* Recent Research Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hoverable={false} className="border-emerald-900/10 p-5 bg-[#020905]/45">
            <div className="flex items-center space-x-2 border-b border-emerald-950/30 pb-3 mb-3">
              <FaRegClock className="text-brand-green" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Recently Viewed Profiles</h4>
            </div>
            <div className="space-y-2 text-xs">
              <Link to="/species/tiger" className="block p-2 rounded-lg hover:bg-emerald-950/25 transition-colors border border-transparent hover:border-emerald-900/10">
                <span className="font-semibold text-white block">Bengal Tiger</span>
                <span className="text-[10px] text-gray-400 italic">Panthera tigris tigris</span>
              </Link>
              <Link to="/species/leopard" className="block p-2 rounded-lg hover:bg-emerald-950/25 transition-colors border border-transparent hover:border-emerald-900/10">
                <span className="font-semibold text-white block">Snow Leopard</span>
                <span className="text-[10px] text-gray-400 italic">Panthera uncia</span>
              </Link>
            </div>
          </Card>

          <Card hoverable={false} className="border-emerald-900/10 p-5 bg-[#020905]/45">
            <div className="flex items-center space-x-2 border-b border-emerald-950/30 pb-3 mb-3">
              <FaChartLine className="text-brand-green" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Recent Predictions</h4>
            </div>
            <div className="space-y-2 text-xs">
              <Link to="/predictions?species=elephant" className="block p-2 rounded-lg hover:bg-emerald-950/25 transition-colors border border-transparent hover:border-emerald-900/10">
                <span className="font-semibold text-white block">Asian Elephant Forecast</span>
                <span className="text-[10px] text-brand-green font-mono">Period: 2026-2035</span>
              </Link>
              <Link to="/predictions?species=tiger" className="block p-2 rounded-lg hover:bg-emerald-950/25 transition-colors border border-transparent hover:border-emerald-900/10">
                <span className="font-semibold text-white block">Bengal Tiger Simulation</span>
                <span className="text-[10px] text-brand-green font-mono">91% accuracy score</span>
              </Link>
            </div>
          </Card>

          <Card hoverable={false} className="border-emerald-900/10 p-5 bg-[#020905]/45">
            <div className="flex items-center space-x-2 border-b border-emerald-950/30 pb-3 mb-3">
              <FaShieldAlt className="text-brand-green" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Recent Interventions</h4>
            </div>
            <div className="space-y-2 text-xs">
              <Link to="/recommendations?species=rhino" className="block p-2 rounded-lg hover:bg-emerald-950/25 transition-colors border border-transparent hover:border-emerald-900/10">
                <span className="font-semibold text-white block">Anti-Poaching Patrols (Rhino)</span>
                <span className="text-[10px] text-red-400 font-mono">Priority: HIGH</span>
              </Link>
              <Link to="/recommendations?species=tiger" className="block p-2 rounded-lg hover:bg-emerald-950/25 transition-colors border border-transparent hover:border-emerald-900/10">
                <span className="font-semibold text-white block">Grassland Wetland Recovery</span>
                <span className="text-[10px] text-amber-400 font-mono">Priority: MEDIUM</span>
              </Link>
            </div>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
};
export default Dashboard;
