import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLeaf, FaBell, FaSearch, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { Sidebar } from './Sidebar';
import { Loader } from './Loader';
import { Button } from './Button';
import { supabase } from '../supabaseClient';
import { speciesList } from '../data/speciesData';
import type { Species } from '../data/speciesData';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTabId: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeTabId }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Global Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Species[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Notifications states
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Canopy coverage in Tiger Sector Alpha declined by 4.2%", time: "10 mins ago", unread: true },
    { id: 2, text: "Himalayan Ridge Grid sensor node re-established sync", time: "1 hr ago", unread: true },
    { id: 3, text: "High poaching risk registered at Kaziranga Sector Gamma", time: "4 hrs ago", unread: false }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Search Input Change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const filtered = speciesList.filter(s => 
      s.commonName.toLowerCase().includes(query.toLowerCase()) ||
      s.scientificName.toLowerCase().includes(query.toLowerCase()) ||
      s.region.some(r => r.toLowerCase().includes(query.toLowerCase()))
    );
    setSearchResults(filtered);
    setShowSearchDropdown(true);
  };

  // Supabase Auth Check
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/login');
        } else {
          setUser(session.user);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/login');
      } else {
        setUser(session?.user ?? null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020905] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#020905] text-emerald-100/90 font-['Poppins',sans-serif] relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute -top-[15%] -right-[15%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-emerald-800/15 to-emerald-950/5 blur-[130px] opacity-75" />
        <div className="absolute top-[35%] -left-[15%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-emerald-700/15 to-teal-900/10 blur-[120px] opacity-70" />
        <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      </div>

      {/* Sidebar Panel */}
      <Sidebar
        activeTab={activeTabId}
        setActiveTab={(tab) => navigate(`/${tab === 'overview' ? 'dashboard' : tab}`)}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
      />

      <div className="flex-1 flex flex-col min-w-0 z-10">
        {/* Header */}
        <header className="h-20 border-b border-emerald-950/40 bg-[#020905]/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between gap-4">
          
          {/* Mobile Menu Button & Brand logo */}
          <div className="flex items-center space-x-3 md:hidden">
            <button
              onClick={() => setIsOpenMobile(!isOpenMobile)}
              className="text-emerald-100/85 hover:text-white focus:outline-none"
            >
              <FaBars className="h-5 w-5" />
            </button>
            <Link to="/dashboard" className="flex items-center space-x-1.5">
              <FaLeaf className="h-5 w-5 text-brand-green" />
              <span className="font-bold text-white text-base">EcoPredict</span>
            </Link>
          </div>

          {/* Global Search Bar */}
          <div className="flex-1 max-w-lg relative text-left" ref={searchRef}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-100/40">
                <FaSearch className="h-3.5 w-3.5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery && setShowSearchDropdown(true)}
                placeholder="Search species, scientific name or region..."
                className="w-full bg-emerald-950/20 border border-emerald-900/30 hover:border-emerald-800/40 focus:border-brand-green/50 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-emerald-100/30 focus:outline-none transition-colors"
              />
            </div>

            {/* Dropdown Results */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-[#020905]/95 border border-emerald-900/40 rounded-xl shadow-2xl p-2 max-h-96 overflow-y-auto space-y-1.5 z-50 backdrop-blur-lg">
                {searchResults.map((species) => (
                  <Link
                    key={species.id}
                    to={`/species/${species.id}`}
                    onClick={() => {
                      setShowSearchDropdown(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-emerald-950/45 border border-transparent hover:border-emerald-900/25 transition-all"
                  >
                    <img
                      src={species.image}
                      alt={species.commonName}
                      className="w-10 h-10 rounded-lg object-cover border border-emerald-900/30"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white truncate">{species.commonName}</h4>
                        <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase ${
                          species.status === 'Critically Endangered' ? 'bg-red-950/60 text-red-400 border border-red-900/30' :
                          species.status === 'Endangered' ? 'bg-amber-950/60 text-amber-400 border border-amber-900/30' :
                          'bg-emerald-950/60 text-emerald-400 border border-emerald-900/30'
                        }`}>
                          {species.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 italic truncate mt-0.5">{species.scientificName}</p>
                      <div className="flex justify-between items-center text-[9px] text-gray-400 mt-1">
                        <span>Pop: {species.currentPopulation.toLocaleString()}</span>
                        <span className={species.trend === 'Increasing' ? 'text-brand-green' : species.trend === 'Stable' ? 'text-blue-400' : 'text-red-400'}>
                          {species.trend === 'Increasing' ? '↑' : species.trend === 'Stable' ? '→' : '↓'} {species.trend}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {showSearchDropdown && searchResults.length === 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-[#020905]/95 border border-emerald-900/40 rounded-xl shadow-2xl p-4 text-center z-50 text-xs text-gray-400">
                No species found. Try another species name, scientific name, or region.
              </div>
            )}
          </div>

          {/* Right Header Panel */}
          <div className="flex items-center space-x-4 self-center relative">
            
            {/* User Greeting (Desktop) */}
            {user && (
              <div className="hidden sm:flex items-center space-x-2.5 text-left border-r border-emerald-950/40 pr-4">
                <div className="w-8 h-8 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-brand-green">
                  <FaUser className="h-3 w-3" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Logged in as</p>
                  <p className="text-xs text-white font-bold truncate max-w-[120px]">
                    {user.user_metadata?.full_name || user.email}
                  </p>
                </div>
              </div>
            )}

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 bg-emerald-950/45 hover:bg-emerald-900/60 border border-emerald-850/40 rounded-xl text-emerald-100 transition-colors focus:outline-none cursor-pointer"
              >
                <FaBell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white shadow-md">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Panel */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-3 w-80 z-50 bg-[#020905]/95 border border-emerald-900/35 rounded-2xl p-4 shadow-lg text-left space-y-3 backdrop-blur-md">
                    <div className="flex justify-between items-center border-b border-emerald-950/40 pb-2.5">
                      <span className="text-xs font-bold text-white">System Notifications</span>
                      <button onClick={markAllRead} className="text-[10px] text-brand-green hover:underline font-semibold focus:outline-none cursor-pointer">Mark all read</button>
                    </div>

                    <div className="space-y-2.5 divide-y divide-emerald-950/40 max-h-60 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div key={notif.id} className={`pt-2.5 first:pt-0 text-xs flex flex-col space-y-1 ${notif.unread ? 'text-white' : 'text-gray-500'}`}>
                          <div className="flex items-start justify-between">
                            <span className="leading-relaxed font-medium">{notif.text}</span>
                            {notif.unread && <span className="w-1.5 h-1.5 min-w-[6px] rounded-full bg-brand-green mt-1.5 ml-2" />}
                          </div>
                          <span className="text-[9px] text-gray-400 font-mono">{notif.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Logout Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-red-400 border-red-950/40 hover:text-red-500 hover:bg-red-950/20"
            >
              <FaSignOutAlt className="h-3 w-3" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </header>

        {/* Main Dashboard Space */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full relative z-10 text-left">
          {children}
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
