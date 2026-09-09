import React, { useState } from 'react';
import { FaDatabase, FaDownload, FaSearch, FaFilter } from 'react-icons/fa';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { speciesList } from '../data/speciesData';

interface FlatRecord {
  id: string;
  speciesName: string;
  year: number;
  population: number;
  region: string;
  threatLevel: string; // High, Medium, Low based on status
  habitatLoss: number; // severity percentage
  status: string;
}

export const ResearchData: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Flatten the historical records from the dataset
  const flatRecords: FlatRecord[] = speciesList.flatMap(species => {
    const habitatLossThreat = species.threats.find(t => t.name === 'Habitat Loss');
    
    // Map status to a qualitative threat level
    const threatLevel = 
      species.status === 'Critically Endangered' ? 'Critical' :
      species.status === 'Endangered' ? 'High' :
      species.status === 'Vulnerable' ? 'Medium' : 'Low';

    return species.populationHistory.map(history => ({
      id: `${species.id}-${history.year}`,
      speciesName: species.commonName,
      year: history.year,
      population: history.population,
      region: species.region.join(', '),
      threatLevel,
      habitatLoss: habitatLossThreat ? habitatLossThreat.severity : 35,
      status: species.status
    }));
  });

  // Extract years dynamically for filters
  const uniqueYears = ['All', ...Array.from(new Set(flatRecords.map(r => String(r.year)))).sort()];

  // Filter records
  const filteredRecords = flatRecords.filter(r => {
    const matchesSearch = r.speciesName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies = selectedSpecies === 'All' || r.speciesName === selectedSpecies;
    const matchesYear = selectedYear === 'All' || String(r.year) === selectedYear;
    const matchesStatus = selectedStatus === 'All' || r.status === selectedStatus;

    return matchesSearch && matchesSpecies && matchesYear && matchesStatus;
  });

  // --- Export Utilities ---
  const triggerDownload = (content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const headers = ['Species', 'Year', 'Population', 'Region', 'Threat Level', 'Habitat Loss %', 'Status'];
    const rows = filteredRecords.map(r => [
      r.speciesName,
      r.year,
      r.population,
      `"${r.region}"`,
      r.threatLevel,
      `${r.habitatLoss}%`,
      r.status
    ]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    triggerDownload(csvContent, 'ecopredict_dataset.csv', 'text/csv;charset=utf-8;');
  };

  const exportJSON = () => {
    const jsonContent = JSON.stringify(filteredRecords, null, 2);
    triggerDownload(jsonContent, 'ecopredict_dataset.json', 'application/json;charset=utf-8;');
  };

  const exportExcel = () => {
    // Generate a Tab-Separated Values format that opens directly in Excel as an XLS file
    const headers = ['Species', 'Year', 'Population', 'Region', 'Threat Level', 'Habitat Loss %', 'Status'];
    const rows = filteredRecords.map(r => [
      r.speciesName,
      r.year,
      r.population,
      r.region,
      r.threatLevel,
      `${r.habitatLoss}%`,
      r.status
    ]);
    const tsvContent = [headers.join('\t'), ...rows.map(e => e.join('\t'))].join('\n');
    triggerDownload(tsvContent, 'ecopredict_dataset.xls', 'application/vnd.ms-excel;charset=utf-8;');
  };

  return (
    <DashboardLayout activeTabId="research-data">
      <div className="space-y-8 text-left">
        {/* Header */}
        <div className="border-b border-emerald-950/40 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Research Dataset</h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">Expose, search, and export the underlying raw biological telemetry dataset.</p>
          </div>

          {/* Export Controls */}
          <div className="flex flex-wrap gap-2.5">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5 text-xs" onClick={exportCSV}>
              <FaDownload className="text-[10px]" />
              <span>CSV</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1.5 text-xs" onClick={exportJSON}>
              <FaDownload className="text-[10px]" />
              <span>JSON</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1.5 text-xs" onClick={exportExcel}>
              <FaDownload className="text-[10px]" />
              <span>Excel</span>
            </Button>
          </div>
        </div>

        {/* Filter controls panel */}
        <Card hoverable={false} className="border-emerald-900/10 p-5 bg-[#020905]/45 backdrop-blur-md">
          <div className="flex flex-col gap-4">
            
            {/* Search Input */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-100/40">
                <FaSearch className="h-3.5 w-3.5" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search dataset records by species name or region..."
                className="w-full bg-emerald-950/20 border border-emerald-900/30 hover:border-emerald-800/40 focus:border-brand-green/50 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-emerald-100/30 focus:outline-none transition-colors"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Species Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <FaFilter className="text-brand-green/60" />
                  <span>Species</span>
                </label>
                <select
                  value={selectedSpecies}
                  onChange={(e) => setSelectedSpecies(e.target.value)}
                  className="block w-full px-3 py-2 bg-[#051109] border border-emerald-900/30 focus:border-brand-green/40 rounded-xl text-xs text-white focus:outline-none focus:ring-0"
                >
                  <option value="All" className="bg-[#051109] text-white">All Species</option>
                  {speciesList.map(s => (
                    <option key={s.id} value={s.commonName} className="bg-[#051109] text-white">{s.commonName}</option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <FaFilter className="text-brand-green/60" />
                  <span>Year</span>
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="block w-full px-3 py-2 bg-[#051109] border border-emerald-900/30 focus:border-brand-green/40 rounded-xl text-xs text-white focus:outline-none focus:ring-0"
                >
                  {uniqueYears.map(y => (
                    <option key={y} value={y} className="bg-[#051109] text-white">{y === 'All' ? 'All Years' : y}</option>
                  ))}
                </select>
              </div>

              {/* Conservation Status Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <FaFilter className="text-brand-green/60" />
                  <span>Conservation Status</span>
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="block w-full px-3 py-2 bg-[#051109] border border-emerald-900/30 focus:border-brand-green/40 rounded-xl text-xs text-white focus:outline-none focus:ring-0"
                >
                  <option value="All" className="bg-[#051109] text-white">All Statuses</option>
                  <option value="Critically Endangered" className="bg-[#051109] text-white">Critically Endangered</option>
                  <option value="Endangered" className="bg-[#051109] text-white">Endangered</option>
                  <option value="Vulnerable" className="bg-[#051109] text-white">Vulnerable</option>
                  <option value="Near Threatened" className="bg-[#051109] text-white">Near Threatened</option>
                </select>
              </div>

            </div>

          </div>
        </Card>

        {/* Dataset Table Card */}
        <Card hoverable={false} className="border-emerald-900/10 overflow-hidden p-0">
          <div className="overflow-x-auto overflow-y-auto w-full max-h-[600px]">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-emerald-950/40 bg-[#020905] text-gray-400 uppercase tracking-wider font-semibold">
                  <th className="py-4 px-4 bg-[#051109]">Species</th>
                  <th className="py-4 px-3 text-center bg-[#051109]">Year</th>
                  <th className="py-4 px-3 text-right bg-[#051109]">Population</th>
                  <th className="py-4 px-4 bg-[#051109]">Primary Region</th>
                  <th className="py-4 px-3 text-center bg-[#051109]">Threat Level</th>
                  <th className="py-4 px-3 text-center bg-[#051109]">Habitat Loss %</th>
                  <th className="py-4 px-4 text-center bg-[#051109]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-950/15">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-emerald-950/5 transition-colors font-medium">
                      <td className="py-3.5 px-4 font-bold text-white">{record.speciesName}</td>
                      <td className="py-3.5 px-3 text-center font-mono text-gray-300">{record.year}</td>
                      <td className="py-3.5 px-3 text-right font-mono text-gray-300">{record.population.toLocaleString()}</td>
                      <td className="py-3.5 px-4 text-gray-400 max-w-xs truncate">{record.region}</td>
                      <td className="py-3.5 px-3 text-center">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          record.threatLevel === 'Critical' ? 'text-red-400 bg-red-950/20' :
                          record.threatLevel === 'High' ? 'text-amber-400 bg-amber-950/20' :
                          'text-emerald-400 bg-emerald-950/20'
                        }`}>
                          {record.threatLevel}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono text-brand-green">{record.habitatLoss}%</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border ${
                          record.status === 'Critical' ? 'bg-red-950/40 text-red-400 border-red-900/20' :
                          record.status === 'Endangered' ? 'bg-amber-950/40 text-amber-400 border-amber-900/20' :
                          'bg-emerald-950/40 text-emerald-400 border-emerald-900/20'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500 font-semibold">
                      <FaDatabase className="h-6 w-6 text-emerald-950/20 mx-auto mb-2" />
                      <span>No matching records found in the database.</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
export default ResearchData;
