
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, PlusCircle, Settings, Rocket, Bell, Globe, Sun, Moon } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ServiceCatalog from './components/ServiceCatalog';
import OrderWizard from './components/OrderWizard';
import AivyChatbot from './components/AivyChatbot';
import NotificationPanel from './components/NotificationPanel';
import { ServiceItem, Language, AppContextType, NotificationItem, Theme } from './types';
import { getTrans } from './utils/translations';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

// --- Components ---

const MobileNavLink = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 w-full ${
          isActive 
            ? 'text-secondary font-semibold' 
            : 'text-gray-400 dark:text-gray-500 font-medium'
        }`
      }
    >
      <div className="mb-1">{icon}</div>
      <span className="text-[10px]">{label}</span>
    </NavLink>
  );
};

const AppContent = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const { language, setLanguage, theme, toggleTheme, trans, unreadCount } = useAppContext();
  const navigate = useNavigate();

  const handleServiceSelect = (service: ServiceItem) => {
    setSelectedService(service);
    navigate('/create');
  };

  const handleWizardComplete = () => {
    setSelectedService(null);
    navigate('/dashboard');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  return (
    // Zalo Mini App Wrapper
    <div className="bg-gray-100 dark:bg-black min-h-screen flex justify-center items-start pt-0 md:pt-10 md:pb-10 font-sans transition-colors duration-300">
      <div className="w-full max-w-[480px] h-[100vh] md:h-[90vh] bg-background dark:bg-dark-bg text-textMain dark:text-dark-text flex flex-col shadow-2xl relative md:rounded-3xl overflow-hidden border-0 md:border border-gray-200 dark:border-dark-border">
        
        {/* Zalo Header Bar */}
        <header className="h-14 bg-surface dark:bg-dark-surface border-b border-borderSub dark:border-dark-border flex items-center justify-between px-4 shadow-sm z-20 flex-shrink-0 relative transition-colors duration-300">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Rocket className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-primary dark:text-dark-text text-sm">IVS Celestech</span>
          </div>
          
          <div className="flex items-center gap-2">
             {/* Theme Toggle */}
             <button
               onClick={toggleTheme}
               className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg text-textSub dark:text-dark-textSub transition-colors"
             >
               {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
             </button>

             {/* Language Switcher */}
             <button 
               onClick={toggleLanguage}
               className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-dark-bg rounded-md text-xs font-bold text-primary dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
             >
               <Globe className="w-3 h-3" />
               {language.toUpperCase()}
             </button>

             {/* Notification Trigger */}
             <button 
               onClick={() => setShowNotifications(!showNotifications)}
               className={`relative p-2 rounded-full transition-colors ${
                 showNotifications 
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-secondary' 
                  : 'text-textSub dark:text-dark-textSub hover:bg-gray-100 dark:hover:bg-dark-bg'
               }`}
             >
               <Bell className="w-5 h-5" />
               {unreadCount > 0 && (
                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-dark-surface animate-pulse"></span>
               )}
             </button>

             {/* User Avatar */}
             <button className="p-1 rounded-full border border-borderSub dark:border-dark-border">
               <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                 <img src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff" alt="User" />
               </div>
             </button>
          </div>

          {/* Notification Dropdown */}
          {showNotifications && (
            <NotificationPanel onClose={() => setShowNotifications(false)} />
          )}
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 scroll-smooth bg-background dark:bg-dark-bg transition-colors duration-300" onClick={() => setShowNotifications(false)}>
           <Routes>
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/services" element={<ServiceCatalog onSelectService={handleServiceSelect} />} />
             <Route path="/create" element={
               selectedService ? (
                 <OrderWizard 
                   service={selectedService} 
                   onBack={() => navigate('/services')}
                   onComplete={handleWizardComplete}
                 />
               ) : (
                 <div className="flex flex-col items-center justify-center h-full text-center py-10">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-dark-surface rounded-full flex items-center justify-center mb-4 border border-gray-200 dark:border-dark-border">
                      <Briefcase className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h2 className="text-lg font-bold text-primary dark:text-dark-text mb-2">{trans.create_request}</h2>
                    <p className="text-textSub dark:text-dark-textSub text-sm mb-6 px-4">{trans.service_desc}</p>
                    <button 
                      onClick={() => navigate('/services')}
                      className="px-6 py-2.5 bg-secondary text-white rounded-xl hover:bg-blue-800 transition-colors shadow-soft font-medium text-sm"
                    >
                      {trans.browse_services}
                    </button>
                 </div>
               )
             } />
             <Route path="*" element={<Dashboard />} />
           </Routes>
        </main>

        {/* Zalo Bottom Navigation */}
        <nav className="flex-shrink-0 bg-surface dark:bg-dark-surface border-t border-borderSub dark:border-dark-border px-2 py-1 flex justify-between items-center z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-colors duration-300">
          <MobileNavLink to="/dashboard" icon={<LayoutDashboard size={22} />} label={trans.dashboard} />
          <MobileNavLink to="/services" icon={<Briefcase size={22} />} label={trans.services} />
          <MobileNavLink to="/create" icon={<PlusCircle size={22} />} label={trans.create} />
          <MobileNavLink to="/settings" icon={<Settings size={22} />} label={trans.support} />
        </nav>

        {/* Global Chatbot */}
        <AivyChatbot language={language} />
      </div>
    </div>
  );
};

const App = () => {
  const [language, setLanguage] = useState<Language>('vi'); // Default VI
  const [theme, setTheme] = useState<Theme>('light');
  const trans = getTrans(language);
  
  // Notification Logic
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Initialize simulated notifications
  useEffect(() => {
    // Initial data
    const initialNotes: NotificationItem[] = [
      {
        id: '1',
        title: trans.noti_sys_update,
        message: trans.noti_sys_desc,
        type: 'warning',
        isRead: false,
        timestamp: new Date(Date.now() - 3600000) // 1 hour ago
      },
      {
        id: '2',
        title: trans.noti_payment,
        message: trans.noti_payment_desc,
        type: 'success',
        isRead: true,
        timestamp: new Date(Date.now() - 86400000) // 1 day ago
      }
    ];
    setNotifications(initialNotes);

    // Simulate incoming notification after 5 seconds
    const timer = setTimeout(() => {
      const newNote: NotificationItem = {
        id: Date.now().toString(),
        title: trans.noti_proj_update,
        message: trans.noti_proj_desc,
        type: 'info',
        isRead: false,
        timestamp: new Date()
      };
      setNotifications(prev => [newNote, ...prev]);
    }, 5000);

    return () => clearTimeout(timer);
  }, [language]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Theme Handling
  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newTheme;
    });
  };

  return (
    <AppContext.Provider value={{ 
      language, 
      setLanguage,
      theme,
      toggleTheme, 
      trans, 
      notifications, 
      unreadCount,
      markAsRead,
      markAllAsRead,
      deleteNotification
    }}>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
