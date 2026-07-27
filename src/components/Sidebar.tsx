import React from 'react';
import { FaChartLine, FaLightbulb, FaGlobe, FaChevronLeft, FaChevronRight, FaDatabase, FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  isOpenMobile,
  setIsOpenMobile,
}) => {
  const tabs = [
    { id: 'overview', name: 'Overview', icon: FaLeaf },
    { id: 'predictor', name: 'Population Predictor', icon: FaChartLine },
    { id: 'recommendations', name: 'AI Recommendations', icon: FaLightbulb },
    { id: 'habitat', name: 'Habitat Analysis', icon: FaGlobe },
  ];

  const sidebarVariants = {
    expanded: { width: '260px' },
    collapsed: { width: '80px' },
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <motion.aside
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        variants={sidebarVariants}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className={`fixed md:sticky top-20 bottom-0 left-0 z-40 h-[calc(100vh-80px)] bg-brand-card/90 border-r border-emerald-950/40 text-gray-300 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 w-[260px]' : '-translate-x-full md:block'
        }`}
      >
        <div className="py-6 px-4 flex flex-col space-y-6">
          {/* Collapse Button (Desktop only) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex items-center justify-center self-end w-8 h-8 rounded-lg bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-400 border border-emerald-800/30 transition-colors"
          >
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>

          {/* Navigation Tabs */}
          <nav className="flex flex-col space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsOpenMobile(false);
                  }}
                  className={`relative flex items-center w-full p-3.5 rounded-xl font-semibold transition-all duration-300 text-left group ${
                    isActive
                      ? 'text-white bg-emerald-950/40 border border-emerald-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className={`h-5 w-5 min-w-[20px] transition-colors ${isActive ? 'text-emerald-400' : 'text-gray-400 group-hover:text-emerald-500'}`} />
                  
                  {!isCollapsed && (
                    <span className="ml-4 text-sm truncate">{tab.name}</span>
                  )}
                  
                  {isCollapsed && (
                    <div className="absolute left-16 scale-0 bg-emerald-950 text-emerald-400 text-xs px-2.5 py-1.5 rounded-md border border-emerald-800/30 shadow-lg pointer-events-none group-hover:scale-100 transition-all duration-200 whitespace-nowrap z-50">
                      {tab.name}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Metrics (Academic/Version) inside Sidebar */}
        <div className="p-4 border-t border-emerald-950/40 bg-brand-bg/20">
          <div className="flex items-center space-x-3">
            <FaDatabase className="text-emerald-500/60 h-5 w-5 min-w-[20px]" />
            {!isCollapsed && (
              <div className="truncate">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Active Database</p>
                <p className="text-xs text-gray-300 truncate">Redlist Species v26.1</p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
};
