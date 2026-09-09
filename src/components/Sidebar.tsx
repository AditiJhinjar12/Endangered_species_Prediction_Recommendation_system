import { FaChartLine, FaLightbulb, FaGlobe, FaChevronLeft, FaChevronRight, FaDatabase, FaLeaf, FaRobot, FaExchangeAlt, FaSlidersH } from 'react-icons/fa';
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

  interface SidebarItem {
    id: string;
    name: string;
    icon: any;
    path?: string;
    action?: () => void;
  }

  const sections: { title: string; items: SidebarItem[] }[] = [
    {
      title: 'Overview',
      items: [
        { id: 'dashboard', name: 'Overview', icon: FaLeaf, path: 'dashboard' }
      ]
    },
    {
      title: 'Research',
      items: [
        { id: 'species', name: 'Species Explorer', icon: FaGlobe, path: 'species' },
        { id: 'research-data', name: 'Research Data', icon: FaDatabase, path: 'research-data' },
        { id: 'compare', name: 'Species Comparison', icon: FaExchangeAlt, path: 'compare' }
      ]
    },
    {
      title: 'Analysis',
      items: [
        { id: 'predictions', name: 'Population Prediction', icon: FaChartLine, path: 'predictions' },
        { id: 'recommendations', name: 'Recommendations', icon: FaLightbulb, path: 'recommendations' }
      ]
    },
    {
      title: 'Management',
      items: [
        { id: 'admin', name: 'Admin Portal', icon: FaSlidersH, path: 'admin' }
      ]
    },
    {
      title: 'System',
      items: [
        { 
          id: 'assistant', 
          name: 'AI Research Assistant', 
          icon: FaRobot, 
          action: () => {
            window.dispatchEvent(new CustomEvent('toggle-ecobot'));
          }
        }
      ]
    }
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
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <motion.aside
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        variants={sidebarVariants}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        className={`fixed md:sticky top-0 bottom-0 left-0 z-45 h-screen bg-[#020905]/95 border-r border-emerald-950/40 text-emerald-100 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 w-[260px]' : '-translate-x-full md:block'
        }`}
      >
        <div className="py-6 px-4 flex flex-col space-y-6 overflow-y-auto flex-1">
          {/* Brand header / Collapse button */}
          <div className="flex items-center justify-between border-b border-emerald-950/45 pb-4">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <FaLeaf className="h-5 w-5 text-brand-green" />
                <span className="font-extrabold text-sm tracking-wide text-white uppercase">EcoPredictAI</span>
              </div>
            )}
            {isCollapsed && (
              <FaLeaf className="h-5 w-5 text-brand-green mx-auto mb-1" />
            )}
            
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-950/20 hover:bg-emerald-900/40 text-emerald-100/60 border border-emerald-900/30 transition-colors cursor-pointer"
            >
              {isCollapsed ? <FaChevronRight className="h-2.5 w-2.5" /> : <FaChevronLeft className="h-2.5 w-2.5" />}
            </button>
          </div>

          {/* Navigation Categories */}
          <nav className="flex flex-col space-y-5 text-left">
            {sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1.5">
                {/* Category Title */}
                {!isCollapsed && (
                  <h4 className="text-[9px] font-bold text-gray-500 uppercase tracking-widest pl-3 mb-2 select-none">
                    {section.title}
                  </h4>
                )}

                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.action) {
                            item.action();
                          } else if (item.path) {
                            setActiveTab(item.path);
                          }
                          setIsOpenMobile(false);
                        }}
                        className={`relative flex items-center w-full p-2.5 rounded-xl font-medium transition-all duration-200 text-left group cursor-pointer border ${
                          isActive
                            ? 'text-brand-green bg-emerald-950/45 border-brand-green/20'
                            : 'text-emerald-100/60 hover:text-white hover:bg-emerald-950/25 border-transparent'
                        }`}
                      >
                        <Icon className={`h-4.5 w-4.5 min-w-[18px] transition-colors ${isActive ? 'text-brand-green' : 'text-emerald-100/40 group-hover:text-brand-green'}`} />
                        
                        {!isCollapsed && (
                          <span className="ml-3.5 text-xs truncate">{item.name}</span>
                        )}
                        
                        {isCollapsed && (
                          <div className="absolute left-16 scale-0 bg-emerald-950 text-white text-[10px] px-2.5 py-1.5 rounded-md border border-emerald-900/30 shadow-lg pointer-events-none group-hover:scale-100 transition-all duration-200 whitespace-nowrap z-50">
                            {item.name}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer Database Status */}
        <div className="p-4 border-t border-emerald-950/40 bg-emerald-950/5">
          <div className="flex items-center space-x-3 text-left">
            <FaDatabase className="text-brand-green/60 h-4 w-4 min-w-[16px]" />
            {!isCollapsed && (
              <div className="truncate">
                <p className="text-[8px] text-gray-500 uppercase tracking-widest font-semibold">Active Database</p>
                <p className="text-[10px] text-emerald-100/70 font-medium truncate font-mono">Redlist Species v26.1</p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
};
export default Sidebar;
