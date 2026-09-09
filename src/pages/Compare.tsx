import React, { useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/Card';
import { speciesList } from '../data/speciesData';
import type { Species } from '../data/speciesData';

export const Compare: React.FC = () => {
  const [speciesAId, setSpeciesAId] = useState('tiger');
  const [speciesBId, setSpeciesBId] = useState('leopard');

  const speciesA = speciesList.find(s => s.id === speciesAId) || speciesList[0];
  const speciesB = speciesList.find(s => s.id === speciesBId) || speciesList[1];

  const getThreatValue = (species: Species, threatName: string) => {
    const threat = species.threats.find(t => t.name === threatName);
    return threat ? `${threat.severity}%` : 'N/A';
  };

  const getThreatLevel = (species: Species) => {
    return species.status === 'Critically Endangered' ? 'Critical' :
           species.status === 'Endangered' ? 'High' :
           species.status === 'Vulnerable' ? 'Medium' : 'Low';
  };

  return (
    <DashboardLayout activeTabId="compare">
      <div className="space-y-8 text-left">
        {/* Header */}
        <div className="border-b border-emerald-950/40 pb-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-['Poppins']">Species Comparison</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">Cross-reference and analyze conservation variables across different species profiles.</p>
        </div>

        {/* Selection panel */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6 items-center">
          
          {/* Species A Selector */}
          <div className="md:col-span-3">
            <Card hoverable={false} className="border-emerald-900/10 p-5 bg-[#020905]/45">
              <label className="block text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-2">Subject Species A</label>
              <select
                value={speciesAId}
                onChange={(e) => setSpeciesAId(e.target.value)}
                className="block w-full px-3 py-2.5 bg-[#051109] border border-emerald-900/30 focus:border-brand-green/40 rounded-xl text-xs text-white focus:outline-none focus:ring-0"
              >
                {speciesList.map(s => (
                  <option key={s.id} value={s.id} disabled={s.id === speciesBId} className="bg-[#051109] text-white">
                    {s.commonName}
                  </option>
                ))}
              </select>
            </Card>
          </div>

          {/* Versus Icon */}
          <div className="md:col-span-1 flex justify-center text-brand-green text-lg font-bold">
            <div className="p-3 bg-emerald-950/20 border border-emerald-900/10 rounded-full flex items-center justify-center">
              <FaExchangeAlt className="h-4 w-4" />
            </div>
          </div>

          {/* Species B Selector */}
          <div className="md:col-span-3">
            <Card hoverable={false} className="border-emerald-900/10 p-5 bg-[#020905]/45">
              <label className="block text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-2">Subject Species B</label>
              <select
                value={speciesBId}
                onChange={(e) => setSpeciesBId(e.target.value)}
                className="block w-full px-3 py-2.5 bg-[#051109] border border-emerald-900/30 focus:border-brand-green/40 rounded-xl text-xs text-white focus:outline-none focus:ring-0"
              >
                {speciesList.map(s => (
                  <option key={s.id} value={s.id} disabled={s.id === speciesAId} className="bg-[#051109] text-white">
                    {s.commonName}
                  </option>
                ))}
              </select>
            </Card>
          </div>

        </div>

        {/* Side-by-Side Comparison Matrix */}
        <Card hoverable={false} className="border-emerald-900/10 overflow-hidden p-0">
          <div className="overflow-x-auto overflow-y-auto w-full max-h-[600px]">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="sticky top-0 z-10 shadow-sm">
                <tr className="border-b border-emerald-950/40 text-gray-400 font-semibold">
                  <th className="py-4 px-6 w-[34%] bg-[#051109]">Scientific Parameters</th>
                  <th className="py-4 px-6 w-[33%] text-white font-bold text-sm bg-[#08180e] border-r border-emerald-950/20">{speciesA.commonName}</th>
                  <th className="py-4 px-6 w-[33%] text-white font-bold text-sm bg-[#051109]">{speciesB.commonName}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-950/15">
                
                {/* Scientific Name */}
                <tr className="hover:bg-emerald-950/5 transition-colors font-medium">
                  <td className="py-3.5 px-6 font-semibold text-gray-400">Scientific Name</td>
                  <td className="py-3.5 px-6 italic text-brand-green bg-emerald-950/10 border-r border-emerald-950/20">{speciesA.scientificName}</td>
                  <td className="py-3.5 px-6 italic text-brand-green">{speciesB.scientificName}</td>
                </tr>

                {/* Conservation Status */}
                <tr className="hover:bg-emerald-950/5 transition-colors font-medium">
                  <td className="py-3.5 px-6 font-semibold text-gray-400">Conservation Status</td>
                  <td className="py-3.5 px-6 bg-emerald-950/10 border-r border-emerald-950/20">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase border ${
                      speciesA.status === 'Critically Endangered' ? 'bg-red-950/40 text-red-400 border-red-900/20' :
                      speciesA.status === 'Endangered' ? 'bg-amber-950/40 text-amber-400 border-amber-900/20' :
                      speciesA.status === 'Vulnerable' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/20' :
                      'bg-blue-950/40 text-blue-400 border-blue-900/20'
                    }`}>
                      {speciesA.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase border ${
                      speciesB.status === 'Critically Endangered' ? 'bg-red-950/40 text-red-400 border-red-900/20' :
                      speciesB.status === 'Endangered' ? 'bg-amber-950/40 text-amber-400 border-amber-900/20' :
                      'bg-emerald-950/40 text-emerald-400 border-emerald-900/20'
                    }`}>
                      {speciesB.status}
                    </span>
                  </td>
                </tr>

                {/* Current Population */}
                <tr className="hover:bg-emerald-950/5 transition-colors font-medium">
                  <td className="py-3.5 px-6 font-semibold text-gray-400">Current Population</td>
                  <td className="py-3.5 px-6 font-mono text-white font-bold bg-emerald-950/10 border-r border-emerald-950/20">~{speciesA.currentPopulation.toLocaleString()}</td>
                  <td className="py-3.5 px-6 font-mono text-white font-bold">~{speciesB.currentPopulation.toLocaleString()}</td>
                </tr>

                {/* Population Trend */}
                <tr className="hover:bg-emerald-950/5 transition-colors font-medium">
                  <td className="py-3.5 px-6 font-semibold text-gray-400">Population Trend</td>
                  <td className={`py-3.5 px-6 font-bold bg-emerald-950/10 border-r border-emerald-950/20 ${
                    speciesA.trend === 'Increasing' ? 'text-brand-green' : 
                    speciesA.trend === 'Stable' ? 'text-blue-400' : 'text-red-500'
                  }`}>{speciesA.trend}</td>
                  <td className={`py-3.5 px-6 font-bold ${
                    speciesB.trend === 'Increasing' ? 'text-brand-green' : 
                    speciesB.trend === 'Stable' ? 'text-blue-400' : 'text-red-500'
                  }`}>{speciesB.trend}</td>
                </tr>

                {/* Threat Level */}
                <tr className="hover:bg-emerald-950/5 transition-colors font-medium">
                  <td className="py-3.5 px-6 font-semibold text-gray-400">Threat Level</td>
                  <td className="py-3.5 px-6 bg-emerald-950/10 border-r border-emerald-950/20">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      getThreatLevel(speciesA) === 'Critical' ? 'text-red-400 bg-red-950/20' :
                      getThreatLevel(speciesA) === 'High' ? 'text-amber-400 bg-amber-950/20' :
                      'text-emerald-400 bg-emerald-950/20'
                    }`}>
                      {getThreatLevel(speciesA)}
                    </span>
                  </td>
                  <td className="py-3.5 px-6">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      getThreatLevel(speciesB) === 'Critical' ? 'text-red-400 bg-red-950/20' :
                      getThreatLevel(speciesB) === 'High' ? 'text-amber-400 bg-amber-950/20' :
                      'text-emerald-400 bg-emerald-950/20'
                    }`}>
                      {getThreatLevel(speciesB)}
                    </span>
                  </td>
                </tr>

                {/* Habitat Loss Severity */}
                <tr className="hover:bg-emerald-950/5 transition-colors font-medium">
                  <td className="py-3.5 px-6 font-semibold text-gray-400">Habitat Loss Index</td>
                  <td className="py-3.5 px-6 font-mono text-brand-green font-bold bg-emerald-950/10 border-r border-emerald-950/20">{getThreatValue(speciesA, 'Habitat Loss')}</td>
                  <td className="py-3.5 px-6 font-mono text-brand-green font-bold">{getThreatValue(speciesB, 'Habitat Loss')}</td>
                </tr>

                {/* Poaching Severity */}
                <tr className="hover:bg-emerald-950/5 transition-colors font-medium">
                  <td className="py-3.5 px-6 font-semibold text-gray-400">Poaching Impact Index</td>
                  <td className="py-3.5 px-6 font-mono text-brand-green font-bold bg-emerald-950/10 border-r border-emerald-950/20">{getThreatValue(speciesA, 'Poaching')}</td>
                  <td className="py-3.5 px-6 font-mono text-brand-green font-bold">{getThreatValue(speciesB, 'Poaching')}</td>
                </tr>

                {/* Climate Stress */}
                <tr className="hover:bg-emerald-950/5 transition-colors font-medium">
                  <td className="py-3.5 px-6 font-semibold text-gray-400">Climate Stress Index</td>
                  <td className="py-3.5 px-6 font-mono text-brand-green font-bold bg-emerald-950/10 border-r border-emerald-950/20">{getThreatValue(speciesA, 'Climate Stress')}</td>
                  <td className="py-3.5 px-6 font-mono text-brand-green font-bold">{getThreatValue(speciesB, 'Climate Stress')}</td>
                </tr>

                {/* Habitat Region */}
                <tr className="hover:bg-emerald-950/5 transition-colors font-medium">
                  <td className="py-3.5 px-6 font-semibold text-gray-400">Primary Habitat</td>
                  <td className="py-3.5 px-6 text-gray-400 bg-emerald-950/10 border-r border-emerald-950/20 leading-relaxed">{speciesA.habitat}</td>
                  <td className="py-3.5 px-6 text-gray-400 leading-relaxed">{speciesB.habitat}</td>
                </tr>

              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
export default Compare;
