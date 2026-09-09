import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaSlidersH, FaBrain, FaInfoCircle } from 'react-icons/fa';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { speciesList } from '../data/speciesData';

export const Predictions: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialId = searchParams.get('species') || 'tiger';
  const [selectedId, setSelectedId] = useState(initialId);

  const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    setSelectedId(newId);
    setSearchParams({ species: newId });
  };

  const species = speciesList.find(s => s.id === selectedId) || speciesList[0];

  // Merge historical and predicted data for a continuous LineChart
  const getMergedChartData = () => {
    const data: any[] = [];
    
    // Add historical data points
    species.populationHistory.forEach(record => {
      data.push({
        year: String(record.year),
        Observed: record.population,
        Forecast: null
      });
    });

    // To connect the lines seamlessly, add the last historical point as the start of the forecast line
    const lastHistorical = species.populationHistory[species.populationHistory.length - 1];
    if (data.length > 0) {
      data[data.length - 1].Forecast = lastHistorical.population;
    }

    // Add forecast data points
    species.predictedPopulation.forEach(record => {
      data.push({
        year: String(record.year),
        Observed: null,
        Forecast: record.population
      });
    });

    return data;
  };

  const chartData = getMergedChartData();

  return (
    <DashboardLayout activeTabId="predictions">
      <div className="space-y-8 text-left">
        {/* Header */}
        <div className="border-b border-emerald-950/40 pb-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">ML Population Prediction</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Simulate and analyze long-term population projections using recurrent time-series forecasting models.
          </p>
        </div>

        {/* Prediction Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Controls Side Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card hoverable={false} className="border-emerald-900/10 p-5 bg-[#020905]/45 backdrop-blur-md">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 border-b border-emerald-950/40 pb-3">
                  <FaSlidersH className="text-brand-green" />
                  <h3 className="font-bold text-white text-sm">Forecast Selector</h3>
                </div>

                {/* Target Species Dropdown */}
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Select Target Species</label>
                  <select
                    value={selectedId}
                    onChange={handleSpeciesChange}
                    className="block w-full px-3 py-2.5 bg-[#051109] border border-emerald-900/30 focus:border-brand-green/40 rounded-xl text-xs text-white focus:outline-none focus:ring-0"
                  >
                    {speciesList.map(s => (
                      <option key={s.id} value={s.id} className="bg-[#051109] text-white">
                        {s.commonName} ({s.scientificName})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Summary Parameters */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between p-3 bg-emerald-950/20 border border-emerald-900/10 rounded-xl">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Prediction Trend</span>
                    <span className={`text-xs font-bold uppercase ${
                      species.trend === 'Increasing' ? 'text-brand-green' : 
                      species.trend === 'Stable' ? 'text-blue-400' : 'text-red-500'
                    }`}>
                      {species.trend === 'Increasing' ? '📈 Increasing' : species.trend === 'Stable' ? '➡️ Stable' : species.trend === 'Declining' ? '📉 Declining' : '❓ Unknown'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-emerald-950/20 border border-emerald-900/10 rounded-xl">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Model Confidence</span>
                    <span className="text-xs font-bold text-brand-green font-mono">
                      {species.id === 'tiger' ? '91%' : species.id === 'leopard' ? '88%' : species.id === 'elephant' ? '93%' : '95%'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-emerald-950/20 border border-emerald-900/10 rounded-xl">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Forecast Period</span>
                    <span className="text-xs font-bold text-white font-mono">2026–2035</span>
                  </div>
                </div>

                {/* Flow Link to Recommendations */}
                <Link to={`/recommendations?species=${species.id}`} className="block w-full">
                  <Button variant="primary" size="sm" className="w-full flex items-center justify-center gap-2">
                    <FaBrain />
                    <span>View Recommendations</span>
                  </Button>
                </Link>
              </div>
            </Card>

            <div className="flex items-start gap-2.5 text-[10px] text-gray-400 leading-relaxed bg-emerald-950/10 border border-emerald-900/20 p-3.5 rounded-xl">
              <FaInfoCircle className="text-brand-green mt-0.5 min-w-[12px]" />
              <p>
                * Projections are mathematical forecasts generated by the model based on historical observations and local environmental covariates. Actual ecological patterns may vary.
              </p>
            </div>
          </div>

          {/* Recharts Mixed Forecast Display */}
          <div className="lg:col-span-2">
            <Card hoverable={false} className="border-emerald-900/10 p-6 flex flex-col justify-between">
              <div>
                <div className="border-b border-emerald-950/40 pb-3 mb-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white">Estimated Population Trend Forecast</h3>
                    <p className="text-[10px] text-gray-500 mt-0.5 font-medium">Solid line: Observed data | Dashed line: Model prediction</p>
                  </div>
                  <span className="text-[9px] font-mono text-gray-400 border border-emerald-900/30 px-2 py-0.5 rounded uppercase">LSTM Net V4.1</span>
                </div>

                <div className="h-80 w-full text-xs font-mono">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
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
                      <Line
                        type="monotone"
                        dataKey="Observed"
                        stroke="#10b981"
                        strokeWidth={3}
                        activeDot={{ r: 6 }}
                        name="Observed History"
                      />
                      <Line
                        type="monotone"
                        dataKey="Forecast"
                        stroke="#ef4444"
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        activeDot={{ r: 6 }}
                        name="ML Estimated Forecast"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </div>

        </div>

        {/* Prediction Data Table */}
        <Card hoverable={false} className="border-emerald-900/10 p-0 overflow-hidden">
          <div className="border-b border-emerald-950/40 p-5 bg-[#020905]/45">
            <h3 className="font-bold text-white text-sm">Prediction Data Records</h3>
            <p className="text-[10px] text-gray-500 mt-0.5 font-medium">Raw values for observed history and forecasted trend</p>
          </div>
          <div className="overflow-x-auto overflow-y-auto w-full max-h-[400px]">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="sticky top-0 z-10 bg-[#051109] text-gray-400 uppercase tracking-wider font-semibold border-b border-emerald-950/40 shadow-sm">
                <tr>
                  <th className="py-4 px-6 bg-[#051109]">Year</th>
                  <th className="py-4 px-6 text-right bg-[#051109]">Observed Population</th>
                  <th className="py-4 px-6 text-right bg-[#051109]">Forecasted Population</th>
                  <th className="py-4 px-6 text-center bg-[#051109]">Data Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-950/15">
                {chartData.map((row, idx) => {
                  const isForecastOnly = row.Observed === null && row.Forecast !== null;
                  
                  return (
                    <tr key={idx} className="hover:bg-emerald-950/5 transition-colors font-medium">
                      <td className="py-3.5 px-6 font-bold text-white">{row.year}</td>
                      <td className="py-3.5 px-6 text-right font-mono text-brand-green">
                        {row.Observed !== null ? Math.round(row.Observed).toLocaleString() : '-'}
                      </td>
                      <td className="py-3.5 px-6 text-right font-mono text-red-400">
                        {row.Forecast !== null ? Math.round(row.Forecast).toLocaleString() : '-'}
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border ${
                          isForecastOnly ? 'bg-red-950/40 text-red-400 border-red-900/20' : 'bg-emerald-950/40 text-emerald-400 border-emerald-900/20'
                        }`}>
                          {isForecastOnly ? 'Predicted' : 'Historical'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
};
export default Predictions;
