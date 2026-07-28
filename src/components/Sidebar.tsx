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
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <motion.aside
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        variants={sidebarVariants}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        className={`fixed md:sticky top-20 bottom-0 left-0 z-40 h-[calc(100vh-80px)] bg-white border-r border-gray-200 text-gray-700 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 w-[260px]' : '-translate-x-full md:block'
        }`}
      >
        <div className="py-6 px-4 flex flex-col space-y-6">
          {/* Collapse Button (Desktop only) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex items-center justify-center self-end w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-500 border border-gray-200 transition-colors cursor-pointer"
          >
            {isCollapsed ? <FaChevronRight className="h-3 w-3" /> : <FaChevronLeft className="h-3 w-3" />}
          </button>

          {/* Navigation Tabs */}
          <nav className="flex flex-col space-y-1.5">
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
                  className={`relative flex items-center w-full p-3 rounded-xl font-medium transition-all duration-200 text-left group cursor-pointer ${
                    isActive
                      ? 'text-brand-green bg-green-50/70 border border-green-100'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <Icon className={`h-5 w-5 min-w-[20px] transition-colors ${isActive ? 'text-brand-green' : 'text-gray-400 group-hover:text-brand-green'}`} />
                  
                  {!isCollapsed && (
                    <span className="ml-4 text-sm truncate">{tab.name}</span>
                  )}
                  
                  {isCollapsed && (
                    <div className="absolute left-16 scale-0 bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-md shadow-md pointer-events-none group-hover:scale-100 transition-all duration-200 whitespace-nowrap z-50">
                      {tab.name}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Metrics inside Sidebar */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center space-x-3">
            <FaDatabase className="text-brand-green/60 h-5 w-5 min-w-[20px]" />
            {!isCollapsed && (
              <div className="truncate text-left">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Active Database</p>
                <p className="text-xs text-gray-700 font-medium truncate">Redlist Species v26.1</p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
};
