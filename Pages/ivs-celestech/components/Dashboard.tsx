
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Clock, AlertCircle, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { useAppContext } from '../App';

const Dashboard: React.FC = () => {
  const { trans, language } = useAppContext();

  const TASK_DATA = [
    { name: 'T1', completed: 12, active: 4 },
    { name: 'T2', completed: 19, active: 6 },
    { name: 'T3', completed: 15, active: 8 },
    { name: 'T4', completed: 25, active: 5 },
  ];

  const ACTIVE_PROJECTS = [
    { id: 1, title: 'E-Commerce Enterprise', status: trans.status_in_progress, progress: 75, type: trans.cat_tech, date: '24/10' },
    { id: 2, title: 'K-12 STEM Content', status: trans.status_review, progress: 90, type: trans.cat_edtech, date: '10/10' },
    { id: 3, title: 'Data Warehouse', status: trans.status_draft, progress: 20, type: trans.cat_data, date: 'Draft' },
  ];

  const METRICS = [
    { label: trans.active_projects, value: '3', icon: <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />, bg: 'bg-blue-50 dark:bg-blue-900/30' },
    { label: trans.pending_contracts, value: '1', icon: <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />, bg: 'bg-amber-50 dark:bg-amber-900/30' },
    { label: trans.completed, value: '24', icon: <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />, bg: 'bg-green-50 dark:bg-green-900/30' },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-primary dark:text-dark-text">{trans.dashboard}</h1>
        <p className="text-textSub dark:text-dark-textSub text-xs">{trans.greeting}. {trans.status_desc}</p>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-3 gap-3">
        {METRICS.map((metric, idx) => (
          <div key={idx} className="bg-surface dark:bg-dark-surface p-3 rounded-xl shadow-soft border border-borderSub dark:border-dark-border flex flex-col justify-between h-28 transition-colors">
            <div className={`w-8 h-8 rounded-full ${metric.bg} flex items-center justify-center mb-2`}>
              {metric.icon}
            </div>
            <div>
              <p className="text-[10px] text-textSub dark:text-dark-textSub uppercase font-semibold tracking-wide truncate">{metric.label}</p>
              <p className="text-xl font-bold text-primary dark:text-dark-text mt-1">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        {/* Main Column: Active Projects */}
        <div className="space-y-6">
          <div className="bg-surface dark:bg-dark-surface rounded-xl shadow-card border border-borderSub dark:border-dark-border overflow-hidden transition-colors">
            <div className="p-4 border-b border-borderSub dark:border-dark-border flex justify-between items-center">
              <h2 className="font-bold text-primary dark:text-dark-text text-base">{trans.project_catalog}</h2>
              <button className="text-xs text-secondary font-medium">{trans.view_all}</button>
            </div>
            
            <div className="divide-y divide-gray-100 dark:divide-dark-border">
              {ACTIVE_PROJECTS.map((project) => (
                <div key={project.id} className="p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-sm ${
                        project.type === trans.cat_tech ? 'bg-secondary' : project.type === trans.cat_edtech ? 'bg-indigo-600' : 'bg-slate-700'
                      }`}>
                        {project.title.charAt(0)}
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="font-semibold text-primary dark:text-dark-text text-sm truncate pr-2">{project.title}</h3>
                        <span className="text-[10px] text-textSub dark:text-dark-textSub flex items-center gap-1">
                           {project.type} • {project.date}
                        </span>
                      </div>
                    </div>
                    <div className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      project.status === trans.status_in_progress ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 
                      project.status === trans.status_review ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' : 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300'
                    }`}>
                      {project.status}
                    </div>
                  </div>

                  <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-1.5 mt-2">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                         project.progress === 100 ? 'bg-green-500' : 'bg-primary dark:bg-blue-500'
                      }`} 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Velocity Chart */}
          <div className="bg-surface dark:bg-dark-surface rounded-xl shadow-soft border border-borderSub dark:border-dark-border p-4 transition-colors">
            <h3 className="font-bold text-primary dark:text-dark-text text-base mb-4">{trans.delivery_velocity}</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TASK_DATA}>
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9CA3AF" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '12px' }}
                    itemStyle={{ color: '#1F2937' }}
                    cursor={{fill: 'rgba(255,255,255,0.1)'}} // Adjusted for visibility
                  />
                  <Bar dataKey="active" name={trans.active_projects} fill="#1E40AF" radius={[4, 4, 0, 0]} barSize={16} />
                  <Bar dataKey="completed" name={trans.completed} fill="#94A3B8" radius={[4, 4, 0, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Notifications */}
        <div className="space-y-6">
          
          {/* Document Vault / Actions */}
          <div className="bg-gradient-to-br from-primary to-slate-800 dark:from-slate-800 dark:to-slate-950 rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="font-semibold text-base mb-1">{trans.document_vault}</h3>
               <p className="text-gray-300 text-xs mb-3">{trans.access_docs}</p>
               <button className="w-full py-2 bg-white text-primary font-semibold rounded-lg text-xs hover:bg-gray-100 transition-colors">
                 {trans.open_vault}
               </button>
             </div>
             <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          </div>

          {/* Activity Feed */}
          <div className="bg-surface dark:bg-dark-surface rounded-xl shadow-soft border border-borderSub dark:border-dark-border p-4 transition-colors">
            <h3 className="font-bold text-primary dark:text-dark-text text-base mb-4">{trans.recent_activity}</h3>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="mt-0.5"><CheckCircle2 className="w-4 h-4 text-secondary" /></div>
                <div>
                  <p className="text-xs text-primary dark:text-dark-text font-medium">{language === 'vi' ? 'Đã nhận thanh toán đợt 1' : 'Payment Batch 1 Received'}</p>
                  <p className="text-[10px] text-textSub dark:text-dark-textSub">E-Commerce Upgrade</p>
                  <span className="text-[10px] text-gray-400 block mt-0.5">2h ago</span>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="mt-0.5"><AlertCircle className="w-4 h-4 text-amber-500" /></div>
                <div>
                  <p className="text-xs text-primary dark:text-dark-text font-medium">{language === 'vi' ? 'Hợp đồng chờ ký duyệt' : 'Contract Pending Approval'}</p>
                  <p className="text-[10px] text-textSub dark:text-dark-textSub">Data Migration</p>
                  <span className="text-[10px] text-gray-400 block mt-0.5">1d ago</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
